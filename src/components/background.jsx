import { useEffect, useRef } from "react";

export default function Background() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width, height;

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;

            width = window.innerWidth;
            height = document.documentElement.clientHeight; // 🔥 mais estável no mobile

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resizeCanvas();

        const symbols = [
            { char: "✕", color: "#3fa9f5" },
            { char: "○", color: "#ff4d4d" },
            { char: "△", color: "#00ff99" },
            { char: "□", color: "#ff66cc" }
        ];

        const density = 40;
        let particles = [];

        function createParticle() {
            const s = symbols[Math.floor(Math.random() * symbols.length)];
            const depth = Math.random();

            return {
                x: Math.random() * width,
                y: Math.random() * height,
                baseSpeed: Math.random() * 0.4 + 0.2,
                speed: 0,
                size: (Math.random() * 12 + 10) * (0.6 + depth),
                symbol: s.char,
                color: s.color,
                lineHeight: (Math.random() * 80 + 60) * (0.6 + depth),
                opacity: 0.4 + depth * 0.6,
                depth
            };
        }

        function generateParticles() {
            const count = Math.floor(width / density);
            particles = Array.from({ length: count }, () => createParticle());
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.speed += 0.005;
                const velocity = p.baseSpeed + p.speed * 0.15;

                const x = p.x;
                const y = p.y;

                ctx.globalAlpha = p.opacity;

                const gradient = ctx.createLinearGradient(
                    x,
                    y - p.lineHeight,
                    x,
                    y
                );

                gradient.addColorStop(0, "transparent");
                gradient.addColorStop(0.6, p.color);
                gradient.addColorStop(1, p.color);

                const symbolTop = y - p.size * 0.45;

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1 + p.depth;
                ctx.shadowBlur = 8 + p.depth * 8;
                ctx.shadowColor = p.color;

                ctx.moveTo(x, y - p.lineHeight);
                ctx.lineTo(x, symbolTop);
                ctx.stroke();

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.font = `${p.size}px Arial`;
                ctx.fillStyle = p.color;

                ctx.shadowBlur = 15 + p.depth * 10;
                ctx.shadowColor = p.color;

                ctx.fillText(p.symbol, x, y);

                p.y += velocity;

                if (p.y > height) {
                    // 🔥 reaproveita partícula (não recria tudo)
                    Object.assign(p, createParticle(), {
                        y: -20,
                        speed: 0
                    });
                }
            });

            requestAnimationFrame(draw);
        }

        generateParticles();
        draw();

        // 🔥 controle inteligente de resize (ignora scroll mobile)
        let lastHeight = height;

        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = document.documentElement.clientHeight;

            // só atualiza se mudou de verdade (ex: rotação)
            if (
                Math.abs(newHeight - lastHeight) > 120 ||
                Math.abs(newWidth - width) > 120
            ) {
                resizeCanvas();
                lastHeight = newHeight;
            }
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                pointerEvents: "none"
            }}
        />
    );
}