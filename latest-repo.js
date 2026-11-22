(() => {
  const endpoint = "https://api.github.com/users/ZProtons/repos?type=owner&sort=created&direction=desc&per_page=100";
  const name = document.getElementById("latest-repo-name");
  const description = document.getElementById("latest-repo-description");
  const kicker = document.getElementById("latest-repo-kicker");
  const meta = document.getElementById("latest-repo-meta");
  const link = document.getElementById("latest-repo-link");
  if (!name || !description || !kicker || !meta || !link) return;

  const addMeta = (value) => {
    const item = document.createElement("span");
    item.textContent = value;
    meta.appendChild(item);
  };

  fetch(endpoint, { headers: { Accept: "application/vnd.github+json" } })
    .then((response) => {
      if (!response.ok) throw new Error("GitHub API request failed");
      return response.json();
    })
    .then((repositories) => {
      const latest = repositories
        .filter((repo) => !repo.fork && !repo.archived && !repo.private)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
      if (!latest) throw new Error("No public repositories were returned");

      kicker.textContent = "Most recently created public repository";
      name.textContent = latest.name;
      description.textContent = latest.description || "A public project from my GitHub workspace. Open the repository to explore its source and current progress.";
      link.href = latest.html_url;
      meta.replaceChildren();
      if (latest.language) addMeta(latest.language);
      addMeta("Created " + new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(latest.created_at)));
      if (latest.stargazers_count > 0) addMeta(latest.stargazers_count + (latest.stargazers_count === 1 ? " star" : " stars"));
      if (latest.license && latest.license.spdx_id) addMeta(latest.license.spdx_id);
    })
    .catch(() => {
      kicker.textContent = "GitHub repository feed";
      name.textContent = "Explore the latest work";
      description.textContent = "The live repository feed is temporarily unavailable. Visit GitHub to see the newest projects.";
      link.href = "https://github.com/ZProtons?tab=repositories";
      meta.replaceChildren();
    });
})();
