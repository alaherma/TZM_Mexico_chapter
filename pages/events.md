---
layout: page
title: Events
permalink: /events/
tags: [Events, Archive]
order: 4
---
Events placeholder


{% for event in site.events %}

   <h2>
     <a href="{{ event.url }}">
       {{ event.title }}
     </a>
   </h2>
   {{ event.content | truncate: "150"}}

{% endfor %}
