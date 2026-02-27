"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PosterItem {
    id: number;
    title: string;
    category: string;
    src: string;
    height: number;
}

// Generate poster data with varied heights for masonry effect
function generatePosters(startId: number, count: number): PosterItem[] {
    const titles = [
        "Neon Reverie",
        "Echoes of Tomorrow",
        "Crimson Drift",
        "Silent Frequency",
        "Midnight Protocol",
        "Velvet Horizon",
        "Digital Sakura",
        "Ghost Signal",
        "Phantom Thread",
        "Aurora Core",
        "Cyber Bloom",
        "Solar Whisper",
        "Void Walker",
        "Crystal Vein",
        "Prism Break",
        "Dark Lotus",
        "Neon Cathedral",
        "Starfall",
        "Obsidian Dream",
        "Pulse Echo",
        "Chrome Heart",
        "Lunar Haze",
        "Ember Tide",
        "Quantum Rose",
    ];

    const categories = [
        "Digital Art",
        "Illustration",
        "Photography",
        "3D Render",
        "Concept Art",
        "Abstract",
        "Anime",
        "Cyberpunk",
    ];

    return Array.from({ length: count }, (_, i) => {
        const id = startId + i;
        const seed = id * 7 + 13; // deterministic variety
        const heightVariants = [300, 360, 420, 480, 280, 400, 340, 500];
        return {
            id,
            title: titles[id % titles.length],
            category: categories[id % categories.length],
            src: `https://picsum.photos/seed/qissa-art-${id}/400/${heightVariants[id % heightVariants.length]}`,
            height: heightVariants[id % heightVariants.length],
        };
    });
}

const BATCH_SIZE = 12;

export default function InfiniteCanvas() {
    const [posters, setPosters] = useState<PosterItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement>(null);
    const batchRef = useRef(0);

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);

        // Simulate async fetch
        setTimeout(() => {
            const newPosters = generatePosters(
                batchRef.current * BATCH_SIZE,
                BATCH_SIZE
            );
            batchRef.current += 1;

            setPosters((prev) => [...prev, ...newPosters]);
            setLoading(false);

            // Cap at ~120 posters
            if (batchRef.current >= 10) {
                setHasMore(false);
            }
        }, 400);
    }, [loading, hasMore]);

    // Initial load
    useEffect(() => {
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // IntersectionObserver for infinite scroll
    useEffect(() => {
        const node = observerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [loadMore]);

    // Apply Parallax effect to new items
    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".parallax-image-wrapper img");

            items.forEach((item: any) => {
                // Determine if this item already has a ScrollTrigger attached
                if (!item.classList.contains("parallax-applied")) {
                    item.classList.add("parallax-applied");

                    gsap.fromTo(item,
                        { yPercent: -10, scale: 1.1 },
                        {
                            yPercent: 10,
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: item.parentElement,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            }
                        }
                    );
                }
            });
        });

        return () => ctx.revert();
    }, [posters]); // Re-run when new posters load

    return (
        <section className="gallery-section" id="gallery">
            <div className="gallery-header">
                <h2>
                    The Infinite <span className="gradient-text">Canvas</span>
                </h2>
                <p>Every piece has a name. Hover to discover the Qissa behind it.</p>
            </div>

            <div className="masonry-grid">
                {posters.map((poster) => (
                    <Link href={`/poster/${poster.id}`} key={poster.id}>
                        <div className="masonry-item">
                            <div className="parallax-image-wrapper" style={{ overflow: "hidden", width: "100%", height: "100%", position: "relative" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={poster.src}
                                    alt={poster.title}
                                    loading="lazy"
                                    style={{ aspectRatio: `400/${poster.height}`, objectFit: "cover", width: "100%" }}
                                />
                            </div>
                            <div className="masonry-overlay">
                                <h4>{poster.title}</h4>
                                <span>{poster.category}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {hasMore && (
                <div className="load-trigger" ref={observerRef}>
                    {loading && (
                        <div className="loading-spinner">
                            <div className="dot" />
                            <div className="dot" />
                            <div className="dot" />
                        </div>
                    )}
                </div>
            )}

            {!hasMore && (
                <div className="load-trigger">
                    <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: "0.85rem" }}>
                        You&apos;ve reached the edge of the canvas ✦
                    </p>
                </div>
            )}
        </section>
    );
}
