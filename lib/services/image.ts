import Image from "image-js";
export const imageCropToFile = async (
  file: File,
  cropper: {
    left: number;
    top: number;
    width: number;
    height: number;
  }
) => {
  const x = cropper.left;
  const y = cropper.top;
  const width = cropper.width;
  const height = cropper.height;
  try {
    const image = await Image.load(URL.createObjectURL(file));
    const croppedImage = image.crop({ x, y, width, height });
    const resizedImage = croppedImage.resize({ width: 200, height: 200 });
    const blob = await resizedImage.toBlob();
    const arryarBuffer = await blob.arrayBuffer();
    const finalFile = new File([arryarBuffer], file.name, { type: blob.type });
    return finalFile;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
