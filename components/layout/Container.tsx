import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-content px-6 sm:px-8">{children}</div>;
}
