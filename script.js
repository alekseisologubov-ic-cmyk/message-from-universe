/* =========================================================
   UNIVERSE139 — MESSAGE FROM THE UNIVERSE
   Hurricane / Wind transition version
   ========================================================= */


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

    en: {
        title: "MESSAGE FROM THE UNIVERSE",
        subtitle: "Choose your language and receive your message",
        reveal: "RECEIVE MY MESSAGE",
        loading: "THE UNIVERSE IS LISTENING...",
        another: "RECEIVE ANOTHER MESSAGE",
        today: "YOUR MESSAGE FOR TODAY",
        share: "SHARE YOUR MESSAGE",
        copied: "MESSAGE COPIED ✨",
        wind: "THE WIND IS CARRYING YOUR MESSAGE...",
        connection: "STAY CONNECTED..."
    },

    es: {
        title: "MENSAJE DEL UNIVERSO",
        subtitle: "Elige tu idioma y recibe tu mensaje",
        reveal: "RECIBIR MI MENSAJE",
        loading: "EL UNIVERSO ESTÁ ESCUCHANDO...",
        another: "RECIBIR OTRO MENSAJE",
        today: "TU MENSAJE DE HOY",
        share: "COMPARTIR TU MENSAJE",
        copied: "MENSAJE COPIADO ✨",
        wind: "EL VIENTO ESTÁ LLEVANDO TU MENSAJE...",
        connection: "MANTENTE CONECTADO..."
    },

    zh: {
        title: "来自宇宙的信息",
        subtitle: "选择你的语言，接收属于你的信息",
        reveal: "接收我的信息",
        loading: "宇宙正在倾听...",
        another: "接收另一条信息",
        today: "你今天的信息",
        share: "分享你的信息",
        copied: "信息已复制 ✨",
        wind: "风正在带来你的信息...",
        connection: "保持连接..."
    },

    ru: {
        title: "ПОСЛАНИЕ ОТ ВСЕЛЕННОЙ",
        subtitle: "Выберите язык и получите своё послание",
        reveal: "ПОЛУЧИТЬ МОЁ ПОСЛАНИЕ",
        loading: "ВСЕЛЕННАЯ СЛУШАЕТ...",
        another: "ПОЛУЧИТЬ ЕЩЁ ОДНО ПОСЛАНИЕ",
        today: "ВАШЕ ПОСЛАНИЕ НА СЕГОДНЯ",
        share: "ПОДЕЛИТЬСЯ ПОСЛАНИЕМ",
        copied: "ПОСЛАНИЕ СКОПИРОВАНО ✨",
        wind: "ВЕТЕР НЕСЁТ ВАМ НОВОЕ ПОСЛАНИЕ...",
        connection: "ОСТАВАЙТЕСЬ НА СВЯЗИ..."
    },

    hi: {
        title: "ब्रह्मांड का संदेश",
        subtitle: "अपनी भाषा चुनें और अपना संदेश प्राप्त करें",
        reveal: "मेरा संदेश प्राप्त करें",
        loading: "ब्रह्मांड सुन रहा है...",
        another: "एक और संदेश प्राप्त करें",
        today: "आज आपका संदेश",
        share: "अपना संदेश साझा करें",
        copied: "संदेश कॉपी हो गया ✨",
        wind: "हवा आपका नया संदेश लेकर आ रही है...",
        connection: "जुड़े रहें..."
    },

    th: {
        title: "ข้อความจากจักรวาล",
        subtitle: "เลือกภาษาและรับข้อความของคุณ",
        reveal: "รับข้อความของฉัน",
        loading: "จักรวาลกำลังรับฟัง...",
        another: "รับข้อความอีกครั้ง",
        today: "ข้อความของคุณสำหรับวันนี้",
        share: "แชร์ข้อความของคุณ",
        copied: "คัดลอกข้อความแล้ว ✨",
        wind: "สายลมกำลังนำข้อความใหม่มาหาคุณ...",
        connection: "เชื่อมต่อกับจักรวาล..."
    }
};


/* =========================================================
   MESSAGE TEMPLATES
   ========================================================= */

