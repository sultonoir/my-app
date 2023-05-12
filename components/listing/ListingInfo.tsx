import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { SafeUser } from "@/types";
import Avatar from "../shared/Avatar";
import ListingCategory from "./ListingCategory";
import { useEffect, useMemo, useState } from "react";
import { getRegencyByName } from "territory-indonesia";
import Facility from "./Facility";

const Map = dynamic(() => import("../shared/Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
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
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            font-light
            text-neutral-500
          "
        >
          <div className="pr-2 border-r border-neutral-500">
            {guestCount} Tamu
          </div>
          <div className="px-2 border-r border-neutral-500">
            {roomCount} Kamar
          </div>
          <div className="px-2 border-neutral-500">
            {bathroomCount} Kamar mandi
          </div>
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
