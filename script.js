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
    shareInstructions:
      "Elige dónde quieres compartir tu mensaje.",

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
    shareInstructions:
      "选择你想分享讯息的方式。",

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
    shareInstructions:
      "Выберите, где вы хотите поделиться своим посланием.",

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
    shareInstructions:
      "चुनें कि आप अपना संदेश कहाँ साझा करना चाहते हैं।",

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
    shareInstructions:
      "เลือกสถานที่ที่คุณต้องการแชร์ข้อความของคุณ",

    shareLink:
      "👆 Universe139 — กดที่นี่เพื่อดูข้อความของคุณสำหรับวันนี้"
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
// VARIABLES
// ==========================================

let currentLanguage = "en";
let lastMessage = "";
let isRevealing = false;


// ==========================================
// DOM
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
  }, 400);
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
// COSMIC TORNADO
// ==========================================

function createWindEffect() {

  const oldEffect =
    document.getElementById("universeWind");

  if (oldEffect) {
    oldEffect.remove();
  }

  const tornado =
    document.createElement("div");

  tornado.id = "universeWind";

  tornado.innerHTML = `

    <div class="tornadoUniverseGlow"></div>

    <div class="tornadoCore">

      <div class="tornadoRing ring1"></div>
      <div class="tornadoRing ring2"></div>
      <div class="tornadoRing ring3"></div>
      <div class="tornadoRing ring4"></div>
      <div class="tornadoRing ring5"></div>
      <div class="tornadoRing ring6"></div>
      <div class="tornadoRing ring7"></div>
      <div class="tornadoRing ring8"></div>
      <div class="tornadoRing ring9"></div>
      <div class="tornadoRing ring10"></div>

      <div class="tornadoEye"></div>

    </div>

    <div class="tornadoDust">

      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>

    </div>

    <div class="tornadoMist mist1"></div>
    <div class="tornadoMist mist2"></div>
    <div class="tornadoMist mist3"></div>

  `;

  document.body.appendChild(tornado);


  if (!document.getElementById("universe139TornadoCSS")) {

    const style = document.createElement("style");

    style.id = "universe139TornadoCSS";

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
          tornadoFade 2.9s ease-out forwards;
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
          universeCoreExplosion 2.6s ease-out forwards;
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

        transform-style: preserve-3d;

        animation:
          tornadoExpand 2.7s
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

        transform-style: preserve-3d;

        border:
          3px solid
          rgba(220,180,255,.42);

        box-shadow:
          0 0 15px rgba(200,140,255,.55),
          0 0 40px rgba(130,60,255,.35),
          inset 0 0 20px rgba(255,255,255,.1);

        opacity: 0;

        filter: blur(.7px);
      }


      .ring1 { animation: ringSpin1 2.5s linear forwards; }
      .ring2 { animation: ringSpin2 2.4s linear .04s forwards; }
      .ring3 { animation: ringSpin1 2.3s linear .08s forwards; }
      .ring4 { animation: ringSpin2 2.2s linear .12s forwards; }
      .ring5 { animation: ringSpin1 2.1s linear .16s forwards; }
      .ring6 { animation: ringSpin2 2s linear .2s forwards; }
      .ring7 { animation: ringSpin1 1.9s linear .24s forwards; }
      .ring8 { animation: ringSpin2 1.8s linear .28s forwards; }
      .ring9 { animation: ringSpin1 1.7s linear .32s forwards; }
      .ring10 { animation: ringSpin2 1.6s linear .36s forwards; }


      @keyframes ringSpin1 {

        0% {
          opacity: 0;

          width: 8vw;
          height: 3vw;

          transform:
            translate(-50%, -50%)
            rotateX(68deg)
            rotateZ(0deg)
            scale(.2);
        }

        15% {
          opacity: .75;
        }

        45% {
          opacity: .95;
        }

        75% {
          opacity: .65;
        }

        100% {
          opacity: 0;

          width: 110vw;
          height: 30vw;

          transform:
            translate(-50%, -50%)
            rotateX(68deg)
            rotateZ(1080deg)
            scale(1);
        }
      }


      @keyframes ringSpin2 {

        0% {
          opacity: 0;

          width: 8vw;
          height: 3vw;

          transform:
            translate(-50%, -50%)
            rotateX(68deg)
            rotateZ(180deg)
            scale(.2);
        }

        15% {
          opacity: .7;
        }

        45% {
          opacity: .9;
        }

        75% {
          opacity: .6;
        }

        100% {
          opacity: 0;

          width: 120vw;
          height: 32vw;

          transform:
            translate(-50%, -50%)
            rotateX(68deg)
            rotateZ(-900deg)
            scale(1);
        }
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
          eyePulse 2.5s ease-out forwards;
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


      .tornadoDust {
        position: absolute;
        inset: 0;

        transform-style: preserve-3d;
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
          0 0 10px rgba(220,180,255,.95);

        opacity: 0;
      }


      .tornadoDust span:nth-child(1) {
        animation: dust1 2.3s linear forwards;
      }

      .tornadoDust span:nth-child(2) {
        animation: dust2 2.1s linear .08s forwards;
      }

      .tornadoDust span:nth-child(3) {
        animation: dust3 2.4s linear .16s forwards;
      }

      .tornadoDust span:nth-child(4) {
        animation: dust4 2.2s linear .24s forwards;
      }

      .tornadoDust span:nth-child(5) {
        animation: dust5 2.5s linear .32s forwards;
      }

      .tornadoDust span:nth-child(6) {
        animation: dust6 2.2s linear .4s forwards;
      }

      .tornadoDust span:nth-child(7) {
        animation: dust7 2.4s linear .48s forwards;
      }

      .tornadoDust span:nth-child(8) {
        animation: dust8 2.1s linear .56s forwards;
      }

      .tornadoDust span:nth-child(9) {
        animation: dust9 2.5s linear .64s forwards;
      }

      .tornadoDust span:nth-child(10) {
        animation: dust10 2.2s linear .72s forwards;
      }

      .tornadoDust span:nth-child(11) {
        animation: dust11 2.4s linear .8s forwards;
      }

      .tornadoDust span:nth-child(12) {
        animation: dust12 2.1s linear .88s forwards;
      }

      .tornadoDust span:nth-child(13) {
        animation: dust13 2.5s linear .96s forwards;
      }

      .tornadoDust span:nth-child(14) {
        animation: dust14 2.2s linear 1.04s forwards;
      }

      .tornadoDust span:nth-child(15) {
        animation: dust15 2.4s linear 1.12s forwards;
      }

      .tornadoDust span:nth-child(16) {
        animation: dust16 2.1s linear 1.2s forwards;
      }

      .tornadoDust span:nth-child(17) {
        animation: dust17 2.5s linear 1.28s forwards;
      }

      .tornadoDust span:nth-child(18) {
        animation: dust18 2.2s linear 1.36s forwards;
      }

      .tornadoDust span:nth-child(19) {
        animation: dust19 2.4s linear 1.44s forwards;
      }

      .tornadoDust span:nth-child(20) {
        animation: dust20 2.1s linear 1.52s forwards;
      }


      @keyframes dust1 {
        0% {
          opacity: 0;
          transform:
            rotate(0deg)
            translateX(650px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(420deg)
            translateX(130px)
            scale(1.5);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1000deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust2 {
        0% {
          opacity: 0;
          transform:
            rotate(45deg)
            translateX(700px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(500deg)
            translateX(150px)
            scale(1.4);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1100deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust3 {
        0% {
          opacity: 0;
          transform:
            rotate(90deg)
            translateX(620px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(560deg)
            translateX(120px)
            scale(1.5);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1200deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust4 {
        0% {
          opacity: 0;
          transform:
            rotate(135deg)
            translateX(680px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(470deg)
            translateX(140px)
            scale(1.3);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1000deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust5 {
        0% {
          opacity: 0;
          transform:
            rotate(180deg)
            translateX(720px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(620deg)
            translateX(160px)
            scale(1.6);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1250deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust6 {
        0% {
          opacity: 0;
          transform:
            rotate(225deg)
            translateX(630px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(530deg)
            translateX(130px)
            scale(1.4);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1100deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust7 {
        0% {
          opacity: 0;
          transform:
            rotate(270deg)
            translateX(690px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(680deg)
            translateX(150px)
            scale(1.5);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1300deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust8 {
        0% {
          opacity: 0;
          transform:
            rotate(315deg)
            translateX(610px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(580deg)
            translateX(120px)
            scale(1.4);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1150deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust9 {
        0% {
          opacity: 0;
          transform:
            rotate(20deg)
            translateX(730px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(600deg)
            translateX(145px)
            scale(1.5);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1200deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust10 {
        0% {
          opacity: 0;
          transform:
            rotate(65deg)
            translateX(640px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(510deg)
            translateX(130px)
            scale(1.4);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1080deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust11 {
        0% {
          opacity: 0;
          transform:
            rotate(110deg)
            translateX(700px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(640deg)
            translateX(150px)
            scale(1.5);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1280deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust12 {
        0% {
          opacity: 0;
          transform:
            rotate(155deg)
            translateX(620px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(490deg)
            translateX(125px)
            scale(1.4);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1050deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust13 {
        0% {
          opacity: 0;
          transform:
            rotate(200deg)
            translateX(710px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(590deg)
            translateX(155px)
            scale(1.5);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1180deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust14 {
        0% {
          opacity: 0;
          transform:
            rotate(245deg)
            translateX(650px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(530deg)
            translateX(135px)
            scale(1.4);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1120deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust15 {
        0% {
          opacity: 0;
          transform:
            rotate(290deg)
            translateX(730px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(650deg)
            translateX(160px)
            scale(1.6);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1300deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust16 {
        0% {
          opacity: 0;
          transform:
            rotate(335deg)
            translateX(610px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(470deg)
            translateX(125px)
            scale(1.3);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1000deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust17 {
        0% {
          opacity: 0;
          transform:
            rotate(15deg)
            translateX(680px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(610deg)
            translateX(145px)
            scale(1.5);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1250deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust18 {
        0% {
          opacity: 0;
          transform:
            rotate(75deg)
            translateX(660px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(550deg)
            translateX(135px)
            scale(1.4);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1150deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust19 {
        0% {
          opacity: 0;
          transform:
            rotate(150deg)
            translateX(720px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(670deg)
            translateX(155px)
            scale(1.5);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1350deg)
            translateX(5px)
            scale(.05);
        }
      }


      @keyframes dust20 {
        0% {
          opacity: 0;
          transform:
            rotate(250deg)
            translateX(690px)
            scale(.2);
        }

        20% { opacity: 1; }

        65% {
          transform:
            rotate(520deg)
            translateX(140px)
            scale(1.4);
        }

        100% {
          opacity: 0;
          transform:
            rotate(1080deg)
            translateX(5px)
            scale(.05);
        }
      }


      .tornadoMist {

        position: absolute;

        left: 50%;
        top: 50%;

        border-radius: 50%;

        transform:
          translate(-50%, -50%);

        filter: blur(30px);

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
          mistRotation 2.5s ease-out forwards;
      }


      .mist2 {
        width: 55vw;
        height: 15vw;

        animation:
          mistRotation 2.2s ease-out .15s forwards;
      }


      .mist3 {
        width: 38vw;
        height: 11vw;

        animation:
          mistRotation 2s ease-out .3s forwards;
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

    `;

    document.head.appendChild(style);
  }


  setTimeout(() => {

    tornado.remove();

  }, 3000);
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

  messageBox.style.display = "block";

  messageBox.style.opacity = "0";

  loading.classList.add("hidden");

  revealBtn.classList.add("hidden");

  againBtn.classList.remove("hidden");

  shareBtn.classList.remove("hidden");


  setTimeout(() => {

    messageBox.style.transition =
      "opacity .8s ease, transform .8s ease";

    messageBox.style.opacity = "1";

    messageBox.style.transform =
      "translateY(0) scale(1)";

  }, 80);
}


// ==========================================
// FIRST REVEAL
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


  createWindEffect();


  setTimeout(() => {

    showMessage();

    isRevealing = false;

  }, 2400);
}


// ==========================================
// ANOTHER MESSAGE
// ==========================================

function receiveAnotherMessage() {

  if (isRevealing) {
    return;
  }

  isRevealing = true;

  messageBox.style.opacity = "0";

  messageBox.style.transform =
    "scale(.95)";

  againBtn.classList.add("hidden");

  shareBtn.classList.add("hidden");


  createWindEffect();


  setTimeout(() => {

    messageBox.classList.add("hidden");

    loading.classList.remove("hidden");

    loadingText.textContent =
      translations[currentLanguage].loading;

  }, 350);


  setTimeout(() => {

    showMessage();

    isRevealing = false;

  }, 2400);
}


// ==========================================
// COMPLETE SHARE TEXT
// ==========================================

function getShareText() {

  const currentMessage =
    message.textContent.trim();

  if (!currentMessage) {
    return "";
  }

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

async function copyText(text) {

  if (!text) {
    return;
  }

  try {

    await navigator.clipboard.writeText(text);

    showShareToast(
      translations[currentLanguage].copied
    );

  } catch (error) {

    const textarea =
      document.createElement("textarea");

    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showShareToast(
      translations[currentLanguage].copied
    );
  }
}


// ==========================================
// WHATSAPP
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
// FACEBOOK
// ==========================================

async function shareFacebook() {

  const text =
    getShareText();

  // Facebook does not allow arbitrary
  // text to be injected into its composer.
  // Copy the complete message first.
  await copyText(text);

  setTimeout(() => {

    const url =
      encodeURIComponent(
        UNIVERSE139_URL
      );

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "width=600,height=500"
    );

  }, 700);
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
    "_blank"
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
    "_blank"
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

  const text =
    getShareText();

  await copyText(text);

  setTimeout(() => {

    const url =
      encodeURIComponent(
        UNIVERSE139_URL
      );

    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "width=600,height=600"
    );

  }, 700);
}


// ==========================================
// REDDIT
// ==========================================

async function shareReddit() {

  const text =
    getShareText();

  await copyText(text);

  setTimeout(() => {

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

  }, 700);
}


// ==========================================
// VIBER
// ==========================================

async function shareViber() {

  const text =
    getShareText();

  await copyText(text);

  setTimeout(() => {

    window.location.href =
      `viber://forward?text=${encodeURIComponent(text)}`;

  }, 300);
}


// ==========================================
// TIKTOK
// ==========================================

async function shareTikTok() {

  const text =
    getShareText();

  // TikTok does not allow a website
  // to pre-fill arbitrary caption text.
  // Copy the complete Universe139 message.
  await copyText(text);

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

  const text =
    getShareText();

  // Instagram does not allow arbitrary
  // web pre-filled captions.
  // Copy the complete message first.
  await copyText(text);

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

  const text =
    getShareText();

  await copyText(text);

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
// MORE / NATIVE SHARE
// ==========================================

async function shareMore() {

  const text =
    getShareText();

  if (!text) {
    return;
  }

  if (navigator.share) {

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
        error.name !== "AbortError"
      ) {

        console.error(
          "Share error:",
          error
        );

      }

    }

  } else {

    await copyText(text);

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

    toast.classList.add("show");

  }, 20);

  setTimeout(() => {

    toast.classList.remove("show");

    setTimeout(() => {

      toast.remove();

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
    message.textContent.trim();

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


      <h2>
        ${t.shareTitle}
      </h2>


      <p class="shareDescription">
        ${t.shareInstructions}
      </p>


      <!-- ACTUAL MESSAGE PREVIEW -->

      <div class="sharePreview">

        <div class="sharePreviewTitle">
          ✨ A Message From The Universe ✨
        </div>

        <div class="sharePreviewMessage">
          “${currentMessage}”
        </div>

        <div class="sharePreviewLink">
          ${UNIVERSE139_URL}
        </div>

      </div>


      <!-- TEXT ONLY BUTTONS -->

      <div class="shareGrid">

        <button
          class="shareOption"
          id="shareWhatsApp"
        >
          WhatsApp
        </button>

        <button
          class="shareOption"
          id="shareFacebook"
        >
          Facebook
        </button>

        <button
          class="shareOption"
          id="shareTelegram"
        >
          Telegram
        </button>

        <button
          class="shareOption"
          id="shareGmail"
        >
          Gmail
        </button>

        <button
          class="shareOption"
          id="shareEmail"
        >
          Email
        </button>

        <button
          class="shareOption"
          id="shareSMS"
        >
          SMS
        </button>

        <button
          class="shareOption"
          id="shareLinkedIn"
        >
          LinkedIn
        </button>

        <button
          class="shareOption"
          id="shareReddit"
        >
          Reddit
        </button>

        <button
          class="shareOption"
          id="shareViber"
        >
          Viber
        </button>

        <button
          class="shareOption"
          id="shareTikTok"
        >
          TikTok
        </button>

        <button
          class="shareOption"
          id="shareInstagram"
        >
          Instagram
        </button>

        <button
          class="shareOption"
          id="shareSnapchat"
        >
          Snapchat
        </button>

        <button
          class="shareOption"
          id="sharePinterest"
        >
          Pinterest
        </button>

        <button
          class="shareOption"
          id="copyMessage"
        >
          ${t.copyMessage}
        </button>

        <button
          class="shareOption"
          id="copyLink"
        >
          ${t.copyLink}
        </button>

        <button
          class="shareOption"
          id="shareMore"
        >
          ${t.more}
        </button>

      </div>

    </div>

  `;

  document.body.appendChild(panel);


  addSharePanelStyles();


  // ==========================================
  // CLOSE
  // ==========================================

  document
    .getElementById("shareClose")
    .addEventListener(
      "click",
      closeSharePanel
    );


  document
    .querySelector(
      "#universe139SharePanel .shareOverlay"
    )
    .addEventListener(
      "click",
      closeSharePanel
    );


  // ==========================================
  // PLATFORMS
  // ==========================================

  document
    .getElementById("shareWhatsApp")
    .addEventListener(
      "click",
      shareWhatsApp
    );


  document
    .getElementById("shareFacebook")
    .addEventListener(
      "click",
      shareFacebook
    );


  document
    .getElementById("shareTelegram")
    .addEventListener(
      "click",
      shareTelegram
    );


  document
    .getElementById("shareGmail")
    .addEventListener(
      "click",
      shareGmail
    );


  document
    .getElementById("shareEmail")
    .addEventListener(
      "click",
      shareEmail
    );


  document
    .getElementById("shareSMS")
    .addEventListener(
      "click",
      shareSMS
    );


  document
    .getElementById("shareLinkedIn")
    .addEventListener(
      "click",
      shareLinkedIn
    );


  document
    .getElementById("shareReddit")
    .addEventListener(
      "click",
      shareReddit
    );


  document
    .getElementById("shareViber")
    .addEventListener(
      "click",
      shareViber
    );


  document
    .getElementById("shareTikTok")
    .addEventListener(
      "click",
      shareTikTok
    );


  document
    .getElementById("shareInstagram")
    .addEventListener(
      "click",
      shareInstagram
    );


  document
    .getElementById("shareSnapchat")
    .addEventListener(
      "click",
      shareSnapchat
    );


  document
    .getElementById("sharePinterest")
    .addEventListener(
      "click",
      sharePinterest
    );


  // ==========================================
  // COPY MESSAGE
  // ==========================================

  document
    .getElementById("copyMessage")
    .addEventListener(
      "click",
      () => {

        copyText(
          getShareText()
        );

      }
    );


  // ==========================================
  // COPY LINK
  // ==========================================

  document
    .getElementById("copyLink")
    .addEventListener(
      "click",
      () => {

        copyText(
          UNIVERSE139_URL
        );

      }
    );


  // ==========================================
  // MORE
  // ==========================================

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

  if (!panel) {
    return;
  }

  panel.classList.add("closing");

  setTimeout(() => {

    panel.remove();

  }, 220);
}


// ==========================================
// SHARE PANEL DESIGN
// TEXT ONLY — NO ICONS
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

      transition:
        background .2s ease;

    }


    .shareClose:hover {

      background:
        rgba(255,255,255,.16);

    }


    /* ======================================
       ACTUAL MESSAGE PREVIEW
       ====================================== */

    .sharePreview {

      margin-bottom:
        22px;

      padding:
        20px;

      border-radius:
        18px;

      background:
        rgba(255,255,255,.05);

      border:
        1px solid
        rgba(255,255,255,.12);

    }


    .sharePreviewTitle {

      margin-bottom:
        12px;

      font-size:
        13px;

      color:
        rgba(255,255,255,.55);

    }


    .sharePreviewMessage {

      color:
        white;

      font-size:
        17px;

      line-height:
        1.6;

      margin-bottom:
        14px;

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

      word-break:
        break-word;

    }


    /* ======================================
       TEXT BUTTONS
       ====================================== */

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


    /* ======================================
       TOAST
       ====================================== */

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


    /* ======================================
       MOBILE
       ====================================== */

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


      .sharePreviewMessage {

        font-size:
          15px;

      }

    }


    @media (max-width:380px) {

      .shareGrid {

        grid-template-columns:
          repeat(2,1fr);

      }

    }

  `;

  document.head.appendChild(style);
}


// ==========================================
// OPEN SHARE
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


// ==========================================
// INITIAL STATE
// ==========================================

messageBox.classList.add("hidden");

loading.classList.add("hidden");

revealBtn.classList.add("hidden");

againBtn.classList.add("hidden");

shareBtn.classList.add("hidden");


console.log(
  "Universe139 loaded successfully"
);

console.log(
  "Universe139 URL:",
  UNIVERSE139_URL
);
