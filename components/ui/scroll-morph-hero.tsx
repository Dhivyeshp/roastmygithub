"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface FlipCardProps {
    src: string;
    username: string;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    onClick: () => void;
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, username, target, onClick }: FlipCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{ position: "absolute", width: IMG_WIDTH, height: IMG_HEIGHT, marginLeft: -IMG_WIDTH / 2, marginTop: -IMG_HEIGHT / 2, transformStyle: "preserve-3d", perspective: "1000px" }}
            className="cursor-pointer group"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                animate={{ rotateY: isHovered ? 180 : 0 }}
            >
                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg" style={{ backfaceVisibility: "hidden", background: "#e9d5ff" }}>
                    <img src={src} alt={username} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col items-center justify-center p-2"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                >
                    <p style={{ color: "#fff", fontSize: "9px", fontWeight: 700, textAlign: "center", fontFamily: "var(--font-mono)" }}>@{username}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export const MORPH_SCROLL_HEIGHT = 3200; // how many px of page scroll this consumes

const PROFILES = [
    { username: "sindresorhus",  src: "https://github.com/sindresorhus.png?size=320" },
    { username: "karpathy",      src: "https://github.com/karpathy.png?size=320" },
    { username: "kamranahmedse", src: "https://github.com/kamranahmedse.png?size=320" },
    { username: "jwasham",       src: "https://github.com/jwasham.png?size=320" },
    { username: "gaearon",       src: "https://github.com/gaearon.png?size=320" },
    { username: "torvalds",      src: "https://github.com/torvalds.png?size=320" },
    { username: "tj",            src: "https://github.com/tj.png?size=320" },
    { username: "yyx990803",     src: "https://github.com/yyx990803.png?size=320" },
    { username: "getify",        src: "https://github.com/getify.png?size=320" },
    { username: "addyosmani",    src: "https://github.com/addyosmani.png?size=320" },
    { username: "nicolo-ribaudo",src: "https://github.com/nicolo-ribaudo.png?size=320" },
    { username: "tannerlinsley", src: "https://github.com/tannerlinsley.png?size=320" },
    { username: "kentcdodds",    src: "https://github.com/kentcdodds.png?size=320" },
    { username: "mckaywrigley",  src: "https://github.com/mckaywrigley.png?size=320" },
    { username: "ThePrimeagen",  src: "https://github.com/ThePrimeagen.png?size=320" },
    { username: "antirez",       src: "https://github.com/antirez.png?size=320" },
    { username: "dhh",           src: "https://github.com/dhh.png?size=320" },
    { username: "feross",        src: "https://github.com/feross.png?size=320" },
    { username: "mxkaske",       src: "https://github.com/mxkaske.png?size=320" },
    { username: "t3dotgg",       src: "https://github.com/t3dotgg.png?size=320" },
];

const TOTAL_IMAGES = PROFILES.length;
const LINE_SCROLL_END = 850;
const CIRCLE_MORPH_END = 1600;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const invlerp = (a: number, b: number, v: number) => clamp((v - a) / (b - a), 0, 1);

interface Props {
    /** Raw page-scroll pixels consumed within this section (0 → MORPH_SCROLL_HEIGHT) */
    scrollY: number;
}

