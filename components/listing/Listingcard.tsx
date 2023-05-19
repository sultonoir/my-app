"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import Button from "../shared/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import Link from "next/link";
import BluredImage from "../shared/BluredImage";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import HearthButton from "../shared/HeartButton";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  name?: string | null | undefined;
  properties?: boolean;
  countdown?: boolean;
  payment?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  name,
  properties,
  countdown,
  payment,
}) => {
  const newData = {
    ...data,
    imageSrc: data.imageSrc.map((src) => ({ name: src })),
  };

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    if (reservation) {
      const formattedPrice = formatter.format(reservation.totalPrice);
      return formattedPrice;
    }

    const formattedPrice = formatter.format(data.price);
    return formattedPrice;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onBreak = async () => {
    try {
      setIsLoading(true);

      if (data.status === "break") {
        await axios.post("/api/properties", {
          status: "aktif",
          listingId: data.id,
        });
        toast.success("Layanan diaktifkan");
        router.refresh();
      } else {
        await axios.post("/api/properties", {
          status: "break",
          listingId: data.id,
        });
        toast.success("Layanan dihentikan sementara");
        router.refresh();
      }
    } catch (error) {
      toast.error("Gagal menghentikan layanan");
    } finally {
      setIsLoading(false);
    }
  };

  const onPayment = () => {
    if (!currentUser) {
      return;
    }
    axios
      .post("/api/payment", {
        totalPrice: reservation?.totalPrice,
        title: reservation?.listing.title,
        image: [
          reservation?.listing.imageSrc[0],
          reservation?.listing.imageSrc[1],
        ],
        adminCos: reservation?.adminCost,
        reservationId: reservation?.id,
        userId: currentUser.id,
      })
      .then((response) => {
        const data = response.data.url;
        window.location.href = data;
      })
      .catch(() => {
        toast.error("Something went wrong.");
      });
  };

  const Label = useMemo(() => {
    if (data.status === "break") {
      return "Aktifkan layananan";
    }
    return "Hentikan layanan";
  }, [data.status]);

  return (
    <div className="relative">
      <Link
        href={`/listings/${data.id}`}
        className="col-span-1 cursor-pointer group"
      >
        <div className="flex flex-col gap-2 w-full">
          <div
            className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
          >
            <Swiper
              spaceBetween={30}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {newData.imageSrc.map((img) => {
                return (
                  <SwiperSlide key={img.name}>
                    <BluredImage
                      src={img.name}
                      alt={data.title}
                    />
                  </SwiperSlide>
                );
              })}
              <div className="swiper-button-prev hover:bg-white/75 absolute top-1/2 -translate-y-1/2 left-2 rounded-full  z-10 cursor-pointer">
                <BiChevronLeft size={20} />
              </div>
              <div className="swiper-button-next hover:bg-white/75 absolute top-1/2 right-2  -translate-y-1/2 rounded-full z-10 cursor-pointer">
                <BiChevronRight size={20} />
              </div>
            </Swiper>
          </div>

          <div className="font-semibold text-foreground capitalize">
            {data.title}
          </div>
          <div className="flex gap-2 font-light text-neutral-500 items-center">
            <GrLocation color="grey" />
            {data.locationValue}
          </div>

          <div className="font-light text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">{price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2">
        {/* {countdownStarted && (
          <div className="flex flex-row gap-x-2">
            <span className="flex flex-row gap-x-2">{hour}Jam</span>
            <span>:</span>
            <span className="flex flex-row gap-x-2">{minute}Menit</span>
          </div>
        )} */}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
        {properties && (
          <Button
            small
            onClick={onBreak}
            label={Label}
            disabled={isLoading}
          />
        )}
        {payment && (
          <div className="mt-2">
            <Button
              onClick={onPayment}
              small
              label="bayar"
            />
          </div>
        )}
      </div>
      <div
        className="
            absolute
            top-3
            right-3
            z-20
          "
      >
        <HearthButton
          listingId={data.id}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default ListingCard;
