import React, { useEffect, useRef } from "react";
import { COLORS } from "../config/consts";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mousedown", handleClickOutside);

        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "20px",
            }}
        >
            <div
                ref={modalRef}
                style={{
                    backgroundColor: COLORS.Black,
                    borderRadius: "8px",
                    padding: "24px",
                    maxWidth: "500px",
                    width: "100%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    border: `1px solid ${COLORS.Grey}`,
                    position: "relative",
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
            >
                {title && (
                    <h2
                        id="modal-title"
                        style={{
                            marginTop: 0,
                            marginBottom: "16px",
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        {title}
                    </h2>
                )}
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "24px",
                            cursor: "pointer",
                            padding: "4px 8px",
                            borderRadius: "4px",
                        }}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                )}
                {children}
            </div>
        </div>
    );
}
