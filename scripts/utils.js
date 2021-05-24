import Stickyfill from 'stickyfilljs';

// DOM Interaction utility functions
export function getElement(selector) {
  return document.querySelector(selector);
}

export function getElements(selector) {
  return document.querySelectorAll(selector);
}

export function hide(element) {
  element.classList.add('hide-content');
}

export function addClass(element, className) {
  element.classList.add(className);
}

export function removeClass(element, className) {
  element.classList.remove(className);
}

// Repository list Utility functions
function getSVGs() {
  const licenseSVG = `
    <svg aria-label="license" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
      <path
        fill-rule="evenodd"
        d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
      ></path>
    </svg>
  `;

  const starSVG = `
    <svg aria-label="star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
      <path
        fill-rule="evenodd"
        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
      ></path>
    </svg>
  `;

  const forkSVG = `
    <svg aria-label="fork" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
      <path
        fill-rule="evenodd"
        d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
      ></path>
    </svg>
  `;

  return { licenseSVG, starSVG, forkSVG };
}

function generateUpdatedAtText(updatedAt) {
  const currentDate = Date.now();
  const updatedDate = new Date(updatedAt);
  const days = (currentDate - updatedDate.getTime()) / (1000 * 24 * 3600);

  if (days < 1) {
    const hours = days * 24;

    if (hours < 1) {
      const minutes = Math.ceil(hours * 60);
      return 'Updated ' + minutes + ' minutes ago';
    } else {
      return 'Updated ' + Math.ceil(hours) + ' hours ago';
    }
  }
  if (days > 1 && days < 30) {
    return 'Updated ' + Math.floor(days) + ' days ago';
  }
  if (days > 30 && days < 365) {
    const updatedDateArray = String(updatedDate).split(' ');
    const day = updatedDateArray[2] + ' ' + updatedDateArray[1];
    return 'Updated on ' + day;
  }
  if (days > 365) {
    const updatedDateArray = String(updatedDate).split(' ');
    const day = updatedDateArray[2] + ' ' + updatedDateArray[1] + ' ' + updatedDateArray[3];
    return 'Updated on ' + day;
  }
}

function privateSection(isPrivate) {
  if (isPrivate) {
    return `
      <label>private</label>
    `;
  }
  return '';
}

function parentSection(parent) {
  if (parent) {
    return `
      <p class="parent-info">
        Forked from <a href="${parent.url}">${parent.name}</a>
      </p>
    `;
  }
  return '';
}

function repoTopics(repositoryTopics) {
  if (repositoryTopics) {
    const topicsArray = repositoryTopics.edges;
    const topics = topicsArray
      .map(
        (topic) =>
          `
          <a href="#" class="repository-list-item__topics-tag">
            ${topic.node.topic.name}
          </a>
        `
      )
      .join('');

    return `
      <p class="repository-list-item__topics">
        ${topics}
      </p>
    `;
  }
  return '';
}

function languageSection(primaryLanguage) {
  if (primaryLanguage) {
    return `
      <div class="primary-language">
        <span style="background-color: ${primaryLanguage.color}"></span>
        <p>${primaryLanguage.name}</p>
      </div>
    `;
  }
  return '';
}

function stargazerCountSection(stargazerCount) {
  const { starSVG } = getSVGs();

  if (stargazerCount) {
    return `
      <div class="stargazer-count">
        <div>
          ${starSVG}
        </div>
        <p>${stargazerCount}</p>
      </div>
    `;
  }
  return '';
}

function forkSection(forkCount, parent) {
  const { forkSVG } = getSVGs();

  if (forkCount || (parent && parent.forkCount)) {
    return `
      <div class="fork-count">
        <div>
          ${forkSVG}
        </div>
        <p>
          ${parent ? parent.forkCount : forkCount}
        </p>
      </div>
    `;
  }
  return '';
}

function licenseSection(licenseInfo) {
  const { licenseSVG } = getSVGs();

  if (licenseInfo) {
    return `
      <div class="license">
        <div>
          ${licenseSVG}
        </div>
        <p>${licenseInfo.name}</p>
      </div>
    `;
  }
  return '';
}

export function createRepositoriesList(repositories, repoGridSelector) {
  const repoGrid = getElement(repoGridSelector);

  repoGrid.innerHTML = repositories
    .map((repository) => {
      const {
        description,
        forkCount,
        isPrivate,
        licenseInfo,
        name,
        parent,
        primaryLanguage,
        stargazerCount,
        updatedAt,
        repositoryTopics,
        url,
      } = repository;

      const { starSVG } = getSVGs();

      return `
        <li class="repository-list-item">
          <div class="repository-list-item--left col-10">
            <div class="repository-list-item__header">
              <h3>
                <a href="${url}">${name}</a>
                ${privateSection(isPrivate)}
              </h3>
              ${parentSection(parent)}
            </div>
            <p class="repository-list-item__description">${description || ''}</p>
            ${repoTopics(repositoryTopics)}
            <div class="repository-list-item__options">
              ${languageSection(primaryLanguage)}
              ${stargazerCountSection(stargazerCount)}
              ${forkSection(forkCount, parent)}
              ${licenseSection(licenseInfo)}
              <div class="repository-list-item__updated-time">${generateUpdatedAtText(updatedAt)}</div>
            </div>
          </div>
          <div class="repository-list-item--right col-2">
            <button class="star-button">
              <div>
                ${starSVG}
              </div>
              <span>Star</span>
            </button>
          </div>
        </li>
      `;
    })
    .join('');
}

// Update sections with user information
export function updateUserInfo(userInfo) {
  const {
    name,
    login,
    avatarUrl,
    bio,
    status,
    repositories: { totalCount },
  } = userInfo;

  const userBio = bio.replace(/(\r\n|\n|\r)/gm, '').trim();
  const bioWrapper = getElement('.user-bio');
  const avatarWrapper = getElement('.user-avatarUrl');
  const avatarMiniWrapper = getElement('.user-avatar');
  const subnavWrapper = getElement('.subnav-avatar');
  const loginWrapper = getElement('.user-login');
  const subnavLoginWrapper = getElement('.subnav-login');
  const nameWrapper = getElement('.user-name');
  const repoCountWrapper = getElement('.repo-count');
  const repoCountDesktopWrapper = getElement('.dsk-repo-count');
  const repoDetails = getElement('.repository-details p');
  const statusBadge = getElement('.status-badge');

  bioWrapper.textContent = userBio;
  loginWrapper.textContent = login;
  subnavLoginWrapper.textContent = login;
  avatarWrapper.src = avatarUrl;
  avatarMiniWrapper.src = avatarUrl;
  subnavWrapper.src = avatarUrl;
  nameWrapper.textContent = name;
  repoCountWrapper.textContent = totalCount;
  repoCountDesktopWrapper.textContent = totalCount;
  repoDetails.innerHTML = `<strong>${totalCount}</strong> results for <strong>public</strong> repositories`;

  if (status) {
    statusBadge.innerHTML = status.emojiHTML;
  }
}

// Polyfill Utility functions
export function initialiseStickyElements(selector) {
  // Polyfill for position sticky
  const stickyElements = getElements(selector);
  Stickyfill.add(stickyElements);
}
