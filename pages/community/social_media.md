---
layout: page
title: Social Media
#subtitle:
permalink: /social_media/
parentid: community
bootstrap: false
---

<!-- Twitter preview link below - works but needs to be formatted with the rest of the content
<a class="twitter-timeline" data-width="350" data-height="600" href="{{ site.tzm_global_twitter_url }}">Tweets by tzmglobal</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
-->
{% if site.twitter_url or site.facebook_url or site.instagram.url or site.youtube_url %}
### Local {{ site.chapter }} TZM Links
{% endif %}

{% if site.twitter_url %}
![TwitterLogo](../../assets/img/twitter.png "Twitter"){:height="36px" width="36px"} [Twitter]({{ site.twitter_url }})
{% endif %}

{% if site.facebook_url %}
![FacebookLogo](../../assets/img/facebook.png "Facebook"){:height="36px" width="36px"} [Facebook]({{ site.facebook_url}})
{% endif %}

{% if site.instagram_url %}
![InstagramLogo](../../assets/img/instagram.png "Instagram"){:height="36px" width="36px"} [Instagram]({{ site.instagram_url}})
{% endif %}

{% if site.youtube_url %}
![YoutubeLogo](../../assets/img/youtube.png "YouTube"){:height="36px" width="36px"} [YouTube]({{ site.youtube_url}})
{% endif %}


### Global TZM Links

<!-- Twitter preview link below - works but needs to be formatted with the rest of the content
<a class="twitter-timeline" data-width="350" data-height="600" href="{{ site.tzm_global_twitter_url }}">Tweets by tzmglobal</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
-->


![TwitterLogo](../../assets/img/twitter.png "Twitter"){:height="36px" width="36px"} [Twitter]({{ site.tzm_global_twitter_url }})

![FacebookLogo](../../assets/img/facebook.png "Facebook"){:height="36px" width="36px"} [Facebook]({{ site.tzm_global_facebook_url}})

![InstagramLogo](../../assets/img/instagram.png "Instagram"){:height="36px" width="36px"} [Instagram]({{ site.tzm_global_instagram_url}})

![YoutubeLogo](../../assets/img/youtube.png "YouTube"){:height="36px" width="36px"} [YouTube]({{ site.tzm_global_youtube_url}})
