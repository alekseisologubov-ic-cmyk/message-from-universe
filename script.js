// =====================================================
// UNIVERSE139 — COMPLETE SCRIPT
// =====================================================

// -----------------------------------------------------
// LANGUAGES
// -----------------------------------------------------

const languages = {
    en: {
        title: "A Message From The Universe",
        subtitle: "Choose your language and receive your message",
        reveal: "RECEIVE MY MESSAGE",
        loading: "The Universe is preparing your message...",
        again: "RECEIVE ANOTHER MESSAGE",
        share: "SHARE MY MESSAGE",
        small: "Your message has found you for a reason."
    },

    es: {
        title: "Un Mensaje del Universo",
        subtitle: "Elige tu idioma y recibe tu mensaje",
        reveal: "RECIBIR MI MENSAJE",
        loading: "El Universo está preparando tu mensaje...",
        again: "RECIBIR OTRO MENSAJE",
        share: "COMPARTIR MI MENSAJE",
        small: "Tu mensaje te ha encontrado por una razón."
    },

    zh: {
        title: "来自宇宙的讯息",
        subtitle: "选择你的语言，接收属于你的讯息",
        reveal: "接收我的讯息",
        loading: "宇宙正在为你准备讯息……",
        again: "再接收一条讯息",
        share: "分享我的讯息",
        small: "这条讯息找到你，是有原因的。"
    },

    ru: {
        title: "Послание от Вселенной",
        subtitle: "Выберите язык и получите своё послание",
        reveal: "ПОЛУЧИТЬ МОЁ ПОСЛАНИЕ",
        loading: "Вселенная готовит для вас послание...",
        again: "ПОЛУЧИТЬ ЕЩЁ ОДНО ПОСЛАНИЕ",
        share: "ПОДЕЛИТЬСЯ МОИМ ПОСЛАНИЕМ",
        small: "Это послание нашло вас не случайно."
    },

    hi: {
        title: "ब्रह्मांड का एक संदेश",
        subtitle: "अपनी भाषा चुनें और अपना संदेश प्राप्त करें",
        reveal: "मेरा संदेश प्राप्त करें",
        loading: "ब्रह्मांड आपके लिए संदेश तैयार कर रहा है...",
        again: "एक और संदेश प्राप्त करें",
        share: "मेरा संदेश साझा करें",
        small: "यह संदेश आप तक किसी कारण से पहुँचा है।"
    },

    th: {
        title: "ข้อความจากจักรวาล",
        subtitle: "เลือกภาษาของคุณและรับข้อความของคุณ",
        reveal: "รับข้อความของฉัน",
        loading: "จักรวาลกำลังเตรียมข้อความสำหรับคุณ...",
        again: "รับข้อความอีกครั้ง",
        share: "แชร์ข้อความของฉัน",
        small: "ข้อความนี้มาถึงคุณด้วยเหตุผลบางอย่าง"
    }
};


// -----------------------------------------------------
// MESSAGES
// -----------------------------------------------------

