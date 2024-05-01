import { ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type Props = {};

export default function NavbarHome({}: Props) {
  return (
    <header className="w-full h-28 bg-white border-b border-colorBorder  fixed top-0 z-10">
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
          <Image
            priority={false}
            loading="lazy"
            src="/logo.svg"
            alt="logo"
            width={60}
            height={60}
            className="w-[13%]"
          />
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
            <Button variant="ghost">Inicar sesión</Button>
            <Button variant="azul">Comienza</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
