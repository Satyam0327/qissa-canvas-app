"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience() {
    const heroRef = useRef<HTMLDivElement>(null);
    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const comicSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // We only want this on desktop/larger screens to avoid mobile jank, but Lenis handles it well.
        const ctx = gsap.context(() => {

            // 1. Initial Hero Text Reveal
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            tl.fromTo(".hero-tag", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
                .fromTo(".hero-title .line", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.15 }, "-=0.6")
                .fromTo(".hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
                .fromTo(".hero-cta", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8");

            // 2. Heavy Parallax on Hero Image (Dulcedo Style)
            // The background scales up and moves down slightly as you scroll away
            if (bgRef.current && heroRef.current) {
                gsap.to(bgRef.current, {
                    yPercent: 30, // Move the image down 30% of its height
                    scale: 1.15, // Scale it up
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });

                // The hero content fades and translates up faster than the scroll
                gsap.to(".hero-content", {
                    y: -150,
                    opacity: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // 3. Scroll-Telling Section pinned text + Gallery items rising
            if (scrollSectionRef.current) {
                // Pin the text in the middle
                ScrollTrigger.create({
                    trigger: scrollSectionRef.current,
                    start: "top top",
                    end: "+=250%",
                    pin: ".scroll-pin-wrapper",
                    pinSpacing: true,
                });

                // Sequential text reveal — single timeline synced to the same scroll range
                const textLines = gsap.utils.toArray(".scroll-text-line") as HTMLElement[];
                const tlText = gsap.timeline({
                    scrollTrigger: {
                        trigger: scrollSectionRef.current,
                        start: "top top",
                        end: "+=250%",
                        scrub: 1,
                    }
                });

                textLines.forEach((line, i) => {
                    const isLast = i === textLines.length - 1;

                    // Fade in + slide up
                    tlText.fromTo(line,
                        { opacity: 0, y: 60 },
                        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
                    );

                    // Hold visible for a moment
                    tlText.to(line, { opacity: 1, duration: 0.5 });

                    // Fade out (skip for the last word so it stays visible)
                    if (!isLast) {
                        tlText.to(line, { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" });
                    }
                });

                // 4. Differential Parallax Columns (Dulcedo Portfolio grid feel)
                // Give each column a different scrolling speed
                gsap.to(".parallax-col-1", {
                    yPercent: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollSectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    }
                });

                gsap.to(".parallax-col-2", {
                    yPercent: -60, // Moves faster
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollSectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    }
                });

                gsap.to(".parallax-col-3", {
                    yPercent: -20, // Moves slower
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollSectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    }
                });

                gsap.to(".parallax-col-4", {
                    yPercent: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollSectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    }
                });
            }

            // 5. Comic Sliding Doors
            if (comicSectionRef.current) {
                // Pin the container while the doors slide in
                ScrollTrigger.create({
                    trigger: comicSectionRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true,
                    pinSpacing: true,
                });

                const tlDoors = gsap.timeline({
                    scrollTrigger: {
                        trigger: comicSectionRef.current,
                        start: "top top",
                        end: "+=150%",
                        scrub: 1,
                    }
                });

                // Slide panels in from opposite sides with slight rotations
                tlDoors.fromTo(".panel-left", { xPercent: -150, rotation: -10 }, { xPercent: 0, rotation: 0, ease: "power2.out" }, 0)
                    .fromTo(".panel-right", { xPercent: 150, rotation: 10 }, { xPercent: 0, rotation: 0, ease: "power2.out" }, 0)
                    // Pop bubbles in right before the end of the scroll scrub
                    .to(".bubble-left", { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, 0.6)
                    .to(".bubble-right", { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, 0.7);
            }
        });

        return () => ctx.revert();
    }, []);

    const dummyImages = Array.from({ length: 16 }, (_, i) => `https://picsum.photos/seed/dulcedo${i}/600/800`);

    return (
        <>
            <section className="hero-section" ref={heroRef} style={{ height: "100vh", position: "relative" }}>

                <div className="hero-bg-grid" />
                <div className="hero-orbs" ref={bgRef} style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }}>
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                    <div className="hero-orb hero-orb-3" />
                </div>

                <div className="hero-content" style={{ zIndex: 10 }}>
                    <p className="hero-tag">✦ Where Art Meets Narrative</p>
                    <h1 className="hero-title">
                        <span className="line" style={{ display: 'block' }}>Every Canvas</span>
                        <span className="line" style={{ display: 'block' }}>
                            Holds a <span className="gradient-text">Qissa</span>
                        </span>
                    </h1>
                    <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '1.5rem auto' }}>
                        Scroll to unfold the narrative. Discover artwork that speaks, stories that breathe, and a canvas that never ends.
                    </p>
                    <div className="hero-cta">
                        <a href="#gallery" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                            Enter the Gallery
                        </a>
                    </div>
                </div>

                <div className="scroll-indicator" style={{ zIndex: 10 }}>
                    <span>Explore</span>
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ═══ COMIC SLIDING PANELS (Sliding Doors Effect) ═══ */}
            <section className="comic-section" ref={comicSectionRef}>
                <div className="halftone-bg" />
                <div className="comic-doors-container">

                    {/* Left Panel */}
                    <div className="comic-panel comic-panel-left panel-left">
                        <div className="comic-panel-image">
                            <img src="/batman_1.png" alt="Batman in Gotham" />
                            <div className="comic-speech-bubble bubble-left">BAM!</div>
                        </div>
                        <div className="comic-panel-caption">
                            A Collision of Worlds
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="comic-panel comic-panel-right panel-right">
                        <div className="comic-panel-image">
                            <img src="/batman_2.png" alt="Batman on Gargoyle" />
                            <div className="comic-speech-bubble bubble-right">POW!</div>
                        </div>
                        <div className="comic-panel-caption">
                            Art Breaks the Frame
                        </div>
                    </div>

                </div>
            </section>

            {/* ═══ SCROLL-TELLING GALLERY PARALLAX ═══ */}
            <section className="scroll-section" id="story" ref={scrollSectionRef} style={{ paddingBottom: '10vh' }}>

                {/* The text that stays pinned in the center */}
                <div className="scroll-pin-wrapper" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", width: "100%", zIndex: 10, pointerEvents: "none" }}>
                    <div className="scroll-text-overlay" style={{ display: "grid", placeItems: "center", width: "100%" }}>
                        <h2 className="scroll-text-line" style={{ gridArea: "1 / 1" }}>
                            <span className="text-glow">Influence.</span>
                        </h2>
                        <h2 className="scroll-text-line" style={{ gridArea: "1 / 1" }}>
                            <span className="text-glow" style={{ color: "var(--accent-magenta)" }}>Impact.</span>
                        </h2>
                        <h2 className="scroll-text-line" style={{ gridArea: "1 / 1" }}>
                            <span className="gradient-text">Lasting Legacy.</span>
                        </h2>
                    </div>
                </div>

                {/* The background grid that scrolls at different speeds */}
                <div className="parallax-poster-grid" style={{ opacity: 0.3 }}>
                    {/* Col 1 */}
                    <div className="parallax-poster-col parallax-col-1">
                        {dummyImages.slice(0, 4).map((src, i) => (
                            <img key={i} src={src} style={{ width: "100%", borderRadius: "12px", aspectRatio: "3/4", objectFit: "cover" }} alt="" />
                        ))}
                    </div>
                    {/* Col 2 */}
                    <div className="parallax-poster-col parallax-col-2">
                        {dummyImages.slice(4, 8).map((src, i) => (
                            <img key={i} src={src} style={{ width: "100%", borderRadius: "12px", aspectRatio: "4/5", objectFit: "cover" }} alt="" />
                        ))}
                    </div>
                    {/* Col 3 */}
                    <div className="parallax-poster-col parallax-col-3">
                        {dummyImages.slice(8, 12).map((src, i) => (
                            <img key={i} src={src} style={{ width: "100%", borderRadius: "12px", aspectRatio: "3/4", objectFit: "cover" }} alt="" />
                        ))}
                    </div>
                    {/* Col 4 */}
                    <div className="parallax-poster-col parallax-col-4">
                        {dummyImages.slice(12, 16).map((src, i) => (
                            <img key={i} src={src} style={{ width: "100%", borderRadius: "12px", aspectRatio: "4/5", objectFit: "cover" }} alt="" />
                        ))}
                    </div>
                </div>

            </section>
        </>
    );
}
