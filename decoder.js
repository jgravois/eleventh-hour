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
  const guess = prompt("type the guest's name").toLowerCase();
  if (guess !== event.target.id) {
    alert("that is incorrect!");
    return;
  }

  if (guess.charAt(0) !== "k") {
    alert("correct! but they are not the thief.");
  } else {
    alert("you've solved the mystery!");
  }

  message.innerHTML = decodeMessage(guess);
};

const buttons = document.querySelectorAll("button");
const message = document.querySelector("[data-message]");

buttons.forEach((button) => {
  button.addEventListener("click", clickHandler);
});

message.innerHTML = codedMessage;
