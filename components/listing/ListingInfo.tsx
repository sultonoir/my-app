import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { SafeUser } from "@/types";
import { GoLocation } from "react-icons/go";
import ListingCategory from "./ListingCategory";
import { useEffect, useMemo, useState } from "react";
import { getRegencyByName } from "territory-indonesia";
import Facility from "./Facility";
import Avatar from "../shared/Avatar";

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
}) => {
  const [coordinate, setCoordinate] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const cities = await getRegencyByName(locationValue);
      const citys = [cities.latitude, cities.longitude];
      setCoordinate(citys);
    };
    fetch();
  }, []);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold uppercase ">
            {title} | Tuan rumah {user?.name}
          </div>
          <div className="flex flex-row items-center gap-2 text-neutral-500">
            <GoLocation />
            {locationValue}
          </div>
          <div className="flex flex-row items-center text-neutral-500">
            <span className="pr-2 border-r border-neutral">
              {guestCount} Tamu
            </span>
            <span className="px-2 border-r border-neutral">
              {roomCount} Kamar tidur
            </span>
            <span className="px-2">{bathroomCount} Kamar mandi </span>
          </div>
        </div>
        <Avatar src={user?.image} />
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
      <div className="grid grid-cols-2">
        {fasilitas.map((item) => (
          <Facility
            key={item.item}
            label={item.item}
          />
        ))}
      </div>
      {coordinate.length > 0 && <Map center={coordinate} />}
    </div>
  );
};

export default ListingInfo;
