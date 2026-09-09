/* =========================================================
   UNIVERSE139 — Message From The Universe
   Full updated script
   ========================================================= */

const languages = {
    en: {
        name: "English",
        title: "MESSAGE FROM THE UNIVERSE",
        subtitle: "Choose your language",
        reveal: "REVEAL MY MESSAGE",
        loading: "The Universe is listening...",
        another: "RECEIVE ANOTHER MESSAGE",
        share: "SHARE MY MESSAGE",
        messagePrefix: "Your message from the Universe",
        shareTitle: "Share Your Message",
        copy: "Copy Message",
        copied: "Copied!",
        open: "Open Universe139",
        sharePicture: "Share Picture"
    },

    es: {
        name: "Español",
        title: "MENSAJE DEL UNIVERSO",
        subtitle: "Elige tu idioma",
        reveal: "REVELAR MI MENSAJE",
        loading: "El Universo está escuchando...",
        another: "RECIBIR OTRO MENSAJE",
        share: "COMPARTIR MI MENSAJE",
        messagePrefix: "Tu mensaje del Universo",
        shareTitle: "Comparte tu mensaje",
        copy: "Copiar mensaje",
        copied: "¡Copiado!",
        open: "Abrir Universe139",
        sharePicture: "Compartir imagen"
    },

    zh: {
        name: "中文",
        title: "来自宇宙的信息",
        subtitle: "选择你的语言",
        reveal: "揭示我的信息",
        loading: "宇宙正在倾听……",
        another: "接收另一条信息",
        share: "分享我的信息",
        messagePrefix: "你的宇宙信息",
        shareTitle: "分享你的信息",
        copy: "复制信息",
        copied: "已复制！",
        open: "打开 Universe139",
        sharePicture: "分享图片"
    },

    ru: {
        name: "Русский",
        title: "ПОСЛАНИЕ ОТ ВСЕЛЕННОЙ",
        subtitle: "Выберите язык",
        reveal: "ОТКРЫТЬ МОЁ ПОСЛАНИЕ",
        loading: "Вселенная слушает...",
        another: "ПОЛУЧИТЬ ДРУГОЕ ПОСЛАНИЕ",
        share: "ПОДЕЛИТЬСЯ МОИМ ПОСЛАНИЕМ",
        messagePrefix: "Ваше послание от Вселенной",
        shareTitle: "Поделитесь своим посланием",
        copy: "Скопировать послание",
        copied: "Скопировано!",
        open: "Открыть Universe139",
        sharePicture: "Поделиться изображением"
    },

    hi: {
        name: "हिन्दी",
        title: "ब्रह्मांड का संदेश",
        subtitle: "अपनी भाषा चुनें",
        reveal: "मेरा संदेश देखें",
        loading: "ब्रह्मांड आपकी बात सुन रहा है...",
        another: "एक और संदेश प्राप्त करें",
        share: "मेरा संदेश साझा करें",
        messagePrefix: "ब्रह्मांड से आपका संदेश",
        shareTitle: "अपना संदेश साझा करें",
        copy: "संदेश कॉपी करें",
        copied: "कॉपी हो गया!",
        open: "Universe139 खोलें",
        sharePicture: "चित्र साझा करें"
    },

    th: {
        name: "ไทย",
        title: "ข้อความจากจักรวาล",
        subtitle: "เลือกภาษาของคุณ",
        reveal: "เปิดเผยข้อความของฉัน",
        loading: "จักรวาลกำลังรับฟัง...",
        another: "รับข้อความอีกครั้ง",
        share: "แชร์ข้อความของฉัน",
        messagePrefix: "ข้อความจากจักรวาลของคุณ",
        shareTitle: "แชร์ข้อความของคุณ",
        copy: "คัดลอกข้อความ",
        copied: "คัดลอกแล้ว!",
        open: "เปิด Universe139",
        sharePicture: "แชร์รูปภาพ"
    }
};


/* =========================================================
   MESSAGES
   ========================================================= */

