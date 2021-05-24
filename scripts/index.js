import {
  createRepositoriesList,
  updateUserInfo,
  getElement,
  initialiseStickyElements,
  addClass,
  hide,
  removeClass,
} from './utils';
import fetchUser from './fetch';

// Event Listeners

// Generate Page for unique Github Username
getElement('.login-generator__button').addEventListener('click', async function generateUserPage() {
  const loader = getElement('.loading-wrapper');
  const page = getElement('.page-content');
  const header = getElement('header');

  const username = getElement('.login-generator__input').value;

  // Show Loader
  removeClass(loader, 'hide');
  removeClass(page, 'hide');
  hide(getElement('.login-generator'));

  return fetchUser(username).then(function (response) {
    const repoGridSelector = '.repository-list';

    const userInfo = response.user;
    const userRepos = userInfo.repositories.nodes;
    console.log({ userInfo });

    // Update DOM with user information
    updateUserInfo(userInfo);

    // Create Repositories
    createRepositoriesList(userRepos, repoGridSelector);

    // Show Generated Page Content
    addClass(loader, 'hide-wrapper');
    addClass(header, 'show-content');
    addClass(page, 'show-content');
  });
});

// Scroll Event to show/hide the left Avatar Section (Desktop)
window.addEventListener('scroll', function updateSubnavAvatar() {
  const avatarSelector = '.user-avatarUrl';
  const subnavAvatarSelector = '.subnav-avatar-section';

  const avatar = getElement(avatarSelector);
  const subnavAvatar = getElement(subnavAvatarSelector);
  const offset = avatar.getBoundingClientRect().top + window.scrollY + avatar.clientHeight;
  const windowsScrollTop = window.pageYOffset;
  if (windowsScrollTop >= offset) {
    addClass(subnavAvatar, 'show-content');
    removeClass(subnavAvatar, 'hide-content');
    addClass(avatar, 'hide-content');
    removeClass(avatar, 'show-content');
  } else {
    removeClass(subnavAvatar, 'show-content');
    addClass(subnavAvatar, 'hide-content');
    removeClass(avatar, 'hide-content');
    addClass(avatar, 'show-content');
  }
});

// Polyfill for Position Sticky
initialiseStickyElements('sticky-container');
