"use client";

import { useCallback, useMemo } from "react";
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

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  name?: string | null | undefined;
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
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </Link>
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
