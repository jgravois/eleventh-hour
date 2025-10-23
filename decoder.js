const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz");
const codedMessage = `
        myxqbkdevkdsyxc!
        sd gkc sxnoon usvbyi dro wyeco gry cdyvo dro pokcd. led ro rkn rovz:
        yxo rexnbon kxn ovofox yp usvbyi'c pebbi bovkdsfoc rsn drowcovfoc sx
        dro ryeco kxn kbyexn dro qkbnox kxn, kd ovofox wsxedoc dy ovofox droi
        kvv cmkwzobon sxdy dro lkxaeod rkvv gsdr usvbyi kxn kdo ez kvv yp
        rybkmo'c lokedspev pyyn.
        kxn xyg, tecd dy cryg ryg mvofob iye kbo, mkx iye psxn yxo rexnbon
        kxn ovofox wsmo rsnnox sx dro zsmdeboc?
        rkzzi rexdsxq!
    `;

const shiftAlphabet = (amount) =>
  Array.from(alphabet.slice(amount).concat(alphabet.slice(0, amount)));

const decodeMessage = (suspect) => {
  const firstInitial = suspect.charAt(0).toLowerCase();
  const shift = alphabet.length - alphabet.indexOf(firstInitial);
  const shiftedAlphabet = shiftAlphabet(shift);

  return Array.from(codedMessage)
    .map((char) => {
      const pos = alphabet.indexOf(char);
      if (pos > -1) return shiftedAlphabet[pos];
      return char;
    })
    .join("");
};

const clickHandler = (event) => {
  message.innerHTML = decodeMessage(guess);

  if (event.target.id.charAt(0) !== "k") {
    alert("they are not the thief.");
    return;
  }
  
  const guess = prompt("type the guest's name").toLowerCase();
  if (guess === event.target.id) {
    alert("you've solved the mystery!");
  }
};

const buttons = document.querySelectorAll("button:not(.info__btn):not(.info__close)");
const message = document.querySelector("[data-message]");

buttons.forEach((button) => button.addEventListener("click", clickHandler));
message.innerHTML = codedMessage;

// begin AI slop
const modal = document.querySelector(".info__modal");
const infoBtn = document.querySelector(".info__btn");
const closeBtn = document.querySelector(".info__close");
const backdrop = document.querySelector("[data-backdrop]");

function showInfo() {
  modal.setAttribute("aria-hidden", "false");
  closeBtn.focus(); // poor man's (or bot's) focus trap
}

function hideInfo() {
  modal.setAttribute("aria-hidden", "true");
}

infoBtn.addEventListener("click", showInfo);
closeBtn.addEventListener("click", hideInfo);
backdrop.addEventListener("click", hideInfo);

// close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideInfo();
});
