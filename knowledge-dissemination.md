---
layout: page
title: Knowledge Dissemination
permalink: /knowledge-dissemination/
---

<div class="hero-section" style="background: linear-gradient(135deg, rgba(0, 150, 210, 0.85) 0%, rgba(0, 120, 180, 0.85) 100%), url('/bugatti/assets/images/john-adams-1xIN4FMR78A-unsplash.jpg') center/cover; background-attachment: fixed; min-height: 300px;">
  <div style="max-width: 900px;">
    <h1>📊 Knowledge Dissemination</h1>
    <p>Presentations, articles, papers, and resources from the BUGATTI project.</p>
  </div>
</div>

# Past Events & Workshops

Our project organizes regular events to share knowledge and engage with the IoT security community.

{% for event in site.dissemination %}
<div class="event-item" style="margin: 2em 0; padding: 1.5em; background: #f9f9f9; border-radius: 8px; border-left: 4px solid #0096d2;">
  <h3 style="margin-top: 0;"><a href="{{ event.url | relative_url }}" style="color: #1a1a1a; text-decoration: none;">{{ event.title }}</a></h3>
  <p class="meta" style="color: #666; font-size: 0.9em; margin: 0.5em 0;">
    {% if event.date %}
      {{ event.date | date: "%B %d, %Y" }}
    {% endif %}
    {% if event.event_type %}
      • {{ event.event_type }}
    {% endif %}
  </p>
  <a href="{{ event.url | relative_url }}" style="color: #0078b4; font-weight: 600;">View event details & presentations →</a>
</div>
{% endfor %}
<!-- 
---

# Articles & Publications

Latest insights and research from the BUGATTI team.

{% for article in site.articles %}
<div class="article-preview" style="margin: 2em 0; padding: 1.5em; background: #f9f9f9; border-radius: 8px; border-left: 4px solid #0096d2;">
  <h3><a href="{{ article.url | relative_url }}">{{ article.title }}</a></h3>
  <p class="meta" style="color: #666; font-size: 0.9em; margin: 0.5em 0;">
    {% if article.date %}
      Published on {{ article.date | date: "%B %d, %Y" }}
    {% endif %}
    {% if article.author %}
      by {{ article.author }}
    {% endif %}
  </p>
  <p>{{ article.excerpt | strip_html | truncatewords: 50 }}</p>
  <a href="{{ article.url | relative_url }}" style="color: #0078b4; font-weight: 600;">Read more →</a>
</div>
{% endfor %}

---

# Resources

## Community Feedback

We use Poll Everywhere to gather feedback from our community. [View latest poll results](#)

---

*Last updated: November 2025*
1. Adding PDF files to the `assets/presentations/` directory
2. Creating a new entry in the `_presentations` collection with metadata
3. Submitting a pull request or contacting the project coordinator

---

## Available Presentations

{% if site.presentations.size > 0 %}
<div class="presentations-list">
{% for presentation in site.presentations reversed %}
  <div class="presentation-item">
    <h3>{{ presentation.title }}</h3>
    <p class="meta">
      <strong>Date:</strong> {{ presentation.date | date: "%B %d, %Y" }}<br>
      <strong>Speaker:</strong> {{ presentation.speaker }}<br>
      {% if presentation.event %}
      <strong>Event:</strong> {{ presentation.event }}<br>
      {% endif %}
    </p>
    {% if presentation.description %}
    <p>{{ presentation.description }}</p>
    {% endif %}
    {% if presentation.slides %}
    <p><a href="{{ presentation.slides | relative_url }}" class="btn">Download Slides (PDF)</a></p>
    {% endif %}
  </div>
  <hr>
{% endfor %}
</div>
{% else %}
<p><em>No presentations have been published yet. Check back soon for updates from our meetings and events.</em></p>
{% endif %}

--- -->

## Upcoming Events

<strong>Want to stay up-to-date?</strong> Send an email to <a href="#" style="color: #1565c0; text-decoration: underline;" onclick="window.location.href='mailto:'+'jorn.lapon'+'@'+'kuleuven.be';return false;">jorn.lapon [at] kuleuven [dot] be</a> to receive updates about future events and project news.

<style>
.presentation-item {
  margin: 2em 0;
}
.presentation-item h3 {
  margin-bottom: 0.5em;
  color: #2a7ae2;
}
.meta {
  color: #666;
  font-size: 0.9em;
}
.btn {
  display: inline-block;
  padding: 8px 16px;
  background: #2a7ae2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 8px;
}
.btn:hover {
  background: #1e5bb8;
}
</style>
