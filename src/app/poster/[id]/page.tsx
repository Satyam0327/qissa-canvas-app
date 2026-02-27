"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/components/CartContext";

// In a real app, we'd fetch from a DB. We recreate the deterministic logic here.
function getPosterDetails(idStr: string) {
    const id = parseInt(idStr, 10);
    if (isNaN(id)) return null;

    const titles = [
        "Neon Reverie", "Echoes of Tomorrow", "Crimson Drift", "Silent Frequency",
        "Midnight Protocol", "Velvet Horizon", "Digital Sakura", "Ghost Signal",
        "Phantom Thread", "Aurora Core", "Cyber Bloom", "Solar Whisper",
        "Void Walker", "Crystal Vein", "Prism Break", "Dark Lotus",
        "Neon Cathedral", "Starfall", "Obsidian Dream", "Pulse Echo",
        "Chrome Heart", "Lunar Haze", "Ember Tide", "Quantum Rose",
    ];

    const categories = [
        "Digital Art", "Illustration", "Photography", "3D Render",
        "Concept Art", "Abstract", "Anime", "Cyberpunk",
    ];

    const heightVariants = [300, 360, 420, 480, 280, 400, 340, 500];

    return {
        id,
        title: titles[id % titles.length],
        category: categories[id % categories.length],
        src: `https://picsum.photos/seed/qissa-art-${id}/800/1200`, // higher res for detail page
        height: heightVariants[id % heightVariants.length],
        description: `Immerse yourself in "${titles[id % titles.length]}", a striking piece from our ${categories[id % categories.length]} collection. This artwork explores the boundaries between reality and the digital frontier, featuring cinematic lighting and bold conceptual undertones. Printed on premium museum-grade matte paper or available as a high-fidelity digital download.`,
    };
}

const PRICING = {
    Digital: 15.0,
    Physical: 45.0,
};

export default function PosterPage() {
    const params = useParams();
    const [poster, setPoster] = useState<ReturnType<typeof getPosterDetails>>(null);
    const [format, setFormat] = useState<"Digital" | "Physical">("Physical");
    const { addItem } = useCart();

    useEffect(() => {
        if (params.id) {
            setPoster(getPosterDetails(params.id as string));
        }
    }, [params.id]);

    if (!poster) {
        return (
            <div className="poster-detail-page container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="loading-spinner">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem({
            id: `poster-${poster.id}-${format.toLowerCase()}`,
            posterId: poster.id,
            title: poster.title,
            category: poster.category,
            src: poster.src,
            format,
            price: PRICING[format],
        });
    };

    return (
        <div className="poster-detail-page container">
            <div className="breadcrumbs">
                <Link href="/">Home</Link>
                <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle", margin: "0 4px" }} />
                <Link href="/#gallery">Canvas</Link>
                <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle", margin: "0 4px" }} />
                <span style={{ color: "var(--text-primary)" }}>{poster.title}</span>
            </div>

            <div className="poster-grid">
                <div className="poster-image-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={poster.src} alt={poster.title} />
                </div>

                <div className="poster-info-col">
                    <Link href="/#gallery" className="btn btn-ghost" style={{ alignSelf: "flex-start", marginBottom: "2rem", padding: "0.4rem 0.8rem" }}>
                        <ArrowLeft size={16} /> Back to Canvas
                    </Link>

                    <h1>{poster.title}</h1>
                    <p className="poster-category">{poster.category}</p>
                    <p className="poster-desc">{poster.description}</p>

                    <div className="format-selection">
                        <h4>Select Format</h4>
                        <div className="format-options">
                            <button
                                className={`format-btn ${format === "Physical" ? "active" : ""}`}
                                onClick={() => setFormat("Physical")}
                            >
                                <span className="format-name">Premium Print</span>
                                <span className="format-desc">24" x 36" Museum Quality</span>
                            </button>
                            <button
                                className={`format-btn ${format === "Digital" ? "active" : ""}`}
                                onClick={() => setFormat("Digital")}
                            >
                                <span className="format-name">Digital Download</span>
                                <span className="format-desc">8K Ultra-HD Resolution</span>
                            </button>
                        </div>
                    </div>

                    <div className="purchase-actions">
                        <div className="price-display">
                            ${PRICING[format].toFixed(2)}
                        </div>
                        <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                            Add to Canvas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
