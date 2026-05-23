import type { ReactNode } from "react";

export function ProseContent({ children }: { children: ReactNode }) {
  return <div className="prose-content mx-auto">{children}</div>;
}