const messages = {

    en: [
        "Something you have been waiting for is moving closer to you.",
        "Trust the path. You are exactly where you need to be.",
        "A new opportunity will appear when you least expect it.",
        "Let go of what no longer belongs in your life.",
        "Your patience is about to be rewarded.",
        "Someone is thinking about you with warmth in their heart.",
        "The answer you seek will come through an unexpected sign.",
        "Your energy is changing, and so is your future.",
        "Do not be afraid to begin again.",
        "A financial opportunity is moving toward you.",
        "The Universe is opening a door you could not see before.",
        "Your intuition already knows the answer.",
        "A beautiful surprise is closer than you think.",
        "What feels like a delay may actually be protection.",
        "You are entering a period of greater abundance.",
        "Someone will bring unexpected joy into your life.",
        "Your next chapter will be very different from your last one.",
        "Believe in yourself even when nobody else can see your vision.",
        "A long-awaited change is beginning.",
        "Your life is preparing to become lighter and happier."
    ],

    es: [
        "Algo que has estado esperando se está acercando a ti.",
        "Confía en el camino. Estás exactamente donde necesitas estar.",
        "Una nueva oportunidad aparecerá cuando menos lo esperes.",
        "Deja ir lo que ya no pertenece a tu vida.",
        "Tu paciencia está a punto de ser recompensada.",
        "Alguien piensa en ti con cariño en su corazón.",
        "La respuesta que buscas llegará a través de una señal inesperada.",
        "Tu energía está cambiando, y también tu futuro.",
        "No tengas miedo de comenzar de nuevo.",
        "Una oportunidad financiera se está acercando a ti.",
        "El Universo está abriendo una puerta que antes no podías ver.",
        "Tu intuición ya conoce la respuesta.",
        "Una hermosa sorpresa está más cerca de lo que piensas.",
        "Lo que parece un retraso puede ser protección.",
        "Estás entrando en un período de mayor abundancia.",
        "Alguien traerá una alegría inesperada a tu vida.",
        "Tu próximo capítulo será muy diferente al anterior.",
        "Cree en ti incluso cuando nadie más pueda ver tu visión.",
        "Un cambio esperado durante mucho tiempo está comenzando.",
        "Tu vida se está preparando para ser más ligera y feliz."
    ],

    zh: [
        "你一直等待的事情正在慢慢靠近你。",
        "相信这条路，你正处在应该在的位置。",
        "一个新的机会会在你意想不到的时候出现。",
        "放下那些已经不再属于你生活的事物。",
        "你的耐心即将得到回报。",
        "有人正带着温暖的心想着你。",
        "你寻找的答案会通过一个意想不到的信号出现。",
        "你的能量正在改变，你的未来也正在改变。",
        "不要害怕重新开始。",
        "一个与财富有关的机会正在向你靠近。",
        "宇宙正在为你打开一扇曾经看不见的门。",
        "你的直觉已经知道答案。",
        "一个美好的惊喜比你想象的更近。",
        "看似延迟的事情，也许其实是在保护你。",
        "你正在进入一个更加丰盛的阶段。",
        "有人会给你的生活带来意想不到的快乐。",
        "你的下一章会与上一章完全不同。",
        "即使别人看不到你的梦想，也要相信自己。",
        "一个期待已久的改变正在开始。",
        "你的生活正在变得更加轻松和幸福。"
    ],

    ru: [
        "То, чего вы давно ждёте, уже приближается к вам.",
        "Доверьтесь своему пути. Вы именно там, где должны быть.",
        "Новая возможность появится тогда, когда вы меньше всего её ожидаете.",
        "Отпустите то, чему больше нет места в вашей жизни.",
        "Ваше терпение скоро будет вознаграждено.",
        "Кто-то думает о вас с теплом в сердце.",
        "Ответ, который вы ищете, придёт через неожиданный знак.",
        "Ваша энергия меняется, и вместе с ней меняется ваше будущее.",
        "Не бойтесь начать всё сначала.",
        "Финансовая возможность уже движется в вашу сторону.",
        "Вселенная открывает перед вами дверь, которую вы раньше не замечали.",
        "Ваша интуиция уже знает ответ.",
        "Прекрасный сюрприз ближе, чем вы думаете.",
        "То, что кажется задержкой, возможно, на самом деле является защитой.",
        "Вы входите в период большего изобилия.",
        "Кто-то принесёт неожиданную радость в вашу жизнь.",
        "Следующая глава вашей жизни будет совершенно другой.",
        "Верьте в себя, даже если другие пока не видят вашу мечту.",
        "Долгожданные перемены уже начинаются.",
        "Ваша жизнь готовится стать легче и счастливее."
    ],

    hi: [
        "जिस चीज़ का आप इंतज़ार कर रहे हैं, वह आपकी ओर बढ़ रही है।",
        "अपने रास्ते पर भरोसा रखें। आप वहीं हैं जहाँ आपको होना चाहिए।",
        "एक नया अवसर तब आएगा जब आपको इसकी सबसे कम उम्मीद होगी।",
        "जो अब आपके जीवन का हिस्सा नहीं है, उसे जाने दें।",
        "आपके धैर्य का फल मिलने वाला है।",
        "कोई आपके बारे में अपने दिल में गर्मजोशी के साथ सोच रहा है।",
        "जिस उत्तर की आप तलाश कर रहे हैं, वह एक अप्रत्याशित संकेत के माध्यम से आएगा।",
        "आपकी ऊर्जा बदल रही है और आपका भविष्य भी बदल रहा है।",
        "फिर से शुरुआत करने से मत डरें।",
        "एक आर्थिक अवसर आपकी ओर बढ़ रहा है।",
        "ब्रह्मांड आपके लिए एक ऐसा दरवाज़ा खोल रहा है जिसे आप पहले नहीं देख पाए थे।",
        "आपका अंतर्ज्ञान पहले से ही उत्तर जानता है।",
        "एक सुंदर आश्चर्य आपकी सोच से भी करीब है।",
        "जो देरी लग रही है, वह शायद आपकी सुरक्षा है।",
        "आप अधिक समृद्धि के दौर में प्रवेश कर रहे हैं।",
        "कोई आपके जीवन में अप्रत्याशित खुशी लेकर आएगा।",
        "आपका अगला अध्याय पिछले अध्याय से बहुत अलग होगा।",
        "खुद पर विश्वास रखें, भले ही दूसरे आपकी दृष्टि को न समझें।",
        "एक लंबे समय से प्रतीक्षित बदलाव शुरू हो रहा है।",
        "आपका जीवन अधिक हल्का और खुशहाल होने वाला है।"
    ],

    th: [
        "สิ่งที่คุณรอคอยกำลังเดินทางเข้ามาหาคุณ",
        "เชื่อมั่นในเส้นทางของคุณ คุณอยู่ในที่ที่ควรอยู่",
        "โอกาสใหม่จะปรากฏขึ้นเมื่อคุณคาดไม่ถึง",
        "ปล่อยสิ่งที่ไม่เหมาะกับชีวิตของคุณอีกต่อไป",
        "ความอดทนของคุณกำลังจะได้รับรางวัล",
        "มีใครบางคนกำลังคิดถึงคุณด้วยความอบอุ่นในหัวใจ",
        "คำตอบที่คุณกำลังค้นหาจะมาพร้อมกับสัญญาณที่ไม่คาดคิด",
        "พลังงานของคุณกำลังเปลี่ยนแปลง และอนาคตของคุณก็เช่นกัน",
        "อย่ากลัวที่จะเริ่มต้นใหม่",
        "โอกาสทางการเงินกำลังเข้ามาหาคุณ",
        "จักรวาลกำลังเปิดประตูที่คุณไม่เคยมองเห็นมาก่อน",
        "สัญชาตญาณของคุณรู้คำตอบอยู่แล้ว",
        "เซอร์ไพรส์ที่สวยงามอยู่ใกล้กว่าที่คุณคิด",
        "สิ่งที่ดูเหมือนความล่าช้าอาจเป็นการปกป้องคุณ",
        "คุณกำลังเข้าสู่ช่วงเวลาที่มีความอุดมสมบูรณ์มากขึ้น",
        "ใครบางคนจะนำความสุขที่ไม่คาดคิดเข้ามาในชีวิตคุณ",
        "บทต่อไปของชีวิตคุณจะแตกต่างจากบทที่ผ่านมาอย่างมาก",
        "เชื่อมั่นในตัวเองแม้คนอื่นจะยังมองไม่เห็นความฝันของคุณ",
        "การเปลี่ยนแปลงที่รอคอยมานานกำลังเริ่มต้น",
        "ชีวิตของคุณกำลังเตรียมพร้อมที่จะเบาและมีความสุขมากขึ้น"
    ]
};


