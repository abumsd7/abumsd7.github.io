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
  </div>
</div>
