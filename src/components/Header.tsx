"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const { items, openCart } = useCart();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-inner">
                <Link href="/" className="logo">
                    Qissa
                </Link>

                <nav>
                    <ul className="nav-links">
                        <li>
                            <a href="#gallery">Canvas</a>
                        </li>
                        <li>
                            <a href="#story">Story</a>
                        </li>
                    </ul>
                </nav>

                <div className="auth-buttons">
                    <button className="icon-btn cart-btn-header" onClick={openCart} aria-label="Open cart">
                        <ShoppingBag size={22} />
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </button>

                    <SignedOut>
                        <Link href="/sign-in" className="btn btn-ghost">
                            Sign In
                        </Link>
                        <Link href="/sign-up" className="btn btn-primary">
                            Join the Story
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: {
                                        width: "36px",
                                        height: "36px",
                                        border: "2px solid rgba(0, 240, 255, 0.3)",
                                    },
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
