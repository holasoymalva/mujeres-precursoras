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

        const isMobile = window.innerWidth <= 768;
        const offsetWidth = isMobile ? 60 : 100;
        const offsetHeight = isMobile ? 75 : 125;

        img.style.left = `calc(${x}vw - ${offsetWidth}px)`;
        img.style.top = `calc(${y}vh - ${offsetHeight}px)`;

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
        { period: "PREHISTORIA Y NEOLÍTICO", title: "Culto a la Gran Diosa", desc: "<ul><li>Sociedades con estructuras matriarcales o matricéntricas.</li><li>Representaciones de divinidades femeninas (Marija Gimbutas).</li></ul>", image: "src/linea/linea-011.jpeg" },
        { period: "ANTIGÜEDAD (2300 a.C. – 400 d.C.)", title: "Enheduana (Sumeria)", desc: "<ul><li>Primera autora de la historia con nombre conocido.</li><li>Primer texto firmado individualmente en tablillas cuneiformes.</li></ul>", image: "src/linea/linea-021.webp" },
        { period: "ANTIGÜEDAD", title: "Safo de Mitilene (Grecia)", desc: "<ul><li>Figura central de la poesía lírica y el pensamiento femenino.</li><li>Origen del linaje intelectual y creativo de las mujeres.</li></ul>", image: "src/linea/linea-031.jpg" },
        { period: "ANTIGÜEDAD", title: "Aspasia de Mileto", desc: "<ul><li>Intelectual, estratega y maestra de retórica en Atenas.</li><li>Símbolo de la invisibilización del pensamiento tras figuras masculinas.</li></ul>", image: "src/linea/linea-041.jpg" },
        { period: "ANTIGÜEDAD", title: "Hiparquía", desc: "<ul><li>Filósofa cínica que rechazó radicalmente las normas de género.</li><li>Ruptura con el modelo de mujer doméstica de la época.</li></ul>", image: "src/linea/linea-051.jpeg" },
        { period: "PROTOCRISTIANISMO (S. I–III)", title: "María Magdalena y Evangelizadoras", desc: "<ul><li>Figuras de autoridad espiritual (Magdalena, Tecla, María de Nazareth).</li><li>Liderazgo femenino posteriormente deslegitimado por el patriarcado.</li></ul>", image: "src/linea/linea-061.jpg" },
        { period: "EDAD MEDIA (S. IX)", title: "Kassia de Constantinopla", desc: "<ul><li>Primera compositora con notación musical conservada.</li><li>Poetisa que enfrentó el poder imperial desde la cultura.</li></ul>", image: "src/linea/linea-071.jpeg" },
        { period: "EDAD MEDIA (S. XI)", title: "Trota de Salerno", desc: "<ul><li>Primera ginecóloga documentada de la historia.</li><li>Tratados de medicina escritos desde una perspectiva femenina.</li></ul>", image: "" },
        { period: "EDAD MEDIA (S. XII)", title: "Hildegarda de Bingen", desc: "<ul><li>Mística, científica y compositora visionaria.</li><li>El monasterio como espacio de autonomía y creación intelectual.</li></ul>", image: "src/linea/linea-081.png" },
        { period: "EDAD MEDIA", title: "Iluminadoras y Trobairitz", desc: "<ul><li>Mujeres creadoras de manuscritos (Guda, Ende) y poetisas provenzales.</li><li>Ruptura del modelo de amor cortés y visibilidad artística.</li></ul>", image: "" },
        { period: "EDAD MEDIA (S. XII–XIII)", title: "Beguinas y Sororidad", desc: "<ul><li>Comunidades autónomas de mujeres (Hadewijch, Marguerite Porete).</li><li>Clara de Asís y la primera regla monástica escrita por una mujer.</li></ul>", image: "" },
        { period: "TRANSICIÓN (S. XIV–XV)", title: "Christine de Pizan", desc: "<ul><li>Primera escritora profesional; inició 'La Querella de las Mujeres'.</li><li>Defensa de la educación femenina como herramienta de libertad.</li></ul>", image: "src/linea/linea-091.jpeg" },
        { period: "TRANSICIÓN", title: "Juana de Arco", desc: "<ul><li>Liderazgo militar y transgresión de roles de género.</li><li>Ejecutada como castigo a su autonomía e influencia política.</li></ul>", image: "" },
        { period: "RENACIMIENTO (S. XV–XVI)", title: "Puellae Doctae", desc: "<ul><li>Mujeres humanistas (Beatriz Galindo, Teresa de Cartagena).</li><li>Marie de Gournay y la defensa de la igualdad de los sexos.</li></ul>", image: "src/linea/linea-101.jpg" },
        { period: "SIGLO XVII", title: "Juana Inés de la Cruz", desc: "<ul><li>La 'Décima Musa' mexicana; defensora del derecho al conocimiento.</li><li>Crítica a la 'necedad' de los hombres y la opresión conventual.</li></ul>", image: "" },
        { period: "PERSECUCIÓN (S. XV–XVII)", title: "Caza de Brujas", desc: "<ul><li>Eliminación sistemática de mujeres sabias, parteras y autónomas.</li><li>El 'Malleus Maleficarum' como base ideológica del feminicidio.</li></ul>", image: "" },
        { period: "SIGLO XVIII", title: "Olympe de Gouges", desc: "<ul><li>Autora de la Declaración de los Derechos de la Mujer y de la Ciudadana.</li><li>Primera mártir del feminismo moderno en la Revolución Francesa.</li></ul>", image: "" },
        { period: "SIGLO XVIII", title: "Mary Wollstonecraft", desc: "<ul><li>'Vindicación de los derechos de la mujer'.</li><li>Argumentó que la falta de educación causaba la supuesta inferioridad.</li></ul>", image: "" },
        { period: "SIGLO XX", title: "Marija Gimbutas y Simone de Beauvoir", desc: "<ul><li>Relectura de la prehistoria y crítica estructural a la opresión.</li><li>'No se nace mujer, se llega a serlo'.</li></ul>", image: "" }
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
        // Aseguramos que el contenedor horizontal no tenga scroll interno
        horizontalWrapper.style.width = 'max-content';
        
        const scrollWidth = horizontalWrapper.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculamos el scroll necesario para que el final del contenido coincida con el final de la pantalla
        const totalScroll = Math.max(0, scrollWidth - windowWidth);
        scrollProxy.style.height = `${totalScroll + windowHeight}px`;
        
        drawWavyLine();
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
                startFinalPhrases(); // Iniciar rotación de frases
            } else {
                finalContent.classList.remove('in-view');
            }
        }
    });

    /* =========================================
       4. LÓGICA DE FRASES DINÁMICAS (FINAL)
       ========================================= */
    const finalPhrases = [
        "\"El hombre define a la mujer no en sí misma, sino con relación a él.\" – Simone de Beauvoir (1949)",
        "\"Si los hombres son capaces de aprender, ¿por qué no las mujeres?\" – Christine de Pizan (La ciudad de las damas, c. 1405)",
        "\"¿Quién ha prohibido a las mujeres estudiar?\" – Sor Juana Inés de la Cruz (Respuesta a Sor Filotea, 1691)",
        "\"Yo no estudio para saber más, sino para ignorar menos.\" – Sor Juana Inés de la Cruz (s. XVII)",
        "\"La mujer nace libre y permanece igual al hombre en derechos.\" – Olympe de Gouges (Declaración de los Derechos de la Mujer y la Ciudadana, 1791)",
        "\"No deseo que las mujeres tengan poder sobre los hombres, sino sobre sí mismas.\" – Mary Wollstonecraft (Vindicación de los derechos de la mujer, 1792)",
        "\"Yo soy mía.\" – Hiparquía (atribuido en fuentes clásicas sobre su vida, s. IV a.C.)",
        "\"Algunos dicen que una tropa de jinetes es lo más bello... yo digo que es aquello que uno ama.\" – Safo de Mitilene (Fragmento 16, s. VII–VI a.C.)",
        "\"Yo, Enheduana, exalto a la diosa Inanna.\" – Enheduana (Himnos, c. 2300 a.C.)",
        "\"Las mujeres son capaces de razón tanto como los hombres.\" – Marie de Gournay (Igualdad de hombres y mujeres, 1622)",
        "\"No soy ni Eva ni María: soy yo misma.\" – (atribuido al pensamiento beguino, Marguerite de Porete, s. XIII–XIV, interpretación basada en El espejo de las almas simples)"
    ];

    let currentPhraseIndex = 0;
    let phraseInterval = null;
    const quoteElement = document.getElementById('phrase-quote');
    const contextElement = document.getElementById('phrase-context');

    function updatePhrase() {
        if (!quoteElement || !contextElement) return;

        const phrase = finalPhrases[currentPhraseIndex];
        const parts = phrase.split(' – ');
        const quote = parts[0];
        const context = parts.slice(1).join(' – ');

        // Fase de salida
        quoteElement.classList.remove('phrase-visible');
        contextElement.classList.remove('phrase-visible');
        quoteElement.classList.add('phrase-hidden');
        contextElement.classList.add('phrase-hidden');

        setTimeout(() => {
            // Actualizar contenido
            quoteElement.textContent = quote;
            contextElement.textContent = context || "";

            // Fase de entrada
            quoteElement.classList.remove('phrase-hidden');
            contextElement.classList.remove('phrase-hidden');
            quoteElement.classList.add('phrase-visible');
            contextElement.classList.add('phrase-visible');

            currentPhraseIndex = (currentPhraseIndex + 1) % finalPhrases.length;
        }, 1500); // Coincide con la duración de la transición CSS
    }

    function startFinalPhrases() {
        if (phraseInterval) return; // Ya está corriendo
        updatePhrase(); // Primera actualización inmediata
        phraseInterval = setInterval(updatePhrase, 7000); // Cambiar cada 7 segundos
    }

});