const messages = {

    en: [
        "What you are looking for is already moving toward you.",
        "A new chapter is opening. Trust the timing.",
        "Something you once wished for is beginning to take shape.",
        "Do not force the next step. Let it reveal itself.",
        "Your energy is changing, and so is your path.",
        "The answer you need will arrive when you stop chasing it.",
        "A surprising opportunity is closer than you think.",
        "You are not behind. You are exactly where you need to be.",
        "Release what no longer belongs in your future.",
        "Your patience is creating something bigger than you can see.",
        "A door is about to open where you expected a wall.",
        "The Universe is rearranging things in your favor.",
        "Someone is thinking about you with sincere intentions.",
        "Your next decision will change more than you realize.",
        "Trust the feeling that keeps returning to you.",
        "Abundance is finding a new way to reach you.",
        "Something beautiful is developing quietly.",
        "Your past does not define the destination ahead.",
        "The moment you have been waiting for is getting closer.",
        "You already know what your heart is asking you to do."
    ],

    es: [
        "Lo que estás buscando ya se está acercando a ti.",
        "Un nuevo capítulo se está abriendo. Confía en el momento.",
        "Algo que una vez deseaste está comenzando a tomar forma.",
        "No fuerces el siguiente paso. Deja que se revele.",
        "Tu energía está cambiando, y también tu camino.",
        "La respuesta que necesitas llegará cuando dejes de perseguirla.",
        "Una oportunidad inesperada está más cerca de lo que crees.",
        "No estás atrasado. Estás exactamente donde necesitas estar.",
        "Deja ir lo que ya no pertenece a tu futuro.",
        "Tu paciencia está creando algo más grande de lo que puedes ver.",
        "Una puerta está a punto de abrirse donde esperabas encontrar un muro.",
        "El Universo está reorganizando las cosas a tu favor.",
        "Alguien está pensando en ti con intenciones sinceras.",
        "Tu próxima decisión cambiará más de lo que imaginas.",
        "Confía en esa sensación que sigue regresando a ti.",
        "La abundancia está encontrando una nueva forma de llegar a ti.",
        "Algo hermoso se está desarrollando silenciosamente.",
        "Tu pasado no define el destino que tienes por delante.",
        "El momento que has estado esperando se está acercando.",
        "Ya sabes lo que tu corazón te está pidiendo hacer."
    ],

    zh: [
        "你正在寻找的东西，已经在向你靠近。",
        "新的篇章正在开启。相信这一刻。",
        "你曾经许下的愿望，正在慢慢成为现实。",
        "不要强迫下一步，让答案自然出现。",
        "你的能量正在改变，你的道路也在改变。",
        "当你停止追逐时，你需要的答案就会到来。",
        "一个意想不到的机会比你想象中更近。",
        "你没有落后，你正好在应该到达的位置。",
        "放下那些已经不属于未来的事物。",
        "你的耐心正在创造超越想象的结果。",
        "一扇门即将打开，而你曾以为那里只有一堵墙。",
        "宇宙正在为你重新安排一切。",
        "有人正带着真诚的想法想着你。",
        "你的下一个决定会改变很多事情。",
        "相信那个不断回到你心里的感觉。",
        "丰盛正在寻找新的方式来到你的生命中。",
        "美好的事情正在安静地发生。",
        "你的过去无法决定你未来的方向。",
        "你一直等待的时刻正在越来越近。",
        "你的内心其实已经知道该怎么做。"
    ],

    ru: [
        "То, что ты ищешь, уже движется навстречу тебе.",
        "Открывается новая глава. Доверься этому моменту.",
        "То, о чём ты когда-то мечтал, начинает становиться реальностью.",
        "Не торопи следующий шаг. Позволь ему открыться самому.",
        "Твоя энергия меняется — и вместе с ней меняется твой путь.",
        "Ответ придёт тогда, когда ты перестанешь его преследовать.",
        "Неожиданная возможность уже ближе, чем тебе кажется.",
        "Ты не опаздываешь. Ты находишься именно там, где должен быть.",
        "Отпусти то, чему больше нет места в твоём будущем.",
        "Твоё терпение создаёт нечто большее, чем ты сейчас можешь увидеть.",
        "Дверь скоро откроется там, где ты ожидал увидеть стену.",
        "Вселенная перестраивает обстоятельства в твою пользу.",
        "Кто-то думает о тебе с искренними намерениями.",
        "Твоё следующее решение изменит больше, чем ты предполагаешь.",
        "Доверься ощущению, которое снова и снова возвращается к тебе.",
        "Изобилие находит новый путь в твою жизнь.",
        "Что-то прекрасное уже тихо развивается.",
        "Твоё прошлое не определяет твой будущий путь.",
        "Момент, которого ты ждал, становится всё ближе.",
        "Ты уже знаешь, что твоё сердце просит тебя сделать."
    ],

    hi: [
        "जिस चीज़ की आप तलाश कर रहे हैं, वह पहले से आपकी ओर बढ़ रही है।",
        "एक नया अध्याय खुल रहा है। इस समय पर भरोसा करें।",
        "जिस चीज़ की आपने कभी इच्छा की थी, वह अब आकार ले रही है।",
        "अगला कदम मजबूर न करें। उसे स्वयं सामने आने दें।",
        "आपकी ऊर्जा बदल रही है और आपका रास्ता भी।",
        "जिस उत्तर की आपको आवश्यकता है, वह तब आएगा जब आप उसका पीछा करना छोड़ देंगे।",
        "एक अप्रत्याशित अवसर आपकी सोच से भी करीब है।",
        "आप पीछे नहीं हैं। आप बिल्कुल वहीं हैं जहाँ आपको होना चाहिए।",
        "जो आपके भविष्य का हिस्सा नहीं है उसे छोड़ दें।",
        "आपका धैर्य आपकी कल्पना से भी बड़ी चीज़ बना रहा है।",
        "एक दरवाज़ा वहाँ खुलने वाला है जहाँ आपको दीवार दिखाई दे रही थी।",
        "ब्रह्मांड परिस्थितियों को आपके पक्ष में व्यवस्थित कर रहा है।",
        "कोई व्यक्ति सच्चे इरादों के साथ आपके बारे में सोच रहा है।",
        "आपका अगला निर्णय आपकी कल्पना से अधिक बदल देगा।",
        "उस एहसास पर भरोसा करें जो बार-बार आपके पास लौटता है।",
        "समृद्धि आपके जीवन तक पहुँचने का नया रास्ता खोज रही है।",
        "कुछ सुंदर चीज़ चुपचाप विकसित हो रही है।",
        "आपका अतीत आपके भविष्य की दिशा तय नहीं करता।",
        "जिस क्षण का आप इंतज़ार कर रहे थे, वह करीब आ रहा है।",
        "आप पहले से जानते हैं कि आपका दिल आपसे क्या करने को कह रहा है।"
    ],

    th: [
        "สิ่งที่คุณกำลังตามหา กำลังเดินทางเข้ามาหาคุณแล้ว",
        "บทใหม่กำลังเปิดขึ้น จงเชื่อมั่นในช่วงเวลานี้",
        "สิ่งที่คุณเคยปรารถนา กำลังเริ่มเป็นรูปเป็นร่าง",
        "อย่าฝืนก้าวต่อไป ปล่อยให้คำตอบเปิดเผยตัวเอง",
        "พลังงานของคุณกำลังเปลี่ยน และเส้นทางของคุณก็เช่นกัน",
        "คำตอบที่คุณต้องการจะมาถึง เมื่อคุณหยุดไล่ตามมัน",
        "โอกาสที่ไม่คาดคิดอยู่ใกล้กว่าที่คุณคิด",
        "คุณไม่ได้ล่าช้า คุณอยู่ในจุดที่ควรอยู่แล้ว",
        "ปล่อยสิ่งที่ไม่ควรอยู่ในอนาคตของคุณอีกต่อไป",
        "ความอดทนของคุณกำลังสร้างสิ่งที่ยิ่งใหญ่กว่าที่คุณมองเห็น",
        "ประตูกำลังจะเปิดขึ้นในที่ที่คุณคิดว่ามีกำแพง",
        "จักรวาลกำลังจัดทุกอย่างใหม่เพื่อประโยชน์ของคุณ",
        "มีใครบางคนกำลังคิดถึงคุณด้วยความจริงใจ",
        "การตัดสินใจครั้งต่อไปของคุณจะเปลี่ยนแปลงมากกว่าที่คุณคิด",
        "เชื่อในความรู้สึกที่กลับมาหาคุณครั้งแล้วครั้งเล่า",
        "ความอุดมสมบูรณ์กำลังหาทางใหม่เพื่อเข้ามาในชีวิตคุณ",
        "สิ่งสวยงามบางอย่างกำลังเกิดขึ้นอย่างเงียบ ๆ",
        "อดีตของคุณไม่ได้กำหนดปลายทางของคุณ",
        "ช่วงเวลาที่คุณรอคอยกำลังใกล้เข้ามา",
        "ลึก ๆ แล้วคุณรู้ว่าหัวใจของคุณกำลังบอกให้ทำอะไร"
    ]
};


