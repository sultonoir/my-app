"use client";

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useState, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { District } from "territory-indonesia";
import Heading from "../shared/Heading";
import useRentModal from "@/hooks/useRentModal";
import dynamic from "next/dynamic";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import InputIdr from "../inputs/InputIdr";
import TextArea from "../inputs/TextArea";
import Fasilitas, { facility } from "../shared/Fasilitas";
import NearTour from "../shared/NearTour";
import Image from "next/image";

enum STEPS {
  TERM = 0,
  CATEGORY = 1,
  LOCATION = 2,
  INFO = 3,
  NEARESTTOUR = 4,
  IMAGES = 5,
  FASILITAS = 6,
  DESCRIPTION = 7,
  PRICE = 8,
}

interface RentModalProps {
  districts: any;
}

const RentModal = ({ districts }: RentModalProps) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.TERM);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      adult: 1,
      kids: 0,
      baby: 0,
      img: [],
      price: 1,
      fasilitas: [],
      title: "",
      description: "",
      location: null,
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 0,
      NearestTour: [],
    },
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created");
        router.refresh();
        reset();
        setStep(STEPS.TERM);
        rentModal.onClose();
      })
      .catch((error: any) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "create";
    }
    return "next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.TERM) {
      return undefined;
    }
    return "back";
  }, [step]);

  const category = watch("category");
  const adult = watch("adult");
  const baby = watch("baby");
  const kids = watch("kids");
  const img = watch("img");
  const fasilitas = watch("fasilitas");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const NearestTour = watch("NearestTour");

  const Map = useMemo(
    () =>
      dynamic(() => import("../shared/Map"), {
        ssr: false,
      }),
    [location]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8 items-center justify-center">
      <Heading
        title="Selamat datang di kyouka"
        subtitle="Cara mudah untuk mempromosika tempat mu"
        center
      />
      <Image
        src={`/ren.jpg`}
        alt="Rental"
        priority
        width={400}
        height={400}
        quality={100}
        sizes="100%"
        style={{ objectFit: "cover" }}
        className="aspect-square w-full h-full"
      />
    </div>
  );

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Pilih kategory "
          subtitle="category yang menggambarkan kamar anda"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => (
            <div
              key={item.label}
              className="col-span-1"
            >
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Dikota mana tempat"
          subtitle="Help guest find you!"
        />
        <CountrySelect
          districts={districts}
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Detail Ruangan"
          subtitle="Fasilitas utama apa saja yang anda punya"
        />
        <Counter
          title="Orang dewasa"
          subtitle="Usia 13 tahun ke atas"
          value={adult}
          onChange={(value) => setCustomValue("adult", value)}
        />
        <Counter
          title="Anak-anak"
          subtitle="Umur 2 - 13 tahun"
          value={kids}
          onChange={(value) => setCustomValue("kids", value)}
        />
        <Counter
          title="Balita"
          subtitle="Umur 2 tahun ke bawah"
          value={baby}
          onChange={(value) => setCustomValue("baby", value)}
        />
        <Counter
          title="kamar"
          subtitle="Berapa banyak kamar yang anda miliki"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="kamar mandi"
          subtitle="Berapa banyak kamar mandi yang anda miliki"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.NEARESTTOUR) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tambahkan tempat wisata"
          subtitle="wisata terdekat dengan penginapan"
        />
        <NearTour
          value={NearestTour}
          onChange={(value) => setCustomValue("NearestTour", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tambahkan foto"
          subtitle="Tunjukan pada tamu tentang tempat anda maksimal 4 foto"
        />
        <ImageUpload
          value={img}
          onChange={(value) => setCustomValue("img", value)}
        />
      </div>
    );
  }

  if (step === STEPS.FASILITAS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Fasilitas"
          subtitle="Fasilitas apa saja yang dalam category ini"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {facility.map((item) => (
            <div
              key={item.label}
              className="col-span-1 "
            >
              <Fasilitas
                icon={item.icon}
                label={item.label}
                onClick={(fasilitas) => setCustomValue("fasilitas", fasilitas)}
                selected={fasilitas}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Sekarang, tetapkan harga Anda"
          subtitle="Berapa biaya yang Anda kenakan per malam?"
        />
        <Input
          id="title"
          label="title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <TextArea
          id="description"
          disabled={isLoading}
          register={register}
          errors={errors}
          label="description"
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Sekarang, tetapkan harga Anda"
          subtitle="Berapa biaya yang Anda kenakan per malam?"
        />
        <InputIdr
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.TERM ? undefined : onBack}
      title="Properti"
      disabled={isLoading}
    />
  );
};

export default RentModal;
