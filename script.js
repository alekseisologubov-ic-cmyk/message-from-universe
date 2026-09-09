/* =========================================================
   UNIVERSE139
   Message From The Universe
   ========================================================= */


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

  en: {
    title: "MESSAGE FROM<br>THE UNIVERSE",
    subtitle: "You were guided here for a reason.",
    choose: "Choose your language",
    reveal: "✨ REVEAL MY MESSAGE",
    connecting: "Connecting to the universe...",
    month: "YOUR MESSAGE FOR TODAY",
    small: "Keep this message close to your heart.",
    again: "🔮 RECEIVE ANOTHER MESSAGE",
    share: "✨ SHARE",
    wind: "THE WIND IS CARRYING YOUR MESSAGE...",
    connected: "STAY CONNECTED TO THE UNIVERSE"
  },

  es: {
    title: "MENSAJE DEL<br>UNIVERSO",
    subtitle: "Llegaste aquí por una razón.",
    choose: "Elige tu idioma",
    reveal: "✨ REVELAR MI MENSAJE",
    connecting: "Conectando con el universo...",
    month: "TU MENSAJE DE HOY",
    small: "Guarda este mensaje cerca de tu corazón.",
    again: "🔮 RECIBIR OTRO MENSAJE",
    share: "✨ COMPARTIR",
    wind: "EL VIENTO LLEVA TU MENSAJE...",
    connected: "MANTENTE CONECTADO CON EL UNIVERSO"
  },

  zh: {
    title: "来自宇宙的<br>讯息",
    subtitle: "你来到这里，是有原因的。",
    choose: "选择你的语言",
    reveal: "✨ 揭示我的讯息",
    connecting: "正在连接宇宙...",
    month: "你今天的讯息",
    small: "把这份讯息放在心里。",
    again: "🔮 接收另一条讯息",
    share: "✨ 分享",
    wind: "风正在带来你的讯息...",
    connected: "与宇宙保持连接"
  },

  ru: {
    title: "ПОСЛАНИЕ<br>ВСЕЛЕННОЙ",
    subtitle: "Ты оказался здесь не случайно.",
    choose: "Выберите язык",
    reveal: "✨ ПОЛУЧИТЬ МОЁ ПОСЛАНИЕ",
    connecting: "Соединяемся со Вселенной...",
    month: "ТВОЁ ПОСЛАНИЕ НА СЕГОДНЯ",
    small: "Сохрани это послание в своём сердце.",
    again: "🔮 ПОЛУЧИТЬ ДРУГОЕ ПОСЛАНИЕ",
    share: "✨ ПОДЕЛИТЬСЯ",
    wind: "ВЕТЕР НЕСЁТ ТВОЁ ПОСЛАНИЕ...",
    connected: "ОСТАВАЙСЯ НА СВЯЗИ СО ВСЕЛЕННОЙ"
  },

  hi: {
    title: "ब्रह्मांड का<br>संदेश",
    subtitle: "आप यहां किसी कारण से पहुंचे हैं।",
    choose: "अपनी भाषा चुनें",
    reveal: "✨ मेरा संदेश देखें",
    connecting: "ब्रह्मांड से जुड़ रहे हैं...",
    month: "आज का आपका संदेश",
    small: "इस संदेश को अपने दिल के करीब रखें।",
    again: "🔮 एक और संदेश प्राप्त करें",
    share: "✨ साझा करें",
    wind: "हवा आपका संदेश ला रही है...",
    connected: "ब्रह्मांड से जुड़े रहें"
  },

  th: {
    title: "ข้อความจาก<br>จักรวาล",
    subtitle: "คุณมาที่นี่ด้วยเหตุผลบางอย่าง",
    choose: "เลือกภาษาของคุณ",
    reveal: "✨ เปิดเผยข้อความของฉัน",
    connecting: "กำลังเชื่อมต่อกับจักรวาล...",
    month: "ข้อความสำหรับคุณวันนี้",
    small: "เก็บข้อความนี้ไว้ใกล้หัวใจ",
    again: "🔮 รับข้อความอีกครั้ง",
    share: "✨ แชร์",
    wind: "สายลมกำลังนำข้อความมาหาคุณ...",
    connected: "เชื่อมต่อกับจักรวาลต่อไป"
  }

};


