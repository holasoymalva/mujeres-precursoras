document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       0. EFECTO INTERACTIVO DE TEXTO (INTRO)
       ========================================= */
    const introTitle = document.querySelector('.intro-text h1');
    if (introTitle) {
        // Función recursiva para separar cada letra en un span sin romper HTML (<br>, <span>, etc.)
        const walk = (node) => {
            if (node.nodeType === 3) { // Nodo de texto
                const text = node.nodeValue;
                if (!text.trim()) return; // Ignorar nodos que son solo espacios

                const fragment = document.createDocumentFragment();
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    if (char === ' ') {
                        fragment.appendChild(document.createTextNode(' '));
                    } else {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.className = 'hover-char';
                        fragment.appendChild(span);
                    }
                }
                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === 1 && node.nodeName !== 'BR') {
                Array.from(node.childNodes).forEach(walk);
            }
        };

        Array.from(introTitle.childNodes).forEach(walk);

        // Lógica de deformación por proximidad
        const chars = introTitle.querySelectorAll('.hover-char');
        document.addEventListener('mousemove', (e) => {
            // El scroll proxy puede estar activo, pero el wrapper horizontal se mueve con translate.
            // Para la pantalla de intro, al inicio, el ratón en la pantalla coincide perfectamente.
            // (Esta sección generalmente desaparece al hacer scroll, pero usamos clientX/Y que son coordenadas de pantalla)
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            chars.forEach(char => {
                const rect = char.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const dx = mouseX - charX;
                const dy = mouseY - charY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const maxDist = 120; // Radio del efecto "imán/repulsión"

                if (dist < maxDist) {
                    const intensity = 1 - (dist / maxDist);
                    const safeDist = dist || 1;

                    // Empujar la letra ligeramente, rotarla y desenfocarla
                    const pushX = -(dx / safeDist) * 20 * intensity;
                    const pushY = -(dy / safeDist) * 20 * intensity;
                    const rot = (dx / maxDist) * 40 * intensity;
                    const blur = 8 * intensity;

                    char.style.transform = `translate(${pushX}px, ${pushY}px) rotate(${rot}deg) scale(${1 + 0.3 * intensity})`;
                    char.style.filter = `blur(${blur}px)`;
                    char.style.opacity = 1 - (0.4 * intensity);
                } else {
                    // Estado normal
                    char.style.transform = `translate(0px, 0px) rotate(0deg) scale(1)`;
                    char.style.filter = `blur(0px)`;
                    char.style.opacity = 1;
                }
            });
        });
    }

    /* =========================================
       1. LÓGICA DE IMÁGENES FLOTANTES EN INTRO
       ========================================= */
    const images = [
        "src/intro/34fcdd6b-3236-4f7b-b97b-8b7c45333c39_source-aspect-ratio_1600w_0.jpg",
        "src/intro/Hildegard_von_Bingen.jpg",
        "src/intro/St-Hildegard.webp",
        "src/intro/Venus_von_Willendorf_01.jpg",
        "src/intro/_118494533_aspasia-arriba-2.jpg",
        "src/intro/aspasia.jpg",
        "src/intro/christine-pizan.jpg",
        "src/intro/descarga.jpg",
        "src/intro/enheduanna-seated-woman.jpg",
        "src/intro/images (1).jpeg",
        "src/intro/images.jpeg",
        "src/intro/linea-041.jpg",
        "src/intro/linea-051.jpeg",
        "src/intro/linea-061.jpg",
        "src/intro/linea-071.jpeg",
        "src/intro/linea-081.png",
        "src/intro/linea-091.jpeg",
        "src/intro/linea-101.jpg",
        "src/intro/safo.jpg"
    ];

    const imageContainerIntro = document.getElementById('image-container');
    const imageContainerFinal = document.getElementById('final-image-container');

    const safeZones = [
        { x: [5, 25], y: [5, 25] }, { x: [75, 90], y: [5, 25] },
        { x: [5, 25], y: [70, 85] }, { x: [75, 90], y: [70, 85] },
        { x: [40, 60], y: [5, 15] }, { x: [40, 60], y: [75, 85] },
        { x: [5, 15], y: [40, 60] }, { x: [85, 95], y: [40, 60] }
    ];

    function spawnImage(container) {
        if (!container) return;
        const imgSrc = images[Math.floor(Math.random() * images.length)];
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'floating-image';

        const zone = safeZones[Math.floor(Math.random() * safeZones.length)];
        const x = Math.random() * (zone.x[1] - zone.x[0]) + zone.x[0];
        const y = Math.random() * (zone.y[1] - zone.y[0]) + zone.y[0];

        img.style.left = `calc(${x}vw - 100px)`;
        img.style.top = `calc(${y}vh - 125px)`;

        container.appendChild(img);
        void img.offsetWidth;

        setTimeout(() => img.classList.add('visible'), 100);

        const visibleTime = 3000 + Math.random() * 2000;

        setTimeout(() => {
            img.classList.remove('visible');
            img.classList.add('fading');
        }, visibleTime);

        setTimeout(() => {
            if (container.contains(img)) container.removeChild(img);
        }, visibleTime + 2500);
    }

    // Inicializar para la intro
    if (imageContainerIntro) {
        spawnImage(imageContainerIntro);
        setTimeout(() => spawnImage(imageContainerIntro), 800);
        setTimeout(() => spawnImage(imageContainerIntro), 1600);
        setInterval(() => spawnImage(imageContainerIntro), 2000);
    }

    // Inicializar para el final
    if (imageContainerFinal) {
        spawnImage(imageContainerFinal);
        setTimeout(() => spawnImage(imageContainerFinal), 800);
        setTimeout(() => spawnImage(imageContainerFinal), 1600);
        setInterval(() => spawnImage(imageContainerFinal), 2000);
    }

    /* =========================================
       2. DATOS DE LA LÍNEA DEL TIEMPO
       ========================================= */
    const timelineData = [
        { period: "PREHISTORIA Y NEOLÍTICO", title: "Culto a la Gran Diosa", desc: "<ul><li>Sociedades con estructuras matriarcales.</li><li>Representaciones arqueológicas de divinidades femeninas.</li><li>Interpretación moderna: Marija Gimbutas → lo femenino como eje civilizatorio.</li></ul>", image: "src/linea/linea-011.jpeg" },
        { period: "ANTIGÜEDAD", title: "Enheduana (Sumeria)", desc: "<ul><li>Primera autora conocida de la historia.</li><li>Primer texto firmado individualmente.</li></ul>", image: "src/linea/linea-021.webp" },
        { period: "ANTIGÜEDAD", title: "Safo de Mitilene (Grecia)", desc: "<ul><li>Figura clave del pensamiento y poesía femenina.</li><li>Precursora del pensamiento filosófico femenino.</li></ul>", image: "src/linea/linea-031.jpg" },
        { period: "ANTIGÜEDAD", title: "Aspasia de Mileto", desc: "<ul><li>Maestra de retórica y estratega.</li><li>Símbolo de persecución contra mujeres intelectuales.</li></ul>", image: "src/linea/linea-041.jpg" },
        { period: "ANTIGÜEDAD", title: "Hiparquía", desc: "<ul><li>Filósofa cínica.</li><li>Ruptura con normas sociales y de género.</li></ul>", image: "src/linea/linea-051.jpeg" },
        { period: "ANTIGÜEDAD", title: "María Magdalena", desc: "<ul><li>Figura clave del cristianismo primitivo.</li><li>Posteriormente tergiversada por estructuras patriarcales.</li></ul>", image: "src/linea/linea-061.jpg" },
        { period: "EDAD MEDIA", title: "Kassia & Trota de Salerno", desc: "<ul><li>Kassia: Primera compositora con obra conservada.</li><li>Trota: Primera ginecóloga documentada.</li></ul>", image: "src/linea/linea-071.jpeg" },
        { period: "EDAD MEDIA", title: "Hildegarda de Bingen", desc: "<ul><li>Escritora, médica, compositora y mística.</li><li>Figura clave en monasterios como espacios de poder femenino.</li></ul>", image: "src/linea/linea-081.png" },
        { period: "TRANSICIÓN MEDIEVAL", title: "Christine de Pizan", desc: "<ul><li>Primera escritora profesional.</li><li>Inicia La Querella de las Mujeres.</li></ul>", image: "src/linea/linea-091.jpeg" },
        { period: "RENACIMIENTO Y HUMANISMO", title: "Puellae Doctae", desc: "<ul><li>Mujeres intelectuales humanistas.</li><li>Ejemplos: Beatriz Galindo, Teresa de Cartagena.</li></ul>", image: "src/linea/linea-101.jpg" },
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
        const scrollWidth = horizontalWrapper.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        scrollProxy.style.height = `${scrollWidth - windowWidth + windowHeight}px`;
        drawWavyLine(); // Dibujar línea cuando tenemos las medidas reales
    }

    function drawWavyLine() {
        const svg = document.getElementById('timeline-svg');
        const pathBg = document.getElementById('timeline-path-bg');
        const pathFg = document.getElementById('timeline-path');
        const maskPath = document.getElementById('mask-path');

        if (!svg || !maskPath) return;

        // Usamos el ancho completo del track + un extra para que no se corte al final
        const width = timelineTrack.scrollWidth + window.innerWidth;

        const amplitude = 60; // Altura de las olas
        const period = window.innerWidth * 0.6; // Distancia entre crestas
        const centerY = 200; // Centro vertical dentro del SVG de 400px

        let d = `M 0 ${centerY} `;
        for (let x = 0; x < width; x += period) {
            d += `Q ${x + period / 4} ${centerY - amplitude}, ${x + period / 2} ${centerY} `;
            d += `T ${x + period} ${centerY} `;
        }

        pathBg.setAttribute('d', d);
        pathFg.setAttribute('d', d);
        maskPath.setAttribute('d', d);

        // Configurar máscara para la animación
        const length = maskPath.getTotalLength();
        maskPath.style.strokeDasharray = length;
        maskPath.style.strokeDashoffset = length;

        svg.style.width = `${width}px`;
    }

    // Actualizar dimensiones al cargar y al redimensionar
    window.addEventListener('resize', updateHeights);
    setTimeout(updateHeights, 200); // Dar tiempo a que las imágenes carguen sus dimensiones

    // Manejar el evento de scroll nativo
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Mover el wrapper horizontalmente
        horizontalWrapper.style.transform = `translateX(-${scrollY}px)`;

        // Animar el revelado de la línea ondulada
        const maskPath = document.getElementById('mask-path');
        if (maskPath) {
            const length = maskPath.getTotalLength();
            // Calculamos cuánto ha avanzado el track. Restamos el ancho inicial de la intro (aprox window.innerWidth)
            // Añadimos un margen (window.innerWidth * 0.8) para que la línea se dibuje "por delante" de donde miramos
            let revealWidth = scrollY - window.innerWidth + (window.innerWidth * 0.8);
            if (revealWidth < 0) revealWidth = 0;

            const trackWidth = timelineTrack.scrollWidth;
            let ratio = revealWidth / trackWidth;
            if (ratio > 1) ratio = 1;

            maskPath.style.strokeDashoffset = length - (length * ratio);
        }

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