/* =========================================================
   STATE
   ========================================================= */

let currentLanguage = "en";
let currentMessage = "";
let lastMessageIndex = -1;


/* =========================================================
   IMPORTANT:
   USE THE ACTUAL URL OF THE CURRENT WORKING APP.
   This fixes the old Vercel 404 problem.
   ========================================================= */

function getShareURL() {
    const url = new URL(window.location.href);

    // Remove temporary parameters/hash so the shared URL
    // always points to the actual application page.
    url.search = "";
    url.hash = "";

    return url.toString();
}


/* =========================================================
   DOM
   ========================================================= */

const languageBox = document.getElementById("languageBox");
const chooseLanguage = document.getElementById("chooseLanguage");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const revealBtn = document.getElementById("revealBtn");
const loading = document.getElementById("loading");
const loadingText = document.getElementById("loadingText");
const messageBox = document.getElementById("messageBox");
const month = document.getElementById("month");
const message = document.getElementById("message");
const smallText = document.getElementById("smallText");
const againBtn = document.getElementById("againBtn");
const shareBtn = document.getElementById("shareBtn");


/* =========================================================
   LANGUAGE
   ========================================================= */

function setLanguage(lang) {
    if (!languages[lang]) return;

    currentLanguage = lang;

    const t = languages[lang];

    if (title) title.textContent = t.title;
    if (subtitle) subtitle.textContent = t.subtitle;
    if (chooseLanguage) chooseLanguage.textContent = t.subtitle;
    if (revealBtn) revealBtn.textContent = t.reveal;
    if (loadingText) loadingText.textContent = t.loading;
    if (againBtn) againBtn.textContent = t.another;
    if (shareBtn) shareBtn.textContent = t.share;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-language]").forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.language === lang
        );
    });
}


