import type { PropsWithChildren } from "react";

export function Container({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`container-page section-px ${className}`}>{children}</div>;
}
