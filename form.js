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
//  Añadir pelicula 

document.getElementById("movieForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("title").value;
  const anio = document.getElementById("year").value;
  const genero = document.getElementById("genre").value;
  const duracion = document.getElementById("duration").value;
  const image_url = document.getElementById("imgUrl").value;
  const idioma = document.getElementById("language").value;
  const descripcion = document.getElementById("plot").value;

  const body = {
    titulo,
    genero,
    anio,
    duracion,
    image_url,
    idioma,
    descripcion,
  };

  try {
    const res = await fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Película agregada correctamente");
    window.location.href = "list.html";
  } catch (err) {
    alert("Error al conectar con el servidor");
    console.error(err);
  }
});
