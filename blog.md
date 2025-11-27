---
layout: page
title: Blog
permalink: /blog/
---

<div class="hero-section" style="background: linear-gradient(135deg, rgba(0, 150, 210, 0.85) 0%, rgba(26, 188, 156, 0.85) 100%), url('/bugatti/assets/images/john-adams-1xIN4FMR78A-unsplash.jpg') center/cover; background-attachment: fixed; min-height: 300px;">
  <div style="max-width: 900px;">
    <h1>📝 Blog</h1>
    <p>Insights, updates, and stories from the BUGATTI team.</p>
  </div>
</div>
Photo by <a href="https://unsplash.com/@s_tsuchiya?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Se. Tsuchiya</a> on <a href="https://unsplash.com/photos/green-and-white-computer-ram-stick-sPLLVFJXlb8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
<div style="margin: 2em 0;">
  <input type="text" id="searchInput" placeholder="Search blog posts..." style="width: 100%; padding: 12px 16px; font-size: 1em; border: 2px solid #0078b4; border-radius: 4px; box-sizing: border-box;">
  <div id="searchResults" style="margin-top: 1em; font-size: 0.9em; color: #666;"></div>
</div>

<div id="blogPosts">
{% for post in site.blog reversed %}
<div class="blog-post" style="margin: 2em 0; padding: 1.5em; background: #f9f9f9; border-radius: 8px; border-left: 4px solid #0078b4;">
  <h3 style="margin-top: 0;"><a href="{{ post.url | relative_url }}" style="color: #1a1a1a; text-decoration: none;">{{ post.title }}</a></h3>
  <p class="meta" style="color: #666; font-size: 0.9em; margin: 0.5em 0;">
    {% if post.date %}
      {{ post.date | date: "%B %d, %Y" }}
    {% endif %}
    {% if post.author %}
      • by {{ post.author }}
    {% endif %}
  </p>
  <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
  <a href="{{ post.url | relative_url }}" style="color: #0078b4; font-weight: 600;">Read more →</a>
</div>
{% endfor %}
</div>

{% if site.blog.size == 0 %}
<p><em>No blog posts yet. Check back soon for updates!</em></p>
{% endif %}

<script>
document.getElementById('searchInput').addEventListener('keyup', function() {
  const searchTerm = this.value.toLowerCase();
  const posts = document.querySelectorAll('.blog-post');
  let visibleCount = 0;

  posts.forEach(post => {
    const title = post.querySelector('h3').textContent.toLowerCase();
    const content = post.textContent.toLowerCase();
    
    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      post.style.display = 'block';
      visibleCount++;
    } else {
      post.style.display = 'none';
    }
  });

  const searchResults = document.getElementById('searchResults');
  if (searchTerm && visibleCount === 0) {
    searchResults.textContent = 'No posts found matching "' + this.value + '"';
  } else if (searchTerm) {
    searchResults.textContent = 'Found ' + visibleCount + ' post' + (visibleCount !== 1 ? 's' : '');
  } else {
    searchResults.textContent = '';
  }
});
</script>
