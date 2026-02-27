"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, CreditCard } from "lucide-react";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form states
    const [email, setEmail] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvc, setCvc] = useState("");

    const handleSimulatePayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !cardName || !cardNumber || !expDate || !cvc) return;

        setIsProcessing(true);

        // Simulate network latency & payment gateway processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2500);
    };

    if (isSuccess) {
        return (
            <div className="checkout-page container success-view">
                <div className="success-card">
                    <div className="success-icon-wrapper">
                        <CheckCircle2 size={64} className="success-icon" />
                    </div>
                    <h1>Payment Successful</h1>
                    <p>Your order has been confirmed. The story is yours to keep.</p>
                    <div className="receipt-details">
                        <p>Order ID: #QISSA-{Math.floor(Math.random() * 90000) + 10000}</p>
                        <p>Receipt sent to: {email}</p>
                    </div>
                    <Link href="/#gallery" className="btn btn-primary mt-6">
                        Return to Canvas
                    </Link>
                </div>
            </div>
        );
    }

    if (items.length === 0 && !isProcessing && !isSuccess) {
        return (
            <div className="checkout-page container empty-view">
                <Link href="/#gallery" className="btn btn-ghost mb-6" style={{ alignSelf: "flex-start" }}>
                    <ArrowLeft size={16} /> Back to Canvas
                </Link>
                <div className="auth-card" style={{ marginTop: "10vh" }}>
                    <h2>Your Canvas is Empty</h2>
                    <p>Add some Qissas to your cart before checking out.</p>
                    <Link href="/#gallery" className="btn btn-primary mt-4">
                        Explore Collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <div className="checkout-header">
                <Link href="/#gallery" className="btn btn-ghost">
                    <ArrowLeft size={16} /> Continue Browsing
                </Link>
                <h2>Secure Checkout</h2>
            </div>

            <div className="checkout-grid">
                {/* Payment Form Column */}
                <div className="checkout-form-col">
                    <form className="payment-form" onSubmit={handleSimulatePayment}>
                        <div className="form-section">
                            <h3>Contact Information</h3>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="nomad@cyber.net"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Payment Details</h3>
                            <div className="secure-badge">
                                <ShieldCheck size={16} />
                                <span>256-bit Encrypted Mock Processing</span>
                            </div>

                            <div className="form-group">
                                <label>Cardholder Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="V. Nomad"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Card Number</label>
                                <div className="input-with-icon">
                                    <CreditCard size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        value={cardNumber}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            setCardNumber(val.replace(/(.{4})/g, "$1 ").trim());
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        value={expDate}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            if (val.length > 2) {
                                                setExpDate(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
                                            } else {
                                                setExpDate(val);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVC</label>
                                    <input
                                        type="password"
                                        required
                                        placeholder="***"
                                        maxLength={4}
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary btn-block checkout-submit-btn ${isProcessing ? "processing" : ""}`}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="spinner-small"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Lock size={16} /> Pay ${cartTotal.toFixed(2)}
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Order Summary Column */}
                <div className="checkout-summary-col">
                    <div className="summary-card">
                        <h3>Order Summary</h3>
                        <div className="summary-items custom-scrollbar">
                            {items.map((item) => (
                                <div className="summary-item" key={item.id}>
                                    <div className="summary-item-img">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.src} alt={item.title} />
                                    </div>
                                    <div className="summary-item-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.format}</p>
                                        <div className="summary-item-price-row">
                                            <span>Qty: {item.quantity}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-totals">
                            <div className="totals-row">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="totals-row">
                                <span>Taxes</span>
                                <span>$0.00</span>
                            </div>
                            <div className="totals-row grand-total">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
