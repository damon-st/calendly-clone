import { updateCountryUser } from "@/actions/userActions";
import { CountryInfoUser } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { getCountry } from "countries-and-timezones";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { ip, update } = await req.json();

    const response = await axios.get(
      `https://ipinfo.io/widget/demo/${ip}?dataset=geolocation`
    );

    if (update) {
      const data = response.data.data;
      const countryCode = data.country;
      const tempInfo = getCountry(countryCode);
      const timezone = data.timezone;
      const countryInfo = <CountryInfoUser>{
        countryCode,
        countryName: tempInfo.name,
        timezone,
      };
      await updateCountryUser(userId, countryInfo);
      console.log("[UPDATE_COUNTRY_SUCCESS]");
    }

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("INTERNAL ERROR", { status: 500 });
  }
}
