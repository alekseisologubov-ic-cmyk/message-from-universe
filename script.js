// ==========================================
// UNIVERSE139 — MESSAGE FROM THE UNIVERSE
// COMPLETE WORKING SCRIPT
// FIXED MESSAGE REVEAL
// FIXED: duplicate/orphaned code block in submitSubscription()
//        that broke the whole script with a syntax error
// ==========================================

const UNIVERSE139_URL =
  "https://message-from-universe.vercel.app/";

// Human-friendly version of the link (no protocol, no trailing slash)
// used anywhere we display the URL as text instead of a real <a href>.
function getDisplayURL() {

  return UNIVERSE139_URL
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

}

// Detects Facebook's (and other apps') own in-app browser — the
// webview that opens when someone taps a link *inside* the
// Facebook/Instagram/Messenger app rather than a real browser tab.
// These in-app browsers deliberately sandbox window.open(), the
// Web Share API, and sometimes the clipboard for security reasons,
// so sharing can silently fail there no matter how the code is
// written. This lets us detect it and tell the person how to get
// around it, instead of a share button that just does nothing.
function isInAppBrowser() {

  const ua =
    navigator.userAgent || "";

  return /FBAN|FBAV|FB_IAB|Instagram|Line\/|MicroMessenger/i.test(
    ua
  );

}


// ==========================================
// TRANSLATIONS
// ==========================================

const translations = {

  en: {
    chooseLanguage: "Choose your language",
    title: "A Message From The Universe",
    subtitle: "Your message is waiting...",
    reveal: "Reveal My Message",
    loading: "The Universe is preparing your message...",
    month: "Your Message",
    again: "Receive Another Message",
    share: "Share My Message",

    shareTitle: "Share Your Universe139 Message",
    close: "Close",
    copyMessage: "Copy Message",
    copyLink: "Copy Link",
    more: "More...",
    copied: "Copied!",
    copiedShare: "Message & link copied! Paste it in the app to share.",
    noMessage: "Reveal your message first.",
    inAppBrowserNotice: "You're inside an app browser — tap ⋯ or ⋮ and choose \"Open in Browser\" for full sharing options.",
    shareInstructions:
      "Choose where you want to share your message.",

    shareLink:
      "👆 Universe139 — Press here to see your message for today",

    subscribeTitle: "✨ Get a Message Every Day",
    subscribeText: "Receive a new message from the Universe every day.",
    subscribeButton: "Subscribe",
    subscribeFormTitle: "✉️ Get Your Daily Message",
    subscribeFormText: "Enter your email and receive a new message from the Universe every day.",
    subscribeEmailPlaceholder: "Your email address",
    subscribeSubmit: "Start Daily Messages",
    subscribeClose: "Close",
    subscribeSuccess: "✨ You are subscribed! Your daily messages will begin soon.",
    subscribeError: "Please enter a valid email address and try again.",
    subscribeAlready: "You are already subscribed. We will keep sending your daily messages.",
    subscribeNote: "Free for now. You can unsubscribe at any time."
  },

  es: {
    chooseLanguage: "Elige tu idioma",
    title: "Un Mensaje del Universo",
    subtitle: "Tu mensaje te está esperando...",
    reveal: "Revelar Mi Mensaje",
    loading: "El Universo está preparando tu mensaje...",
    month: "Tu Mensaje",
    again: "Recibir Otro Mensaje",
    share: "Compartir Mi Mensaje",

    shareTitle:
      "Comparte tu mensaje de Universe139",

    close: "Cerrar",
    copyMessage: "Copiar mensaje",
    copyLink: "Copiar enlace",
    more: "Más...",
    copied: "¡Copiado!",
    copiedShare: "¡Mensaje y enlace copiados! Pégalo en la app para compartir.",
    noMessage: "Primero revela tu mensaje.",
    inAppBrowserNotice: "Estás dentro del navegador de una app — toca ⋯ o ⋮ y elige \"Abrir en el navegador\" para todas las opciones de compartir.",

    shareInstructions:
      "Elige dónde quieres compartir tu mensaje.",

    shareLink:
      "👆 Universe139 — Pulsa aquí para recibir tu mensaje de hoy",

    subscribeTitle: "✨ Recibe un mensaje cada día",
    subscribeText: "Recibe un nuevo mensaje del Universo cada día.",
    subscribeButton: "Suscribirse",
    subscribeFormTitle: "✉️ Recibe tu mensaje diario",
    subscribeFormText: "Introduce tu correo y recibe un nuevo mensaje del Universo cada día.",
    subscribeEmailPlaceholder: "Tu correo electrónico",
    subscribeSubmit: "Activar mensajes diarios",
    subscribeClose: "Cerrar",
    subscribeSuccess: "✨ ¡Ya estás suscrito! Tus mensajes diarios comenzarán pronto.",
    subscribeError: "Introduce un correo electrónico válido e inténtalo de nuevo.",
    subscribeAlready: "Ya estás suscrito. Seguiremos enviando tus mensajes diarios.",
    subscribeNote: "Gratis por ahora. Puedes cancelar la suscripción cuando quieras."
  },

  zh: {
    chooseLanguage: "选择你的语言",
    title: "来自宇宙的讯息",
    subtitle: "你的讯息正在等待你...",
    reveal: "揭示我的讯息",
    loading: "宇宙正在为你准备讯息...",
    month: "你的讯息",
    again: "再收到一条讯息",
    share: "分享我的讯息",

    shareTitle:
      "分享你的 Universe139 讯息",

    close: "关闭",
    copyMessage: "复制讯息",
    copyLink: "复制链接",
    more: "更多...",
    copied: "已复制！",
    copiedShare: "讯息和链接已复制！请粘贴到应用中进行分享。",
    noMessage: "请先揭示你的讯息。",
    inAppBrowserNotice: "你正在应用内浏览器中 — 点击 ⋯ 或 ⋮ 并选择「在浏览器中打开」以使用完整的分享功能。",

    shareInstructions:
      "选择你想分享讯息的方式。",

    shareLink:
      "👆 Universe139 — 点击这里查看你今天的宇宙讯息",

    subscribeTitle: "✨ 每天收到一条讯息",
    subscribeText: "每天收到一条来自宇宙的新讯息。",
    subscribeButton: "订阅",
    subscribeFormTitle: "✉️ 每天收到你的讯息",
    subscribeFormText: "输入你的邮箱，每天收到一条来自宇宙的新讯息。",
    subscribeEmailPlaceholder: "你的电子邮箱",
    subscribeSubmit: "开始每日讯息",
    subscribeClose: "关闭",
    subscribeSuccess: "✨ 你已经订阅！你的每日讯息很快就会开始。",
    subscribeError: "请输入有效的电子邮箱地址，然后重试。",
    subscribeAlready: "你已经订阅。我们会继续发送你的每日讯息。",
    subscribeNote: "目前免费。你可以随时取消订阅。"
  },

  ru: {
    chooseLanguage: "Выберите язык",
    title: "Послание от Вселенной",
    subtitle: "Ваше послание ждёт вас...",
    reveal: "Открыть моё послание",
    loading: "Вселенная готовит ваше послание...",
    month: "Ваше послание",
    again: "Получить другое послание",
    share: "Поделиться моим посланием",

    shareTitle:
      "Поделитесь своим посланием Universe139",

    close: "Закрыть",
    copyMessage: "Копировать послание",
    copyLink: "Копировать ссылку",
    more: "Ещё...",
    copied: "Скопировано!",
    copiedShare: "Послание и ссылка скопированы! Вставьте их в приложении, чтобы поделиться.",
    noMessage: "Сначала откройте своё послание.",
    inAppBrowserNotice: "Вы находитесь во встроенном браузере приложения — нажмите ⋯ или ⋮ и выберите «Открыть в браузере» для всех вариантов обмена.",

    shareInstructions:
      "Выберите, где вы хотите поделиться своим посланием.",

    shareLink:
      "👆 Universe139 — Нажми здесь, чтобы получить своё послание на сегодня",

    subscribeTitle: "✨ Получай послание каждый день",
    subscribeText: "Получай новое послание от Вселенной каждый день.",
    subscribeButton: "Подписаться",
    subscribeFormTitle: "✉️ Получай своё ежедневное послание",
    subscribeFormText: "Введи свой email и получай новое послание от Вселенной каждый день.",
    subscribeEmailPlaceholder: "Ваш email",
    subscribeSubmit: "Включить ежедневные сообщения",
    subscribeClose: "Закрыть",
    subscribeSuccess: "✨ Ты подписался! Ежедневные послания скоро начнут приходить.",
    subscribeError: "Пожалуйста, введи правильный email и попробуй ещё раз.",
    subscribeAlready: "Ты уже подписан. Мы продолжим отправлять твои ежедневные послания.",
    subscribeNote: "Пока бесплатно. Ты можешь отказаться от подписки в любое время."
  },

  hi: {
    chooseLanguage: "अपनी भाषा चुनें",
    title: "ब्रह्मांड का एक संदेश",
    subtitle: "आपका संदेश आपका इंतज़ार कर रहा है...",
    reveal: "मेरा संदेश देखें",
    loading: "ब्रह्मांड आपके लिए संदेश तैयार कर रहा है...",
    month: "आपका संदेश",
    again: "एक और संदेश प्राप्त करें",
    share: "मेरा संदेश साझा करें",

    shareTitle:
      "अपना Universe139 संदेश साझा करें",

    close: "बंद करें",
    copyMessage: "संदेश कॉपी करें",
    copyLink: "लिंक कॉपी करें",
    more: "और...",
    copied: "कॉपी हो गया!",
    copiedShare: "संदेश और लिंक कॉपी हो गए! शेयर करने के लिए ऐप में पेस्ट करें।",
    noMessage: "पहले अपना संदेश देखें।",
    inAppBrowserNotice: "आप ऐप के इन-बिल्ट ब्राउज़र में हैं — पूरी शेयरिंग सुविधाओं के लिए ⋯ या ⋮ दबाएं और \"ब्राउज़र में खोलें\" चुनें।",

    shareInstructions:
      "चुनें कि आप अपना संदेश कहाँ साझा करना चाहते हैं।",

    shareLink:
      "👆 Universe139 — आज का अपना संदेश देखने के लिए यहां दबाएं",

    subscribeTitle: "✨ हर दिन एक संदेश पाएं",
    subscribeText: "हर दिन ब्रह्मांड की ओर से एक नया संदेश पाएं।",
    subscribeButton: "सब्सक्राइब करें",
    subscribeFormTitle: "✉️ हर दिन अपना संदेश पाएं",
    subscribeFormText: "अपना ईमेल दर्ज करें और हर दिन ब्रह्मांड की ओर से एक नया संदेश पाएं।",
    subscribeEmailPlaceholder: "आपका ईमेल",
    subscribeSubmit: "दैनिक संदेश शुरू करें",
    subscribeClose: "बंद करें",
    subscribeSuccess: "✨ आपने सदस्यता ले ली है! आपके दैनिक संदेश जल्द शुरू होंगे।",
    subscribeError: "कृपया सही ईमेल दर्ज करें और फिर से प्रयास करें।",
    subscribeAlready: "आप पहले से सदस्य हैं। हम आपके दैनिक संदेश भेजते रहेंगे।",
    subscribeNote: "अभी मुफ्त है। आप कभी भी सदस्यता समाप्त कर सकते हैं।"
  },

  th: {
    chooseLanguage: "เลือกภาษาของคุณ",
    title: "ข้อความจากจักรวาล",
    subtitle: "ข้อความของคุณกำลังรอคุณอยู่...",
    reveal: "เปิดข้อความของฉัน",
    loading: "จักรวาลกำลังเตรียมข้อความสำหรับคุณ...",
    month: "ข้อความของคุณ",
    again: "รับข้อความใหม่",
    share: "แชร์ข้อความของฉัน",

    shareTitle:
      "แชร์ข้อความ Universe139 ของคุณ",

    close: "ปิด",
    copyMessage: "คัดลอกข้อความ",
    copyLink: "คัดลอกลิงก์",
    more: "เพิ่มเติม...",
    copied: "คัดลอกแล้ว!",
    copiedShare: "คัดลอกข้อความและลิงก์แล้ว! วางในแอปเพื่อแชร์ได้เลย",
    noMessage: "กรุณาเปิดข้อความของคุณก่อน",
    inAppBrowserNotice: "คุณกำลังอยู่ในเบราว์เซอร์ในแอป — แตะ ⋯ หรือ ⋮ แล้วเลือก \"เปิดในเบราว์เซอร์\" เพื่อใช้ตัวเลือกการแชร์ทั้งหมด",

    shareInstructions:
      "เลือกสถานที่ที่คุณต้องการแชร์ข้อความของคุณ",

    shareLink:
      "👆 Universe139 — กดที่นี่เพื่อดูข้อความของคุณสำหรับวันนี้",

    subscribeTitle: "✨ รับข้อความจากจักรวาลทุกวัน",
    subscribeText: "รับข้อความใหม่จากจักรวาลทุกวัน",
    subscribeButton: "สมัครสมาชิก",
    subscribeFormTitle: "✉️ รับข้อความประจำวันของคุณ",
    subscribeFormText: "กรอกอีเมลของคุณและรับข้อความใหม่จากจักรวาลทุกวัน",
    subscribeEmailPlaceholder: "อีเมลของคุณ",
    subscribeSubmit: "เริ่มรับข้อความรายวัน",
    subscribeClose: "ปิด",
    subscribeSuccess: "✨ คุณสมัครสมาชิกแล้ว! ข้อความประจำวันจะเริ่มส่งให้คุณเร็วๆ นี้",
    subscribeError: "กรุณากรอกอีเมลที่ถูกต้องแล้วลองอีกครั้ง",
    subscribeAlready: "คุณสมัครสมาชิกอยู่แล้ว เราจะส่งข้อความประจำวันให้คุณต่อไป",
    subscribeNote: "ฟรีในตอนนี้ คุณสามารถยกเลิกได้ทุกเมื่อ"
  }

};


// ==========================================
// MESSAGE DATABASE
// ==========================================

