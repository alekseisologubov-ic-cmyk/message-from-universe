// ==========================================
// UNIVERSE139 — MESSAGE FROM THE UNIVERSE
// ==========================================

const UNIVERSE139_URL = "https://universe139.vercel.app";


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
    shareInstructions: "Choose where you want to share your message.",

    shareLink:
      "👆 Universe139 — Press here to see your message for today"
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

    shareTitle: "Comparte tu mensaje de Universe139",
    close: "Cerrar",
    copyMessage: "Copiar mensaje",
    copyLink: "Copiar enlace",
    more: "Más...",
    copied: "¡Copiado!",
    shareInstructions: "Elige dónde quieres compartir tu mensaje.",

    shareLink:
      "👆 Universe139 — Pulsa aquí para recibir tu mensaje de hoy"
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

    shareTitle: "分享你的 Universe139 讯息",
    close: "关闭",
    copyMessage: "复制讯息",
    copyLink: "复制链接",
    more: "更多...",
    copied: "已复制！",
    shareInstructions: "选择你想分享讯息的方式。",

    shareLink:
      "👆 Universe139 — 点击这里查看你今天的宇宙讯息"
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

    shareTitle: "Поделитесь своим посланием Universe139",
    close: "Закрыть",
    copyMessage: "Копировать послание",
    copyLink: "Копировать ссылку",
    more: "Ещё...",
    copied: "Скопировано!",
    shareInstructions: "Выберите, где вы хотите поделиться своим посланием.",

    shareLink:
      "👆 Universe139 — Нажми здесь, чтобы получить своё послание на сегодня"
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

    shareTitle: "अपना Universe139 संदेश साझा करें",
    close: "बंद करें",
    copyMessage: "संदेश कॉपी करें",
    copyLink: "लिंक कॉपी करें",
    more: "और...",
    copied: "कॉपी हो गया!",
    shareInstructions: "चुनें कि आप अपना संदेश कहाँ साझा करना चाहते हैं।",

    shareLink:
      "👆 Universe139 — आज का अपना संदेश देखने के लिए यहां दबाएं"
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

    shareTitle: "แชร์ข้อความ Universe139 ของคุณ",
    close: "ปิด",
    copyMessage: "คัดลอกข้อความ",
    copyLink: "คัดลอกลิงก์",
    more: "เพิ่มเติม...",
    copied: "คัดลอกแล้ว!",
    shareInstructions: "เลือกสถานที่ที่คุณต้องการแชร์ข้อความของคุณ",

    shareLink:
      "👆 Universe139 — กดที่นี่เพื่อดูข้อความของคุณสำหรับวันนี้"
  }

};


// ==========================================
// MESSAGES
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
// VARIABLES
// ==========================================

let currentLanguage = "en";
let lastMessage = "";
let isRevealing = false;


// ==========================================
// DOM ELEMENTS
// ==========================================

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


// ==========================================
// LANGUAGE
// ==========================================

function selectLanguage(language) {

  if (!translations[language]) {
    language = "en";
  }

  currentLanguage = language;

  const t = translations[language];

  chooseLanguage.textContent = t.chooseLanguage;
  title.textContent = t.title;
  subtitle.textContent = t.subtitle;

  revealBtn.textContent = t.reveal;
  loadingText.textContent = t.loading;

  month.textContent = t.month;

  againBtn.textContent = t.again;
  shareBtn.textContent = t.share;

  languageBox.classList.add("hidden");

  revealBtn.classList.remove("hidden");

  setTimeout(() => {
    revealMessage();
  }, 500);
}


// ==========================================
// RANDOM MESSAGE
// ==========================================

function getRandomMessage() {

  const messages = messageTemplates[currentLanguage];

  if (!messages || messages.length === 0) {
    return "";
  }

  let newMessage;

  do {

    const randomIndex =
      Math.floor(Math.random() * messages.length);

    newMessage = messages[randomIndex];

  } while (
    messages.length > 1 &&
    newMessage === lastMessage
  );

  lastMessage = newMessage;

  return newMessage;
}


// ==========================================
// WIND EFFECT
// ==========================================

