import { shootFireworks } from "@/libs/succes";
import { Transition } from "@headlessui/react";
import axios from "axios";
import React from "react";

interface Iparams {
  success: string;
}
const page = async ({ params }: { params: Iparams }) => {
  const [showMessage, setShowMessage] = React.useState(false);

  if (params.success === "success") {
    shootFireworks();
    setShowMessage(true);
    axios.put("/api/updateres", {
      status: "success",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Transition
        show={showMessage}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex flex-col items-center">
          <svg
            className="w-24 h-24 text-green-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-2.5-1.5l-5 5-2.5-2.5-1.5 1.5 4 4 6.5-6.5-1.5-1.5z"
            />
          </svg>
          <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h1>
          <p className="text-gray-600 text-center">
            Terima kasih atas pembayaran Anda. Transaksi Anda telah berhasil
            diproses.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md mt-4 focus:outline-none">
            Kembali ke Halaman Utama
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default page;
