function renderLink(link) {
  let icon = "";

  switch (link.what) {
    case "discord":
      icon = '<i class="fa-brands fa-discord"></i>';
      break;
    case "github":
      icon = '<i class="fa-brands fa-github"></i>';
      break;
    case "wikipedia-w":
      icon = '<i class="fa-brands fa-wikipedia-w"></i>';
      break;
    default:
      icon = '<i class="fa-solid fa-link"></i>';
      break;
  }

  return `
<a target="_blank" class="ServerLink" href="${link.href}">
  ${icon}
  ${link.text}
</a>
`;
}

function renderServers(servers) {
  const serversBlock = document.getElementById("Servers");

  for (const server of servers) {
    const el = document.createElement("div");
    const links = server.links.map(renderLink).join("");

    el.className = "Server Block";
    el.innerHTML = `
<div class="ServerTitle">
    <img class="ServerIcon" src="${server.icon}">${server.name}
</div>
<details class="ServerDescription">
    <summary>Описание</summary>
    <p>${server.description}</p>
    <div class="ServerLinks">
        ${links}
    </div>
</details>
<a class="ServerButton" href="${server.address}">
    <span class="PlayButton">
        <i class="fa-solid fa-play"></i> Join
    </span>
    <span class="PopulationButton">
        ${
          server.online
            ? '<div class="StatusOnline"></div> online'
            : '<div class="StatusOffline"></div> offline'
        } <i class="fa-solid fa-users"></i> ${server.players}
    </span>
</a>`;

    serversBlock.appendChild(el);
  }
}

function renderNews(newsArray) {
  const newsBlock = document.getElementById("News");

  for (const news of newsArray) {
    const el = document.createElement("artice");

    el.className = "NewsItem Block";

    const date = new Date(news.date);

    el.innerHTML = `
<h2 class="NewsTitle">
    ${news.name}
</h2>
<div class="Data">
    <i class="fa-solid fa-clock"></i> ${date.toLocaleDateString()}
</div>
<p>
    ${news.content}
</p>`;

    newsBlock.appendChild(el);
  }
}

const data = JSON.parse(document.body.getAttribute("data-json"));

renderServers(data.servers);
renderNews(data.news);
