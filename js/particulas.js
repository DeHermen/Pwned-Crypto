document.addEventListener("DOMContentLoaded", () => {
    const particlesContainer = document.querySelector(".blinking-particles");
    const numParticles = 300; // Número de pontos piscando

    for (let i = 0; i < numParticles; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");

        // Define posições aleatórias na tela
        let randomX = Math.random() * 100; // Entre 0% e 100%
        let randomY = Math.random() * 100; // Entre 0% e 100%
        let randomDelay = Math.random() * 5; // Delay aleatório para piscar diferente

        // Aplica a posição e animação personalizada
        particle.style.left = `${randomX}%`;
        particle.style.top = `${randomY}%`;
        particle.style.animationDelay = `${randomDelay}s`;

        // Adiciona a partícula ao container
        particlesContainer.appendChild(particle);
    }
});
