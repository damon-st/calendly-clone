import Footer from "@/components/global/Footer";
import { ReactNode } from "react";
import NavbarHome from "./_components/Navbar";

type Props = {
  children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <main className="size-full">
      <NavbarHome />
      {children}
      <Footer />
    </main>
  );
}
