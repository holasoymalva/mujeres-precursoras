document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       0. EFECTO INTERACTIVO DE TEXTO (INTRO)
       ========================================= */
    const introTitle = document.querySelector('.intro-text h1');
    if (introTitle) {
        const walk = (node) => {
            if (node.nodeType === 3) {
                const text = node.nodeValue;
                if (!text.trim()) return;

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

        const chars = introTitle.querySelectorAll('.hover-char');
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            chars.forEach(char => {
                const rect = char.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const dx = mouseX - charX;
                const dy = mouseY - charY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const maxDist = 120;

                if (dist < maxDist) {
                    const intensity = 1 - (dist / maxDist);
                    const safeDist = dist || 1;

                    const pushX = -(dx / safeDist) * 20 * intensity;
                    const pushY = -(dy / safeDist) * 20 * intensity;
                    const rot = (dx / maxDist) * 40 * intensity;
                    const blur = 8 * intensity;

                    char.style.transform = `translate(${pushX}px, ${pushY}px) rotate(${rot}deg) scale(${1 + 0.3 * intensity})`;
                    char.style.filter = `blur(${blur}px)`;
                    char.style.opacity = 1 - (0.4 * intensity);
                } else {
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

    if (imageContainerIntro) {
        spawnImage(imageContainerIntro);
        setTimeout(() => spawnImage(imageContainerIntro), 800);
        setTimeout(() => spawnImage(imageContainerIntro), 1600);
        setInterval(() => spawnImage(imageContainerIntro), 2000);
    }

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
        {
            period: "PREHISTORIA Y NEOLÍTICO",
            title: "Culto a la Gran Diosa",
            desc: "<ul><li>Sociedades con estructuras matriarcales o matricéntricas.</li><li>Representaciones de divinidades femeninas (Marija Gimbutas).</li></ul>",
            image: "src/linea/linea-011.jpg",
            region: "Europa Central, Cercano Oriente y Cuenca Mediterránea · 40.000 – 3.000 a.C.",
            ideas: [
                "La divinidad femenina era el principio creador: vida, fertilidad y renacimiento giraban en torno a una figura materna cósmica.",
                "Las Venus paleolíticas (Willendorf, ~25.000 a.C.) son el primer arte centrado en el cuerpo femenino como símbolo de poder sagrado.",
                "Marija Gimbutas documentó en 'El Lenguaje de la Diosa' (1989) más de 30.000 figurillas femeninas en la Europa pre-indoeuropea."
            ],
            impact: [
                "Estas tradiciones inspiran el ecofeminismo moderno y la espiritualidad de la Diosa en el siglo XX y XXI.",
                "El concepto de lo sagrado femenino pervive en tradiciones indígenas de América, África y Oceanía.",
                "Abrió el debate académico sobre si las sociedades humanas originales fueron igualitarias o matriarcales."
            ]
        },
        {
            period: "ANTIGÜEDAD (c. 2300 a.C.)",
            title: "Enheduana de Sumeria",
            desc: "<ul><li>Primera autora de la historia con nombre conocido.</li><li>Primer texto literario firmado individualmente en tablillas cuneiformes.</li></ul>",
            image: "src/linea/linea-021.webp",
            region: "Ur, Sumeria · Actual Irak · c. 2285 – 2250 a.C.",
            ideas: [
                "Sumo sacerdotisa del dios luna Nanna en Ur; hija del rey Sargón de Acad, usó su posición para crear una voz literaria personal.",
                "Introdujo la primera persona singular en la escritura cuneiforme, inventando el concepto mismo de autoría e identidad autoral.",
                "Sus 42 Himnos a los Templos y sus poemas a Inanna son el cuerpo literario firmado más antiguo conservado en el mundo."
            ],
            impact: [
                "Fundó la tradición de la literatura introspectiva y personal que atraviesa toda la historia hasta la actualidad.",
                "La diosa Inanna que exaltó se convirtió en símbolo del poder femenino en todo el mundo antiguo mesopotámico.",
                "Fue redescubierta por la arqueología del siglo XX; su figura inspira el movimiento de recuperación de voces femeninas históricas."
            ]
        },
        {
            period: "ANTIGÜEDAD (S. VII–VI a.C.)",
            title: "Safo de Mitilene",
            desc: "<ul><li>Figura central de la poesía lírica y el pensamiento femenino.</li><li>Origen del linaje intelectual y creativo de las mujeres en Occidente.</li></ul>",
            image: "src/linea/linea-031.jpg",
            region: "Lesbos, Grecia · c. 630 – 570 a.C.",
            ideas: [
                "Dirigía un thíasos (círculo educativo) donde las jóvenes aprendían música, poesía, danza y las artes en un espacio femenino autónomo.",
                "Su poesía lírica celebraba el amor, la belleza femenina y la intimidad entre mujeres, desafiando la épica heroica masculina como única norma.",
                "Exploró la subjetividad emocional —el deseo, los celos, el dolor del amor— como tema literario legítimo, siglos antes que cualquier otro poeta."
            ],
            impact: [
                "Platón la llamó 'la Décima Musa'; Aristóteles la citó como ejemplo de talento reconocido más allá del género.",
                "Los términos 'lesbianismo' y 'sáfico' derivan de su nombre e isla natal, afirmando históricamente la existencia del amor entre mujeres.",
                "Sus fragmentos, redescubiertos en papiros egipcios desde 1898, siguen transformando la comprensión de la poesía lírica occidental."
            ]
        },
        {
            period: "ANTIGÜEDAD (S. V a.C.)",
            title: "Aspasia de Mileto",
            desc: "<ul><li>Intelectual, estratega y maestra de retórica en la Atenas de Pericles.</li><li>Símbolo de la invisibilización del pensamiento femenino por la historia.</li></ul>",
            image: "src/linea/linea-041.jpg",
            region: "Mileto (actual Turquía) → Atenas, Grecia · c. 470 – 400 a.C.",
            ideas: [
                "Dirigió el círculo intelectual más influyente de Atenas; el propio Sócrates —según Platón— la citaba como su maestra en el arte de la persuasión.",
                "Según el diálogo Menéxeno de Platón, fue ella quien redactó el célebre discurso fúnebre atribuido a Pericles, el más famoso de la Antigüedad.",
                "Defendía la educación y la participación política de las mujeres en una polis que legalmente las excluía de toda vida pública."
            ],
            impact: [
                "Su figura es el símbolo más poderoso de cómo el patriarcado borró las contribuciones intelectuales femeninas atribuyéndolas a hombres.",
                "Fue atacada como 'hetera' y llevada a juicio por ejercer la inteligencia y la autonomía que la sociedad solo toleraba en los varones.",
                "Aparece en Platón, Jenofonte, Plutarco y Cicerón: la evidencia de su influencia real es incontestable pese al silencio oficial."
            ]
        },
        {
            period: "ANTIGÜEDAD (S. IV a.C.)",
            title: "Hiparquía de Maroneia",
            desc: "<ul><li>Filósofa cínica que rechazó radicalmente las normas de género de su época.</li><li>Primer acto feminista documentado de rechazo explícito al rol doméstico.</li></ul>",
            image: "src/linea/linea-051.jpeg",
            region: "Maroneia, Tracia → Atenas, Grecia · c. 346 – 300 a.C.",
            ideas: [
                "Adoptó la filosofía cínica en su forma más radical: abandonó la vida doméstica para vivir en la calle, rechazando herencia, dote y convenciones sociales.",
                "Se unió a Crates de Tebas por elección propia y amor filosófico, sin ceremonias ni dote, viviendo como compañeros iguales en pensamiento y vida.",
                "Debatió públicamente con filósofos varones, siendo la única mujer incluida en las 'Vidas de los Filósofos Ilustres' de Diógenes Laercio."
            ],
            impact: [
                "Primera filósofa conocida que ejerció la filosofía práctica de manera completamente igualitaria al hombre, sin reclusión doméstica ni tutela.",
                "La frase que se le atribuye —'Yo soy mía'— anticipa más de dos milenios de pensamiento sobre la autonomía y la soberanía del cuerpo femenino.",
                "Su figura fue rescatada por el feminismo de los años 1970 como precursora del pensamiento radical sobre los roles de género."
            ]
        },
        {
            period: "PROTOCRISTIANISMO (S. I–III d.C.)",
            title: "María Magdalena y las Evangelizadoras",
            desc: "<ul><li>Figuras de autoridad espiritual en el cristianismo primitivo.</li><li>Liderazgo femenino sistemáticamente deslegitimado por la institución eclesiástica.</li></ul>",
            image: "src/linea/linea-061.jpg",
            region: "Palestina, Asia Menor y Norte de África · Siglos I–III d.C.",
            ideas: [
                "María Magdalena fue 'apóstola de los apóstoles': primera testigo de la Resurrección y portadora del mensaje central del Evangelio (Juan 20).",
                "Las primeras comunidades cristianas reconocían el liderazgo femenino: Febe era diaconisa, Priscila misionera, Junia apóstola (Romanos 16).",
                "Los Evangelios gnósticos de Nag Hammadi (descubiertos en 1945) muestran a María Magdalena como discípula de mayor comprensión espiritual que Pedro."
            ],
            impact: [
                "En el año 591, el Papa Gregorio I la identificó falsamente con una prostituta —sin base bíblica alguna— para borrar su autoridad teológica.",
                "La Iglesia Católica rehabilitó su figura en 2016, elevando su festividad al rango de 'Fiesta' litúrgica, igual que los apóstoles varones.",
                "Su historia inspira hoy el debate sobre el sacerdocio femenino y la historia oculta del liderazgo de las mujeres en el cristianismo primitivo."
            ]
        },
        {
            period: "EDAD MEDIA (S. IX d.C.)",
            title: "Kassia de Constantinopla",
            desc: "<ul><li>Primera compositora con notación musical íntegramente conservada.</li><li>Poetisa que enfrentó el poder imperial desde la cultura y el pensamiento.</li></ul>",
            image: "src/linea/linea-071.jpeg",
            region: "Constantinopla, Imperio Bizantino · c. 805 – 865 d.C.",
            ideas: [
                "Rechazó convertirse en emperatriz (según la leyenda, con un ingenioso contraargumento al propio Teófilo) para fundar su propio monasterio.",
                "Compuso al menos 49 himnos litúrgicos y obras de música profana; su estilo marcó para siempre la tradición musical de la Iglesia Ortodoxa.",
                "Sus epigramas y poemas profanos critican la hipocresía social y la superioridad masculina con una ironía y elegancia inusuales en el mundo medieval."
            ],
            impact: [
                "Su himno 'Kasia Triodion' se canta en todas las iglesias ortodoxas cada Miércoles Santo, sin interrupción desde hace más de 1.200 años.",
                "Es la única figura del mundo bizantino —hombre o mujer— cuya música, poesía y biografía completa están documentadas con detalle.",
                "Fue canonizada como santa por la Iglesia Ortodoxa; su vida es símbolo de la autonomía intelectual y espiritual femenina posible incluso bajo el poder imperial."
            ]
        },
        {
            period: "EDAD MEDIA (S. XI d.C.)",
            title: "Trota de Salerno",
            desc: "<ul><li>Primera ginecóloga documentada de la historia de la medicina occidental.</li><li>Tratados médicos escritos desde la perspectiva de las necesidades de las mujeres.</li></ul>",
            image: "src/linea/linea-081.jpeg",
            region: "Salerno, Italia del Sur · c. 1050 – 1100 d.C.",
            ideas: [
                "Médica de la Escuela de Medicina de Salerno, la primera institución médica laica de Europa, donde excepcionalmente se admitían mujeres.",
                "Sus tratados 'Trotula' cubrían ginecología, obstetricia, cuidado prenatal y cosmética desde la perspectiva directa de los problemas de las mujeres.",
                "Abogó por el uso de analgésicos durante el parto, desafiando la doctrina religiosa que consideraba el dolor del parto un castigo divino inevitable."
            ],
            impact: [
                "Los textos 'Trotula' fueron el manual médico ginecológico más consultado en toda Europa durante cinco siglos completos (XI–XVI).",
                "Pese a ser la médica más famosa de la Edad Media, su autoría fue sistemáticamente negada por cronistas varones que la atribuían a hombres.",
                "Inspiró generaciones de sanadoras y parteras cuyo conocimiento fue luego perseguido y destruido durante la Caza de Brujas de los siglos XV–XVII."
            ]
        },
        {
            period: "EDAD MEDIA (S. XII d.C.)",
            title: "Hildegarda de Bingen",
            desc: "<ul><li>Mística, científica, compositora y médica: genio total del siglo XII.</li><li>El monasterio como espacio de autonomía intelectual y creación ilimitada.</li></ul>",
            image: "src/linea/linea-091.jpeg",
            region: "Renania, Sacro Imperio Romano Germánico · 1098 – 1179 d.C.",
            ideas: [
                "Su concepto de 'viriditas' (verdor divino) unía espiritualidad, naturaleza y salud en una cosmovisión holística siglos adelantada a su tiempo.",
                "Escribió Physica y Causae et Curae: dos enciclopedias de medicina natural, plantas medicinales y el funcionamiento del cuerpo humano.",
                "Sus visiones místicas (Scivias), aprobadas por el Papa Eugenio III, le otorgaron autoridad única para predicar en público, viajar y reprender a obispos."
            ],
            impact: [
                "Compuso el Ordo Virtutum (1151): la obra dramática musical más antigua conservada íntegramente en la historia de la música occidental.",
                "Fue proclamada Doctora de la Iglesia por Benedicto XVI en 2012, uno de solo 37 en toda la historia (apenas 4 son mujeres).",
                "Sus obras médicas y su música, redescubiertas en el siglo XX, la convirtieron en ícono del feminismo espiritual, ecológico y de la medicina alternativa."
            ]
        },
        {
            period: "EDAD MEDIA (S. XI–XIV)",
            title: "Iluminadoras y Trobairitz",
            desc: "<ul><li>Creadoras de manuscritos iluminados y poetisas-compositoras provenzales.</li><li>Ruptura del modelo del amor cortés y primera visibilidad artística femenina.</li></ul>",
            image: "src/linea/linea-101.jpeg",
            region: "Provenza (Francia), Cataluña, Renania · Siglos XI–XIV",
            ideas: [
                "Las Trobairitz fueron las primeras compositoras de música secular en lengua vernácula (occitano), desafiando el monopolio masculino del arte cortés.",
                "Subvirtieron el amor cortés escribiendo desde el deseo y la voz femenina activa, no como objeto pasivo sino como sujeto que ama, exige y juzga.",
                "Las iluminadoras de manuscritos (Guda, Ende) firmaron sus obras con su nombre, desafiando el anonimato impuesto a las artistas medievales."
            ],
            impact: [
                "La Condesa de Día compuso 'A chantar m'er de so qu'ieu non volria': el único canso trovadoresco femenino con su música conservada.",
                "Ende colaboró en la creación del Beatus de Gerona (975 d.C.), uno de los manuscritos iluminados más extraordinarios de la historia del arte.",
                "Las ~20 trobairitz conocidas abrieron el camino a la expresión artística femenina que el Renacimiento patriarcal clausuraría durante siglos."
            ]
        },
        {
            period: "EDAD MEDIA (S. XII–XIV)",
            title: "Beguinas y Sororidad",
            desc: "<ul><li>Comunidades autónomas de mujeres laicas fuera del control eclesiástico.</li><li>Clara de Asís y la primera regla monástica escrita y aprobada por una mujer.</li></ul>",
            image: "src/linea/linea-111.webp",
            region: "Países Bajos, Bélgica, Renania, Francia · Siglos XII–XIV",
            ideas: [
                "Las beguinas formaron comunidades laicas sin votos permanentes: trabajaban, enseñaban y cuidaban enfermos con plena independencia económica y espiritual.",
                "Hadewijch de Amberes desarrolló el concepto de minne (amor divino) en poesía mística de una profundidad filosófica extraordinaria.",
                "Clara de Asís redactó en 1253 su propia Regla monástica, la primera escrita por una mujer y aprobada oficialmente por Roma en la historia."
            ],
            impact: [
                "Marguerite Porete fue quemada viva en París en 1310 por su libro 'El espejo de las almas simples': primera mártir documentada del pensamiento libre femenino.",
                "El movimiento beguino tuvo miles de miembros en Europa; fue el mayor movimiento laico y femenino de toda la Edad Media.",
                "Los beguinajes flamencos fueron declarados Patrimonio de la Humanidad por la UNESCO en 1998, reconociendo su valor histórico único."
            ]
        },
        {
            period: "TRANSICIÓN MEDIEVAL (S. XIV–XV)",
            title: "Christine de Pizan",
            desc: "<ul><li>Primera escritora profesional de Europa occidental con obra extensa y firmada.</li><li>Inició 'La Querella de las Mujeres', primer debate feminista sistematizado en Europa.</li></ul>",
            image: "src/linea/linea-121.jpeg",
            region: "Venecia → París, Francia · 1364 – c. 1430",
            ideas: [
                "En 'La Ciudad de las Damas' (1405) construyó alegóricamente una ciudad habitada solo por mujeres ilustres de la historia, refutando la misoginia literaria medieval.",
                "Combatió con argumentos racionales y documentados la misoginia de Jean de Meun (Roman de la Rose) y de Boccaccio en sus textos influyentes.",
                "Defendió el derecho de las mujeres a la educación como herramienta de libertad y dignidad, no como adorno social ni ornamento de salón."
            ],
            impact: [
                "Escribió 41 obras en 30 años: la carrera literaria más prolífica de la Europa medieval, comparable a cualquier autor masculino de su época.",
                "La 'Querella de las Mujeres' que inauguró alrededor de 1400 fue el primer debate feminista sistematizado y sostenido de la historia de Europa.",
                "Fue redescubierta por el feminismo académico de los años 1970; es considerada la primera feminista de la civilización occidental."
            ]
        },
        {
            period: "TRANSICIÓN MEDIEVAL (S. XV)",
            title: "Juana de Arco",
            desc: "<ul><li>Liderazgo militar y transgresión radical de todos los roles de género de su época.</li><li>Ejecutada como castigo explícito a su autonomía política y espiritual.</li></ul>",
            image: "src/linea/linea-131.avif",
            region: "Domrémy, Francia · 1412 – 1431",
            ideas: [
                "Lideró el ejército francés a los 17 años guiada por 'voces divinas', rompiendo todos los roles de género vigentes: ni monja, ni esposa, ni campesina sumisa.",
                "Vistió ropa masculina como decisión estratégica durante su campaña; este acto fue usado como prueba principal de herejía en su juicio y condena.",
                "Rechazó la autoridad de los jueces eclesiásticos cuando contradecían sus revelaciones divinas, afirmando que su conciencia estaba por encima de la jerarquía."
            ],
            impact: [
                "Fue quemada viva en Rouen el 30 de mayo de 1431 a los 19 años; rehabilitada formalmente en 1456 y canonizada por la Iglesia Católica en 1920.",
                "El movimiento sufragista del siglo XIX la adoptó como símbolo de la capacidad femenina para el liderazgo político y militar.",
                "Sigue siendo el símbolo más poderoso de resistencia femenina de la historia occidental, apropiado por tradiciones ideológicas opuestas durante seis siglos."
            ]
        },
        {
            period: "RENACIMIENTO (S. XV–XVII)",
            title: "Las Puellae Doctae",
            desc: "<ul><li>Mujeres humanistas que aplicaron el pensamiento renacentista a la igualdad de los sexos.</li><li>Marie de Gournay y la primera defensa filosófica explícita de la igualdad.</li></ul>",
            image: "src/linea/linea-141.jpg",
            region: "España, Italia, Francia, Países Bajos · Siglos XV–XVII",
            ideas: [
                "Beatriz Galindo ('La Latina') enseñó latín a la Reina Isabel I de Castilla, actuó como su secretaria personal e influyó en la política educativa del reino.",
                "Marie de Gournay publicó 'De l'Égalité des hommes et des femmes' (1622): la primera defensa filosófica explícita y argumentada de la igualdad entre los sexos.",
                "Teresa de Cartagena escribió 'Arboleda de los enfermos' (c. 1450): el primer texto en prosa en lengua española de autoría femenina documentada."
            ],
            impact: [
                "Beatriz Galindo fundó hospitales, conventos y escuelas en Madrid; el popular barrio de La Latina lleva su nombre hasta hoy.",
                "Marie de Gournay, editora y heredera intelectual de Montaigne, fue atacada ferozmente por los hombres que no toleraban su autoridad cultural.",
                "Las Puellae Doctae demostraron que la educación femenina era posible y beneficiosa, preparando el terreno filosófico para la Ilustración."
            ]
        },
        {
            period: "SIGLO XVII – NUEVA ESPAÑA",
            title: "Sor Juana Inés de la Cruz",
            desc: "<ul><li>'La Décima Musa': defensora del derecho femenino al conocimiento sin restricciones.</li><li>Crítica devastadora de la hipocresía moral masculina y la opresión conventual.</li></ul>",
            image: "src/linea/linea-151.jpeg",
            region: "San Miguel Nepantla, Nueva España (México) · 1648 – 1695",
            ideas: [
                "En 'Respuesta a Sor Filotea' (1691) argumentó sistemáticamente que el conocimiento no tiene género y no puede ser prohibido a las mujeres por razón de sexo.",
                "Sus 'Redondillas' ('Hombres necios que acusáis / a la mujer sin razón...') denuncian la doble moral patriarcal con una lógica y una elegancia absolutamente devastadoras.",
                "Entró al convento no por vocación religiosa, sino para poder estudiar: la clausura era la única 'universidad' a la que podía acceder una mujer en la Nueva España."
            ],
            impact: [
                "Escribió más de 900 poemas, 2 comedias, 2 autos sacramentales y extensos textos en prosa teológica y filosófica: la mayor obra literaria del Barroco hispanoamericano.",
                "Fue forzada por el obispo de Puebla a renunciar a sus libros, instrumentos científicos y escritos en 1694; murió un año después durante una epidemia.",
                "Su imagen aparece en el billete de 200 pesos mexicanos; es el referente fundacional del feminismo latinoamericano y de la literatura de América Latina."
            ]
        },
        {
            period: "PERSECUCIÓN SISTEMÁTICA (S. XV–XVII)",
            title: "La Caza de Brujas",
            desc: "<ul><li>Eliminación sistemática de mujeres sabias, sanadoras y comunidades femeninas autónomas.</li><li>El 'Malleus Maleficarum' como base ideológica del primer feminicidio masivo institucionalizado.</li></ul>",
            image: "src/linea/linea-161.webp",
            region: "Europa Central y Occidental: Alemania, Francia, Escocia, Suiza · 1450 – 1750",
            ideas: [
                "El 'Malleus Maleficarum' (1487) de Kramer y Sprenger codificó la misoginia como doctrina teológica e inquisitorial: 'toda brujería viene de la lujuria carnal de las mujeres'.",
                "El blanco prioritario fueron parteras, herboristas, curanderas y mujeres autónomas: se eliminó deliberadamente el conocimiento médico femenino tradicional.",
                "Silvia Federici demostró en 'Calibán y la Bruja' (2004) que fue una herramienta del capitalismo naciente para controlar los cuerpos y el trabajo de las mujeres."
            ],
            impact: [
                "Entre 40.000 y 100.000 personas fueron ejecutadas en Europa en dos siglos de terror institucionalizado; la gran mayoría eran mujeres.",
                "Destruyó redes de saber femenino, comunidades de mujeres laicas (beguinas) y la medicina tradicional que las sostenía durante siglos.",
                "El término 'bruja' ha sido resignificado por el feminismo contemporáneo como símbolo de resistencia, poder autónomo y sabiduría femenina recuperada."
            ]
        }
    ];

    // Coordenadas geográficas para el mapa vintage (lat, lng, zoom, lugar, fecha)
    const mapCoords = [
        { lat: 47.80, lng: 14.00, zoom: 5, place: "Europa Central y Oriente Próximo",    date: "40.000 – 3.000 a.C." },
        { lat: 30.96, lng: 46.10, zoom: 6, place: "Ur, Sumeria · actual Irak",            date: "c. 2285 – 2250 a.C." },
        { lat: 39.10, lng: 26.30, zoom: 7, place: "Mitilene, Lesbos · Grecia",            date: "c. 630 – 570 a.C." },
        { lat: 37.97, lng: 23.73, zoom: 7, place: "Atenas · Grecia",                      date: "c. 470 – 400 a.C." },
        { lat: 40.86, lng: 25.87, zoom: 6, place: "Maroneia, Tracia → Atenas",            date: "c. 346 – 300 a.C." },
        { lat: 31.77, lng: 35.23, zoom: 7, place: "Jerusalén · Palestina",                date: "Siglos I–III d.C." },
        { lat: 41.01, lng: 28.97, zoom: 7, place: "Constantinopla · actual Estambul",     date: "c. 805 – 865 d.C." },
        { lat: 40.68, lng: 14.76, zoom: 8, place: "Salerno · Italia del Sur",             date: "c. 1050 – 1100 d.C." },
        { lat: 49.97, lng:  7.90, zoom: 7, place: "Bingen am Rhein · Renania",            date: "1098 – 1179 d.C." },
        { lat: 43.83, lng:  4.36, zoom: 7, place: "Provenza · Francia",                   date: "Siglos XI–XIV" },
        { lat: 51.20, lng:  3.22, zoom: 7, place: "Brujas · Países Bajos",                date: "Siglos XII–XIV" },
        { lat: 48.86, lng:  2.35, zoom: 8, place: "París · Francia",                      date: "1364 – c. 1430" },
        { lat: 48.43, lng:  5.67, zoom: 8, place: "Domrémy-la-Pucelle · Lorena",          date: "1412 – 1431" },
        { lat: 39.86, lng: -4.02, zoom: 6, place: "Toledo · Corona de Castilla",          date: "Siglos XV–XVII" },
        { lat: 19.43, lng:-99.13, zoom: 6, place: "Ciudad de México · Nueva España",      date: "1648 – 1695" },
        { lat: 51.16, lng: 10.45, zoom: 5, place: "Europa Central y Occidental",          date: "1450 – 1750" }
    ];

    const timelineTrack = document.getElementById('timeline-track');

    // Inyectar nodos al DOM con estructura de carta interactiva
    timelineData.forEach((item, index) => {
        const isTop = index % 2 === 0;
        const node = document.createElement('div');
        node.className = `timeline-node ${isTop ? 'top' : 'bottom'}`;
        node.dataset.index = index;

        let imgHtml = '';
        if (item.image) {
            imgHtml = `<img src="${item.image}" alt="${item.title}" loading="lazy">`;
        }

        const ideasHtml = item.ideas.map(i => `<li>${i}</li>`).join('');
        const impactHtml = item.impact.map(i => `<li>${i}</li>`).join('');

        node.innerHTML = `
            <div class="node-content" role="button" tabindex="0" aria-label="Ver más sobre ${item.title}">
                <div class="card-front">
                    ${imgHtml}
                    <div class="node-period">${item.period}</div>
                    <h3 class="node-title">${item.title}</h3>
                    <div class="node-desc">${item.desc}</div>
                    <div class="flip-hint">
                        <span class="flip-dot"></span>
                        Descubrir más
                    </div>
                </div>
                <div class="card-back" aria-hidden="true">
                    <h3 class="back-title">${item.title}</h3>
                    <div class="back-section">
                        <div class="back-label">&#128205; Región &amp; Época</div>
                        <p class="back-text">${item.region}</p>
                    </div>
                    <div class="back-section">
                        <div class="back-label">&#128161; Ideas Principales</div>
                        <ul class="back-list">${ideasHtml}</ul>
                    </div>
                    <div class="back-section">
                        <div class="back-label">&#127775; Impacto Cultural</div>
                        <ul class="back-list">${impactHtml}</ul>
                    </div>
                    <div class="flip-back-hint">&#8592; Volver</div>
                </div>
            </div>
            <div class="node-point"></div>
        `;

        // Lógica de volteo de carta
        const nodeContent = node.querySelector('.node-content');
        const cardBack = node.querySelector('.card-back');

        nodeContent.addEventListener('click', function (e) {
            const isFlipped = this.classList.toggle('flipped');
            cardBack.setAttribute('aria-hidden', !isFlipped);
        });

        // Accesibilidad: activar con teclado
        nodeContent.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isFlipped = this.classList.toggle('flipped');
                cardBack.setAttribute('aria-hidden', !isFlipped);
            }
        });

        timelineTrack.appendChild(node);
    });

    /* =========================================
       3. MAPA VINTAGE INTERACTIVO
       ========================================= */
    const mapContainerEl   = document.getElementById('vintage-map-container');
    const mapLabelEl       = document.getElementById('map-location-label');
    const mapLabelPeriod   = document.querySelector('.map-label-period');
    const mapLabelPlace    = document.querySelector('.map-label-place');
    const mapLabelDate     = document.querySelector('.map-label-date');

    let vintageMap      = null;
    let vintageMarker   = null;
    let currentMapIdx   = -1;

    // Inicializar Leaflet solo si la librería está disponible
    if (typeof L !== 'undefined' && document.getElementById('vintage-map')) {
        vintageMap = L.map('vintage-map', {
            zoomControl:        false,
            attributionControl: false,   // Usaremos atribución personalizada
            dragging:           false,
            touchZoom:          false,
            doubleClickZoom:    false,
            scrollWheelZoom:    false,
            boxZoom:            false,
            keyboard:           false,
            tap:                false
        });

        // Tiles CartoDB Voyager — aspecto cartográfico cálido, sin API key
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 13
        }).addTo(vintageMap);

        // Vista inicial: Mar Mediterráneo
        vintageMap.setView([40.0, 18.0], 4);

        // Icono de marcador vintage personalizado
        const markerIcon = L.divIcon({
            className:  '',
            html:       '<div class="v-marker-outer"><div class="v-marker-inner"></div></div>',
            iconSize:   [30, 30],
            iconAnchor: [15, 15]
        });

        vintageMarker = L.marker([40.0, 18.0], { icon: markerIcon, interactive: false })
            .addTo(vintageMap);

        // Forzar recalculo del tamaño después de que el DOM esté estabilizado
        setTimeout(() => vintageMap.invalidateSize(), 400);
    }

    function updateMapLocation(index) {
        if (!vintageMap || currentMapIdx === index) return;
        currentMapIdx = index;

        const coord = mapCoords[index];
        if (!coord) return;

        // Mover marcador
        vintageMarker.setLatLng([coord.lat, coord.lng]);

        // Animar vuelo al nuevo lugar
        vintageMap.flyTo([coord.lat, coord.lng], coord.zoom, {
            duration: 1.9,
            easeLinearity: 0.22
        });

        // Actualizar etiqueta de ubicación con mini-fade
        if (mapLabelEl) {
            mapLabelEl.classList.add('label-updating');
            setTimeout(() => {
                mapLabelPeriod.textContent = timelineData[index].period;
                mapLabelPlace.textContent  = coord.place;
                mapLabelDate.textContent   = coord.date;
                mapLabelEl.classList.remove('label-updating');
                mapLabelEl.classList.add('label-visible');
            }, 260);
        }
    }

    /* =========================================
       4. LÓGICA DEL SCROLL HORIZONTAL
       ========================================= */
    const scrollProxy = document.getElementById('scroll-proxy');
    const horizontalWrapper = document.getElementById('horizontal-wrapper');
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const finalContent = document.querySelector('.final-content');
    const introSectionEl = document.getElementById('intro-section');
    const finalSectionEl = document.getElementById('final-section');

    function updateHeights() {
        horizontalWrapper.style.width = 'max-content';

        const scrollWidth = horizontalWrapper.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

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

        const width = timelineTrack.scrollWidth + window.innerWidth;

        const amplitude = 60;
        const period = window.innerWidth * 0.6;
        const centerY = 200;

        let d = `M 0 ${centerY} `;
        for (let x = 0; x < width; x += period) {
            d += `Q ${x + period / 4} ${centerY - amplitude}, ${x + period / 2} ${centerY} `;
            d += `T ${x + period} ${centerY} `;
        }

        pathBg.setAttribute('d', d);
        pathFg.setAttribute('d', d);
        maskPath.setAttribute('d', d);

        const length = maskPath.getTotalLength();
        maskPath.style.strokeDasharray = length;
        maskPath.style.strokeDashoffset = length;

        svg.style.width = `${width}px`;
    }

    window.addEventListener('resize', updateHeights);
    setTimeout(updateHeights, 200);

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const vw = window.innerWidth;

        horizontalWrapper.style.transform = `translateX(-${scrollY}px)`;

        // --- Revelar línea ondulada ---
        const maskPath = document.getElementById('mask-path');
        if (maskPath) {
            const length = maskPath.getTotalLength();
            let revealWidth = scrollY - vw + (vw * 0.8);
            if (revealWidth < 0) revealWidth = 0;
            const trackWidth = timelineTrack.scrollWidth;
            let ratio = revealWidth / trackWidth;
            if (ratio > 1) ratio = 1;
            maskPath.style.strokeDashoffset = length - (length * ratio);
        }

        // --- Calcular opacidad del mapa según qué sección está visible ---
        if (mapContainerEl && introSectionEl && finalSectionEl) {
            const introRight = introSectionEl.getBoundingClientRect().right;
            const finalLeft  = finalSectionEl.getBoundingClientRect().left;

            // Fade in a medida que la intro sale por la izquierda
            const fadeIn  = 1 - Math.max(0, Math.min(1, (introRight - vw * 0.15) / (vw * 0.75)));
            // Fade out a medida que el panel final entra por la derecha
            const fadeOut = Math.max(0, Math.min(1, (finalLeft - vw * 0.1) / (vw * 0.7)));

            const mapOpacity = Math.min(fadeIn, fadeOut);
            mapContainerEl.style.opacity = mapOpacity;

            // Activar/desactivar clase para la etiqueta de ubicación
            if (mapOpacity > 0.3) {
                mapContainerEl.classList.add('map-visible');
            } else {
                mapContainerEl.classList.remove('map-visible');
                if (mapLabelEl) mapLabelEl.classList.remove('label-visible');
            }
        }

        // --- Detectar la tarjeta más cercana al centro y actualizar el mapa ---
        let closestIdx  = -1;
        let closestDist = Infinity;

        timelineNodes.forEach((node) => {
            const rect = node.getBoundingClientRect();
            const nodeScreenX = rect.left + rect.width / 2;

            if (nodeScreenX < vw * 0.1) {
                node.classList.remove('in-view');
                node.classList.add('passed');
            } else if (nodeScreenX < vw * 0.9) {
                node.classList.add('in-view');
                node.classList.remove('passed');

                // Determinar cuál está más cerca del centro
                const dist = Math.abs(nodeScreenX - vw / 2);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIdx  = parseInt(node.dataset.index, 10);
                }
            } else {
                node.classList.remove('in-view');
                node.classList.remove('passed');
            }
        });

        // Actualizar mapa solo si hay una tarjeta en vista
        if (closestIdx >= 0) {
            updateMapLocation(closestIdx);
        }

        // --- Panel final ---
        if (finalContent) {
            const finalRect = finalContent.getBoundingClientRect();
            if (finalRect.left < vw * 0.8) {
                finalContent.classList.add('in-view');
                startFinalPhrases();
            } else {
                finalContent.classList.remove('in-view');
            }
        }
    });

    /* =========================================
       5. LÓGICA DE FRASES DINÁMICAS (FINAL)
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

        quoteElement.classList.remove('phrase-visible');
        contextElement.classList.remove('phrase-visible');
        quoteElement.classList.add('phrase-hidden');
        contextElement.classList.add('phrase-hidden');

        setTimeout(() => {
            quoteElement.textContent = quote;
            contextElement.textContent = context || "";

            quoteElement.classList.remove('phrase-hidden');
            contextElement.classList.remove('phrase-hidden');
            quoteElement.classList.add('phrase-visible');
            contextElement.classList.add('phrase-visible');

            currentPhraseIndex = (currentPhraseIndex + 1) % finalPhrases.length;
        }, 1500);
    }

    function startFinalPhrases() {
        if (phraseInterval) return;
        updatePhrase();
        phraseInterval = setInterval(updatePhrase, 7000);
    }

});
