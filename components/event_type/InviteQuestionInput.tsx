"use client";
import { TypeInviteQuestions } from "@/lib/types";
import { Input } from "../ui/input";
import { useState } from "react";

type Props = {
  invite: TypeInviteQuestions;
  onChange: (v: TypeInviteQuestions) => void;
};

export default function InviteQuestionInput({ invite, onChange }: Props) {
  const [iniviteValue, setIniviteValue] = useState(invite);
  const canInput = invite.type == "oneLine";
  return (
    <div className="w-full mt-2 mb-2">
      <p className="text-colorTextBlack font-semibold text-md mb-2">
        {invite.data.label} {invite.data.required && "*"}
      </p>
      {canInput && (
        <Input
          onChange={(e) => {
            let temp = {
              ...iniviteValue,
              data: {
                ...iniviteValue.data,
                responseTxt: e.target.value,
              },
            };
            setIniviteValue(temp);
            onChange(temp);
          }}
          value={iniviteValue.data.responseTxt}
          className="w-full max-w-[80%] border border-gray-300 inpuerr "
          type={iniviteValue.data.typeInput}
          id={iniviteValue.data.id}
          required={iniviteValue.data.required}
        />
      )}
    </div>
  );
}
