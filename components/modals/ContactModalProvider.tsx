"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import ContactModal from "./ContactModal";

export type InquiryType = "general" | "service" | "career";

export type ContactModalOpenOptions = {
	inquiryType?: InquiryType;
	relatedServiceId?: string;
	relatedServiceTitle?: string;
	/** Back-compat alias for relatedServiceId. */
	relatedService?: string;
};

type ContactModalContextValue = {
	openContactModal: (options?: ContactModalOpenOptions) => void;
	closeContactModal: () => void;
	isContactModalOpen: boolean;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
	const value = useContext(ContactModalContext);
	if (!value) {
		throw new Error("useContactModal must be used within ContactModalProvider");
	}
	return value;
}

export default function ContactModalProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [context, setContext] = useState<Omit<ContactModalOpenOptions, "relatedService"> | null>(null);

	const openContactModal = useCallback((options?: ContactModalOpenOptions) => {
		const normalizedRelatedServiceId = options?.relatedServiceId ?? options?.relatedService;
		setContext(
			options
				? {
						inquiryType: options.inquiryType,
						relatedServiceId: normalizedRelatedServiceId,
						relatedServiceTitle: options.relatedServiceTitle,
				  }
				: null
		);
		setIsOpen(true);
	}, []);
	const closeContactModal = useCallback(() => {
		setIsOpen(false);
		setContext(null);
	}, []);

	const value = useMemo<ContactModalContextValue>(
		() => ({
			openContactModal,
			closeContactModal,
			isContactModalOpen: isOpen,
		}),
		[openContactModal, closeContactModal, isOpen]
	);

	return (
		<ContactModalContext.Provider value={value}>
			{children}
			<ContactModal open={isOpen} onClose={closeContactModal} context={context ?? undefined} />
		</ContactModalContext.Provider>
	);
}
