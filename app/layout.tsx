import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modal/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modal/RentModal";
import SearchModal from "./components/modal/SearchModal";
import { Analytics } from "@vercel/analytics/react";

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
        <SearchModal />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <div className="pb-20 pt-28">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
