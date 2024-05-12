"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Info, Loader2, Trash2Icon } from "lucide-react";
import {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import { Input } from "@/components/ui/input";
import { useShowModal } from "@/lib/store/useShowModal";
import { Textarea } from "@/components/ui/textarea";
import InfoName from "./InfoName";
import InfoWelcomeMsg from "./InfoWelcomeMsg";
import { CountryInfoUser, UserInfo } from "@/lib/types";
import ClockTime from "./ClockTime";
import { Button } from "@/components/ui/button";
import TimeZoneSelect from "@/components/global/TimeZoneSelect";
import CountrySelect from "@/components/global/CountrySelect";
import { toast } from "sonner";
import { updateInfoUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";

type Props = {
  user: UserInfo;
};

export default function ProfileSettings({ user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { onOpen } = useShowModal();
  const [nameUser, setNameUser] = useState(user.name ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageProfile, setImageProfile] = useState(user.imageUrl ?? "");
  const [welcomeMsg, setWelcomeMsg] = useState(user.welcomeMsg);
  const [countryInfo, setCountryInfo] = useState(user.countryInfo);
  const refInputFile = useRef<HTMLInputElement | null>(null);

  const handleChageName = useCallback((e: { target: { value: string } }) => {
    setNameUser(e.target.value);
  }, []);

  const onCropImage = useCallback((file: File) => {
    setImageFile(file);
    setImageProfile(URL.createObjectURL(file));
  }, []);

  const handleChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) {
        return;
      }
      const file = files[0];
      refInputFile.current!.value = "";
      onOpen("changeImgProfile", {
        file,
        onCropImage,
      });
    },
    [onCropImage, onOpen]
  );

  const handleRemovImage = useCallback(() => {
    setImageFile(null);
    setImageProfile(user.imageUrl ?? "");
  }, [user.imageUrl]);

  const onSave = useCallback(() => {
    startTransition(async () => {
      try {
        if (nameUser.length < 2) {
          toast.error("Please the name is required");
          return;
        }
        let formData: FormData | undefined;
        if (imageFile) {
          formData = new FormData();
          formData.append("files", imageFile);
        }
        const response = await updateInfoUser(
          {
            name: nameUser,
            welcomeMsg,
            countryInfo,
          },
          formData
        );
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        if (imageFile) {
          setImageFile(null);
          setImageProfile(response.data.imageUrl);
          router.refresh();
        }
        toast.success(response.message);
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    });
  }, [countryInfo, imageFile, nameUser, router, welcomeMsg]);

  const handleChangeCountry = useCallback((e: string, code: string) => {
    setCountryInfo((p) => {
      let temp: CountryInfoUser | null = null;
      if (p) {
        temp = {
          countryCode: code,
          countryName: e,
          timezone: p.timezone,
        };
      }
      return temp;
    });
  }, []);

  const handleChangeTimezone = useCallback((e: string) => {
    setCountryInfo((p) => {
      let temp: CountryInfoUser | null = null;
      if (p) {
        temp = {
          countryCode: p.countryCode,
          countryName: p.countryName,
          timezone: e,
        };
      }
      return temp;
    });
  }, []);
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex items-center gap-2">
        <Avatar className="size-24">
          <AvatarImage src={imageProfile} />
          <AvatarFallback>
            {(user.name?.substring(0, 2) ?? "US").toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col font-girloyRegular gap-2 relative">
          <div className="w-full flex items-center justify-between gap-5">
            <div className="w-[60%] relative cursor-pointer group flex items-center justify-between">
              <input
                ref={refInputFile}
                onChange={handleChangeImage}
                accept="image/*"
                type="file"
                className="opacity-0 absolute cursor-pointer w-full"
              />
              <button className="cursor-pointer group-hover:bg-gray-100 rounded-full border border-colorTextBlack px-3 py-1 w-full">
                {imageFile ? "Update" : "Upload picture"}
              </button>
            </div>
            {imageFile && (
              <div className="flex items-center">
                <button
                  onClick={handleRemovImage}
                  className="flex items-center gap-3 hover:underline"
                >
                  <Trash2Icon />
                  <span>Remove</span>
                </button>
              </div>
            )}
          </div>
          <span
            className="text-colorTextGris
          "
          >
            JPG, GIF or PNG. Max size of 5MB.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className="font-girloyBold text-colorTextBlack">Name</p>
          <InfoName>
            <Info className="cursor-pointer" size={15} />
          </InfoName>
        </div>
        <Input
          onChange={handleChageName}
          placeholder="Your name"
          value={nameUser}
          className="w-full md:max-w-[40%] min-h-11 border border-gray-400"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className="font-girloyBold text-colorTextBlack">Welcome Message</p>
          <InfoWelcomeMsg>
            <Info className="cursor-pointer" size={15} />
          </InfoWelcomeMsg>
        </div>
        <Textarea
          onChange={(e) => setWelcomeMsg(e.target.value)}
          placeholder="Your name"
          value={welcomeMsg}
          className="w-full md:max-w-[40%] min-h-28 border border-gray-400"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className="font-girloyBold text-colorTextBlack">Lenguage</p>
        </div>
        <div className="w-full md:max-w-[40%] min-h-11 border border-gray-400 bg-white rounded-lg px-3 flex items-center justify-between">
          <p>English</p>
          <ChevronDown size={15} className="text-colorAzul" />
        </div>
      </div>
      <div className="flex flex-row justify-between gap-6 w-full md:max-w-[40%]">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <p className="font-girloyBold text-colorTextBlack">Date format</p>
            <Info className="cursor-pointer" size={15} />
          </div>
          <div className="w-full  min-h-11 border border-gray-400 bg-white rounded-lg px-3 flex items-center justify-between">
            <p>DD/MM/YYYY</p>
            <ChevronDown size={15} className="text-colorAzul" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <p className="font-girloyBold text-colorTextBlack">Time format</p>
            <Info className="cursor-pointer" size={15} />
          </div>
          <div className="w-full  min-h-11 border border-gray-400 bg-white rounded-lg px-3 flex items-center justify-between">
            <p>24h</p>
            <ChevronDown size={15} className="text-colorAzul" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className="font-girloyBold text-colorTextBlack">Country</p>
        </div>
        <CountrySelect onChangeContry={handleChangeCountry}>
          <div className="w-full md:max-w-[40%] min-h-11 border border-gray-400 bg-white rounded-lg px-3 flex items-center justify-between cursor-pointer">
            <p>{countryInfo?.countryName}</p>
            <ChevronDown size={15} className="text-colorAzul" />
          </div>
        </CountrySelect>
      </div>
      <div className="flex flex-col gap-1 md:max-w-[40%]">
        <div className="flex items-center gap-3 justify-between">
          <p className="font-girloyBold text-colorTextBlack">Time Zone</p>
          <ClockTime timezone={countryInfo?.timezone ?? ""} />
        </div>
        <TimeZoneSelect
          country={countryInfo?.countryName}
          onChange={handleChangeTimezone}
        >
          <div className="w-full min-h-11 border border-gray-400 bg-white rounded-lg px-3 flex items-center justify-between cursor-pointer">
            <div>
              <p>{countryInfo?.timezone} </p>
              <span className="text-colorTextGris text-sm font-girloyLight">
                {countryInfo?.countryName} Time
              </span>
            </div>
            <ChevronDown size={15} className="text-colorAzul" />
          </div>
        </TimeZoneSelect>
      </div>
      <div className="flex items-center gap-5">
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
          className="border border-gray-400 rounded-full"
        >
          Cancel
        </Button>
      </div>
      <div className="h-12" />
    </div>
  );
}
