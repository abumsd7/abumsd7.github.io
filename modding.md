---
layout: default
title: Modding
permalink: /modding/
---

<div class="page modding-page-container">
  <h1>Modding</h1>
  <p class="modding-description">These are a collection of archived posts from GTAForums detailing the modding contributions I have made across the years in GTA modding community.</p>

  <div class="posts-simple-list">
    {% for post in site.categories.gtamodding %}
    <div class="post-list-item">
      <span class="post-item-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      <a href="{{ site.baseurl }}{{ post.url }}" class="post-item-title">{{ post.title }}</a>
    </div>
    {% endfor %}
  </div>
</div>
