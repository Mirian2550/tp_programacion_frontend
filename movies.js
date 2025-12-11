document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("movies-container");


  const urlParams = new URLSearchParams(window.location.search);
  const genre = urlParams.get("genre");


  let fetchUrl = "http://localhost:3000/movies";
  if (genre) {
    fetchUrl += `?genre=${genre}`;
  }

  try {
    const res = await fetch(fetchUrl);
    const movies = await res.json();

    if (!movies.length) {
      container.innerHTML = `<p style="text-align:center;">No hay películas del género <b>${genre}</b>.</p>`;
      return;
    }

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <img src="${movie.image_url}" alt="${movie.title}">

        <div class="movie-info">
          <h3>${movie.title}</h3>
          <span>${movie.year}</span>

          <button class="detail-btn" data-id="${movie.id}">Ver detalle</button>

          <div class="action-buttons">
            <button class="edit-btn" data-id="${movie.id}">Editar</button>
            <button class="delete-btn" data-id="${movie.id}">Eliminar</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Listeners
    document.querySelectorAll(".detail-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => showMovieDetail(e.target.dataset.id));
    });

  } catch (error) {
    container.innerHTML = "<p>Error al cargar películas</p>";
  }
});

// =========================
//        MODAL
// =========================

async function showMovieDetail(id) {
  const modal = document.getElementById("movieModal");
  const modalBody = document.getElementById("modal-body");

  const res = await fetch(`http://localhost:3000/movies/${id}`);
  const movie = await res.json();

  modalBody.innerHTML = `
    <div style="display:flex;gap:20px;">
      <img class="modal-img" src="${movie.image_url}">
      <div>
        <h2>${movie.title}</h2>
        <p><strong>Año:</strong> ${movie.year}</p>
        <p><strong>Género:</strong> ${movie.genre}</p>
        <p><strong>Duración:</strong> ${movie.duration_min} min</p>
      </div>
    </div>
    <p style="margin-top:20px;">${movie.description}</p>
  `;

  modal.style.display = "flex";

  document.querySelector(".close-btn").onclick = () =>
    (modal.style.display = "none");

  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
}