const messageTemplates = {

  en: [
    "Trust the feeling that keeps returning to your heart.",
    "Something beautiful is beginning to unfold in your life.",
    "You are closer to your dream than you realize.",
    "A new opportunity will appear when you least expect it.",
    "Let go of what no longer belongs in your future.",
    "Your patience is about to be rewarded.",
    "The answer you are looking for is already within you.",
    "A positive change is moving toward you.",
    "Your energy is attracting something wonderful.",
    "Do not be afraid to begin again.",
    "Someone is thinking about you with kindness.",
    "Your next chapter will be better than the last.",
    "A financial opportunity may soon find you.",
    "Trust the timing of your life.",
    "You are exactly where you need to be.",
    "Your intuition knows the way forward.",
    "A surprise may bring you unexpected happiness.",
    "Your hard work will not remain unnoticed.",
    "Peace is coming after a period of uncertainty.",
    "The universe is opening a new door for you."
  ],

  es: [
    "Confía en ese sentimiento que sigue regresando a tu corazón.",
    "Algo hermoso está comenzando a desarrollarse en tu vida.",
    "Estás más cerca de tu sueño de lo que imaginas.",
    "Una nueva oportunidad aparecerá cuando menos lo esperes.",
    "Deja ir lo que ya no pertenece a tu futuro.",
    "Tu paciencia está a punto de ser recompensada.",
    "La respuesta que buscas ya está dentro de ti.",
    "Un cambio positivo se está acercando a ti.",
    "Tu energía está atrayendo algo maravilloso.",
    "No tengas miedo de comenzar de nuevo.",
    "Alguien está pensando en ti con cariño.",
    "Tu próximo capítulo será mejor que el anterior.",
    "Una oportunidad financiera puede llegar pronto.",
    "Confía en el momento de tu vida.",
    "Estás exactamente donde necesitas estar.",
    "Tu intuición conoce el camino.",
    "Una sorpresa puede traer felicidad inesperada.",
    "Tu esfuerzo no pasará desapercibido.",
    "La paz llegará después de un período de incertidumbre.",
    "El universo está abriendo una nueva puerta para ti."
  ],

  zh: [
    "相信那个不断回到你心里的感觉。",
    "美好的事情正在你的生活中慢慢展开。",
    "你比想象中更接近自己的梦想。",
    "一个新的机会会在你最意想不到的时候出现。",
    "放下那些已经不属于你未来的事情。",
    "你的耐心很快就会得到回报。",
    "你寻找的答案其实一直都在你的心里。",
    "一个积极的改变正在向你靠近。",
    "你的能量正在吸引美好的事物。",
    "不要害怕重新开始。",
    "有人正在带着善意想念你。",
    "你的下一章会比上一章更加美好。",
    "一个财务上的机会可能很快出现。",
    "相信属于你的人生时机。",
    "你现在正处在应该在的位置。",
    "你的直觉知道前进的方向。",
    "一个惊喜可能会带给你意想不到的快乐。",
    "你的努力不会被忽视。",
    "经历不确定之后，平静正在到来。",
    "宇宙正在为你打开一扇新的门。"
  ],

  ru: [
    "Доверься тому чувству, которое снова возвращается в твоё сердце.",
    "Что-то прекрасное начинает происходить в твоей жизни.",
    "Ты ближе к своей мечте, чем думаешь.",
    "Новая возможность появится тогда, когда ты меньше всего её ожидаешь.",
    "Отпусти то, чему больше нет места в твоём будущем.",
    "Твоё терпение скоро будет вознаграждено.",
    "Ответ, который ты ищешь, уже находится внутри тебя.",
    "Позитивные перемены движутся навстречу тебе.",
    "Твоя энергия притягивает что-то прекрасное.",
    "Не бойся начать всё сначала.",
    "Кто-то думает о тебе с добротой.",
    "Твоя следующая глава будет лучше предыдущей.",
    "Скоро перед тобой может открыться финансовая возможность.",
    "Доверься времени своей жизни.",
    "Ты находишься именно там, где должен быть.",
    "Твоя интуиция знает правильный путь.",
    "Неожиданный сюрприз может принести тебе счастье.",
    "Твои усилия не останутся незамеченными.",
    "После периода неопределённости приходит спокойствие.",
    "Вселенная открывает перед тобой новую дверь."
  ],

  hi: [
    "उस एहसास पर भरोसा करें जो बार-बार आपके दिल में लौटता है।",
    "आपके जीवन में कुछ सुंदर शुरू होने वाला है।",
    "आप अपने सपने के जितना सोचते हैं उससे अधिक करीब हैं।",
    "एक नया अवसर तब आएगा जब आप उसकी उम्मीद सबसे कम करेंगे।",
    "जो आपके भविष्य का हिस्सा नहीं है उसे जाने दें।",
    "आपके धैर्य का फल जल्द मिलने वाला है।",
    "जिस उत्तर की आप तलाश कर रहे हैं वह आपके भीतर ही है।",
    "एक सकारात्मक बदलाव आपकी ओर बढ़ रहा है।",
    "आपकी ऊर्जा किसी अद्भुत चीज़ को आकर्षित कर रही है।",
    "फिर से शुरुआत करने से मत डरिए।",
    "कोई आपके बारे में अच्छे भाव से सोच रहा है।",
    "आपका अगला अध्याय पिछले अध्याय से बेहतर होगा।",
    "जल्द ही आर्थिक अवसर आपके सामने आ सकता है।",
    "अपने जीवन के सही समय पर भरोसा करें।",
    "आप बिल्कुल वहीं हैं जहाँ आपको होना चाहिए।",
    "आपकी अंतर्ज्ञान आपको सही दिशा दिखा रही है।",
    "एक आश्चर्य आपको अप्रत्याशित खुशी दे सकता है।",
    "आपकी मेहनत अनदेखी नहीं जाएगी।",
    "अनिश्चितता के बाद शांति आने वाली है।",
    "ब्रह्मांड आपके लिए एक नया दरवाज़ा खोल रहा है।"
  ],

  th: [
    "เชื่อในความรู้สึกที่ยังคงกลับมาในหัวใจของคุณ",
    "สิ่งสวยงามกำลังเริ่มเกิดขึ้นในชีวิตของคุณ",
    "คุณใกล้ความฝันมากกว่าที่คุณคิด",
    "โอกาสใหม่จะปรากฏขึ้นเมื่อคุณคาดไม่ถึง",
    "ปล่อยสิ่งที่ไม่เหมาะกับอนาคตของคุณอีกต่อไป",
    "ความอดทนของคุณกำลังจะได้รับรางวัล",
    "คำตอบที่คุณกำลังมองหาอยู่ภายในตัวคุณแล้ว",
    "การเปลี่ยนแปลงในทางที่ดีกำลังเข้ามาหาคุณ",
    "พลังของคุณกำลังดึงดูดสิ่งมหัศจรรย์",
    "อย่ากลัวที่จะเริ่มต้นใหม่",
    "มีใครบางคนกำลังคิดถึงคุณด้วยความปรารถนาดี",
    "บทต่อไปของชีวิตจะดีกว่าบทที่ผ่านมา",
    "โอกาสทางการเงินอาจกำลังเข้ามาหาคุณ",
    "เชื่อในจังหวะเวลาของชีวิต",
    "คุณอยู่ในที่ที่คุณควรอยู่",
    "สัญชาตญาณของคุณรู้ว่าควรเดินไปทางไหน",
    "เซอร์ไพรส์บางอย่างอาจนำความสุขที่ไม่คาดคิดมาให้",
    "ความพยายามของคุณจะไม่ถูกมองข้าม",
    "ความสงบกำลังมาหลังจากช่วงเวลาแห่งความไม่แน่นอน",
    "จักรวาลกำลังเปิดประตูบานใหม่ให้คุณ"
  ]

};


// ==========================================
// APPLICATION STATE
// ==========================================

let currentLanguage = "en";
let lastMessage = "";
let isRevealing = false;


// ==========================================
// DOM REFERENCES
// ==========================================

let languageBox;
let chooseLanguage;
let title;
let subtitle;
let revealBtn;
let loading;
let loadingText;
let crystalBallWrap;
let ballHurricane;
let messageBox;
let month;
let message;
let smallText;
let againBtn;
let shareBtn;
let subscribeBox;
let subscribeButton;


// ==========================================
// INITIALIZE DOM
// ==========================================

function initializeDOM() {

  languageBox =
    document.getElementById("languageBox");

  chooseLanguage =
    document.getElementById("chooseLanguage");

  title =
    document.getElementById("title");

  subtitle =
    document.getElementById("subtitle");

  revealBtn =
    document.getElementById("revealBtn");

  loading =
    document.getElementById("loading");

  loadingText =
    document.getElementById("loadingText");

  crystalBallWrap =
    document.getElementById("crystalBallWrap");

  ballHurricane =
    document.getElementById("ballHurricane");

  messageBox =
    document.getElementById("messageBox");

  month =
    document.getElementById("month");

  message =
    document.getElementById("message");

  smallText =
    document.getElementById("smallText");

  againBtn =
    document.getElementById("againBtn");

  shareBtn =
    document.getElementById("shareBtn");

}


// ==========================================
// SAFE HIDDEN HELPERS
// ==========================================

function hideElement(element) {

  if (element) {
    element.classList.add("hidden");
  }

}


function showElement(element) {

  if (element) {
    element.classList.remove("hidden");
  }

}


// ==========================================
// LANGUAGE
// FIX: slightly longer delay + safe reveal
// ==========================================

function selectLanguage(language) {

  if (!translations[language]) {
    language = "en";
  }

  currentLanguage = language;

  lastMessage = "";

  const t =
    translations[currentLanguage];

  if (chooseLanguage) {
    chooseLanguage.textContent =
      t.chooseLanguage;
  }

  if (title) {
    title.textContent =
      t.title;
  }

  if (subtitle) {
    subtitle.textContent =
      t.subtitle;
  }

  if (revealBtn) {
    revealBtn.textContent =
      t.reveal;
  }

  if (loadingText) {
    loadingText.textContent =
      t.loading;
  }

  if (month) {
    month.textContent =
      t.month;
  }

  if (againBtn) {
    againBtn.textContent =
      t.again;
  }

  if (shareBtn) {
    shareBtn.textContent =
      t.share;
  }

  updateSubscriptionText();

  hideElement(languageBox);
  showElement(revealBtn);

  /*
    FIX:
    Give the DOM a moment to finish the language
    transition before starting the reveal.
  */

  window.setTimeout(() => {

    revealMessage();

  }, 600);

}


// ==========================================
// RANDOM MESSAGE
// ==========================================

function getRandomMessage() {

  const messages =
    messageTemplates[currentLanguage];

  if (
    !Array.isArray(messages) ||
    messages.length === 0
  ) {
    return "";
  }

  if (messages.length === 1) {

    lastMessage =
      messages[0];

    return messages[0];

  }

  let newMessage = "";

  let attempts = 0;

  do {

    const randomIndex =
      Math.floor(
        Math.random() * messages.length
      );

    newMessage =
      messages[randomIndex];

    attempts++;

  } while (
    newMessage === lastMessage &&
    attempts < 20
  );

  lastMessage =
    newMessage;

  return newMessage;
}


// ==========================================
// COSMIC TORNADO
// ==========================================

