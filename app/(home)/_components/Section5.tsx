import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Section5() {
  const images = [
    "https://images.ctfassets.net/k0lk9kiuza3o/7CgfGSU35z1d8KW50Z7RVf/bb21b5143c829f1ba5c466b75e08f1cd/Security-SOC.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/438lMrSBKgnTeDLKMLKEoF/0593e9259a470e8c6d7527b61b4d2e42/Security-DSS.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/5HqO62N0euqpUsf15k6OwT/be8fb24f0fc5c78b5797483daa3ad8ed/Security-GDPR.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/JhVmIAFIySgktxYelNuwK/b479e76d350bde3b62394e7ee86952e1/Security-CCPA.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/78FV1ztfCpTrnX8th78JP0/2cc579fd4fa57adc6856a3022ad7bebe/Security-Star.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/4dQ1GKECtZ2SMn9R44eySA/0b663a82cbc8c24fe4d6805c02d9a7a0/Sercurity-ISO_27001.svg",
  ];
  return (
    <div className="w-full pt-32 pb-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center justify-center">
        <div className="rounded-full border border-colorBorder p-1 flex items-center justify-between gap-2">
          <div className="text-white font-girloySemiBold bg-colorAzul text-sm rounded-full py-[2px] px-2">
            New
          </div>
          <div className="flex items-center gap-2 text-colorText font-girloyLight text-sm">
            <span>ISO-27001 Certification</span>
            <ArrowRight className="text-colorText" size={10} />
          </div>
        </div>
        <h2 className="text-colorText font-girloyBold text-5xl mt-5 mb-5">
          Built to keep your organization secure
        </h2>
        <div className="w-full flex items-center justify-evenly mt-10 mb-10">
          {images.map((i) => (
            <picture key={i}>
              <img
                loading="lazy"
                src={i}
                alt="img"
                className="w-auto h-[112px]"
              />
            </picture>
          ))}
        </div>
        <p className="text-lg font-girloyRegular text-colorText max-w-3xl text-center mb-5">
          Keep your scheduling data secure with enterprise-grade admin
          management, security integrations, data governance, compliance audits,
          and privacy protections.
        </p>
        <Link
          href="#"
          className="text-colorAzul font-semibold text-lg flex items-center gap-2 group hover:text-colorText"
        >
          <span>Learn more</span>
          <ArrowRight className="transition-transform duration-300 text-colorAzul group-hover:text-colorText group-hover:translate-x-2" />
        </Link>
      </div>
    </div>
  );
}