// -----------------------------------------------------
// STATE
// -----------------------------------------------------

let currentLanguage = "en";
let currentMessage = "";
let lastMessageIndex = -1;
let revealTimer = null;


// -----------------------------------------------------
// DOM
// -----------------------------------------------------

let languageBox;
let chooseLanguage;
let title;
let subtitle;
let revealBtn;
let loading;
let loadingText;
let messageBox;
let month;
let message;
let smallText;
let againBtn;
let shareBtn;


// -----------------------------------------------------
// GET SHARE URL
// -----------------------------------------------------

function getShareURL() {
    try {
        // Always use the page that is actually running.
        // This prevents old hard-coded Vercel URLs.
        return window.location.origin + window.location.pathname;
    } catch (error) {
        return window.location.href;
    }
}


// -----------------------------------------------------
// INITIALIZE DOM
// -----------------------------------------------------

function initializeDOM() {

    languageBox = document.getElementById("languageBox");
    chooseLanguage = document.getElementById("chooseLanguage");
    title = document.getElementById("title");
    subtitle = document.getElementById("subtitle");
    revealBtn = document.getElementById("revealBtn");
    loading = document.getElementById("loading");
    loadingText = document.getElementById("loadingText");
    messageBox = document.getElementById("messageBox");
    month = document.getElementById("month");
    message = document.getElementById("message");
    smallText = document.getElementById("smallText");
    againBtn = document.getElementById("againBtn");
    shareBtn = document.getElementById("shareBtn");

    console.log("Universe139 DOM initialized");

    if (!revealBtn) {
        console.error("Universe139 ERROR: #revealBtn not found");
    }

    if (!message) {
        console.error("Universe139 ERROR: #message not found");
    }
}


