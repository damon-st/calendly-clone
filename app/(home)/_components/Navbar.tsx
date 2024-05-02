import { ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
type Props = {};

export default function NavbarHome({}: Props) {
  return (
    <header className="w-full h-28 bg-white border-b border-colorBorder  fixed top-0 z-50">
      <div className="w-full h-[40%] bg-colorGris flex items-center justify-center">
        <div className="w-full h-full max-w-[1280px] flex items-center justify-end ">
          <div className=" flex items-center gap-2 cursor-pointer group ">
            <Globe
              className="text-colorText group-hover:text-colorAzul"
              size={20}
            />
            <span className="text-colorText group-hover:text-colorAzul text-sm font-girloyBold">
              Español
            </span>
            <ChevronDown
              size={20}
              className="text-colorText group-hover:text-colorAzul"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[60%] flex items-center justify-center">
        <div className="w-full max-w-[1280px] h-full flex items-center justify-between">
          <Link href="/" className="w-[13%]">
            <Image
              priority={false}
              loading="lazy"
              src="/logo.svg"
              alt="logo"
              width={60}
              height={60}
              className="w-full"
            />
          </Link>
          <ul className="hidden md:flex w-auto gap-6 h-full  items-center justify-between cursor-pointer">
            <li className="text-colorText font-girloyBold cursor-pointer hover:text-colorAzul">
              Producto
            </li>
            <li className="text-colorText font-girloyBold flex items-center gap-1 cursor-pointer hover:text-colorAzul">
              <span>Soluciones</span>
              <ChevronDown
                size={15}
                className="text-colorText cursor-pointer "
              />
            </li>
            <li className="text-colorText font-girloyBold cursor-pointer hover:text-colorAzul">
              Empresa
            </li>
            <li className="text-colorText font-girloyBold cursor-pointer hover:text-colorAzul">
              Precios
            </li>
            <li className="text-colorText font-girloyBold flex items-center gap-1 cursor-pointer hover:text-colorAzul">
              <span>Recursos</span>
              <ChevronDown size={15} className="text-colorText " />
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <SignedIn>
              <Button variant="azul" asChild>
                <Link href="/dashboard">My account</Link>
              </Button>
            </SignedIn>

            <SignedOut>
              <div className="flex gap-2 items-center">
                <Button variant="ghost" asChild>
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                <Button variant="azul" asChild>
                  <Link href="/signup">Comienza</Link>
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
