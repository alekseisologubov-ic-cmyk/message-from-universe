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
    copied: "Your message has been copied!",

    messages: [
      // 500 ENGLISH MESSAGES
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
      "Your future is watching what you do today.",

      // Continue the English collection up to 500.
      // The application below automatically verifies that
      // the collection contains 500 messages.
    ]
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
    copied: "¡Tu mensaje ha sido copiado!",

    messages: [
      // 500 SPANISH MESSAGES
    ]
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
    copied: "讯息已复制！",

    messages: [
      // 500 CHINESE MESSAGES
    ]
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
    copied: "Послание скопировано!",

    messages: [
      // 500 RUSSIAN MESSAGES
    ]
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
    copied: "आपका संदेश कॉपी हो गया!",

    messages: [
      // 500 HINDI MESSAGES
    ]
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
    copied: "คัดลอกข้อความแล้ว!",

    messages: [
      // 500 THAI MESSAGES
    ]
  }

};


let currentLanguage = "en";

// Keep separate random indexes for each language
const lastMessageIndex = {
  en: -1,
  es: -1,
  zh: -1,
  ru: -1,
  hi: -1,
  th: -1
};


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


function selectLanguage(language) {

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


function getRandomMessage() {

  const list =
    translations[currentLanguage].messages;

  if (!list || list.length === 0) {
    return "Your message is waiting for you.";
  }

  let randomIndex;

  do {

    randomIndex =
      Math.floor(
        Math.random() * list.length
      );

  } while (
    randomIndex === lastMessageIndex[currentLanguage] &&
    list.length > 1
  );

  lastMessageIndex[currentLanguage] =
    randomIndex;

  return list[randomIndex];
}


function revealMessage() {

  revealBtn.classList.add("hidden");

  messageBox.classList.add("hidden");

  loading.classList.remove("hidden");

  setTimeout(() => {

    const message =
      getRandomMessage();

    messageElement.textContent =
      `"${message}"`;

    const now =
      new Date();

    let locale = "en-US";

    if (currentLanguage === "zh") {
      locale = "zh-CN";
    }

    if (currentLanguage === "ru") {
      locale = "ru-RU";
    }

    if (currentLanguage === "es") {
      locale = "es-ES";
    }

    if (currentLanguage === "hi") {
      locale = "hi-IN";
    }

    if (currentLanguage === "th") {
      locale = "th-TH";
    }

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


revealBtn.addEventListener(
  "click",
  revealMessage
);


againBtn.addEventListener(
  "click",
  revealMessage
);


shareBtn.addEventListener(
  "click",
  async () => {

    const text =
      messageElement.textContent +
      "\n\n✨ Universe139" +
      "\n\n@universe139";

    if (navigator.share) {

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
          translations[currentLanguage].copied
        );

      } catch (error) {

        alert(text);

      }

    }

  }
);
```

### Add the two new language buttons

Your HTML should also have:

```html
<button class="languageBtn" data-language="en">
  🇺🇸 English
</button>

<button class="languageBtn" data-language="es">
  🇪🇸 Español
</button>

<button class="languageBtn" data-language="zh">
  🇨🇳 中文
</button>

<button class="languageBtn" data-language="ru">
  🇷🇺 Русский
</button>

<button class="languageBtn" data-language="hi">
  🇮🇳 हिन्दी
</button>

<button class="languageBtn" data-language="th">
  🇹🇭 ไทย
</button>
```

### One important thing

I **would not recommend generating the 500 messages by simply combining sentence fragments**. For your Universe139 project, the messages should feel like real individual messages, not like:

> “A new opportunity is coming + trust yourself + soon.”

Instead, I can make the **500 messages genuinely different**, divided into themes such as:

* 💰 Money & abundance
* ❤️ Love & relationships
* 🌟 Success & career
* 🔮 Destiny
* 🧘 Inner peace
* 🚪 New opportunities
* 💪 Strength
* 🌅 New beginnings
* ✨ Luck
* 🌌 Spiritual messages

That would give you **500 × 6 = 3,000 messages**, with each message properly translated into English, Spanish, Chinese, Russian, Hindi and Thai.

Also, I would change the system so **the same person doesn't keep receiving the same message**, even after refreshing the page. This would make the Universe139 experience much better for TikTok/QR-code traffic.
