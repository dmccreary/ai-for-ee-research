// Giscus feedback widget: adds a GitHub Discussions-backed comment and reaction
// box to the bottom of every page. Each page maps to one Discussion by pathname.
//
// Setup (one time):
//   1. Enable Discussions on the repository (Settings > General > Features).
//   2. Install the giscus app on the repository: https://github.com/apps/giscus
//   3. Look up the category ID at https://giscus.app, or run:
//        gh api graphql -f query='{repository(owner:"dmccreary",name:"ai-for-ee-research"){discussionCategories(first:10){nodes{name id}}}}'
//   4. Paste the category ID below. The widget stays hidden while it is empty.
var GISCUS_CONFIG = {
  repo: "dmccreary/ai-for-ee-research",
  repoId: "R_kgDOVDygdg",
  category: "Announcements",
  categoryId: "DIC_kwDOVDygds4DJao8",
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  theme: "light",
  lang: "en"
};

function addGiscus() {
  if (!GISCUS_CONFIG.categoryId) {
    return;
  }
  var content = document.querySelector(".md-content__inner");
  if (!content || content.querySelector(".giscus-container")) {
    return;
  }

  var container = document.createElement("div");
  container.className = "giscus-container";

  var heading = document.createElement("h2");
  heading.textContent = "Feedback";
  heading.id = "feedback";
  container.appendChild(heading);

  var script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", GISCUS_CONFIG.repo);
  script.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
  script.setAttribute("data-category", GISCUS_CONFIG.category);
  script.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
  script.setAttribute("data-mapping", GISCUS_CONFIG.mapping);
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", GISCUS_CONFIG.reactionsEnabled);
  script.setAttribute("data-emit-metadata", GISCUS_CONFIG.emitMetadata);
  script.setAttribute("data-input-position", GISCUS_CONFIG.inputPosition);
  script.setAttribute("data-theme", GISCUS_CONFIG.theme);
  script.setAttribute("data-lang", GISCUS_CONFIG.lang);
  script.setAttribute("data-loading", "lazy");
  script.crossOrigin = "anonymous";
  script.async = true;
  container.appendChild(script);

  content.appendChild(container);
}

// document$ fires on every page load, including instant-navigation swaps.
if (typeof document$ !== "undefined") {
  document$.subscribe(addGiscus);
} else {
  document.addEventListener("DOMContentLoaded", addGiscus);
}
