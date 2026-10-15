import Image from "next/image";
import Link from "next/link";
import { m } from "@/messages";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
        <Link href="/" aria-label={m.common.brand}>
          <Image
            src="/logoatexitalia.png"
            alt={m.common.logoAlt}
            width={150}
            height={50}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
