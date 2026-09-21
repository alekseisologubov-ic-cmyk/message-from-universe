// ==========================================================
// Universe139 server-side message database
// Built from the current client-side 500-message source.
//
// 25 openers x 20 closers = 500 messages per language.
//
// Languages:
//   en = English
//   es = Spanish
//   zh = Chinese
//   ru = Russian
//   hi = Hindi
//   th = Thai
// ==========================================================


const messageParts = {

  // ========================================================
  // ENGLISH
  // ========================================================

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


  // ========================================================
  // SPANISH
  // ========================================================

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

      "El futuro te está pidiendo espacio para algo nuevo.",

      "Tu valentía está creciendo silenciosamente con cada experiencia.",

      "Lo que parece pequeño hoy puede ser importante más adelante.",

      "No necesitas conocer todo el camino para seguir avanzando.",

      "Una nueva perspectiva puede cambiar la forma en que ves todo a tu alrededor.",

      "Tu vida todavía puede sorprenderte de maneras hermosas.",

      "El siguiente paso no tiene que ser perfecto para tener significado."

    ],


    closers: [

      "Date permiso para avanzar a tu propio ritmo.",

      "Mantente abierto a la oportunidad que llegue de manera natural.",

      "Escucha atentamente lo que te trae paz.",

      "Permite que hoy sea más ligero que ayer.",

      "Elige la dirección que se sienta sincera para ti.",

      "No ignores las pequeñas señales que te animan.",

      "Haz espacio para la alegría sin necesitar primero una razón.",

      "Confía en que el progreso también puede suceder en silencio.",

      "Suelta la necesidad de controlar cada detalle.",

      "Da un pequeño paso y deja que te lleve al siguiente.",

      "Recuerda que descansar también puede ser parte del progreso.",

      "Permítete reconocer lo lejos que ya has llegado.",

      "Ten paciencia con el ritmo de tu propia vida.",

      "Protege la energía que necesitas para lo que más importa.",

      "Permite que exista la incertidumbre sin dejar que te detenga.",

      "Presta atención a lo que puedes construir ahora.",

      "Algo mejor puede comenzar con una sola elección sencilla.",

      "Sigue avanzando hacia lo que tiene significado para ti.",

      "Tu historia todavía se está desarrollando.",

      "Deja que el próximo momento traiga su propia respuesta."

    ]

  },


  // ========================================================
  // CHINESE
  // ========================================================

  zh: {

    openers: [

      "相信那个一次又一次回到你心里的感觉。",

      "一个安静的变化正在你的生活中慢慢开始。",

      "你比自己想象的更接近一个新的开始。",

      "你的耐心正在为重要的事情创造空间。",

      "前方的道路正在一步一步变得更加清晰。",

      "你的直觉正在注意到一些你的头脑还没有完全说出名字的事情。",

      "曾经看起来不确定的一章，正在开始变得有意义。",

      "你周围的可能性比你现在看到的更多。",

      "你的能量正在朝着更加平静的方向移动。",

      "今天的一个小决定可能会打开一扇意想不到的重要大门。",

      "你已经学到了足够多的东西，可以迈出下一步。",

      "你一直等待的事情正在慢慢靠近。",

      "你一直背负的压力不必继续陪你走向未来。",

      "你的心知道什么真正适合你。",

      "一个意想不到的时刻可能会带来有价值的方向。",

      "你可以重新开始，而不需要向任何人解释自己。",

      "你最近的努力正在创造还没有浮现的结果。",

      "当你不再强迫自己寻找答案时，平静的答案可能会出现。",

      "未来正在邀请你为新的事物腾出空间。",

      "你的勇气正在从每一次经历中安静地成长。",

      "今天看起来很小的事情以后可能会变得重要。",

      "你不需要知道完整的道路就可以继续前进。",

      "新的视角可以改变你看待周围一切的方式。",

      "你的生活仍然可以用美好的方式给你带来惊喜。",

      "下一步不需要完美，也可以有意义。"

    ],


    closers: [

      "允许自己按照自己的节奏前进。",

      "保持开放，迎接自然来到你身边的机会。",

      "仔细聆听什么能带给你平静。",

      "让今天比昨天轻盈一些。",

      "选择那个对你来说真实而诚实的方向。",

      "不要忽视那些鼓励你的微小信号。",

      "给快乐留出空间，而不需要先找到一个理由。",

      "相信成长也可以安静地发生。",

      "放下控制每一个细节的需要。",

      "采取一个小行动，让它带你走向下一步。",

      "记住，休息也可以是成长的一部分。",

      "允许自己看到你已经走了多远。",

      "耐心等待属于你自己的时间。",

      "保护好你为重要事情保留的能量。",

      "允许不确定存在，但不要让它阻止你。",

      "把注意力放在你现在能够创造的事物上。",

      "更好的事情可能从一个简单的选择开始。",

      "继续走向那些对你有意义的事情。",

      "你的故事仍然在继续。",

      "让下一个时刻带来它自己的答案。"

    ]

  },


  // ========================================================
  // RUSSIAN
  // ========================================================

  ru: {

    openers: [

      "Доверься тому чувству, которое снова и снова возвращается в твоё сердце.",

      "Тихое изменение начинает постепенно входить в твою жизнь.",

      "Ты ближе к новому началу, чем сейчас думаешь.",

      "Твоё терпение создаёт пространство для чего-то важного.",

      "Путь впереди становится яснее шаг за шагом.",

      "Твоя интуиция замечает то, чему твой разум ещё не дал названия.",

      "Глава, которая когда-то казалась неопределённой, начинает обретать смысл.",

      "Вокруг тебя больше возможностей, чем ты сейчас видишь.",

      "Твоя энергия движется к большему спокойствию.",

      "Маленькое решение сегодня может открыть неожиданно важную дверь.",

      "Ты уже узнал достаточно, чтобы сделать следующий шаг.",

      "То, чего ты ждал, становится ближе.",

      "Давление, которое ты нёс, не обязано идти с тобой дальше.",

      "Твоё сердце знает, когда что-то действительно подходит тебе.",

      "Неожиданный момент может показать ценное направление.",

      "Ты можешь начать заново, не объясняя себя другим.",

      "Твои недавние усилия создают результаты, которые пока не видны.",

      "Спокойный ответ может прийти, когда ты перестанешь заставлять себя найти его.",

      "Будущее просит тебя оставить место для чего-то нового.",

      "Твоя смелость тихо растёт через каждый полученный опыт.",

      "То, что сегодня кажется маленьким, позже может стать важным.",

      "Тебе не нужно знать весь путь, чтобы продолжать двигаться.",

      "Новый взгляд может изменить то, как ты видишь всё вокруг.",

      "Твоя жизнь всё ещё способна удивлять тебя прекрасными моментами.",

      "Следующий шаг не обязан быть идеальным, чтобы иметь значение."

    ],


    closers: [

      "Позволь себе двигаться в собственном ритме.",

      "Оставайся открытым возможности, которая приходит естественно.",

      "Внимательно слушай то, что приносит тебе спокойствие.",

      "Пусть сегодняшний день будет легче вчерашнего.",

      "Выбирай направление, которое ощущается честным для тебя.",

      "Не игнорируй маленькие знаки, которые поддерживают тебя.",

      "Оставь место для радости, даже если для неё нет причины.",

      "Доверься тому, что прогресс может происходить тихо.",

      "Отпусти необходимость контролировать каждую деталь.",

      "Сделай один небольшой шаг и позволь ему привести тебя к следующему.",

      "Помни, что отдых тоже может быть частью движения вперёд.",

      "Разреши себе заметить, как далеко ты уже прошёл.",

      "Будь терпелив к ритму собственной жизни.",

      "Береги энергию, которая нужна тебе для самого важного.",

      "Позволь неопределённости существовать, не позволяя ей остановить тебя.",

      "Направь внимание на то, что ты можешь создать прямо сейчас.",

      "Что-то лучшее может начаться с одного простого выбора.",

      "Продолжай двигаться к тому, что имеет для тебя смысл.",

      "Твоя история всё ещё продолжается.",

      "Позволь следующему моменту принести свой собственный ответ."

    ]

  },


  // ========================================================
  // HINDI
  // ========================================================

  hi: {

    openers: [

      "उस एहसास पर भरोसा करो जो बार-बार तुम्हारे दिल में लौटता है।",

      "एक शांत बदलाव धीरे-धीरे तुम्हारी ज़िंदगी में शुरू हो रहा है।",

      "तुम जितना समझते हो, उससे कहीं अधिक एक नई शुरुआत के करीब हो।",

      "तुम्हारा धैर्य किसी महत्वपूर्ण चीज़ के लिए जगह बना रहा है।",

      "आगे का रास्ता हर कदम के साथ और स्पष्ट होता जा रहा है।",

      "तुम्हारा अंतर्मन कुछ ऐसा महसूस कर रहा है जिसे तुम्हारा मन अभी नाम नहीं दे पाया है।",

      "एक ऐसा अध्याय जो कभी अनिश्चित लगता था, अब अर्थपूर्ण होने लगा है।",

      "तुम्हारे आसपास जितनी संभावनाएँ हैं, तुम अभी उनसे अधिक नहीं देख पा रहे हो।",

      "तुम्हारी ऊर्जा अधिक शांति की ओर बढ़ रही है।",

      "आज का एक छोटा निर्णय एक महत्वपूर्ण दरवाज़ा खोल सकता है।",

      "तुमने अगला कदम उठाने के लिए पर्याप्त सीख लिया है।",

      "जिस चीज़ का तुम इंतज़ार कर रहे थे, वह अब करीब आ रही है।",

      "जो दबाव तुमने उठाया है, उसे तुम्हारे साथ आगे जाने की ज़रूरत नहीं है।",

      "तुम्हारा दिल जानता है कि तुम्हारे लिए क्या सही महसूस होता है।",

      "एक अप्रत्याशित क्षण तुम्हें एक मूल्यवान दिशा दिखा सकता है।",

      "तुम बिना किसी को समझाए फिर से शुरुआत कर सकते हो।",

      "तुम्हारी हाल की मेहनत ऐसे परिणाम बना रही है जो अभी दिखाई नहीं दे रहे हैं।",

      "जब तुम उत्तर को मजबूर करना छोड़ दोगे, तब एक शांत उत्तर सामने आ सकता है।",

      "भविष्य तुम्हें किसी नई चीज़ के लिए जगह बनाने को कह रहा है।",

      "हर अनुभव के साथ तुम्हारा साहस चुपचाप बढ़ रहा है।",

      "जो आज छोटा लगता है, वह बाद में महत्वपूर्ण बन सकता है।",

      "आगे बढ़ने के लिए तुम्हें पूरी राह जानना ज़रूरी नहीं है।",

      "एक नया दृष्टिकोण तुम्हारे आसपास की हर चीज़ को देखने का तरीका बदल सकता है।",

      "तुम्हारी ज़िंदगी अभी भी तुम्हें खूबसूरत तरीकों से आश्चर्यचकित कर सकती है।",

      "अगला कदम सही होने के लिए पूर्ण होना ज़रूरी नहीं है।"

    ],


    closers: [

      "अपने आप को अपनी गति से आगे बढ़ने की अनुमति दो।",

      "उस अवसर के लिए खुले रहो जो स्वाभाविक रूप से तुम्हारे सामने आता है।",

      "ध्यान से सुनो कि कौन सी चीज़ तुम्हें शांति देती है।",

      "आज को कल से थोड़ा हल्का होने दो।",

      "वही दिशा चुनो जो तुम्हें अपने लिए सच्ची लगे।",

      "उन छोटे संकेतों को नज़रअंदाज़ मत करो जो तुम्हारा उत्साह बढ़ाते हैं।",

      "बिना कारण खोजे खुशी के लिए जगह बनाओ।",

      "भरोसा रखो कि प्रगति चुपचाप भी हो सकती है।",

      "हर चीज़ को नियंत्रित करने की ज़रूरत छोड़ दो।",

      "एक छोटा कदम उठाओ और उसे अगले कदम तक ले जाने दो।",

      "याद रखो कि आराम भी प्रगति का हिस्सा हो सकता है।",

      "अपने आप को यह देखने दो कि तुम कितनी दूर आ चुके हो।",

      "अपनी ज़िंदगी के सही समय के प्रति धैर्य रखो।",

      "उस ऊर्जा की रक्षा करो जिसकी तुम्हें सबसे महत्वपूर्ण चीज़ों के लिए आवश्यकता है।",

      "अनिश्चितता को रहने दो, लेकिन उसे तुम्हें रोकने मत दो।",

      "अपना ध्यान उस चीज़ पर दो जिसे तुम अभी बना सकते हो।",

      "कुछ बेहतर एक साधारण चुनाव से शुरू हो सकता है।",

      "उस दिशा में आगे बढ़ते रहो जिसका तुम्हारे लिए अर्थ है।",

      "तुम्हारी कहानी अभी भी आगे बढ़ रही है।",

      "अगले पल को अपना उत्तर स्वयं लाने दो।"

    ]

  },


  // ========================================================
  // THAI
  // ========================================================

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


