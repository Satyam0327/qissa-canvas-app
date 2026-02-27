import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>
                    Join the <span className="gradient-text">Story</span>
                </h2>
                <p>Create your account and start curating</p>
                <SignUp
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
