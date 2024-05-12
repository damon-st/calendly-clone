import axios from "axios";
import { getCountry } from "countries-and-timezones";
import { CountryInfoUser } from "../types";
export const getCountryUser = async (userId: string, update = true) => {
  try {
    const reponse = await axios.get("https://api.ipify.org/?format=json", {});
    const ip = reponse.data.ip;
    const result = await axios.post("/api/get-country", {
      ip,
      userId,
      update,
    });
    const data = result.data.data;
    const countryCode = data.country;
    const tempInfo = getCountry(countryCode);
    const timezone = data.timezone;
    return <CountryInfoUser>{
      countryCode,
      countryName: tempInfo.name,
      timezone,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
