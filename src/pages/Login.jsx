import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/auth.css";

export default function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response =
                await login(
                    email,
                    password
                );

            localStorage.setItem(
                "token",
                response.token
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(
                "Email ou senha inválidos"
            );
        }
    }

    return (
        <div className="auth-container">
    
            <div className="auth-card">
    
                <h1>AI Resume Generator</h1>
    
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
    
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
    
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
    
                    <button type="submit">
                        Entrar
                    </button>
    
                </form>
    
                <div className="auth-footer">
    
                    <Link to="/register">
                        Criar conta
                    </Link>
    
                </div>
    
            </div>
    
        </div>
    );
}