/* =========================================================
   LANGUAGE BUTTONS
   ========================================================= */

document.querySelectorAll("[data-language]").forEach(btn => {
    btn.addEventListener("click", () => {
        setLanguage(btn.dataset.language);
    });
});


/* =========================================================
   RANDOM MESSAGE
   ========================================================= */

function getRandomMessage() {
    const list = messages[currentLanguage];

    if (!list || !list.length) return "";

    let index;

    do {
        index = Math.floor(Math.random() * list.length);
    } while (list.length > 1 && index === lastMessageIndex);

    lastMessageIndex = index;

    return list[index];
}


/* =========================================================
   REVEAL MESSAGE
   ========================================================= */

function revealMessage() {

    if (revealBtn) {
        revealBtn.style.display = "none";
    }

    if (messageBox) {
        messageBox.style.display = "none";
    }

    if (loading) {
        loading.style.display = "block";
    }

    setTimeout(() => {

        currentMessage = getRandomMessage();

        if (message) {
            message.textContent = currentMessage;
        }

        if (month) {
            const now = new Date();

            month.textContent = now.toLocaleDateString(
                currentLanguage === "zh"
                    ? "zh-CN"
                    : currentLanguage === "ru"
                    ? "ru-RU"
                    : currentLanguage === "es"
                    ? "es-ES"
                    : currentLanguage === "hi"
                    ? "hi-IN"
                    : currentLanguage === "th"
                    ? "th-TH"
                    : "en-US",
                {
                    month: "long",
                    year: "numeric"
                }
            );
        }

        if (smallText) {
            smallText.textContent =
                languages[currentLanguage].messagePrefix;
        }

        if (loading) {
            loading.style.display = "none";
        }

        if (messageBox) {
            messageBox.style.display = "block";
        }

        if (againBtn) {
            againBtn.textContent =
                languages[currentLanguage].another;
        }

        if (shareBtn) {
            shareBtn.textContent =
                languages[currentLanguage].share;
        }

    }, 1800);
}


/* =========================================================
   AGAIN
   ========================================================= */

if (revealBtn) {
    revealBtn.addEventListener("click", revealMessage);
}

if (againBtn) {
    againBtn.addEventListener("click", revealMessage);
}


/* =========================================================
   SHARE TEXT
   ========================================================= */