function createWindEffect() {

  const oldEffect =
    document.getElementById(
      "universeWind"
    );

  if (oldEffect) {
    oldEffect.remove();
  }

  const tornado =
    document.createElement("div");

  tornado.id =
    "universeWind";

  tornado.innerHTML = `

    <div class="tornadoUniverseGlow"></div>

    <div class="tornadoCore">

      ${Array.from(
        { length: 10 },
        (_, i) =>
          `<div class="tornadoRing ring${i + 1}"></div>`
      ).join("")}

      <div class="tornadoEye"></div>

    </div>

    <div class="tornadoDust">

      ${Array.from(
        { length: 40 },
        (_, i) =>
          `<span class="dust${i + 1}"></span>`
      ).join("")}

    </div>

    <div class="tornadoMist mist1"></div>
    <div class="tornadoMist mist2"></div>
    <div class="tornadoMist mist3"></div>

  `;

  document.body.appendChild(tornado);


  if (
    !document.getElementById(
      "universe139TornadoCSS"
    )
  ) {

    const style =
      document.createElement("style");

    style.id =
      "universe139TornadoCSS";

    let ringCSS = "";

    for (let i = 1; i <= 10; i++) {

      const direction =
        i % 2 === 0
          ? -1
          : 1;

      ringCSS += `

        .ring${i} {

          animation:
            universeRing${i}
            ${1.7 + i * 0.08}s
            linear
            forwards;

        }

        @keyframes universeRing${i} {

          0% {

            opacity: 0;

            width: 8vw;
            height: 3vw;

            transform:
              translate(-50%, -50%)
              rotateX(68deg)
              rotateZ(0deg)
              scale(.15);

          }

          18% {
            opacity: .85;
          }

          55% {
            opacity: .7;
          }

          100% {

            opacity: 0;

            width: ${100 + i * 2}vw;
            height: ${25 + i * .5}vw;

            transform:
              translate(-50%, -50%)
              rotateX(68deg)
              rotateZ(${direction * (850 + i * 55)}deg)
              scale(1);

          }

        }

      `;

    }


    let dustCSS = "";

    for (let i = 1; i <= 40; i++) {

      const angle =
        i * 37;

      const distance =
        550 + (i % 7) * 35;

      const rotation =
        800 + (i % 9) * 80;

      dustCSS += `

        .dust${i} {

          animation:
            universeDust${i}
            ${1.8 + (i % 7) * .12}s
            linear
            ${(i % 12) * .05}s
            forwards;

        }

        @keyframes universeDust${i} {

          0% {

            opacity: 0;

            transform:
              rotate(${angle}deg)
              translateX(${distance}px)
              scale(.15);

          }

          18% {
            opacity: .9;
          }

          65% {

            opacity: .7;

            transform:
              rotate(${angle + 480}deg)
              translateX(${110 + (i % 5) * 15}px)
              scale(1.2);

          }

          100% {

            opacity: 0;

            transform:
              rotate(${angle + rotation}deg)
              translateX(4px)
              scale(.03);

          }

        }

      `;

    }


    style.textContent = `

      #universeWind {

        position: fixed;
        inset: 0;

        z-index: 9999;

        pointer-events: none;

        overflow: hidden;

        perspective: 1200px;

        background:
          radial-gradient(
            circle at center,
            rgba(100,50,190,.18),
            rgba(30,10,70,.08) 40%,
            transparent 75%
          );

        animation:
          tornadoFade
          2.9s
          ease-out
          forwards;

      }


      .tornadoUniverseGlow {

        position: absolute;

        left: 50%;
        top: 50%;

        width: 10vw;
        height: 10vw;

        min-width: 100px;
        min-height: 100px;

        border-radius: 50%;

        transform:
          translate(-50%, -50%)
          scale(.1);

        background:
          radial-gradient(
            circle,
            rgba(255,255,255,1) 0%,
            rgba(205,160,255,.8) 12%,
            rgba(130,60,255,.45) 32%,
            rgba(70,20,160,.15) 55%,
            transparent 75%
          );

        box-shadow:
          0 0 35px rgba(255,255,255,.9),
          0 0 100px rgba(180,100,255,.9),
          0 0 220px rgba(100,40,255,.6);

        animation:
          universeCoreExplosion
          2.6s
          ease-out
          forwards;

      }


      .tornadoCore {

        position: absolute;

        left: 50%;
        top: 50%;

        width: 100vw;
        height: 100vh;

        transform:
          translate(-50%, -50%)
          scale(.08);

        transform-style:
          preserve-3d;

        animation:
          tornadoExpand
          2.7s
          cubic-bezier(.12,.65,.15,1)
          forwards;

      }


      .tornadoRing {

        position: absolute;

        left: 50%;
        top: 50%;

        width: 15vw;
        height: 15vw;

        min-width: 120px;
        min-height: 120px;

        border-radius: 50%;

        transform-style:
          preserve-3d;

        border:
          3px solid
          rgba(220,180,255,.42);

        box-shadow:
          0 0 15px rgba(200,140,255,.55),
          0 0 40px rgba(130,60,255,.35),
          inset 0 0 20px rgba(255,255,255,.1);

        opacity: 0;

        filter:
          blur(.7px);

      }


      .tornadoEye {

        position: absolute;

        left: 50%;
        top: 50%;

        width: 18vw;
        height: 18vw;

        min-width: 130px;
        min-height: 130px;

        border-radius: 50%;

        transform:
          translate(-50%, -50%);

        background:
          radial-gradient(
            circle,
            rgba(255,255,255,.98) 0%,
            rgba(210,170,255,.8) 8%,
            rgba(140,70,255,.4) 25%,
            rgba(50,10,120,.12) 50%,
            transparent 70%
          );

        box-shadow:
          0 0 30px rgba(255,255,255,.9),
          0 0 80px rgba(190,110,255,.8),
          0 0 160px rgba(100,30,255,.6);

        animation:
          eyePulse
          2.5s
          ease-out
          forwards;

      }


      .tornadoDust {

        position: absolute;

        inset: 0;

        transform-style:
          preserve-3d;

      }


      .tornadoDust span {

        position: absolute;

        left: 50%;
        top: 50%;

        width: 5px;
        height: 5px;

        border-radius: 50%;

        background: white;

        box-shadow:
          0 0 10px
          rgba(220,180,255,.95);

        opacity: 0;

      }


      .tornadoMist {

        position: absolute;

        left: 50%;
        top: 50%;

        border-radius: 50%;

        transform:
          translate(-50%, -50%);

        filter:
          blur(30px);

        background:
          radial-gradient(
            ellipse,
            rgba(180,110,255,.22),
            rgba(100,40,200,.08),
            transparent 70%
          );

        opacity: 0;

      }


      .mist1 {

        width: 75vw;
        height: 20vw;

        animation:
          mistRotation
          2.5s
          ease-out
          forwards;

      }


      .mist2 {

        width: 55vw;
        height: 15vw;

        animation:
          mistRotation
          2.2s
          ease-out
          .15s
          forwards;

      }


      .mist3 {

        width: 38vw;
        height: 11vw;

        animation:
          mistRotation
          2s
          ease-out
          .3s
          forwards;

      }


      @keyframes tornadoExpand {

        0% {

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(.05)
            rotate(0deg);

        }

        12% {
          opacity: 1;
        }

        35% {

          transform:
            translate(-50%, -50%)
            scale(.35)
            rotate(90deg);

        }

        58% {

          transform:
            translate(-50%, -50%)
            scale(.8)
            rotate(260deg);

        }

        78% {

          transform:
            translate(-50%, -50%)
            scale(1.5)
            rotate(540deg);

        }

        100% {

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(3.8)
            rotate(900deg);

        }

      }


      @keyframes eyePulse {

        0% {

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(.1);

        }

        18% {
          opacity: 1;
        }

        45% {

          transform:
            translate(-50%, -50%)
            scale(.8);

        }

        70% {

          transform:
            translate(-50%, -50%)
            scale(1.4);

        }

        100% {

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(4);

        }

      }


      @keyframes mistRotation {

        0% {

          opacity: 0;

          transform:
            translate(-50%, -50%)
            rotate(0deg)
            scale(.1);

        }

        20% {
          opacity: .8;
        }

        60% {

          opacity: .55;

          transform:
            translate(-50%, -50%)
            rotate(600deg)
            scale(1.5);

        }

        100% {

          opacity: 0;

          transform:
            translate(-50%, -50%)
            rotate(1200deg)
            scale(3);

        }

      }


      @keyframes universeCoreExplosion {

        0% {

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(.05);

        }

        18% {
          opacity: 1;
        }

        48% {

          transform:
            translate(-50%, -50%)
            scale(1);

        }

        75% {

          transform:
            translate(-50%, -50%)
            scale(2);

        }

        100% {

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(5);

        }

      }


      @keyframes tornadoFade {

        0% {
          opacity: 0;
        }

        10% {
          opacity: 1;
        }

        72% {
          opacity: 1;
        }

        100% {
          opacity: 0;
        }

      }


      ${ringCSS}

      ${dustCSS}

    `;

    document.head.appendChild(style);

  }


  window.setTimeout(() => {

    if (tornado.parentNode) {
      tornado.remove();
    }

  }, 3100);

}


// ==========================================
// CONTAINED BALL HURRICANE
//
// A smaller, clipped version of the same 3D wind
// effect, running INSIDE the crystal ball itself
// (overflow:hidden + border-radius:50% on
// #ballSphere naturally clips it to the sphere).
// This is what makes the message look like it's
// swirling into existence inside the glass ball,
// with a floating, weightless, 3D feel — the
// rotateX() tilt gives the rings their elliptical,
// "seen through glass" perspective.
// ==========================================

function createBallHurricane() {

  if (!ballHurricane) {
    return;
  }

  ballHurricane.innerHTML = "";

  const RING_COUNT = 6;
  const DUST_COUNT = 18;

  let inner = `<div class="ballVortexCore"></div>`;

  for (let i = 1; i <= RING_COUNT; i++) {
    inner += `<div class="ballRing bring${i}"></div>`;
  }

  for (let i = 1; i <= DUST_COUNT; i++) {
    inner += `<span class="ballDust bdust${i}"></span>`;
  }

  ballHurricane.innerHTML = inner;

  if (!document.getElementById("universe139BallHurricaneCSS")) {

    const style = document.createElement("style");
    style.id = "universe139BallHurricaneCSS";

    let ringCSS = "";

    for (let i = 1; i <= RING_COUNT; i++) {

      const direction = i % 2 === 0 ? -1 : 1;

      ringCSS += `
        .bring${i} {
          animation: ballRing${i} ${1.3 + i * 0.15}s ease-out forwards;
        }

        @keyframes ballRing${i} {
          0% {
            opacity: 0;
            width: 10%;
            height: 4%;
            transform: translate(-50%, -50%) rotateX(68deg) rotateZ(0deg) scale(.2);
          }
          20% { opacity: .9; }
          60% { opacity: .6; }
          100% {
            opacity: 0;
            width: ${55 + i * 9}%;
            height: ${18 + i * 3}%;
            transform: translate(-50%, -50%) rotateX(68deg) rotateZ(${direction * (620 + i * 70)}deg) scale(1);
          }
        }
      `;

    }

    let dustCSS = "";

    for (let i = 1; i <= DUST_COUNT; i++) {

      const angle = i * 43;
      const distance = 30 + (i % 5) * 8;
      const rotation = 420 + (i % 6) * 60;

      dustCSS += `
        .bdust${i} {
          animation: ballDust${i} ${1.4 + (i % 5) * .15}s linear ${(i % 8) * .04}s forwards;
        }

        @keyframes ballDust${i} {
          0% {
            opacity: 0;
            transform: rotate(${angle}deg) translateX(${distance}%) scale(.2);
          }
          20% { opacity: .95; }
          65% {
            opacity: .7;
            transform: rotate(${angle + 300}deg) translateX(${distance * 0.4}%) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: rotate(${angle + rotation}deg) translateX(2%) scale(.05);
          }
        }
      `;

    }

    style.textContent = `

      #ballHurricane {
        perspective: 400px;
      }

      .ballVortexCore {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 14%;
        height: 14%;
        border-radius: 50%;
        transform: translate(-50%,-50%) scale(.1);
        background: radial-gradient(circle,
          rgba(255,255,255,1) 0%,
          rgba(205,160,255,.85) 25%,
          rgba(130,60,255,.4) 55%,
          transparent 75%);
        box-shadow: 0 0 18px rgba(255,255,255,.9), 0 0 40px rgba(180,100,255,.8);
        animation: ballCorePulse 2.2s ease-out forwards;
      }

      @keyframes ballCorePulse {
        0% { opacity: 0; transform: translate(-50%,-50%) scale(.1); }
        20% { opacity: 1; }
        55% { transform: translate(-50%,-50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%,-50%) scale(2.2); }
      }

      .ballRing {
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        border: 2px solid rgba(220,180,255,.5);
        box-shadow: 0 0 10px rgba(200,140,255,.5), inset 0 0 12px rgba(255,255,255,.12);
        opacity: 0;
      }

      .ballDust {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 0 6px rgba(220,180,255,.95);
        opacity: 0;
      }

      ${ringCSS}
      ${dustCSS}

    `;

    document.head.appendChild(style);

  }

  window.setTimeout(() => {

    if (ballHurricane) {
      ballHurricane.innerHTML = "";
    }

  }, 2300);

}


// ==========================================
// SHOW MESSAGE
// FIXED
// ==========================================

function showMessage() {

  if (!messageBox || !message) {

    console.error(
      "Universe139: message elements not found."
    );

    isRevealing = false;

    return;

  }


  // ----------------------------------------
  // GET MESSAGE FIRST
  // ----------------------------------------

  const newMessage =
    getRandomMessage();

  const finalMessage =
    newMessage ||
    "Your message is waiting for you.";


  // ----------------------------------------
  // WRITE MESSAGE BEFORE SHOWING BOX
  // ----------------------------------------

  message.textContent =
    finalMessage;


  // ----------------------------------------
  // FORCE MESSAGE ITSELF VISIBLE
  // ----------------------------------------

  message.classList.remove("hidden");

  message.style.display =
    "block";

  message.style.visibility =
    "visible";

  message.style.opacity =
    "1";

  message.style.color =
    "#ffffff";


  // ----------------------------------------
  // FORCE MESSAGE BOX VISIBLE
  // ----------------------------------------

  messageBox.classList.remove("hidden");

  messageBox.style.setProperty(
    "display",
    "block",
    "important"
  );

  messageBox.style.visibility =
    "visible";

  messageBox.style.opacity =
    "0";

  messageBox.style.transform =
    "translateY(18px) scale(.98)";


  // ----------------------------------------
  // HIDE LOADING / REVEAL
  // ----------------------------------------

  hideElement(loading);
  hideElement(revealBtn);


  // ----------------------------------------
  // SHOW BUTTONS
  // ----------------------------------------

  showElement(againBtn);
  showElement(shareBtn);

  // Subscription CTA appears after the message is revealed.
  window.setTimeout(() => {
    showSubscriptionBox();
  }, 850);


  // ----------------------------------------
  // MAKE SURE BUTTONS ARE VISIBLE
  // ----------------------------------------

  if (againBtn) {

    againBtn.style.visibility =
      "visible";

  }

  if (shareBtn) {

    shareBtn.style.visibility =
      "visible";

  }


  // ----------------------------------------
  // ANIMATE MESSAGE BOX
  // ----------------------------------------

  window.requestAnimationFrame(() => {

    messageBox.style.transition =
      "opacity .8s ease, transform .8s ease";

    messageBox.style.opacity =
      "1";

    messageBox.style.transform =
      "translateY(0) scale(1)";

  });


  console.log(
    "Universe139 message displayed:",
    finalMessage
  );

}


// ==========================================
// REVEAL MESSAGE
// FIXED
// ==========================================

function revealMessage() {

  if (isRevealing) {
    return;
  }

  if (!message || !messageBox) {

    console.error(
      "Universe139: message DOM is unavailable."
    );

    return;

  }


  isRevealing =
    true;


  // ----------------------------------------
  // HIDE CURRENT CONTENT
  // ----------------------------------------

  hideElement(messageBox);
  hideElement(againBtn);
  hideElement(shareBtn);
  hideElement(revealBtn);
  hideSubscriptionBox();


  // ----------------------------------------
  // SHOW LOADING
  // ----------------------------------------

  showElement(loading);
  showElement(crystalBallWrap);


  if (loadingText) {

    loadingText.textContent =
      translations[currentLanguage].loading;

  }


  // ----------------------------------------
  // COSMIC EFFECT
  //
  // IMPORTANT:
  // The animation is OPTIONAL.
  // If it fails, the message must STILL appear.
  // ----------------------------------------

  try {

    createWindEffect();
    createBallHurricane();

  } catch (error) {

    console.error(
      "Universe139 wind effect error:",
      error
    );

  }


  // ----------------------------------------
  // REVEAL MESSAGE
  // ----------------------------------------

  window.setTimeout(() => {

    try {

      showMessage();

    } catch (error) {

      console.error(
        "Universe139 showMessage error:",
        error
      );

      // Emergency fallback

      if (message) {

        message.textContent =
          getRandomMessage() ||
          "Your message is waiting for you.";

        message.style.display =
          "block";

        message.style.visibility =
          "visible";

        message.style.opacity =
          "1";

      }

      if (messageBox) {

        messageBox.classList.remove(
          "hidden"
        );

        messageBox.style.setProperty(
          "display",
          "block",
          "important"
        );

        messageBox.style.visibility =
          "visible";

        messageBox.style.opacity =
          "1";

      }

      hideElement(loading);
      showElement(againBtn);
      showElement(shareBtn);

    } finally {

      isRevealing =
        false;

    }

  }, 2400);

}


// ==========================================
// ANOTHER MESSAGE
// FIXED
// ==========================================

