import { useEffect, useState } from "react";

const tabsData = {
    Aimbot: [
        "Inicializando sistema...",
        "Assistência de Mira: ATIVA",
        "Travamento de Alvo: ATIVADO",
        "Rastreamento: ALTO",
        "Controle de Recuo: LIGADO",
        "Status: PRONTO"
    ],

    Config: [
        "Sensibilidade: 1.25x",
        "Suavização: ATIVA",
        "Campo de Visão (FOV): 90",
        "Predição: ATIVADA",
        "Perfil: Competitivo"
    ],

    Stats: [
        "Aumento de Precisão: +87%",
        "Tempo de Reação: -42%",
        "Latência: 12ms",
        "Desempenho: ESTÁVEL"
    ]
};

export default function RightCard() {
    const [activeTab, setActiveTab] = useState("Aimbot");
    const [displayedText, setDisplayedText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const lines = tabsData[activeTab];

        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(prev => prev + lines[lineIndex][charIndex]);
                    setCharIndex(c => c + 1);
                }, 20);

                return () => clearTimeout(timeout);
            } else {
                setDisplayedText(prev => prev + "\n");
                setCharIndex(0);
                setLineIndex(i => i + 1);
            }
        }
    }, [charIndex, lineIndex, activeTab]);

    // reset ao trocar aba
    useEffect(() => {
        setDisplayedText("");
        setLineIndex(0);
        setCharIndex(0);
    }, [activeTab]);

    return (
        <div className="right">
            <div className="code-card">
                <div className="tabs">
                    {Object.keys(tabsData).map(tab => (
                        <span
                            key={tab}
                            className={activeTab === tab ? "active" : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

                <pre>{displayedText}</pre>
            </div>
        </div>
    );
}