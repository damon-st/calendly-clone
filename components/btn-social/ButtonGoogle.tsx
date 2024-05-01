import { Button } from "../ui/button";

type Props = {};

export default function ButtonGoogle({}: Props) {
  return (
    <Button
      variant="azul"
      className="flex items-center justify-center gap-2 p-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="41"
        fill="none"
        viewBox="0 0 40 41"
      >
        <rect width="40" height="40" y="0.5" fill="#fff" rx="4"></rect>
        <g clipPath="url(#googleLogo_svg__a)">
          <path
            fill="#4285F4"
            d="M31.766 20.776c0-.815-.066-1.635-.207-2.438H20.24v4.621h6.482a5.554 5.554 0 0 1-2.399 3.647v2.998h3.867c2.271-2.09 3.576-5.177 3.576-8.828Z"
          ></path>
          <path
            fill="#34A853"
            d="M20.24 32.5c3.237 0 5.966-1.062 7.955-2.896l-3.867-2.998c-1.076.731-2.465 1.146-4.084 1.146-3.13 0-5.784-2.112-6.737-4.952h-3.99v3.091a12.002 12.002 0 0 0 10.723 6.61Z"
          ></path>
          <path
            fill="#FBBC04"
            d="M13.503 22.8a7.187 7.187 0 0 1 0-4.594v-3.091H9.517a12.01 12.01 0 0 0 0 10.776l3.986-3.09Z"
          ></path>
          <path
            fill="#EA4335"
            d="M20.24 13.25a6.52 6.52 0 0 1 4.603 1.799l3.427-3.426A11.533 11.533 0 0 0 20.24 8.5a11.998 11.998 0 0 0-10.723 6.614l3.986 3.09c.948-2.843 3.607-4.955 6.737-4.955Z"
          ></path>
        </g>
        <defs>
          <clipPath id="googleLogo_svg__a">
            <path fill="#fff" d="M8 8.5h24v24H8z"></path>
          </clipPath>
        </defs>
      </svg>
      <span className="text-white font-girloyBold text-xl">
        Registrarse con google
      </span>
    </Button>
  );
}