const messageTemplates = {

    en: [
        "Something you have been waiting for is moving closer to you.",
        "The answer you seek may arrive when you stop forcing it.",
        "Trust the feeling that keeps returning to your heart.",
        "A new opportunity is approaching from an unexpected direction.",
        "What feels like a delay may actually be protection.",
        "Your energy is changing, and your reality is beginning to follow.",
        "Someone is thinking about you more than you realize.",
        "A chapter of your life is closing so another can begin.",
        "You are closer to your breakthrough than you think.",
        "Do not ignore the small sign that appears today.",
        "Your patience is about to be rewarded.",
        "Let go of what no longer matches the person you are becoming.",
        "The universe is creating space for something better.",
        "A financial opportunity may appear when you least expect it.",
        "Your intuition already knows the answer.",
        "The right people are slowly finding their way into your life.",
        "Something unexpected may bring you exactly what you need.",
        "Your next step does not need to be perfect — only honest.",
        "Believe that life can change faster than you imagine.",
        "A powerful new beginning is forming around you."
    ],

    es: [
        "Algo que has estado esperando se está acercando a ti.",
        "La respuesta que buscas puede llegar cuando dejes de forzarla.",
        "Confía en ese sentimiento que vuelve una y otra vez a tu corazón.",
        "Una nueva oportunidad se acerca desde una dirección inesperada.",
        "Lo que parece un retraso puede ser en realidad protección.",
        "Tu energía está cambiando y tu realidad comienza a seguirla.",
        "Alguien está pensando en ti más de lo que imaginas.",
        "Un capítulo de tu vida está terminando para que otro pueda comenzar.",
        "Estás más cerca de tu gran avance de lo que crees.",
        "No ignores la pequeña señal que aparezca hoy.",
        "Tu paciencia está a punto de ser recompensada.",
        "Deja ir aquello que ya no coincide con la persona en la que te estás convirtiendo.",
        "El universo está creando espacio para algo mejor.",
        "Una oportunidad financiera puede aparecer cuando menos lo esperes.",
        "Tu intuición ya conoce la respuesta.",
        "Las personas correctas están encontrando lentamente el camino hacia tu vida.",
        "Algo inesperado puede darte exactamente lo que necesitas.",
        "Tu próximo paso no tiene que ser perfecto, solo sincero.",
        "Cree que la vida puede cambiar más rápido de lo que imaginas.",
        "Un nuevo comienzo poderoso se está formando a tu alrededor."
    ],

    zh: [
        "你一直等待的事情正在慢慢靠近你。",
        "当你不再强求时，你寻找的答案可能会出现。",
        "相信那个一次又一次回到你心中的感觉。",
        "一个新的机会正从意想不到的方向靠近。",
        "看似延迟的事情，也许其实是在保护你。",
        "你的能量正在改变，你的现实也开始随之改变。",
        "有人比你想象中更加想念你。",
        "你生命中的一个篇章正在结束，新的篇章即将开始。",
        "你比自己想象的更接近突破。",
        "不要忽视今天出现的小小信号。",
        "你的耐心即将得到回报。",
        "放下那些已经不再适合现在的你的事物。",
        "宇宙正在为更好的事情创造空间。",
        "一个意想不到的财务机会可能即将出现。",
        "你的直觉已经知道答案。",
        "正确的人正在慢慢走进你的生命。",
        "意想不到的事情可能会带给你真正需要的东西。",
        "你的下一步不需要完美，只需要真实。",
        "相信生活可以比你想象中改变得更快。",
        "一个强大的全新开始正在你的身边形成。"
    ],

    ru: [
        "То, чего вы давно ждёте, уже движется к вам.",
        "Ответ, который вы ищете, может прийти, когда вы перестанете его искать.",
        "Доверьтесь чувству, которое снова и снова возвращается в ваше сердце.",
        "Новая возможность приближается с неожиданной стороны.",
        "То, что кажется задержкой, на самом деле может быть защитой.",
        "Ваша энергия меняется, и ваша реальность начинает меняться вместе с ней.",
        "Кто-то думает о вас гораздо больше, чем вы представляете.",
        "Одна глава вашей жизни заканчивается, чтобы началась новая.",
        "Вы ближе к своему прорыву, чем думаете.",
        "Не игнорируйте маленький знак, который появится сегодня.",
        "Ваше терпение скоро будет вознаграждено.",
        "Отпустите то, что больше не соответствует человеку, которым вы становитесь.",
        "Вселенная создаёт пространство для чего-то лучшего.",
        "Финансовая возможность может появиться тогда, когда вы меньше всего её ожидаете.",
        "Ваша интуиция уже знает ответ.",
        "Правильные люди постепенно находят путь в вашу жизнь.",
        "Что-то неожиданное может принести вам именно то, что вам нужно.",
        "Ваш следующий шаг не должен быть идеальным — он должен быть искренним.",
        "Поверьте, жизнь может измениться быстрее, чем вы думаете.",
        "Мощное новое начало уже формируется вокруг вас."
    ],

    hi: [
        "जिस चीज़ का आप इंतज़ार कर रहे हैं, वह आपकी ओर बढ़ रही है।",
        "जिस उत्तर की आपको तलाश है, वह तब आ सकता है जब आप उसे मजबूर करना छोड़ दें।",
        "उस भावना पर भरोसा करें जो बार-बार आपके दिल में लौटती है।",
        "एक नया अवसर अप्रत्याशित दिशा से आपकी ओर आ रहा है।",
        "जो देरी लग रही है, वह वास्तव में आपकी सुरक्षा हो सकती है।",
        "आपकी ऊर्जा बदल रही है और आपकी वास्तविकता भी उसके साथ बदल रही है।",
        "कोई आपके बारे में आपकी कल्पना से अधिक सोच रहा है।",
        "आपके जीवन का एक अध्याय समाप्त हो रहा है ताकि नया अध्याय शुरू हो सके।",
        "आप अपनी सफलता के बहुत करीब हैं।",
        "आज दिखाई देने वाले छोटे संकेत को नज़रअंदाज़ न करें।",
        "आपका धैर्य जल्द ही फल देने वाला है।",
        "जो आपकी नई पहचान से मेल नहीं खाता उसे जाने दें।",
        "ब्रह्मांड किसी बेहतर चीज़ के लिए जगह बना रहा है।",
        "एक आर्थिक अवसर अप्रत्याशित समय पर आपके सामने आ सकता है।",
        "आपका अंतर्ज्ञान पहले से ही उत्तर जानता है।",
        "सही लोग धीरे-धीरे आपके जीवन में आ रहे हैं।",
        "कुछ अप्रत्याशित आपको वही दे सकता है जिसकी आपको आवश्यकता है।",
        "आपका अगला कदम पूर्ण नहीं, केवल सच्चा होना चाहिए।",
        "विश्वास रखें कि जीवन आपकी कल्पना से भी तेज़ बदल सकता है।",
        "एक शक्तिशाली नई शुरुआत आपके आसपास बन रही है।"
    ],

    th: [
        "สิ่งที่คุณรอคอยกำลังค่อย ๆ เข้ามาหาคุณ",
        "คำตอบที่คุณกำลังค้นหาอาจมาถึงเมื่อคุณหยุดบังคับมัน",
        "เชื่อในความรู้สึกที่กลับมาอยู่ในหัวใจของคุณครั้งแล้วครั้งเล่า",
        "โอกาสใหม่กำลังเข้ามาจากทิศทางที่คุณคาดไม่ถึง",
        "สิ่งที่ดูเหมือนความล่าช้าอาจกำลังปกป้องคุณ",
        "พลังงานของคุณกำลังเปลี่ยนแปลง และความเป็นจริงของคุณกำลังเปลี่ยนตาม",
        "มีใครบางคนกำลังคิดถึงคุณมากกว่าที่คุณรู้",
        "บทหนึ่งในชีวิตกำลังจบลงเพื่อเปิดทางให้บทใหม่",
        "คุณอยู่ใกล้กับการเปลี่ยนแปลงครั้งสำคัญมากกว่าที่คิด",
        "อย่ามองข้ามสัญญาณเล็ก ๆ ที่เกิดขึ้นในวันนี้",
        "ความอดทนของคุณกำลังจะได้รับรางวัล",
        "ปล่อยสิ่งที่ไม่สอดคล้องกับตัวตนใหม่ของคุณ",
        "จักรวาลกำลังสร้างพื้นที่สำหรับสิ่งที่ดีกว่า",
        "โอกาสทางการเงินอาจปรากฏขึ้นในเวลาที่คุณคาดไม่ถึง",
        "สัญชาตญาณของคุณรู้คำตอบอยู่แล้ว",
        "ผู้คนที่ใช่กำลังค่อย ๆ เดินเข้ามาในชีวิตของคุณ",
        "บางสิ่งที่ไม่คาดคิดอาจนำสิ่งที่คุณต้องการมาให้",
        "ก้าวต่อไปของคุณไม่จำเป็นต้องสมบูรณ์แบบ เพียงแค่จริงใจก็พอ",
        "เชื่อว่าชีวิตสามารถเปลี่ยนแปลงเร็วกว่าที่คุณคิด",
        "การเริ่มต้นครั้งใหม่ที่ทรงพลังกำลังก่อตัวขึ้นรอบตัวคุณ"
    ]
};


