"use client";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost" | "ghost-dark" | "text" | "arrow";

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

function getVariantClasses(variant: ButtonVariant): string {
  switch (variant) {
    case "primary":
      // Solid RSL blue — used on light backgrounds
      return "bg-blue-mid text-white hover:bg-blue-light transition-colors duration-normal";
    case "ghost":
      // Ghost on light background — navy border, navy text
      return "bg-transparent border border-navy-darkest text-navy-darkest hover:bg-navy-darkest hover:text-white transition-colors duration-normal";
    case "ghost-dark":
      // Ghost on dark background — white/translucent border
      return "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/60 transition-colors duration-normal";
    case "text":
      return "bg-transparent text-blue-mid hover:text-blue-light underline-offset-4 hover:underline px-0 h-auto transition-colors duration-normal";
    case "arrow":
      return "bg-transparent text-blue-mid hover:text-blue-light underline-offset-4 hover:underline px-0 h-auto transition-colors duration-normal";
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
  const showArrow = variant === "arrow";
  return (
    <span className="inline-flex items-center gap-2">
      {icon && iconPosition === "left" && (
        <span className="inline-flex h-4 w-4 items-center justify-center">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="inline-flex h-4 w-4 items-center justify-center">{icon}</span>
      )}
      {showArrow && (
        <span className="inline-flex h-4 w-4 items-center justify-center transition-transform duration-normal group-hover:translate-x-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </span>
  );
}

export default function Button(props: Props) {
  const {
    variant = "primary",
    className,
    icon,
    iconPosition,
    children,
    ...rest
  } = props as Props & { href?: string };

  const isTextOrArrow = variant === "text" || variant === "arrow";

  const baseClasses = [
    "group inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    isTextOrArrow
      ? "text-body px-0 h-auto"
      : "text-[13px] uppercase tracking-[0.12em] px-8 h-[44px] rounded-[4px]",
    getVariantClasses(variant),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, prefetch, ...anchorProps } = props as LinkButtonProps;
    return (
      <Link href={href} prefetch={prefetch} className={baseClasses} {...(anchorProps as object)}>
        <ButtonContent icon={icon} iconPosition={iconPosition} variant={variant}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonProps).type ?? "button"}
      className={baseClasses}
      {...(rest as ButtonProps)}
    >
      <ButtonContent icon={icon} iconPosition={iconPosition} variant={variant}>
        {children}
      </ButtonContent>
    </button>
  );
}