function receiveAnotherMessage() {

  if (isRevealing) {
    return;
  }

  if (!messageBox || !message) {
    return;
  }


  isRevealing =
    true;


  // ----------------------------------------
  // HIDE BUTTONS
  // ----------------------------------------

  hideElement(againBtn);
  hideElement(shareBtn);
  hideSubscriptionBox();


  // ----------------------------------------
  // FADE CURRENT MESSAGE
  // ----------------------------------------

  messageBox.style.transition =
    "opacity .3s ease, transform .3s ease";

  messageBox.style.opacity =
    "0";

  messageBox.style.transform =
    "scale(.95)";

  if (message) {
    message.style.opacity = "0";
  }


  // ----------------------------------------
  // START COSMIC EFFECT SAFELY
  // ----------------------------------------

  try {

    createWindEffect();
    createBallHurricane();

  } catch (error) {

    console.error(
      "Universe139 wind effect error:",
      error
    );

  }


  // ----------------------------------------
  // SHOW LOADING
  // ----------------------------------------

  window.setTimeout(() => {

    hideElement(messageBox);

    showElement(loading);

    if (loadingText) {

      loadingText.textContent =
        translations[currentLanguage].loading;

    }

  }, 350);


  // ----------------------------------------
  // SHOW NEW MESSAGE
  // ----------------------------------------

  window.setTimeout(() => {

    try {

      showMessage();

    } catch (error) {

      console.error(
        "Universe139 second message error:",
        error
      );

      if (message) {

        message.textContent =
          getRandomMessage() ||
          "Your message is waiting for you.";

        message.style.display =
          "block";

        message.style.visibility =
          "visible";

        message.style.opacity =
          "1";

      }

      if (messageBox) {

        messageBox.classList.remove(
          "hidden"
        );

        messageBox.style.setProperty(
          "display",
          "block",
          "important"
        );

        messageBox.style.visibility =
          "visible";

        messageBox.style.opacity =
          "1";

      }

      hideElement(loading);
      showElement(againBtn);
      showElement(shareBtn);

    } finally {

      isRevealing =
        false;

    }

  }, 2400);

}


// ==========================================
// FREE DAILY SUBSCRIPTION
// ADDITION ONLY — EXISTING APP PRESERVED
// ==========================================

function createSubscriptionBox() {

  if (document.getElementById("universe139SubscribeBox")) {
    updateSubscriptionText();
    return;
  }

  const t = translations[currentLanguage];

  const box = document.createElement("div");
  box.id = "universe139SubscribeBox";

  box.innerHTML = `
    <div class="universe139SubscribeTitle">
      ${escapeHTML(t.subscribeTitle)}
    </div>

    <div class="universe139SubscribeText">
      ${escapeHTML(t.subscribeText)}
    </div>

    <button
      id="universe139SubscribeButton"
      class="universe139SubscribeButton"
      type="button"
    >
      ${escapeHTML(t.subscribeButton)}
    </button>
  `;

  if (messageBox) {
    messageBox.appendChild(box);
  }

  subscribeBox = box;
  subscribeButton = document.getElementById("universe139SubscribeButton");

  addSubscriptionStyles();

  if (subscribeButton) {
    subscribeButton.addEventListener("click", openSubscriptionForm);
  }

}

function updateSubscriptionText() {

  const box = document.getElementById("universe139SubscribeBox");

  if (!box) {
    return;
  }

  const t = translations[currentLanguage];

  const titleElement = box.querySelector(".universe139SubscribeTitle");
  const textElement = box.querySelector(".universe139SubscribeText");
  const buttonElement = box.querySelector(".universe139SubscribeButton");

  if (titleElement) {
    titleElement.textContent = t.subscribeTitle;
  }

  if (textElement) {
    textElement.textContent = t.subscribeText;
  }

  if (buttonElement) {
    buttonElement.textContent = t.subscribeButton;
  }

}

function showSubscriptionBox() {
  createSubscriptionBox();
  updateSubscriptionText();

  if (subscribeBox) {
    subscribeBox.classList.remove("universe139SubscribeHidden");
  }
}

function hideSubscriptionBox() {
  const box = document.getElementById("universe139SubscribeBox");

  if (box) {
    box.classList.add("universe139SubscribeHidden");
  }
}

function openSubscriptionForm() {

  const oldModal = document.getElementById("universe139SubscriptionModal");

  if (oldModal) {
    oldModal.remove();
  }

  const t = translations[currentLanguage];

  const modal = document.createElement("div");
  modal.id = "universe139SubscriptionModal";

  modal.innerHTML = `
    <div class="universe139SubscriptionOverlay"></div>

    <div class="universe139SubscriptionModal">

      <button
        id="universe139SubscribeClose"
        class="universe139SubscribeClose"
        type="button"
        aria-label="${escapeHTML(t.subscribeClose)}"
      >
        ×
      </button>

      <div class="universe139SubscriptionIcon">✨</div>

      <h2>
        ${escapeHTML(t.subscribeFormTitle)}
      </h2>

      <p class="universe139SubscriptionDescription">
        ${escapeHTML(t.subscribeFormText)}
      </p>

      <input
        id="universe139Email"
        class="universe139EmailInput"
        type="email"
        autocomplete="email"
        placeholder="${escapeHTML(t.subscribeEmailPlaceholder)}"
      />

      <button
        id="universe139SubscribeSubmit"
        class="universe139SubscribeSubmit"
        type="button"
      >
        ${escapeHTML(t.subscribeSubmit)}
      </button>

      <div class="universe139SubscribeNote">
        ${escapeHTML(t.subscribeNote)}
      </div>

      <div
        id="universe139SubscribeStatus"
        class="universe139SubscribeStatus"
      ></div>

    </div>
  `;

  document.body.appendChild(modal);
  addSubscriptionModalStyles();

  const overlay = modal.querySelector(".universe139SubscriptionOverlay");
  const closeButton = document.getElementById("universe139SubscribeClose");
  const submitButton = document.getElementById("universe139SubscribeSubmit");
  const emailInput = document.getElementById("universe139Email");

  if (overlay) {
    overlay.addEventListener("click", closeSubscriptionForm);
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeSubscriptionForm);
  }

  if (submitButton) {
    submitButton.addEventListener("click", submitSubscription);
  }

  if (emailInput) {
    emailInput.focus();

    emailInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        submitSubscription();
      }
    });
  }
}

function closeSubscriptionForm() {

  const modal = document.getElementById("universe139SubscriptionModal");

  if (!modal) {
    return;
  }

  modal.classList.add("universe139SubscriptionClosing");

  window.setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, 220);
}

// ==========================================
// SUBMIT SUBSCRIPTION
// FIXED: this used to contain a second, orphaned
// try/catch block sitting OUTSIDE the function
// (after the closing brace) that used `await`
// at the top level of the script. That is an
// illegal syntax combination outside an async
// function, so the browser threw a SyntaxError
// while parsing the file. A syntax error anywhere
// in a <script> stops the ENTIRE script from
// running — no functions get defined, no click
// listeners ever get attached, which is exactly
// why nothing happened when picking a language
// (or clicking anything else on the page).
// The duplicate block is merged into one clean,
// fully-contained function below.
// ==========================================

async function submitSubscription() {

  const emailInput =
    document.getElementById("universe139Email");

  const submitButton =
    document.getElementById("universe139SubscribeSubmit");

  const status =
    document.getElementById("universe139SubscribeStatus");

  if (!emailInput) {
    return;
  }

  const email =
    String(emailInput.value || "")
      .trim()
      .toLowerCase();

  // Simple and reliable validation
  const atPosition =
    email.indexOf("@");

  const dotPosition =
    email.lastIndexOf(".");

  const emailIsValid =
    email.length >= 5 &&
    atPosition > 0 &&
    dotPosition > atPosition + 1 &&
    dotPosition < email.length - 1;

  if (!emailIsValid) {

    if (status) {

      status.textContent =
        translations[currentLanguage].subscribeError;

      status.className =
        "universe139SubscribeStatus universe139SubscribeError";

    }

    return;
  }

  if (submitButton) {

    submitButton.disabled = true;
    submitButton.style.opacity = ".65";

  }

  if (status) {

    status.textContent = "";
    status.className =
      "universe139SubscribeStatus";

  }

  try {

    const response =
      await fetch(
        "/api/subscribe",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            email: email,

            language:
              currentLanguage

          })
        }
      );

    const data =
      await response
        .json()
        .catch(() => ({}));

    if (!response.ok) {

      throw new Error(
        data.error ||
        "Subscription failed."
      );

    }

    // SUCCESS
    if (status) {

      status.textContent =
        data.alreadySubscribed
          ? translations[currentLanguage].subscribeAlready
          : translations[currentLanguage].subscribeSuccess;

      status.className =
        "universe139SubscribeStatus universe139SubscribeSuccess";

    }

    emailInput.value = "";

    if (submitButton) {

      submitButton.disabled = false;
      submitButton.style.opacity = "1";

    }

    // Close after showing thank-you message
    window.setTimeout(
      () => {
        closeSubscriptionForm();
      },
      2500
    );

  } catch (error) {

    console.error(
      "Universe139 subscription error:",
      error
    );

    if (status) {

      status.textContent =
        "The subscription service is not connected yet.";

      status.className =
        "universe139SubscribeStatus universe139SubscribeError";

    }

    if (submitButton) {

      submitButton.disabled = false;
      submitButton.style.opacity = "1";

    }

  }

}

function addSubscriptionStyles() {

  if (document.getElementById("universe139SubscribeStyles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "universe139SubscribeStyles";

  style.textContent = `
    #universe139SubscribeBox {
      width: min(620px, 100%);
      margin: 18px auto 8px;
      padding: 16px 18px;
      box-sizing: border-box;
      text-align: center;
      border-radius: 18px;
      background: rgba(255,255,255,.045);
      border: 1px solid rgba(255,255,255,.12);
      opacity: 0;
      transform: translateY(10px);
      animation: universe139SubscribeIn .7s ease forwards;
    }

    .universe139SubscribeTitle {
      color: #ffffff;
      font-size: 17px;
      line-height: 1.35;
      font-weight: 600;
    }

    .universe139SubscribeText {
      margin-top: 5px;
      color: rgba(255,255,255,.65);
      font-size: 13px;
      line-height: 1.5;
    }

    .universe139SubscribeButton {
      margin-top: 11px;
      min-height: 42px;
      padding: 9px 19px;
      border: 1px solid rgba(255,255,255,.18);
      border-radius: 999px;
      background: rgba(255,255,255,.08);
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      font-size: 13px;
      font-weight: 600;
      transition: background .2s ease, border-color .2s ease, transform .2s ease;
    }

    .universe139SubscribeButton:hover {
      background: rgba(255,255,255,.14);
      border-color: rgba(255,255,255,.3);
      transform: translateY(-1px);
    }

    .universe139SubscribeButton:active {
      transform: scale(.97);
    }

    .universe139SubscribeHidden {
      display: none !important;
    }

    @keyframes universe139SubscribeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width:600px) {
      #universe139SubscribeBox {
        margin-top: 15px;
        padding: 14px 12px;
      }
      .universe139SubscribeTitle {
        font-size: 16px;
      }
    }
  `;

  document.head.appendChild(style);
}

function addSubscriptionModalStyles() {

  if (document.getElementById("universe139SubscriptionModalStyles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "universe139SubscriptionModalStyles";

  style.textContent = `
    #universe139SubscriptionModal {
      position: fixed;
      inset: 0;
      z-index: 20000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: universe139ModalFadeIn .25s ease forwards;
    }

    .universe139SubscriptionOverlay {
      position: absolute;
      inset: 0;
      background: rgba(5,2,20,.92);
      backdrop-filter: blur(14px);
    }

    .universe139SubscriptionModal {
      position: relative;
      width: min(440px,100%);
      box-sizing: border-box;
      padding: 30px 25px;
      border-radius: 24px;
      background: linear-gradient(145deg, rgba(48,18,86,.98), rgba(17,7,38,.99));
      border: 1px solid rgba(255,255,255,.16);
      box-shadow: 0 30px 100px rgba(0,0,0,.7);
      text-align: center;
      animation: universe139ModalIn .3s ease forwards;
    }

    .universe139SubscribeClose {
      position: absolute;
      right: 14px;
      top: 10px;
      width: 38px;
      height: 38px;
      border: none;
      background: rgba(255,255,255,.07);
      color: white;
      border-radius: 50%;
      font-size: 25px;
      line-height: 38px;
      cursor: pointer;
    }

    .universe139SubscriptionIcon {
      font-size: 30px;
      margin-bottom: 4px;
    }

    .universe139SubscriptionModal h2 {
      margin: 5px 35px 10px;
      color: white;
      font-size: 24px;
      line-height: 1.25;
      font-weight: 600;
    }

    .universe139SubscriptionDescription {
      margin: 0 0 20px;
      color: rgba(255,255,255,.67);
      font-size: 14px;
      line-height: 1.55;
    }

    .universe139EmailInput {
      width: 100%;
      box-sizing: border-box;
      min-height: 48px;
      padding: 0 15px;
      border: 1px solid rgba(255,255,255,.16);
      border-radius: 14px;
      outline: none;
      background: rgba(255,255,255,.06);
      color: white;
      font: inherit;
      font-size: 14px;
      margin-bottom: 11px;
    }

    .universe139EmailInput::placeholder {
      color: rgba(255,255,255,.45);
    }

    .universe139EmailInput:focus {
      border-color: rgba(220,190,255,.45);
    }

    .universe139SubscribeSubmit {
      width: 100%;
      min-height: 48px;
      padding: 10px 18px;
      border: 1px solid rgba(255,255,255,.18);
      border-radius: 14px;
      background: rgba(255,255,255,.10);
      color: white;
      cursor: pointer;
      font: inherit;
      font-size: 14px;
      font-weight: 600;
    }

    .universe139SubscribeSubmit:hover {
      background: rgba(255,255,255,.15);
    }

    .universe139SubscribeNote {
      margin-top: 13px;
      color: rgba(255,255,255,.42);
      font-size: 11px;
      line-height: 1.5;
    }

    .universe139SubscribeStatus {
      min-height: 20px;
      margin-top: 13px;
      font-size: 13px;
      line-height: 1.5;
    }

    .universe139SubscribeSuccess {
      color: #d9ffdf;
    }

    .universe139SubscribeError {
      color: #ffd0d0;
    }

    #universe139SubscriptionModal.universe139SubscriptionClosing {
      animation: universe139ModalFadeOut .22s ease forwards;
    }

    @keyframes universe139ModalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes universe139ModalFadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes universe139ModalIn {
      from { opacity: 0; transform: translateY(20px) scale(.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @media (max-width:600px) {
      .universe139SubscriptionModal {
        padding: 27px 17px;
        border-radius: 21px;
      }
      .universe139SubscriptionModal h2 {
        font-size: 21px;
      }
    }
  `;

  document.head.appendChild(style);
}

// ==========================================
// SHARE TEXT
// ==========================================

function getShareText() {

  const currentMessage =
    message
      ? message.textContent.trim()
      : "";

  const t =
    translations[currentLanguage];

  return `✨ A Message From The Universe ✨

“${currentMessage}”

${t.shareLink}

${UNIVERSE139_URL}`;
}


// ==========================================
// COPY
// ==========================================

async function copyText(text, toastMessage) {

  if (!text) {
    return false;
  }

  try {

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        text
      );

    } else {

      const textarea =
        document.createElement("textarea");

      textarea.value =
        text;

      textarea.style.position =
        "fixed";

      textarea.style.left =
        "-99999px";

      textarea.style.top =
        "0";

      document.body.appendChild(
        textarea
      );

      textarea.focus();
      textarea.select();

      document.execCommand(
        "copy"
      );

      textarea.remove();

    }

    showShareToast(
      toastMessage ||
        translations[currentLanguage].copied
    );

    return true;

  } catch (error) {

    console.error(
      "Universe139 copy error:",
      error
    );

    return false;

  }

}

// Copies the full share text (message + link) and shows a toast that
// makes it explicit that BOTH the message and the link were copied,
// for platforms whose share URLs can't be pre-filled with text.
async function copyShareTextWithNotice() {

  const t =
    translations[currentLanguage];

  return copyText(
    getShareText(),
    t.copiedShare
  );

}


// ==========================================
// WHATSAPP
// ==========================================

async function shareWhatsApp() {

  const currentMessage =
    message
      ? message.textContent.trim()
      : "";

  if (!currentMessage) {

    showShareToast(
      translations[currentLanguage].noMessage
    );

    return;

  }

  const waURL =
    `https://wa.me/?text=${encodeURIComponent(getShareText())}`;

  // Same rule as Facebook/LinkedIn/Reddit: window.open() must be
  // called synchronously, before any async work, or mobile browsers
  // silently block it as not being a direct result of the tap.
  // wa.me already prefills the message + link as text just fine on
  // its own, so that's the safe, always-open fallback here.
  let fallbackWindow = null;

  if (!navigator.share) {

    fallbackWindow = window.open(
      waURL,
      "_blank",
      "noopener,noreferrer"
    );

  }

  try {

    // Prefer sharing the same branded image Facebook/Instagram/
    // TikTok use — WhatsApp accepts a shared image directly via
    // the OS share sheet, with the message + link baked right
    // into the picture, which reads much better in a chat than a
    // bare text bubble.
    const blob =
      await createMessageImageBlob();

    const file =
      new File(
        [blob],
        "Universe139-message.png",
        {
          type: "image/png"
        }
      );

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        files: [file]
      })
    ) {

      await navigator.share({

        title:
          "Universe139",

        text:
          getShareText(),

        files:
          [file]

      });

      return;

    }

    // navigator.share exists but this browser doesn't support
    // sharing files — fall back to text/url through the same API,
    // which still carries the full message + link.
    if (navigator.share) {

      try {

        await navigator.share({
          title: "Universe139",
          text: getShareText(),
          url: UNIVERSE139_URL
        });

        return;

      } catch (error) {

        if (
          error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Universe139 WhatsApp text share error:",
          error
        );

      }

    }

    // Desktop fallback: the wa.me popup is already open (from
    // above) with the message + link prefilled as text. Also
    // download the image so it can be attached to the chat manually.
    const objectURL =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href =
      objectURL;

    link.download =
      "Universe139-message.png";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    window.setTimeout(() => {

      URL.revokeObjectURL(
        objectURL
      );

    }, 2000);

    if (!fallbackWindow || fallbackWindow.closed) {

      window.open(
        waURL,
        "_blank",
        "noopener,noreferrer"
      );

    }

  } catch (error) {

    if (
      error &&
      error.name === "AbortError"
    ) {
      return;
    }

    console.error(
      "Universe139 WhatsApp share error:",
      error
    );

    // Emergency fallback if image generation itself fails — the
    // text-prefilled popup was already opened up front if needed.
    if (!fallbackWindow || fallbackWindow.closed) {

      window.open(
        waURL,
        "_blank",
        "noopener,noreferrer"
      );

    }

  }

}


