//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  const searchElem = document.getElementById("searchBox");
  searchElem.addEventListener("input", wordSearch);

  const selectEpisode = document.getElementById("selectEp");
  allEpisodes.forEach((episode) => {
    const optionElem = document.createElement("option");

    optionElem.textContent = `${formatSeasonAndEp(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    selectEpisode.appendChild(optionElem);
  });
  selectEpisode.addEventListener("change", onEpisodeSelect);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.setAttribute("class", "episode");

    rootElem.appendChild(episodeElem);

    const titleElem = document.createElement("h4");
    titleElem.setAttribute("class", "episodeTitle");
    titleElem.innerHTML = `${episode.name} - ${formatSeasonAndEp(
      episode.season,
      episode.number
    )}`;
    episodeElem.appendChild(titleElem);

    const imageElem = document.createElement("img");
    imageElem.setAttribute("class", "episodeImage");
    imageElem.src = episode.image.medium;
    episodeElem.appendChild(imageElem);

    const episodeSummary = document.createElement("div");
    episodeSummary.setAttribute("class", "episodeSummary");
    episodeSummary.innerHTML = episode.summary;
    episodeElem.appendChild(episodeSummary);
  });
}

function wordSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const matchedEpisodes = getAllEpisodes().filter((episode) => {
    const nameResult = episode.name.toLowerCase().indexOf(searchTerm) > -1;
    const summaryResult =
      episode.summary.toLowerCase().indexOf(searchTerm) > -1;

    if (nameResult || summaryResult) {
      episode.name = episode.name
        .toLowerCase()
        .replace(searchTerm, `<span class="highlight">${searchTerm}</span>`);
      episode.summary = episode.summary
        .toLowerCase()
        .replace(searchTerm, `<span class="highlight">${searchTerm}</span>`);
    }
    return nameResult || summaryResult;
  });
  makePageForEpisodes(matchedEpisodes);
  document.getElementById("numberOfResults").innerText = `Displaying ${
    matchedEpisodes.length
  }/${getAllEpisodes().length} episodes`;
}

function onEpisodeSelect(event) {
  const selectEpisode = event.target.value;
  if (selectEpisode.trim().toLowerCase() === "all episodes") {
    return makePageForEpisodes(getAllEpisodes());
  }

  for (const episode of getAllEpisodes()) {
    if (episode.name === selectEpisode.split("-")[1].trim()) {
      makePageForEpisodes([episode]);
    }
  }
}

function formatSeasonAndEp(season, episode) {
  return `S${season < 10 ? `0${season}` : season}E${
    episode < 10 ? `0${episode}` : episode
  }`;
}

window.onload = setup;
