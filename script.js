/* =========================================================
   UNIVERSE139 — MESSAGE FROM THE UNIVERSE
   Corrected Hurricane Version
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
   MESSAGES
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
   VARIATIONS
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
let isShowingMessage = false;
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

const languageButtons =
    document.querySelectorAll(".languageBtn");


/* =========================================================
   GENERATE MESSAGES
   ========================================================= */

const generatedMessages = {};

Object.keys(messageTemplates).forEach(language => {

    const base = messageTemplates[language];
    const variations = messageVariations[language];

    const messages = new Set();

    base.forEach(message => {
        messages.add(message);
    });

    for (let i = 0; i < base.length; i++) {

        for (let j = 0; j < variations.length; j++) {

            messages.add(
                `${base[i]} ${variations[j]}`
            );

        }

    }

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

    generatedMessages[language] =
        Array.from(messages).slice(0, 500);

});


/* =========================================================
   GET RANDOM MESSAGE
   ========================================================= */

function getRandomMessage() {

    const messages =
        generatedMessages[currentLanguage];

    if (!messages || messages.length === 0) {
        return "The Universe has a message for you.";
    }

    let message;

    do {

        const randomIndex =
            Math.floor(
                Math.random() * messages.length
            );

        message = messages[randomIndex];

    } while (
        messages.length > 1 &&
        message === lastMessage
    );

    lastMessage = message;

    return message;
}


/* =========================================================
   SHOW MESSAGE
   ========================================================= */

function showMessage() {

    const message = getRandomMessage();

    if (messageText) {

        messageText.textContent = message;

        // IMPORTANT:
        // Force message to be visible
        messageText.style.opacity = "1";
        messageText.style.visibility = "visible";

    }

    if (loading) {
        loading.style.display = "none";
    }

    if (messageBox) {

        messageBox.style.display = "block";
        messageBox.style.visibility = "visible";
        messageBox.style.opacity = "1";

    }

    isShowingMessage = true;

}


/* =========================================================
   FIRST MESSAGE
   ========================================================= */

function revealFirstMessage() {

    if (messageBox) {
        messageBox.style.display = "none";
    }

    if (loading) {

        loading.textContent =
            translations[currentLanguage].loading;

        loading.style.display = "block";

    }

    setTimeout(() => {

        showMessage();

    }, 1500);

}


/* =========================================================
   LANGUAGE SELECTION
   ========================================================= */

function selectLanguage(language) {

    if (!translations[language]) {
        return;
    }

    currentLanguage = language;

    const t = translations[language];

    if (title) {
        title.textContent = t.title;
    }

    if (subtitle) {
        subtitle.textContent = t.subtitle;
    }

    if (revealBtn) {

        revealBtn.textContent =
            t.reveal;

    }

    if (monthText) {
        monthText.textContent =
            t.today;
    }

    if (languageBox) {
        languageBox.style.display = "none";
    }

    if (revealBtn) {

        revealBtn.style.display =
            "inline-block";

        revealBtn.disabled = true;

    }

    isShowingMessage = false;

    revealFirstMessage();

    setTimeout(() => {

        if (revealBtn) {

            revealBtn.disabled = false;

            revealBtn.textContent =
                t.another;

        }

    }, 1900);

}


/* =========================================================
   HURRICANE CSS
   ========================================================= */