// ==========================================
// FACEBOOK
// ==========================================

async function shareFacebook() {

  const currentMessage =
    message
      ? message.textContent.trim()
      : "";

  if (!currentMessage) {

    showShareToast(
      translations[currentLanguage].noMessage
    );

    return;

  }

  const shareURL =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(
      UNIVERSE139_URL
    );

  // CRITICAL: window.open() must happen synchronously, in direct
  // response to the click, or mobile browsers (especially Safari)
  // silently block it as a popup — this is exactly why the Facebook
  // tab wasn't appearing: it used to be called from inside a
  // setTimeout AFTER the image was generated and the clipboard
  // write finished, by which point the browser no longer considers
  // it a direct result of the tap. So on any browser without the
  // native share sheet, we open the (already fully-known) Facebook
  // URL right here, first, before any async work at all.
  let fallbackWindow = null;

  if (!navigator.share) {

    fallbackWindow = window.open(
      shareURL,
      "_blank",
      "width=700,height=650,noopener,noreferrer"
    );

  }

  // Facebook's sharer.php dialog no longer honors any prefilled
  // post text (the old "quote" param is silently ignored now —
  // that's why the exact message wasn't showing up). The message
  // only reliably shows on Facebook if it's baked into an image,
  // the same way TikTok/Instagram sharing already works here.
  try {

    const blob =
      await createMessageImageBlob();

    const file =
      new File(
        [blob],
        "Universe139-message.png",
        {
          type: "image/png"
        }
      );

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        files: [file]
      })
    ) {

      // On phones this hands the image straight to the Facebook
      // app (feed post, Story, Messenger, etc) with the message
      // visible in the picture itself.
      await navigator.share({

        title:
          "Universe139",

        text:
          getShareText(),

        files:
          [file]

      });

      return;

    }

    // navigator.share exists but doesn't support files on this
    // browser — still try it with text/url before falling back
    // to the popup window.
    if (navigator.share) {

      try {

        await navigator.share({
          title: "Universe139",
          text: getShareText(),
          url: UNIVERSE139_URL
        });

        return;

      } catch (error) {

        if (
          error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Universe139 Facebook text share error:",
          error
        );

      }

    }

    // Desktop fallback: the popup is already open (from above).
    // Now download the image and copy the message + link so the
    // person can attach the image and paste the caption in.
    const objectURL =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href =
      objectURL;

    link.download =
      "Universe139-message.png";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    window.setTimeout(() => {

      URL.revokeObjectURL(
        objectURL
      );

    }, 2000);

    await copyShareTextWithNotice();

    // Safety net: if navigator.share existed but both attempts
    // above failed, no popup was pre-opened — open it now.
    if (!fallbackWindow || fallbackWindow.closed) {

      window.open(
        shareURL,
        "_blank",
        "width=700,height=650,noopener,noreferrer"
      );

    }

  } catch (error) {

    if (
      error &&
      error.name === "AbortError"
    ) {
      return;
    }

    console.error(
      "Universe139 Facebook share error:",
      error
    );

    // Emergency fallback if image generation itself fails —
    // the popup was already opened up front (if applicable), so
    // just make sure the message + link are on the clipboard too.
    await copyShareTextWithNotice();

    if (!fallbackWindow || fallbackWindow.closed) {

      window.open(
        shareURL,
        "_blank",
        "width=700,height=650,noopener,noreferrer"
      );

    }

  }

}


// ==========================================
// TELEGRAM
// ==========================================

function shareTelegram() {

  const text =
    encodeURIComponent(
      getShareText()
    );

  const url =
    encodeURIComponent(
      UNIVERSE139_URL
    );

  window.open(
    `https://t.me/share/url?url=${url}&text=${text}`,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// GMAIL
// ==========================================

function shareGmail() {

  const subject =
    encodeURIComponent(
      "✨ A Message From The Universe"
    );

  const body =
    encodeURIComponent(
      getShareText()
    );

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// EMAIL
// ==========================================

function shareEmail() {

  const subject =
    encodeURIComponent(
      "✨ A Message From The Universe"
    );

  const body =
    encodeURIComponent(
      getShareText()
    );

  window.location.href =
    `mailto:?subject=${subject}&body=${body}`;

}


// ==========================================
// SMS
// ==========================================

function shareSMS() {

  const text =
    encodeURIComponent(
      getShareText()
    );

  window.location.href =
    `sms:?body=${text}`;

}


// ==========================================
// LINKEDIN
// ==========================================

async function shareLinkedIn() {

  // LinkedIn's share-offsite endpoint intentionally ignores any
  // prefilled post text — it only takes a url. So we guarantee the
  // message + link are at least on the clipboard, with a toast that
  // tells the person to paste them into the post they're about to write.
  //
  // CRITICAL: open the window FIRST, synchronously, before the
  // await below — once you await anything (even a quick clipboard
  // write), mobile browsers no longer treat window.open() as a
  // direct result of the tap and silently block it. That was the
  // actual bug: the popup was being requested only after the
  // clipboard copy had already finished.
  const url =
    encodeURIComponent(
      UNIVERSE139_URL
    );

  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    "_blank",
    "noopener,noreferrer"
  );

  await copyShareTextWithNotice();

}


// ==========================================
// REDDIT
// ==========================================

async function shareReddit() {

  const text =
    getShareText();

  const title =
    encodeURIComponent(
      "A Message From The Universe"
    );

  // Reddit link-posts (url=) don't render any text alongside them.
  // Using a self text-post (selftext=true&text=) instead puts the
  // message AND the link together in the post body.
  const body =
    encodeURIComponent(
      text
    );

  // Same fix as Facebook/LinkedIn: open synchronously first, then
  // copy to clipboard — awaiting the clipboard write before calling
  // window.open() is what let the popup get silently blocked.
  window.open(
    `https://www.reddit.com/submit?selftext=true&title=${title}&text=${body}`,
    "_blank",
    "noopener,noreferrer"
  );

  await copyShareTextWithNotice();

}


// ==========================================
// VIBER
// ==========================================

async function shareViber() {

  const text =
    getShareText();

  await copyText(text);

  window.setTimeout(() => {

    window.location.href =
      `viber://forward?text=${encodeURIComponent(text)}`;

  }, 300);

}


// ==========================================
// TIKTOK
// ==========================================

async function shareTikTok() {

  const currentMessage =
    message
      ? message.textContent.trim()
      : "";

  if (!currentMessage) {

    showShareToast(
      translations[currentLanguage].noMessage
    );

    return;

  }

  try {

    // TikTok doesn't accept a prefilled caption/link the way
    // WhatsApp or Telegram do — but its app DOES readily accept a
    // shared image to start a post or Story with. So we generate
    // the same branded message image Instagram uses, and share
    // that image straight to the TikTok app via the OS share sheet.
    const blob =
      await createMessageImageBlob();

    const file =
      new File(
        [blob],
        "Universe139-message.png",
        {
          type: "image/png"
        }
      );

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        files: [file]
      })
    ) {

      await navigator.share({

        title:
          "Universe139",

        text:
          getShareText(),

        files:
          [file]

      });

      return;

    }

    // Some mobile browsers support navigator.share with text/url
    // but not files — still worth trying before falling back further.
    if (navigator.share) {

      try {

        await navigator.share({
          title: "Universe139",
          text: getShareText(),
          url: UNIVERSE139_URL
        });

        return;

      } catch (error) {

        if (
          error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Universe139 TikTok text share error:",
          error
        );

      }

    }

    // Desktop fallback: there is no TikTok web-compose URL, so we
    // download the ready-made image, copy the message + link, and
    // send the person straight to TikTok's upload page to post it.
    const objectURL =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href =
      objectURL;

    link.download =
      "Universe139-message.png";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    window.setTimeout(() => {

      URL.revokeObjectURL(
        objectURL
      );

    }, 2000);

    await copyShareTextWithNotice();

    window.setTimeout(() => {

      window.open(
        "https://www.tiktok.com/upload",
        "_blank",
        "noopener,noreferrer"
      );

    }, 1200);

  } catch (error) {

    if (
      error &&
      error.name === "AbortError"
    ) {
      return;
    }

    console.error(
      "Universe139 TikTok share error:",
      error
    );

    // Emergency fallback if image generation itself fails —
    // still guarantee the message + link reach the clipboard.
    await copyShareTextWithNotice();

    window.open(
      "https://www.tiktok.com/",
      "_blank",
      "noopener,noreferrer"
    );

  }

}


// ==========================================
// CREATE SHARE IMAGE
// ==========================================