// ==========================================================
// BUILD 500 MESSAGES PER LANGUAGE
//
// 25 openers x 20 closers = 500
// ==========================================================

const LANGUAGES = [
  "en",
  "es",
  "zh",
  "ru",
  "hi",
  "th"
];


const messages = {};


for (
  const language of LANGUAGES
) {

  const parts =
    messageParts[language];


  if (
    !parts ||
    !Array.isArray(parts.openers) ||
    !Array.isArray(parts.closers)
  ) {

    throw new Error(
      `Invalid message source for ${language}.`
    );

  }


  if (
    parts.openers.length !== 25
  ) {

    throw new Error(
      `${language}: expected 25 openers, found ${parts.openers.length}.`
    );

  }


  if (
    parts.closers.length !== 20
  ) {

    throw new Error(
      `${language}: expected 20 closers, found ${parts.closers.length}.`
    );

  }


  const list = [];


  for (
    const opener of parts.openers
  ) {

    for (
      const closer of parts.closers
    ) {

      list.push(
        `${opener} ${closer}`
      );

    }

  }


  if (
    list.length !== 500
  ) {

    throw new Error(
      `${language}: expected 500 messages, found ${list.length}.`
    );

  }


  if (
    new Set(list).size !== 500
  ) {

    throw new Error(
      `${language}: generated messages are not unique.`
    );

  }


  messages[language] =
    list;

}


// ==========================================================
// EXPORT
//
// subscribe.js uses:
// require("./universe-messages")
// ==========================================================

module.exports = {
  LANGUAGES,
  messages
};
