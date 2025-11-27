# Adding Unsplash Images to BUGATTI Site

This guide shows how to enhance the website with free, high-quality images from Unsplash.

## Recommended Images for Each Section

### 1. Home Page - Main Hero Image
**Purpose:** Showcase IoT security and technology

**Recommended Search Terms:**
- "circuit board technology"
- "digital security lock"
- "network automation"
- "IoT devices"

**Example Attribution:**
```markdown
![IoT Security Network]({{ site.baseurl }}/assets/images/iot-security-hero.jpg)
Photo by [Author Name](https://unsplash.com/@username) on [Unsplash](https://unsplash.com)
```

**How to Use:**
Add to `index.md` after the hero section or within feature cards:
```markdown
<div class="image-with-caption">
  ![IoT Technology]({{ site.baseurl }}/assets/images/iot-tech.jpg)
  <p class="image-caption">Modern IoT solutions require comprehensive security testing</p>
</div>
```

---

### 2. Consortium Page - Partner Logos/Images
**Purpose:** Represent research partnerships and collaboration

**Recommended Search Terms:**
- "university campus research"
- "team collaboration brainstorm"
- "technology partnership"
- "research lab"

**Example Implementation:**
```markdown
<div class="image-section">
  ![Research Collaboration]({{ site.baseurl }}/assets/images/research-partnership.jpg)
</div>
```

---

### 3. Presentations Page - Showcase
**Purpose:** Highlight presentation topics and topics

**Recommended Search Terms:**
- "conference presentation"
- "workshop training hands-on"
- "team meeting discussion"
- "presentation slides"

---

### 4. Calendar Page - Events Banner
**Purpose:** Create excitement for upcoming events

**Recommended Search Terms:**
- "conference room meeting"
- "seminar audience"
- "workshop participants"
- "professional development"

---

## Unsplash API & Integration Options

### Option 1: Manual Download & Upload

