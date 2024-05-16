import { useShowModal } from "@/lib/store/useShowModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CalendarSmallCustom from "@/components/calendar/CalendarSmallCustom";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ScheduleHoursM } from "@prisma/client";
import ScheduleHourItem from "@/components/global/ScheduleHourItem";
import { TypeTimeHourValid } from "@/lib/types";
import { Loader2, Plus } from "lucide-react";
import { formatScheduleHour } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createSpecificScheduleHours } from "@/actions/schedules";

const initHours: ScheduleHoursM[] = [
  {
    hourInit: 9,
    hourInitStr: "09",
    hourEnd: 17,
    hourEndStr: "17",
    minuteInit: 0,
    minuteInitStr: "00",
    minuteEnd: 0,
    minuteEndStr: "00",
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "dasdada",
    scheduleSpecificHourId: "",
    scheduleWeekDayId: "",
  },
];

export default function CreateScheduleSpecificHoursModal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [hours, setHours] = useState<ScheduleHoursM[]>(initHours);
  const { isOpen, type, onClose, data } = useShowModal();
  const [days, setDays] = useState<Date[]>([]);
  const open = isOpen && type == "scheduleSpecifisHours";
  const handleClose = () => {
    if (isPending) return;
    onClose();
    setDays([]);
    setHours(initHours);
  };
  const onChangeDate = useCallback((e: Date) => {
    console.log(e);
  }, []);

  useEffect(() => {
    if (data?.scheduleSpecific?.dates) {
      setDays(data.scheduleSpecific.dates);
    }
  }, [data?.scheduleSpecific?.dates]);

  const handleDisabled = (id: string) => {
    setHours((p) => {
      let temp: Array<ScheduleHoursM> = [];
      let order = 0;
      for (const iterator of p) {
        if (iterator.id != id) {
          temp.push({
            ...iterator,
            order,
          });
        }
        order++;
      }
      return temp;
    });
  };
  const onSaveTime = (
    time: TypeTimeHourValid,
    isTimeInit: boolean,
    idTime: string
  ) => {
    console.log(time);

    let data = {};
    if (isTimeInit) {
      data = {
        hourInit: time.hour,
        hourInitStr: time.hourStr,
        minuteInit: time.min,
        minuteInitStr: time.minStr,
      };
    } else {
      data = {
        hourEnd: time.hour,
        hourEndStr: time.hourStr,
        minuteEnd: time.min,
        minuteEndStr: time.minStr,
      };
    }
    setHours((p) => {
      let temp: Array<ScheduleHoursM> = [];
      for (const iterator of p) {
        if (iterator.id == idTime) {
          temp.push({
            ...iterator,
            ...data,
          });
        } else {
          temp.push(iterator);
        }
      }
      return temp;
    });
  };
  const onAddNewHours = useCallback(
    (v: ScheduleHoursM) => {
      try {
        const hour = formatScheduleHour(
          data?.scheduleSpecific?.idSchedule ?? "",
          hours[hours.length - 1]
        );
        setHours((v) => {
          let temp = [...v];
          temp.push(hour);
          return temp;
        });
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    },
    [data?.scheduleSpecific?.idSchedule, hours]
  );

  const onSaveTimes = useCallback(() => {
    startTransition(async () => {
      try {
        const daysOrder = days.sort((a, b) => a.getTime() - b.getTime());
        const response = await createSpecificScheduleHours(
          data?.scheduleSpecific?.idSchedule ?? "",
          daysOrder,
          hours
        );
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        router.refresh();
        handleClose();
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    });
  }, [data?.scheduleSpecific?.idSchedule, days, handleClose, hours, router]);

  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-colorTextBlack font-girloyBold text-2xl">
            Select the date(s) you want to assign specific hours
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <CalendarSmallCustom
            ignoreWeek={true}
            initialDate={new Date()}
            weekHours={[]}
            onChangeDate={onChangeDate}
            useMultipleSelect
            onChangeMultiple={setDays}
          />
        </div>
        {days.length > 0 && (
          <div className="w-full p-6 bg-colorGrisDash border-t border-b border-gray-400 shadow-sm overflow-y-auto max-h-[30vh]">
            <p className="font-girloySemiBold text-colorTextBlack py-2">
              What hours are you available?
            </p>
            {hours.map((v, i) => (
              <div
                className="w-full flex items-center justify-between "
                key={i}
              >
                <ScheduleHourItem
                  active
                  handleDisabled={handleDisabled}
                  hours={v}
                  onSaveTime={onSaveTime}
                  scheduleWeekDayId=""
                  weekDay={0}
                />
                {i === 0 && (
                  <button
                    onClick={() => onAddNewHours(v)}
                    className="size-11 rounded-sm flex items-start justify-center hover:bg-gray-100"
                  >
                    <Plus size={20} className="text-colorTextBlack" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="w-full mt-10 flex items-start justify-between">
          <Button
            disabled={isPending}
            onClick={handleClose}
            className="border border-colorTextBlack w-[40%] rounded-full"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={onSaveTimes}
            disabled={isPending}
            className="w-[40%] rounded-full"
            variant="azul"
          >
            {isPending ? (
              <Loader2 className="text-white animate-spin" />
            ) : (
              "Apply"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
