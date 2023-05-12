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
}
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onSubmit,
  disabled,
  disabledDate,
  onChangeDate,
}) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const priceRupiah = formatter.format(price);
  const totalPriceRupiah = formatter.format(totalPrice);
  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">{priceRupiah}</div>
        <div className="font-light text-neutral-600">night</div>
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
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>{totalPriceRupiah}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
