document.addEventListener('DOMContentLoaded', () => {
    // Array con las rutas de las imágenes proporcionadas en la carpeta src/intro
    const images = [
        "src/intro/Hildegard_von_Bingen.jpg",
        "src/intro/St-Hildegard.webp",
        "src/intro/_118494533_aspasia-arriba-2.jpg",
        "src/intro/aspasia.jpg",
        "src/intro/descarga.jpg",
        "src/intro/enheduanna-seated-woman.jpg",
        "src/intro/images (1).jpeg",
        "src/intro/images.jpeg",
        "src/intro/safo.jpg"
    ];

    const container = document.getElementById('image-container');

    // Zonas seguras (en porcentajes de viewport vw/vh) para evitar tapar el texto central.
    // El texto ocupa aproximadamente el centro (30% a 70% en X, y 35% a 65% en Y).
    const safeZones = [
        { x: [5, 25], y: [5, 25] },   // Top-left
        { x: [75, 90], y: [5, 25] },  // Top-right
        { x: [5, 25], y: [70, 85] },  // Bottom-left
        { x: [75, 90], y: [70, 85] }, // Bottom-right
        { x: [40, 60], y: [5, 15] },  // Top-center
        { x: [40, 60], y: [75, 85] }, // Bottom-center
        { x: [5, 15], y: [40, 60] },  // Left-center
        { x: [85, 95], y: [40, 60] }  // Right-center
    ];

    function getRandomPosition() {
        // Seleccionamos una zona aleatoria
        const zone = safeZones[Math.floor(Math.random() * safeZones.length)];
        // Obtenemos un punto aleatorio dentro de la zona
        const x = Math.random() * (zone.x[1] - zone.x[0]) + zone.x[0];
        const y = Math.random() * (zone.y[1] - zone.y[0]) + zone.y[0];
        return { x, y };
    }

    function spawnImage() {
        // Seleccionar imagen aleatoria
        const imgSrc = images[Math.floor(Math.random() * images.length)];
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'floating-image';
        
        const pos = getRandomPosition();
        
        // Centrar un poco la imagen respecto a la coordenada usando transform no es ideal aquí
        // porque ya usamos transform para la animación. Así que ajustamos usando calc y offsets aproximados.
        // Asumiendo un ancho máximo de 200px (aprox 10vw) y alto 250px (aprox 15vh)
        img.style.left = `calc(${pos.x}vw - 100px)`; 
        img.style.top = `calc(${pos.y}vh - 125px)`;
        
        container.appendChild(img);
        
        // Forzamos un reflow para que la transición CSS funcione correctamente al añadir la clase
        void img.offsetWidth;
        
        // Disparar animación de entrada (fade in + unblur)
        setTimeout(() => {
            img.classList.add('visible');
        }, 100); // Pequeño retraso para asegurar que el DOM registró la imagen inicial
        
        // Definir tiempo de visibilidad (entre 3 y 5 segundos)
        const visibleTime = 3000 + Math.random() * 2000;
        
        // Disparar animación de salida (fade out + blur)
        setTimeout(() => {
            img.classList.remove('visible');
            img.classList.add('fading');
        }, visibleTime);
        
        // Eliminar del DOM una vez que termina la transición (2.5s después de empezar a desaparecer)
        setTimeout(() => {
            if (container.contains(img)) {
                container.removeChild(img);
            }
        }, visibleTime + 2500);
    }

    // Generar la primera imagen de inmediato
    spawnImage();

    // Luego, generar imágenes progresivamente y continuar en bucle
    setTimeout(spawnImage, 800);
    setTimeout(spawnImage, 1600);

    // Bucle para seguir generando imágenes cada 1.5 a 2.5 segundos
    setInterval(() => {
        spawnImage();
    }, 2000);
});
