"use client";

import { useContactModal } from "./ContactModalProvider";
import type { ContactModalOpenOptions } from "./ContactModalProvider";

type ContactTriggerProps = {
	children: React.ReactNode;
	className?: string;
	context?: ContactModalOpenOptions;
};

export default function ContactTrigger({ children, className, context }: ContactTriggerProps) {
	const { openContactModal } = useContactModal();

	return (
		<button
			type="button"
			className={className}
			onClick={() => openContactModal(context)}
			aria-haspopup="dialog"
		>
			{children}
		</button>
	);
}
