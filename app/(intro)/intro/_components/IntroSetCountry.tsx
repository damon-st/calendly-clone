"use client";
import { getCountryUser } from "@/lib/services/getCountryUser";
import { UserInfo } from "@/lib/types";
import React, { useEffect } from "react";

type Props = {
  user: UserInfo;
};

export default function IntroSetCountry({ user }: Props) {
  useEffect(() => {
    if (user.countryInfo) return;
    const hanlde = async () => {
      try {
        await getCountryUser(user.userId);
      } catch (error) {
        console.log(error);
      }
    };
    hanlde();
  }, [user.countryInfo, user.userId]);

  return null;
}
