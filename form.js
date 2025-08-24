const myForm = document.getElementById("form");
const inputDirector = document.getElementById("director");
const errorElement = document.getElementById("error");

myForm.addEventListener("submit", (e) => {
  if (inputDirector.value === !NaN || inputDirector == null) {
    console.log("El nombre del director/a es inválido");
  }
  e.preventDefault();
});

// // Calificacion
// const input = document.getElementById("rating");

// const Rating = document.querySelector("rating");

// function InputTextChange (event) {
// if (Rating < 10) {

// }
// }