/* =========================================================
   MESSAGE LIBRARY
   ========================================================= */

const messageTemplates = {

  en: [
    "Something you have been waiting for is beginning to move.",
    "Trust the feeling that keeps returning to your heart.",
    "A new opportunity is closer than you think.",
    "The answer you need will appear at the right moment.",
    "You are entering a period of powerful change.",
    "Someone is thinking about you with warmth.",
    "Do not be afraid to begin again.",
    "Your patience is about to be rewarded.",
    "A financial opportunity may appear unexpectedly.",
    "The path ahead is opening for you.",
    "Let go of what no longer belongs in your future.",
    "Your intuition already knows the answer.",
    "A positive surprise is approaching.",
    "The universe is moving something into your favor.",
    "Your next decision can change more than you realize.",
    "A door that seemed closed may open again.",
    "You are closer to your goal than you think.",
    "Something beautiful is developing quietly.",
    "Believe in the timing of your life.",
    "Your energy is attracting a new beginning."
  ],

  es: [
    "Algo que has estado esperando comienza a moverse.",
    "Confía en ese sentimiento que vuelve a tu corazón.",
    "Una nueva oportunidad está más cerca de lo que crees.",
    "La respuesta llegará en el momento adecuado.",
    "Estás entrando en una etapa de grandes cambios.",
    "Alguien piensa en ti con cariño.",
    "No tengas miedo de comenzar de nuevo.",
    "Tu paciencia pronto será recompensada.",
    "Una oportunidad financiera puede aparecer inesperadamente.",
    "El camino delante de ti se está abriendo.",
    "Deja ir lo que ya no pertenece a tu futuro.",
    "Tu intuición ya conoce la respuesta.",
    "Una sorpresa positiva se acerca.",
    "El universo está moviendo algo a tu favor.",
    "Tu próxima decisión puede cambiar mucho más de lo que imaginas.",
    "Una puerta que parecía cerrada puede volver a abrirse.",
    "Estás más cerca de tu objetivo de lo que crees.",
    "Algo hermoso está creciendo en silencio.",
    "Confía en el momento de tu vida.",
    "Tu energía está atrayendo un nuevo comienzo."
  ],

  zh: [
    "你一直等待的事情正在开始发生变化。",
    "相信那个不断回到你心里的感觉。",
    "一个新的机会比你想象的更近。",
    "你需要的答案会在正确的时刻出现。",
    "你正在进入一个充满变化的阶段。",
    "有人正在温暖地想着你。",
    "不要害怕重新开始。",
    "你的耐心即将得到回报。",
    "一个意想不到的财务机会可能出现。",
    "前方的道路正在为你打开。",
    "放下那些不再属于未来的事物。",
    "你的直觉已经知道答案。",
    "一个积极的惊喜正在靠近。",
    "宇宙正在让事情向你有利的方向发展。",
    "你的下一个决定可能改变很多事情。",
    "一扇看似关闭的门可能再次打开。",
    "你比想象中更接近目标。",
    "美好的事情正在悄悄发生。",
    "相信属于你的人生时机。",
    "你的能量正在吸引新的开始。"
  ],

  ru: [
    "То, чего ты давно ждёшь, начинает двигаться к тебе.",
    "Доверься чувству, которое снова и снова возвращается в твоё сердце.",
    "Новая возможность ближе, чем тебе кажется.",
    "Ответ, который тебе нужен, появится в правильный момент.",
    "Ты входишь в период сильных перемен.",
    "Кто-то думает о тебе с теплом.",
    "Не бойся начать всё сначала.",
    "Твоё терпение скоро будет вознаграждено.",
    "Неожиданно может появиться финансовая возможность.",
    "Дорога впереди начинает открываться.",
    "Отпусти то, чему больше нет места в твоём будущем.",
    "Твоя интуиция уже знает ответ.",
    "Положительный сюрприз приближается.",
    "Вселенная направляет события в твою пользу.",
    "Твоё следующее решение может изменить больше, чем ты думаешь.",
    "Дверь, которая казалась закрытой, может снова открыться.",
    "Ты ближе к своей цели, чем тебе кажется.",
    "Что-то прекрасное развивается прямо сейчас.",
    "Доверься времени своей жизни.",
    "Твоя энергия притягивает новое начало."
  ],

  hi: [
    "जिस चीज़ का आप इंतज़ार कर रहे हैं, वह अब आगे बढ़ रही है।",
    "उस भावना पर भरोसा करें जो बार-बार आपके दिल में लौटती है।",
    "एक नया अवसर आपकी सोच से अधिक करीब है।",
    "जिस उत्तर की आपको जरूरत है, वह सही समय पर आएगा।",
    "आप बदलाव के एक शक्तिशाली दौर में प्रवेश कर रहे हैं।",
    "कोई आपको गर्मजोशी के साथ याद कर रहा है।",
    "फिर से शुरुआत करने से मत डरिए।",
    "आपका धैर्य जल्द ही फल देगा।",
    "एक अप्रत्याशित वित्तीय अवसर सामने आ सकता है।",
    "आपके सामने का रास्ता खुल रहा है।",
    "जो आपके भविष्य का हिस्सा नहीं है उसे जाने दें।",
    "आपका अंतर्ज्ञान पहले से ही उत्तर जानता है।",
    "एक सकारात्मक आश्चर्य आपके करीब आ रहा है।",
    "ब्रह्मांड चीज़ों को आपके पक्ष में ला रहा है।",
    "आपका अगला निर्णय आपकी कल्पना से अधिक बदल सकता है।",
    "एक बंद दरवाज़ा फिर से खुल सकता है।",
    "आप अपने लक्ष्य के बहुत करीब हैं।",
    "कुछ सुंदर चीज़ चुपचाप विकसित हो रही है।",
    "अपने जीवन के सही समय पर भरोसा करें।",
    "आपकी ऊर्जा एक नई शुरुआत को आकर्षित कर रही है।"
  ],

  th: [
    "สิ่งที่คุณรอคอยกำลังเริ่มเคลื่อนไหว",
    "เชื่อในความรู้สึกที่กลับมาอยู่ในหัวใจของคุณเสมอ",
    "โอกาสใหม่อยู่ใกล้กว่าที่คุณคิด",
    "คำตอบที่คุณต้องการจะปรากฏในเวลาที่เหมาะสม",
    "คุณกำลังเข้าสู่ช่วงเวลาแห่งการเปลี่ยนแปลงครั้งสำคัญ",
    "มีใครบางคนกำลังคิดถึงคุณด้วยความอบอุ่น",
    "อย่ากลัวที่จะเริ่มต้นใหม่",
    "ความอดทนของคุณกำลังจะได้รับผลตอบแทน",
    "โอกาสทางการเงินอาจปรากฏขึ้นอย่างไม่คาดคิด",
    "เส้นทางข้างหน้ากำลังเปิดออก",
    "ปล่อยสิ่งที่ไม่เป็นส่วนหนึ่งของอนาคตคุณอีกต่อไป",
    "สัญชาตญาณของคุณรู้คำตอบอยู่แล้ว",
    "เรื่องน่าประหลาดใจในทางที่ดีกำลังเข้ามา",
    "จักรวาลกำลังนำสิ่งต่าง ๆ ไปในทางที่เป็นประโยชน์ต่อคุณ",
    "การตัดสินใจครั้งต่อไปอาจเปลี่ยนแปลงมากกว่าที่คุณคิด",
    "ประตูที่ดูเหมือนปิดอาจเปิดขึ้นอีกครั้ง",
    "คุณใกล้ถึงเป้าหมายมากกว่าที่คิด",
    "สิ่งสวยงามกำลังเกิดขึ้นอย่างเงียบ ๆ",
    "เชื่อมั่นในเวลาของชีวิตคุณ",
    "พลังงานของคุณกำลังดึงดูดการเริ่มต้นใหม่"
  ]

};


