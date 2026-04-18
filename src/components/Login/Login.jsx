import "./Login.css";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup,onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate(`/dashboard`);
            }
        });

        return () => unsubscribe();
    }, []);
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className="login-container">
                <div className="login-card">
                    <h1>Welcome Back 👋</h1>
                    <p>Sign in to continue managing your tasks</p>

                    <button
                        className="google-btn"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="spinner"></div>
                        ) : (
                            <>
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="google"
                                />
                                Continue with Google
                            </>
                        )}
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;