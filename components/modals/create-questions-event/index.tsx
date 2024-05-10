"use client";
import { useShowModal } from "@/lib/store/useShowModal";
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypeInviteQuestionsNames } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Props = {};

const typesAswerList: Array<{
  label: string;
  value: TypeInviteQuestionsNames;
}> = [
  {
    label: "One Line",
    value: "oneLine",
  },
  {
    label: "Multiple Lines",
    value: "multipleLines",
  },
  {
    label: "Radio Buttons",
    value: "radioButtons",
  },
  {
    label: "Checkboxex",
    value: "checkboxes",
  },
  {
    label: "Drowdown",
    value: "drowpDown",
  },
  {
    label: "Phone Number",
    value: "phonNumber",
  },
];

export default function CreateQuestionsEvent({}: Props) {
  const { isOpen, type, onClose, data } = useShowModal();
  const open = isOpen && type === "createQuestions";
  const [isRequired, setIsRequired] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [typesAswer, setTypesAswer] = useState(typesAswerList[0].value);
  const handleClose = useCallback(
    (v: boolean) => {
      setNameQuestion("");
      onClose();
    },
    [onClose]
  );

  const handleChangeNameQuest = useCallback(
    (e: { target: { value: string } }) => {
      setNameQuestion(e.target.value);
    },
    []
  );

  const handleChangeIsRequired = useCallback((v: boolean) => {
    setIsRequired(v);
  }, []);
  const handleChangeIsActive = useCallback((v: boolean) => {
    setIsActive(v);
  }, []);

  const [nameQuestion, setNameQuestion] = useState("");

  const onSave = () => {
    if (nameQuestion.length < 2) return;
    if (typesAswer == "oneLine" && data && data.onSaveTypeQuestion) {
      data.onSaveTypeQuestion!({
        type: "oneLine",
        data: {
          active: isActive,
          disabled: true,
          id: `${nameQuestion}-${typesAswer}`,
          label: nameQuestion,
          required: isRequired,
          responseTxt: "",
          typeInput: "text",
        },
      });
    }
    handleClose(true);
  };

  if (!open) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-girloySemiBold text-2xl">
            Edit Question
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-3">
          <p className="text-colorTextBlack font-girloySemiBold text-lg">
            Question
          </p>
          <Textarea
            value={nameQuestion}
            onChange={handleChangeNameQuest}
            className="resize-none border border-gray-300"
          />
          <div className="flex items-center space-x-2 mt-5 mb-5 cursor-pointer">
            <Checkbox
              id="requiredItem"
              onCheckedChange={handleChangeIsRequired}
            />
            <label
              htmlFor="requiredItem"
              className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-girloyRegular"
            >
              Requierd
            </label>
          </div>
          <p className="font-girloyBold text-lg">Answer Type</p>
          <Select
            onValueChange={(e) => setTypesAswer(e as TypeInviteQuestionsNames)}
          >
            <SelectTrigger className="w-full min-h-12 border border-gray-300 text-lg">
              <SelectValue placeholder="One Line" />
            </SelectTrigger>
            <SelectContent>
              {typesAswerList.map((v) => (
                <SelectItem
                  className="cursor-pointer py-2"
                  key={v.value}
                  value={v.value}
                >
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2 w-full">
            <p className="text-lg font-girloySemiBold text-colorTextBlack mb-2">
              Status
            </p>
            <div
              onClick={() => handleChangeIsActive(!isActive)}
              className=" cursor-pointer flex gap-3 items-center text-colorTextBlack font-girloyRegular"
            >
              <span>{isActive ? "On" : "Off"}</span>
              <Switch
                checked={isActive}
                onCheckedChange={handleChangeIsActive}
                className="data-[state=checked]:bg-colorAzul"
              />
            </div>
            <div className="w-full flex items-center justify-center mt-16">
              <Button
                onClick={onSave}
                variant="azul"
                size="lg"
                className="w-full rounded-full text-lg"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
