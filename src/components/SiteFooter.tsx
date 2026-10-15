import { site } from "@/config/site";
import { m } from "@/messages";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>{m.common.footer}</p>
        <nav className="flex gap-4">
          <a className="underline-offset-4 hover:text-ink hover:underline" href={site.mainSiteUrl}>
            atexitalia.it
          </a>
          <a className="underline-offset-4 hover:text-ink hover:underline" href={site.privacyUrl}>
            {m.common.privacyLink}
          </a>
        </nav>
      </div>
    </footer>
  );
}
