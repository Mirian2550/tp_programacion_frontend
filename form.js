const input = document.getElementById("plot");
const remainingChars = document.getElementById("remaining-chars");

input.addEventListener("input", (e) => {
  let len = e.target.value.length;
  let remaining = 250 - len;

  remainingChars.textContent = remaining;

  remainingChars.className = "";
  input.className = "";

  if (len < 10) {
    remainingChars.classList.add("error");
    input.classList.add("error");
  } else if (remaining <= 10) {
    remainingChars.classList.add("warning");
    input.classList.add("warning");
  }
});