// -----------------------------------------------------
// SET LANGUAGE
// -----------------------------------------------------

function setLanguage(lang) {

    if (!languages[lang]) {
        console.error("Universe139: unknown language:", lang);
        return;
    }

    currentLanguage = lang;

    const data = languages[lang];

    if (title) title.textContent = data.title;
    if (subtitle) subtitle.textContent = data.subtitle;
    if (revealBtn) revealBtn.textContent = data.reveal;
    if (loadingText) loadingText.textContent = data.loading;
    if (againBtn) againBtn.textContent = data.again;
    if (shareBtn) shareBtn.textContent = data.share;
    if (smallText) smallText.textContent = data.small;

    // Reset message when language changes
    currentMessage = "";
    lastMessageIndex = -1;

    if (messageBox) {
        messageBox.style.display = "none";
    }

    if (loading) {
        loading.style.display = "none";
    }

    if (revealBtn) {
        revealBtn.style.display = "inline-block";
    }

    // Highlight selected language
    document.querySelectorAll("[data-language]").forEach(button => {

        const buttonLanguage = button.getAttribute("data-language");

        if (buttonLanguage === lang) {
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");
        } else {
            button.classList.remove("active");
            button.setAttribute("aria-selected", "false");
        }
    });

    console.log("Universe139 language:", lang);
}


// -----------------------------------------------------
// RANDOM MESSAGE
// -----------------------------------------------------

function getRandomMessage() {

    const list = messages[currentLanguage];

    if (!list || list.length === 0) {
        console.error("No messages found for:", currentLanguage);
        return "";
    }

    let index;

    // Prevent immediate repeat
    if (list.length === 1) {
        index = 0;
    } else {
        do {
            index = Math.floor(Math.random() * list.length);
        } while (index === lastMessageIndex);
    }

    lastMessageIndex = index;

    return list[index];
}


// -----------------------------------------------------
// REVEAL MESSAGE
// -----------------------------------------------------

function revealMessage() {

    console.log("Universe139: revealMessage()");

    if (!message || !messageBox) {
        console.error(
            "Universe139 ERROR: message elements are missing."
        );
        return;
    }

    // Prevent multiple timers
    if (revealTimer) {
        clearTimeout(revealTimer);
        revealTimer = null;
    }

    if (revealBtn) {
        revealBtn.style.display = "none";
    }

    if (messageBox) {
        messageBox.style.display = "none";
    }

    if (loading) {
        loading.style.display = "block";
    }

    if (loadingText) {
        loadingText.textContent =
            languages[currentLanguage].loading;
    }

    revealTimer = setTimeout(function () {

        try {

            currentMessage = getRandomMessage();

            if (!currentMessage) {
                throw new Error("Message could not be generated.");
            }

            message.textContent = currentMessage;

            // Month / year
            if (month) {

                const localeMap = {
                    en: "en-US",
                    es: "es-ES",
                    zh: "zh-CN",
                    ru: "ru-RU",
                    hi: "hi-IN",
                    th: "th-TH"
                };

                month.textContent =
                    new Intl.DateTimeFormat(
                        localeMap[currentLanguage] || "en-US",
                        {
                            month: "long",
                            year: "numeric"
                        }
                    ).format(new Date());
            }

            if (smallText) {
                smallText.textContent =
                    languages[currentLanguage].small;
            }

            if (loading) {
                loading.style.display = "none";
            }

            if (messageBox) {
                messageBox.style.display = "block";
            }

            if (againBtn) {
                againBtn.style.display = "inline-block";
            }

            console.log(
                "Universe139 message:",
                currentMessage
            );

        } catch (error) {

            console.error(
                "Universe139 reveal error:",
                error
            );

            if (loading) {
                loading.style.display = "none";
            }

            if (revealBtn) {
                revealBtn.style.display = "inline-block";
            }
        }

    }, 1800);
}


// -----------------------------------------------------
// ESCAPE HTML
// -----------------------------------------------------

function escapeHTML(text) {

    const div = document.createElement("div");
    div.textContent = text;

    return div.innerHTML;
}


// -----------------------------------------------------
// SHARE TEXT
// -----------------------------------------------------

