const messages = [

  "You are closer to your breakthrough than you realize.",
  "Something beautiful is beginning to unfold. Trust the timing.",
  "The path may not be visible yet, but your next step is.",
  "Stop doubting yourself. You were made for bigger things.",
  "What is meant for you will find you when you are ready.",
  "This month, choose courage over comfort.",
  "A new opportunity is approaching. Be ready to say yes.",
  "Your energy is creating your future. Choose your thoughts carefully.",
  "You are stronger than you think.",
  "Things are moving behind the scenes.",
  "Let go of what you cannot control.",
  "Your biggest transformation begins when you stop doubting yourself.",
  "Something you have been waiting for is getting closer.",
  "Trust yourself. Your intuition already knows the answer.",
  "You are allowed to outgrow your old life.",
  "Attract what aligns with you.",
  "Your future needs the version of you that refuses to give up.",
  "This month may surprise you in ways you never expected.",
  "Every small decision today shapes your tomorrow.",
  "The universe responds to action. Take the first step.",
  "You don't need to know the entire path. Just keep moving.",
  "Your time is coming. Prepare yourself.",
  "There is magic in beginning before you feel ready.",
  "Embrace the change that is coming.",
  "What feels like an ending may actually be a new beginning.",
  "Believe that something wonderful can happen today.",
  "Your dreams are asking for your attention.",
  "Peace begins when you stop fighting what you cannot change.",
  "The energy you give is the energy you attract.",
  "One brave decision can change everything.",
  "Your story is still being written.",
  "You are more powerful than your circumstances.",
  "Stop shrinking yourself to fit where you no longer belong.",
  "An unexpected door may soon open.",
  "Your potential is waiting for your decision.",
  "The right moment is often created, not discovered.",
  "Release fear. Make room for possibility.",
  "You deserve better than the life you have outgrown.",
  "You are not behind. You are on your own timeline.",
  "Listen closely to what your heart is telling you.",
  "Your next level requires a new way of thinking.",
  "Let your actions speak louder than your doubts.",
  "A positive change is already in motion.",
  "You were not given this dream by accident.",
  "Your patience will soon make sense.",
  "Don't be afraid of starting again.",
  "Some answers arrive when you stop searching.",
  "The life you want begins with today's choices.",
  "Trust the process, even when you cannot see the destination.",
  "You are becoming someone your past self would be proud of.",
  "Your energy is precious. Protect it.",
  "Something is shifting in your favor.",
  "Let go of the version of yourself that says you cannot.",
  "You are capable of more than you imagine.",
  "Your breakthrough may begin with a simple conversation.",
  "Don't let temporary emotions make permanent decisions.",
  "Make space for better energy.",
  "Great things often take longer than expected.",
  "You already have everything inside you to begin.",
  "Your confidence grows every time you choose yourself.",
  "An unexpected connection could bring new possibilities.",
  "Stop waiting for motivation. Create momentum.",
  "Your future is watching what you do today.",
  "Every ending carries the seed of a new beginning.",
  "Your greatest opportunity may be disguised as a challenge.",
  "You are allowed to choose a new direction.",
  "When you stop fearing failure, you become unstoppable.",
  "Something you desire is also moving toward you.",
  "Be brave enough to choose yourself.",
  "Patience is preparing you for what you asked for.",
  "Your life can change dramatically. Keep going.",
  "What worries you today may not matter a year from now.",
  "Make space for the life you keep imagining.",
  "Your next chapter requires you to leave something behind.",
  "Your intuition is stronger than your fear.",
  "You are one decision away from a different direction.",
  "Do not confuse slow progress with no progress.",
  "Your presence has more power than you realize.",
  "Something new is preparing to enter your life.",
  "Keep going. Future you will understand why.",
  "Your purpose is bigger than your current doubts.",
  "Don't chase validation. Build your own belief.",
  "This month, choose yourself without guilt.",
  "Your hardest season may become your greatest source of strength.",
  "You are attracting experiences that match your energy.",
  "Be quiet enough to hear the answer.",
  "Your dreams require discipline, not just desire.",
  "Be open to receiving more than you imagined.",
  "Preparation plus opportunity creates magic.",
  "You cannot control everything, but you can control your next move.",
  "Your courage will inspire someone watching you.",
  "Not every delay is a rejection.",
  "You have permission to begin again today.",
  "Your life is unfolding in ways you cannot yet see.",
  "The best version of your life requires courage.",
  "Stop comparing your timeline to someone else's.",
  "One day you will understand why everything happened.",
  "Believe in a life greater than your current reality."

];


// -----------------------------
// DAILY DATE
// -----------------------------

const now = new Date();

const monthName = now.toLocaleString("en-US", {
  month: "long"
});

const dayNumber = now.getDate();

const year = now.getFullYear();


// -----------------------------
// DISPLAY MONTH
// -----------------------------

const monthElement =
  document.getElementById("month");

if (monthElement) {

  monthElement.textContent =
    `YOUR MESSAGE FOR ${monthName.toUpperCase()}`;

}


// -----------------------------
// BUTTONS
// -----------------------------

const revealBtn =
  document.getElementById("revealBtn");

const loading =
  document.getElementById("loading");

const messageBox =
  document.getElementById("messageBox");

const messageElement =
  document.getElementById("message");

const againBtn =
  document.getElementById("againBtn");

const shareBtn =
  document.getElementById("shareBtn");


// -----------------------------
// RANDOM MESSAGE
// -----------------------------

let lastMessageIndex = -1;


function getRandomMessage() {

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

  lastMessageIndex =
    randomIndex;

  return messages[randomIndex];

}


// -----------------------------
// REVEAL
// -----------------------------

function revealMessage() {

  if (revealBtn) {
    revealBtn.classList.add("hidden");
  }

  if (messageBox) {
    messageBox.classList.add("hidden");
  }

  if (loading) {
    loading.classList.remove("hidden");
  }


  setTimeout(() => {

    const message =
      getRandomMessage();


    if (messageElement) {

      messageElement.textContent =
        `"${message}"`;

    }


    if (loading) {
      loading.classList.add("hidden");
    }

    if (messageBox) {
      messageBox.classList.remove("hidden");
    }

  }, 2500);

}


// -----------------------------
// BUTTON EVENTS
// -----------------------------

if (revealBtn) {

  revealBtn.addEventListener(
    "click",
    revealMessage
  );

}


if (againBtn) {

  againBtn.addEventListener(
    "click",
    revealMessage
  );

}


// -----------------------------
// SHARE
// -----------------------------

if (shareBtn) {

  shareBtn.addEventListener(
    "click",
    async () => {

      const text =
        messageElement.textContent +
        "\n\n✨ Message From The Universe" +
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
            "Your message has been copied!"
          );

        } catch (error) {

          alert(
            text
          );

        }

      }

    }
  );

}


// -----------------------------
// DAILY QR IDENTIFICATION
// -----------------------------

console.log(
  `Universe139 Daily Page: ${year}-${monthName}-${dayNumber}`
);
