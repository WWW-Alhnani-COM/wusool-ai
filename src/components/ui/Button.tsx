import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  to: string;
  href?: never;
  onClick?: () => void;
  type?: never;
}

interface ExternalButtonProps extends BaseProps {
  href: string;
  to?: never;
  onClick?: never;
  type?: never;
}

interface ActionButtonProps extends BaseProps {
  onClick: () => void;
  type?: "button" | "submit";
  to?: never;
  href?: never;
}

type ButtonProps = LinkButtonProps | ExternalButtonProps | ActionButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ease-path focus-visible:outline-none";
const variants = {
  primary: "bg-brass text-base hover:bg-brass-bright",
  secondary: "border border-base-line text-ink hover:border-brass/60 hover:text-brass-bright",
};

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const cls = `${base} ${variants[variant]} ${className}`;

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} onClick={(props as LinkButtonProps).onClick} className={cls}>
        {children}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  const { onClick, type = "button" } = props as ActionButtonProps;
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
