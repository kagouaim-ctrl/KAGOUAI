"use client";
import { useEffect } from "react";

// Old routes from the previous site. Static export has no server redirects.
export default function Redirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <main className="wrap pad py-24 font-mono text-[13px] text-muted">
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
      <a href={to} className="link">
        {to}
      </a>
    </main>
  );
}