/* =========================================================
   MESSAGE VARIATIONS
   ========================================================= */

const messageVariations = {

    en: [
        "The universe is aligning the right moment.",
        "Stay open to what is coming.",
        "Your path is changing in your favor.",
        "Listen to your intuition.",
        "Something beautiful is unfolding.",
        "Do not rush the process.",
        "Your energy is attracting new possibilities.",
        "Trust the timing.",
        "The sign will become clear soon.",
        "Keep moving forward.",
        "Your story is not finished yet.",
        "A new door is opening.",
        "You are being guided.",
        "Let life surprise you.",
        "Your next chapter is beginning.",
        "Everything is moving behind the scenes.",
        "Stay patient and present.",
        "Your moment is approaching.",
        "Believe in what you cannot yet see.",
        "The universe has not forgotten you."
    ],

    es: [
        "El universo está alineando el momento correcto.",
        "Mantente abierto a lo que viene.",
        "Tu camino está cambiando a tu favor.",
        "Escucha tu intuición.",
        "Algo hermoso está sucediendo.",
        "No apresures el proceso.",
        "Tu energía está atrayendo nuevas posibilidades.",
        "Confía en el momento perfecto.",
        "La señal pronto será clara.",
        "Sigue avanzando.",
        "Tu historia todavía no ha terminado.",
        "Una nueva puerta se está abriendo.",
        "Estás siendo guiado.",
        "Deja que la vida te sorprenda.",
        "Tu próximo capítulo está comenzando.",
        "Todo se está moviendo detrás de escena.",
        "Mantente paciente y presente.",
        "Tu momento se está acercando.",
        "Cree en lo que todavía no puedes ver.",
        "El universo no te ha olvidado."
    ],

    zh: [
        "宇宙正在安排正确的时机。",
        "对即将发生的一切保持开放。",
        "你的道路正在向有利于你的方向改变。",
        "倾听你的直觉。",
        "美好的事情正在发生。",
        "不要急于求成。",
        "你的能量正在吸引新的可能。",
        "相信时机。",
        "答案很快会变得清晰。",
        "继续向前。",
        "你的故事还没有结束。",
        "一扇新的门正在打开。",
        "你正在被指引。",
        "让生活给你惊喜。",
        "你的新篇章正在开始。",
        "一切都在幕后发生变化。",
        "保持耐心并活在当下。",
        "属于你的时刻正在靠近。",
        "相信那些你暂时还看不到的东西。",
        "宇宙从未忘记你。"
    ],

    ru: [
        "Вселенная выстраивает правильный момент.",
        "Будьте открыты тому, что приближается.",
        "Ваш путь меняется в вашу пользу.",
        "Слушайте свою интуицию.",
        "Что-то прекрасное уже происходит.",
        "Не торопите события.",
        "Ваша энергия притягивает новые возможности.",
        "Доверьтесь времени.",
        "Скоро знак станет очевидным.",
        "Продолжайте двигаться вперёд.",
        "Ваша история ещё не закончена.",
        "Новая дверь открывается.",
        "Вас направляют.",
        "Позвольте жизни удивить вас.",
        "Ваша следующая глава начинается.",
        "Всё меняется за кулисами.",
        "Сохраняйте терпение и присутствие.",
        "Ваш момент приближается.",
        "Верьте в то, чего пока не видите.",
        "Вселенная не забыла о вас."
    ],

    hi: [
        "ब्रह्मांड सही समय को तैयार कर रहा है।",
        "जो आने वाला है उसके लिए खुले रहें।",
        "आपका रास्ता आपके पक्ष में बदल रहा है।",
        "अपने अंतर्ज्ञान की सुनें।",
        "कुछ सुंदर घटित हो रहा है।",
        "प्रक्रिया में जल्दबाज़ी न करें।",
        "आपकी ऊर्जा नई संभावनाओं को आकर्षित कर रही है।",
        "समय पर भरोसा रखें।",
        "संकेत जल्द ही स्पष्ट हो जाएगा।",
        "आगे बढ़ते रहें।",
        "आपकी कहानी अभी समाप्त नहीं हुई है।",
        "एक नया दरवाज़ा खुल रहा है।",
        "आपका मार्गदर्शन किया जा रहा है।",
        "जीवन को आपको आश्चर्यचकित करने दें।",
        "आपका अगला अध्याय शुरू हो रहा है।",
        "पर्दे के पीछे सब कुछ बदल रहा है।",
        "धैर्य रखें और वर्तमान में रहें।",
        "आपका समय करीब आ रहा है।",
        "जिसे अभी नहीं देख सकते उस पर विश्वास रखें।",
        "ब्रह्मांड आपको नहीं भूला है।"
    ],

    th: [
        "จักรวาลกำลังจัดเตรียมช่วงเวลาที่เหมาะสม",
        "เปิดใจรับสิ่งที่กำลังจะเข้ามา",
        "เส้นทางของคุณกำลังเปลี่ยนไปในทางที่ดี",
        "ฟังเสียงจากสัญชาตญาณของคุณ",
        "สิ่งสวยงามกำลังเกิดขึ้น",
        "อย่าเร่งกระบวนการ",
        "พลังงานของคุณกำลังดึงดูดความเป็นไปได้ใหม่ ๆ",
        "เชื่อในจังหวะของเวลา",
        "สัญญาณจะชัดเจนในไม่ช้า",
        "เดินหน้าต่อไป",
        "เรื่องราวของคุณยังไม่จบ",
        "ประตูบานใหม่กำลังเปิด",
        "คุณกำลังได้รับการนำทาง",
        "ปล่อยให้ชีวิตสร้างความประหลาดใจให้คุณ",
        "บทใหม่ของคุณกำลังเริ่มต้น",
        "ทุกอย่างกำลังเคลื่อนไหวอยู่เบื้องหลัง",
        "อดทนและอยู่กับปัจจุบัน",
        "ช่วงเวลาของคุณกำลังใกล้เข้ามา",
        "เชื่อในสิ่งที่คุณยังมองไม่เห็น",
        "จักรวาลไม่ได้ลืมคุณ"
    ]
};


