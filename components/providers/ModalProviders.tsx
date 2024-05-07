"use client";
import React, { useEffect, useState } from "react";
import EditNameAviabilityModal from "../modals/EditNameAviabilityModal";
import RemoveAvailabilityModal from "../modals/RemoveAvailabilityModal";
import EditLocationModal from "../modals/edit_location_modal/EditLocationModal";

type Props = {};

export default function ModalProviders({}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <EditNameAviabilityModal />
      <RemoveAvailabilityModal />
      <EditLocationModal />
    </>
  );
}
