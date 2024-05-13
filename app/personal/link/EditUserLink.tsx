"use client";
import { updateUserName } from "@/actions/userActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/lib/types";
import { Loader2 } from "lucide-react";
import React, { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  user: UserInfo;
};

export default function EditUserLink({ user }: Props) {
  const [isPending, startTransition] = useTransition();
  const [linkUser, setLinkUser] = useState(user.userName);

  const handleChangeLink = useCallback((e: { target: { value: string } }) => {
    setLinkUser(e.target.value);
  }, []);

  const onSave = useCallback(() => {
    startTransition(async () => {
      try {
        if (linkUser.length < 3) {
          toast.error("Please the link url is required");
          return;
        }
        const response = await updateUserName(linkUser);
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
      } catch (error) {
        console.log(error);

        toast.error(`${error}`);
      }
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 mt-10">
      <p>
        Changing your Calendly URL will mean that all of your copied links will
        no longer work and will need to be updated.
      </p>
      <div className="w-full flex items-center gap-3">
        <p>{process.env.NEXT_PUBLIC_DOMIAN}/</p>
        <Input value={linkUser} onChange={handleChangeLink} />
      </div>
      <div className="w-full mt-5 flex items-center">
        <Button
          onClick={onSave}
          disabled={isPending}
          variant="azul"
          className="rounded-full"
        >
          {isPending ? (
            <Loader2 className="text-white animate-spin" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