function createWindEffect() {

  const oldWind =
    document.getElementById("universeWind");

  if (oldWind) {
    oldWind.remove();
  }

  const wind =
    document.createElement("div");

  wind.id = "universeWind";

  wind.innerHTML = `
    <div class="wind wind1"></div>
    <div class="wind wind2"></div>
    <div class="wind wind3"></div>
    <div class="wind wind4"></div>
    <div class="wind wind5"></div>
  `;

  document.body.appendChild(wind);

  if (!document.getElementById("universe139WindStyle")) {

    const style =
      document.createElement("style");

    style.id =
      "universe139WindStyle";

    style.textContent = `

      #universeWind {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
      }

      .wind {
        position: absolute;
        width: 200vw;
        height: 4px;
        left: -220vw;
        opacity: 0;
        border-radius: 50%;

        background:
          linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.15),
            rgba(255,255,255,.8),
            rgba(255,255,255,.15),
            transparent
          );

        filter: blur(1px);
      }

      .wind1 {
        top: 20%;
        animation: universeWind 1.4s linear;
      }

      .wind2 {
        top: 35%;
        animation: universeWind 1.1s linear .1s;
      }

      .wind3 {
        top: 50%;
        animation: universeWind 1.3s linear .2s;
      }

      .wind4 {
        top: 65%;
        animation: universeWind 1s linear .3s;
      }

      .wind5 {
        top: 80%;
        animation: universeWind 1.2s linear .4s;
      }

      @keyframes universeWind {

        0% {
          transform:
            translateX(0)
            rotate(-2deg);
          opacity: 0;
        }

        20% {
          opacity: .7;
        }

        70% {
          opacity: .9;
        }

        100% {
          transform:
            translateX(260vw)
            rotate(2deg);
          opacity: 0;
        }

      }

    `;

    document.head.appendChild(style);
  }

  setTimeout(() => {
    wind.remove();
  }, 1800);
}


// ==========================================
// SHOW MESSAGE
// ==========================================

function showMessage() {

  const newMessage =
    getRandomMessage();

  message.textContent =
    newMessage;

  messageBox.classList.remove("hidden");

  messageBox.style.display =
    "block";

  message.style.opacity =
    "1";

  message.style.visibility =
    "visible";

  loading.classList.add("hidden");

  revealBtn.classList.add("hidden");

  againBtn.classList.remove("hidden");

  shareBtn.classList.remove("hidden");
}


// ==========================================
// REVEAL MESSAGE
// ==========================================

function revealMessage() {

  if (isRevealing) {
    return;
  }

  isRevealing = true;

  messageBox.classList.add("hidden");

  loading.classList.remove("hidden");

  revealBtn.classList.add("hidden");

  againBtn.classList.add("hidden");

  shareBtn.classList.add("hidden");

  loadingText.textContent =
    translations[currentLanguage].loading;

  setTimeout(() => {

    showMessage();

    isRevealing = false;

  }, 2500);
}


// ==========================================
// ANOTHER MESSAGE
// ==========================================

function receiveAnotherMessage() {

  if (isRevealing) {
    return;
  }

  isRevealing = true;

  createWindEffect();

  messageBox.style.opacity =
    "0";

  setTimeout(() => {

    messageBox.classList.add("hidden");

    loading.classList.remove("hidden");

    loadingText.textContent =
      translations[currentLanguage].loading;

  }, 300);

  setTimeout(() => {

    showMessage();

    messageBox.style.opacity =
      "1";

    isRevealing = false;

  }, 2500);
}


// ==========================================
// BUILD SHARE TEXT
// ==========================================

function getShareText() {

  const currentMessage =
    message.textContent.trim();

  return `✨ A Message From The Universe ✨

“${currentMessage}”

${translations[currentLanguage].shareLink}

${UNIVERSE139_URL}`;
}


// ==========================================
// COPY TO CLIPBOARD
// ==========================================

async function copyText(text) {

  try {

    await navigator.clipboard.writeText(text);

    showShareToast(
      translations[currentLanguage].copied
    );

  } catch (error) {

    const textarea =
      document.createElement("textarea");

    textarea.value = text;

    textarea.style.position =
      "fixed";

    textarea.style.left =
      "-9999px";

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showShareToast(
      translations[currentLanguage].copied
    );
  }
}


// ==========================================
// SHARE TO WHATSAPP
// ==========================================

function shareWhatsApp() {

  const text =
    encodeURIComponent(
      getShareText()
    );

  window.open(
    `https://wa.me/?text=${text}`,
    "_blank"
  );
}


// ==========================================
// SHARE TO FACEBOOK
// ==========================================

function shareFacebook() {

  const url =
    encodeURIComponent(
      UNIVERSE139_URL
    );

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    "_blank",
    "width=600,height=500"
  );
}


// ==========================================
// SHARE TO TELEGRAM
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
    "_blank"
  );
}


// ==========================================
// SHARE TO LINKEDIN
// ==========================================

function shareLinkedIn() {

  const url =
    encodeURIComponent(
      UNIVERSE139_URL
    );

  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    "_blank",
    "width=600,height=600"
  );
}


