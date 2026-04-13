import Image from "next/image";
import type { ReactNode } from "react";

const LOGO_SRC = "/workbench-banner-2.png";

export function DiagramContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative my-8">
      <Image
        src={LOGO_SRC}
        alt="workbench"
        width={2436}
        height={1011}
        className="absolute top-6 left-6 w-72 h-auto opacity-80 pointer-events-none z-10"
      />
      {children}
    </div>
  );
}
