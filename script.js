//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  console.log(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.setAttribute("class", "episode");

    rootElem.appendChild(episodeElem);

    const titleElem = document.createElement("h4");
    titleElem.setAttribute("class", "episodeTitle");
    const seasonNumber =
      episode.season < 10 ? `0${episode.season}` : episode.season;
    const episodeNumber =
      episode.number < 10 ? `0${episode.number}` : episode.number;
    titleElem.innerHTML = `${episode.name} - S${seasonNumber}E${episodeNumber}`;
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

window.onload = setup;
