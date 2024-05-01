export type TypeSectionTabsInfo = {
  title: string;
  value: string;
  imageUrl: string;
  infos: Array<TypeSectionTabsInfoValues>;
  titleLink: string;
  href: string;
};

export type TypeSectionTabsInfoValues = {
  iconUrl: string;
  title: string;
  description: string;
};

export type TypeIntegrationsIcon = {
  iconUrl: string;
  label: string;
  href: "#";
};

export type TypeSectionFourInfoBusin = {
  label: string;
  href: string;
  titleLink: string;
  imageUrl: string;
  infos: Array<{
    title: string;
    description: string;
  }>;
};
