// ==========================================================
// UNIVERSE139 - STANDALONE SUBSCRIBE API
//
// Route:
//   POST /api/subscribe
//
// IMPORTANT:
//   This file is completely self-contained.
//   It DOES NOT require ./universe-messages.js.
//
// Supabase table:
//   public.universe139_subscribers
//
// Required Vercel environment variables:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   (preferred for this setup)
//   RESEND_API_KEY
//   RESEND_FROM_EMAIL
//
// Optional:
//   SUPABASE_SECRET_KEY
//   APP_URL
//
// Request JSON:
//   {
//     "email": "user@example.com",
//     "language": "en",
//     "timezone": "Europe/Tallinn"
//   }
//
// Behavior:
//   1. Validate email.
//   2. Validate language/timezone.
//   3. Create a random 500-message sequence for the user.
//   4. Save the subscriber in Supabase.
//   5. Send the first message immediately with Resend.
//   6. Mark message_position=1 after successful sending.
//
// ==========================================================

const crypto = require("crypto");

const APP_URL = (
  process.env.APP_URL ||
  "https://message-from-universe.vercel.app"
).replace(/\/$/, "");

const TABLE = "universe139_subscribers";

const ALLOWED_LANGUAGES = [
  "en",
  "es",
  "zh",
  "ru",
  "hi",
  "th"
];

// ==========================================================
// MESSAGE DATABASE
// 25 openers x 20 closers = 500 messages per language.
// ==========================================================

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
// BUILD MESSAGE LISTS
// ==========================================================

const messages = {};

for (const language of ALLOWED_LANGUAGES) {

  const parts = messageParts[language];

  if (!parts) {
    throw new Error(`Missing message source for ${language}.`);
  }

  if (parts.openers.length !== 25) {
    throw new Error(
      `${language}: expected 25 openers, found ${parts.openers.length}.`
    );
  }

  if (parts.closers.length !== 20) {
    throw new Error(
      `${language}: expected 20 closers, found ${parts.closers.length}.`
    );
  }

  const list = [];

  for (const opener of parts.openers) {
    for (const closer of parts.closers) {
      list.push(`${opener} ${closer}`);
    }
  }

  if (list.length !== 500) {
    throw new Error(
      `${language}: expected 500 messages, found ${list.length}.`
    );
  }

  messages[language] = list;
}


// ==========================================================
// HELPERS
// ==========================================================

function getSupabaseKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    ""
  );
}


function getSupabaseConfig() {

  const url = String(
    process.env.SUPABASE_URL || ""
  ).replace(/\/$/, "");

  const key = getSupabaseKey();

  if (!url) {
    throw new Error(
      "SUPABASE_URL is not configured in Vercel."
    );
  }

  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY is not configured in Vercel."
    );
  }

  return { url, key };
}


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function normalizeLanguage(value) {

  const language = String(
    value || "en"
  ).trim().toLowerCase();

  return ALLOWED_LANGUAGES.includes(language)
    ? language
    : "en";
}


function normalizeTimezone(value) {

  const timezone = String(
    value || "UTC"
  ).trim() || "UTC";

  try {
    new Intl.DateTimeFormat(
      "en-US",
      { timeZone: timezone }
    ).format(new Date());

    return timezone;
  } catch {
    return "UTC";
  }
}


function dateForTimezone(timezone) {

  try {

    return new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    ).format(new Date());

  } catch {

    return new Date()
      .toISOString()
      .slice(0, 10);

  }
}


function createRandomOrder() {

  const order = Array.from(
    { length: 500 },
    (_, index) => index
  );

  for (let i = order.length - 1; i > 0; i--) {

    const random =
      crypto.randomBytes(4).readUInt32BE(0);

    const j = random % (i + 1);

    const tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }

  return order;
}


function createUnsubscribeToken() {
  return crypto
    .randomBytes(32)
    .toString("hex");
}


function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}


function escapeHtml(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


async function supabaseRequest(path, options = {}) {

  const { url, key } = getSupabaseConfig();

  const response = await fetch(
    `${url}/rest/v1/${path}`,
    {
      ...options,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {})
      }
    }
  );

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {

    const message =
      data?.message ||
      data?.hint ||
      data?.details ||
      (typeof data === "string" ? data : null) ||
      `Supabase returned HTTP ${response.status}.`;

    throw new Error(message);
  }

  return data;
}


