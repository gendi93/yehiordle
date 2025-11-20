import { useEffect, useState } from "react";

type ErrorMessageProps = {
    message: string;
    onClose: () => void;
};

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 2000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "80px",
                left: "50%",
                transform: `translateX(-50%) translateY(${isVisible ? "0" : "-20px"})`,
                backgroundColor: "#d32f2f",
                color: "white",
                padding: "12px 24px",
                borderRadius: "4px",
                zIndex: 999,
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: isVisible ? "auto" : "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
            role="alert"
            aria-live="assertive"
        >
            {message}
        </div>
    );
}