export default function IntroAnimation({ scrollY }: Props) {
    const router = useRouter();
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const obs = new ResizeObserver((entries) => {
            const e = entries[0];
            setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
        });
        obs.observe(containerRef.current);
        setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
        return () => obs.disconnect();
    }, []);

    // Mouse parallax
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handle = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX.set((((e.clientX - rect.left) / rect.width) * 2 - 1) * 100);
        };
        container.addEventListener("mousemove", handle);
        return () => container.removeEventListener("mousemove", handle);
    }, [mouseX]);

    useEffect(() => smoothMouseX.on("change", setParallaxValue), [smoothMouseX]);

    // Derived animation values from scrollY prop:
    // 0–850px keeps the profile pictures in a horizontally scrollable-feeling line.
    // 850–1600px morphs the line into a circle.
    // 1600–3200px rotates that circle with page scroll.
    const lineScrollValue = invlerp(0, LINE_SCROLL_END, scrollY);
    const morphValue = invlerp(LINE_SCROLL_END, CIRCLE_MORPH_END, scrollY);
    const rotateValue = invlerp(CIRCLE_MORPH_END, MORPH_SCROLL_HEIGHT, scrollY) * 360;

    // Text visibility
    const labelOpacity = clamp(1 - morphValue * 1.8, 0, 1);
    const contentOpacity = invlerp(0.65, 1, morphValue);
    const contentY = lerp(20, 0, invlerp(0.65, 1, morphValue));

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "#fdfcff" }}>
            <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: "1000px" }}>

                {/* "Profiles that set the bar" — visible before morph */}
                <div className="absolute z-20 left-0 right-0 flex flex-col items-center justify-center text-center pointer-events-none top-[35%] -translate-y-1/2 px-4">
                    <motion.h2
                        animate={{ opacity: labelOpacity, y: 0, filter: "blur(0px)" }}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "#0f172a", letterSpacing: "-0.03em" }}
                    >
                        Profiles that set the bar.
                    </motion.h2>
                    <motion.p
                        animate={{ opacity: labelOpacity * 0.6 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ marginTop: "0.75rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#94a3b8", textTransform: "uppercase" }}
                    >
                        scroll the line into a circle
                    </motion.p>
                </div>

                {/* "The top 0.1%" - fades in as morph completes */}
                <motion.div
                    animate={{ opacity: contentOpacity, y: contentY }}
                    className="absolute left-0 right-0 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", color: "#0f172a", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
                        The top 0.1% - study them.
                    </h2>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#64748b", maxWidth: "420px", lineHeight: 1.65 }}>
                        These developers turned their GitHub into career leverage. See what yours is missing.
                    </p>
                </motion.div>

                {/* Cards — zero-size anchor at viewport center so x/y offsets radiate from center */}
                <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 5 }}>
                    {PROFILES.map((profile, i) => {
                        const isMobile = containerSize.width < 768;
                        const minDim = Math.min(containerSize.width || 900, containerSize.height || 700);
                        const spacing = isMobile ? 64 : 78;
                        const lineY = isMobile ? 120 : 135;
                        const lineWidth = (TOTAL_IMAGES - 1) * spacing;
                        const lineTravel = Math.max(0, lineWidth - containerSize.width + IMG_WIDTH * 4);
                        const lineX = i * spacing - lineWidth / 2 - lerp(-lineTravel / 2, lineTravel / 2, lineScrollValue);
                        const linePos = {
                            x: lineX,
                            y: lineY,
                            rotation: 0,
                            scale: isMobile ? 0.96 : 1,
                        };

                        const circleRadius = Math.min(minDim * (isMobile ? 0.34 : 0.36), isMobile ? 210 : 330);
                        const circleAngle = (i / TOTAL_IMAGES) * 360 - 90 + rotateValue;
                        const circleRad = (circleAngle * Math.PI) / 180;
                        const circlePos = {
                            x: Math.cos(circleRad) * circleRadius + parallaxValue * 0.18,
                            y: Math.sin(circleRad) * circleRadius,
                            rotation: circleAngle + 90,
                            scale: isMobile ? 1.12 : 1.28,
                        };

                        const target = {
                            x: lerp(linePos.x, circlePos.x, morphValue),
                            y: lerp(linePos.y, circlePos.y, morphValue),
                            rotation: lerp(linePos.rotation, circlePos.rotation, morphValue),
                            scale: lerp(linePos.scale, circlePos.scale, morphValue),
                            opacity: 1,
                        };

                        return <FlipCard key={profile.username} src={profile.src} username={profile.username} target={target} onClick={() => router.push(`/results?u=${profile.username}`)} />;
                    })}
                </div>
            </div>
        </div>
    );
}
