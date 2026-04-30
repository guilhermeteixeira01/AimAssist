import Tracking from "../img/tracking.gif";
import Recoil from "../img/recuo.gif";
import Reaction from "../img/reação.gif";
import Sensitivity from "../img/sensi.gif";

export default function Features() {
    const cards = [
        {
            title: "Tracking de Precisão",
            desc: "Aprimora o acompanhamento contínuo do alvo com suavização de movimento e ajuste dinâmico de sensibilidade.",
            tag: "TRACKING",
            image: Tracking
        },
        {
            title: "Controle de Recuo Avançado",
            desc: "Compensa padrões de recoil automaticamente, mantendo estabilidade e consistência nos disparos.",
            tag: "RECOIL",
            image: Recoil
        },
        {
            title: "Otimização de Tempo de Reação",
            desc: "Reduz o tempo entre aquisição de alvo e resposta, melhorando a eficiência em combates rápidos.",
            tag: "REACTION",
            image: Reaction
        },
        {
            title: "Calibração de Sensibilidade",
            desc: "Ajuste fino de DPI e sensibilidade para maior precisão em diferentes cenários de jogo.",
            tag: "SENSITIVITY",
            image: Sensitivity
        }
    ];

    return (
        <>
            <h2 style={{ fontSize: "40px", color: "white", textAlign: "center" }}>Configs</h2>
            <div className="cards-container">
                {cards.map((card, i) => (
                    <div key={i} className="card">

                        {/* 🎥 MÍDIA */}
                        <div className="media">
                            {card.video ? (
                                <video
                                    src={card.video}
                                    autoPlay
                                    muted
                                    loop
                                />
                            ) : (
                                <img src={card.image} alt={card.title} />
                            )}
                        </div>

                        {/* 📄 CONTEÚDO */}
                        <span className="tag">{card.tag}</span>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                    </div>
                ))}
            </div>
        </>
    );

}