function addWindStyles() {

    if (
        document.getElementById(
            "universe139WindStyles"
        )
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "universe139WindStyles";

    style.textContent = `

        .universeWind {
            position: fixed;
            inset: 0;
            z-index: 99999;
            pointer-events: none;
            overflow: hidden;
            background:
                radial-gradient(
                    circle at center,
                    rgba(130,80,220,.18),
                    rgba(0,0,0,.94)
                );
            opacity: 0;
            animation: stormIn .4s forwards;
        }

        .universeWind::before {
            content: "";
            position: absolute;
            width: 160vmax;
            height: 160vmax;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background:
                repeating-radial-gradient(
                    ellipse,
                    transparent 0 40px,
                    rgba(190,150,255,.07) 42px 45px,
                    transparent 48px
                );
            animation: giantSpin 2s linear infinite;
        }

        .windCore {
            position: absolute;
            width: 400px;
            height: 400px;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }

        .windRing {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            border: 2px solid rgba(200,170,255,.4);
            animation: ringSpin 1.2s linear infinite;
        }

        .windRing:nth-child(1) {
            width: 120px;
            height: 120px;
        }

        .windRing:nth-child(2) {
            width: 230px;
            height: 230px;
            border-color: transparent rgba(220,200,255,.5);
            animation-duration: 1.6s;
            animation-direction: reverse;
        }

        .windRing:nth-child(3) {
            width: 360px;
            height: 360px;
            border-color: rgba(150,110,255,.3) transparent;
            animation-duration: 2s;
        }

        .windEye {
            position: absolute;
            width: 45px;
            height: 45px;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            background: radial-gradient(
                circle,
                white,
                rgba(190,150,255,.5),
                transparent 70%
            );
            box-shadow:
                0 0 30px rgba(200,170,255,.9),
                0 0 80px rgba(140,90,255,.7);
            animation: eyePulse .7s infinite alternate;
        }

        .windWords {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 90%;
            text-align: center;
            z-index: 10;
            color: white;
            text-shadow:
                0 0 20px rgba(190,160,255,.9);
            animation: wordsIn .7s .3s both;
        }

        .windEmoji {
            font-size: 55px;
            margin-bottom: 15px;
            animation: emojiSpin 1.5s linear infinite;
        }

        .windMainText {
            font-size: clamp(17px,4vw,30px);
            font-weight: bold;
            letter-spacing: 2px;
            line-height: 1.4;
        }

        .windSubText {
            margin-top: 14px;
            font-size: 12px;
            letter-spacing: 4px;
            opacity: .65;
        }

        .windParticle {
            position: absolute;
            height: 1px;
            background:
                linear-gradient(
                    90deg,
                    transparent,
                    white,
                    rgba(190,150,255,.6),
                    transparent
                );
            opacity: 0;
            animation: particleFly linear infinite;
        }

        body.universe-wind .stars {
            animation-duration: .6s !important;
            transform: scale(1.2);
        }

        body.universe-wind .container {
            filter: blur(3px);
            transform: scale(.97);
        }

        @keyframes stormIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes giantSpin {
            from { transform: translate(-50%,-50%) rotate(0deg); }
            to { transform: translate(-50%,-50%) rotate(360deg); }
        }

        @keyframes ringSpin {
            from {
                transform: translate(-50%,-50%) rotate(0deg);
            }
            to {
                transform: translate(-50%,-50%) rotate(360deg);
            }
        }

        @keyframes eyePulse {
            from { transform: translate(-50%,-50%) scale(.75); }
            to { transform: translate(-50%,-50%) scale(1.2); }
        }

        @keyframes wordsIn {
            from {
                opacity: 0;
                transform: translate(-50%,-50%) scale(.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%,-50%) scale(1);
            }
        }

        @keyframes emojiSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes particleFly {

            0% {
                opacity: 0;
                transform: translateX(-300px);
            }

            15% {
                opacity: .9;
            }

            100% {
                opacity: 0;
                transform: translateX(130vw);
            }
        }

    `;

    document.head.appendChild(style);
}

addWindStyles();


/* =========================================================
   CREATE HURRICANE
   ========================================================= */

function createHurricane() {

    const storm =
        document.createElement("div");

    storm.className =
        "universeWind";

    storm.innerHTML = `

        <div class="windCore">

            <div class="windRing"></div>
            <div class="windRing"></div>
            <div class="windRing"></div>

            <div class="windEye"></div>

        </div>

        <div class="windWords">

            <div class="windEmoji">🌪️</div>

            <div class="windMainText">
                ${translations[currentLanguage].wind}
            </div>

            <div class="windSubText">
                ${translations[currentLanguage].connection}
            </div>

        </div>

    `;

    const particles =
        document.createElement("div");

    for (let i = 0; i < 90; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "windParticle";

        particle.style.width =
            `${40 + Math.random() * 180}px`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.left =
            `${-20 - Math.random() * 50}%`;

        particle.style.animationDuration =
            `${.5 + Math.random() * 1.2}s`;

        particle.style.animationDelay =
            `${Math.random() * 1.5}s`;

        particles.appendChild(particle);

    }

    storm.appendChild(particles);

    document.body.appendChild(storm);

    return storm;
}


/* =========================================================
   HURRICANE — RECEIVE ANOTHER MESSAGE
   ========================================================= */

function receiveAnotherMessage() {

    if (!isShowingMessage) {
        return;
    }

    if (
        revealBtn &&
        revealBtn.disabled
    ) {
        return;
    }

    if (revealBtn) {
        revealBtn.disabled = true;
    }

    if (messageBox) {

        messageBox.style.transition =
            "opacity .25s ease";

        messageBox.style.opacity =
            "0";

    }

    document.body.classList.add(
        "universe-wind"
    );

    const storm =
        createHurricane();

    windTimer =
        setTimeout(() => {

            storm.style.transition =
                "opacity .7s ease";

            storm.style.opacity =
                "0";

            document.body.classList.remove(
                "universe-wind"
            );

            setTimeout(() => {

                storm.remove();

                // THIS IS THE IMPORTANT FIX
                showMessage();

                if (revealBtn) {

                    revealBtn.disabled =
                        false;

                    revealBtn.textContent =
                        translations[
                            currentLanguage
                        ].another;

                }

            }, 700);

        }, 2600);

}


/* =========================================================
   LANGUAGE BUTTON EVENTS
   ========================================================= */

languageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const language =
                button.dataset.language;

            selectLanguage(language);

        }
    );

});


/* =========================================================
   RECEIVE BUTTON
   ========================================================= */

if (revealBtn) {

    revealBtn.addEventListener(
        "click",
        receiveAnotherMessage
    );

}


/* =========================================================
   SHARE
   ========================================================= */

const shareBtn =
    document.getElementById("shareBtn");

if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        async () => {

            const text =
                messageText
                    ? messageText.textContent
                    : "";

            const t =
                translations[currentLanguage];

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

                    const old =
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
                    "Share cancelled."
                );

            }

        }
    );

}


/* =========================================================
   INITIAL STATE
   ========================================================= */

if (revealBtn) {

    revealBtn.style.display =
        "none";

}

if (loading) {

    loading.style.display =
        "none";

}

if (messageBox) {

    messageBox.style.display =
        "none";

    messageBox.style.opacity =
        "0";

}

console.log(
    "Universe139 ready:",
    Object.keys(generatedMessages).map(
        lang =>
            `${lang}: ${generatedMessages[lang].length} messages`
    )
);
