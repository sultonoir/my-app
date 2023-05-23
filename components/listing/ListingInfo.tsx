import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { SafeUser } from "@/types";
import { GoLocation } from "react-icons/go";
import ListingCategory from "./ListingCategory";
import { useEffect, useMemo, useState } from "react";
import { getRegencyByName } from "territory-indonesia";
import Facility from "./Facility";
import Avatar from "../shared/Avatar";
import { Rating } from "@prisma/client";
import { IoStarSharp } from "react-icons/io5";

const Map = dynamic(() => import("../shared/Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  title: string;
  description: string;
  guestCount: number;
  roomCount: number;
  locationValue: string;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  fasilitas: {
    item: string;
  }[];
  nearest: {
    item: string;
  }[];
  id: string;
  rating: Rating[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  fasilitas,
  title,
  id,
  rating,
  nearest,
}) => {
  const [coordinate, setCoordinate] = useState<any>([]);

  function hitungRataRataRating(ratings: any) {
    let totalRating = 0;
    let jumlahData = 0;

    for (let i = 0; i < ratings.length; i++) {
      totalRating += ratings[i].value;
      jumlahData++;
    }

    const rataRata = totalRating / jumlahData;
    return isNaN(rataRata) ? 0 : rataRata.toFixed(1);
  }

  const rataRataRating = hitungRataRataRating(rating);

  useEffect(() => {
    const fetch = async () => {
      const cities = await getRegencyByName(locationValue);
      const citys = [cities.latitude, cities.longitude];
      setCoordinate(citys);
    };
    fetch();
  }, [id]);

  return (
    <div className="col-span-4 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold capitalize flex flex-col md:flex-row">
            <p>{title}.</p>
            <p>Tuan rumah {user?.name}</p>
          </div>
          <div className="flex flex-row items-center gap-2 text-neutral-500">
            <GoLocation />
            {locationValue}
          </div>
          <div className="flex flex-row items-center text-neutral-500">
            <span className="flex flex-col md:flex-row gap-1 px-1">
              <p>{guestCount}</p>
              <p>Tamu</p>
            </span>
            <span className="flex flex-col md:flex-row border-x gap-1 px-1">
              <p>{roomCount}</p>
              <p className="whitespace-nowrap">Kamar tidur</p>
            </span>
            <span className="flex flex-col md:flex-row gap-1 px-1">
              <p>{bathroomCount}</p>
              <p className="whitespace-nowrap">Kamar mandi</p>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Avatar src={user?.image} />
          <span className="flex flex-row gap-x-1">
            <IoStarSharp size={20} />
            {rataRataRating}
          </span>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <p className="font-semibold">Fasilitas</p>
      <div className="grid grid-cols-2">
        {fasilitas.map((item) => (
          <Facility
            key={item.item}
            label={item.item}
          />
        ))}
      </div>
      <hr />
      <p className="font-semibold">Wisata terdekat</p>
      <div className="grid grid-cols-2">
        {nearest.map((near) => (
          <ul key={near.item}>
            <li className="md:list-disc capitalize">{near.item}</li>
          </ul>
        ))}
      </div>
      {coordinate.length > 0 && <Map center={coordinate} />}
    </div>
  );
};

export default ListingInfo;