// ==========================================
// SHARE TO REDDIT
// ==========================================

function shareReddit() {

  const title =
    encodeURIComponent(
      "✨ A Message From The Universe ✨"
    );

  const url =
    encodeURIComponent(
      UNIVERSE139_URL
    );

  window.open(
    `https://www.reddit.com/submit?url=${url}&title=${title}`,
    "_blank"
  );
}


// ==========================================
// SHARE BY EMAIL
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
// SHARE BY GMAIL
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
    "_blank"
  );
}


// ==========================================
// SHARE BY SMS
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
// SHARE TO VIBER
// ==========================================

function shareViber() {

  const text =
    encodeURIComponent(
      getShareText()
    );

  window.location.href =
    `viber://forward?text=${text}`;
}


// ==========================================
// TIKTOK
// ==========================================

async function shareTikTok() {

  await copyText(
    getShareText()
  );

  setTimeout(() => {

    window.open(
      "https://www.tiktok.com/",
      "_blank"
    );

  }, 700);
}


// ==========================================
// INSTAGRAM
// ==========================================

async function shareInstagram() {

  await copyText(
    getShareText()
  );

  setTimeout(() => {

    window.open(
      "https://www.instagram.com/",
      "_blank"
    );

  }, 700);
}


// ==========================================
// SNAPCHAT
// ==========================================

async function shareSnapchat() {

  await copyText(
    getShareText()
  );

  setTimeout(() => {

    window.open(
      "https://www.snapchat.com/",
      "_blank"
    );

  }, 700);
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
    "_blank"
  );
}


// ==========================================
// NATIVE MORE SHARE
// ==========================================

async function shareMore() {

  const text =
    getShareText();

  if (navigator.share) {

    try {

      await navigator.share({
        title: "Universe139",
        text: text
      });

    } catch (error) {

      if (error.name !== "AbortError") {
        console.error(
          "Native share error:",
          error
        );
      }

    }

  } else {

    await copyText(text);

  }
}


// ==========================================
// SHARE TO FACEBOOK WITH MESSAGE
// ==========================================