function getShareText() {

    if (!currentMessage) {
        return languages[currentLanguage].title;
    }

    return (
        languages[currentLanguage].title +
        "\n\n" +
        currentMessage +
        "\n\n" +
        languages[currentLanguage].small
    );
}


// -----------------------------------------------------
// LOAD HTML2CANVAS
// -----------------------------------------------------

function loadHtml2Canvas() {

    return new Promise((resolve, reject) => {

        if (window.html2canvas) {
            resolve(window.html2canvas);
            return;
        }

        const existing =
            document.querySelector(
                'script[data-universe139-html2canvas]'
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

        script.async = true;

        script.dataset.universe139Html2canvas = "true";

        script.onload = function () {

            if (window.html2canvas) {
                resolve(window.html2canvas);
            } else {
                reject(
                    new Error(
                        "html2canvas loaded but unavailable."
                    )
                );
            }
        };

        script.onerror = function () {
            reject(
                new Error(
                    "Could not load html2canvas."
                )
            );
        };

        document.head.appendChild(script);
    });
}


// -----------------------------------------------------
// CREATE PROFESSIONAL SHARE CARD
// -----------------------------------------------------

function createShareCard() {

    if (!currentMessage) {
        throw new Error("There is no message to share.");
    }

    const card = document.createElement("div");

    card.id = "universe139-share-card";

    card.style.position = "fixed";
    card.style.left = "-10000px";
    card.style.top = "0";
    card.style.width = "1080px";
    card.style.height = "1350px";
    card.style.boxSizing = "border-box";
    card.style.overflow = "hidden";

    card.style.background =
        "radial-gradient(circle at 50% 35%, #4a176d 0%, #19072c 42%, #07020e 100%)";

    card.style.color = "#ffffff";

    card.style.fontFamily =
        "Arial, Helvetica, sans-serif";

    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.justifyContent = "center";

    card.style.padding = "100px";

    // Stars
    for (let i = 0; i < 100; i++) {

        const star = document.createElement("div");

        const size =
            Math.random() * 4 + 2;

        star.style.position = "absolute";

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.borderRadius = "50%";

        star.style.background = "white";

        star.style.opacity =
            String(Math.random() * 0.8 + 0.2);

        star.style.left =
            Math.random() * 1080 + "px";

        star.style.top =
            Math.random() * 1350 + "px";

        card.appendChild(star);
    }


    // Logo
    const logo = document.createElement("div");

    logo.textContent = "UNIVERSE139";

    logo.style.fontSize = "34px";
    logo.style.fontWeight = "700";
    logo.style.letterSpacing = "8px";

    logo.style.marginBottom = "65px";

    logo.style.opacity = "0.9";

    card.appendChild(logo);


    // Title
    const titleElement =
        document.createElement("div");

    titleElement.textContent =
        languages[currentLanguage].title;

    titleElement.style.fontSize = "48px";
    titleElement.style.fontWeight = "600";
    titleElement.style.textAlign = "center";

    titleElement.style.marginBottom = "35px";

    titleElement.style.maxWidth = "850px";

    card.appendChild(titleElement);


    // Month
    const monthElement =
        document.createElement("div");

    const localeMap = {
        en: "en-US",
        es: "es-ES",
        zh: "zh-CN",
        ru: "ru-RU",
        hi: "hi-IN",
        th: "th-TH"
    };

    monthElement.textContent =
        new Intl.DateTimeFormat(
            localeMap[currentLanguage] || "en-US",
            {
                month: "long",
                year: "numeric"
            }
        ).format(new Date());

    monthElement.style.fontSize = "27px";
    monthElement.style.opacity = "0.75";

    monthElement.style.marginBottom = "60px";

    card.appendChild(monthElement);


    // Message
    const messageElement =
        document.createElement("div");

    messageElement.textContent =
        currentMessage;

    messageElement.style.fontSize = "52px";
    messageElement.style.lineHeight = "1.35";

    messageElement.style.fontWeight = "500";

    messageElement.style.textAlign = "center";

    messageElement.style.maxWidth = "850px";

    messageElement.style.textShadow =
        "0 3px 25px rgba(255,255,255,0.25)";

    card.appendChild(messageElement);


    // Small text
    const smallElement =
        document.createElement("div");

    smallElement.textContent =
        languages[currentLanguage].small;

    smallElement.style.fontSize = "26px";

    smallElement.style.opacity = "0.65";

    smallElement.style.textAlign = "center";

    smallElement.style.marginTop = "65px";

    smallElement.style.maxWidth = "700px";

    card.appendChild(smallElement);


    // Brand bottom
    const brand =
        document.createElement("div");

    brand.textContent = "universe139";

    brand.style.position = "absolute";

    brand.style.bottom = "55px";

    brand.style.fontSize = "25px";

    brand.style.opacity = "0.6";

    brand.style.letterSpacing = "4px";

    card.appendChild(brand);


    document.body.appendChild(card);

    return card;
}


// -----------------------------------------------------
// CAPTURE MESSAGE IMAGE
// -----------------------------------------------------

async function captureMessageImage() {

    const html2canvas =
        await loadHtml2Canvas();

    const card =
        createShareCard();

    try {

        if (document.fonts &&
            document.fonts.ready) {

            await document.fonts.ready;
        }

        const canvas =
            await html2canvas(card, {
                width: 1080,
                height: 1350,
                scale: 1,
                backgroundColor: null,
                useCORS: true,
                logging: false
            });

        return canvas;

    } finally {

        if (card &&
            card.parentNode) {

            card.parentNode.removeChild(card);
        }
    }
}


// -----------------------------------------------------
// CREATE IMAGE FILE
// -----------------------------------------------------

async function createMessageImageFile() {

    const canvas =
        await captureMessageImage();

    return new Promise(
        (resolve, reject) => {

            canvas.toBlob(
                function (blob) {

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
                            "universe139-message.png",
                            {
                                type: "image/png"
                            }
                        );

                    resolve(file);
                },
                "image/png"
            );
        }
    );
}


