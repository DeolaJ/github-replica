import graphql from './octokit';

async function fetchUser(username) {
  const response = await graphql(`
    query {
      user(login: "${username || 'deolaj'}") {
        bio
        login
        name
        avatarUrl
        status {
          emojiHTML
        }
        repositories(first: 20, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }) {
          totalCount
          nodes {
            name
            url
            description
            updatedAt
            isFork
            stargazerCount
            isPrivate
            licenseInfo {
              name
            }
            forkCount
            primaryLanguage {
              name
              color
            }
            parent {
              name
              url
              forkCount
            }
            repositoryTopics(first: 6) {
              edges{
                node{
                  topic{
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  return response;
}

export default fetchUser;
