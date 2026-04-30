import Apex from "../img/apex.gif";
import Warzone from "../img/warzone.gif";
import Farlight from "../img/farlight.gif";
import Fortnite from "../img/fortnite.gif";
import Battlefield from "../img/battlefield.gif";
import Pubg from "../img/pubg.gif";
import Delta from "../img/delta force.gif";
import { useEffect, useRef, useState } from "react";

export default function Platforms() {
    const trackRef = useRef(null);
    const [loopGames, setLoopGames] = useState([]);

    const games = [
        { name: "Apex Legends", img: Apex },
        { name: "Warzone", img: Warzone },
        { name: "Farlight 84", img: Farlight },
        { name: "Fortnite", img: Fortnite },
        { name: "Battlefield", img: Battlefield },
        { name: "Pubg", img: Pubg },
        { name: "Delta Force", img: Delta }
    ];

    // 🔥 garante repetição suficiente
    useEffect(() => {
        const minWidth = window.innerWidth * 2; // precisa cobrir bem
        let temp = [...games];

        // repete até ficar grande o suficiente
        while (temp.length * 180 < minWidth) {
            temp = [...temp, ...games];
        }

        setLoopGames(temp);
    }, []);

    useEffect(() => {
        let scrollAmount = 0;

        const interval = setInterval(() => {
            if (!trackRef.current) return;

            scrollAmount += 0.4; // 🧘 mais suave

            trackRef.current.style.transform =
                `translateX(-${scrollAmount}px)`;

            if (scrollAmount >= trackRef.current.scrollWidth / 2) {
                scrollAmount = 0;
            }
        }, 16);

        return () => clearInterval(interval);
    }, [loopGames]);

    return (
        <div className="carousel">
            <h2 style={{ fontSize: "40px" }}>Compatível com seus jogos favoritos</h2>

            <div className="carousel-wrapper">
                <div className="carousel-track" ref={trackRef}>
                    {loopGames.map((game, i) => (
                        <div key={i} className="carousel-card">
                            <img src={game.img} alt={game.name} />
                            <span>{game.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}