async function createMessageImageBlob() {

  const currentMessage =
    message
      ? message.textContent.trim()
      : "";

  if (!currentMessage) {
    throw new Error(
      "No Universe139 message available."
    );
  }

  const canvas =
    document.createElement("canvas");

  const width =
    1080;

  const height =
    1350;

  canvas.width =
    width;

  canvas.height =
    height;

  const ctx =
    canvas.getContext("2d");

  if (!ctx) {
    throw new Error(
      "Canvas is not supported."
    );
  }


  // ========================================
  // COSMIC BACKGROUND
  // ========================================

  const background =
    ctx.createLinearGradient(
      0,
      0,
      width,
      height
    );

  background.addColorStop(
    0,
    "#080512"
  );

  background.addColorStop(
    .35,
    "#25113f"
  );

  background.addColorStop(
    .7,
    "#120827"
  );

  background.addColorStop(
    1,
    "#030207"
  );

  ctx.fillStyle =
    background;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  // ========================================
  // COSMIC GLOW
  // ========================================

  const glow =
    ctx.createRadialGradient(
      width / 2,
      430,
      20,
      width / 2,
      430,
      650
    );

  glow.addColorStop(
    0,
    "rgba(190,120,255,.45)"
  );

  glow.addColorStop(
    .3,
    "rgba(110,50,200,.20)"
  );

  glow.addColorStop(
    1,
    "rgba(0,0,0,0)"
  );

  ctx.fillStyle =
    glow;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  // ========================================
  // STARS
  // ========================================

  for (
    let i = 0;
    i < 150;
    i++
  ) {

    const x =
      Math.random() * width;

    const y =
      Math.random() * height;

    const radius =
      Math.random() * 2 + .5;

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${.25 + Math.random() * .7})`;

    ctx.fill();

  }


  // ========================================
  // BRAND
  // ========================================

  ctx.textAlign =
    "center";

  ctx.fillStyle =
    "#d9b7ff";

  ctx.font =
    "600 30px Arial, sans-serif";

  ctx.fillText(
    "UNIVERSE139",
    width / 2,
    115
  );


  ctx.fillStyle =
    "rgba(255,255,255,.75)";

  ctx.font =
    "500 20px Arial, sans-serif";

  ctx.fillText(
    "A MESSAGE FROM THE UNIVERSE",
    width / 2,
    155
  );


  // ========================================
  // MESSAGE CARD
  // ========================================

  const cardX =
    75;

  const cardY =
    270;

  const cardW =
    width - 150;

  const cardH =
    720;

  const radius =
    42;

  ctx.beginPath();

  ctx.moveTo(
    cardX + radius,
    cardY
  );

  ctx.lineTo(
    cardX + cardW - radius,
    cardY
  );

  ctx.quadraticCurveTo(
    cardX + cardW,
    cardY,
    cardX + cardW,
    cardY + radius
  );

  ctx.lineTo(
    cardX + cardW,
    cardY + cardH - radius
  );

  ctx.quadraticCurveTo(
    cardX + cardW,
    cardY + cardH,
    cardX + cardW - radius,
    cardY + cardH
  );

  ctx.lineTo(
    cardX + radius,
    cardY + cardH
  );

  ctx.quadraticCurveTo(
    cardX,
    cardY + cardH,
    cardX,
    cardY + cardH - radius
  );

  ctx.lineTo(
    cardX,
    cardY + radius
  );

  ctx.quadraticCurveTo(
    cardX,
    cardY,
    cardX + radius,
    cardY
  );

  ctx.closePath();

  const cardGradient =
    ctx.createLinearGradient(
      cardX,
      cardY,
      cardX + cardW,
      cardY + cardH
    );

  cardGradient.addColorStop(
    0,
    "rgba(100,55,150,.55)"
  );

  cardGradient.addColorStop(
    1,
    "rgba(20,8,40,.92)"
  );

  ctx.fillStyle =
    cardGradient;

  ctx.fill();

  ctx.strokeStyle =
    "rgba(255,255,255,.18)";

  ctx.lineWidth =
    2;

  ctx.stroke();


  // ========================================
  // QUOTE
  // ========================================

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "italic 64px Georgia, serif";

  ctx.fillText(
    "\u201C",
    150,
    400
  );

  ctx.font =
    "700 48px Arial, sans-serif";

  const maxWidth =
    cardW - 150;

  const lines =
    wrapCanvasText(
      ctx,
      currentMessage,
      maxWidth
    );

  const lineHeight =
    72;

  const startY =
    520 -
    ((lines.length - 1) *
      lineHeight) / 2;

  lines.forEach(
    (line, index) => {

      ctx.fillStyle =
        "#ffffff";

      ctx.fillText(
        line,
        width / 2,
        startY +
          index *
          lineHeight
      );

    }
  );


  // ========================================
  // FOOTER
  // ========================================

  ctx.fillStyle =
    "rgba(255,255,255,.55)";

  ctx.font =
    "20px Arial, sans-serif";

  ctx.fillText(
    "Keep this message close to your heart.",
    width / 2,
    1100
  );

  ctx.fillStyle =
    "#d9b7ff";

  ctx.font =
    "700 28px Arial, sans-serif";

  ctx.fillText(
    getDisplayURL(),
    width / 2,
    1200
  );

  ctx.fillStyle =
    "rgba(255,255,255,.45)";

  ctx.font =
    "18px Arial, sans-serif";

  ctx.fillText(
    "Your message is waiting...",
    width / 2,
    1250
  );


  return new Promise(
    (resolve, reject) => {

      canvas.toBlob(
        blob => {

          if (blob) {
            resolve(blob);
          } else {
            reject(
              new Error(
                "Unable to create image."
              )
            );
          }

        },
        "image/png",
        1
      );

    }
  );

}


// ==========================================
// CANVAS TEXT WRAPPING
// ==========================================

function wrapCanvasText(
  ctx,
  text,
  maxWidth
) {

  const words =
    text.split(/\s+/);

  const lines = [];

  let current =
    "";

  for (
    const word of words
  ) {

    const test =
      current
        ? `${current} ${word}`
        : word;

    const width =
      ctx.measureText(test).width;

    if (
      width <= maxWidth
    ) {

      current =
        test;

    } else {

      if (current) {
        lines.push(current);
      }

      current =
        word;

    }

  }

  if (current) {
    lines.push(current);
  }

  return lines;

}


// ==========================================
// INSTAGRAM
// ==========================================

async function shareInstagram() {

  const currentMessage =
    message
      ? message.textContent.trim()
      : "";

  if (!currentMessage) {

    showShareToast(
      translations[currentLanguage].noMessage
    );

    return;

  }

  try {

    const blob =
      await createMessageImageBlob();

    const file =
      new File(
        [blob],
        "Universe139-message.png",
        {
          type: "image/png"
        }
      );


    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        files: [file]
      })
    ) {

      await navigator.share({

        title:
          "Universe139",

        text:
          currentMessage,

        files:
          [file]

      });

      return;

    }


    const objectURL =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href =
      objectURL;

    link.download =
      "Universe139-message.png";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    window.setTimeout(() => {

      URL.revokeObjectURL(
        objectURL
      );

    }, 2000);


    showShareToast(
      "Your Universe139 image is ready to share"
    );

    window.setTimeout(() => {

      window.open(
        "https://www.instagram.com/",
        "_blank",
        "noopener,noreferrer"
      );

    }, 1200);

  } catch (error) {

    if (
      error &&
      error.name === "AbortError"
    ) {
      return;
    }

    console.error(
      "Instagram share error:",
      error
    );

    await copyShareTextWithNotice();

  }

}


// ==========================================
// SNAPCHAT
// ==========================================

async function shareSnapchat() {

  const text =
    getShareText();

  // Same idea as TikTok: prefer the native share sheet on mobile
  // so Snapchat receives the message + link directly.
  if (navigator.share) {

    try {

      await navigator.share({
        title: "Universe139",
        text: text,
        url: UNIVERSE139_URL
      });

      return;

    } catch (error) {

      if (
        error &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error(
        "Universe139 Snapchat share error:",
        error
      );

    }

  }

  await copyShareTextWithNotice();

  window.open(
    "https://www.snapchat.com/",
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// PINTEREST
// ==========================================

function sharePinterest() {

  const url =
    encodeURIComponent(
      UNIVERSE139_URL
    );

  const description =
    encodeURIComponent(
      getShareText()
    );

  window.open(
    `https://pinterest.com/pin/create/button/?url=${url}&description=${description}`,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// NATIVE MORE SHARE
// ==========================================

async function shareMore() {

  const text =
    getShareText();

  if (
    navigator.share
  ) {

    try {

      await navigator.share({

        title:
          "Universe139",

        text:
          text,

        url:
          UNIVERSE139_URL

      });

    } catch (error) {

      if (
        error &&
        error.name !==
          "AbortError"
      ) {

        console.error(
          "Share error:",
          error
        );

      }

    }

  } else {

    await copyText(
      text
    );

  }

}


// ==========================================
// SHARE TOAST
// ==========================================

function showShareToast(text) {

  const oldToast =
    document.getElementById(
      "universe139Toast"
    );

  if (oldToast) {
    oldToast.remove();
  }

  const toast =
    document.createElement("div");

  toast.id =
    "universe139Toast";

  toast.textContent =
    text;

  document.body.appendChild(
    toast
  );

  window.setTimeout(() => {

    toast.classList.add(
      "show"
    );

  }, 20);

  window.setTimeout(() => {

    toast.classList.remove(
      "show"
    );

    window.setTimeout(() => {

      if (toast.parentNode) {
        toast.remove();
      }

    }, 300);

  }, 1800);

}


// ==========================================
// SHARE PANEL
// ==========================================

function createSharePanel() {

  const oldPanel =
    document.getElementById(
      "universe139SharePanel"
    );

  if (oldPanel) {
    oldPanel.remove();
  }

  const t =
    translations[currentLanguage];

  const currentMessage =
    message
      ? message.textContent.trim()
      : "";

  const panel =
    document.createElement("div");

  panel.id =
    "universe139SharePanel";

  panel.innerHTML = `

    <div class="shareOverlay"></div>

    <div class="shareModal">

      <button
        class="shareClose"
        id="shareClose"
        type="button"
        aria-label="${t.close}"
      >
        ×
      </button>

      <h2>
        ${t.shareTitle}
      </h2>

      <p class="shareDescription">
        ${t.shareInstructions}
      </p>

      ${
        isInAppBrowser()
          ? `<p class="shareInAppNotice">⚠️ ${escapeHTML(t.inAppBrowserNotice)}</p>`
          : ""
      }

      <div class="sharePreview">

        <div class="sharePreviewTitle">
          A Message From The Universe
        </div>

        <div class="sharePreviewMessage">
          “${escapeHTML(currentMessage)}”
        </div>

        <div class="sharePreviewLink">
          ${escapeHTML(getDisplayURL())}
        </div>

      </div>

      <div class="shareGrid">

        <button class="shareOption" id="shareWhatsApp" type="button">
          WhatsApp
        </button>

        <button class="shareOption" id="shareFacebook" type="button">
          Facebook
        </button>

        <button class="shareOption" id="shareTelegram" type="button">
          Telegram
        </button>

        <button class="shareOption" id="shareGmail" type="button">
          Gmail
        </button>

        <button class="shareOption" id="shareEmail" type="button">
          Email
        </button>

        <button class="shareOption" id="shareSMS" type="button">
          SMS
        </button>

        <button class="shareOption" id="shareLinkedIn" type="button">
          LinkedIn
        </button>

        <button class="shareOption" id="shareReddit" type="button">
          Reddit
        </button>

        <button class="shareOption" id="shareViber" type="button">
          Viber
        </button>

        <button class="shareOption" id="shareTikTok" type="button">
          TikTok
        </button>

        <button class="shareOption" id="shareInstagram" type="button">
          Instagram
        </button>

        <button class="shareOption" id="shareSnapchat" type="button">
          Snapchat
        </button>

        <button class="shareOption" id="sharePinterest" type="button">
          Pinterest
        </button>

        <button class="shareOption" id="copyMessage" type="button">
          ${t.copyMessage}
        </button>

        <button class="shareOption" id="copyLink" type="button">
          ${t.copyLink}
        </button>

        <button class="shareOption" id="shareMore" type="button">
          ${t.more}
        </button>

      </div>

    </div>

  `;

  document.body.appendChild(
    panel
  );

  addSharePanelStyles();


  const closeButton =
    document.getElementById(
      "shareClose"
    );

  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeSharePanel
    );

  }


  const overlay =
    panel.querySelector(
      ".shareOverlay"
    );

  if (overlay) {

    overlay.addEventListener(
      "click",
      closeSharePanel
    );

  }


  bindShareButton(
    "shareWhatsApp",
    shareWhatsApp
  );

  bindShareButton(
    "shareFacebook",
    shareFacebook
  );

  bindShareButton(
    "shareTelegram",
    shareTelegram
  );

  bindShareButton(
    "shareGmail",
    shareGmail
  );

  bindShareButton(
    "shareEmail",
    shareEmail
  );

  bindShareButton(
    "shareSMS",
    shareSMS
  );

  bindShareButton(
    "shareLinkedIn",
    shareLinkedIn
  );

  bindShareButton(
    "shareReddit",
    shareReddit
  );

  bindShareButton(
    "shareViber",
    shareViber
  );

  bindShareButton(
    "shareTikTok",
    shareTikTok
  );

  bindShareButton(
    "shareInstagram",
    shareInstagram
  );

  bindShareButton(
    "shareSnapchat",
    shareSnapchat
  );

  bindShareButton(
    "sharePinterest",
    sharePinterest
  );

  bindShareButton(
    "shareMore",
    shareMore
  );


  const copyMessageButton =
    document.getElementById(
      "copyMessage"
    );

  if (copyMessageButton) {

    copyMessageButton.addEventListener(
      "click",
      () => {

        copyText(
          getShareText()
        );

      }
    );

  }


  const copyLinkButton =
    document.getElementById(
      "copyLink"
    );

  if (copyLinkButton) {

    copyLinkButton.addEventListener(
      "click",
      () => {

        copyText(
          UNIVERSE139_URL
        );

      }
    );

  }

}


// ==========================================
// BIND SHARE BUTTON
// ==========================================

function bindShareButton(
  id,
  handler
) {

  const button =
    document.getElementById(id);

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    handler
  );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


// ==========================================
// CLOSE SHARE PANEL
// ==========================================

function closeSharePanel() {

  const panel =
    document.getElementById(
      "universe139SharePanel"
    );

  if (!panel) {
    return;
  }

  panel.classList.add(
    "closing"
  );

  window.setTimeout(() => {

    if (panel.parentNode) {
      panel.remove();
    }

  }, 220);

}


// ==========================================
// SHARE PANEL CSS
// ==========================================

