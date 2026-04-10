"use client";

import React from "react";

export default function NewsletterSection() {
	return (
		<section style={{ background: "#021024", padding: "48px 0" }}>
			<div className="mx-auto flex max-w-[1200px] flex-col items-start gap-8 px-6 md:flex-row md:items-center md:justify-between">
				{/* Left text */}
				<p
					className="max-w-[500px] text-[16px] md:text-[18px] text-white"
					style={{
						fontFamily: "'DM Sans', sans-serif",
						lineHeight: 1.5,
					}}
				>
					Subscribe to receive our latest insights, perspectives, and
					advisory updates.
				</p>

				{/* Right email form */}
				<form
					className="flex w-full md:w-auto"
					onSubmit={(e) => e.preventDefault()}
				>
					<input
						type="email"
						placeholder="Email address"
						className="h-12 flex-grow rounded-l-lg border px-4 text-[14px] text-white placeholder:text-white/40 md:w-[280px]"
						style={{
							background: "rgba(255,255,255,0.1)",
							borderColor: "rgba(125,160,202,0.25)",
							fontFamily: "'DM Sans', sans-serif",
						}}
					/>
					<button
						type="submit"
						className="newsletter-signup-btn h-12 whitespace-nowrap rounded-r-lg px-6 text-[12px] font-semibold uppercase tracking-[2px] text-white transition-colors duration-300"
						style={{
							background: "#5483B3",
							fontFamily: "'DM Sans', sans-serif",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.background = "#7DA0CA")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.background = "#5483B3")
						}
					>
						SIGN UP
					</button>
				</form>
			</div>
		</section>
	);
}
