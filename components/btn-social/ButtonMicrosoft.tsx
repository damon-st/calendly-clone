import { Button } from "../ui/button";

type Props = {};

export default function ButtonMiscrosoft({}: Props) {
  return (
    <Button className="bg-colorText flex items-center justify-center gap-2 p-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="41"
        fill="none"
        viewBox="0 0 40 41"
      >
        <rect width="40" height="40" y="0.5" fill="#fff" rx="4"></rect>
        <path fill="#FEBA08" d="M21.023 21.523H31.25V31.75H21.023z"></path>
        <path fill="#05A6F0" d="M8.75 21.523h10.227V31.75H8.75z"></path>
        <path fill="#80BC06" d="M21.023 9.25H31.25v10.227H21.023z"></path>
        <path fill="#F25325" d="M8.75 9.25h10.227v10.227H8.75z"></path>
      </svg>
      <span className="text-white font-girloyBold text-xl">
        Registrarse con Microsoft
      </span>
    </Button>
  );
}
