import { cn } from "@/lib/utils";
import whatsappLogo from "@/whatsapp-logo.png";

export function WhatsAppIcon({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center", className)}>
      <img
        src={whatsappLogo}
        alt=""
        aria-hidden="true"
        className={cn("h-full w-full object-contain", imageClassName)}
      />
    </span>
  );
}
