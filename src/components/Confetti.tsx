import { useEffect, useState } from "react";

export default function Confetti() {
    const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 0.5 + Math.random() * 0.5,
        }));
        setParticles(newParticles);

        const timer = setTimeout(() => {
            setParticles([]);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                zIndex: 9999,
            }}
        >
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    style={{
                        position: "absolute",
                        left: `${particle.left}%`,
                        top: "-10px",
                        width: "10px",
                        height: "10px",
                        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        borderRadius: "50%",
                        animation: `confetti ${particle.duration}s ease-out ${particle.delay}s forwards`,
                    }}
                />
            ))}
        </div>
    );
}
