//Global Selectors

const charactersRange = document.getElementById("range");
const NumbersRange = document.getElementById("number");
const includeUppercaseOption = document.getElementById("uppercase");
const includeSymbolsOption = document.getElementById("include-symbols");
const includeNumsOption = document.getElementById("include-numbers");
const form = document.getElementById("form-body");
const passwordDisplay = document.getElementById("Pass-Display");

//Chars Codes Arrays//
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

charactersRange.addEventListener("input", syncRange);
NumbersRange.addEventListener("input", syncRange);

// prevent form Defualt behavior//
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullCharsRange = NumbersRange.value;
  const includeUppercase = includeUppercaseOption.checked;
  const includeSymbols = includeSymbolsOption.checked;
  const includeNums = includeNumsOption.checked;
  const password = generatePassword(
    fullCharsRange,
    includeNums,
    includeUppercase,
    includeSymbols
  );
  passwordDisplay.innerText = password;
});

// Generate Password Function//
function generatePassword(
  fullCharsRange,
  includeNums,
  includeUppercase,
  includeSymbols
) {
  let charsCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charsCodes = charsCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeSymbols) charsCodes = charsCodes.concat(SYMBOLS_CHAR_CODES);
  if (includeNums) charsCodes = charsCodes.concat(NUMBERS_CHAR_CODES);

  const passwordChars = [];
  for (let i = 0; i < fullCharsRange; i++) {
    const characterCode =
      charsCodes[Math.floor(Math.random() * charsCodes.length)];
    passwordChars.push(String.fromCharCode(characterCode));
  }
  return passwordChars.join("");
}

// Generated Array function //

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

// Sync the chars and nums function //

function syncRange(e) {
  const value = e.target.value;
  charactersRange.value = value;
  NumbersRange.value = value;
}
