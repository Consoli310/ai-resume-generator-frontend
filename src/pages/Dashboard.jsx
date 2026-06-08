import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadResume } from "../services/resumeService";
import "../styles/dashboard.css";

export default function Dashboard() {

    const navigate = useNavigate();

    const [jobDescription, setJobDescription] =
        useState("");

    const [currentResumeText, setCurrentResumeText] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleDownload() {

        if (!jobDescription || !currentResumeText) {

            alert(
                "Preencha todos os campos"
            );

            return;
        }

        try {

            setLoading(true);

            const pdf =
                await downloadResume(
                    jobDescription,
                    currentResumeText
                );

            const url =
                window.URL.createObjectURL(
                    pdf
                );

            const link =
                document.createElement("a");

            link.href = url;
            link.download = "resume.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.error(error);
        
            try {
        
                if (error.response?.data) {
        
                    const text =
                        await error.response.data.text();
        
                    const json =
                        JSON.parse(text);
        
                    if (
                        json.status === 502 &&
                        json.message?.includes(
                            "experiencing high demand"
                        )
                    ) {
        
                        alert(
                            "A IA está temporariamente sobrecarregada. Aguarde alguns instantes e tente novamente."
                        );
        
                        return;
                    }
        
                    alert(
                        json.message ||
                        "Erro ao gerar PDF"
                    );
        
                    return;
                }
        
            } catch (e) {
        
                console.error(
                    "Erro ao processar resposta:",
                    e
                );
            }
        
            alert(
                "Erro inesperado ao gerar PDF."
            );
        } finally {

            setLoading(false);
        }
    }

    function logout() {

        localStorage.removeItem(
            "token"
        );

        navigate("/");
    }

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    AI Resume Generator
                </h1>

                <button
                    className="download-btn"
                    onClick={logout}
                >
                    Sair
                </button>

            </div>

            <textarea
                rows={10}
                placeholder="Descrição da vaga"
                value={jobDescription}
                onChange={(e) =>
                    setJobDescription(
                        e.target.value
                    )
                }
            />

<textarea
    rows={12}
    placeholder={`Seu Currículo:
        
Nome:
Email:
Telefone:
Cidade:
LinkedIn:
GitHub:

Resumo profissional:

Skills:
- ...

Formação:
- ...

Experiências:
- ...

Projetos:
- ...

Idiomas:
- ...`}
    value={currentResumeText}
    onChange={(e) =>
        setCurrentResumeText(
            e.target.value
        )
    }
/>

            <button
                className="download-btn"
                disabled={loading}
                onClick={handleDownload}
            >

                {loading && (
                    <div className="spinner" />
                )}

                {
                    loading
                        ? "Gerando PDF..."
                        : "Gerar PDF"
                }

            </button>

        </div>
    );
}