async function sendEmail({ to, subject, html }) {

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured in Vercel."
    );
  }

  if (!from) {
    throw new Error(
      "RESEND_FROM_EMAIL is not configured in Vercel."
    );
  }

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html
      })
    }
  );

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Resend returned HTTP ${response.status}.`
    );
  }

  return data;
}


// ==========================================================
// EMAIL COPY
// ==========================================================

const COPY = {

  en: {
    subject: "Your first message from the Universe ✨",
    heading: "Your Daily Message",
    intro: "Welcome. Your first message from the Universe is here.",
    footer: "You will receive one new message each day.",
    unsubscribe: "Unsubscribe"
  },

  es: {
    subject: "Tu primer mensaje del Universo ✨",
    heading: "Tu mensaje diario",
    intro: "Bienvenido. Tu primer mensaje del Universo ya está aquí.",
    footer: "Recibirás un nuevo mensaje cada día.",
    unsubscribe: "Cancelar suscripción"
  },

  zh: {
    subject: "来自宇宙的第一条讯息 ✨",
    heading: "你的每日讯息",
    intro: "欢迎你。来自宇宙的第一条讯息已经到达。",
    footer: "你每天都会收到一条新的讯息。",
    unsubscribe: "取消订阅"
  },

  ru: {
    subject: "Твоё первое послание от Вселенной ✨",
    heading: "Твоё ежедневное послание",
    intro: "Добро пожаловать. Твоё первое послание от Вселенной уже здесь.",
    footer: "Каждый день ты будешь получать новое послание.",
    unsubscribe: "Отписаться"
  },

  hi: {
    subject: "ब्रह्मांड का आपका पहला संदेश ✨",
    heading: "आपका दैनिक संदेश",
    intro: "स्वागत है। ब्रह्मांड की ओर से आपका पहला संदेश यहां है।",
    footer: "आपको हर दिन एक नया संदेश मिलेगा।",
    unsubscribe: "सदस्यता समाप्त करें"
  },

  th: {
    subject: "ข้อความแรกจากจักรวาลของคุณ ✨",
    heading: "ข้อความประจำวันของคุณ",
    intro: "ยินดีต้อนรับ ข้อความแรกจากจักรวาลของคุณมาถึงแล้ว",
    footer: "คุณจะได้รับข้อความใหม่หนึ่งข้อความทุกวัน",
    unsubscribe: "ยกเลิกการสมัคร"
  }
};


function buildEmailHtml({
  copy,
  date,
  message,
  unsubscribeUrl
}) {

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(copy.heading)}</title>
</head>
<body style="margin:0;padding:0;background:#080313;color:#fff;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:620px;margin:0 auto;padding:34px 20px;">

    <div style="text-align:center;font-size:13px;letter-spacing:4px;color:#caa9ff;margin-bottom:22px;">
      UNIVERSE139
    </div>

    <div style="border:1px solid rgba(255,255,255,.16);border-radius:24px;background:linear-gradient(145deg,#24103d,#10051f);padding:30px 24px;">

      <div style="text-align:center;font-size:24px;font-weight:700;margin-bottom:10px;">
        ${escapeHtml(copy.heading)}
      </div>

      <div style="text-align:center;color:rgba(255,255,255,.65);font-size:13px;margin-bottom:24px;">
        ${escapeHtml(date)}
      </div>

      <p style="text-align:center;color:rgba(255,255,255,.76);font-size:15px;line-height:1.6;margin:0 0 24px;">
        ${escapeHtml(copy.intro)}
      </p>

      <div style="font-family:Georgia,serif;font-size:22px;line-height:1.65;text-align:center;color:#fff;">
        ${escapeHtml(message)}
      </div>

      <div style="text-align:center;margin-top:28px;color:rgba(255,255,255,.62);font-size:13px;line-height:1.6;">
        ${escapeHtml(copy.footer)}
      </div>

    </div>

    <div style="text-align:center;margin-top:24px;font-size:12px;color:rgba(255,255,255,.48);">
      <a href="${escapeHtml(unsubscribeUrl)}" style="color:#caa9ff;text-decoration:none;">
        ${escapeHtml(copy.unsubscribe)}
      </a>
    </div>

  </div>
</body>
</html>`;
}


// ==========================================================
// REQUEST BODY
// ==========================================================

