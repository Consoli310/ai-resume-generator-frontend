import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/auth.css";

export default function Register() {

    const navigate =
        useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response =
                await register(
                    name,
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
                "Erro ao registrar"
            );
        }
    }

    return (
        <div className="auth-container">
    
            <div className="auth-card">
    
                <h1>Criar Conta</h1>
    
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
    
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
    
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
                        Registrar
                    </button>
    
                </form>
    
                <div className="auth-footer">
    
                    <Link to="/">
                        Já possui conta?
                    </Link>
    
                </div>
    
            </div>
    
        </div>
    );
}