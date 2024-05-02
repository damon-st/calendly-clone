import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

type LinksT = {
  title: string;
  href: string;
};

const equipos: Array<LinksT> = [
  {
    title: "Ventas",
    href: "#",
  },
  {
    title: "Marketing",
    href: "#",
  },
  {
    title: "Éxito del cliente",
    href: "#",
  },
  {
    title: "Contratación",
    href: "#",
  },
  {
    title: "Tecnologia de la información",
    href: "#",
  },
  {
    title: "Operaciones de ingresos",
    href: "#",
  },
];

const industrias: Array<LinksT> = [
  {
    href: "#",
    title: "Tecnología",
  },
  {
    href: "#",
    title: "Servicios financieros",
  },
  {
    href: "#",
    title: "Servicios profesionales",
  },
  {
    href: "#",
    title: "Educación",
  },
];

const companys: Array<LinksT> = [
  {
    href: "#",
    title: "Clientes",
  },
  {
    href: "#",
    title: "Sobre nosotros",
  },
  {
    href: "#",
    title: "Liderazgo",
  },
  {
    href: "#",
    title: "Trabaja con nosotros",
  },
  {
    href: "#",
    title: "Sala de prensa",
  },
];

const resources: Array<LinksT> = [
  {
    href: "#",
    title: "Blog",
  },
  {
    href: "#",
    title: "Centro de recursos",
  },
  {
    href: "#",
    title: "Comunidad de Calendly",
  },
  {
    href: "#",
    title: "Compara",
  },
  {
    href: "#",
    title: "Conviértete en Socio",
  },
  {
    href: "#",
    title: "Herramientas para desarrolladores",
  },
];

const dowloads: Array<LinksT> = [
  {
    href: "#",
    title: "Calendly para iOS",
  },
  {
    href: "#",
    title: "Calendly para Android",
  },
  {
    href: "#",
    title: "Extensión de Chrome",
  },
  {
    href: "#",
    title: "Extensión de Firefox",
  },
];