// -----------------------------------------------------
// NATIVE SHARE PICTURE
// -----------------------------------------------------

async function sharePictureNative() {

    if (!currentMessage) {
        alert(
            languages[currentLanguage].reveal
        );

        return;
    }

    try {

        const file =
            await createMessageImageFile();

        if (
            navigator.share &&
            navigator.canShare
        ) {

            let canShareFiles = false;

            try {

                canShareFiles =
                    navigator.canShare({
                        files: [file]
                    });

            } catch (error) {

                canShareFiles = false;
            }

            if (canShareFiles) {

                await navigator.share({
                    title:
                        languages[currentLanguage].title,

                    text:
                        getShareText(),

                    files: [file],

                    url: getShareURL()
                });

                return;
            }
        }


        // Fallback: download image
        const url =
            URL.createObjectURL(file);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            "universe139-message.png";

        document.body.appendChild(a);

        a.click();

        a.remove();

        setTimeout(
            () => URL.revokeObjectURL(url),
            1000
        );

        alert(
            "Your Universe139 picture is ready."
        );

    } catch (error) {

        console.error(
            "Universe139 share picture error:",
            error
        );

        // User cancelled sharing — don't show an error.
        if (
            error &&
            error.name === "AbortError"
        ) {
            return;
        }

        alert(
            "Could not create the picture. Please try again."
        );
    }
}


// -----------------------------------------------------
// SHARE PANEL
// -----------------------------------------------------

