import Image from "next/image";

export function isLocalUpload(src) {
  return typeof src === "string" && src.startsWith("/uploads/");
}

export default function UploadImage({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
  priority = false,
  onError
}) {
  if (!src) return null;

  if (isLocalUpload(src)) {
    return (
      // Local uploads are served as static files — skip /_next/image so production
      // deploys don't 404 when the optimizer can't read public/uploads.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        onError={onError}
        className={fill ? `absolute inset-0 w-full h-full object-cover ${className}`.trim() : className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={onError}
    />
  );
}