function readBody(req) {

  let body = req.body || {};

  if (typeof body === "string") {

    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  return body;
}


// ==========================================================
// MAIN HANDLER
// ==========================================================

export default async function handler(req, res) {

  res.setHeader("Cache-Control", "no-store");
  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      error: "Method not allowed."
    });
  }

  try {

    const body = readBody(req);

    const email = String(
      body.email || ""
    ).trim().toLowerCase();

    if (!isValidEmail(email)) {

      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address."
      });
    }

    const language = normalizeLanguage(
      body.language
    );

    const timezone = normalizeTimezone(
      body.timezone
    );

    // ------------------------------------------------------
    // Generate the subscriber's private 500-message sequence.
    // ------------------------------------------------------

    const messageOrder =
      createRandomOrder();

    const firstMessageIndex =
      messageOrder[0];

    const firstMessage =
      messages[language][firstMessageIndex];

    // ------------------------------------------------------
    // Secure unsubscribe token.
    // Only the hash is stored in Supabase.
    // ------------------------------------------------------

    const unsubscribeToken =
      createUnsubscribeToken();

    const unsubscribeHash =
      hashToken(unsubscribeToken);

    const unsubscribeUrl =
      `${APP_URL}/api/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;

    const today =
      dateForTimezone(timezone);

    const copy = COPY[language];

    // ------------------------------------------------------
    // Check for an existing subscriber.
    // ------------------------------------------------------

    const existing =
      await supabaseRequest(
        `${TABLE}` +
        `?select=id,email,language,timezone,active` +
        `&email=eq.${encodeURIComponent(email)}` +
        `&limit=1`,
        { method: "GET" }
      );

    // ------------------------------------------------------
    // Already active.
    // ------------------------------------------------------

    if (
      Array.isArray(existing) &&
      existing.length > 0 &&
      existing[0].active === true
    ) {

      return res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message: "You are already subscribed."
      });
    }

    // ------------------------------------------------------
    // Existing but inactive: reactivate.
    // ------------------------------------------------------

    if (
      Array.isArray(existing) &&
      existing.length > 0
    ) {

      const existingId =
        existing[0].id;

      await supabaseRequest(
        `${TABLE}?id=eq.${encodeURIComponent(existingId)}`,
        {
          method: "PATCH",
          headers: {
            Prefer: "return=minimal"
          },
          body: JSON.stringify({
            email,
            language,
            timezone,
            active: true,
            unsubscribe_token_hash: unsubscribeHash,
            message_order: messageOrder,
            message_position: 0,
            last_sent_date: null,
            updated_at: new Date().toISOString()
          })
        }
      );

    } else {

      // ----------------------------------------------------
      // New subscriber.
      // ----------------------------------------------------

      await supabaseRequest(
        TABLE,
        {
          method: "POST",
          headers: {
            Prefer: "return=minimal"
          },
          body: JSON.stringify({
            email,
            language,
            timezone,
            active: true,
            unsubscribe_token_hash: unsubscribeHash,
            message_order: messageOrder,
            message_position: 0,
            last_sent_date: null
          })
        }
      );
    }

    // ------------------------------------------------------
    // Send first email.
    // ------------------------------------------------------

    try {

      await sendEmail({
        to: email,
        subject: copy.subject,
        html: buildEmailHtml({
          copy,
          date: today,
          message: firstMessage,
          unsubscribeUrl
        })
      });

    } catch (emailError) {

      console.error(
        "Universe139 first email failed:",
        emailError
      );

      // Deactivate if the first email could not be sent.
      try {

        await supabaseRequest(
          `${TABLE}?email=eq.${encodeURIComponent(email)}`,
          {
            method: "PATCH",
            headers: {
              Prefer: "return=minimal"
            },
            body: JSON.stringify({
              active: false,
              updated_at: new Date().toISOString()
            })
          }
        );

      } catch (rollbackError) {

        console.error(
          "Universe139 subscription rollback failed:",
          rollbackError
        );
      }

      return res.status(502).json({
        success: false,
        subscribed: false,
        error:
          `We could not send your first message. ${emailError.message}`
      });
    }

    // ------------------------------------------------------
    // Mark the first message as delivered.
    // ------------------------------------------------------

    await supabaseRequest(
      `${TABLE}?email=eq.${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: {
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          message_position: 1,
          last_sent_date: today,
          updated_at: new Date().toISOString()
        })
      }
    );

    return res.status(200).json({
      success: true,
      alreadySubscribed: false,
      message:
        "Subscription created and the first daily message was sent."
    });

  } catch (error) {

    console.error(
      "Universe139 subscription API error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unable to complete the subscription."
    });
  }
}