function showSharePanel() {

    if (!currentMessage) {
        return;
    }

    const oldPanel =
        document.getElementById(
            "universe139-share-panel"
        );

    if (oldPanel) {
        oldPanel.remove();
    }


    const panel =
        document.createElement("div");

    panel.id =
        "universe139-share-panel";


    panel.style.position = "fixed";
    panel.style.inset = "0";

    panel.style.zIndex = "99999";

    panel.style.background =
        "rgba(0,0,0,0.82)";

    panel.style.display = "flex";

    panel.style.alignItems = "center";
    panel.style.justifyContent = "center";

    panel.style.padding = "20px";


    const box =
        document.createElement("div");

    box.style.width = "min(500px, 100%)";

    box.style.maxHeight = "90vh";

    box.style.overflowY = "auto";

    box.style.background =
        "radial-gradient(circle at top, #45146b, #100519)";

    box.style.border =
        "1px solid rgba(255,255,255,0.2)";

    box.style.borderRadius = "24px";

    box.style.padding = "28px";

    box.style.color = "white";

    box.style.textAlign = "center";


    const heading =
        document.createElement("h2");

    heading.textContent =
        languages[currentLanguage].share;

    heading.style.marginTop = "0";

    box.appendChild(heading);


    // Preview
    const preview =
        document.createElement("div");

    preview.style.padding = "30px 20px";

    preview.style.margin =
        "20px 0";

    preview.style.borderRadius =
        "18px";

    preview.style.background =
        "rgba(255,255,255,0.08)";

    preview.style.fontSize = "20px";

    preview.style.lineHeight = "1.5";

    preview.textContent =
        currentMessage;

    box.appendChild(preview);


    // REAL clickable URL
    const link =
        document.createElement("a");

    link.href =
        getShareURL();

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    link.textContent =
        getShareURL();

    link.style.display = "block";

    link.style.margin = "15px 0 25px";

    link.style.color = "#ffffff";

    link.style.textDecoration = "underline";

    link.style.wordBreak = "break-all";

    box.appendChild(link);


    // Buttons
    const buttons = [

        {
            name: "WhatsApp",
            action: () => {

                const url =
                    "https://wa.me/?text=" +
                    encodeURIComponent(
                        getShareText() +
                        "\n\n" +
                        getShareURL()
                    );

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        },

        {
            name: "Facebook",
            action: () => {

                const url =
                    "https://www.facebook.com/sharer/sharer.php?u=" +
                    encodeURIComponent(
                        getShareURL()
                    ) +
                    "&quote=" +
                    encodeURIComponent(
                        getShareText()
                    );

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        },

        {
            name: "Telegram",
            action: () => {

                const url =
                    "https://t.me/share/url?url=" +
                    encodeURIComponent(
                        getShareURL()
                    ) +
                    "&text=" +
                    encodeURIComponent(
                        getShareText()
                    );

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        },

        {
            name: "Email",
            action: () => {

                const subject =
                    languages[currentLanguage].title;

                const body =
                    getShareText() +
                    "\n\n" +
                    getShareURL();

                window.location.href =
                    "mailto:?subject=" +
                    encodeURIComponent(subject) +
                    "&body=" +
                    encodeURIComponent(body);
            }
        },

        {
            name: "SMS",
            action: () => {

                const body =
                    getShareText() +
                    "\n\n" +
                    getShareURL();

                window.location.href =
                    "sms:?body=" +
                    encodeURIComponent(body);
            }
        },

        {
            name: "LinkedIn",
            action: () => {

                const url =
                    "https://www.linkedin.com/sharing/share-offsite/?url=" +
                    encodeURIComponent(
                        getShareURL()
                    );

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        },

        {
            name: "Reddit",
            action: () => {

                const url =
                    "https://www.reddit.com/submit?url=" +
                    encodeURIComponent(
                        getShareURL()
                    ) +
                    "&title=" +
                    encodeURIComponent(
                        getShareText()
                    );

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        },

        {
            name: "Viber",
            action: () => {

                const url =
                    "viber://forward?text=" +
                    encodeURIComponent(
                        getShareText() +
                        "\n\n" +
                        getShareURL()
                    );

                window.location.href = url;
            }
        },

        {
            name: "Copy Link",
            action: async () => {

                try {

                    await navigator.clipboard.writeText(
                        getShareURL()
                    );

                    alert(
                        "Link copied!"
                    );

                } catch (error) {

                    prompt(
                        "Copy this link:",
                        getShareURL()
                    );
                }
            }
        },

        {
            name: "Open Link",
            action: () => {

                window.open(
                    getShareURL(),
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        },

        {
            name: "Share Picture",
            action: () => {

                sharePictureNative();
            }
        },

        {
            name: "More",
            action: async () => {

                if (
                    navigator.share
                ) {

                    try {

                        await navigator.share({
                            title:
                                languages[currentLanguage].title,

                            text:
                                getShareText(),

                            url:
                                getShareURL()
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

                    alert(
                        "More sharing options are not available in this browser."
                    );
                }
            }
        }
    ];


    const buttonContainer =
        document.createElement("div");

    buttonContainer.style.display =
        "grid";

    buttonContainer.style.gridTemplateColumns =
        "repeat(2, 1fr)";

    buttonContainer.style.gap =
        "10px";


    buttons.forEach(item => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.textContent =
            item.name;

        button.style.padding =
            "13px 10px";

        button.style.borderRadius =
            "12px";

        button.style.border =
            "1px solid rgba(255,255,255,0.2)";

        button.style.background =
            "rgba(255,255,255,0.08)";

        button.style.color =
            "white";

        button.style.cursor =
            "pointer";

        button.style.fontSize =
            "14px";

        button.addEventListener(
            "click",
            item.action
        );

        buttonContainer.appendChild(
            button
        );
    });


    box.appendChild(
        buttonContainer
    );


    // Close
    const close =
        document.createElement("button");

    close.type = "button";

    close.textContent = "Close";

    close.style.marginTop =
        "20px";

    close.style.padding =
        "12px 30px";

    close.style.borderRadius =
        "12px";

    close.style.border =
        "none";

    close.style.cursor =
        "pointer";

    close.addEventListener(
        "click",
        () => panel.remove()
    );

    box.appendChild(close);


    panel.appendChild(box);

    document.body.appendChild(panel);


    panel.addEventListener(
        "click",
        function (event) {

            if (event.target === panel) {
                panel.remove();
            }
        }
    );
}


// -----------------------------------------------------
// COSMIC TORNADO
// -----------------------------------------------------

function createCosmicTornado() {

    if (
        document.getElementById(
            "universe139-cosmic-tornado"
        )
    ) {
        return;
    }

    const tornado =
        document.createElement("div");

    tornado.id =
        "universe139-cosmic-tornado";

    tornado.style.position =
        "fixed";

    tornado.style.inset =
        "0";

    tornado.style.pointerEvents =
        "none";

    tornado.style.zIndex =
        "-1";

    tornado.style.overflow =
        "hidden";


    for (let i = 0; i < 70; i++) {

        const star =
            document.createElement("span");

        const size =
            Math.random() * 3 + 1;

        star.style.position =
            "absolute";

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        star.style.borderRadius =
            "50%";

        star.style.background =
            "white";

        star.style.opacity =
            Math.random() * 0.7 + 0.2;

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animation =
            "universe139StarFloat " +
            (Math.random() * 8 + 5) +
            "s ease-in-out infinite";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        tornado.appendChild(star);
    }


    const style =
        document.createElement("style");

    style.textContent = `

        @keyframes universe139StarFloat {

            0% {
                transform: translate3d(0,0,0)
                           scale(1);
                opacity: .2;
            }

            50% {
                transform: translate3d(
                    ${Math.random() * 30 - 15}px,
                    ${Math.random() * 30 - 15}px,
                    0
                )
                scale(1.4);

                opacity: .9;
            }

            100% {
                transform: translate3d(0,0,0)
                           scale(1);

                opacity: .2;
            }
        }
    `;

    document.head.appendChild(style);

    document.body.appendChild(tornado);
}


// -----------------------------------------------------
// LANGUAGE BUTTONS
// -----------------------------------------------------

function initializeLanguageButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-language]"
        );

    console.log(
        "Universe139 language buttons:",
        buttons.length
    );

    buttons.forEach(button => {

        // Avoid duplicate handlers
        if (
            button.dataset.universe139Bound ===
            "true"
        ) {
            return;
        }

        button.dataset.universe139Bound =
            "true";

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const lang =
                    this.getAttribute(
                        "data-language"
                    );

                console.log(
                    "Universe139 language clicked:",
                    lang
                );

                if (
                    lang &&
                    languages[lang]
                ) {
                    setLanguage(lang);
                } else {

                    console.error(
                        "Invalid language button:",
                        lang
                    );
                }
            }
        );
    });
}


// -----------------------------------------------------
// MAIN BUTTONS
// -----------------------------------------------------

function initializeMainButtons() {

    if (revealBtn) {

        revealBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                revealMessage();
            }
        );
    }


    if (againBtn) {

        againBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                revealMessage();
            }
        );
    }


    if (shareBtn) {

        shareBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showSharePanel();
            }
        );
    }
}


// -----------------------------------------------------
// INITIALIZATION
// -----------------------------------------------------

function initUniverse139() {

    console.log(
        "===================================="
    );

    console.log(
        "UNIVERSE139 STARTING"
    );

    console.log(
        "===================================="
    );


    initializeDOM();

    initializeLanguageButtons();

    initializeMainButtons();

    setLanguage("en");

    createCosmicTornado();

    window.UNIVERSE139_URL =
        getShareURL();


    console.log(
        "Universe139 active URL:",
        getShareURL()
    );

    console.log(
        "Universe139 READY"
    );
}


// -----------------------------------------------------
// MAKE FUNCTIONS AVAILABLE TO HTML
// -----------------------------------------------------

window.setLanguage =
    setLanguage;

window.revealMessage =
    revealMessage;

window.showSharePanel =
    showSharePanel;

window.sharePictureNative =
    sharePictureNative;


// -----------------------------------------------------
// START
// -----------------------------------------------------

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initUniverse139
    );

} else {

    initUniverse139();
}