async function shareFacebookMessage() {

  await copyText(
    getShareText()
  );

  setTimeout(() => {

    shareFacebook();

  }, 700);
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
        aria-label="${t.close}"
      >
        ×
      </button>

      <div class="shareUniverseLogo">
        ✨
      </div>

      <h2>${t.shareTitle}</h2>

      <p class="shareDescription">
        ${t.shareInstructions}
      </p>

      <div class="sharePreview">

        <div class="sharePreviewTitle">
          ✨ A Message From The Universe ✨
        </div>

        <div class="sharePreviewMessage">
          “${message.textContent.trim()}”
        </div>

        <div class="sharePreviewLink">
          👆 Universe139
        </div>

      </div>

      <div class="shareGrid">

        <button
          class="shareOption whatsapp"
          id="shareWhatsApp"
        >
          <span>💬</span>
          <small>WhatsApp</small>
        </button>

        <button
          class="shareOption facebook"
          id="shareFacebook"
        >
          <span>📘</span>
          <small>Facebook</small>
        </button>

        <button
          class="shareOption telegram"
          id="shareTelegram"
        >
          <span>✈️</span>
          <small>Telegram</small>
        </button>

        <button
          class="shareOption gmail"
          id="shareGmail"
        >
          <span>📧</span>
          <small>Gmail</small>
        </button>

        <button
          class="shareOption email"
          id="shareEmail"
        >
          <span>✉️</span>
          <small>Email</small>
        </button>

        <button
          class="shareOption sms"
          id="shareSMS"
        >
          <span>💬</span>
          <small>SMS</small>
        </button>

        <button
          class="shareOption linkedin"
          id="shareLinkedIn"
        >
          <span>💼</span>
          <small>LinkedIn</small>
        </button>

        <button
          class="shareOption reddit"
          id="shareReddit"
        >
          <span>🟠</span>
          <small>Reddit</small>
        </button>

        <button
          class="shareOption viber"
          id="shareViber"
        >
          <span>📱</span>
          <small>Viber</small>
        </button>

        <button
          class="shareOption tiktok"
          id="shareTikTok"
        >
          <span>🎵</span>
          <small>TikTok</small>
        </button>

        <button
          class="shareOption instagram"
          id="shareInstagram"
        >
          <span>📸</span>
          <small>Instagram</small>
        </button>

        <button
          class="shareOption snapchat"
          id="shareSnapchat"
        >
          <span>👻</span>
          <small>Snapchat</small>
        </button>

        <button
          class="shareOption pinterest"
          id="sharePinterest"
        >
          <span>📌</span>
          <small>Pinterest</small>
        </button>

        <button
          class="shareOption copy"
          id="copyMessage"
        >
          <span>📋</span>
          <small>${t.copyMessage}</small>
        </button>

        <button
          class="shareOption link"
          id="copyLink"
        >
          <span>🔗</span>
          <small>${t.copyLink}</small>
        </button>

        <button
          class="shareOption more"
          id="shareMore"
        >
          <span>📤</span>
          <small>${t.more}</small>
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(panel);

  addSharePanelStyles();

  // Close
  document
    .getElementById("shareClose")
    .addEventListener(
      "click",
      closeSharePanel
    );

  document
    .querySelector(".shareOverlay")
    .addEventListener(
      "click",
      closeSharePanel
    );

  // WhatsApp
  document
    .getElementById("shareWhatsApp")
    .addEventListener(
      "click",
      shareWhatsApp
    );

  // Facebook
  document
    .getElementById("shareFacebook")
    .addEventListener(
      "click",
      shareFacebookMessage
    );

  // Telegram
  document
    .getElementById("shareTelegram")
    .addEventListener(
      "click",
      shareTelegram
    );

  // Gmail
  document
    .getElementById("shareGmail")
    .addEventListener(
      "click",
      shareGmail
    );

  // Email
  document
    .getElementById("shareEmail")
    .addEventListener(
      "click",
      shareEmail
    );

  // SMS
  document
    .getElementById("shareSMS")
    .addEventListener(
      "click",
      shareSMS
    );

  // LinkedIn
  document
    .getElementById("shareLinkedIn")
    .addEventListener(
      "click",
      shareLinkedIn
    );

  // Reddit
  document
    .getElementById("shareReddit")
    .addEventListener(
      "click",
      shareReddit
    );

  // Viber
  document
    .getElementById("shareViber")
    .addEventListener(
      "click",
      shareViber
    );

  // TikTok
  document
    .getElementById("shareTikTok")
    .addEventListener(
      "click",
      shareTikTok
    );

  // Instagram
  document
    .getElementById("shareInstagram")
    .addEventListener(
      "click",
      shareInstagram
    );

  // Snapchat
  document
    .getElementById("shareSnapchat")
    .addEventListener(
      "click",
      shareSnapchat
    );

  // Pinterest
  document
    .getElementById("sharePinterest")
    .addEventListener(
      "click",
      sharePinterest
    );

  // Copy message
  document
    .getElementById("copyMessage")
    .addEventListener(
      "click",
      () => {
        copyText(getShareText());
      }
    );

  // Copy link
  document
    .getElementById("copyLink")
    .addEventListener(
      "click",
      () => {
        copyText(UNIVERSE139_URL);
      }
    );

  // More
  document
    .getElementById("shareMore")
    .addEventListener(
      "click",
      shareMore
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

  if (panel) {

    panel.classList.add(
      "closing"
    );

    setTimeout(() => {
      panel.remove();
    }, 200);

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

  document.body.appendChild(toast);

  setTimeout(() => {

    toast.classList.add(
      "show"
    );

  }, 20);

  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 1800);
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
        rgba(5, 2, 20, .88);

      backdrop-filter:
        blur(10px);

    }


    .shareModal {

      position: relative;

      width: min(
        620px,
        100%
      );

      max-height: 90vh;

      overflow-y: auto;

      padding: 28px;

      border-radius: 28px;

      background:
        linear-gradient(
          145deg,
          rgba(48, 18, 86, .98),
          rgba(17, 7, 38, .98)
        );

      border:
        1px solid
        rgba(255,255,255,.18);

      box-shadow:
        0 30px 100px
        rgba(0,0,0,.65);

      text-align: center;

      animation:
        shareModalIn .3s ease;

    }


    .shareUniverseLogo {

      width: 58px;
      height: 58px;

      margin:
        0 auto 12px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(255,255,255,.25),
          rgba(145,75,255,.2)
        );

      font-size: 28px;

      box-shadow:
        0 0 30px
        rgba(180,100,255,.35);

    }


    .shareModal h2 {

      margin:
        5px 40px 8px;

      font-size:
        clamp(20px, 5vw, 28px);

      color: white;

    }


    .shareDescription {

      margin:
        0 0 20px;

      color:
        rgba(255,255,255,.7);

      font-size:
        14px;

    }


    .shareClose {

      position: absolute;

      right: 16px;
      top: 12px;

      width: 40px;
      height: 40px;

      border: none;

      background:
        rgba(255,255,255,.08);

      color: white;

      border-radius: 50%;

      font-size: 27px;

      cursor: pointer;

      transition:
        .2s ease;

    }


    .shareClose:hover {

      background:
        rgba(255,255,255,.18);

      transform:
        rotate(90deg);

    }


    .sharePreview {

      margin-bottom: 22px;

      padding: 18px;

      border-radius: 18px;

      background:
        rgba(255,255,255,.06);

      border:
        1px solid
        rgba(255,255,255,.1);

    }


    .sharePreviewTitle {

      font-size: 13px;

      color:
        rgba(255,255,255,.65);

      margin-bottom: 10px;

    }


    .sharePreviewMessage {

      color: white;

      font-size: 16px;

      line-height: 1.5;

      margin-bottom: 12px;

    }


    .sharePreviewLink {

      color:
        #d9b6ff;

      font-weight: 600;

      font-size: 14px;

    }


    .shareGrid {

      display: grid;

      grid-template-columns:
        repeat(4, 1fr);

      gap: 12px;

    }


    .shareOption {

      min-height: 82px;

      border: 1px solid
        rgba(255,255,255,.1);

      border-radius: 18px;

      background:
        rgba(255,255,255,.055);

      color: white;

      cursor: pointer;

      display: flex;

      flex-direction: column;

      align-items: center;

      justify-content: center;

      gap: 7px;

      transition:
        transform .2s ease,
        background .2s ease,
        border-color .2s ease;

    }


    .shareOption span {

      font-size: 28px;

      line-height: 1;

    }


    .shareOption small {

      font-size: 11px;

      color:
        rgba(255,255,255,.85);

    }


    .shareOption:hover {

      transform:
        translateY(-4px)
        scale(1.03);

      background:
        rgba(255,255,255,.12);

      border-color:
        rgba(255,255,255,.3);

    }


    .shareOption:active {

      transform:
        scale(.96);

    }


    .shareOption.whatsapp:hover {
      background:
        rgba(37,211,102,.22);
    }

    .shareOption.facebook:hover {
      background:
        rgba(24,119,242,.22);
    }

    .shareOption.telegram:hover {
      background:
        rgba(0,136,204,.22);
    }

    .shareOption.tiktok:hover {
      background:
        rgba(0,0,0,.35);
    }

    .shareOption.instagram:hover {
      background:
        rgba(225,48,108,.22);
    }


    #universe139Toast {

      position: fixed;

      left: 50%;

      bottom: 30px;

      transform:
        translate(-50%, 20px);

      z-index: 11000;

      padding:
        12px 22px;

      border-radius: 30px;

      background:
        rgba(35,15,65,.96);

      border:
        1px solid
        rgba(255,255,255,.2);

      color: white;

      font-size: 14px;

      box-shadow:
        0 10px 40px
        rgba(0,0,0,.5);

      opacity: 0;

      transition:
        .3s ease;

      pointer-events: none;

    }


    #universe139Toast.show {

      opacity: 1;

      transform:
        translate(-50%, 0);

    }


    #universe139SharePanel.closing {

      animation:
        shareFadeOut .2s ease
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
          translateY(30px)
          scale(.94);

      }

      to {

        opacity: 1;

        transform:
          translateY(0)
          scale(1);

      }

    }


    @media (max-width: 600px) {

      .shareModal {

        padding:
          22px 16px;

        border-radius:
          24px;

      }


      .shareGrid {

        grid-template-columns:
          repeat(3, 1fr);

        gap: 9px;

      }


      .shareOption {

        min-height:
          76px;

        border-radius:
          15px;

      }


      .shareOption span {

        font-size:
          25px;

      }


      .shareOption small {

        font-size:
          10px;

      }

    }


    @media (max-width: 380px) {

      .shareGrid {

        grid-template-columns:
          repeat(2, 1fr);

      }

    }

  `;

  document.head.appendChild(style);
}


// ==========================================
// OPEN SHARE PANEL
// ==========================================

function shareMessage() {

  const currentMessage =
    message.textContent.trim();

  if (!currentMessage) {
    return;
  }

  createSharePanel();
}


// ==========================================
// BUTTON EVENTS
// ==========================================

document
  .querySelectorAll(".languageBtn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const language =
          button.dataset.language;

        selectLanguage(
          language
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


// ==========================================
// INITIAL STATE
// ==========================================

messageBox.classList.add(
  "hidden"
);

loading.classList.add(
  "hidden"
);

revealBtn.classList.add(
  "hidden"
);

againBtn.classList.add(
  "hidden"
);

shareBtn.classList.add(
  "hidden"
);


console.log(
  "✨ Universe139 loaded successfully"
);

console.log(
  "🌌 Universe139 URL:",
  UNIVERSE139_URL
);
