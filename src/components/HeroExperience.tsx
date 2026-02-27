"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience() {
    const heroRef = useRef<HTMLDivElement>(null);
    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

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
                    end: "+=250%", // Keep it pinned for 2.5x the screen height
                    pin: ".scroll-pin-wrapper",
                    pinSpacing: true,
                });

                // Text lines fade in and out sequentially
                const textLines = gsap.utils.toArray(".scroll-text-line");
                textLines.forEach((line: any, i: number) => {
                    gsap.fromTo(line,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            scrollTrigger: {
                                trigger: scrollSectionRef.current,
                                start: `${(i * 20)}% center`,
                                end: `${(i * 20) + 15}% center`,
                                scrub: 1,
                                toggleActions: "play reverse play reverse", // fades back out if you scroll past
                            }
                        }
                    );

                    // Fade out the previous line if it's not the last one
                    gsap.to(line, {
                        opacity: 0,
                        y: -50,
                        scrollTrigger: {
                            trigger: scrollSectionRef.current,
                            start: `${(i * 20) + 20}% center`,
                            end: `${(i * 20) + 30}% center`,
                            scrub: 1,
                        }
                    });
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
                    <h1 className="hero-title" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 1 }}>
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

            <section className="scroll-section" id="story" ref={scrollSectionRef} style={{ paddingBottom: '10vh' }}>

                {/* The text that stays pinned in the center */}
                <div className="scroll-pin-wrapper" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", width: "100%", zIndex: 10, pointerEvents: "none" }}>
                    <div className="scroll-text-overlay" style={{ textAlign: "center" }}>
                        <h2 className="scroll-text-line" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", position: "absolute", width: "100%", left: 0, top: "50%", transform: "translateY(-50%)" }}>
                            <span className="text-glow">Influence.</span>
                        </h2>
                        <h2 className="scroll-text-line" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", position: "absolute", width: "100%", left: 0, top: "50%", transform: "translateY(-50%)" }}>
                            <span className="text-glow" style={{ color: "var(--accent-magenta)" }}>Impact.</span>
                        </h2>
                        <h2 className="scroll-text-line" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", position: "absolute", width: "100%", left: 0, top: "50%", transform: "translateY(-50%)" }}>
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