function addSharePanelStyles() {

  if (
    document.getElementById(
      "universe139ShareStyles"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "universe139ShareStyles";

  style.textContent = `

    #universe139SharePanel {

      position: fixed;

      inset: 0;

      z-index: 10000;

      display: flex;

      align-items: center;

      justify-content: center;

      padding: 20px;

      animation:
        shareFadeIn .25s ease;

    }


    .shareOverlay {

      position: absolute;

      inset: 0;

      background:
        rgba(5,2,20,.92);

      backdrop-filter:
        blur(14px);

    }


    .shareModal {

      position: relative;

      width:
        min(620px,100%);

      max-height:
        90vh;

      overflow-y:
        auto;

      padding:
        30px;

      border-radius:
        26px;

      background:
        linear-gradient(
          145deg,
          rgba(48,18,86,.98),
          rgba(17,7,38,.99)
        );

      border:
        1px solid
        rgba(255,255,255,.16);

      box-shadow:
        0 30px 100px
        rgba(0,0,0,.7);

      text-align:
        center;

      animation:
        shareModalIn .3s ease;

    }


    .shareModal h2 {

      margin:
        5px 45px 10px;

      font-size:
        clamp(20px,5vw,28px);

      color:
        white;

      font-weight:
        600;

    }


    .shareDescription {

      margin:
        0 0 20px;

      color:
        rgba(255,255,255,.65);

      font-size:
        14px;

    }


    .shareInAppNotice {

      margin:
        -8px 0 20px;

      padding:
        12px 14px;

      border-radius:
        14px;

      background:
        rgba(255,196,0,.12);

      border:
        1px solid rgba(255,196,0,.35);

      color:
        #ffd876;

      font-size:
        13px;

      line-height:
        1.5;

      text-align:
        left;

    }


    .shareClose {

      position:
        absolute;

      right:
        15px;

      top:
        12px;

      width:
        38px;

      height:
        38px;

      border:
        none;

      background:
        rgba(255,255,255,.07);

      color:
        white;

      border-radius:
        50%;

      font-size:
        26px;

      line-height:
        38px;

      cursor:
        pointer;

    }


    .sharePreview {

      margin-bottom:
        22px;

      padding:
        18px;

      border-radius:
        18px;

      background:
        rgba(255,255,255,.05);

      border:
        1px solid
        rgba(255,255,255,.1);

    }


    .sharePreviewTitle {

      margin-bottom:
        10px;

      font-size:
        13px;

      color:
        rgba(255,255,255,.55);

    }


    .sharePreviewMessage {

      color:
        white;

      font-size:
        16px;

      line-height:
        1.55;

      margin-bottom:
        12px;

      word-break:
        break-word;

    }


    .sharePreviewLink {

      color:
        #d7b1ff;

      font-size:
        14px;

      font-weight:
        600;

    }


    .shareGrid {

      display:
        grid;

      grid-template-columns:
        repeat(4,1fr);

      gap:
        10px;

    }


    .shareOption {

      min-height:
        54px;

      padding:
        10px 7px;

      border:
        1px solid
        rgba(255,255,255,.12);

      border-radius:
        14px;

      background:
        rgba(255,255,255,.045);

      color:
        white;

      cursor:
        pointer;

      font-family:
        inherit;

      font-size:
        13px;

      font-weight:
        500;

      transition:
        background .2s ease,
        border-color .2s ease,
        transform .2s ease;

    }


    .shareOption:hover {

      background:
        rgba(255,255,255,.11);

      border-color:
        rgba(255,255,255,.28);

      transform:
        translateY(-2px);

    }


    .shareOption:active {

      transform:
        scale(.97);

    }


    #universe139Toast {

      position:
        fixed;

      left:
        50%;

      bottom:
        30px;

      transform:
        translate(-50%,20px);

      z-index:
        11000;

      padding:
        11px 22px;

      border-radius:
        30px;

      background:
        rgba(35,15,65,.97);

      border:
        1px solid
        rgba(255,255,255,.18);

      color:
        white;

      font-size:
        14px;

      opacity:
        0;

      transition:
        opacity .3s ease,
        transform .3s ease;

      pointer-events:
        none;

    }


    #universe139Toast.show {

      opacity:
        1;

      transform:
        translate(-50%,0);

    }


    #universe139SharePanel.closing {

      animation:
        shareFadeOut .22s ease
        forwards;

    }


    @keyframes shareFadeIn {

      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }

    }


    @keyframes shareFadeOut {

      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }

    }


    @keyframes shareModalIn {

      from {

        opacity: 0;

        transform:
          translateY(25px)
          scale(.96);

      }

      to {

        opacity: 1;

        transform:
          translateY(0)
          scale(1);

      }

    }


    @media (max-width:600px) {

      .shareModal {

        padding:
          24px 15px;

        border-radius:
          22px;

      }


      .shareGrid {

        grid-template-columns:
          repeat(3,1fr);

        gap:
          8px;

      }


      .shareOption {

        min-height:
          52px;

        font-size:
          11px;

      }

    }


    @media (max-width:380px) {

      .shareGrid {

        grid-template-columns:
          repeat(2,1fr);

      }

    }

  `;

  document.head.appendChild(
    style
  );

}


// ==========================================
// OPEN SHARE
// ==========================================

function shareMessage() {

  const currentMessage =
    message
      ? message.textContent.trim()
      : "";

  if (!currentMessage) {

    console.warn(
      "Universe139: no message to share."
    );

    showShareToast(
      translations[currentLanguage].noMessage
    );

    return;

  }

  createSharePanel();

}


// ==========================================
// INITIALIZE EVENTS
// ==========================================

function initializeEvents() {

  document
    .querySelectorAll(
      ".languageBtn"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectLanguage(
            button.dataset.language
          );

        }
      );

    });


  if (revealBtn) {

    revealBtn.addEventListener(
      "click",
      revealMessage
    );

  }


  if (againBtn) {

    againBtn.addEventListener(
      "click",
      receiveAnotherMessage
    );

  }


  if (shareBtn) {

    shareBtn.addEventListener(
      "click",
      shareMessage
    );

  }

}


// ==========================================
// INITIAL STATE
// ==========================================

function initializeState() {

  hideElement(
    messageBox
  );

  hideElement(
    loading
  );

  hideElement(
    crystalBallWrap
  );

  hideElement(
    revealBtn
  );

  hideElement(
    againBtn
  );

  hideElement(
    shareBtn
  );

  if (message) {

    message.textContent =
      "";

    message.style.display =
      "block";

    message.style.visibility =
      "visible";

    message.style.opacity =
      "0";

  }

}


// ==========================================
// START APPLICATION
// ==========================================

function initializeUniverse139() {

  initializeDOM();

  initializeState();

  initializeEvents();

  console.log(
    "Universe139 loaded successfully"
  );

  console.log(
    "Universe139 URL:",
    UNIVERSE139_URL
  );

  console.log(
    "Message database:",
    Object.keys(messageTemplates)
  );

}


// ==========================================
// DOM READY
// ==========================================

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeUniverse139
  );

} else {

  initializeUniverse139();

}
// ==========================================================
// UNIVERSE139 - 500 MESSAGE NON-REPEAT SYSTEM
// ADD THIS AT THE VERY BOTTOM OF script.js
// ==========================================================

