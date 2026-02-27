"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience() {
    const heroRef = useRef<HTMLDivElement>(null);
    const scrollSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── Hero entrance animations ──
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.to(".hero-tag", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.3,
            })
                .to(
                    ".hero-title",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                    },
                    "-=0.4"
                )
                .to(
                    ".hero-subtitle",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    "-=0.5"
                )
                .to(
                    ".hero-cta",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    "-=0.4"
                );

            // ── Scroll-telling pin & text reveals ──
            if (scrollSectionRef.current) {
                ScrollTrigger.create({
                    trigger: scrollSectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".scroll-pin-container",
                    pinSpacing: false,
                });

                // Parallax background posters
                gsap.to(".scroll-bg-posters", {
                    y: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollSectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });

                // Fade in each text line sequentially
                const textLines =
                    scrollSectionRef.current.querySelectorAll(".scroll-text-line");
                textLines.forEach((line, i) => {
                    gsap.to(line, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        scrollTrigger: {
                            trigger: scrollSectionRef.current,
                            start: `${15 + i * 22}% center`,
                            end: `${25 + i * 22}% center`,
                            scrub: 1,
                        },
                    });
                });

                // Increase background poster opacity as user scrolls
                gsap.to(".scroll-bg-posters", {
                    opacity: 0.2,
                    scrollTrigger: {
                        trigger: scrollSectionRef.current,
                        start: "top center",
                        end: "60% center",
                        scrub: 1,
                    },
                });
            }
        });

        return () => ctx.revert();
    }, []);

    // Sample poster images from picsum for parallax background
    const bgPosters = [
        "https://picsum.photos/seed/qissa1/400/600",
        "https://picsum.photos/seed/qissa2/400/600",
        "https://picsum.photos/seed/qissa3/400/600",
        "https://picsum.photos/seed/qissa4/400/600",
        "https://picsum.photos/seed/qissa5/400/600",
        "https://picsum.photos/seed/qissa6/400/600",
    ];

    return (
        <>
            {/* ═══ HERO ═══ */}
            <section className="hero-section" ref={heroRef}>
                <div className="hero-bg-grid" />
                <div className="hero-orbs">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                    <div className="hero-orb hero-orb-3" />
                </div>

                <div className="hero-content">
                    <p className="hero-tag">✦ Where Art Meets Narrative</p>
                    <h1 className="hero-title">
                        <span className="line">Every Canvas</span>
                        <span className="line">
                            Holds a <span className="gradient-text">Qissa</span>
                        </span>
                    </h1>
                    <p className="hero-subtitle">
                        Scroll to unfold the narrative. Discover artwork that speaks, stories
                        that breathe, and a canvas that never ends.
                    </p>
                    <div className="hero-cta">
                        <a href="#gallery" className="btn btn-primary">
                            Explore the Canvas
                        </a>
                        <a href="#story" className="btn btn-ghost">
                            Read the Story
                        </a>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <span>Scroll</span>
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ═══ SCROLL-TELLING ═══ */}
            <section className="scroll-section" id="story" ref={scrollSectionRef}>
                <div className="scroll-pin-container">
                    <div className="scroll-bg-posters">
                        {bgPosters.map((src, i) => (
                            <div key={i} className="scroll-bg-poster">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt={`Poster ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>

                    <div className="scroll-text-overlay">
                        <p className="scroll-text-line">
                            In a world drowning in noise,
                        </p>
                        <p className="scroll-text-line">
                            we built a place where{" "}
                            <span className="highlight">art speaks first.</span>
                        </p>
                        <p className="scroll-text-line">
                            Every poster is a <span className="highlight">Qissa</span> — a
                            story waiting to be discovered.
                        </p>
                        <p className="scroll-text-line">
                            Curate your canvas.{" "}
                            <span className="highlight">Unfold the narrative.</span>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
