import { Skeleton } from "@/components/ui/skeleton";
import { existUser } from "@/lib/services/user";
import ProfileSettings from "./ProfileSettings";
type Props = {
  userId: string;
};
export default async function Profile({ userId }: Props) {
  const user = await existUser(userId);
  if (!user) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-3 px-6">
      <h2 className="text-colorTextGris font-bold">Account details</h2>
      <p className="text-2xl font-bold text-colorTextBlack">Profile</p>
      <ProfileSettings user={user} />
    </div>
  );
}

export function ProfileSkeletong() {
  return (
    <div className="w-full px-6 flex flex-col gap-3">
      <h2 className="text-colorTextGris font-bold">Account details</h2>
      <p className="text-2xl font-bold text-colorTextBlack">Profile</p>
      <Skeleton className="w-[40%] min-h-52" />
      <Skeleton className="w-[40%] min-h-12" />
      <Skeleton className="w-[40%] min-h-32" />
      <Skeleton className="w-[40%] min-h-12" />
      <Skeleton className="w-[40%] min-h-12" />
      <Skeleton className="w-[40%] min-h-12" />
      <Skeleton className="w-[40%] min-h-12" />
    </div>
  );
}
