import { createNewUser } from "@/lib/services/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data, object, type } = await req.json();
    if (!data) {
      throw new Error("DATA NOT FOUND");
    }

    if (type == "user.created") {
      console.log(data);

      let email: undefined;
      if (data.email_addresses && Array.isArray(data.email_addresses)) {
        email = (data.email_addresses as Array<any>)[0].email_addresses;
      }
      await createNewUser({
        userId: data.id,
        email: email,
        name: data.first_name + " " + data.last_name,
        imageUrl: data.image_url,
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[API_ERROR_WEBHOOK_USER_POST]", error);

    return new NextResponse("Internal Errro", { status: 500 });
  }
}