/* =========================================================
   STATE
   ========================================================= */

let currentLanguage = "en";
let lastMessage = "";
let revealTimer = null;
let windTimer = null;


/* =========================================================
   DOM
   ========================================================= */

const languageBox = document.getElementById("languageBox");
const revealBtn = document.getElementById("revealBtn");
const loading = document.getElementById("loading");
const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("message");
const monthText = document.getElementById("month");

const title = document.querySelector("h1");
const subtitle = document.querySelector(".subtitle");

const languageButtons = document.querySelectorAll(".languageBtn");


/* =========================================================
   CREATE HURRICANE ELEMENTS
   ========================================================= */

function createWindEffect() {

    let existing = document.getElementById("universeWind");

    if (existing) {
        existing.remove();
    }

    const wind = document.createElement("div");
    wind.id = "universeWind";
    wind.className = "universeWind";

    wind.innerHTML = `
        <div class="windGlow"></div>

        <div class="hurricaneCore">
            <div class="hurricaneRing ring1"></div>
            <div class="hurricaneRing ring2"></div>
            <div class="hurricaneRing ring3"></div>
            <div class="hurricaneEye"></div>
        </div>

        <div class="windLines"></div>

        <div class="windMessage">
            <div class="windSymbol">🌪</div>
            <div class="windMain"></div>
            <div class="windSub"></div>
        </div>
    `;

    document.body.appendChild(wind);

    const lines = wind.querySelector(".windLines");

    // Create wind particles
    for (let i = 0; i < 80; i++) {

        const line = document.createElement("span");

        line.className = "windLine";

        const length = 40 + Math.random() * 180;
        const top = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const duration = 0.5 + Math.random() * 1.2;

        line.style.width = `${length}px`;
        line.style.top = `${top}%`;
        line.style.left = `${-250 + Math.random() * 100}%`;
        line.style.animationDelay = `${delay}s`;
        line.style.animationDuration = `${duration}s`;

        lines.appendChild(line);
    }

    return wind;
}