1. Visit [Unsplash.com](https://unsplash.com)
2. Search for relevant terms
3. Click on image
4. Download desired resolution (1920x1080 recommended)
5. Save to `/assets/images/` with descriptive name
6. Add attribution to your page

### Option 2: Direct URL Links (No Download Required)

You can directly link to Unsplash images without downloading:

```markdown
![Description](https://images.unsplash.com/photo-ID?w=1200&h=600&fit=crop)
```

**Note:** Include proper attribution per Unsplash license requirements

### Option 3: Unsplash Collections

Pre-curated collections for common themes:

- [Technology & Innovation](https://unsplash.com/collections/3346399/technology)
- [Business & Collaboration](https://unsplash.com/collections/2549476/business)
- [Science & Research](https://unsplash.com/collections/10544038/science)

---

## Optimization Best Practices

### Image Formats
- Use **WebP** for modern browsers (better compression)
- Fallback to **JPEG** for compatibility
- Use **PNG** only for images with transparency

### Sizing Guidelines
```
Hero Images:     1920x600px or 1600x500px
Feature Images:   800x600px or 1200x800px
Thumbnail:        400x300px or 300x225px
Logo/Icon:        400x400px or 500x500px
```

### Responsive Implementation
```markdown
<picture>
  <source srcset="{{ site.baseurl }}/assets/images/hero.webp" type="image/webp">
  <img src="{{ site.baseurl }}/assets/images/hero.jpg" alt="Description" style="width: 100%; height: auto;">
</picture>
```

### Lazy Loading
Add to images for better performance:
```html
<img src="..." alt="..." loading="lazy">
```

---

## Attribution Examples

### Unsplash License Attribution
When using Unsplash images, include:

```markdown
Photo by [Photographer Name](https://unsplash.com/@username) on [Unsplash](https://unsplash.com)
```

### Footer Attribution Block
```html
<div class="image-credits">
  <p><small>
    Images used under <a href="https://unsplash.com/license">Unsplash License</a>
  </small></p>
</div>
```

---

## JavaScript Integration (Optional)

For automatic image loading from Unsplash API:

```javascript
// Fetch random image from Unsplash
fetch('https://api.unsplash.com/photos/random?query=iot&client_id=YOUR_CLIENT_ID')
  .then(res => res.json())
  .then(data => {
    document.querySelector('.hero img').src = data.urls.regular;
    document.querySelector('.photo-credit').innerHTML = 
      `Photo by <a href="${data.user.portfolio_url}">${data.user.name}</a> on Unsplash`;
  });
```

**Note:** Requires Unsplash API key from [unsplash.com/developers](https://unsplash.com/developers)

---

## Specific Image Recommendations

### Top 10 Recommended Images

1. **Circuit Board/Microchip** - For security/tech hero
   - Search: "circuit board close up"
   - Use: Home hero, features background

2. **Network/Connected Nodes** - For IoT theme
   - Search: "network nodes connections"
   - Use: Feature cards background

3. **Padlock/Security** - For security emphasis
   - Search: "digital security lock"
   - Use: Security features section

4. **Team Collaboration** - For consortium
   - Search: "team brainstorming meeting"
   - Use: Consortium page hero

5. **Laboratory/Research** - For research focus
   - Search: "research laboratory"
   - Use: Technical sections

6. **Professional Team** - For team showcase
   - Search: "diverse team technology"
   - Use: Team/partner sections

7. **Conference/Presentation** - For events
   - Search: "conference presentation stage"
   - Use: Presentations/Calendar pages

8. **Workshop/Training** - For education focus
   - Search: "hands on workshop training"
   - Use: Education/knowledge sections

9. **Modern Office/Tech** - For company page
   - Search: "modern office technology"
   - Use: General backgrounds

10. **Globe/Technology Map** - For international scope
    - Search: "world map technology"
    - Use: Project scope sections

---

## CSS for Image Styling

Predefined CSS classes for consistent image styling:

```css
.image-section {
  margin: 2em 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.image-section img {
  width: 100%;
  height: auto;
  display: block;
}

.image-with-caption {
  text-align: center;
  margin: 2em 0;
}

.image-with-caption img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.image-caption {
  font-size: 0.9em;
  color: #666;
  margin-top: 1em;
  font-style: italic;
}
```

---

## Example Markdown: Adding Images to Pages

### Simple Image
```markdown
![Alt text]({{ site.baseurl }}/assets/images/filename.jpg)
```

### Image with Caption
```markdown
<div class="image-with-caption">
  ![Alt text]({{ site.baseurl }}/assets/images/filename.jpg)
  <p class="image-caption">Your caption here</p>
</div>
```

### Full-Width Section
```markdown
<div class="image-section">
  ![Alt text]({{ site.baseurl }}/assets/images/filename.jpg)
</div>
```

### Beside Text
```markdown
![Alt text]({{ site.baseurl }}/assets/images/filename.jpg){: .float-left}

Your text here...
```

---

## Tools for Image Optimization

### Online Tools
- [TinyPNG](https://tinypng.com) - PNG/JPG compression
- [Squoosh](https://squoosh.app) - Format conversion
- [ImageOptim](https://imageoptim.com) - Batch optimization

### Command Line Tools
```bash
# ImageMagick - resize
convert input.jpg -resize 1200x800 output.jpg

# WebP conversion
cwebp input.jpg -o output.webp

# Compression with oxipng
oxipng input.png
```

---

## Legal & Attribution

### Unsplash License
- **Free to use** commercially and non-commercially
- **No permission** required
- **Attribution appreciated** but not required
- See [full license](https://unsplash.com/license)

### Other Free Image Sources
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images & videos
- [Unsplash](https://unsplash.com) - High-quality photos
- [Flickr Creative Commons](https://flickr.com/search/commons) - Community photos

---

## Performance Tips

1. **Compress images** before uploading
2. **Use modern formats** (WebP preferred)
3. **Implement lazy loading** for off-screen images
4. **Optimize dimensions** to match display size
5. **Add proper alt text** for accessibility

---

**Need Help?**
- Unsplash: [Support](https://support.unsplash.com)
- ImageOptim: [Documentation](https://imageoptim.com/how-to.html)
- Jekyll Images: [Jekyll Docs](https://jekyllrb.com/docs/posts/#including-images)

---

Last Updated: November 26, 2025
