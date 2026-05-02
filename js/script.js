document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. LÓGICA DE IMÁGENES FLOTANTES EN INTRO
       ========================================= */
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

    const imageContainer = document.getElementById('image-container');

    const safeZones = [
        { x: [5, 25], y: [5, 25] },   { x: [75, 90], y: [5, 25] },
        { x: [5, 25], y: [70, 85] },  { x: [75, 90], y: [70, 85] },
        { x: [40, 60], y: [5, 15] },  { x: [40, 60], y: [75, 85] },
        { x: [5, 15], y: [40, 60] },  { x: [85, 95], y: [40, 60] }
    ];

    function spawnImage() {
        if (!imageContainer) return;
        const imgSrc = images[Math.floor(Math.random() * images.length)];
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'floating-image';
        
        const zone = safeZones[Math.floor(Math.random() * safeZones.length)];
        const x = Math.random() * (zone.x[1] - zone.x[0]) + zone.x[0];
        const y = Math.random() * (zone.y[1] - zone.y[0]) + zone.y[0];
        
        img.style.left = `calc(${x}vw - 100px)`; 
        img.style.top = `calc(${y}vh - 125px)`;
        
        imageContainer.appendChild(img);
        void img.offsetWidth;
        
        setTimeout(() => img.classList.add('visible'), 100);
        
        const visibleTime = 3000 + Math.random() * 2000;
        
        setTimeout(() => {
            img.classList.remove('visible');
            img.classList.add('fading');
        }, visibleTime);
        
        setTimeout(() => {
            if (imageContainer.contains(img)) imageContainer.removeChild(img);
        }, visibleTime + 2500);
    }

    spawnImage();
    setTimeout(spawnImage, 800);
    setTimeout(spawnImage, 1600);
    setInterval(spawnImage, 2000);

    /* =========================================
       2. DATOS DE LA LÍNEA DEL TIEMPO
       ========================================= */
    const timelineData = [
        { period: "PREHISTORIA Y NEOLÍTICO", title: "Culto a la Gran Diosa", desc: "<ul><li>Sociedades con estructuras matriarcales.</li><li>Representaciones arqueológicas de divinidades femeninas.</li><li>Interpretación moderna: Marija Gimbutas → lo femenino como eje civilizatorio.</li></ul>", image: "src/intro/images (1).jpeg" },
        { period: "ANTIGÜEDAD", title: "Enheduana (Sumeria)", desc: "<ul><li>Primera autora conocida de la historia.</li><li>Primer texto firmado individualmente.</li></ul>", image: "src/intro/enheduanna-seated-woman.jpg" },
        { period: "ANTIGÜEDAD", title: "Safo de Mitilene (Grecia)", desc: "<ul><li>Figura clave del pensamiento y poesía femenina.</li><li>Precursora del pensamiento filosófico femenino.</li></ul>", image: "src/intro/safo.jpg" },
        { period: "ANTIGÜEDAD", title: "Aspasia de Mileto", desc: "<ul><li>Maestra de retórica y estratega.</li><li>Símbolo de persecución contra mujeres intelectuales.</li></ul>", image: "src/intro/aspasia.jpg" },
        { period: "ANTIGÜEDAD", title: "Hiparquía", desc: "<ul><li>Filósofa cínica.</li><li>Ruptura con normas sociales y de género.</li></ul>", image: null },
        { period: "ANTIGÜEDAD", title: "María Magdalena", desc: "<ul><li>Figura clave del cristianismo primitivo.</li><li>Posteriormente tergiversada por estructuras patriarcales.</li></ul>", image: "src/intro/descarga.jpg" },
        { period: "EDAD MEDIA", title: "Kassia & Trota de Salerno", desc: "<ul><li>Kassia: Primera compositora con obra conservada.</li><li>Trota: Primera ginecóloga documentada.</li></ul>", image: null },
        { period: "EDAD MEDIA", title: "Hildegarda de Bingen", desc: "<ul><li>Escritora, médica, compositora y mística.</li><li>Figura clave en monasterios como espacios de poder femenino.</li></ul>", image: "src/intro/Hildegard_von_Bingen.jpg" },
        { period: "TRANSICIÓN MEDIEVAL", title: "Christine de Pizan", desc: "<ul><li>Primera escritora profesional.</li><li>Inicia La Querella de las Mujeres.</li></ul>", image: null },
        { period: "RENACIMIENTO Y HUMANISMO", title: "Puellae Doctae", desc: "<ul><li>Mujeres intelectuales humanistas.</li><li>Ejemplos: Beatriz Galindo, Teresa de Cartagena.</li></ul>", image: "src/intro/images.jpeg" },
        { period: "SIGLO XVII", title: "Juana Inés de la Cruz", desc: "<ul><li>Intelectual novohispana.</li><li>Defensa del derecho femenino al conocimiento.</li></ul>", image: null },
        { period: "EDAD MODERNA (s. XVIII)", title: "Olympe de Gouges & Mary Wollstonecraft", desc: "<ul><li>Declaración de los derechos de la mujer.</li><li>Vindicación de los derechos de la mujer (base del feminismo moderno).</li></ul>", image: null },
        { period: "CONTRARREFORMA", title: "Malleus Maleficarum", desc: "<ul><li>Manual de persecución y tortura contra mujeres (Caza de brujas).</li></ul>", image: null }
    ];

    const timelineTrack = document.getElementById('timeline-track');

    // Inyectar nodos al DOM
    timelineData.forEach((item, index) => {
        const isTop = index % 2 === 0; // Alternar arriba y abajo
        const node = document.createElement('div');
        node.className = `timeline-node ${isTop ? 'top' : 'bottom'}`;
        
        let imgHtml = '';
        if (item.image) {
            imgHtml = `<img src="${item.image}" alt="${item.title}">`;
        }

        node.innerHTML = `
            <div class="node-content">
                ${imgHtml}
                <div class="node-period">${item.period}</div>
                <h3 class="node-title">${item.title}</h3>
                <div class="node-desc">${item.desc}</div>
            </div>
            <div class="node-point"></div>
        `;
        timelineTrack.appendChild(node);
    });

    /* =========================================
       3. LÓGICA DEL SCROLL HORIZONTAL
       ========================================= */
    const scrollProxy = document.getElementById('scroll-proxy');
    const horizontalWrapper = document.getElementById('horizontal-wrapper');
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const finalContent = document.querySelector('.final-content');

    function updateHeights() {
        // La altura del proxy debe ser el ancho total del wrapper para simular el scroll 1:1
        // Restamos el ancho de la ventana porque el final del contenido debe coincidir con el final del scroll
        const scrollWidth = horizontalWrapper.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        scrollProxy.style.height = `${scrollWidth - windowWidth + windowHeight}px`;
    }

    // Actualizar dimensiones al cargar y al redimensionar
    window.addEventListener('resize', updateHeights);
    setTimeout(updateHeights, 100); // Dar tiempo a que las imágenes carguen sus dimensiones

    // Manejar el evento de scroll nativo
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Mover el wrapper horizontalmente
        horizontalWrapper.style.transform = `translateX(-${scrollY}px)`;

        // Calcular qué elementos están a la vista para aplicar los efectos blur/fade
        const viewportCenter = scrollY + (window.innerWidth / 2);

        // Nodos de la línea del tiempo
        timelineNodes.forEach((node) => {
            // offsetLeft dentro del contenedor + el margen inicial
            // En un layout flex, offsetLeft es relativo al contenedor principal
            const rect = node.getBoundingClientRect();
            // rect.left nos da la posición actual en pantalla
            const nodeScreenX = rect.left + rect.width / 2;

            if (nodeScreenX < window.innerWidth * 0.1) {
                // Ya pasó hacia la izquierda
                node.classList.remove('in-view');
                node.classList.add('passed');
            } else if (nodeScreenX < window.innerWidth * 0.9) {
                // Está en la zona visible
                node.classList.add('in-view');
                node.classList.remove('passed');
            } else {
                // Aún no entra (está a la derecha)
                node.classList.remove('in-view');
                node.classList.remove('passed');
            }
        });

        // Panel final
        if (finalContent) {
            const finalRect = finalContent.getBoundingClientRect();
            if (finalRect.left < window.innerWidth * 0.8) {
                finalContent.classList.add('in-view');
            } else {
                finalContent.classList.remove('in-view');
            }
        }
    });

});