/* =========================================================
   HURRICANE CSS
   ========================================================= */

function addWindStyles() {

    if (document.getElementById("universeWindStyles")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "universeWindStyles";

    style.textContent = `

        /* ==========================================
           HURRICANE OVERLAY
           ========================================== */

        .universeWind {

            position: fixed;
            inset: 0;

            z-index: 9999;

            overflow: hidden;

            pointer-events: none;

            opacity: 0;

            background:
                radial-gradient(
                    circle at center,
                    rgba(100, 60, 180, 0.18),
                    rgba(0, 0, 0, 0.94) 75%
                );

            backdrop-filter: blur(2px);

            animation: windAppear 0.45s ease forwards;

        }


        .universeWind::before {

            content: "";

            position: absolute;

            inset: -50%;

            background:
                repeating-radial-gradient(
                    ellipse at center,
                    transparent 0px,
                    transparent 35px,
                    rgba(160, 130, 255, 0.06) 37px,
                    transparent 42px
                );

            animation: giantWindSpin 2.4s linear infinite;

        }


        /* ==========================================
           CENTER GLOW
           ========================================== */

        .windGlow {

            position: absolute;

            width: 500px;
            height: 500px;

            left: 50%;
            top: 50%;

            transform: translate(-50%, -50%);

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    rgba(190, 160, 255, 0.16) 0%,
                    rgba(100, 60, 180, 0.08) 35%,
                    transparent 70%
                );

            filter: blur(10px);

            animation: glowPulse 0.8s ease-in-out infinite alternate;

        }


        /* ==========================================
           HURRICANE
           ========================================== */

        .hurricaneCore {

            position: absolute;

            width: 420px;
            height: 420px;

            left: 50%;
            top: 50%;

            transform: translate(-50%, -50%);

            border-radius: 50%;

            animation: hurricaneRotate 1.5s linear infinite;

        }


        .hurricaneRing {

            position: absolute;

            left: 50%;
            top: 50%;

            border-radius: 50%;

            border-style: solid;

            transform: translate(-50%, -50%) rotate(0deg);

            filter: blur(1px);

        }


        .ring1 {

            width: 130px;
            height: 130px;

            border-width: 2px;

            border-color:
                rgba(255,255,255,0.15)
                transparent
                rgba(190,150,255,0.65)
                transparent;

            animation: ringSpin 1.2s linear infinite;

        }


        .ring2 {

            width: 250px;
            height: 250px;

            border-width: 3px;

            border-color:
                transparent
                rgba(170,130,255,0.55)
                transparent
                rgba(255,255,255,0.15);

            animation: ringSpinReverse 1.7s linear infinite;

        }


        .ring3 {

            width: 390px;
            height: 390px;

            border-width: 2px;

            border-color:
                rgba(255,255,255,0.10)
                transparent
                rgba(150,100,255,0.40)
                transparent;

            animation: ringSpin 2.2s linear infinite;

        }


        .hurricaneEye {

            position: absolute;

            width: 44px;
            height: 44px;

            left: 50%;
            top: 50%;

            transform: translate(-50%, -50%);

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,0.8),
                    rgba(160,120,255,0.35) 35%,
                    transparent 70%
                );

            box-shadow:
                0 0 25px rgba(190,160,255,0.7),
                0 0 70px rgba(120,80,220,0.5);

            animation: eyePulse 0.8s ease-in-out infinite alternate;

        }


        /* ==========================================
           WIND LINES
           ========================================== */

        .windLines {

            position: absolute;

            inset: 0;

            overflow: hidden;

        }


        .windLine {

            position: absolute;

            height: 1px;

            border-radius: 100%;

            background:
                linear-gradient(
                    90deg,
                    transparent,
                    rgba(255,255,255,0.75),
                    rgba(180,140,255,0.45),
                    transparent
                );

            filter: blur(0.5px);

            opacity: 0;

            animation-name: windFly;

            animation-timing-function: linear;

            animation-iteration-count: infinite;

        }


        /* ==========================================
           MESSAGE
           ========================================== */

        .windMessage {

            position: absolute;

            left: 50%;
            top: 50%;

            transform: translate(-50%, -50%);

            width: min(90%, 600px);

            text-align: center;

            z-index: 20;

            opacity: 0;

            animation: windText 0.7s ease 0.35s forwards;

        }


        .windSymbol {

            font-size: 52px;

            margin-bottom: 18px;

            filter:
                drop-shadow(
                    0 0 20px rgba(180,140,255,0.7)
                );

            animation: symbolSpin 2s linear infinite;

        }


        .windMain {

            font-size: clamp(18px, 4vw, 30px);

            font-weight: 700;

            letter-spacing: 3px;

            line-height: 1.4;

            color: white;

            text-shadow:
                0 0 15px rgba(190,160,255,0.8),
                0 0 35px rgba(130,90,255,0.5);

        }


        .windSub {

            margin-top: 15px;

            font-size: 12px;

            letter-spacing: 4px;

            opacity: 0.65;

            color: white;

        }


        /* ==========================================
           BACKGROUND SPEED
           ========================================== */

        body.universe-wind .stars {

            animation-duration: 0.7s !important;

            transform: scale(1.15);

            transition: transform 0.7s ease;

        }


        body.universe-wind .container {

            filter: blur(3px);

            transform: scale(0.97);

            transition:
                filter 0.4s ease,
                transform 0.4s ease;

        }


        /* ==========================================
           ANIMATIONS
           ========================================== */

        @keyframes windAppear {

            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }

        }


        @keyframes giantWindSpin {

            from {
                transform: rotate(0deg) scale(1);
            }

            to {
                transform: rotate(360deg) scale(1.08);
            }

        }


        @keyframes hurricaneRotate {

            from {
                transform:
                    translate(-50%, -50%)
                    rotate(0deg);
            }

            to {
                transform:
                    translate(-50%, -50%)
                    rotate(360deg);
            }

        }


        @keyframes ringSpin {

            from {
                transform:
                    translate(-50%, -50%)
                    rotate(0deg)
                    scale(1);
            }

            to {
                transform:
                    translate(-50%, -50%)
                    rotate(360deg)
                    scale(1.05);
            }

        }


        @keyframes ringSpinReverse {

            from {
                transform:
                    translate(-50%, -50%)
                    rotate(360deg)
                    scale(1);
            }

            to {
                transform:
                    translate(-50%, -50%)
                    rotate(0deg)
                    scale(1.08);
            }

        }


        @keyframes eyePulse {

            from {
                transform:
                    translate(-50%, -50%)
                    scale(0.8);
            }

            to {
                transform:
                    translate(-50%, -50%)
                    scale(1.15);
            }

        }


        @keyframes glowPulse {

            from {
                transform:
                    translate(-50%, -50%)
                    scale(0.85);
                opacity: 0.5;
            }

            to {
                transform:
                    translate(-50%, -50%)
                    scale(1.2);
                opacity: 1;
            }

        }


        @keyframes symbolSpin {

            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }

        }


        @keyframes windText {

            from {
                opacity: 0;
                transform:
                    translate(-50%, -50%)
                    scale(0.8);
            }

            to {
                opacity: 1;
                transform:
                    translate(-50%, -50%)
                    scale(1);
            }

        }


        @keyframes windFly {

            0% {

                opacity: 0;

                transform:
                    translateX(-300px)
                    translateY(0)
                    rotate(0deg);

            }

            15% {

                opacity: 0.8;

            }

            50% {

                opacity: 1;

                transform:
                    translateX(50vw)
                    translateY(-30px)
                    rotate(-8deg);

            }

            100% {

                opacity: 0;

                transform:
                    translateX(130vw)
                    translateY(60px)
                    rotate(5deg);

            }

        }


        /* ==========================================
           MOBILE
           ========================================== */

        @media (max-width: 600px) {

            .hurricaneCore {

                width: 280px;
                height: 280px;

            }

            .ring1 {

                width: 90px;
                height: 90px;

            }

            .ring2 {

                width: 175px;
                height: 175px;

            }

            .ring3 {

                width: 270px;
                height: 270px;

            }

            .windGlow {

                width: 350px;
                height: 350px;

            }

            .windMain {

                padding: 0 20px;

                letter-spacing: 2px;

            }

        }


        @media (prefers-reduced-motion: reduce) {

            .universeWind *,
            .universeWind::before {

                animation-duration: 2s !important;

            }

        }

    `;

    document.head.appendChild(style);
}

addWindStyles();


/* =========================================================
   GENERATE 500 UNIQUE MESSAGES
   ========================================================= */

const generatedMessages = {};

Object.keys(messageTemplates).forEach(language => {

    const base = messageTemplates[language];
    const variations = messageVariations[language];

    const messages = new Set();

    // Base messages
    base.forEach(message => {
        messages.add(message);
    });

    // Base + variation
    for (let i = 0; i < base.length; i++) {

        for (let j = 0; j < variations.length; j++) {

            messages.add(
                `${base[i]} ${variations[j]}`
            );

        }

    }

    // Additional combinations until exactly 500
    outerLoop:

    for (let i = 0; i < base.length; i++) {

        for (let j = 0; j < variations.length; j++) {

            for (let k = 0; k < variations.length; k++) {

                if (messages.size >= 500) {
                    break outerLoop;
                }

                messages.add(
                    `${base[i]} ${variations[j]} ${variations[k]}`
                );

            }

        }

    }

    generatedMessages[language] = Array.from(messages).slice(0, 500);

});


/* =========================================================
   LANGUAGE
   ========================================================= */

function selectLanguage(language) {

    currentLanguage = language;

    const t = translations[language];

    // Update interface
    if (title) {
        title.textContent = t.title;
    }

    if (subtitle) {
        subtitle.textContent = t.subtitle;
    }

    if (revealBtn) {
        revealBtn.textContent = t.reveal;
    }

    if (monthText) {
        monthText.textContent = t.today;
    }

    // Hide languages
    if (languageBox) {
        languageBox.style.display = "none";
    }

    // Show receive button
    if (revealBtn) {
        revealBtn.style.display = "inline-block";
    }

    // Small pause before first message
    clearTimeout(revealTimer);

    revealTimer = setTimeout(() => {

        revealMessage(false);

    }, 500);
}


/* =========================================================
   RANDOM MESSAGE
   ========================================================= */

function getRandomMessage() {

    const messages = generatedMessages[currentLanguage];

    if (!messages || messages.length === 0) {
        return "";
    }

    let message;

    do {

        const index =
            Math.floor(
                Math.random() * messages.length
            );

        message = messages[index];

    } while (
        messages.length > 1 &&
        message === lastMessage
    );

    lastMessage = message;

    return message;
}


/* =========================================================
   NORMAL MESSAGE REVEAL
   ========================================================= */

function revealMessage(useWind = false) {

    clearTimeout(revealTimer);

    if (useWind) {

        hurricaneTransition();

        return;

    }

    const t = translations[currentLanguage];

    if (messageBox) {
        messageBox.style.display = "none";
        messageBox.style.opacity = "0";
    }

    if (loading) {

        loading.textContent = t.loading;

        loading.style.display = "block";

    }

    revealTimer = setTimeout(() => {

        const newMessage = getRandomMessage();

        if (messageText) {
            messageText.textContent = newMessage;
        }

        if (loading) {
            loading.style.display = "none";
        }

        if (messageBox) {

            messageBox.style.display = "block";

            requestAnimationFrame(() => {

                messageBox.style.opacity = "1";

            });

        }

    }, 1800);

}


/* =========================================================
   HURRICANE TRANSITION
   ========================================================= */

function hurricaneTransition() {

    clearTimeout(revealTimer);
    clearTimeout(windTimer);

    const t = translations[currentLanguage];

    // Hide current message
    if (messageBox) {

        messageBox.style.opacity = "0";

        setTimeout(() => {

            messageBox.style.display = "none";

        }, 250);

    }

    // Hide button during storm
    if (revealBtn) {

        revealBtn.disabled = true;

        revealBtn.style.opacity = "0";

    }

    // Universe enters wind mode
    document.body.classList.add("universe-wind");

    // Create storm
    const wind = createWindEffect();

    const windMain = wind.querySelector(".windMain");
    const windSub = wind.querySelector(".windSub");

    windMain.textContent = t.wind;
    windSub.textContent = t.connection;

    /*
        The storm lasts approximately 2.8 seconds.
        The message is then revealed.
    */

    windTimer = setTimeout(() => {

        // Fade hurricane away
        wind.style.transition = "opacity 0.7s ease";
        wind.style.opacity = "0";

        // Remove wind mode
        document.body.classList.remove("universe-wind");

        // Reveal new message
        setTimeout(() => {

            wind.remove();

            const newMessage = getRandomMessage();

            if (messageText) {
                messageText.textContent = newMessage;
            }

            if (messageBox) {

                messageBox.style.display = "block";

                requestAnimationFrame(() => {

                    messageBox.style.opacity = "1";

                });

            }

            if (revealBtn) {

                revealBtn.disabled = false;

                revealBtn.style.opacity = "1";

                revealBtn.textContent = t.another;

            }

        }, 650);

    }, 2800);

}


/* =========================================================
   LANGUAGE BUTTONS
   ========================================================= */

languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        const language =
            button.dataset.language;

        if (language) {
            selectLanguage(language);
        }

    });

});


