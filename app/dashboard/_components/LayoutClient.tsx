"use client";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function LayoutClient({ children }: Props) {
  return (
    <section className="w-full flex flex-col flex-1 transition-all duration-500">
      {children}
    </section>
  );
}

export default LayoutClient;
