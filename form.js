const input = document.getElementById("plot");
const remainingChars = document.getElementById("remaining-chars");

remainingChars.textContent = 250 - input.value.length;

input.addEventListener("input", (e) => {
  const len = e.target.value.length;
  const remaining = 250 - len;

  remainingChars.textContent = remaining;

  remainingChars.classList.remove("error", "warning");
  input.classList.remove("error", "warning");

  if (len < 10) {
    remainingChars.classList.add("error");
    input.classList.add("error");
  } else if (remaining <= 10) {
    remainingChars.classList.add("warning");
    input.classList.add("warning");
  }
});

// // Calificacion
// const input = document.getElementById("rating");

// const Rating = document.querySelector("rating");

// function InputTextChange (event) {
// if (Rating < 10) {

// }
// }