/* =========================================================
   STATE
   ========================================================= */

let currentLanguage = "en";
let lastMessage = "";
let transitionRunning = false;


/* =========================================================
   DOM
   ========================================================= */

const languageBox = document.getElementById("languageBox");
const languageButtons = document.querySelectorAll(".languageBtn");

const revealBtn = document.getElementById("revealBtn");

const loading = document.getElementById("loading");
const loadingText = document.getElementById("loadingText");

const messageBox = document.getElementById("messageBox");
const message = document.getElementById("message");

const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const chooseLanguage = document.getElementById("chooseLanguage");

const month = document.getElementById("month");
const smallText = document.getElementById("smallText");

const againBtn = document.getElementById("againBtn");
const shareBtn = document.getElementById("shareBtn");


/* =========================================================
   SAFETY CHECK
   ========================================================= */

if (!messageBox || !message) {
  console.error("Universe139: Message elements were not found.");
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function selectLanguage(lang) {

  if (!translations[lang]) {
    lang = "en";
  }

  currentLanguage = lang;

  const t = translations[lang];

  title.innerHTML = t.title;
  subtitle.textContent = t.subtitle;
  chooseLanguage.textContent = t.choose;

  revealBtn.textContent = t.reveal;
  loadingText.textContent = t.connecting;

  month.textContent = t.month;
  smallText.textContent = t.small;

  againBtn.textContent = t.again;
  shareBtn.textContent = t.share;

  languageBox.classList.add("hidden");

  revealBtn.classList.remove("hidden");

  /*
     Automatically reveal the first message.
  */

  setTimeout(() => {
    revealFirstMessage();
  }, 400);
}


/* =========================================================
   MESSAGE GENERATOR
   ========================================================= */

function getRandomMessage() {

  const list =
    messageTemplates[currentLanguage] ||
    messageTemplates.en;

  if (!list || list.length === 0) {
    return "Your message is on its way.";
  }

  let newMessage;

  do {
    const index =
      Math.floor(Math.random() * list.length);

    newMessage = list[index];

  } while (
    list.length > 1 &&
    newMessage === lastMessage
  );

  lastMessage = newMessage;

  return newMessage;
}


/* =========================================================
   SHOW MESSAGE
   ========================================================= */

function showMessage(text) {

  if (!messageBox || !message) return;

  message.textContent = text;

  loading.classList.add("hidden");

  messageBox.classList.remove("hidden");

  /*
     Make absolutely sure the message is visible.
  */

  messageBox.style.display = "block";
  messageBox.style.visibility = "visible";
  messageBox.style.opacity = "1";

  message.style.display = "block";
  message.style.visibility = "visible";
  message.style.opacity = "1";

  /*
     Small entrance animation.
  */

  message.style.transform = "translateY(10px)";
  message.style.transition =
    "opacity 0.8s ease, transform 0.8s ease";

  requestAnimationFrame(() => {

    message.style.opacity = "1";
    message.style.transform = "translateY(0)";

  });
}


/* =========================================================
   FIRST MESSAGE
   ========================================================= */

function revealFirstMessage() {

  revealBtn.classList.add("hidden");
  messageBox.classList.add("hidden");

  loading.classList.remove("hidden");

  loadingText.textContent =
    translations[currentLanguage].connecting;

  setTimeout(() => {

    const newMessage = getRandomMessage();

    showMessage(newMessage);

  }, 1600);
}


/* =========================================================
   HURRICANE CSS
   ========================================================= */

function createHurricane() {

  const existing =
    document.getElementById("universeHurricane");

  if (existing) {
    existing.remove();
  }

  const hurricane =
    document.createElement("div");

  hurricane.id = "universeHurricane";

  hurricane.innerHTML = `

    <div class="hurricaneGlow"></div>

    <div class="wind wind1"></div>
    <div class="wind wind2"></div>
    <div class="wind wind3"></div>
    <div class="wind wind4"></div>
    <div class="wind wind5"></div>
    <div class="wind wind6"></div>

    <div class="hurricaneRing ring1"></div>
    <div class="hurricaneRing ring2"></div>
    <div class="hurricaneRing ring3"></div>

    <div class="hurricaneEye">
      <div class="eyeCore"></div>
    </div>

    <div class="hurricaneText">

      <div class="windMain">
        ${translations[currentLanguage].wind}
      </div>

      <div class="windSub">
        ${translations[currentLanguage].connected}
      </div>

    </div>
  `;

  const style =
    document.createElement("style");

  style.id = "hurricaneStyle";

  style.textContent = `

    #universeHurricane {

      position: fixed;

      inset: 0;

      z-index: 9999;

      display: flex;

      align-items: center;
      justify-content: center;

      overflow: hidden;

      background:
        radial-gradient(
          circle at center,
          rgba(150,90,255,0.20),
          rgba(5,3,9,0.96) 70%
        );

      opacity: 0;

      animation:
        hurricaneAppear 0.7s ease forwards;

      pointer-events: all;
    }


    .hurricaneGlow {

      position: absolute;

      width: 500px;
      height: 500px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(190,130,255,0.28),
          transparent 70%
        );

      filter: blur(30px);

      animation:
        glowPulse 2s ease-in-out infinite;
    }


    .hurricaneRing {

      position: absolute;

      width: 250px;
      height: 250px;

      border-radius: 50%;

      border:
        1px solid
        rgba(220,190,255,0.38);

      box-shadow:
        0 0 30px rgba(170,100,255,0.20),
        inset 0 0 30px rgba(170,100,255,0.12);

      transform:
        rotate(0deg);

      animation:
        hurricaneSpin 2.5s linear infinite;
    }


    .ring2 {

      width: 390px;
      height: 390px;

      animation-duration: 3.5s;

      animation-direction: reverse;

      opacity: 0.55;
    }


    .ring3 {

      width: 540px;
      height: 540px;

      animation-duration: 5s;

      opacity: 0.28;
    }


    .wind {

      position: absolute;

      width: 320px;
      height: 2px;

      border-radius: 50%;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,0.7),
          transparent
        );

      opacity: 0.35;

      transform-origin: center;

      animation:
        windSpin 1.5s linear infinite;
    }


    .wind1 {
      transform: rotate(12deg) translateX(180px);
    }

    .wind2 {
      transform: rotate(65deg) translateX(200px);
      animation-duration: 1.9s;
    }

    .wind3 {
      transform: rotate(120deg) translateX(190px);
      animation-duration: 2.2s;
    }

    .wind4 {
      transform: rotate(180deg) translateX(210px);
      animation-duration: 1.7s;
    }

    .wind5 {
      transform: rotate(240deg) translateX(180px);
      animation-duration: 2.4s;
    }

    .wind6 {
      transform: rotate(300deg) translateX(210px);
      animation-duration: 1.8s;
    }


    .hurricaneEye {

      position: absolute;

      width: 115px;
      height: 115px;

      border-radius: 50%;

      display: flex;

      align-items: center;
      justify-content: center;

      background:
        radial-gradient(
          circle,
          rgba(220,190,255,0.22),
          rgba(100,50,180,0.10) 55%,
          transparent 70%
        );

      border:
        1px solid
        rgba(255,255,255,0.28);

      box-shadow:
        0 0 50px
        rgba(180,110,255,0.35);

      animation:
        eyePulse 2s ease-in-out infinite;
    }


    .eyeCore {

      width: 30px;
      height: 30px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          white 0%,
          rgba(210,170,255,0.9) 25%,
          rgba(150,80,255,0.3) 60%,
          transparent 75%
        );

      box-shadow:
        0 0 30px
        rgba(220,190,255,0.9);
    }


    .hurricaneText {

      position: absolute;

      top: calc(50% + 100px);

      width: 100%;

      text-align: center;

      padding: 0 20px;

      text-shadow:
        0 0 20px
        rgba(190,130,255,0.7);
    }


    .windMain {

      font-size:
        clamp(13px, 3vw, 19px);

      letter-spacing: 3px;

      font-weight: 700;

      opacity: 0.95;
    }


    .windSub {

      margin-top: 12px;

      font-size: 11px;

      letter-spacing: 2px;

      opacity: 0.55;
    }


    @keyframes hurricaneAppear {

      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }

    }


    @keyframes hurricaneSpin {

      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }

    }


    @keyframes windSpin {

      from {
        transform:
          rotate(0deg)
          translateX(160px);
      }

      to {
        transform:
          rotate(360deg)
          translateX(160px);
      }

    }


    @keyframes eyePulse {

      0%, 100% {
        transform: scale(0.95);
      }

      50% {
        transform: scale(1.08);
      }

    }


    @keyframes glowPulse {

      0%, 100% {
        opacity: 0.55;
        transform: scale(0.9);
      }

      50% {
        opacity: 1;
        transform: scale(1.12);
      }

    }


    @media (prefers-reduced-motion: reduce) {

      #universeHurricane *,
      #universeHurricane {
        animation: none !important;
      }

    }

  `;

  document.head.appendChild(style);
  document.body.appendChild(hurricane);

  return hurricane;
}


/* =========================================================
   RECEIVE ANOTHER MESSAGE
   ========================================================= */

function receiveAnotherMessage() {

  /*
     Prevent double clicks while animation is running.
  */

  if (transitionRunning) return;

  transitionRunning = true;

  againBtn.disabled = true;

  /*
     Hide current message.
  */

  messageBox.classList.add("hidden");

  /*
     Create hurricane.
  */

  const hurricane = createHurricane();

  /*
     Keep the universe transition visible.
  */

  setTimeout(() => {

    if (hurricane) {

      hurricane.style.transition =
        "opacity 0.8s ease";

      hurricane.style.opacity = "0";

    }

    setTimeout(() => {

      if (hurricane) {
        hurricane.remove();
      }

      const newMessage =
        getRandomMessage();

      showMessage(newMessage);

      transitionRunning = false;

      againBtn.disabled = false;

    }, 800);

  }, 2800);
}


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

languageButtons.forEach(button => {

  button.addEventListener("click", () => {

    const language =
      button.dataset.language;

    selectLanguage(language);

  });

});


revealBtn.addEventListener(
  "click",
  revealFirstMessage
);


againBtn.addEventListener(
  "click",
  receiveAnotherMessage
);


/* =========================================================
   SHARE
   ========================================================= */

shareBtn.addEventListener(
  "click",
  async () => {

    const text =
      `${message.textContent}\n\n— Universe139`;

    try {

      if (navigator.share) {

        await navigator.share({
          title: "Universe139",
          text: text
        });

      } else {

        await navigator.clipboard.writeText(text);

        const original =
          shareBtn.textContent;

        shareBtn.textContent =
          "✓ COPIED";

        setTimeout(() => {

          shareBtn.textContent =
            original;

        }, 1800);
      }

    } catch (error) {

      console.log(
        "Share cancelled or unavailable.",
        error
      );

    }

  }
);


/* =========================================================
   STARTUP
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /*
       Make sure message starts hidden.
    */

    messageBox.classList.add("hidden");

    loading.classList.add("hidden");

    revealBtn.classList.add("hidden");

  }
);
