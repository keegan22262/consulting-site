"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text" | "arrow";

type BaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    href: string;
    prefetch?: boolean;
  };

type Props = ButtonProps | LinkButtonProps;

function getVariantClasses(variant: ButtonVariant) {
  switch (variant) {
    case "primary":
      return "bg-accent-700 text-white hover:bg-accent-800";
    case "secondary":
      return "bg-white border border-neutral-300 text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50";
    case "ghost":
      return "bg-transparent text-accent-700 hover:bg-accent-50";
    case "text":
      return "bg-transparent text-accent-700 underline-offset-4 hover:underline px-0 h-auto";
    case "arrow":
      return "bg-transparent text-accent-700 hover:underline underline-offset-4";
    default:
      return "";
  }
}

function ButtonContent({
  children,
  icon,
  iconPosition = "left",
  variant,
}: Pick<BaseProps, "children" | "icon" | "iconPosition" | "variant">) {
  const arrow = variant === "arrow";
  return (
    <span className="inline-flex items-center gap-2">
      {icon && iconPosition === "left" ? (
        <span className="inline-flex h-4 w-4 items-center justify-center">{icon}</span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="inline-flex h-4 w-4 items-center justify-center">{icon}</span>
      ) : null}
      {arrow ? (
        <span className="inline-flex h-4 w-4 items-center justify-center transition duration-[200ms] ease opacity-0 -translate-x-0 group-hover:opacity-100 group-hover:translate-x-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      ) : null}
    </span>
  );
}

export default function Button(props: Props) {
  const { variant = "primary", className, icon, iconPosition, children, ...rest } = props as Props & {
    href?: string;
  };

  const baseClasses = [
    "group inline-flex items-center justify-center gap-2 rounded-[8px] px-6 h-[40px] md:h-[44px] lg:h-[48px] text-base font-semibold tracking-[-0.005em] transition duration-[200ms] ease disabled:opacity-60 disabled:cursor-not-allowed",
    variant === "text" ? "h-auto px-0 py-0" : null,
    variant === "arrow" ? "px-0 h-auto" : null,
    getVariantClasses(variant),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, prefetch, ...anchorProps } = props as LinkButtonProps;
    return (
      <Link href={href} prefetch={prefetch} className={baseClasses} {...anchorProps}>
        <ButtonContent icon={icon} iconPosition={iconPosition} variant={variant}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  return (
    <button type={(props as ButtonProps).type ?? "button"} className={baseClasses} {...(rest as ButtonProps)}>
      <ButtonContent icon={icon} iconPosition={iconPosition} variant={variant}>
        {children}
      </ButtonContent>
    </button>
  );
}
