// =========================
//    CARGAR PELÍCULAS
// =========================

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("movies-container");

  const urlParams = new URLSearchParams(window.location.search);
  const genre = urlParams.get("genre");

  let fetchUrl = "http://localhost:3000/movies";
  if (genre) fetchUrl += `?genre=${genre}`;

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

    // Listeners para los botones
    addEventListeners();
  } catch (error) {
    container.innerHTML = "<p>Error al cargar películas</p>";
  }
});

// =========================
//       ASIGNAR LISTENERS
// =========================

function addEventListeners() {
  // Ver detalle
  document.querySelectorAll(".detail-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => showMovieDetail(e.target.dataset.id));
  });

  // Editar
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => openEditModal(e.target.dataset.id));
  });

  // Eliminar
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => deleteMovie(e.target.dataset.id));
  });
}

// =========================
//       MODAL DETALLE
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

  openModal();
}

// =========================
//       MODAL EDITAR
// =========================

async function openEditModal(id) {
  const modal = document.getElementById("movieModal");
  const modalBody = document.getElementById("modal-body");

  const res = await fetch(`http://localhost:3000/movies/${id}`);
  const movie = await res.json();

  modalBody.innerHTML = `
    <h2>Editar película</h2>

    <label>Título:</label>
    <input id="edit-title" value="${movie.title}" />

    <label>Año:</label>
    <input id="edit-year" value="${movie.year}" />

    <label>Género:</label>
    <input id="edit-genre" value="${movie.genre}" />

    <label>Duración:</label>
    <input id="edit-duration" value="${movie.duration_min}" />

    <label>Descripción:</label>
    <textarea id="edit-description">${movie.description}</textarea>

    <button id="save-edit" data-id="${id}">Guardar cambios</button>
  `;

  openModal();
}

// =========================
//       GUARDAR EDICIÓN
// =========================

document.addEventListener("click", async (e) => {
  if (e.target.id === "save-edit") {
    const id = e.target.dataset.id;

    const updatedMovie = {
      title: document.getElementById("edit-title").value,
      year: document.getElementById("edit-year").value,
      genre: document.getElementById("edit-genre").value,
      duration_min: document.getElementById("edit-duration").value,
      description: document.getElementById("edit-description").value,
    };

    await fetch(`http://localhost:3000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    });

    closeModal();
    location.reload();
  }
});

// =========================
//         ELIMINAR
// =========================

async function deleteMovie(id) {
  const confirmDelete = confirm("¿Seguro que quieres eliminar esta película?");
  if (!confirmDelete) return;

  await fetch(`http://localhost:3000/movies/${id}`, {
    method: "DELETE",
  });

  location.reload();
}

// =========================
//    MANEJO DEL MODAL
// =========================

function openModal() {
  const modal = document.getElementById("movieModal");
  modal.style.display = "flex";

  document.querySelector(".close-btn").onclick = () => closeModal();

  window.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

function closeModal() {
  const modal = document.getElementById("movieModal");
  modal.style.display = "none";
}
