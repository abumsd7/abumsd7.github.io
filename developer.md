---
layout: default
title: Developer
permalink: /developer/
---

<div class="page developer-page-container">
  <h1>Developer</h1>

  <section class="repo-section">
    <p class="developer-section-desc">Below are the list of repositories I have worked over the years in Github.</p>
    <div class="repo-grid" id="ownReposGrid">
      <div class="repo-loading-placeholder">
        <div class="repo-spinner"></div>
        <span>Loading repositories from GitHub...</span>
      </div>
    </div>
  </section>

  <section class="repo-section">
    <h2 class="repo-section-title">Contributions</h2>
    <p class="developer-section-desc">Below are my code contributions to other projects.</p>
    <div class="repo-grid" id="contributedReposGrid">
      <div class="repo-loading-placeholder">
        <div class="repo-spinner"></div>
        <span>Loading contributions...</span>
      </div>
    </div>
  </section>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var ownGrid = document.getElementById('ownReposGrid');
  var contribGrid = document.getElementById('contributedReposGrid');
  var USERNAME = 'abums1210';
  var KNOWN_AUTHORS = ['abums1210', 'abumsd7', 'abu murugesan'];
  var KNOWN_CONTRIBUTIONS = ['classic-axis', 'plugin-sdk', 'SilentPatch', 'menu-map', 'sky-ui'];
  var CACHE_KEY = 'spilledout_dev_repos_cache_v2';
  var CACHE_TTL = 30 * 60 * 1000; // 30 minutes

  var langColors = {
    'C++': '#f34b7d',
    'C': '#555555',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Kotlin': '#A97BFF',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'SCSS': '#c6538c',
    'Ruby': '#701516',
    'Shell': '#89e051',
    'GLSL': '#5686a5'
  };

  function formatDate(isoStr) {
    if (!isoStr) return '';
    var d = new Date(isoStr);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function createRepoCard(repo, isContribution) {
    var card = document.createElement('a');
    card.className = 'repo-card';
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    var lang = repo.language || '';
    var langColor = langColors[lang] || 'var(--accent-green)';

    var langHtml = lang ? '<span class="repo-lang"><span class="lang-dot" style="background:' + langColor + '"></span>' + lang + '</span>' : '';
    var starsHtml = repo.stargazers_count > 0 ? '<span class="repo-stars"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>' + repo.stargazers_count + '</span>' : '';
    var dateHtml = repo.pushed_at ? '<span class="repo-date">Updated ' + formatDate(repo.pushed_at) + '</span>' : '';

    var badgeHtml = isContribution ? '<span class="repo-contrib-badge">Contribution</span>' : '';

    card.innerHTML = 
      '<div class="repo-card-top">' +
        '<div class="repo-name-wrap">' +
          '<svg class="repo-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>' +
            '<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' +
          '</svg>' +
          '<span class="repo-name">' + repo.name + '</span>' +
        '</div>' +
        badgeHtml +
      '</div>' +
      '<p class="repo-desc">' + (repo.description ? repo.description : '<span class="no-desc">No description provided</span>') + '</p>' +
      '<div class="repo-card-footer">' +
        langHtml +
        starsHtml +
        dateHtml +
      '</div>';

    return card;
  }

  function renderData(data) {
    if (!ownGrid || !contribGrid) return;
    ownGrid.innerHTML = '';
    contribGrid.innerHTML = '';

    if (data.own && data.own.length > 0) {
      data.own.forEach(function (repo) {
        ownGrid.appendChild(createRepoCard(repo, false));
      });
    } else {
      ownGrid.innerHTML = '<div class="repo-empty">No repositories found.</div>';
    }

    if (data.contributed && data.contributed.length > 0) {
      data.contributed.forEach(function (repo) {
        contribGrid.appendChild(createRepoCard(repo, true));
      });
    } else {
      contribGrid.innerHTML = '<div class="repo-empty">No external contributions found.</div>';
    }
  }

  // Check localStorage cache first
  var cached = null;
  try {
    var rawCache = localStorage.getItem(CACHE_KEY);
    if (rawCache) {
      cached = JSON.parse(rawCache);
    }
  } catch (e) {}

  var now = Date.now();
  if (cached && cached.timestamp && (now - cached.timestamp < CACHE_TTL)) {
    renderData(cached.data);
    return;
  }

  // If cached data exists even if expired, render it immediately
  if (cached && cached.data) {
    renderData(cached.data);
  }

  // Fetch from GitHub REST API
  fetch('https://api.github.com/users/' + USERNAME + '/repos?per_page=100&sort=updated')
    .then(function (res) {
      if (!res.ok) throw new Error('GitHub API error: ' + res.status);
      return res.json();
    })
    .then(function (repos) {
      var ownRepos = [];
      var forkRepos = [];

      repos.forEach(function (r) {
        if (r.fork) {
          forkRepos.push(r);
        } else {
          ownRepos.push(r);
        }
      });

      // Check author commits or branch activity across forks
      var forkPromises = forkRepos.map(function (fork) {
        // Fast-path known contributions
        if (KNOWN_CONTRIBUTIONS.indexOf(fork.name) !== -1) {
          return Promise.resolve(fork);
        }

        // Query commits for recent authors
        return fetch('https://api.github.com/repos/' + USERNAME + '/' + fork.name + '/commits?per_page=20')
          .then(function (cRes) {
            if (!cRes.ok) return null;
            return cRes.json();
          })
          .then(function (commits) {
            if (commits && Array.isArray(commits)) {
              for (var i = 0; i < commits.length; i++) {
                var c = commits[i];
                var authorLogin = (c.author && c.author.login) ? c.author.login.toLowerCase() : '';
                var commitAuthorName = (c.commit && c.commit.author && c.commit.author.name) ? c.commit.author.name.toLowerCase() : '';
                var commitAuthorEmail = (c.commit && c.commit.author && c.commit.author.email) ? c.commit.author.email.toLowerCase() : '';

                for (var j = 0; j < KNOWN_AUTHORS.length; j++) {
                  var target = KNOWN_AUTHORS[j];
                  if (authorLogin.indexOf(target) !== -1 || commitAuthorName.indexOf(target) !== -1 || commitAuthorEmail.indexOf(target) !== -1) {
                    return fork;
                  }
                }
              }
            }

            // Also check branch count
            return fetch('https://api.github.com/repos/' + USERNAME + '/' + fork.name + '/branches')
              .then(function (bRes) {
                if (!bRes.ok) return null;
                return bRes.json();
              })
              .then(function (branches) {
                if (branches && Array.isArray(branches)) {
                  for (var k = 0; k < branches.length; k++) {
                    if (branches[k].name !== 'master' && branches[k].name !== 'main') {
                      return fork;
                    }
                  }
                }
                return null;
              })
              .catch(function () { return null; });
          })
          .catch(function () { return null; });
      });

      return Promise.all(forkPromises).then(function (forkResults) {
        var contributedForks = forkResults.filter(function (f) { return f !== null; });

        // Sort both lists by pushed_at descending
        ownRepos.sort(function (a, b) {
          return new Date(b.pushed_at) - new Date(a.pushed_at);
        });
        contributedForks.sort(function (a, b) {
          return new Date(b.pushed_at) - new Date(a.pushed_at);
        });

        var finalData = {
          own: ownRepos,
          contributed: contributedForks
        };

        // Cache result in localStorage
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: finalData
          }));
        } catch (e) {}

        renderData(finalData);
      });
    })
    .catch(function (err) {
      console.warn('Failed to fetch live repos, using fallback if available:', err);
      if (!cached || !cached.data) {
        if (ownGrid) ownGrid.innerHTML = '<div class="repo-empty">Unable to load repositories currently. Please check back later.</div>';
        if (contribGrid) contribGrid.innerHTML = '<div class="repo-empty">Unable to load contributions currently.</div>';
      }
    });
});
</script>
