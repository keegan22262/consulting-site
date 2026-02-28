"use client";
import React, { useEffect, useRef } from "react";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      {/* Centered panel */}
      <div
        className="absolute left-0 right-0 top-0 bottom-0 flex items-start justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="max-w-2xl w-full mx-auto mt-32 bg-white rounded-card shadow-lg p-8 transition-opacity duration-fast ease-standard"
          style={{ pointerEvents: "auto" }}
          onClick={e => e.stopPropagation()}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search insights, services..."
            className="w-full border border-border-subtle rounded-card px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accentSemantic-primary transition-all duration-fast ease-standard"
          />
          <div className="mt-6 text-sm text-text-muted">
            Start typing to search...
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