(function installUniverse139MessageSystem() {

  const STORAGE_KEY = "universe139_message_cycles_v2";
  const LANGUAGES = ["en", "es", "zh", "ru", "hi", "th"];

  // --------------------------------------------------------
  // 25 opening messages x 20 closing messages = 500
  // unique messages per language.
  // --------------------------------------------------------

  const messageParts = {

    en: {
      openers: [
        "Trust the feeling that keeps returning to your heart.",
        "A quiet change is beginning to move through your life.",
        "You are closer to a new beginning than you realize.",
        "Your patience is creating space for something meaningful.",
        "The path ahead is becoming clearer one step at a time.",
        "Your intuition is noticing something your mind has not fully named.",
        "A chapter that once felt uncertain is beginning to make sense.",
        "There is more possibility around you than you can currently see.",
        "Your energy is shifting toward something more peaceful.",
        "A small decision today can open a surprisingly important door.",
        "You have already learned enough to take the next step.",
        "Something you have been waiting for is moving closer.",
        "The pressure you have carried does not need to follow you forward.",
        "Your heart knows when something feels right for you.",
        "An unexpected moment may reveal a valuable direction.",
        "You are allowed to begin again without explaining yourself.",
        "Your recent effort is creating results beneath the surface.",
        "A peaceful answer may arrive when you stop forcing the question.",
        "The future is asking you to make room for something new.",
        "Your courage is growing quietly through every experience.",
        "What seems small today may become important later.",
        "You do not need to know the entire road before moving forward.",
        "A new perspective can change the way you see everything around you.",
        "Your life is still capable of surprising you in beautiful ways.",
        "The next step does not have to be perfect to be meaningful."
      ],

      closers: [
        "Give yourself permission to move at your own pace.",
        "Stay open to the opportunity that arrives naturally.",
        "Listen carefully to what brings you peace.",
        "Let today be lighter than yesterday.",
        "Choose the direction that feels honest to you.",
        "Do not dismiss the small signs that encourage you.",
        "Make room for joy without needing a reason first.",
        "Trust that progress can happen quietly.",
        "Release the need to control every detail.",
        "Take one small action and let it lead to the next.",
        "Remember that rest can also be part of progress.",
        "Allow yourself to notice how far you have already come.",
        "Be patient with the timing of your own life.",
        "Protect the energy you need for what matters most.",
        "Let uncertainty exist without allowing it to stop you.",
        "Give your attention to what you can build now.",
        "Something better can begin with one simple choice.",
        "Keep moving toward what feels meaningful.",
        "Your story is still unfolding.",
        "Let the next moment bring its own answer."
      ]
    },

    es: {
      openers: [
        "Confía en ese sentimiento que sigue regresando a tu corazón.",
        "Un cambio tranquilo está comenzando a moverse en tu vida.",
        "Estás más cerca de un nuevo comienzo de lo que imaginas.",
        "Tu paciencia está creando espacio para algo importante.",
        "El camino que tienes delante se vuelve más claro paso a paso.",
        "Tu intuición está notando algo que tu mente todavía no ha nombrado.",
        "Un capítulo que parecía incierto comienza a tener sentido.",
        "Hay más posibilidades a tu alrededor de las que puedes ver ahora.",
        "Tu energía se está moviendo hacia algo más tranquilo.",
        "Una pequeña decisión hoy puede abrir una puerta inesperadamente importante.",
        "Ya has aprendido lo suficiente para dar el siguiente paso.",
        "Algo que has estado esperando se está acercando.",
        "La presión que has llevado contigo no tiene que seguir hacia el futuro.",
        "Tu corazón sabe cuándo algo es correcto para ti.",
        "Un momento inesperado puede mostrarte una dirección valiosa.",
        "Tienes permiso para comenzar de nuevo sin dar explicaciones.",
        "El esfuerzo reciente está creando resultados que aún no se ven.",
        "Una respuesta tranquila puede llegar cuando dejas de forzar la pregunta.",
        "El futuro te pide que hagas espacio para algo nuevo.",
        "Tu valentía crece silenciosamente con cada experiencia.",
        "Lo que hoy parece pequeño puede ser importante más adelante.",
        "No necesitas conocer todo el camino para seguir avanzando.",
        "Una nueva perspectiva puede cambiar la forma en que ves todo.",
        "Tu vida todavía puede sorprenderte de maneras hermosas.",
        "El siguiente paso no tiene que ser perfecto para tener significado."
      ],

      closers: [
        "Date permiso para avanzar a tu propio ritmo.",
        "Mantente abierto a la oportunidad que llegue de forma natural.",
        "Escucha con atención lo que te trae paz.",
        "Haz que hoy sea más ligero que ayer.",
        "Elige la dirección que se sienta honesta para ti.",
        "No ignores las pequeñas señales que te animan.",
        "Haz espacio para la alegría sin necesitar una razón.",
        "Confía en que el progreso también puede ocurrir en silencio.",
        "Suelta la necesidad de controlar cada detalle.",
        "Da un pequeño paso y deja que te lleve al siguiente.",
        "Recuerda que descansar también forma parte del progreso.",
        "Reconoce lo lejos que ya has llegado.",
        "Sé paciente con el momento de tu propia vida.",
        "Protege la energía que necesitas para lo que más importa.",
        "Permite que exista la incertidumbre sin dejar que te detenga.",
        "Pon tu atención en lo que puedes construir ahora.",
        "Algo mejor puede comenzar con una decisión sencilla.",
        "Sigue avanzando hacia lo que tiene significado para ti.",
        "Tu historia todavía se está escribiendo.",
        "Deja que el próximo momento traiga su propia respuesta."
      ]
    },

    zh: {
      openers: [
        "相信那个不断回到你心里的感觉。",
        "一个安静的变化正在你的生活中开始发生。",
        "你比想象中更接近一个新的开始。",
        "你的耐心正在为重要的事情创造空间。",
        "眼前的道路正在一步一步变得更加清晰。",
        "你的直觉正在注意到一些头脑还没有说出的事情。",
        "曾经不确定的一段经历正在慢慢变得有意义。",
        "你身边存在的可能性比现在看到的更多。",
        "你的能量正在转向更加平静的方向。",
        "今天一个小小的决定可能打开一扇重要的门。",
        "你已经学到了足够多的东西，可以继续下一步。",
        "你一直等待的事情正在慢慢靠近。",
        "你曾经承受的压力不必继续陪伴你走向未来。",
        "你的心知道什么才是真正适合你的。",
        "一个意外的时刻可能让你看到有价值的方向。",
        "你可以重新开始，不需要向任何人解释。",
        "你最近的努力正在悄悄产生结果。",
        "当你不再强迫答案时，平静的答案可能自然出现。",
        "未来正在邀请你为新的事物腾出空间。",
        "你的勇气正在随着每一次经历慢慢成长。",
        "今天看似微小的事情以后可能变得重要。",
        "你不需要知道整条路才能继续前进。",
        "一个新的视角可以改变你看待周围一切的方式。",
        "你的生活依然能够以美好的方式给你惊喜。",
        "下一步不需要完美，也可以拥有意义。"
      ],

      closers: [
        "允许自己按照自己的节奏前进。",
        "对自然来到你身边的机会保持开放。",
        "仔细聆听什么能带给你平静。",
        "让今天比昨天轻盈一些。",
        "选择那个对你来说真实的方向。",
        "不要忽略那些鼓励你的微小信号。",
        "不需要理由，也可以为快乐留出空间。",
        "相信进步也可以悄悄发生。",
        "放下必须掌控每一个细节的需要。",
        "先迈出一个小小的步伐，再让它带来下一步。",
        "记住，休息也是成长的一部分。",
        "看看自己已经走了多远。",
        "对属于你的人生时机保持耐心。",
        "保护那些真正重要的事情所需要的能量。",
        "允许不确定存在，但不要让它阻止你。",
        "把注意力放在你现在能够创造的事情上。",
        "更好的事情可能从一个简单的选择开始。",
        "继续走向那些对你有意义的事物。",
        "你的故事仍然在继续展开。",
        "让下一个时刻带来属于它自己的答案。"
      ]
    },

    ru: {
      openers: [
        "Доверься тому чувству, которое снова возвращается в твоё сердце.",
        "Тихие перемены начинают проходить через твою жизнь.",
        "Ты ближе к новому началу, чем можешь себе представить.",
        "Твоё терпение создаёт пространство для чего-то важного.",
        "Путь впереди становится яснее шаг за шагом.",
        "Твоя интуиция замечает то, чему разум пока не дал названия.",
        "Глава, которая казалась неопределённой, начинает обретать смысл.",
        "Вокруг тебя больше возможностей, чем ты сейчас видишь.",
        "Твоя энергия движется к чему-то более спокойному.",
        "Маленькое решение сегодня может открыть неожиданно важную дверь.",
        "Ты уже узнал достаточно, чтобы сделать следующий шаг.",
        "То, чего ты ждал, становится ближе.",
        "Давление, которое ты нёс на себе, не обязано идти с тобой дальше.",
        "Твоё сердце знает, когда что-то действительно подходит тебе.",
        "Неожиданный момент может показать тебе ценное направление.",
        "Ты можешь начать заново, не объясняя себя никому.",
        "Твои недавние усилия уже создают результаты, которые пока не видны.",
        "Спокойный ответ может прийти, когда ты перестанешь заставлять себя его искать.",
        "Будущее просит тебя освободить место для нового.",
        "Твоя смелость тихо растёт благодаря каждому опыту.",
        "То, что сегодня кажется маленьким, позже может стать важным.",
        "Тебе не нужно знать весь путь, чтобы двигаться вперёд.",
        "Новый взгляд может изменить то, как ты видишь всё вокруг.",
        "Твоя жизнь всё ещё способна удивлять тебя прекрасным образом.",
        "Следующий шаг не обязан быть идеальным, чтобы иметь значение."
      ],

      closers: [
        "Позволь себе двигаться в своём собственном ритме.",
        "Оставайся открытым к возможности, которая придёт естественно.",
        "Внимательно слушай то, что приносит тебе спокойствие.",
        "Пусть сегодняшний день будет легче вчерашнего.",
        "Выбери направление, которое кажется тебе честным.",
        "Не игнорируй маленькие знаки, которые поддерживают тебя.",
        "Оставь место для радости, даже если для неё нет причины.",
        "Поверь, что прогресс может происходить тихо.",
        "Отпусти необходимость контролировать каждую деталь.",
        "Сделай один маленький шаг и позволь ему привести к следующему.",
        "Помни, что отдых тоже является частью движения вперёд.",
        "Заметь, как далеко ты уже смог пройти.",
        "Будь терпелив к своему собственному времени.",
        "Береги энергию, которая нужна тебе для самого важного.",
        "Позволь неопределённости существовать, не позволяя ей остановить тебя.",
        "Направь внимание на то, что ты можешь создать сейчас.",
        "Что-то лучшее может начаться с одного простого выбора.",
        "Продолжай двигаться к тому, что имеет для тебя значение.",
        "Твоя история всё ещё продолжается.",
        "Позволь следующему моменту принести свой собственный ответ."
      ]
    },

    hi: {
      openers: [
        "उस एहसास पर भरोसा करें जो बार-बार आपके दिल में लौटता है।",
        "आपके जीवन में एक शांत बदलाव शुरू हो रहा है।",
        "आप एक नई शुरुआत के जितने करीब हैं, उससे अधिक जितना आप सोचते हैं।",
        "आपका धैर्य किसी महत्वपूर्ण चीज़ के लिए जगह बना रहा है।",
        "आपके सामने का रास्ता हर कदम के साथ अधिक स्पष्ट हो रहा है।",
        "आपका अंतर्ज्ञान कुछ ऐसा महसूस कर रहा है जिसे आपका मन अभी शब्द नहीं दे पाया है।",
        "एक ऐसा अध्याय जो कभी अनिश्चित लगा था अब अर्थपूर्ण होने लगा है।",
        "आपके आसपास जितनी संभावनाएँ हैं, वे आपकी वर्तमान कल्पना से अधिक हैं।",
        "आपकी ऊर्जा अधिक शांत दिशा की ओर बढ़ रही है।",
        "आज लिया गया एक छोटा निर्णय एक महत्वपूर्ण दरवाज़ा खोल सकता है।",
        "आपने अगला कदम उठाने के लिए पर्याप्त सीख लिया है।",
        "जिस चीज़ का आप इंतज़ार कर रहे थे वह आपके करीब आ रही है।",
        "जिस दबाव को आपने उठाया है उसे भविष्य में अपने साथ ले जाना ज़रूरी नहीं है।",
        "आपका दिल जानता है कि आपके लिए क्या सही महसूस होता है।",
        "एक अप्रत्याशित क्षण आपको एक मूल्यवान दिशा दिखा सकता है।",
        "आप बिना किसी को समझाए फिर से शुरुआत कर सकते हैं।",
        "आपकी हाल की मेहनत ऐसे परिणाम बना रही है जो अभी दिखाई नहीं दे रहे।",
        "जब आप उत्तर को मजबूर करना छोड़ देते हैं तब शांत उत्तर सामने आ सकता है।",
        "भविष्य आपसे किसी नई चीज़ के लिए जगह बनाने को कह रहा है।",
        "हर अनुभव के साथ आपका साहस धीरे-धीरे बढ़ रहा है।",
        "जो आज छोटा लगता है वह बाद में महत्वपूर्ण बन सकता है।",
        "आगे बढ़ने के लिए आपको पूरी राह जानना ज़रूरी नहीं है।",
        "एक नया दृष्टिकोण आपके आसपास की हर चीज़ को देखने का तरीका बदल सकता है।",
        "आपका जीवन अभी भी आपको सुंदर तरीकों से आश्चर्यचकित कर सकता है।",
        "अगला कदम सही होने की जरूरत नहीं, अर्थपूर्ण होना काफी है।"
      ],

      closers: [
        "खुद को अपनी गति से आगे बढ़ने की अनुमति दें।",
        "उस अवसर के लिए खुले रहें जो स्वाभाविक रूप से आपके पास आए।",
        "ध्यान से सुनें कि आपके भीतर शांति क्या लाती है।",
        "आज को कल से थोड़ा हल्का होने दें।",
        "वही दिशा चुनें जो आपके लिए सच्ची महसूस होती है।",
        "उन छोटी निशानियों को नजरअंदाज न करें जो आपको आगे बढ़ाती हैं।",
        "बिना किसी कारण की जरूरत के भी खुशी के लिए जगह बनाएं।",
        "विश्वास रखें कि प्रगति शांत तरीके से भी हो सकती है।",
        "हर चीज़ को नियंत्रित करने की आवश्यकता को छोड़ दें।",
        "एक छोटा कदम उठाएं और उसे अगले कदम तक ले जाने दें।",
        "याद रखें कि आराम भी प्रगति का हिस्सा हो सकता है।",
        "ध्यान दें कि आप पहले ही कितनी दूर आ चुके हैं।",
        "अपने जीवन के सही समय के प्रति धैर्य रखें।",
        "उस ऊर्जा की रक्षा करें जिसकी आपको सबसे महत्वपूर्ण चीज़ों के लिए जरूरत है।",
        "अनिश्चितता को रहने दें, लेकिन उसे आपको रोकने न दें।",
        "अपना ध्यान उस चीज़ पर दें जिसे आप अभी बना सकते हैं।",
        "कुछ बेहतर एक सरल निर्णय से शुरू हो सकता है।",
        "उस दिशा में बढ़ते रहें जो आपके लिए अर्थपूर्ण है।",
        "आपकी कहानी अभी भी आगे लिखी जा रही है।",
        "अगले क्षण को अपना उत्तर स्वयं लाने दें।"
      ]
    },

    th: {
      openers: [
        "เชื่อในความรู้สึกที่ยังคงกลับมาในหัวใจของคุณ",
        "การเปลี่ยนแปลงอย่างเงียบ ๆ กำลังเริ่มเกิดขึ้นในชีวิตของคุณ",
        "คุณใกล้จะได้เริ่มต้นบทใหม่มากกว่าที่คิด",
        "ความอดทนของคุณกำลังสร้างพื้นที่ให้สิ่งสำคัญบางอย่าง",
        "เส้นทางข้างหน้ากำลังชัดเจนขึ้นทีละก้าว",
        "สัญชาตญาณของคุณกำลังสังเกตบางสิ่งที่ใจของคุณยังเรียกชื่อไม่ได้",
        "บทหนึ่งที่เคยดูไม่แน่นอนกำลังเริ่มมีความหมาย",
        "รอบตัวคุณมีความเป็นไปได้มากกว่าที่คุณมองเห็นในตอนนี้",
        "พลังของคุณกำลังเคลื่อนไปสู่ความสงบมากขึ้น",
        "การตัดสินใจเล็ก ๆ ในวันนี้อาจเปิดประตูสำคัญอย่างคาดไม่ถึง",
        "คุณเรียนรู้มากพอที่จะก้าวไปข้างหน้าแล้ว",
        "สิ่งที่คุณรอคอยกำลังเข้ามาใกล้",
        "ความกดดันที่คุณแบกไว้ไม่จำเป็นต้องเดินทางไปกับคุณต่อ",
        "หัวใจของคุณรู้ว่าอะไรเหมาะสมกับคุณ",
        "ช่วงเวลาที่ไม่คาดคิดอาจเผยทิศทางที่มีคุณค่า",
        "คุณสามารถเริ่มต้นใหม่ได้โดยไม่ต้องอธิบายตัวเอง",
        "ความพยายามล่าสุดของคุณกำลังสร้างผลลัพธ์ที่ยังมองไม่เห็น",
        "คำตอบที่สงบอาจปรากฏเมื่อคุณหยุดบังคับให้ตัวเองต้องรู้ทันที",
        "อนาคตกำลังขอให้คุณเปิดพื้นที่สำหรับสิ่งใหม่",
        "ความกล้าของคุณกำลังเติบโตอย่างเงียบ ๆ จากทุกประสบการณ์",
        "สิ่งที่ดูเล็กในวันนี้อาจมีความสำคัญในภายหลัง",
        "คุณไม่จำเป็นต้องรู้ทุกเส้นทางเพื่อก้าวไปข้างหน้า",
        "มุมมองใหม่สามารถเปลี่ยนวิธีที่คุณมองทุกสิ่งรอบตัว",
        "ชีวิตของคุณยังสามารถทำให้คุณประหลาดใจในแบบที่สวยงาม",
        "ก้าวต่อไปไม่จำเป็นต้องสมบูรณ์แบบจึงจะมีความหมาย"
      ],

      closers: [
        "อนุญาตให้ตัวเองเดินไปตามจังหวะของคุณเอง",
        "เปิดใจให้กับโอกาสที่เข้ามาอย่างเป็นธรรมชาติ",
        "ฟังอย่างตั้งใจว่าสิ่งใดนำความสงบมาให้คุณ",
        "ปล่อยให้วันนี้เบากว่าเมื่อวาน",
        "เลือกทิศทางที่รู้สึกจริงใจกับตัวคุณ",
        "อย่ามองข้ามสัญญาณเล็ก ๆ ที่คอยสนับสนุนคุณ",
        "สร้างพื้นที่ให้ความสุขโดยไม่ต้องมีเหตุผล",
        "เชื่อว่าความก้าวหน้าสามารถเกิดขึ้นอย่างเงียบ ๆ ได้",
        "ปล่อยความจำเป็นที่จะต้องควบคุมทุกรายละเอียด",
        "ก้าวเล็ก ๆ หนึ่งก้าวแล้วปล่อยให้มันนำไปสู่ก้าวต่อไป",
        "จำไว้ว่าการพักก็เป็นส่วนหนึ่งของความก้าวหน้า",
        "มองเห็นว่าคุณเดินมาไกลแค่ไหนแล้ว",
        "อดทนกับจังหวะเวลาของชีวิตของคุณเอง",
        "ปกป้องพลังที่คุณต้องใช้กับสิ่งสำคัญที่สุด",
        "ยอมรับความไม่แน่นอนโดยไม่ปล่อยให้มันหยุดคุณ",
        "ใส่ใจกับสิ่งที่คุณสามารถสร้างได้ในตอนนี้",
        "สิ่งที่ดีกว่าอาจเริ่มจากการเลือกง่าย ๆ เพียงครั้งเดียว",
        "เดินหน้าต่อไปหาสิ่งที่มีความหมายสำหรับคุณ",
        "เรื่องราวของคุณยังคงดำเนินต่อไป",
        "ปล่อยให้ช่วงเวลาถัดไปนำคำตอบของมันมาเอง"
      ]
    }

  };

  // --------------------------------------------------------
  // BUILD EXACTLY 500 UNIQUE MESSAGES PER LANGUAGE
  // --------------------------------------------------------

  const fiveHundredMessages = {};

  LANGUAGES.forEach(language => {

    const parts = messageParts[language];

    if (!parts ||
        parts.openers.length !== 25 ||
        parts.closers.length !== 20) {
      console.error(
        "Universe139: invalid message database for",
        language
      );
      return;
    }

    const list = [];

    for (let a = 0; a < parts.openers.length; a++) {
      for (let b = 0; b < parts.closers.length; b++) {

        const text =
          parts.openers[a] +
          " " +
          parts.closers[b];

        list.push(text);
      }
    }

    // Safety check
    const unique = new Set(list);

    if (list.length !== 500 || unique.size !== 500) {
      console.error(
        "Universe139: message count problem for",
        language,
        list.length,
        unique.size
      );
      return;
    }

    fiveHundredMessages[language] = list;
  });

  // --------------------------------------------------------
  // STORAGE
  // --------------------------------------------------------

  function loadState() {

    try {

      const raw =
        localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        return {};
      }

      const parsed =
        JSON.parse(raw);

      return parsed && typeof parsed === "object"
        ? parsed
        : {};

    } catch (error) {

      console.warn(
        "Universe139: unable to load message history.",
        error
      );

      return {};
    }
  }

  function saveState(state) {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );

    } catch (error) {

      console.warn(
        "Universe139: unable to save message history.",
        error
      );

    }
  }

  // --------------------------------------------------------
  // SHUFFLE
  // --------------------------------------------------------

  function shuffle(array) {

    const result =
      [...array];

    for (
      let i = result.length - 1;
      i > 0;
      i--
    ) {

      const j =
        Math.floor(
          Math.random() * (i + 1)
        );

      const temp =
        result[i];

      result[i] =
        result[j];

      result[j] =
        temp;
    }

    return result;
  }

  // --------------------------------------------------------
  // GET / CREATE CURRENT CYCLE
  // --------------------------------------------------------

  function getLanguageState(state, language) {

    if (
      !state[language] ||
      !Array.isArray(state[language].order) ||
      state[language].order.length !== 500 ||
      typeof state[language].index !== "number"
    ) {

      state[language] = {

        order:
          shuffle(
            Array.from(
              { length: 500 },
              (_, index) => index
            )
          ),

        index: 0
      };

      saveState(state);
    }

    // Repair invalid index
    if (
      state[language].index < 0 ||
      state[language].index > 500
    ) {

      state[language].index = 0;
      saveState(state);
    }

    return state[language];
  }

  // --------------------------------------------------------
  // NEW getRandomMessage()
  //
  // IMPORTANT:
  // This replaces the old getRandomMessage() function.
  // --------------------------------------------------------

  window.universe139GetNextMessage =
    function() {

      const language =
        window.currentLanguage ||
        (
          typeof currentLanguage !== "undefined"
            ? currentLanguage
            : "en"
        );

      const messages =
        fiveHundredMessages[language] ||
        fiveHundredMessages.en;

      const state =
        loadState();

      const languageState =
        getLanguageState(
          state,
          fiveHundredMessages[language]
            ? language
            : "en"
        );

      // Start a fresh shuffled cycle after
      // all 500 messages have been used.
      if (
        languageState.index >= 500
      ) {

        languageState.order =
          shuffle(
            Array.from(
              { length: 500 },
              (_, index) => index
            )
          );

        languageState.index = 0;
      }

      const messageIndex =
        languageState.order[
          languageState.index
        ];

      const selectedMessage =
        messages[messageIndex];

      languageState.index++;

      saveState(state);

      return selectedMessage;
    };

  // --------------------------------------------------------
  // OVERRIDE THE FUNCTION USED BY THE EXISTING APP
  // --------------------------------------------------------

  window.getRandomMessage =
    window.universe139GetNextMessage;

  // The original code calls getRandomMessage()
  // directly. Replace it globally where possible.
  //
  // This function declaration is intentionally placed
  // here so future calls use the new system.
  getRandomMessage =
    window.universe139GetNextMessage;

  // --------------------------------------------------------
  // DEBUG INFORMATION
  // --------------------------------------------------------

  console.log(
    "Universe139: 500-message system installed."
  );

  LANGUAGES.forEach(language => {

    console.log(
      "Universe139:",
      language,
      fiveHundredMessages[language]
        ? fiveHundredMessages[language].length
        : 0,
      "messages"
    );

  });

})();
