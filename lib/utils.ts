import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TimeHour, TypeResultAction, TypeTimeHourValid } from "./types";

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
