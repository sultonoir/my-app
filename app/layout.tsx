import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import RegisterModal from "../components/modal/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";
import LoginModal from "../components/modal/LoginModal";
import getCurrentUser from "../components/actions/getCurrentUser";
import RentModal from "../components/modal/RentModal";
import SearchModal from "../components/modal/SearchModal";
import { Analytics } from "@vercel/analytics/react";
import { getAllRegencies } from "territory-indonesia";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const location = await getAllRegencies();
  const districts = location.map((loc) => ({
    value: loc.name,
    altName: loc.alt_name,
    latlng: [loc.latitude, loc.longitude],
  }));
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/logo.svg"
        />
      </head>
      <body className={font.className}>
        <Navbar currentUser={currentUser} />
        <ToasterProvider />
        <SearchModal districts={districts} />
        <LoginModal />
        <RegisterModal />
        <RentModal districts={districts} />
        <div className="pb-20 pt-28">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
