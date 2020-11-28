const Stickyfill = require('./stickyfill.min.js');

var licenseSVG = `
  <svg aria-label="license" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
    <path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z">
    </path>
  </svg>
`;
var star = `
  <svg aria-label="star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
    </path>
  </svg>
`;
var fork = `
  <svg aria-label="fork" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
    <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
    </path>
  </svg>
`;

class Repositories {
  constructor(element, list) {
    this.root = element;
    this.data = list;
  }

  createList() {
    const d = document.createDocumentFragment();
    this.data.forEach(function (item, index) {
      const wrapper = document.createElement("li");

      const leftContent = document.createElement("div");
      const rightContent = document.createElement("div");
      const topContent = document.createElement("div");
      const bottomContent = document.createElement("div");

      leftContent.classList.add("left-content");
      rightContent.classList.add("right-content");

      topContent.classList.add("top-content");
      bottomContent.classList.add("bottom-content");

      const header = document.createElement("h3");
      const headerLink = document.createElement("a");
      const description = document.createElement("p");
      const starButton = document.createElement("button");
      const starButtonText = document.createElement("span");
      const starButtonImage = document.createElement("div");

      // Star Button
      starButtonText.textContent = "Star";
      starButtonImage.innerHTML = star;
      starButton.appendChild(starButtonImage);
      starButton.appendChild(starButtonText);
      starButton.classList.add("star-button");

      // Header
      headerLink.textContent = item.name;
      headerLink.href = item.url;
      header.appendChild(headerLink);
      topContent.appendChild(header);

      // Forked Parent
      if (item.parent) {
        const parentInfo = document.createElement("p");
        const parentInfoLink = document.createElement("a");
        parentInfo.classList.add("parent-info")
        parentInfo.textContent = "Forked from ";
        parentInfoLink.textContent = item.parent.name;
        parentInfoLink.href = item.parent.url;

        parentInfo.appendChild(parentInfoLink);
        topContent.appendChild(parentInfo);
      }

      // Description
      description.textContent = item.description;
      description.classList.add("description")

      // Private Label
      if (item.isPrivate) {
        const privateLabel = document.createElement("label");
        privateLabel.textContent = "private";

        header.appendChild(privateLabel);
      }

      // Primary Language
      if (item.primaryLanguage) {
        const primaryLang = document.createElement("div");
        primaryLang.classList.add('primary-language');

        const primaryLangText = document.createElement("p");
        const primaryLangTag = document.createElement("span");
        primaryLangText.textContent = item.primaryLanguage.name;
        primaryLangTag.classList.add(item.primaryLanguage.name.toLowerCase() + '-tag');

        primaryLang.appendChild(primaryLangTag);
        primaryLang.appendChild(primaryLangText);

        bottomContent.appendChild(primaryLang);
      }

      // Stargazers count
      if (item.stargazerCount) {
        const stargazer = document.createElement("div");
        stargazer.classList.add('stargazer-count');

        const stargazerText = document.createElement("p");
        const stargazerImage = document.createElement("div");
        stargazerText.textContent = item.stargazerCount;
        stargazerImage.innerHTML = star;

        stargazer.appendChild(stargazerImage);
        stargazer.appendChild(stargazerText);

        bottomContent.appendChild(stargazer);
      }

      // Fork Count
      if (item.forkCount || (item.parent && item.parent.forkCount)) {
        const forkCount = document.createElement("div");
        forkCount.classList.add('fork-count');

        const forkCountText = document.createElement("p");
        const forkCountImage = document.createElement("div");
        forkCountImage.innerHTML = fork;

        if (item.parent) {
          forkCountText.textContent = item.parent.forkCount;
        } else {
          forkCountText.textContent = item.forkCount;
        }

        forkCount.appendChild(forkCountImage);
        forkCount.appendChild(forkCountText);

        bottomContent.appendChild(forkCount);
      }

      // License Information
      if (item.licenseInfo) {
        const license = document.createElement("div");
        license.classList.add('license');

        const licenseText = document.createElement("p");
        const licenseImage = document.createElement("div");
        licenseText.textContent = item.licenseInfo.name;
        licenseImage.innerHTML = licenseSVG;

        license.appendChild(licenseImage);
        license.appendChild(licenseText);

        bottomContent.appendChild(license);
      }

      // Last Updated Time
      const updatedAtText = document.createElement("div");
      updatedAtText.classList.add('updated-time');

      const currentDate = Date.now();
      const updatedDate = new Date(item.updatedAt);
      const days = (currentDate - updatedDate.getTime()) / (1000 * 24 * 3600);

      if (days < 1) {
        const hours = days * 24;

        if (hours < 1) {
          const minutes = Math.ceil(hours * 60);
          updatedAtText.textContent = 'Updated ' + minutes + ' minutes ago';
        } else {
          updatedAtText.textContent = 'Updated ' + Math.ceil(hours) + ' hours ago';
        }
      }
      if ((days > 1) && (days < 30)) {
        updatedAtText.textContent = 'Updated ' + Math.ceil(days) + ' days ago';
      }
      if ((days > 30) && (days < 365)) {
        const updatedDateArray = String(updatedDate).split(' ');
        const day = updatedDateArray[2] + ' ' + updatedDateArray[1];
        updatedAtText.textContent = 'Updated on ' + day;
      }
      if (days > 365) {
        const updatedDateArray = String(updatedDate).split(' ');
        const day = updatedDateArray[2] + ' ' + updatedDateArray[1] + ' ' + updatedDateArray[3];
        updatedAtText.textContent = 'Updated on ' + day;
      }
      bottomContent.appendChild(updatedAtText);

      // Append all in order
      leftContent.appendChild(topContent)
      leftContent.appendChild(description)
      leftContent.appendChild(bottomContent)
      leftContent.classList.add('col-10')

      rightContent.appendChild(starButton);
      rightContent.classList.add('col-2');

      wrapper.appendChild(leftContent);
      wrapper.appendChild(rightContent);

      d.appendChild(wrapper);
    });

    this.root.appendChild(d);
  }
};