function getShareText() {

    const t = languages[currentLanguage];

    return `${t.messagePrefix}

"${currentMessage}"

— UNIVERSE139

${getShareURL()}`;
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   LOAD HTML2CANVAS
   ========================================================= */

function loadHtml2Canvas() {

    return new Promise((resolve, reject) => {

        if (window.html2canvas) {
            resolve(window.html2canvas);
            return;
        }

        const existing =
            document.querySelector(
                'script[src*="html2canvas"]'
            );

        if (existing) {

            existing.addEventListener(
                "load",
                () => resolve(window.html2canvas)
            );

            existing.addEventListener(
                "error",
                reject
            );

            return;
        }

        const script = document.createElement("script");

        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

        script.onload = () => {
            resolve(window.html2canvas);
        };

        script.onerror = reject;

        document.head.appendChild(script);
    });
}


/* =========================================================
   CREATE CLEAN PROFESSIONAL SHARE CARD
   ========================================================= */

function createShareCard() {

    const old =
        document.getElementById(
            "universe139-share-card"
        );

    if (old) {
        old.remove();
    }

    const card =
        document.createElement("div");

    card.id =
        "universe139-share-card";

    /*
       IMPORTANT:
       This is a separate capture card.

       It DOES NOT contain:
       - Receive Another Message
       - Share My Message
       - Share panel
       - buttons
       - icons
    */

    card.innerHTML = `
        <div class="u139-stars"></div>

        <div class="u139-card-content">

            <div class="u139-brand">
                UNIVERSE139
            </div>

            <div class="u139-line"></div>

            <div class="u139-small">
                ${escapeHTML(
                    languages[currentLanguage].messagePrefix
                )}
            </div>

            <div class="u139-message">
                “${escapeHTML(currentMessage)}”
            </div>

            <div class="u139-bottom">
                MESSAGE FROM THE UNIVERSE
            </div>

        </div>
    `;

    /*
       Get the current app background automatically.
       This means the share image follows the background
       already used by your application.
    */

    const bodyStyle =
        window.getComputedStyle(document.body);

    card.style.background =
        bodyStyle.background;

    if (
        !card.style.background ||
        card.style.background === "rgba(0, 0, 0, 0)"
    ) {
        card.style.background =
            "radial-gradient(circle at 50% 30%, #3b176b 0%, #17082f 45%, #06020f 100%)";
    }

    const style =
        document.createElement("style");

    style.id =
        "u139-share-card-style";

    style.textContent = `

        #universe139-share-card {

            position: fixed;

            left: -20000px;
            top: 0;

            width: 1080px;
            height: 1350px;

            box-sizing: border-box;

            overflow: hidden;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            color: white;

            display: flex;

            align-items: center;

            justify-content: center;

            text-align: center;
        }


        #universe139-share-card::before {

            content: "";

            position: absolute;

            inset: -20%;

            background:
                radial-gradient(
                    circle at 50% 30%,
                    rgba(160, 90, 255, 0.28),
                    transparent 34%
                ),
                radial-gradient(
                    circle at 15% 80%,
                    rgba(90, 50, 180, 0.22),
                    transparent 35%
                ),
                radial-gradient(
                    circle at 85% 75%,
                    rgba(120, 50, 200, 0.18),
                    transparent 35%
                );

            pointer-events: none;
        }


        #universe139-share-card .u139-stars {

            position: absolute;

            inset: 0;

            opacity: 0.65;

            background-image:
                radial-gradient(
                    circle,
                    rgba(255,255,255,0.85) 1px,
                    transparent 1.5px
                );

            background-size:
                75px 75px;

            background-position:
                10px 20px;

            pointer-events: none;
        }


        #universe139-share-card
        .u139-card-content {

            position: relative;

            z-index: 2;

            width: 82%;

            min-height: 78%;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;
        }


        #universe139-share-card
        .u139-brand {

            font-size: 34px;

            font-weight: 700;

            letter-spacing: 8px;

            margin-bottom: 42px;

            text-shadow:
                0 0 25px
                rgba(190,120,255,0.8);
        }


        #universe139-share-card
        .u139-line {

            width: 180px;

            height: 1px;

            background:
                rgba(255,255,255,0.45);

            margin-bottom: 60px;
        }


        #universe139-share-card
        .u139-small {

            font-size: 25px;

            letter-spacing: 3px;

            text-transform: uppercase;

            opacity: 0.72;

            margin-bottom: 55px;
        }


        #universe139-share-card
        .u139-message {

            font-size: 58px;

            line-height: 1.38;

            font-weight: 400;

            max-width: 900px;

            text-shadow:
                0 4px 25px
                rgba(0,0,0,0.45);
        }


        #universe139-share-card
        .u139-bottom {

            margin-top: 80px;

            font-size: 20px;

            letter-spacing: 5px;

            opacity: 0.48;
        }

    `;

    const oldStyle =
        document.getElementById(
            "u139-share-card-style"
        );

    if (oldStyle) {
        oldStyle.remove();
    }

    document.head.appendChild(style);
    document.body.appendChild(card);

    return card;
}


/* =========================================================
   CAPTURE SHARE CARD
   ========================================================= */

async function captureMessageImage() {

    if (!currentMessage) {
        throw new Error(
            "There is no message to share yet."
        );
    }

    const html2canvas =
        await loadHtml2Canvas();

    const card =
        createShareCard();

    /*
       Give browser time to render
       fonts/background before capture.
    */

    await new Promise(resolve =>
        setTimeout(resolve, 150)
    );

    const canvas =
        await html2canvas(card, {

            width: 1080,
            height: 1350,

            scale: 2,

            backgroundColor: null,

            useCORS: true,

            logging: false
        });

    card.remove();

    const style =
        document.getElementById(
            "u139-share-card-style"
        );

    if (style) {
        style.remove();
    }

    return canvas;
}


/* =========================================================
   CANVAS → FILE
   ========================================================= */

async function createMessageImageFile() {

    const canvas =
        await captureMessageImage();

    return new Promise((resolve, reject) => {

        canvas.toBlob(
            blob => {

                if (!blob) {
                    reject(
                        new Error(
                            "Could not create image."
                        )
                    );

                    return;
                }

                const file =
                    new File(
                        [blob],
                        "Universe139-Message.png",
                        {
                            type: "image/png"
                        }
                    );

                resolve(file);
            },
            "image/png",
            1
        );
    });
}


/* =========================================================
   NATIVE SHARE — ACTUAL PICTURE
   ========================================================= */

async function sharePictureNative() {

    if (!currentMessage) {
        alert(
            "Please reveal your message first."
        );

        return;
    }

    try {

        const file =
            await createMessageImageFile();

        const shareData = {
            title:
                "Universe139 — Message From The Universe",

            text:
                getShareText(),

            url:
                getShareURL()
        };

        /*
           If the device/browser supports file sharing,
           share the actual generated picture.
        */

        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
                files: [file]
            })
        ) {

            await navigator.share({
                ...shareData,
                files: [file]
            });

            return;
        }


        /*
           Some desktop browsers don't support
           sharing files.

           Download/open fallback.
        */

        const imageURL =
            URL.createObjectURL(file);

        const a =
            document.createElement("a");

        a.href = imageURL;

        a.download =
            "Universe139-Message.png";

        document.body.appendChild(a);

        a.click();

        a.remove();

        setTimeout(() => {
            URL.revokeObjectURL(imageURL);
        }, 5000);

        alert(
            "Your message picture has been created. You can now share the image."
        );

    } catch (error) {

        console.error(
            "Picture sharing error:",
            error
        );

        if (
            error &&
            error.name === "AbortError"
        ) {
            return;
        }

        alert(
            "Unable to create the picture. Please try again."
        );
    }
}


