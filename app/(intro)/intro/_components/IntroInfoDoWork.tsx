"use client";

import { createIntroInfoUser, updateIntroInfoUser } from "@/actions/intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type TypeIntroInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const options: Array<TypeIntroInfo> = [
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/sales-789580517907b915b50e.svg",
    title: "Ventas",
    value: "ventas",
  },
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/support-f7e9bedbb070ebbd02ff.svg",
    title: "Éxito del cliente",
    value: "customerSuccess",
  },
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/recruiting-162da8e5183f12bd0fda.svg",
    title: "Reclutamiento",
    value: "recruiting",
  },
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/marketing-497f438b77807f37aef7.svg",
    title: "Marketing",
    value: "marketing",
  },
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/educational-f83de37f564a6ada9c2d.svg",
    title: "Educación",
    value: "education",
  },
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/sales-789580517907b915b50e.svg",
    title: "Finanzas",
    value: "finance",
  },
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/consulting-5d9fbe54f0858359db24.svg",
    title: "Consultante",
    value: "consulting",
  },
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/other-d9eff0f37e4e3e0efdbc.svg",
    title: "Otro",
    value: "other",
  },
];

export default function IntroInfoDoWork() {
  const [otherValue, setOtherValue] = useState("");
  const router = useRouter();
  const [isPending, starTransition] = useTransition();

  const [typeSelect, setTypeSelect] = useState<TypeIntroInfo | null>(null);

  const handleClick = () => {
    if (!typeSelect) {
      toast.error("Please select one option");
      return;
    }
    if (isPending) return;
    starTransition(async () => {
      try {
        let value = typeSelect.value;
        if (typeOther) {
          value = otherValue.length > 1 ? otherValue : value;
        }
        const result = await updateIntroInfoUser(value);
        if (!result.success) {
          throw new Error(result.message);
        }

        router.push("/dashboard");
      } catch (error) {
        console.log(error);
        toast.error("Ups, something wrong please try again!");
      }
    });
  };

  const typeOther = typeSelect?.value == "other";

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-5xl gap-4">
      <div className="containerIntro w-full flex-row flex-wrap gap-4">
        {options.map((v) => (
          <button
            onClick={() => {
              if (isPending) return;
              setTypeSelect(v);
            }}
            key={v.value}
            type="button"
            className={cn(
              "containerIntroInfoWork hover:bg-colorAzul/10",
              typeSelect && typeSelect.value == v.value && "bg-colorAzul/10"
            )}
          >
            <picture>
              <img
                loading="lazy"
                src={v.imgUrl}
                alt="calendly"
                className="w-[50px] h-[57px]"
              />
            </picture>
            <span className="text-colorText font-girloyLight">{v.title}</span>
          </button>
        ))}

        {typeOther && (
          <div className="w-full mt-4 flex flex-col gap-4">
            <p className="text-colorText font-girloySemiBold text-lg">
              ¿Cuál es tu rol diario en el trabajo?
              <span className="text-[#1A1A1A9C] ml-2">(optional)</span>
            </p>
            <Input
              value={otherValue}
              onChange={(e) => setOtherValue(e.target.value)}
              className="w-full text-colorText font-girloyRegular "
              disabled={isPending}
              placeholder="You role at work"
            />
          </div>
        )}
      </div>

      <div className="w-full flex justify-end mt-8">
        <Button
          onClick={handleClick}
          disabled={isPending}
          variant="azul"
          className="rounded-full px-10"
        >
          {isPending ? (
            <Loader2 className="text-white animate-spin" />
          ) : (
            "Continuar"
          )}
        </Button>
      </div>
    </div>
  );
}
