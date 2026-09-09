// ==========================================
// UNIVERSE139 — MESSAGE FROM THE UNIVERSE
// ==========================================

// Your website
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
    shareLink: "👆 Universe139 — Press here to see your message for today",
    copied: "Your Universe139 message has been copied!"
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
    shareLink: "👆 Universe139 — Pulsa aquí para recibir tu mensaje de hoy",
    copied: "¡Tu mensaje de Universe139 ha sido copiado!"
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
    shareLink: "👆 Universe139 — 点击这里查看你今天的宇宙讯息",
    copied: "你的 Universe139 讯息已复制！"
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
    shareLink: "👆 Universe139 — Нажми здесь, чтобы получить своё послание на сегодня",
    copied: "Ваше послание Universe139 скопировано!"
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
    shareLink: "👆 Universe139 — आज का अपना संदेश देखने के लिए यहां दबाएं",
    copied: "आपका Universe139 संदेश कॉपी हो गया है!"
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
    shareLink: "👆 Universe139 — กดที่นี่เพื่อดูข้อความของคุณสำหรับวันนี้",
    copied: "คัดลอกข้อความ Universe139 ของคุณแล้ว!"
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
// LANGUAGE SELECTION
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
    const randomIndex = Math.floor(Math.random() * messages.length);
    newMessage = messages[randomIndex];
  } while (messages.length > 1 && newMessage === lastMessage);

  lastMessage = newMessage;

  return newMessage;
}


// ==========================================
// HURRICANE / WIND EFFECT
// ==========================================

function createWindEffect() {

  const oldWind = document.getElementById("universeWind");

  if (oldWind) {
    oldWind.remove();
  }

  const wind = document.createElement("div");

  wind.id = "universeWind";

  wind.innerHTML = `
    <div class="wind wind1"></div>
    <div class="wind wind2"></div>
    <div class="wind wind3"></div>
    <div class="wind wind4"></div>
    <div class="wind wind5"></div>
  `;

  document.body.appendChild(wind);

  if (!document.getElementById("universeWindStyle")) {

    const style = document.createElement("style");

    style.id = "universeWindStyle";

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
        background: linear-gradient(
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
          transform: translateX(0) rotate(-2deg);
          opacity: 0;
        }

        20% {
          opacity: .7;
        }

        70% {
          opacity: .9;
        }

        100% {
          transform: translateX(260vw) rotate(2deg);
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

  const newMessage = getRandomMessage();

  message.textContent = newMessage;

  messageBox.classList.remove("hidden");

  messageBox.style.display = "block";

  message.style.opacity = "1";

  message.style.visibility = "visible";

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
// RECEIVE ANOTHER MESSAGE
// ==========================================

function receiveAnotherMessage() {

  if (isRevealing) {
    return;
  }

  isRevealing = true;

  createWindEffect();

  messageBox.style.opacity = "0";

  setTimeout(() => {

    messageBox.classList.add("hidden");

    loading.classList.remove("hidden");

    loadingText.textContent =
      translations[currentLanguage].loading;

  }, 300);

  setTimeout(() => {

    showMessage();

    messageBox.style.opacity = "1";

    isRevealing = false;

  }, 2500);
}


// ==========================================
// SHARE MESSAGE
// ==========================================

async function shareMessage() {

  const currentMessage =
    message.textContent.trim();

  if (!currentMessage) {
    return;
  }

  /*
    IMPORTANT:

    The actual current message is included first.

    Then the Universe139 invitation.

    Then the website address.

    This means people don't receive only a URL.
  */

  const shareText =
`✨ A Message From The Universe ✨

“${currentMessage}”

${translations[currentLanguage].shareLink}

${UNIVERSE139_URL}`;


  // ----------------------------------------
  // PHONE / WHATSAPP / FACEBOOK / ETC.
  // ----------------------------------------

  if (navigator.share) {

    try {

      await navigator.share({
        title: "Universe139",
        text: shareText
      });

    } catch (error) {

      // Ignore "user cancelled share"
      if (error.name !== "AbortError") {
        console.error("Share error:", error);
      }

    }

    return;
  }


  // ----------------------------------------
  // DESKTOP FALLBACK — COPY
  // ----------------------------------------

  try {

    await navigator.clipboard.writeText(shareText);

    alert(
      translations[currentLanguage].copied
    );

  } catch (error) {

    // Older browser fallback

    const textArea =
      document.createElement("textarea");

    textArea.value = shareText;

    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);

    textArea.select();

    document.execCommand("copy");

    textArea.remove();

    alert(
      translations[currentLanguage].copied
    );
  }
}


// ==========================================
// BUTTON EVENTS
// ==========================================

document.querySelectorAll(".languageBtn").forEach(button => {

  button.addEventListener("click", () => {

    const language =
      button.dataset.language;

    selectLanguage(language);

  });

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

messageBox.classList.add("hidden");
loading.classList.add("hidden");
revealBtn.classList.add("hidden");
againBtn.classList.add("hidden");
shareBtn.classList.add("hidden");

console.log(
  "✨ Universe139 loaded successfully"
);
console.log(
  "🌌 Universe139 URL:",
  UNIVERSE139_URL
);