/* =========================================================
   SHARE PANEL
   ========================================================= */

function showSharePanel() {

    if (!currentMessage) {
        alert(
            "Please reveal your message first."
        );

        return;
    }

    const old =
        document.getElementById(
            "universe139-share-panel"
        );

    if (old) {
        old.remove();
    }


    const shareURL =
        getShareURL();

    const t =
        languages[currentLanguage];


    const panel =
        document.createElement("div");

    panel.id =
        "universe139-share-panel";


    panel.innerHTML = `

        <div class="u139-share-overlay">

            <div class="u139-share-window">

                <button
                    class="u139-share-close"
                    id="u139ShareClose"
                    type="button"
                >
                    ×
                </button>


                <div class="u139-share-title">
                    ${escapeHTML(t.shareTitle)}
                </div>


                <div class="u139-share-preview">

                    <div class="u139-preview-message">
                        “${escapeHTML(currentMessage)}”
                    </div>

                    <div class="u139-preview-brand">
                        UNIVERSE139
                    </div>

                </div>


                <div class="u139-share-link">

                    <a
                        href="${escapeHTML(shareURL)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${escapeHTML(shareURL)}
                    </a>

                </div>


                <div class="u139-share-options">

                    <button
                        type="button"
                        data-share="picture"
                    >
                        ${escapeHTML(t.sharePicture)}
                    </button>

                    <button
                        type="button"
                        data-share="whatsapp"
                    >
                        WhatsApp
                    </button>

                    <button
                        type="button"
                        data-share="facebook"
                    >
                        Facebook
                    </button>

                    <button
                        type="button"
                        data-share="telegram"
                    >
                        Telegram
                    </button>

                    <button
                        type="button"
                        data-share="email"
                    >
                        Email
                    </button>

                    <button
                        type="button"
                        data-share="sms"
                    >
                        SMS
                    </button>

                    <button
                        type="button"
                        data-share="linkedin"
                    >
                        LinkedIn
                    </button>

                    <button
                        type="button"
                        data-share="reddit"
                    >
                        Reddit
                    </button>

                    <button
                        type="button"
                        data-share="viber"
                    >
                        Viber
                    </button>

                    <button
                        type="button"
                        data-share="copy"
                    >
                        ${escapeHTML(t.copy)}
                    </button>

                    <button
                        type="button"
                        data-share="open"
                    >
                        ${escapeHTML(t.open)}
                    </button>

                    <button
                        type="button"
                        data-share="more"
                    >
                        More
                    </button>

                </div>

            </div>

        </div>
    `;


    const style =
        document.createElement("style");

    style.id =
        "u139-share-panel-style";


    style.textContent = `

        #universe139-share-panel
        .u139-share-overlay {

            position: fixed;

            inset: 0;

            z-index: 999999;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            background:
                rgba(5, 1, 15, 0.86);

            backdrop-filter:
                blur(12px);
        }


        #universe139-share-panel
        .u139-share-window {

            position: relative;

            width: min(620px, 94vw);

            max-height: 92vh;

            overflow-y: auto;

            padding: 30px;

            border-radius: 25px;

            background:
                radial-gradient(
                    circle at 50% 0%,
                    rgba(120,70,210,0.30),
                    transparent 42%
                ),
                linear-gradient(
                    145deg,
                    #120522,
                    #09020f
                );

            border:
                1px solid
                rgba(255,255,255,0.16);

            box-shadow:
                0 30px 100px
                rgba(0,0,0,0.65);

            color: white;

            font-family:
                Arial,
                Helvetica,
                sans-serif;
        }


        #universe139-share-panel
        .u139-share-close {

            position: absolute;

            right: 18px;

            top: 12px;

            border: none;

            background: transparent;

            color: white;

            font-size: 32px;

            cursor: pointer;

            opacity: 0.75;
        }


        #universe139-share-panel
        .u139-share-title {

            text-align: center;

            font-size: 22px;

            letter-spacing: 2px;

            margin-bottom: 22px;
        }


        #universe139-share-panel
        .u139-share-preview {

            padding: 28px;

            border-radius: 18px;

            text-align: center;

            background:
                radial-gradient(
                    circle at 50% 20%,
                    rgba(130,70,220,0.28),
                    transparent 50%
                ),
                rgba(255,255,255,0.055);

            border:
                1px solid
                rgba(255,255,255,0.10);

            margin-bottom: 18px;
        }


        #universe139-share-panel
        .u139-preview-message {

            font-size: 20px;

            line-height: 1.5;

            margin-bottom: 20px;
        }


        #universe139-share-panel
        .u139-preview-brand {

            font-size: 12px;

            letter-spacing: 4px;

            opacity: 0.55;
        }


        #universe139-share-panel
        .u139-share-link {

            text-align: center;

            margin-bottom: 22px;

            word-break: break-all;
        }


        #universe139-share-panel
        .u139-share-link a {

            color: #d9b8ff;

            text-decoration: underline;

            cursor: pointer;
        }


        #universe139-share-panel
        .u139-share-options {

            display: grid;

            grid-template-columns:
                repeat(2, 1fr);

            gap: 10px;
        }


        #universe139-share-panel
        .u139-share-options button {

            min-height: 46px;

            border-radius: 12px;

            border:
                1px solid
                rgba(255,255,255,0.13);

            background:
                rgba(255,255,255,0.065);

            color: white;

            cursor: pointer;

            font-size: 14px;

            transition:
                transform 0.15s ease,
                background 0.15s ease;
        }


        #universe139-share-panel
        .u139-share-options button:hover {

            transform:
                translateY(-2px);

            background:
                rgba(255,255,255,0.13);
        }


        @media (max-width: 500px) {

            #universe139-share-panel
            .u139-share-options {

                grid-template-columns: 1fr;
            }

            #universe139-share-panel
            .u139-share-window {

                padding: 22px;
            }
        }

    `;


    document.head.appendChild(style);
    document.body.appendChild(panel);


    document
        .getElementById("u139ShareClose")
        .addEventListener(
            "click",
            () => panel.remove()
        );


    panel
        .querySelector(".u139-share-overlay")
        .addEventListener(
            "click",
            event => {

                if (
                    event.target.classList.contains(
                        "u139-share-overlay"
                    )
                ) {
                    panel.remove();
                }
            }
        );


    panel
        .querySelectorAll(
            "[data-share]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    handleShareAction(
                        button.dataset.share
                    );
                }
            );
        });
}


