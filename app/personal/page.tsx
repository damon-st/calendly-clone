import { Suspense } from "react";
import Profile, { ProfileSkeletong } from "./_components/Profile";
import { auth } from "@clerk/nextjs/server";

export default function PersonalProfilePage() {
  const { userId } = auth();
  if (!userId) return null;
  return (
    <Suspense fallback={<ProfileSkeletong />}>
      <Profile userId={userId} />
    </Suspense>
  );
}
