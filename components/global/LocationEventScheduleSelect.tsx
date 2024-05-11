import { TypeNewEventLocation } from "@/lib/types";
type Props = {
  location: TypeNewEventLocation;
};

export default function LocationEventScheduleSelect({ location }: Props) {
  if (location.type.type === "zoom") {
    return (
      <div className="w-full flex items-center gap-3">
        <span>This is a Zoom Web conference.</span>
      </div>
    );
  } else if (location.type.type === "phoneCall") {
    return (
      <div className="w-full flex items-center">
        <span>
          This is phone call {location.type.data.country} -{" "}
          {location.type.data.phone}
        </span>
      </div>
    );
  }
  return <div className="w-full flex"></div>;
}
