/**
 * Komprimiert ein Bild clientseitig per Canvas auf < ~300 KB.
 * Verkleinert die Abmessungen und reduziert die JPEG-Qualität iterativ.
 */
export async function compressImage(
  file: File,
  maxBytes = 300 * 1024,
  maxDimension = 1000,
): Promise<File> {
  const dataUrl = await readAsDataURL(file);
  const img = await loadImage(dataUrl);

  let { width, height } = img;
  if (width > maxDimension || height > maxDimension) {
    const scale = maxDimension / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas wird nicht unterstützt");
  ctx.drawImage(img, 0, 0, width, height);

  let quality = 0.85;
  let blob = await toBlob(canvas, quality);

  // Qualität schrittweise reduzieren, bis die Größe passt.
  while (blob.size > maxBytes && quality > 0.4) {
    quality -= 0.1;
    blob = await toBlob(canvas, quality);
  }

  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", {
    type: "image/jpeg",
  });
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob fehlgeschlagen"))),
      "image/jpeg",
      quality,
    );
  });
}