/* =========================================================
   SHARE ACTIONS
   ========================================================= */

async function handleShareAction(type) {

    const shareURL =
        getShareURL();

    const shareText =
        getShareText();

    switch (type) {

        case "picture":

            await sharePictureNative();

            break;


        case "whatsapp": {

            const url =
                "https://wa.me/?text=" +
                encodeURIComponent(
                    shareText
                );

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            break;
        }


        case "facebook": {

            /*
               Facebook accepts:
               - URL
               - quote/message

               The actual generated picture is
               handled by "Share Picture".
            */

            const url =
                "https://www.facebook.com/sharer/sharer.php" +
                "?u=" +
                encodeURIComponent(
                    shareURL
                ) +
                "&quote=" +
                encodeURIComponent(
                    `"${currentMessage}" — UNIVERSE139`
                );

            window.open(
                url,
                "_blank",
                "width=700,height=600"
            );

            break;
        }


        case "telegram": {

            const url =
                "https://t.me/share/url" +
                "?url=" +
                encodeURIComponent(
                    shareURL
                ) +
                "&text=" +
                encodeURIComponent(
                    `"${currentMessage}" — UNIVERSE139`
                );

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            break;
        }


        case "email": {

            const subject =
                "My Message From The Universe";

            const body =
                shareText;

            window.location.href =
                "mailto:" +
                "?subject=" +
                encodeURIComponent(
                    subject
                ) +
                "&body=" +
                encodeURIComponent(
                    body
                );

            break;
        }


        case "sms": {

            const smsURL =
                "sms:?body=" +
                encodeURIComponent(
                    shareText
                );

            window.location.href =
                smsURL;

            break;
        }


        case "linkedin": {

            const url =
                "https://www.linkedin.com/sharing/share-offsite/?url=" +
                encodeURIComponent(
                    shareURL
                );

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            break;
        }


        case "reddit": {

            const url =
                "https://www.reddit.com/submit" +
                "?url=" +
                encodeURIComponent(
                    shareURL
                ) +
                "&title=" +
                encodeURIComponent(
                    `"${currentMessage}" — UNIVERSE139`
                );

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            break;
        }


        case "viber": {

            const url =
                "viber://forward" +
                "?text=" +
                encodeURIComponent(
                    shareText
                );

            window.location.href =
                url;

            break;
        }


        case "copy": {

            try {

                await navigator.clipboard.writeText(
                    shareText
                );

                alert(
                    languages[currentLanguage].copied
                );

            } catch (error) {

                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.value =
                    shareText;

                document.body.appendChild(
                    textarea
                );

                textarea.select();

                document.execCommand(
                    "copy"
                );

                textarea.remove();

                alert(
                    languages[currentLanguage].copied
                );
            }

            break;
        }


        case "open":

            /*
               This opens the SAME working URL
               instead of the old Vercel URL.
            */

            window.open(
                shareURL,
                "_blank",
                "noopener,noreferrer"
            );

            break;


        case "more":

            if (
                navigator.share
            ) {

                try {

                    await navigator.share({
                        title:
                            "Universe139 — Message From The Universe",

                        text:
                            shareText,

                        url:
                            shareURL
                    });

                } catch (error) {

                    if (
                        error.name !==
                        "AbortError"
                    ) {
                        console.error(error);
                    }
                }

            } else {

                await sharePictureNative();
            }

            break;
    }
}


