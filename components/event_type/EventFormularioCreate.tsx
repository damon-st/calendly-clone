"use client";
import {
  CountryInfoUser,
  TypeEventFormating,
  TypeInviteQuestions,
} from "@/lib/types";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import InviteQuestionInput from "./InviteQuestionInput";
import EvenTypeLocationInput from "./EvenTypeLocationInput";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createScheduleEvent } from "@/actions/schedule_events";
type Props = {
  eventType: TypeEventFormating;
  dateEvent: Date;
  timeZone: CountryInfoUser;
};

export default function EventFormularioCreate({
  dateEvent,
  eventType,
  timeZone,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [inviteQuestions, setInviteQuestions] = useState(
    eventType.inviteQuestions
  );
  const [location, setLocation] = useState(eventType.location);

  const onChangeValueQuestion = useCallback(
    (v: TypeInviteQuestions, index: number) => {
      setInviteQuestions((p) => {
        let temp = [...p];
        temp[index] = v;
        return temp;
      });
    },
    []
  );

  const locationTyp = useMemo(() => {
    return (
      <EvenTypeLocationInput
        location={location}
        onChangeLocation={setLocation}
      />
    );
  }, [location]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPending) return;
      startTransition(async () => {
        try {
          const response = await createScheduleEvent(
            {
              ...eventType,
              inviteQuestions,
              location,
            },
            dateEvent,
            timeZone
          );
          if (!response.success) {
            throw new Error(`${response.message}`);
          }
          router.replace(
            `/${eventType.user?.userName}/${eventType.eventLinkName}/invitees/${response.data}`
          );
        } catch (error) {
          console.log(error);
          toast.error(`${error}`);
        }
      });
    },
    [
      isPending,
      eventType,
      inviteQuestions,
      location,
      dateEvent,
      timeZone,
      router,
    ]
  );
  return (
    <form onSubmit={handleSubmit} className="size-full p-6">
      <p className="text-colorTextBlack font-girloyBold text-2xl">
        Enter Details
      </p>
      {inviteQuestions.map((v: TypeInviteQuestions, i) => (
        <InviteQuestionInput
          onChange={(v) => onChangeValueQuestion(v, i)}
          invite={v}
          key={i}
        />
      ))}
      {locationTyp}
      <div className="mt-3 mb-3">
        By proceeding, you confirm that you have read and agree to{" "}
        <a
          target="_blank"
          rel="related"
          className="text-colorAzul hover:underline"
          href="#"
        >
          Calendly&apos;s Terms of Use{" "}
        </a>{" "}
        and{" "}
        <a
          target="_blank"
          rel="related"
          className="text-colorAzul hover:underline"
          href="#"
        >
          {" "}
          Privacy Notice.
        </a>
      </div>
      <Button
        disabled={isPending}
        type="submit"
        variant="azul"
        size="lg"
        className="rounded-full mb-2"
      >
        {isPending ? (
          <Loader2 className="text-white animate-spin" />
        ) : (
          "Schedule Event"
        )}
      </Button>
    </form>
  );
}
