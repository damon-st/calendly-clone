import { createNewUser } from "@/lib/services/user";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { data, object, type } = await req.json();
    if (!data) {
      throw new Error("DATA NOT FOUND");
    }

    if (type == "user.created") {
      console.log(data);

      let email = "";
      if (data.email_addresses) {
        const tempEmasil = [...(data.email_addresses as Array<any>)];
        email = tempEmasil[0].email_address;
      }
      const emailT = (email ?? "").split("@")?.[0];
      await createNewUser({
        userId: data.id,
        email: email,
        name: data.first_name + " " + data.last_name,
        imageUrl: data.image_url,
        userName: emailT,
      });

      if (
        data.external_accounts &&
        data.external_accounts[0].object === "google_account"
      ) {
        const responseClerk = await clerkClient.users.getUserOauthAccessToken(
          data.id,
          "oauth_google"
        );
        if (responseClerk.data && responseClerk.data[0].token) {
          const accessToken = responseClerk.data[0].token;
          console.log("[ACCES__TOKEN]", accessToken);
          await db.accounts.create({
            data: {
              type: "oauth_google",
              accessToken,
              clientId: responseClerk.data[0].externalAccountId,
              user: {
                connect: {
                  userId: data.id,
                },
              },
            },
          });
        }
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[API_ERROR_WEBHOOK_USER_POST]", error);

    return new NextResponse("Internal Errro", { status: 500 });
  }
}
