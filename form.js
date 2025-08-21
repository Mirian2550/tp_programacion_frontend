const campoDirector = document.getElementById("director");
const form = document.getElementById("movieForm");

form.addEventListener("submit", function (event) {
  if (/\d/.test(campoDirector.value)) {
    alert("Ingresa un director/a válido");
    event.preventDefault();
  }
});
