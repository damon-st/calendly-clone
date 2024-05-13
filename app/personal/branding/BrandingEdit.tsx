"use client";

import { BrandingInfoUser, UserInfo } from "@/lib/types";
import { Info, Loader2, Trash2 } from "lucide-react";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import MsgLogo from "./MsgLogo";
import { Checkbox } from "@/components/ui/checkbox";
import MsgApplyOrg from "./MsgApplyOrg";
import { useShowModal } from "@/lib/store/useShowModal";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateInfoUser } from "@/actions/userActions";

type Props = {
  user: UserInfo;
};

const initialData: BrandingInfoUser = {
  applyAll: false,
  useCalendlyBrading: true,
};

export default function BrandingEdit({ user }: Props) {
  const [isPending, startTransition] = useTransition();
  const { onOpen } = useShowModal();
  const [fileLogo, setFileLogo] = useState<File | null>(null);
  const refInpuFile = useRef<HTMLInputElement | null>(null);
  const [brandingInfo, setBrandingInfo] = useState(
    user.brandingInfo ?? initialData
  );

  const toggleApplyAll = useCallback(() => {
    setBrandingInfo((p) => {
      return {
        ...p,
        applyAll: !p.applyAll,
      };
    });
  }, []);

  const onCropImage = useCallback((file: File) => {
    setFileLogo(file);
  }, []);

  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const files = e.target.files;
      if (files.length == 0) return;
      const file = files[0];
      onOpen("changeImgProfile", {
        file,
        onCropImage,
      });
      refInpuFile.current!.value = "";
    },
    [onCropImage, onOpen]
  );

  const urlImageFile = useMemo(() => {
    if (!fileLogo) return null;
    return URL.createObjectURL(fileLogo);
  }, [fileLogo]);

  const handleRemoveImage = useCallback(() => {
    setFileLogo(null);
    setBrandingInfo((p) => {
      return {
        ...p,
        logoUrl: undefined,
      };
    });
  }, []);

  const toggleUseCalendyBrand = useCallback(() => {
    setBrandingInfo((p) => {
      return {
        ...p,
        useCalendlyBrading: !p.useCalendlyBrading,
      };
    });
  }, []);

  const onSave = useCallback(() => {
    startTransition(async () => {
      try {
        let formData: FormData | undefined;

        if (fileLogo) {
          formData = new FormData();
          formData.append("files", fileLogo);
        }

        const response = await updateInfoUser(
          {
            brandingInfo,
          },
          formData,
          true
        );
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        if (fileLogo) {
          setFileLogo(null);
        }
        setBrandingInfo(response.data.brandingInfo);
        toast.success(response.message);
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    });
  }, [brandingInfo, fileLogo]);

  return (
    <section
      className={cn(
        "w-full px-6 flex flex-col md:max-w-[40%]",
        isPending && "pointer-events-none"
      )}
    >
      <p className="text-colorTextGris font-girloyBold">Account details</p>
      <h1 className="text-colorTextBlack font-girloyBold text-3xl">Branding</h1>
      <div className="w-full mt-10 flex flex-col gap-3">
        <div className="flex items-center gap-2 font-girloyBold">
          <p>Logo</p>
          <MsgLogo>
            <Info className="text-colorTextGris cursor-pointer" size={15} />
          </MsgLogo>
        </div>
        <p>
          Your company branding will appear at the top-left corner of the
          scheduling page.
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div
            onClick={toggleApplyAll}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox
              className="data-[state=checked]:bg-colorAzul"
              checked={brandingInfo.applyAll}
            />
            <p>Apply to all users in your organization</p>
          </div>
          <MsgApplyOrg>
            <Info className="text-colorTextGris cursor-pointer" size={15} />
          </MsgApplyOrg>
        </div>
        <div className="w-full min-h-44 border border-gray-400 rounded-lg mt-3 relative flex items-center justify-center">
          {!brandingInfo.logoUrl && !urlImageFile && (
            <p className="text-colorTextGris font-girloyBold text-2xl">
              No Logo
            </p>
          )}
          {urlImageFile && (
            <picture>
              <img src={urlImageFile} alt="image" className="size-full" />
            </picture>
          )}
          {brandingInfo.logoUrl && (
            <picture>
              <img
                src={brandingInfo.logoUrl}
                alt="image"
                className="size-full object-contain"
              />
            </picture>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer group">
              <input
                ref={refInpuFile}
                onChange={handleChangeFile}
                type="file"
                className="absolute size-full  opacity-0 cursor-pointer"
              />
              <button className="border border-colorTextBlack group-hover:bg-gray-100 rounded-full py-1 px-3">
                {fileLogo ? "Update" : "Upload image"}
              </button>
            </div>
            {fileLogo && (
              <button
                onClick={handleRemoveImage}
                type="button"
                className="flex items-center gap-2 hover:underline"
              >
                <Trash2 size={15} />
                <span>Remove</span>
              </button>
            )}
          </div>
          <span className="text-xs font-girloyRegular text-colorTextGris">
            JPG, GIF or PNG. Max size of 5MB.
          </span>
        </div>
        <div className="w-full h-[1px] bg-gray-300 mt-10 mb-5"></div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={toggleUseCalendyBrand}
        >
          <p className="font-girloyBold">Use calendly branding</p>
          <Switch
            checked={brandingInfo.useCalendlyBrading}
            className="data-[state=checked]:bg-colorAzul"
          />
        </div>
        <div className="w-full p-4 mt-5 bg-colorCeleste">
          <p>
            {brandingInfo.useCalendlyBrading
              ? "Calendly’s branding will be displayed on your scheduling page, notifications, and confirmations."
              : ` Calendly’s branding will not be displayed on your scheduling page.
            Additionally, the confirmation and notification emails sent to your
            invitees will feature your picture, rather than the Calendly logo.`}
          </p>
        </div>
        <div className="w-full flex items-center mt-5 gap-3">
          <Button
            onClick={onSave}
            disabled={isPending}
            variant="azul"
            className="rounded-full"
          >
            {isPending ? (
              <Loader2 className="text-white animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
          <Button
            disabled={isPending}
            variant="outline"
            className="rounded-full border border-colorTextBlack bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
}
