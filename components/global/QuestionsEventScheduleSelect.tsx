import { TypeInviteQuestions } from "@/lib/types";
import React from "react";

type Props = {
  questions: TypeInviteQuestions[];
};

export default function QuestionsEventScheduleSelect({ questions }: Props) {
  return (
    <>
      {questions.map((v, i) => (
        <div key={i} className="flex flex-col w-full mt-2 mb-2">
          <p className="text-colorTextGris">{v.data.label}</p>
          {(v.type === "oneLine" || v.type == "multipleLines") && (
            <p>{v.data.responseTxt}</p>
          )}
          {v.type === "radioButtons" && (
            <p>{v.data.options.find((v) => v.selected)?.label}</p>
          )}
          {v.type === "checkboxes" && (
            <div>
              {v.data.options
                .filter((v) => v.selected)
                .map((ch, i) => (
                  <p key={ch.label + i}>{ch.label}</p>
                ))}
            </div>
          )}
          {v.type === "drowpDown" && (
            <p>
              {v.data.options.find((v) => v.selected)?.label ??
                v.data.options[0].label}
            </p>
          )}
          {v.type == "phonNumber" && (
            <div className="flex items-center gap-3">
              {v.data.country}
              {v.data.phone}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
