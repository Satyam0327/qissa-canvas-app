import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>
                    Welcome back to <span className="gradient-text">Qissa</span>
                </h2>
                <p>Sign in to curate your canvas</p>
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: {
                                width: "100%",
                                maxWidth: "420px",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
