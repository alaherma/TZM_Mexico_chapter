---
layout: page
title: News
permalink: /news/
tags: [News, Archive]
order: 3
---

{% for post in site.posts %}

   <h2>
     <a href="{{ post.url }}">
       {{ post.title }}
     </a>
   </h2>
   <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
   {{ post.content | strip_html | truncate: "150"}}

{% endfor %}