const contacts: Array<LinksT> = [
  {
    href: "/signup",
    title: "Regístrate gratis",
  },
  {
    href: "#",
    title: "Habla con el departamento de ventas",
  },
  {
    href: "#",
    title: "Centro de ayuda",
  },
  {
    href: "#",
    title: "Contáctanos",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[1200px] pt-24 pb-24 flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full pb-6">
          <div className="w-full md:w-[40%] flex flex-col">
            <h2 className="text-colorText text-5xl font-girloyBold">
              Easy <span className="text-colorAzul">ahead</span>
              <span className="align-text-top text-sm">TM</span>
            </h2>
            <p className="text-lg text-colorTextO font-girloySemiBold mt-3 max-w-lg">
              Eliminamos el trabajo de conectar con otras personas para que
              puedas lograr más.
            </p>
          </div>
          <div className="w-full md:w-[60%] flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-lg flex flex-col">
              <div className="btnInfoCale  flex-col">
                <div className="bg-[#E6F0FF] px-3 py-1 rounded-lg w-fit text-[#004EBA] font-girloyRegular text-sm font-bold">
                  DESTACADO
                </div>
                <h4 className="text-colorText font-girloySemiBold text-2xl mt-3">
                  Informe anual de Calendly: El estado de la programación
                </h4>
                <p className="font-girloyLight text-lg text-colorText mt-3 ">
                  Descubre los datos más recientes sobre el futuro de la
                  programación con tecnología de IA.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 pb-6">
          <div className="w-full flex flex-col">
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group"
            >
              <h2 className="group-hover:underline ">Producto</h2>
              <ArrowRight className="text-colorText" />
            </Link>
            <ul className="w-full flex flex-col gap-4 pt-4 pb-4">
              <li>
                <Link href="#">
                  <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                    <span className="group-hover:underline">Enrutamiento</span>
                    <div className="px-2 py-[2px] bg-colorCeleste rounded-full text-colorTextAzulOther text-xs font-girloyRegular">
                      Nuevo
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                    <span className="group-hover:underline">
                      Disponibilidad
                    </span>
                    <div className="px-2 py-[2px] bg-colorBorder rounded-full text-colorText text-xs font-girloyRegular">
                      Popular
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                    <span className="group-hover:underline">
                      Programación de equipos
                    </span>
                    <div className="px-2 py-[2px] bg-colorBorder rounded-full text-colorText text-xs font-girloyRegular">
                      Popular
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                    <span className="group-hover:underline">Integraciones</span>
                  </div>
                </Link>
              </li>
            </ul>
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group mb-4"
            >
              <h2 className="group-hover:underline ">Equipos y empresas</h2>
              <ArrowRight className="text-colorText" />
            </Link>
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group"
            >
              <h2 className="group-hover:underline ">Precios</h2>
              <ArrowRight className="text-colorText" />
            </Link>
          </div>
          <div className="w-full flex flex-col">
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group"
            >
              <h2 className="group-hover:underline ">Equipos</h2>
            </Link>
            <ul className="w-full flex flex-col gap-4 pt-4 pb-4">
              {equipos.map((v) => (
                <li key={v.title}>
                  <Link href={v.href}>
                    <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                      <span className="group-hover:underline">{v.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex flex-col">
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group"
            >
              <h2 className="group-hover:underline ">Industrias</h2>
            </Link>
            <ul className="w-full flex flex-col gap-4 pt-4 pb-4">
              {industrias.map((v) => (
                <li key={v.title}>
                  <Link href={v.href}>
                    <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                      <span className="group-hover:underline">{v.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex flex-col">
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group"
            >
              <h2 className="group-hover:underline ">Compañía</h2>
            </Link>
            <ul className="w-full flex flex-col gap-4 pt-4 pb-4">
              {companys.map((v) => (
                <li key={v.title}>
                  <Link href={v.href}>
                    <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                      <span className="group-hover:underline">{v.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 pb-6">
          <div className="w-full flex flex-col">
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group"
            >
              <h2 className="group-hover:underline ">Recursos</h2>
            </Link>
            <ul className="w-full flex flex-col gap-4 pt-4 pb-4">
              {resources.map((v) => (
                <li key={v.title}>
                  <Link href={v.href}>
                    <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                      <span className="group-hover:underline">{v.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex flex-col">
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group"
            >
              <h2 className="group-hover:underline ">Descargas</h2>
            </Link>
            <ul className="w-full flex flex-col gap-4 pt-4 pb-4">
              {dowloads.map((v) => (
                <li key={v.title}>
                  <Link href={v.href}>
                    <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                      <span className="group-hover:underline">{v.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex flex-col">
            <Link
              href="#"
              className="text-colorText text-lg flex items-center gap-2 font-girloyBold font-bold group"
            >
              <h2 className="group-hover:underline ">Conéctate</h2>
            </Link>
            <ul className="w-full flex flex-col gap-4 pt-4 pb-4">
              {contacts.map((v) => (
                <li key={v.title}>
                  <Link href={v.href}>
                    <div className="flex items-center gap-2 text-colorText group font-girloyRegular">
                      <span className="group-hover:underline">{v.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full  border-t border-colorBorder flex flex-col md:flex-row justify-between pt-11">
          <div className="w-full flex flex-col md:flex-row justify-between">
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
            <div className="flex items-center gap-6">
              <Link href="#" className="text-colorText font-semibold text-sm">
                Legal
              </Link>
              <Link href="#" className="text-colorText font-semibold text-sm">
                Status
              </Link>
              <Link href="#" className="text-colorText font-semibold text-sm">
                Security
              </Link>
              <Link href="#" className="text-colorText font-semibold text-sm">
                Congituración de cookies
              </Link>
              <Link
                href="#"
                className="text-colorText font-semibold text-sm flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="14"
                  fill="none"
                  viewBox="0 0 30 14"
                >
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M7.4 12.8h6.8l3.1-11.6H7.4C4.2 1.2 1.6 3.8 1.6 7c0 3.2 2.6 5.8 5.8 5.8Z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill="#06F"
                    fill-rule="evenodd"
                    d="M22.6 0H7.4c-3.9 0-7 3.1-7 7s3.1 7 7 7h15.2c3.9 0 7-3.1 7-7s-3.2-7-7-7Zm-21 7c0-3.2 2.6-5.8 5.8-5.8h9.9l-3.1 11.6H7.4c-3.2 0-5.8-2.6-5.8-5.8Z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill="#fff"
                    d="M24.6 4c.2.2.2.6 0 .8L22.5 7l2.2 2.2c.2.2.2.6 0 .8-.2.2-.6.2-.8 0l-2.2-2.2-2.2 2.2c-.2.2-.6.2-.8 0-.2-.2-.2-.6 0-.8L20.8 7l-2.2-2.2c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0l2.2 2.2L23.8 4c.2-.2.6-.2.8 0Z"
                  ></path>
                  <path
                    fill="#06F"
                    d="M12.7 4.1c.2.2.3.6.1.8L8.6 9.8c-.1.1-.2.2-.3.2-.2.1-.5.1-.7-.1L5.4 7.7c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0L8 8.6l3.8-4.5c.2-.2.6-.2.9 0Z"
                  ></path>
                </svg>
                <span>Your Privacy Choices</span>
              </Link>
            </div>
            <div className="flex items-center justify-between gap-5">
              <Link href="https://twitter.com/calendly">
                <Twitter className="text-colorText" size={30} />
              </Link>
              <Link href="https://www.facebook.com/calendly">
                <Facebook className="text-colorText" size={30} />
              </Link>
              <Link href="https://www.instagram.com/calendly/">
                <Instagram className="text-colorText" size={30} />
              </Link>
              <Link href="https://www.linkedin.com/company/calendly/life/lifeatcalendly/">
                <Linkedin className="text-colorText" size={30} />
              </Link>
              <Link href="https://www.youtube.com/c/Calendly">
                <Youtube className="text-colorText" size={30} />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center mt-4">
          <span className="text-sm text-colorText font-girloyLight">
            Copyright Calendly {year}
          </span>
        </div>
      </div>
    </div>
  );
}
