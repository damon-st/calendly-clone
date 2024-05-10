"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BackButton() {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full size-11 bg-white border border-gray-300 flex items-center justify-center hover:bg-colorCeleste"
    >
      <ArrowLeft className="text-colorAzul font-bold" size={30} />
    </button>
  );
}