function updateUserInfo (name, bio, login, avatarUrl, repoCount) {
  const userBio = bio.replace(/(\r\n|\n|\r)/gm, "").trim();
  const bioWrapper = document.querySelector(".user-bio");
  const avatarWrapper = document.querySelector(".user-avatarUrl");
  const avatarMiniWrapper = document.querySelector(".user-avatar");
  const subnavWrapper = document.querySelector(".subnav-avatar");
  const loginWrapper = document.querySelector(".user-login");
  const subnavLoginWrapper = document.querySelector(".subnav-login");
  const nameWrapper = document.querySelector(".user-name");
  const repoCountWrapper = document.querySelector(".repo-count");
  const repoCountDesktopWrapper = document.querySelector(".dsk-repo-count");

  bioWrapper.textContent = userBio;
  loginWrapper.textContent = login;
  subnavLoginWrapper.textContent = login;
  avatarWrapper.src = avatarUrl;
  avatarMiniWrapper.src = avatarUrl;
  subnavWrapper.src = avatarUrl;
  nameWrapper.textContent = name;
  repoCountWrapper.textContent = repoCount;
  repoCountDesktopWrapper.textContent = repoCount;
}

const query = `query {
  viewer {
    bio
    login
    name
    avatarUrl
    repositories(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
      totalCount
      nodes {
        name
        url
        description
        updatedAt
        isFork
        stargazerCount
        isPrivate
        viewerCanAdminister
        licenseInfo {
          name
        }
        forkCount
        primaryLanguage {
          name
        }
        parent {
          name
          url
          forkCount
        }
      }
    }
  }
}`;

function fetchUserRepositories () {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
    })
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    const loadingWrapper = document.querySelector('.loading-wrapper');
    const pageWrapper = document.querySelector('.page-content');
    const repoWrapper = document.querySelector('.repos');
    const userInfo = data.data.viewer;
    const userRepos = userInfo.repositories.nodes.filter(function (repo) {
      return repo.viewerCanAdminister
    });

    // Update DOM with user information
    updateUserInfo(userInfo.name, userInfo.bio, userInfo.login, userInfo.avatarUrl, userRepos.length);

    // Add DOM with Repositories list
    const repositories = new Repositories(repoWrapper, userRepos.slice(0, 20));
    repositories.createList();

    // Show page content
    loadingWrapper.classList.add("hide-wrapper");
    pageWrapper.classList.add("show-content");
  });
}

function updateSubnavAvatar() {
  const avatar = document.querySelector(".user-avatarUrl");
  const subnavAvatar = document.querySelector(".subnav-avatar-section");
  const offset = avatar.getBoundingClientRect().top + window.scrollY + avatar.clientHeight;
  const windowsScrollTop  = window.pageYOffset;
  if (windowsScrollTop >= offset) {
    subnavAvatar.classList.add("show-content")
    subnavAvatar.classList.remove("hide-content")
    avatar.classList.add("hide-content")
    avatar.classList.remove("show-content")
  } else {
    subnavAvatar.classList.remove("show-content")
    subnavAvatar.classList.add("hide-content")
    avatar.classList.remove("hide-content")
    avatar.classList.add("show-content")
  }
};

function setSticky () {
  // Polyfill for position sticky
  const stickyElements = document.querySelectorAll(".subnav-wrapper");
  Stickyfill.add(stickyElements);
}

fetchUserRepositories();
setSticky();
window.addEventListener("scroll", updateSubnavAvatar)