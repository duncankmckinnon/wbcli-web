import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className ?? ""}`}>
      <Image
        src="/logo.jpg"
        alt="workbench logo"
        width={32}
        height={32}
        className="rounded-md"
      />
      <span className="text-lg font-bold text-brand-text-primary">
        workbench
      </span>
    </Link>
  );
}
