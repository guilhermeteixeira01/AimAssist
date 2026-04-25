import home from "./home";
import RightCard from "./rightcard";

export default function Home() {
    return (
        <div className="container">
            <div className="left">
                <h1>
                    Precisão Absoluta <br /> em Jogos FPS
                </h1>

                <p>
                    Eleve seu desempenho com nosso sistema avançado de assistência para
                    teclado e mouse. Mais controle, mais precisão e movimentos suaves
                    para você dominar qualquer partida competitiva.
                </p>

                <button className="btn-primary">
                    Comprar Agora
                </button>

                <button className="btn-secondary">
                    Ver Demonstração
                </button>
            </div>

            <RightCard />
        </div>
    );
}