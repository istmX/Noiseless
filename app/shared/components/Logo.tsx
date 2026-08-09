import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  textClassName?: string;
  href?: string;
}

export function Logo({
  size = 28,
  showText = true,
  className = "",
  textClassName = "",
  href = "/watches",
}: LogoProps) {
  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logos/noiseless-logo.png"
        alt="Noiseless Logo"
        width={size}
        height={size}
        className="object-contain shrink-0"
        priority
        unoptimized
      />
      {showText && (
        <span
          className={`font-sans font-semibold text-ink tracking-tight ${textClassName}`}
        >
          Noiseless
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none rounded">
        {content}
      </Link>
    );
  }

  return content;
}
