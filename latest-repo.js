(() => {
  const endpoint = "https://api.github.com/users/ZProtons/repos?type=owner&sort=updated&direction=desc&per_page=100";
  const list = document.getElementById("latest-repo-list");
  if (!list) return;

  const formatDate = (value) => new Intl.DateTimeFormat("en", {
    day: "numeric", month: "short", year: "numeric"
  }).format(new Date(value));

  const create = (tag, className, value) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  };

  const makeCard = (repo, index) => {
    const article = create("article", "latest-repo-card");
    const mark = create("div", "latest-repo-mark", "GH");
    mark.setAttribute("aria-hidden", "true");

    const copy = create("div", "latest-repo-copy");
    copy.append(
      create("p", "latest-repo-kicker", "Recently updated · 0" + (index + 1)),
      create("h3", "", repo.name),
      create("p", "", repo.description || "A public project from my GitHub workspace. Open the repository to explore its source and current progress.")
    );

    const meta = create("div", "latest-repo-meta");
    if (repo.language) meta.append(create("span", "", repo.language));
    meta.append(create("span", "", "Updated " + formatDate(repo.updated_at)));
    if (repo.stargazers_count > 0) {
      meta.append(create("span", "", repo.stargazers_count + (repo.stargazers_count === 1 ? " star" : " stars")));
    }
    copy.append(meta);

    const link = create("a", "latest-repo-link", "Open on GitHub ↗");
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener";
    article.append(mark, copy, link);
    return article;
  };

  fetch(endpoint, { headers: { Accept: "application/vnd.github+json" } })
    .then((response) => {
      if (!response.ok) throw new Error("GitHub API request failed");
      return response.json();
    })
    .then((repositories) => {
      const latest = repositories
        .filter((repo) => !repo.fork && !repo.archived && !repo.private && repo.name.toLowerCase() !== "zprotons.github.io")
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 3);

      if (latest.length === 0) throw new Error("No public repositories were returned");
      list.replaceChildren(...latest.map(makeCard));
    })
    .catch(() => {
      const fallback = create("article", "latest-repo-card");
      const copy = create("div", "latest-repo-copy");
      copy.append(
        create("p", "latest-repo-kicker", "GitHub repository feed"),
        create("h3", "", "Explore recently updated work"),
        create("p", "", "The live repository feed is temporarily unavailable. Visit GitHub to see the latest projects.")
      );
      const link = create("a", "latest-repo-link", "Browse repositories ↗");
      link.href = "https://github.com/ZProtons?tab=repositories";
      link.target = "_blank";
      link.rel = "noopener";
      fallback.append(copy, link);
      list.replaceChildren(fallback);
    });
})();