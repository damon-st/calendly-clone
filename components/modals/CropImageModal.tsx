"use client";
import { useShowModal } from "@/lib/store/useShowModal";
import React, { useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { Loader2 } from "lucide-react";
import { imageCropToFile } from "@/lib/services/image";
export default function CropImageModal() {
  const { isOpen, onClose, type, data } = useShowModal();
  const refCrof = useRef<CropperRef | null>(null);
  const [loading, setLoading] = useState(false);
  const open = isOpen && type === "changeImgProfile";
  const handleClose = () => {
    if (loading) return;
    onClose();
    setLoading(false);
    refCrof.current = null;
  };

  const image = useMemo(() => {
    if (!data?.file) return "";
    return URL.createObjectURL(data?.file);
  }, [data?.file]);

  const onChange = (cropper: CropperRef) => {
    refCrof.current = cropper;
  };

  const onSave = async () => {
    try {
      if (!refCrof.current) return;
      setLoading(true);
      const corrd = refCrof.current.getCoordinates();
      const result = await imageCropToFile(data?.file!, {
        width: corrd?.width ?? 0,
        height: corrd?.height ?? 0,
        left: corrd?.left ?? 0,
        top: corrd?.top ?? 0,
      });
      if (data?.onCropImage) {
        data?.onCropImage(result);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-girloyBold">
            Crop Image
          </DialogTitle>
        </DialogHeader>
        <div className="w-full relative">
          <Cropper
            stencilProps={{ aspectRatio: 1 }}
            className="h-[250px] w-full cropper"
            src={image}
            transitions
            onChange={onChange}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          <Button
            disabled={loading}
            onClick={handleClose}
            variant="outline"
            className="rounded-full border border-gray-400 w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={loading}
            variant="azul"
            className="rounded-full w-full"
          >
            {loading ? (
              <Loader2 className="text-white animate-spin" />
            ) : (
              "Apply"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