/* =========================================================
   RECEIVE MESSAGE BUTTON
   ========================================================= */

if (revealBtn) {

    revealBtn.addEventListener("click", () => {

        /*
            First click:
            Normal reveal.

            Later clicks:
            Hurricane / wind transition.
        */

        if (messageBox &&
            messageBox.style.display === "block") {

            revealMessage(true);

        } else {

            revealMessage(false);

        }

    });

}


/* =========================================================
   SHARE BUTTON
   ========================================================= */

const shareBtn =
    document.getElementById("shareBtn");

if (shareBtn) {

    shareBtn.addEventListener("click", async () => {

        const t = translations[currentLanguage];

        const text =
            messageText
                ? messageText.textContent
                : "";

        try {

            if (
                navigator.share
            ) {

                await navigator.share({

                    title: "Universe139",
                    text: text,
                    url: window.location.href

                });

            } else {

                await navigator.clipboard.writeText(
                    text
                );

                const originalText =
                    shareBtn.textContent;

                shareBtn.textContent =
                    t.copied;

                setTimeout(() => {

                    shareBtn.textContent =
                        t.share;

                }, 1800);

            }

        } catch (error) {

            console.log(
                "Share cancelled or unavailable."
            );

        }

    });

}


/* =========================================================
   INITIAL STATE
   ========================================================= */

if (revealBtn) {
    revealBtn.style.display = "none";
}

if (loading) {
    loading.style.display = "none";
}

if (messageBox) {
    messageBox.style.display = "none";
}


/* =========================================================
   DEBUG INFO
   ========================================================= */

console.log(
    "Universe139 loaded successfully."
);

console.log(
    "Languages:",
    Object.keys(generatedMessages)
);

console.log(
    "Messages per language:",
    Object.keys(generatedMessages).map(
        language =>
            `${language}: ${generatedMessages[language].length}`
    )
);
