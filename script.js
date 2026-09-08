const messages = [

  "You are closer to your breakthrough than you realize.",

  "Something beautiful is beginning to unfold. Trust the timing.",

  "The path may not be visible yet, but your next step is.",

  "Stop doubting yourself. You were made for bigger things.",

  "What is meant for you will find you when you are ready.",

  "This month, choose courage over comfort.",

  "A new opportunity is approaching. Be ready to say yes.",

  "Your energy is creating your future. Choose your thoughts carefully.",

  "You have survived every difficult day so far. You are stronger than you think.",

  "The universe is not ignoring you. Things are moving behind the scenes.",

  "Let go of what you cannot control and focus on what you can create.",

  "Your biggest transformation begins when you stop asking for permission.",

  "Something you have been waiting for is getting closer.",

  "Trust yourself. Your intuition already knows the answer.",

  "You are allowed to outgrow people, places and old versions of yourself.",

  "Do not chase what is not meant for you. Attract what aligns with you.",

  "Your future needs the version of you that refuses to give up.",

  "This month may surprise you in ways you never expected.",

  "Every small decision you make today is shaping your tomorrow.",

  "The universe responds to action. Take the first step.",

  "You don't need to know the entire path. Just keep moving.",

  "Your time is coming. Prepare yourself instead of doubting yourself.",

  "There is magic in beginning before you feel ready.",

  "You are entering a period of growth. Embrace the change.",

  "What feels like an ending may actually be a new beginning.",

  "Believe that something wonderful can happen today.",

  "Your dreams are asking for your attention.",

  "Peace begins when you stop fighting what you cannot change.",

  "The energy you give is the energy you attract.",

  "One brave decision can change everything.",

  "Your story is still being written. Make the next chapter powerful.",

  "You are more powerful than the circumstances around you.",

  "Stop shrinking yourself to fit into places you have outgrown.",

  "Something unexpected may open a door you didn't know existed.",

  "Your potential is waiting for your decision.",

  "The right moment is often created, not discovered.",

  "Release fear. Make room for possibility.",

  "Everything changes when you finally believe you deserve better.",

  "You are not behind. You are on your own timeline.",

  "This month, listen more closely to what your heart is telling you.",

  "Your next level requires a new way of thinking.",

  "Let your actions speak louder than your doubts.",

  "A positive change is already in motion.",

  "You were not given this dream by accident.",

  "Your patience will soon make sense.",

  "Don't be afraid of starting again. This time you have experience.",

  "Some answers arrive only after you stop searching for them.",

  "The life you want begins with the choices you make today.",

  "Trust the process, even when you cannot understand it yet.",

  "You are becoming someone your past self would be proud of.",

  "Your energy is precious. Protect it.",

  "Something is shifting in your favor.",

  "Let go of the version of yourself that believes you cannot.",

  "You are capable of more than you have allowed yourself to imagine.",

  "Your breakthrough may begin with a simple conversation.",

  "Don't let temporary emotions make permanent decisions.",

  "The universe sometimes removes people to make space for better energy.",

  "Be patient. Great things often take longer than expected.",

  "You already have everything inside you to begin.",

  "Your confidence grows every time you choose yourself.",

  "An unexpected connection could bring new possibilities.",

  "Stop waiting for motivation. Create momentum.",

  "Your future is watching what you do today.",

  "Every ending carries the seed of a new beginning.",

  "Your greatest opportunity may be disguised as a challenge.",

  "You are allowed to change your mind and choose a new direction.",

  "The moment you stop fearing failure, you become unstoppable.",

  "Something you desire is also moving toward you.",

  "Be brave enough to disappoint others instead of abandoning yourself.",

  "The universe is teaching you patience before giving you what you asked for.",

  "Your life can change dramatically in a single year. Keep going.",

  "The things you are worried about today may not matter a year from now.",

  "Make space for the life you keep imagining.",

  "Your next chapter requires you to leave something behind.",

  "Your intuition is stronger than your fear. Listen carefully.",

  "The person you want to become is created by the decisions you make repeatedly.",

  "You are one decision away from a completely different direction.",

  "Do not confuse slow progress with no progress.",

  "Your presence has more power than you realize.",

  "Something new is preparing to enter your life.",

  "Keep going. Future you will understand why.",

  "Your purpose is bigger than your current doubts.",

  "Don't chase validation. Build your own belief.",

  "This month, choose yourself without guilt.",

  "Your hardest season may become your greatest source of strength.",

  "You are attracting experiences that match the energy you embody.",

  "The answer may come when you finally become quiet enough to hear it.",

  "Your dreams require discipline, not just desire.",

  "Be open to receiving more than you originally imagined.",

  "Something powerful happens when preparation meets opportunity.",

  "You cannot control everything, but you can control your next move.",

  "Your courage will inspire someone who is watching you.",

  "Not every delay is a rejection.",

  "You have permission to begin again today.",

  "Trust that your life is unfolding in ways you cannot yet see.",

  "The best version of your life may require the bravest version of you.",

  "Your journey is unique. Stop comparing your timeline to someone else's.",

  "One day you will look back and understand why everything happened.",

  "Believe in the possibility of a life greater than your current reality."

];


const revealBtn = document.getElementById("revealBtn");
const loading = document.getElementById("loading");
const messageBox = document.getElementById("messageBox");
const messageElement = document.getElementById("message");
const againBtn = document.getElementById("againBtn");
const shareBtn = document.getElementById("shareBtn");
const monthElement = document.getElementById("month");


const currentMonth = new Date().toLocaleString(
  "en-US",
  { month: "long" }
);

monthElement.textContent =
  "YOUR MESSAGE FOR " +
  currentMonth.toUpperCase();


let lastMessageIndex = -1;


function revealMessage() {

  revealBtn.classList.add("hidden");

  messageBox.classList.add("hidden");

  loading.classList.remove("hidden");


  setTimeout(() => {

    let randomIndex;

    do {

      randomIndex =
        Math.floor(
          Math.random() * messages.length
        );

    } while (
      randomIndex === lastMessageIndex &&
      messages.length > 1
    );


    lastMessageIndex = randomIndex;


    messageElement.textContent =
      `"${messages[randomIndex]}"`;


    loading.classList.add("hidden");

    messageBox.classList.remove("hidden");

  }, 2500);

}


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
      "\n\n✨ Message From The Universe";


    if (navigator.share) {

      await navigator.share({

        title:
          "Message From The Universe",

        text:
          text,

        url:
          window.location.href

      });

    } else {

      await navigator.clipboard.writeText(
        text
      );

      alert(
        "Message copied!"
      );

    }

  }
);
