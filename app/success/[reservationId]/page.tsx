import React from "react";
import SuccessClient from "./SuccessClient";

interface Iparams {
  reservationId: string;
}
const page = ({ params }: { params: Iparams }) => {
  return <SuccessClient id={params.reservationId} />;
};

export default page;
