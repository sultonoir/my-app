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
import getResrvStatus from "@/components/actions/getResrvStatus";
import getNotifications from "@/components/actions/getNotifications";

const font = Nunito({
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata = {
  title: "KyOuka",
  description:
    "KyOuka adalah platform daring yang memungkinkan orang untuk menyewakan properti atau kamar tidur mereka kepada wisatawan atau tamu yang mencari tempat menginap sementara. Dengan menggunakan KyOuka, pemilik properti dapat mempromosikan ruang mereka, menetapkan harga, dan menyediakan informasi tentang fasilitas yang tersedia. Di sisi lain, para pengguna KyOuka dapat mencari dan memesan akomodasi sesuai dengan preferensi mereka, baik untuk liburan, perjalanan bisnis, atau tujuan lainnya.",
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

  const notifications = await getNotifications({ authorId: currentUser?.id });
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
        <Navbar
          currentUser={currentUser}
          notifications={notifications}
        />
        <ToasterProvider />
        <SearchModal districts={districts} />
        <LoginModal />
        <RegisterModal />
        <RentModal districts={districts} />
        <div className="pb-20 pt-28">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
