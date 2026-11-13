(() => {
  const form = document.querySelector("#cert-filters");
  const cards = [...document.querySelectorAll(".cert-card")];
  const search = document.querySelector("#cert-search");
  const age = document.querySelector("#age-filter");
  const genre = document.querySelector("#genre-filter");
  const issuer = document.querySelector("#issuer-filter");
  const results = document.querySelector("#cert-results");
  const emptyState = document.querySelector("#cert-empty");

  if (!form || !cards.length) return;

  const normalize = (value) => value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  const applyFilters = () => {
    const query = normalize(search.value);
    let visible = 0;

    cards.forEach((card) => {
      const matches = (!query || normalize(`${card.dataset.search} ${card.textContent}`).includes(query))
        && (!age.value || card.dataset.age === age.value)
        && (!genre.value || card.dataset.genre === genre.value)
        && (!issuer.value || card.dataset.issuer === issuer.value);

      card.hidden = !matches;
      if (matches) visible += 1;
    });

    results.textContent = `Showing ${visible} of ${cards.length} records`;
    emptyState.hidden = visible !== 0;
  };

  form.addEventListener("input", applyFilters);
  form.addEventListener("change", applyFilters);
  form.addEventListener("reset", () => requestAnimationFrame(applyFilters));
  emptyState.querySelector(".cert-empty-reset")?.addEventListener("click", () => form.reset());
})();