/* =========================================================
   SHARE BUTTON
   ========================================================= */

if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        showSharePanel
    );
}


/* =========================================================
   COSMIC TORNADO
   ========================================================= */

function createCosmicTornado() {

    const existing =
        document.getElementById(
            "cosmic-tornado"
        );

    if (existing) {
        existing.remove();
    }


    const tornado =
        document.createElement("div");

    tornado.id =
        "cosmic-tornado";


    const style =
        document.createElement("style");

    style.id =
        "cosmic-tornado-style";


    style.textContent = `

        #cosmic-tornado {

            position: fixed;

            inset: 0;

            z-index: -1;

            pointer-events: none;

            overflow: hidden;

            opacity: 0.45;
        }


        #cosmic-tornado::before {

            content: "";

            position: absolute;

            width: 75vw;

            height: 75vw;

            left: 50%;

            top: 45%;

            transform:
                translate(-50%, -50%);

            border-radius: 50%;

            background:
                conic-gradient(
                    from 0deg,
                    transparent,
                    rgba(150,80,255,0.22),
                    transparent,
                    rgba(100,50,220,0.18),
                    transparent
                );

            filter:
                blur(30px);

            animation:
                u139Spin 18s linear infinite;
        }


        #cosmic-tornado::after {

            content: "";

            position: absolute;

            width: 35vw;

            height: 35vw;

            left: 50%;

            top: 55%;

            transform:
                translate(-50%, -50%);

            border-radius: 50%;

            border:
                2px solid
                rgba(190,130,255,0.18);

            box-shadow:
                0 0 80px
                rgba(140,80,255,0.22);

            animation:
                u139Pulse 5s ease-in-out infinite;
        }


        @keyframes u139Spin {

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
                    scale(1.15);
            }
        }


        @keyframes u139Pulse {

            0%, 100% {
                transform:
                    translate(-50%, -50%)
                    scale(0.85);
                opacity: 0.3;
            }

            50% {
                transform:
                    translate(-50%, -50%)
                    scale(1.12);
                opacity: 0.7;
            }
        }

    `;


    document.head.appendChild(style);
    document.body.appendChild(tornado);
}


/* =========================================================
   START
   ========================================================= */

setLanguage("en");

createCosmicTornado();


/* =========================================================
   PREVENT BROKEN OLD URL REFERENCES
   ========================================================= */

window.UNIVERSE139_URL =
    getShareURL();


console.log(
    "Universe139 active URL:",
    getShareURL()
);
