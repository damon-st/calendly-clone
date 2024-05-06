import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const options: Array<{
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  value: string;
}> = [
  {
    title: "One-on-One",
    subtitle: "One host with one invitee",
    description: "Good for: coffee chats, 1:1 interviews, etc.",
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/one_on_one-c0ed81ea039b15906953.svg",
    value: "one-on-one",
  },
  {
    title: "Group",
    subtitle: "One host with group of invitees",
    description: "Good for: webinars, online classes, etc.",
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/group-eaa808c3bb66b614c714.svg",
    value: "group",
  },
  {
    title: "Collective",
    subtitle: "More than one host with one invitee",
    description: "Good for: panel interviews, group sales calls, etc.",
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/collective-dff7740f53ebd8dd98cc.svg",
    value: "collective",
  },
  {
    title: "Round Robin",
    subtitle: "One rotating host with one invitee",
    description: "Good for: distributing incoming sales leads",
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/round_robin-02aa170a63b896ec56e3.svg",
    value: "round-robin",
  },
];

export default function NewEventPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col w-full gap-3 py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-colorAzul font-girloySemiBold text-lg"
        >
          <ChevronLeft />
          <span>Back</span>
        </Link>
        <h2 className="text-colorTextBlack font-girloyBold text-2xl">
          Create New Event Type
        </h2>
      </div>
      <div className="w-full flex flex-col max-w-xl">
        <div className="rounded-lg w-full border border-gray-300 bg-white relative">
          {options.map((v, index) => (
            <Link href={`/create-event/${v.value}`} key={v.value}>
              <div
                className={cn(
                  "cursor-pointer w-full h-28 border-b border-gray-300 flex items-center justify-between hover:border-colorAzul hover:border",
                  index == 0 && "rounded-t-lg",
                  index == options.length - 1 && "rounded-b-lg"
                )}
              >
                <div className="w-[20%] flex items-center justify-center">
                  <picture>
                    <img src={v.imageUrl} alt={v.description} />
                  </picture>
                </div>
                <div className="w-[70%] flex flex-col gap-2">
                  <h2 className="text-colorTextBlack font-girloyBold text-lg">
                    {v.title}
                  </h2>
                  <h3 className="text-colorTextBlack font-girloySemiBold text-md">
                    {v.subtitle}
                  </h3>
                  <p className="text-colorTextBlack font-girloyRegular text-sm">
                    {v.subtitle}
                  </p>
                </div>
                <div className="w-[10%] h-full flex items-center justify-center">
                  <ChevronRight className="text-colorTextBlack" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full mt-12">
          <h4 className="text-colorTextBlack font-girloySemiBold">
            More ways to meet
          </h4>
          <div className="w-full flex gap-3 mt-6">
            <div className="cursor-pointer hover:border-colorAzul rounded-lg border border-gray-300 p-3 h-28 bg-white w-[50%]">
              <p className="text-colorTextBlack font-girloySemiBold">
                One-off meeting
              </p>
              <p className="text-colorTextBlack font-girloyLight text-sm">
                Invite someone to pick a time with you without creating an Event
                Type.
              </p>
              <p className="mt-1 text-colorAzul font-girloySemiBold">Create</p>
            </div>
            <div className="cursor-pointer hover:border-colorAzul rounded-lg border border-gray-300 p-3 h-28 bg-white w-[50%]">
              <p className="text-colorTextBlack font-girloySemiBold">
                Meeting poll
              </p>
              <p className="text-colorTextBlack font-girloyLight text-sm">
                Let your group of invitees vote on a time that works for
                everyone.
              </p>
              <p className="mt-1 text-colorAzul font-girloySemiBold">Create</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
