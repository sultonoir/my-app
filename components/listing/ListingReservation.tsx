"use client";
import { Range } from "react-date-range";
import Calender from "../inputs/Calendar";
import Button from "../shared/Button";
interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDate: Date[];
  cost: number;
  dayCount: number;
}
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onSubmit,
  disabled,
  disabledDate,
  onChangeDate,
  cost,
  dayCount,
}) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const priceRupiah = formatter.format(price);
  const totalPriceRupiah = formatter.format(totalPrice);
  const adminCost = formatter.format(cost);
  const allCost = formatter.format(cost + totalPrice);
  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">{priceRupiah}</div>
        <div className="font-light text-neutral-600">/ Malam</div>
      </div>
      <hr />
      <Calender
        value={dateRange}
        disabledDates={disabledDate}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Reserve"
          onClick={onSubmit}
        />
      </div>
      <div className="flex flex-col gap-y-2 p-4">
        <div className="flex flex-row items-center justify-between font-semibold  text-neutral-500">
          <div>Biaya admin</div>
          <div>{adminCost}</div>
        </div>
        <div className="flex flex-row items-center justify-between font-semibold  text-neutral-500">
          <span>
            {dayCount === 0 ? (
              "1 Malam"
            ) : (
              <span className="flex flex-row gap-2">{dayCount} Malam</span>
            )}
          </span>
          <span>{totalPriceRupiah}</span>
        </div>
        <hr />
        <div className="flex flex-row items-center justify-between font-semibold text-lg">
          <div>Total biaya</div>
          <div>{allCost}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
