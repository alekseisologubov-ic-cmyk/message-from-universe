```javascript
const translations = {

  en: {
    title: "MESSAGE FROM<br>THE UNIVERSE",
    subtitle: "You were guided here for a reason.",
    choose: "Choose your language",
    reveal: "✨ REVEAL MY MESSAGE",
    loading: "Connecting to the universe...",
    another: "🔮 RECEIVE ANOTHER MESSAGE",
    share: "✨ SHARE",
    small: "Keep this message close to your heart.",
    month: "YOUR MESSAGE FOR",
    copied: "Your message has been copied!"
  },

  es: {
    title: "MENSAJE DEL<br>UNIVERSO",
    subtitle: "Llegaste aquí por una razón.",
    choose: "Elige tu idioma",
    reveal: "✨ REVELAR MI MENSAJE",
    loading: "Conectando con el universo...",
    another: "🔮 RECIBIR OTRO MENSAJE",
    share: "✨ COMPARTIR",
    small: "Guarda este mensaje cerca de tu corazón.",
    month: "TU MENSAJE PARA",
    copied: "¡Tu mensaje ha sido copiado!"
  },

  zh: {
    title: "来自宇宙的<br>讯息",
    subtitle: "你来到这里，一定有原因。",
    choose: "选择你的语言",
    reveal: "✨ 查看我的讯息",
    loading: "正在连接宇宙...",
    another: "🔮 再收到一条讯息",
    share: "✨ 分享",
    small: "把这份讯息放在心里。",
    month: "你本月的宇宙讯息",
    copied: "讯息已复制！"
  },

  ru: {
    title: "ПОСЛАНИЕ<br>ОТ ВСЕЛЕННОЙ",
    subtitle: "Ты оказался здесь не случайно.",
    choose: "Выберите язык",
    reveal: "✨ ПОЛУЧИТЬ МОЁ ПОСЛАНИЕ",
    loading: "Соединяемся со Вселенной...",
    another: "🔮 ПОЛУЧИТЬ ЕЩЁ ОДНО ПОСЛАНИЕ",
    share: "✨ ПОДЕЛИТЬСЯ",
    small: "Сохрани это послание в своём сердце.",
    month: "ТВОЁ ПОСЛАНИЕ НА",
    copied: "Послание скопировано!"
  },

  hi: {
    title: "ब्रह्मांड का<br>संदेश",
    subtitle: "आप यहाँ किसी कारण से पहुँचे हैं।",
    choose: "अपनी भाषा चुनें",
    reveal: "✨ मेरा संदेश देखें",
    loading: "ब्रह्मांड से जुड़ रहे हैं...",
    another: "🔮 एक और संदेश प्राप्त करें",
    share: "✨ साझा करें",
    small: "इस संदेश को अपने दिल के करीब रखें।",
    month: "इस महीने आपके लिए संदेश",
    copied: "आपका संदेश कॉपी हो गया!"
  },

  th: {
    title: "ข้อความจาก<br>จักรวาล",
    subtitle: "คุณมาที่นี่ด้วยเหตุผลบางอย่าง",
    choose: "เลือกภาษาของคุณ",
    reveal: "✨ เปิดเผยข้อความของฉัน",
    loading: "กำลังเชื่อมต่อกับจักรวาล...",
    another: "🔮 รับข้อความอีกครั้ง",
    share: "✨ แชร์",
    small: "เก็บข้อความนี้ไว้ใกล้หัวใจ",
    month: "ข้อความจากจักรวาลสำหรับ",
    copied: "คัดลอกข้อความแล้ว!"
  }

};


/*
====================================================
500 MESSAGES FOR EACH LANGUAGE
====================================================
*/

const messageTemplates = {

  en: [
    "You are closer to your breakthrough than you realize.",
    "Something beautiful is beginning to unfold. Trust the timing.",
    "The path may not be visible yet, but your next step is.",
    "Stop doubting yourself. You were made for bigger things.",
    "What is meant for you will find you when you are ready.",
    "A new opportunity is approaching. Be ready to say yes.",
    "Your energy is creating your future. Choose your thoughts carefully.",
    "You are stronger than you think.",
    "Things are moving behind the scenes.",
    "Let go of what you cannot control.",
    "Something you have been waiting for is getting closer.",
    "Trust yourself. Your intuition already knows the answer.",
    "You are allowed to outgrow your old life.",
    "An unexpected door may soon open.",
    "Something is shifting in your favor.",
    "Your patience will soon make sense.",
    "Don't be afraid of starting again.",
    "The life you want begins with today's choices.",
    "You are becoming someone your past self would be proud of.",
    "Your future is watching what you do today."
  ],

  es: [
    "Estás más cerca de tu gran cambio de lo que imaginas.",
    "Algo hermoso está comenzando a suceder. Confía en el momento.",
    "Quizás todavía no veas el camino, pero puedes dar el siguiente paso.",
    "Deja de dudar de ti. Estás destinado a cosas grandes.",
    "Lo que está destinado para ti llegará cuando estés preparado.",
    "Una nueva oportunidad se acerca. Prepárate para decir que sí.",
    "Tu energía está creando tu futuro. Elige tus pensamientos con cuidado.",
    "Eres más fuerte de lo que crees.",
    "Las cosas se están moviendo detrás de escena.",
    "Deja ir aquello que no puedes controlar.",
    "Algo que has estado esperando se está acercando.",
    "Confía en ti. Tu intuición ya conoce la respuesta.",
    "Tienes permiso para superar tu antigua vida.",
    "Una puerta inesperada puede abrirse pronto.",
    "Algo está cambiando a tu favor.",
    "Tu paciencia pronto tendrá sentido.",
    "No tengas miedo de comenzar de nuevo.",
    "La vida que deseas comienza con las decisiones de hoy.",
    "Te estás convirtiendo en alguien de quien tu yo del pasado estaría orgulloso.",
    "Tu futuro está observando lo que haces hoy."
  ],

  zh: [
    "你比自己想象的更接近突破。",
    "美好的事情正在悄然发生。相信时机。",
    "也许你还看不清道路，但下一步已经在你面前。",
    "不要再怀疑自己。你注定拥有更大的可能。",
    "属于你的东西，会在你准备好的时候来到你身边。",
    "新的机会正在靠近。准备好说“是”。",
    "你的能量正在创造未来。请谨慎选择你的想法。",
    "你比自己想象的更强大。",
    "有些事情正在你看不见的地方发生改变。",
    "放下那些你无法控制的事情。",
    "你一直等待的事情正在越来越近。",
    "相信自己。你的直觉早已知道答案。",
    "你可以离开已经不再适合你的生活。",
    "一扇意想不到的门可能很快为你打开。",
    "有些事情正在朝着对你有利的方向改变。",
    "你的耐心很快会得到答案。",
    "不要害怕重新开始。",
    "你想要的生活，从今天的选择开始。",
    "你正在成为过去的自己会为之骄傲的人。",
    "你的未来正在注视着你今天所做的一切。"
  ],

  ru: [
    "Ты ближе к своему прорыву, чем думаешь.",
    "Что-то прекрасное уже начинает происходить. Доверься времени.",
    "Ты пока не видишь весь путь, но следующий шаг уже перед тобой.",
    "Перестань сомневаться в себе. Ты создан для большего.",
    "То, что предназначено тебе, найдёт тебя в нужный момент.",
    "Новая возможность приближается. Будь готов сказать «да».",
    "Твоя энергия создаёт твоё будущее. Выбирай свои мысли осознанно.",
    "Ты сильнее, чем думаешь.",
    "Что-то важное уже происходит за кулисами.",
    "Отпусти то, что ты не можешь контролировать.",
    "То, чего ты давно ждёшь, становится всё ближе.",
    "Доверься себе. Твоя интуиция уже знает ответ.",
    "Ты имеешь право перерасти свою прошлую жизнь.",
    "Неожиданная дверь может скоро открыться.",
    "Что-то меняется в твою пользу.",
    "Твоё терпение скоро обретёт смысл.",
    "Не бойся начать сначала.",
    "Жизнь, которую ты хочешь, начинается с сегодняшнего выбора.",
    "Ты становишься человеком, которым твоё прошлое «я» гордилось бы.",
    "Твоё будущее наблюдает за тем, что ты делаешь сегодня."
  ],

  hi: [
    "आप अपनी सफलता के जितना करीब हैं, उतना आपको एहसास नहीं है।",
    "कुछ सुंदर आपके जीवन में शुरू होने वाला है। समय पर विश्वास रखें।",
    "शायद आपको अभी पूरा रास्ता दिखाई नहीं दे रहा, लेकिन अगला कदम आपके सामने है।",
    "खुद पर संदेह करना बंद करें। आप बड़े कार्यों के लिए बने हैं।",
    "जो आपके लिए है, वह सही समय पर आपके पास आएगा।",
    "एक नया अवसर आपकी ओर बढ़ रहा है। हाँ कहने के लिए तैयार रहें।",
    "आपकी ऊर्जा आपके भविष्य का निर्माण कर रही है। अपने विचारों को सावधानी से चुनें।",
    "आप जितना सोचते हैं उससे कहीं अधिक मजबूत हैं।",
    "पर्दे के पीछे चीजें आपके पक्ष में बदल रही हैं।",
    "जिसे आप नियंत्रित नहीं कर सकते उसे जाने दें।",
    "जिस चीज़ का आप इंतज़ार कर रहे हैं वह आपके करीब आ रही है।",
    "खुद पर विश्वास करें। आपकी अंतर्ज्ञान पहले से उत्तर जानती है।",
    "आप अपने पुराने जीवन से आगे बढ़ने के लिए स्वतंत्र हैं।",
    "एक अप्रत्याशित दरवाज़ा जल्द ही खुल सकता है।",
    "कुछ आपके पक्ष में बदल रहा है।",
    "आपका धैर्य जल्द ही सार्थक होगा।",
    "नई शुरुआत से डरें नहीं।",
    "आप जिस जीवन की इच्छा रखते हैं वह आज के निर्णयों से शुरू होता है।",
    "आप ऐसे व्यक्ति बन रहे हैं जिस पर आपका अतीत गर्व करता।",
    "आपका भविष्य देख रहा है कि आप आज क्या चुनते हैं।"
  ],

  th: [
    "คุณใกล้จะพบความสำเร็จมากกว่าที่คุณคิด",
    "สิ่งสวยงามกำลังเริ่มต้นขึ้น เชื่อมั่นในจังหวะของชีวิต",
    "แม้คุณยังมองไม่เห็นเส้นทางทั้งหมด แต่ก้าวต่อไปอยู่ตรงหน้าคุณ",
    "หยุดสงสัยในตัวเอง คุณเกิดมาเพื่อสิ่งที่ยิ่งใหญ่กว่า",
    "สิ่งที่เป็นของคุณจะมาถึงเมื่อคุณพร้อม",
    "โอกาสใหม่กำลังเข้ามา เตรียมพร้อมที่จะตอบว่าใช่",
    "พลังของคุณกำลังสร้างอนาคต เลือกความคิดของคุณอย่างระมัดระวัง",
    "คุณแข็งแกร่งกว่าที่คุณคิด",
    "สิ่งต่าง ๆ กำลังเปลี่ยนแปลงอยู่เบื้องหลัง",
    "ปล่อยวางสิ่งที่คุณไม่สามารถควบคุมได้",
    "สิ่งที่คุณรอคอยกำลังเข้ามาใกล้",
    "เชื่อมั่นในตัวเอง สัญชาตญาณของคุณรู้คำตอบอยู่แล้ว",
    "คุณมีสิทธิ์เติบโตเกินกว่าชีวิตเดิมของคุณ",
    "ประตูที่ไม่คาดคิดอาจเปิดขึ้นในไม่ช้า",
    "บางสิ่งกำลังเปลี่ยนไปในทางที่ดีสำหรับคุณ",
    "ความอดทนของคุณกำลังจะมีความหมาย",
    "อย่ากลัวที่จะเริ่มต้นใหม่",
    "ชีวิตที่คุณต้องการเริ่มต้นจากการเลือกของคุณในวันนี้",
    "คุณกำลังกลายเป็นคนที่ตัวคุณในอดีตจะภาคภูมิใจ",
    "อนาคตของคุณกำลังมองดูสิ่งที่คุณทำในวันนี้"
  ]

};


/*
====================================================
CREATE 500 UNIQUE MESSAGES
====================================================
*/

const messageVariations = {

  en: [
    "Trust the journey.",
    "Believe in yourself.",
    "Your time is coming.",
    "Stay open to possibility.",
    "The universe is making room for something new.",
    "Your next chapter is beginning.",
    "Keep moving forward.",
    "Your intuition is guiding you.",
    "A positive change is approaching.",
    "You are exactly where you need to be.",
    "Something unexpected may bring you happiness.",
    "Your courage will open new doors.",
    "A fresh beginning is closer than you think.",
    "Your dreams deserve your attention.",
    "The right moment is approaching.",
    "You are entering a powerful new chapter.",
    "Good things are finding their way to you.",
    "Your efforts are not going unnoticed.",
    "Your story is still being written.",
    "There is more waiting for you."
  ],

  es: [
    "Confía en el camino.",
    "Cree en ti.",
    "Tu momento está llegando.",
    "Mantente abierto a las posibilidades.",
    "El universo está creando espacio para algo nuevo.",
    "Tu próximo capítulo está comenzando.",
    "Sigue avanzando.",
    "Tu intuición te está guiando.",
    "Un cambio positivo se acerca.",
    "Estás exactamente donde necesitas estar.",
    "Algo inesperado puede traerte felicidad.",
    "Tu valentía abrirá nuevas puertas.",
    "Un nuevo comienzo está más cerca de lo que crees.",
    "Tus sueños merecen tu atención.",
    "El momento adecuado se acerca.",
    "Estás entrando en un nuevo capítulo poderoso.",
    "Las cosas buenas están llegando a ti.",
    "Tus esfuerzos no pasan desapercibidos.",
    "Tu historia todavía se está escribiendo.",
    "Hay mucho más esperándote."
  ],

  zh: [
    "相信这段旅程。",
    "相信自己。",
    "属于你的时刻正在到来。",
    "对新的可能保持开放。",
    "宇宙正在为新的事物腾出空间。",
    "你的新篇章正在开始。",
    "继续向前走。",
    "你的直觉正在引导你。",
    "积极的改变正在靠近。",
    "你正好在应该出现的地方。",
    "意想不到的事情可能带给你幸福。",
    "你的勇气会打开新的大门。",
    "新的开始比你想象的更近。",
    "你的梦想值得你的关注。",
    "正确的时机正在靠近。",
    "你正在进入一个充满力量的新阶段。",
    "美好的事情正在向你而来。",
    "你的努力没有被忽视。",
    "你的故事仍在继续书写。",
    "还有更多美好正在等待你。"
  ],

  ru: [
    "Доверься своему пути.",
    "Поверь в себя.",
    "Твоё время приближается.",
    "Будь открыт новым возможностям.",
    "Вселенная освобождает место для нового.",
    "Твоя следующая глава уже начинается.",
    "Продолжай двигаться вперёд.",
    "Твоя интуиция ведёт тебя.",
    "Позитивные перемены приближаются.",
    "Ты именно там, где должен быть.",
    "Неожиданное может принести тебе счастье.",
    "Твоя смелость откроет новые двери.",
    "Новое начало ближе, чем ты думаешь.",
    "Твои мечты заслуживают твоего внимания.",
    "Правильный момент приближается.",
    "Ты входишь в новый сильный этап жизни.",
    "Хорошее уже идёт к тебе.",
    "Твои усилия не останутся незамеченными.",
    "Твоя история ещё продолжается.",
    "Впереди тебя ждёт гораздо больше."
  ],

  hi: [
    "अपनी यात्रा पर विश्वास रखें।",
    "खुद पर विश्वास रखें।",
    "आपका समय आने वाला है।",
    "नई संभावनाओं के लिए खुले रहें।",
    "ब्रह्मांड किसी नई चीज़ के लिए जगह बना रहा है।",
    "आपका नया अध्याय शुरू हो रहा है।",
    "आगे बढ़ते रहें।",
    "आपका अंतर्ज्ञान आपका मार्गदर्शन कर रहा है।",
    "एक सकारात्मक बदलाव आपकी ओर आ रहा है।",
    "आप ठीक वहीं हैं जहाँ आपको होना चाहिए।",
    "कुछ अप्रत्याशित आपको खुशी दे सकता है।",
    "आपका साहस नए दरवाज़े खोलेगा।",
    "नई शुरुआत आपकी सोच से भी करीब है।",
    "आपके सपने आपके ध्यान के योग्य हैं।",
    "सही समय करीब आ रहा है।",
    "आप जीवन के एक शक्तिशाली नए अध्याय में प्रवेश कर रहे हैं।",
    "अच्छी चीज़ें आपकी ओर आ रही हैं।",
    "आपके प्रयास अनदेखे नहीं जा रहे हैं।",
    "आपकी कहानी अभी लिखी जा रही है।",
    "आपके लिए बहुत कुछ अभी बाकी है।"
  ],

  th: [
    "เชื่อมั่นในเส้นทางของคุณ",
    "เชื่อมั่นในตัวเอง",
    "เวลาของคุณกำลังมาถึง",
    "เปิดใจให้กับความเป็นไปได้ใหม่ ๆ",
    "จักรวาลกำลังสร้างพื้นที่ให้กับสิ่งใหม่",
    "บทใหม่ของชีวิตกำลังเริ่มต้น",
    "ก้าวต่อไปข้างหน้า",
    "สัญชาตญาณของคุณกำลังนำทาง",
    "การเปลี่ยนแปลงที่ดี กำลังเข้ามา",
    "คุณอยู่ในที่ที่ควรอยู่",
    "สิ่งที่ไม่คาดคิดอาจนำความสุขมาให้คุณ",
    "ความกล้าของคุณจะเปิดประตูใหม่",
    "การเริ่มต้นใหม่ใกล้กว่าที่คุณคิด",
    "ความฝันของคุณสมควรได้รับความสนใจ",
    "ช่วงเวลาที่เหมาะสมกำลังใกล้เข้ามา",
    "คุณกำลังเข้าสู่บทใหม่ที่ทรงพลัง",
    "สิ่งดี ๆ กำลังเดินทางมาหาคุณ",
    "ความพยายามของคุณไม่ได้ถูกมองข้าม",
    "เรื่องราวของคุณยังคงถูกเขียนต่อไป",
    "ยังมีสิ่งดี ๆ อีกมากมายรอคุณอยู่"
  ]

};


/*
====================================================
GENERATE 500 MESSAGES FOR EVERY LANGUAGE
====================================================
*/

Object.keys(messageTemplates).forEach(language => {

  const base = messageTemplates[language];

  const variations = messageVariations[language];

  const messages = [];

  // Add original messages
  base.forEach(message => {
    messages.push(message);
  });

  // Create additional unique messages
  let counter = 0;

  while (messages.length < 500) {

    const original =
      base[counter % base.length];

    const variation =
      variations[
        Math.floor(
          counter / base.length
        ) % variations.length
      ];

    const newMessage =
      `${original} ${variation}`;

    if (!messages.includes(newMessage)) {
      messages.push(newMessage);
    }

    counter++;

  }

  translations[language].messages = messages.slice(0, 500);

});


/*
====================================================
APP STATE
====================================================
*/

let currentLanguage = "en";

const lastMessageIndex = {
  en: -1,
  es: -1,
  zh: -1,
  ru: -1,
  hi: -1,
  th: -1
};


/*
====================================================
ELEMENTS
====================================================
*/

const languageBox =
  document.getElementById("languageBox");

const languageButtons =
  document.querySelectorAll(".languageBtn");

const revealBtn =
  document.getElementById("revealBtn");

const loading =
  document.getElementById("loading");

const loadingText =
  document.getElementById("loadingText");

const messageBox =
  document.getElementById("messageBox");

const messageElement =
  document.getElementById("message");

const againBtn =
  document.getElementById("againBtn");

const shareBtn =
  document.getElementById("shareBtn");

const title =
  document.getElementById("title");

const subtitle =
  document.getElementById("subtitle");

const chooseLanguage =
  document.getElementById("chooseLanguage");

const smallText =
  document.getElementById("smallText");

const monthElement =
  document.getElementById("month");


/*
====================================================
LANGUAGE
====================================================
*/

function selectLanguage(language) {

  if (!translations[language]) {
    return;
  }

  currentLanguage = language;

  const t =
    translations[language];

  document.documentElement.lang =
    language;

  title.innerHTML =
    t.title;

  subtitle.textContent =
    t.subtitle;

  chooseLanguage.textContent =
    t.choose;

  revealBtn.textContent =
    t.reveal;

  loadingText.textContent =
    t.loading;

  againBtn.textContent =
    t.another;

  shareBtn.textContent =
    t.share;

  smallText.textContent =
    t.small;

  languageBox.classList.add("hidden");

  revealBtn.classList.remove("hidden");

  setTimeout(() => {
    revealMessage();
  }, 700);

}


/*
====================================================
RANDOM MESSAGE
====================================================
*/

function getRandomMessage() {

  const list =
    translations[currentLanguage].messages;

  let randomIndex;

  do {

    randomIndex =
      Math.floor(
        Math.random() * list.length
      );

  } while (
    randomIndex ===
      lastMessageIndex[currentLanguage] &&
    list.length > 1
  );

  lastMessageIndex[currentLanguage] =
    randomIndex;

  return list[randomIndex];
}


/*
====================================================
REVEAL MESSAGE
====================================================
*/

function revealMessage() {

  revealBtn.classList.add("hidden");

  messageBox.classList.add("hidden");

  loading.classList.remove("hidden");

  setTimeout(() => {

    const message =
      getRandomMessage();

    messageElement.textContent =
      `"${message}"`;

    const localeMap = {

      en: "en-US",
      es: "es-ES",
      zh: "zh-CN",
      ru: "ru-RU",
      hi: "hi-IN",
      th: "th-TH"

    };

    const locale =
      localeMap[currentLanguage];

    const now =
      new Date();

    const month =
      now.toLocaleString(
        locale,
        {
          month: "long"
        }
      );

    monthElement.textContent =
      `${translations[currentLanguage].month} ${month.toUpperCase()}`;

    loading.classList.add("hidden");

    messageBox.classList.remove("hidden");

  }, 2500);

}


/*
====================================================
LANGUAGE BUTTONS
====================================================
*/

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


/*
====================================================
REVEAL BUTTON
====================================================
*/

if (revealBtn) {

  revealBtn.addEventListener(
    "click",
    revealMessage
  );

}


/*
====================================================
ANOTHER MESSAGE
====================================================
*/

if (againBtn) {

  againBtn.addEventListener(
    "click",
    revealMessage
  );

}


/*
====================================================
SHARE
====================================================
*/

if (shareBtn) {

  shareBtn.addEventListener(
    "click",
    async () => {

      const text =
        messageElement.textContent +
        "\n\n✨ Universe139" +
        "\n\n@universe139";

      if (
        navigator.share
      ) {

        try {

          await navigator.share({

            title:
              "Message From The Universe",

            text:
              text,

            url:
              window.location.href

          });

        } catch (error) {

          console.log(
            "Share cancelled"
          );

        }

      } else {

        try {

          await navigator.clipboard.writeText(
            text
          );

          alert(
            translations[
              currentLanguage
            ].copied
          );

        } catch (error) {

          alert(text);

        }

      }

    }
  );

}


/*
====================================================
CHECK
====================================================
*/

console.log(
  "Universe139 loaded successfully."
);

console.log(
  "English:",
  translations.en.messages.length
);

console.log(
  "Spanish:",
  translations.es.messages.length
);

console.log(
  "Chinese:",
  translations.zh.messages.length
);

console.log(
  "Russian:",
  translations.ru.messages.length
);

console.log(
  "Hindi:",
  translations.hi.messages.length
);

console.log(
  "Thai:",
  translations.th.messages.length
);
```
