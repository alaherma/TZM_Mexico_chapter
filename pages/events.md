---
layout: page
title: Events
permalink: /events/
tags: [Events, Archive]
order: 4
hide: false
---

Events placeholder


{% for event in site.events %}

   <h2>
     <a href="{{ event.url }}">
       {{ event.title }}
     </a>
   </h2>
   {{ event.excerpt }}

{% endfor %}
