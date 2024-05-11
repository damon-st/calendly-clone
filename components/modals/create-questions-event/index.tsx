"use client";
import { useShowModal } from "@/lib/store/useShowModal";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { TypeInviteQuestionsNames, TypeQuestionSelection } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import CreateQuestionCheckbox from "./CreateQuestionCheckbox";

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
    label: "Checkboxes",
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

const intialValuesCheck: TypeQuestionSelection[] = [
  {
    label: "",
    selected: false,
  },
  {
    label: "",
    selected: false,
  },
  {
    label: "",
    selected: false,
  },
];

export default function CreateQuestionsEvent({}: Props) {
  const { isOpen, type, onClose, data } = useShowModal();
  const open = isOpen && type === "createQuestions";
  const [isRequired, setIsRequired] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [typesAswer, setTypesAswer] = useState(typesAswerList[0].value);
  const [optionsDrowpDown, setOptionsDrowpDown] = useState(intialValuesCheck);
  const [optionsCheckBox, setOptionsCheckBox] = useState(intialValuesCheck);
  const [optionsRadioButton, setoptionsRadioButton] =
    useState(intialValuesCheck);
  const handleClose = useCallback(
    (v: boolean) => {
      setNameQuestion("");
      setOptionsCheckBox(intialValuesCheck);
      setoptionsRadioButton(intialValuesCheck);
      setOptionsDrowpDown(intialValuesCheck);
      setIsRequired(false);
      setIsActive(true);
      setTypesAswer("oneLine");
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

  const handleChangeIsRequired = useCallback(
    (v: boolean) => {
      if (data?.typeInvite && !data.typeInvite.data.disabled) return;

      setIsRequired(v);
    },
    [data?.typeInvite]
  );
  const handleChangeIsActive = useCallback(
    (v: boolean) => {
      if (data?.typeInvite && !data.typeInvite.data.disabled) return;
      setIsActive(v);
    },
    [data?.typeInvite]
  );

  const [nameQuestion, setNameQuestion] = useState("");

  const onSave = () => {
    if (nameQuestion.length < 2) return;
    if (
      (typesAswer == "oneLine" ||
        typesAswer == "multipleLines" ||
        typesAswer == "phonNumber") &&
      data &&
      data.onSaveTypeQuestion
    ) {
      data.onSaveTypeQuestion!({
        type: typesAswer,
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
    } else if (
      (typesAswer == "radioButtons" ||
        typesAswer == "checkboxes" ||
        typesAswer == "drowpDown") &&
      data &&
      data.onSaveTypeQuestion
    ) {
      data.onSaveTypeQuestion!({
        type: typesAswer,
        data: {
          active: isActive,
          disabled: true,
          id: `${nameQuestion}-${typesAswer}`,
          label: nameQuestion,
          required: isRequired,
          responseTxt: "",
          typeInput:
            typesAswer == "checkboxes"
              ? "checkbox"
              : typesAswer == "drowpDown"
              ? "drowdown"
              : "radioButton",
          options:
            typesAswer == "checkboxes"
              ? optionsCheckBox
              : typesAswer == "drowpDown"
              ? optionsDrowpDown
              : optionsRadioButton,
        },
      });
    }
    handleClose(true);
  };

  const typeAwserElement = useMemo(() => {
    if (typesAswer == "radioButtons") {
      return (
        <CreateQuestionCheckbox
          optionsCheckBox={optionsRadioButton}
          setOptionsCheckBox={setoptionsRadioButton}
        />
      );
    } else if (typesAswer === "checkboxes") {
      return (
        <CreateQuestionCheckbox
          optionsCheckBox={optionsCheckBox}
          setOptionsCheckBox={setOptionsCheckBox}
        />
      );
    } else if (typesAswer === "drowpDown") {
      return (
        <CreateQuestionCheckbox
          optionsCheckBox={optionsDrowpDown}
          setOptionsCheckBox={setOptionsDrowpDown}
        />
      );
    }
    return null;
  }, [optionsCheckBox, optionsDrowpDown, optionsRadioButton, typesAswer]);

  useEffect(() => {
    if (!data) return;
    if (!data.typeInvite) return;
    if (data.typeInvite.type === "radioButtons") {
      setoptionsRadioButton(data.typeInvite.data.options);
    }
    if (data.typeInvite.type === "checkboxes") {
      setOptionsCheckBox(data.typeInvite.data.options);
    }
    if (data.typeInvite.type === "drowpDown") {
      setOptionsDrowpDown(data.typeInvite.data.options);
    }
    setTypesAswer(data.typeInvite.type);
    setNameQuestion(data.typeInvite.data.label);
    setIsActive(data.typeInvite.data.active);
    setIsRequired(data.typeInvite.data.required);
  }, [data]);

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
              checked={isRequired}
              className="data-[state=checked]:bg-colorAzul"
            />
            <label
              htmlFor="requiredItem"
              className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-girloyRegular cursor-pointer"
            >
              Requierd
            </label>
          </div>
          <p className="font-girloyBold text-lg">Answer Type</p>
          <Select
            value={typesAswer}
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
          {typeAwserElement}
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
