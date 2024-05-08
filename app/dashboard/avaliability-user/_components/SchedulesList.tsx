"use client";
import { ScheduleTypeWithHours, ShedulesWithTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronDown,
  Copy,
  Edit2Icon,
  List,
  LucideCalendarHeart,
  Plus,
  Settings,
  Star,
  Trash,
} from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import WeekDay from "./WeekDay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditNameAvailability } from "@/lib/store/useModalEditNameAvailability";
import { useRemoveAvailability } from "@/lib/store/useRemoveAvailability";
import { toast } from "sonner";
import { makeDefautlScheduleAvailability } from "@/actions/schedules";
import CalendarCustom from "@/components/calendar/CalendarCustom";

type Props = {
  userId: string;
  schedules: ShedulesWithTypes;
};

type TypeView = "ListView" | "CalendarView";

export default function SchedulesList({ schedules, userId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [schedulesList, setSchedulesList] = useState(schedules);
  const [typeView, setTypeView] = useState<TypeView>("ListView");
  const [scheduleSelect, setScheduleSelect] = useState(() =>
    schedules.length ? schedules[0] : null
  );
  const { onOpen } = useEditNameAvailability();
  const { onOpen: onOpenRemoveAv } = useRemoveAvailability();
  useEffect(() => {
    setSchedulesList(schedules);
    if (schedules.length == 0) {
      setScheduleSelect(null);
      return;
    }
    setSchedulesList(schedules);
    if (!scheduleSelect) {
      setScheduleSelect(schedules[0]);
      return;
    }
    if (scheduleSelect && !schedules.some((v) => v.id == scheduleSelect.id)) {
      setScheduleSelect(schedules[0]);
      return;
    }
  }, [schedules]);

  const onEditName = () => {
    onOpen({
      id: scheduleSelect?.id,
      previusTitle: scheduleSelect?.title,
      onChange: onChangeTitle,
    });
  };

  const onChangeTitle = (e: string) => {
    if (!scheduleSelect) return;
    setScheduleSelect({ ...scheduleSelect, title: e });
    setSchedulesList((p) => {
      let tmp = [...p].map((v) => {
        if (v.id === scheduleSelect.id) {
          v.title = e;
        }
        return v;
      });
      return tmp;
    });
  };

  const onCreateSchedule = () => {
    onOpen({
      isCreated: true,
      userId: userId,
      favorite: schedules.length == 0,
    });
  };

  const onDelete = () => {
    onOpenRemoveAv({
      id: scheduleSelect?.id ?? "",
      userId,
      title: scheduleSelect?.title ?? "",
    });
  };

  const onChangeWeekDays = useCallback(
    (value: ScheduleTypeWithHours) => {
      if (!scheduleSelect) {
        return;
      }
      let scheduleWeekDays = [...scheduleSelect!.scheduleWeekDays];
      const indexPrev = scheduleWeekDays.findIndex((v) => v.id == value.id);
      if (indexPrev >= 0) {
        scheduleWeekDays[indexPrev] = value;
      }
      let newValue = { ...scheduleSelect, scheduleWeekDays };

      setScheduleSelect(newValue);

      setSchedulesList((prev) => {
        let temp = [...prev];

        const indexPrev = temp.findIndex((v) => v.id === scheduleSelect.id);
        console.log(indexPrev);

        if (indexPrev >= 0) {
          temp[indexPrev] = newValue;
        }

        return temp;
      });
    },
    [scheduleSelect]
  );

  const onSetDefault = useCallback(() => {
    if (isPending) return;
    startTransition(async () => {
      try {
        const response = await makeDefautlScheduleAvailability(
          scheduleSelect?.id ?? ""
        );
        if (!response.success) {
          throw new Error(response.message);
        }
        let newValue = { ...scheduleSelect!, favorite: true };

        setScheduleSelect(newValue);

        setSchedulesList((prev) => {
          let temp = [...prev];
          for (const iterator of temp) {
            iterator.favorite = false;
          }
          const findIndex = temp.findIndex((v) => v.id === scheduleSelect?.id);
          if (findIndex >= 0) {
            temp[findIndex] = newValue;
          }
          return temp;
        });
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    });
  }, [isPending, scheduleSelect]);

  return (
    <div className="w-full mt-4">
      <div className="w-full flex items-center flex-wrap gap-4">
        {schedulesList.map((v) => (
          <div
            onClick={() => setScheduleSelect(v)}
            key={v.id}
            className={cn(
              "scheduleItem cursor-pointer flex gap-2 font-girloyBold",
              scheduleSelect?.id == v.id &&
                "!bg-[#f2f8ff] !text-colorAzul !border-colorAzul"
            )}
          >
            {v.favorite && (
              <LucideCalendarHeart
                className={cn(
                  "text-[#1a1a1a9c]",
                  scheduleSelect?.id == v.id && "text-colorAzul"
                )}
              />
            )}
            <span className="font-light">{v.title}</span>
          </div>
        ))}
        <button
          onClick={onCreateSchedule}
          className="flex items-center gap-2 group"
        >
          <Plus className="text-colorTextGris" size={20} />
          <span className="text-colorTextGris font-girloyRegular group-hover:underline">
            Create schedule
          </span>
        </button>
      </div>
      {scheduleSelect && (
        <div className="containerSchedule flex flex-col  mt-4 w-full">
          <div className="p-6 gap-4 flex flex-col border-b border-gray-300">
            <div className="w-full flex justify-between items-center">
              <div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Active on</span>
                    <button className="text-colorAzul flex items-center gap-2 font-girloyRegular">
                      <span>0 Event Type</span>
                      <ChevronDown className="text-colorAzul" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Time zone</span>
                    <button className="text-colorAzul flex items-center gap-2 font-girloyRegular">
                      <span>{scheduleSelect?.countryName} Time</span>
                      <ChevronDown className="text-colorAzul" />
                    </button>
                  </div>
                </div>
                <div className="bg-[#F2F2F2] rounded-xl px-2 py-1 flex gap-2 mt-3">
                  <button
                    onClick={() => setTypeView("ListView")}
                    type="button"
                    className={cn(
                      "bg-transparent rounded-lg flex items-center gap-1 px-2 py-1 font-girloyRegular text-lg cursor-pointer",
                      typeView == "ListView" &&
                        "bg-white font-girloySemiBold shadow-lg "
                    )}
                  >
                    <List className="text-colorTextBlack" />
                    <span>List view</span>
                  </button>
                  <button
                    onClick={() => setTypeView("CalendarView")}
                    type="button"
                    className={cn(
                      "bg-transparent rounded-lg flex items-center gap-1 px-2 py-1  font-girloyRegular text-lg cursor-pointer",
                      typeView == "CalendarView" &&
                        "bg-white font-girloySemiBold shadow-lg"
                    )}
                  >
                    <Calendar className="text-colorTextBlack" />
                    <span>Calendar view</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Settings
                      className="text-colorTextGris outline-none"
                      size={20}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="mb-2">
                      Working hours settings
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={onEditName}
                      className="flex cursor-pointer gap-2"
                    >
                      <Edit2Icon className="text-colorTextBlack" />
                      <span className="text-colorTextBlack font-girloyLight">
                        Edit name
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex cursor-pointer gap-2">
                      <Copy className="text-colorTextBlack" />
                      <span className="text-colorTextBlack font-girloyLight">
                        Clone
                      </span>
                    </DropdownMenuItem>
                    {!scheduleSelect.favorite && (
                      <DropdownMenuItem
                        onClick={onSetDefault}
                        className="flex cursor-pointer gap-2"
                      >
                        <Star className="text-colorTextBlack fill-black" />
                        <span className="text-colorTextBlack font-girloyLight">
                          Set as default
                        </span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={onDelete}
                      className="flex cursor-pointer gap-2"
                    >
                      <Trash className="text-colorTextBlack" />
                      <span className="text-colorTextBlack font-girloyLight">
                        Delete
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          {typeView == "ListView" ? (
            <div className="w-full flex">
              <div className="w-full flex flex-col gap-2 md:w-[50%] md:border-r border-gray-300 p-6">
                <h3 className="text-lg font-girloyBold text-colorTextBlack">
                  Weekly hours
                </h3>
                {scheduleSelect?.scheduleWeekDays.map((v) => (
                  <WeekDay
                    onChangeValue={onChangeWeekDays}
                    key={v.id}
                    week={v}
                  />
                ))}
              </div>
              <div className="w-full md:w-[50%] p-6 gap-4 flex flex-col">
                <h3 className="text-lg font-girloyBold text-colorTextBlack">
                  Date-specific hours
                </h3>
                <p className="text-colorTextGris font-girloyRegular text-sm">
                  Override your availability for specific dates when your hours
                  differ from your regular weekly hours.
                </p>
                <button className="flex gap-2 items-center text-colorTextBlack text-sm font-girloyRegular border border-colorTextBlack rounded-full w-fit px-2 py-1 hover:bg-colorGris">
                  <Plus />
                  <span>Add date-specific hours</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <CalendarCustom weekHours={scheduleSelect.scheduleWeekDays} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
