# Calendly clone

![Calendly](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Flogo.svg?alt=media&token=0ce8fec5-9419-4617-b17c-40fd1a9b2ff7)

`This project is a simple clone of Calendly is not completely functionalities all projects realice in this account is only propurse educational`

This project using [Next.js](https://nextjs.org/) for part FrondEnd and BackEnd

- Using [Clerk](https://clerk.com/) for authentication.
- Using [UploadThing](https://uploadthing.com/) for storage
- Using [Prisma](https://www.prisma.io/) for ORM with Database PostgreSQL
- Using package [Google APi](https://www.npmjs.com/package/googleapis) for connect calendar

## First Create .env

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_DOMIAN="localhost:3000"
DATABASE_URL=""
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OAUTH2_REDIRECT_URI=https://electric-grizzly-7.clerk.accounts.dev/v1/oauth_callback
```

### Configuration in clerk

- In your dashboard need to add scope in google sigin
    ![clekc](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fconfig1.png?alt=media&token=4f5326e2-6723-47be-80d0-7d3dc75e89be)
- Add in scopes your CLIEND ID AND CLIEND SECRET in scopes add  `https://www.googleapis.com/auth/calendar`
  ![cleck](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fconfig2.png?alt=media&token=953df61b-fcfa-431a-87fc-528fd9854579)
- Create webhook and your url `http://localhost:3000/api/webhook/user` this is EndPoint with user create and account, you can use [Ngrok](https://ngrok.com/) for expose your server local for receiver all data with webhook is calling.
  ![clerk](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fconfig3.png?alt=media&token=a09f848c-36f2-4800-b45f-ff395b3b6756)

## Getting Started

First, run the command `npx prisma db push` this comand sycronized all models using prisma into Database

Second, run the command `npx prisma generate` this command create all types of your models

Secong, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you testing in local app please using un Firewall for expose local server you can use [Ngrok](https://ngrok.com/)

### ScreenShots

- Home page
  ![HomePage](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg1.png?alt=media&token=408cefea-4f13-476d-88be-c61f0071ac65)
  ![HOMEPage](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg2.png?alt=media&token=b4407e7c-6499-4094-8ce0-57f19388f200)

- Register Page
  ![LoginPage](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg3.png?alt=media&token=63f166c9-c43f-49c4-b943-fefd9390bd6c)
- Login Page
  ![LoginPage](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg4.png?alt=media&token=0dcadb85-44c7-4427-adac-005a322a1d97)
- Intro Page
  ![IntroPage](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg5.png?alt=media&token=19b88d64-d710-4884-9dee-938e86821563)
  ![IntroPage](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg6.png?alt=media&token=b74b8d90-b882-481e-b2fc-55404affb3d1)
- Dashboard Page - Event Types
  ![Dashobar](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg8.png?alt=media&token=a41c58ab-d23b-4715-8916-aa070fcd14e3)
- Create Event
  ![CreateEventType](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg9.png?alt=media&token=e9ad892a-3623-446d-af75-e1fe60522700)
  ![CreateEventType](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg10.png?alt=media&token=6532117b-01f6-42ef-a1bf-cb5c04ce4390)
  ![CreateEventTyoe](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg11.png?alt=media&token=cc498378-034e-4859-9461-6d48f7c55c2a)
  ![CreateEventType](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg12.png?alt=media&token=552c7fa9-7604-4c51-b446-ce2182daba9c)
  ![CreateEventType](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg13.png?alt=media&token=230c2fff-7450-4a9d-9e83-8a608a9aea4b)
- See Events
  ![SeeEvents](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg14.png?alt=media&token=c44937ba-c4d1-4a68-a755-da5024487bcc)
- Schedule in your perfect time
  ![Schedule](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg15.png?alt=media&token=557a0549-924b-453d-b07c-12fa9ff29071)
  ![Schedule](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg16.png?alt=media&token=6b7748b4-0265-4877-88a0-f5a9c2ff2017)
  ![Schedule](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg17.png?alt=media&token=c53a58cf-a393-488f-b84f-116e33f92323)
- Schedule Events
  ![ScheduleEvent](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg18.png?alt=media&token=72d155eb-25bf-489d-b7e8-ca8b2f3c37d2)
- Availability
  ![Availability](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg19.png?alt=media&token=cdd3b126-0582-40a2-8269-64b166d70374)
  ![Availbabilty](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg20.png?alt=media&token=17383f21-3f54-47bd-afd7-302406d25b20)
  ![Availability](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg21.png?alt=media&token=d0aaf27d-ceb9-4d4e-9572-484b8ab67755)
- Contacts 
  ![Contact](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg22.png?alt=media&token=31d3791e-257e-403d-8cd6-6acb67304e00)
- Integrations `only desing`
  ![Integrations](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg23.png?alt=media&token=446df508-825c-43e2-9230-5e938f1c5a14)
- Account Settings
  ![Account](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg24.png?alt=media&token=c20ca3e3-5966-4d9e-86fb-6e14369e111a)
  ![Account](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg25.png?alt=media&token=a69b3a61-ca3e-4c00-9590-49bea0e0458b)
  ![Account](https://firebasestorage.googleapis.com/v0/b/brayancevallosdev.appspot.com/o/calendlyclone%2Fimg26.png?alt=media&token=39d533da-0f63-41fd-bea2-23442feae840)
