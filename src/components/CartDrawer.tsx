"use client";

import { useCart } from "./CartContext";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
    const { items, isCartOpen, closeCart, updateQuantity, removeItem, cartTotal } =
        useCart();
    const router = useRouter();

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        closeCart();
        router.push("/checkout");
    };

    return (
        <>
            {/* Backdrop */}
            <div className="cart-backdrop" onClick={closeCart} />

            {/* Drawer */}
            <div className="cart-drawer">
                <div className="cart-header">
                    <h3>Your Canvas ({items.reduce((acc, i) => acc + i.quantity, 0)})</h3>
                    <button className="icon-btn" onClick={closeCart} aria-label="Close cart">
                        <X size={20} />
                    </button>
                </div>

                <div className="cart-items custom-scrollbar">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <ShoppingBag size={48} className="empty-icon" />
                            <p>Your cart is empty.</p>
                            <button className="btn btn-ghost" onClick={closeCart}>
                                Continue Browsing
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-img">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.src} alt={item.title} />
                                </div>
                                <div className="cart-item-info">
                                    <div className="cart-item-title-row">
                                        <Link href={`/poster/${item.posterId}`} onClick={closeCart}>
                                            <h4>{item.title}</h4>
                                        </Link>
                                        <button
                                            className="remove-btn icon-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="cart-item-meta">
                                        {item.format} • {item.category}
                                    </p>
                                    <div className="cart-item-bottom">
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Subtotal</span>
                            <span className="total-amount">${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="tax-note">Taxes and shipping calculated at checkout.</p>
                        <button className="btn btn-primary btn-block" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
