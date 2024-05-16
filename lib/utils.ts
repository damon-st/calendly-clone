import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TimeHour, TypeResultAction, TypeTimeHourValid } from "./types";
import { ScheduleHoursM } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validFormatHour(value: string) {
  var patron = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (patron.test(value)) {
    return true;
  } else {
    return false;
  }
}

export function extractHourFromString(
  value: string
): TypeTimeHourValid | undefined {
  const valid = validFormatHour(value);
  if (!valid) return undefined;
  const [hourStr, minuteStr] = value.split(":");
  return {
    hour: parseInt(hourStr),
    min: parseInt(minuteStr),
    hourStr: hourStr,
    minStr: minuteStr,
  };
}

export const validTimeRangeTimeInit = (
  first: TimeHour,
  second: TimeHour
): TypeResultAction => {
  if (first.hour >= second.hour) {
    return {
      success: false,
      message: "Choose an end time later than the start time.",
    };
  }
  return {
    success: true,
    message: "Valid time",
  };
};
export const validTimeRangeTimeEnd = (
  first: TimeHour,
  second: TimeHour
): TypeResultAction => {
  if (first.hour <= second.hour) {
    return {
      success: false,
      message: "Choose an end time later than the start time.",
    };
  }
  return {
    success: true,
    message: "Valid time",
  };
};

export function formatHourMin(value: number) {
  if (value < 10) {
    return "0" + value;
  }
  return `${value}`;
}

export function divideArrayInParts<T>(arreglo: Array<T>, size: number) {
  var partes = [];
  for (var i = 0; i < arreglo.length; i += size) {
    partes.push(arreglo.slice(i, i + size));
  }
  return partes;
}

export function generateIntervalHours(
  hourInit: number,
  minuteInit: number,
  hourEnd: number,
  minuteEnd: number,
  minAditional: number,
  dateUsr: Date,
  dateSelect: Date,
  hourVerify: number
) {
  let intervals = [];
  let hourNow = hourInit;
  let minuteNow = minuteInit;

  // As long as the current time is less than or equal to the end time
  while (hourNow < hourEnd || (hourNow === hourEnd && minuteNow <= minuteEnd)) {
    // Adds the current time to the interval array
    intervals.push({ hora: hourNow, minuto: minuteNow });

    // Add 15 minutes to current time
    minuteNow += minAditional;

    // If the minutes exceed 59, adjust the hour and minutes
    if (minuteNow >= 60) {
      minuteNow -= 60;
      hourNow += 1;
    }
  }

  if (
    dateUsr.getDate() == dateSelect.getDate() &&
    dateUsr.getMonth() &&
    dateSelect.getMonth() &&
    dateUsr.getFullYear() == dateSelect.getFullYear()
  ) {
    const hourU = dateUsr.getHours() + hourVerify;
    return intervals.filter((v) => v.hora >= hourU);
  }
  return intervals;
}

export const compareDates = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export function excludeNulls<T>(data: Partial<T>) {
  const nuevoObjeto: any = {};
  for (const [clave, valor] of Object.entries(data)) {
    if (valor !== undefined && valor !== null) {
      nuevoObjeto[clave] = valor;
    }
  }
  return nuevoObjeto;
}

export function fomarmatHourTimezon(date: Date, timeZone: string) {
  return date.toLocaleString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatScheduleHour(
  idWeek: string,
  lastHour: ScheduleHoursM
): ScheduleHoursM {
  if (!lastHour) {
    return {
      hourInit: 9,
      hourInitStr: "09",
      minuteInit: 0,
      minuteInitStr: "00",
      hourEnd: 18,
      hourEndStr: "18",
      minuteEnd: 0,
      minuteEndStr: "00",
      order: 0,
      scheduleWeekDayId: idWeek,
      createdAt: new Date(),
      id: new Date().toISOString(),
      scheduleSpecificHourId: idWeek,
      updatedAt: new Date(),
    };
  }
  if (lastHour.hourEnd >= 23) {
    throw new Error("CAN NOT ADD MORE HOURS");
  }
  const hourInit = lastHour.hourEnd + 1;
  const hourInitStr = formatHourMin(hourInit);
  let hourEnd = hourInit + 1;
  let minuteEnd = lastHour.minuteEnd;
  let minuteEndStr = lastHour.minuteEndStr;
  if (hourEnd > 23) {
    hourEnd = 23;
    minuteEnd = 50;
    minuteEndStr = formatHourMin(minuteEnd);
  }
  const hourEndStr = formatHourMin(hourEnd);
  return {
    scheduleWeekDayId: idWeek,
    hourInit,
    hourInitStr,
    minuteInit: lastHour.minuteEnd,
    minuteInitStr: lastHour.minuteEndStr,
    hourEnd,
    hourEndStr,
    minuteEnd,
    minuteEndStr,
    order: lastHour.order + 1,
    createdAt: new Date(),
    id: new Date().toISOString(),
    scheduleSpecificHourId: "",
    updatedAt: new Date(),
  };
}
