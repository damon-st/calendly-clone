"use client";

import { createIntroInfoUser } from "@/actions/intro";
import { Button } from "@/components/ui/button";
import { type TypeIntroInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const options: Array<TypeIntroInfo> = [
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/solo-7b5b53c4a168c21d15bd.svg",
    title: "Por mi cuenta",
    value: "onMyOwn",
  },
  {
    imgUrl:
      "https://assets.calendly.com/assets/intro/media/team-026174625319a8144581.svg",
    title: "Con mi equipo",
    value: "whithMyTeam",
  },
];

export default function IntroInfoTeam() {
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
        const result = await createIntroInfoUser(typeSelect.value);
        if (!result.success) {
          throw new Error(result.message);
        }
        router.refresh();
      } catch (error) {
        console.log(error);
        toast.error("Ups, something wrong please try again!");
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-5xl gap-4">
      <div className="containerIntro w-full flex-col md:flex-row gap-4 ">
        {options.map((v) => (
          <button
            onClick={() => {
              if (isPending) return;
              setTypeSelect(v);
            }}
            key={v.value}
            type="button"
            className={cn(
              "containerIntroInfo hover:bg-colorAzul/10",
              typeSelect && typeSelect.value == v.value && "bg-colorAzul/10"
            )}
          >
            <picture>
              <img
                loading="lazy"
                src={v.imgUrl}
                alt="calendly"
                className="size-[114px]"
              />
            </picture>
            <span className="text-colorText font-girloyLight">{v.title}</span>
          </button>
        ))}
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
