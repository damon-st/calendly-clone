type TypeI =
  | "calendar"
  | "payments"
  | "video"
  | "analytics"
  | "other"
  | "apiConectors"
  | "extensionsAndApps"
  | "securityAndCompliance"
  | "emailMessaging"
  | "salesAndCRM"
  | "marketing"
  | "embedCalen"
  | "all"
  | "moreUsed";
export const integrationFilters: Array<{ title: string; value: TypeI }> = [
  {
    title: "All integrations",
    value: "all",
  },
  {
    title: "Mosted used",
    value: "moreUsed",
  },
  { title: "Video conferencing", value: "video" },
  {
    title: "Calendars",
    value: "calendar",
  },
  {
    title: "Extensions and apps",
    value: "extensionsAndApps",
  },
  {
    title: "Sales and CRM",
    value: "salesAndCRM",
  },
  {
    title: "Marketing",
    value: "marketing",
  },
  {
    title: "Email messaging",
    value: "emailMessaging",
  },
  {
    title: "Analytics",
    value: "analytics",
  },
  {
    title: "Embed Calendly",
    value: "embedCalen",
  },
  {
    title: "Payments",
    value: "payments",
  },
  {
    title: "Security and compliance",
    value: "securityAndCompliance",
  },
  {
    title: "API and connectors",
    value: "apiConectors",
  },
];
export type TypeIntegrationItem = {
  title: string;
  href: string;
  imageUrl: string;
  description: string;
  type: TypeI;
  target: "_blank" | "_self";
  forAdmin?: boolean;
};
const baseURL = "/dashboard/integrations-user";
export const itemIntegrations: Array<TypeIntegrationItem> = [
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/console-56d94e384fad7b090d01.svg",
    title: "API and webhooks",
    description: "Build custom integrations with Calendly data.",
    href: `${baseURL}/api-webhooks`,
    type: "apiConectors",
    target: "_self",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/android-7b8ea513c8b5c9457bcd.svg",
    title: "Calendly Android app",
    description: "Access meetings and availability on the go.",
    href: "https://play.google.com/store/apps/details?id=com.calendly.app&hl=en_US&gl=US&utm_source=calendly&utm_medium=integrations&utm_campaign=integrations&utm_content=android&utm_term=android",
    type: "extensionsAndApps",
    target: "_blank",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/chrome-0dd0c283878400e43c08.svg",
    title: "Calendly for Chrome",
    description: "Access and share availability on any web page.",
    href: "https://chromewebstore.google.com/detail/calendly-meeting-scheduli/cbhilkcodigmigfbnphipnnmamjfkipp?utm_source=calendly&utm_medium=integrations&utm_campaign=calendly_for_chrome&utm_content=chrome&utm_term=chrome&pli=1",
    type: "extensionsAndApps",
    target: "_blank",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/microsoft-edge-bc393cb394ec6bbb4d75.svg",
    title: "Calendly for Edge",
    description: "Access and share availability on any web page.",
    href: "https://microsoftedge.microsoft.com/addons/detail/calendly-meeting-schedul/hfngfpepejakabkhocoamdlnipilcpga?utm_source=calendly&utm_medium=integrations&utm_campaign=integrations&utm_content=edge&utm_term=edge",
    target: "_blank",
    type: "extensionsAndApps",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/firefox-c5d4b833885dd70fcdfb.svg",
    title: "Calendly for Firefox",
    description: "Access and share availability on any web page.",
    href: "https://addons.mozilla.org/en-US/firefox/addon/calendly-meeting-scheduling/?utm_source=calendly&utm_medium=integrations&utm_campaign=integrations&utm_content=firefox&utm_term=firefox",
    target: "_blank",
    type: "extensionsAndApps",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/intercom-453d6e4006c850be6ea5.svg",
    title: "Calendly for Intercom",
    description: "Embed your booking page in Intercom chat.",
    href: `${baseURL}/itercom`,
    target: "_self",
    type: "extensionsAndApps",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/outlook_extension-3dcb55a85151d4783bf9.svg",
    title: "Calendly for Outlook",
    description: "Access and share availability from your Outlook inbox.",
    href: "https://appsource.microsoft.com/en-us/product/office/WA104381446?utm_source=calendly&utm_medium=integrations&utm_campaign=integrations&utm_content=outlook_addin&utm_term=outlook_addin",
    target: "_blank",
    type: "extensionsAndApps",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/apple-0a3d6968721c9ccea820.svg",
    title: "Calendly iPhone app",
    description: "Access meetings and share availability on the go.",
    href: "https://apps.apple.com/us/app/calendly-mobile/id1451094657",
    target: "_blank",
    type: "extensionsAndApps",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/duo-442d304b9f83ad286624.svg",
    title: "Duo",
    description: "Enforce single sign-on for your users' Calendly accounts.",
    href: "/admin/login/sso",
    target: "_self",
    type: "securityAndCompliance",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/microsoft-exchange-da0af9f64aa242ee36de.svg",
    title: "Exchange Calendar",
    description: "Add events to your calendar and prevent double-booking.",
    href: "/personal/avialability/connected-calendars",
    target: "_self",
    type: "calendar",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/gmail-d35ec868f510eb930574.svg",
    title: "Gmail for Workflows",
    description: "Send automated emails from your Gmail account.",
    href: `${baseURL}/gmail`,
    target: "_self",
    type: "emailMessaging",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/gong-ff563b4fdc2cc02d8001.svg",
    title: "Gong",
    description: "Access and share your availability in Gong.",
    href: `${baseURL}/gong`,
    type: "salesAndCRM",
    target: "_self",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/google-analytics-cce6ed536a49224ffc0a.svg",
    title: "Google Analytics",
    description: "Track engagement with your booking pages.",
    href: `${baseURL}/google-analytics`,
    target: "_self",
    type: "analytics",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/google-calendar-9d502e45f709b07b91a1.svg",
    href: "/personal/avialability/connected-calendars",
    title: "Google Calendar",
    description: "Add events to your calendar and prevent double-booking.",
    target: "_self",
    type: "calendar",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/google-meet-74ebbfcacec52008a972.svg",
    title: "Google Meet",
    description: "Include Google Meet details in your Calendly events.",
    href: `${baseURL}/google-meet`,
    target: "_self",
    type: "video",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/go-to-meeting-a7a16d8ae03a6e21d8fd.svg",
    title: "GoTo Meeting",
    description: "Include GoTo Meeting details in your Calendly events.",
    href: `${baseURL}/gotomeeting`,
    target: "_self",
    type: "video",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/hubspot-947b620ac8ce8d1c8fb4.svg",
    type: "salesAndCRM",
    title: "HubSpot",
    description:
      "Sync meeting data to your CRM. Add instant, account-matched scheduling to your routing forms.",
    href: `${baseURL}/hubspot`,
    target: "_self",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/icloud-c7eb991263acd6ff682c.svg",
    title: "iCloud Calendar",
    description: "Add events to your calendar and prevent double-booking.",
    href: "/personal/avialability/connected-calendars",
    target: "_self",
    type: "calendar",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/linkedin-b4b18ab275a4b6bc143d.svg",
    title: "LinkedIn Messaging",
    description: "Access and share your availability in LinkedIn.",
    href: `${baseURL}/linkedin`,
    target: "_self",
    type: "salesAndCRM",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/mailchimp-0b6601fe96028880520a.svg",
    title: "Mailchimp",
    description: "Create and update contacts as meetings are scheduled.",
    href: `${baseURL}/mailchimp`,
    target: "_self",
    type: "emailMessaging",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/marketo-5c2970cb5941e26bb17a.svg",
    title: "Marketo",
    description:
      "Use form responses to qualify and route your leads to the right booking pages and update records as meetings are scheduled.",
    href: `${baseURL}/marketo`,
    target: "_self",
    type: "marketing",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/facebook-2d1598c5ebcd6885fe59.svg",
    title: "Meta Pixel",
    description: "Track engagement with your booking pages.",
    href: `${baseURL}/facebook-pixel`,
    target: "_self",
    type: "marketing",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/microsoft-azure-11ff8bb118bb90ad1c2d.svg",
    title: "Microsoft Azure",
    description:
      "Provision users and enforce single sign-on for their Calendly accounts.",
    href: "/admin/login/sso",
    target: "_self",
    type: "securityAndCompliance",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/microsoft_dynamics-b5b0df8cf1856bb7640f.svg",
    title: "Microsoft Dynamics 365",
    description: "Create and update records as meetings are scheduled.",
    type: "salesAndCRM",
    href: `${baseURL}/microsoft-dynamics`,
    target: "_self",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/microsoft-teams-8af8226c210af918aba2.svg",
    title: "Microsoft Teams Chat",
    description: "Get personal notifications for your Calendly events.",
    href: "https://appsource.microsoft.com/en-us/product/office/WA200006736?tab=Overview",
    type: "extensionsAndApps",
    target: "_blank",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/microsoft-teams-8af8226c210af918aba2.svg",
    title: "Microsoft Teams Conferencing",
    description: "Include Teams conferencing details in your Calendly events.",
    href: `${baseURL}/microsoft-teams`,
    target: "_self",
    type: "video",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/okta-f9353aede88d6a2aa035.svg",
    title: "Okta",
    description:
      "Provision users and enforce single sign-on for their Calendly accounts.",
    href: "/admin/login/sso",
    target: "_self",
    type: "securityAndCompliance",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/one-login-7cc5444e804fe93f89af.svg",
    title: "OneLogin",
    description:
      "Provision users and enforce single sign-on for their Calendly accounts.",
    href: "/admin/login/sso",
    target: "_self",
    type: "securityAndCompliance",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/microsoft-office-24d37bc320a68e6d4cd5.svg",
    title: "Outlook Calendar",
    description: "Add events to your calendar and prevent double-booking.",
    href: "/personal/avialability/connected-calendars",
    target: "_self",
    type: "calendar",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/outlook-d226707be5525615a568.svg",
    title: "Outlook for Workflows",
    description: "Send automated emails from your Outlook account.",
    href: `${baseURL}/outlook`,
    target: "_self",
    type: "emailMessaging",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/salesforce-pardot-09dabde1d4b36f63611c.svg",
    title: "Pardot",
    description:
      "Use form responses to qualify and route your leads to the right booking pages.",
    href: `${baseURL}/pardot`,
    target: "_self",
    type: "marketing",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/pay-pal-23e8d5edeb8ce0250bf8.svg",
    title: "PayPal",
    description: "Collect payment before the meeting.",
    href: `${baseURL}/paypal`,
    target: "_self",
    type: "payments",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/ping-identity-00d6fdf61a492ae6174c.svg",
    title: "Ping Identity",
    description: "Enforce single sign-on for your users' Calendly accounts.",
    href: "/admin/login/sso",
    target: "_self",
    type: "securityAndCompliance",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/microsoft_power_automate-d385174987222236adc9.svg",
    title: "Power Automate",
    description: "Create no-code automations with the tools you use.",
    href: `${baseURL}/microsoft-power-automate`,
    target: "_self",
    type: "apiConectors",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/salesforce-ace11f773162ac4a253f.svg",
    title: "Salesforce",
    description:
      "Create and update records as meetings are scheduled. Plus, route meetings via real time Salesforce lookup.",
    href: `${baseURL}/salesforce`,
    target: "_blank",
    type: "salesAndCRM",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/sso-d987d680603ac9f940c9.svg",
    title: "Single sign-on",
    description:
      "Provision users and enforce single sign-on for their Calendly accounts.",
    href: "/admin/login/sso",
    target: "_self",
    type: "securityAndCompliance",
    forAdmin: true,
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/slack-4cc01e8ecd1ab0101193.svg",
    title: "Slack",
    description: "Access and share your Calendly links in Slack.",
    href: `${baseURL}/slack`,
    target: "_blank",
    type: "extensionsAndApps",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/squarespace-d6a1882f345df63fe334.svg",
    title: "Squarespace",
    description: "Embed your booking page on your website.",
    href: "https://help.calendly.com/hc/en-us/articles/223147047-How-to-add-Calendly-to-your-Squarespace-site",
    target: "_blank",
    type: "embedCalen",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/stripe-4b6a6cc4ce4b269bbe04.svg",
    title: "Stripe",
    description: "Collect payment before the meeting.",
    href: `${baseURL}/stripe`,
    target: "_self",
    type: "payments",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/webex-53fbd765bf7edce401c6.svg",
    title: "Webex",
    description: "Include Webex details in your Calendly events.",
    href: `${baseURL}/webex`,
    target: "_self",
    type: "video",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/wix-7215bbd1c9b90290982c.svg",
    title: "Wix",
    description: "Embed your booking page on your website.",
    href: "https://help.calendly.com/hc/en-us/articles/223147127-How-to-add-Calendly-to-a-Wix-site",
    target: "_blank",
    type: "embedCalen",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/wordpress-fb1f85dd39eaaba5b121.svg",
    title: "WordPress",
    description: "Embed your booking page on your website.",
    href: "https://help.calendly.com/hc/en-us/articles/223195568-How-to-embed-Calendly-in-WordPress#how-to-embed-calendly-in-wordpress-0-0",
    target: "_blank",
    type: "embedCalen",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/zapier-8f2c6ea3f4959dfe801c.svg",
    title: "Zapier",
    description: "Create no-code automations with the tools you use.",
    href: `${baseURL}/zapier`,
    target: "_self",
    type: "apiConectors",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/zoom-42d3876ae6a77cd0927f.svg",
    title: "Zoom",
    description: "Include Zoom details in your Calendly events.",
    href: `${baseURL}/zoom`,
    target: "_self",
    type: "video",
  },
];
