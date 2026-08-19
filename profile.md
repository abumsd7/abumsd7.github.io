---
layout: default
title: Profile
permalink: /profile/
---

<div class="profile-page-container">
  <div class="profile-card">
    <div class="profile-avatar-wrap">
      <img src="{{ site.avatar }}" alt="{{ site.name }}" class="profile-avatar" />
    </div>
    <h1 class="profile-name">{{ site.name }}</h1>
    <p class="profile-bio">{{ site.description }}</p>
    
    <div class="profile-social-section">
      {% include social_cards.html %}
    </div>

    <div class="profile-about-section">
      <h2 class="profile-section-title">About this Blog</h2>
      <ul class="profile-about-list">
        <li>Just read through First Drops, you might have an idea about what's going on here.</li>
        <li>There is no particular genre I am trying to fulfill here. All kinds of stuff will be tried out.</li>
        <li>Since this is a blog, of all sites.</li>
        <li>Blog hosted on GitHub Pages and runs on Jekyll, which generates static sites from Markdown language.</li>
        <li>Based on a tweaked template of Jekyll called <a href="https://github.com/barryclark/jekyll-now" target="_blank" rel="noopener">jekyll-now</a> by Barry Clark. Further added CSS enhancments with Antigravity IDE.</li>
        <li>Posts will be on both Tamil and English.</li>
      </ul>
    </div>
  </div>
</div>
