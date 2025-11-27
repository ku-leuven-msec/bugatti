# BUGATTI Design Quick Start Guide

## 🎯 Quick Implementation Examples

This guide provides copy-paste examples to enhance your pages with the new design system.

---

## 1. Hero Sections (Add to top of any page)

### Basic Hero with Title and Description
```markdown
<div class="hero-section">
  <div style="max-width: 900px;">
    <h1>🔒 Your Title Here</h1>
    <p>Your description here explaining the page content and purpose.</p>
    <p><a href="#section-id" class="btn">Call to Action</a></p>
  </div>
</div>
```

### Shorter Hero (300px height)
```markdown
<div class="hero-section" style="min-height: 300px;">
  <div style="max-width: 900px;">
    <h1>📊 Page Title</h1>
    <p>Brief description of page content.</p>
  </div>
</div>
```

---

## 2. Feature Cards Grid

### 3-Column Feature Grid
```markdown
<div class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">🧪</div>
    <h3>Feature Title 1</h3>
    <p>Brief description of this feature and its benefits to users.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛡️</div>
    <h3>Feature Title 2</h3>
    <p>Explanation of second feature and what makes it valuable.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">📚</div>
    <h3>Feature Title 3</h3>
    <p>Description of third feature and its key advantages.</p>
  </div>
</div>
```

### Custom Icons/Emojis
- 🔒 Security/Lock
- 🛡️ Protection/Shield
- 🧪 Testing/Labs
- 📚 Knowledge/Books
- 🤝 Partnership/Hands
- 🚀 Launch/Growth
- 💡 Ideas/Innovation
- ⚙️ Configuration/Tools
- 📊 Analytics/Data
- 🔧 Engineering/Tools
- 📱 Mobile/Device
- 🌐 Global/Network

---

## 3. Benefits Grid (4 items)

```markdown
<div class="benefits-grid">
  <div class="benefit-item benefit-knowledge">
    <div class="benefit-icon">🔬</div>
    <h4>Benefit Title 1</h4>
    <p>Benefit description and key advantages.</p>
  </div>
  
  <div class="benefit-item benefit-compliance">
    <div class="benefit-icon">✓</div>
    <h4>Benefit Title 2</h4>
    <p>What this benefit provides to users.</p>
  </div>
  
  <div class="benefit-item benefit-network">
    <div class="benefit-icon">🤝</div>
    <h4>Benefit Title 3</h4>
    <p>How this benefit creates value.</p>
  </div>
  
  <div class="benefit-item benefit-training">
    <div class="benefit-icon">📚</div>
    <h4>Benefit Title 4</h4>
    <p>Details about the fourth benefit.</p>
  </div>
</div>
```

### Benefit Color Classes
- `benefit-knowledge` - Teal gradient
- `benefit-compliance` - Purple gradient
- `benefit-network` - Cyan gradient
- `benefit-training` - Pink gradient

---

## 4. Info/Warning Boxes

### Information Box
```markdown
<div class="info-box">
  <strong>Information:</strong> Important information or tip for users.
  
  Additional details can be provided in multiple paragraphs.
</div>
```

### Warning Box
```markdown
<div class="warning-box">
  <strong>⚠️ Important:</strong> Critical information that users should know.
  
  This box has an orange/coral left border for emphasis.
</div>
```

### Calendar/Event Info Box
```markdown
<div class="calendar-info">
  <p><strong>📅 Event Details:</strong> Information about upcoming events or meetings.</p>
</div>
```

---

## 5. Highlight Sections

```markdown
<div class="highlight">
  <h3>🎯 Key Highlight</h3>
  <p>Use this for important announcements, key features, or special offers.</p>
  <p>The gold left border draws attention to important content.</p>
</div>
```

---

## 6. Section Dividers

```markdown
<div class="section-divider"></div>
```

This creates a decorative horizontal line with a diamond symbol in the middle.

---

## 7. Partner/Consortium Blocks

### Single Partner Block
```markdown
<div class="partner-block partner-lead">
  <div style="display: flex; align-items: center; gap: 1.5em; margin-bottom: 1em;">
    <div style="font-size: 3em;">🏛️</div>
    <div>
      <h4 style="margin: 0; color: white;">Organization Name</h4>
      <p style="margin: 0; opacity: 0.95;">Subtitle or role</p>
    </div>
  </div>
  
  <p><strong>Contact:</strong> Contact person name</p>
  <p><strong>Email:</strong> <a href="mailto:email@example.com">email@example.com</a></p>
  
  <p>Organization description and expertise.</p>
  
  <ul>
    <li>Expertise area 1</li>
    <li>Expertise area 2</li>
    <li>Expertise area 3</li>
  </ul>
  
  <p><strong>Website:</strong> <a href="https://example.com" target="_blank">example.com</a></p>
</div>
```

### Color Variants
- `partner-lead` - Teal/dark teal gradient (primary partner)
- `partner-vub` - Purple gradient (secondary partner)

---

## 8. Image Elements

### Image with Caption
```markdown
<div class="image-with-caption">
  ![Description of image]({{ site.baseurl }}/assets/images/filename.jpg)
  <p class="image-caption">Image caption with attribution and description</p>
</div>
```

### Full-Width Image Section
```markdown
<div class="image-section">
  ![Full width image description]({{ site.baseurl }}/assets/images/hero-image.jpg)
</div>
```

---

## 9. Button Styles

### Primary Button
```markdown
[Button Text](link-url){: .btn}
```

### HTML Button
```html
<a href="link-url" class="btn">Button Text</a>
```

### Button with Icon
```markdown
[🔒 Secure Download](link-url){: .btn}
```

---

## 10. Content Cards/Items

### Presentation Item
```markdown
<div class="presentation-item">
  <h3>Presentation Title</h3>
  <p class="meta">
    <strong>Date:</strong> Month Day, Year<br>
    <strong>Speaker:</strong> Speaker Name<br>
    <strong>Event:</strong> Event Name
  </p>
  <p>Presentation description and details.</p>
  <p><a href="slides.pdf" class="btn">Download Slides</a></p>
</div>
```

### Event Item
```markdown
<div class="event-item">
  <h4>Event Title</h4>
  <p class="event-meta">
    <strong>Date:</strong> Month Day, Year<br>
    <strong>Location:</strong> Location Name<br>
    <strong>Time:</strong> HH:MM - HH:MM
  </p>
  <p>Event description and details.</p>
</div>
```

---

## 11. Complete Page Example

```markdown
---
layout: page
title: Page Title
permalink: /page-url/
---

<div class="hero-section" style="min-height: 300px;">
  <div style="max-width: 900px;">
    <h1>🎯 Page Title</h1>
    <p>Engaging description of page content.</p>
  </div>
</div>

# Main Heading

Introduction paragraph with important information.

## Section 1: Features

<div class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">🧪</div>
    <h3>Feature 1</h3>
    <p>Description</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛡️</div>
    <h3>Feature 2</h3>
    <p>Description</p>
  </div>
</div>

<div class="section-divider"></div>

## Section 2: Key Information

<div class="info-box">
  <strong>Important Note:</strong> Key information for users.
</div>

### Subsection

Details and content about subsection.

<div class="highlight">
  <h3>🎯 Special Highlight</h3>
  <p>Important content that needs emphasis.</p>
</div>

## Section 3: Call to Action

<div class="benefits-grid">
  <div class="benefit-item benefit-knowledge">
    <div class="benefit-icon">🔬</div>
    <h4>Benefit 1</h4>
    <p>Details about benefit.</p>
  </div>
  
  <div class="benefit-item benefit-compliance">
    <div class="benefit-icon">✓</div>
    <h4>Benefit 2</h4>
    <p>Details about benefit.</p>
  </div>
</div>

[Learn More](#){: .btn}
```

---

## 12. Emoji Icons Reference

### Technology & Tools
- 🔧 Tools/Configuration
- ⚙️ Settings/Engineering
- 🔬 Research/Labs
- 🧪 Testing/Experiments
- 💻 Computer/Technology
- 📱 Mobile/Device

### Security & Safety
- 🔒 Lock/Security
- 🛡️ Shield/Protection
- ✓ Checkmark/Verified
- ⚠️ Warning/Alert
- 🚨 Emergency/Critical

### Communication & Collaboration
- 🤝 Partnership/Hands
- 💬 Chat/Communication
- 📞 Phone/Contact
- ✉️ Email/Message
- 📢 Announcement/Broadcast

### Knowledge & Learning
- 📚 Books/Knowledge
- 📖 Document/Manual
- 🎓 Education/Degree
- 📝 Notes/Documentation
- 🎯 Goal/Target

### Events & Calendar
- 📅 Calendar/Date
- 🕐 Time/Clock
- 📍 Location/Pin
- 🎪 Event/Conference
- 🎉 Celebration/Party

### Business & Organization
- 🏛️ Building/Institution
- 🏢 Office/Company
- 📊 Chart/Analytics
- 📈 Growth/Increase
- 💡 Idea/Innovation

---

## 13. Color Reference

### Main Colors Used
```
Teal Primary:     #1abc9c
Dark Teal:        #0d7377
Purple:           #667eea
Pink:             #f093fb
Coral:            #ff6b6b
Gold:             #f39c12
Dark Gray:        #2d3748
Light Gray:       #f7fafc
```

### Gradient Examples
```
Teal: linear-gradient(135deg, #1abc9c 0%, #0d7377 100%)
Purple: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Pink: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
```

---

## 14. Quick Styling Additions

### Make text centered
```markdown
{: style="text-align: center;"}
```

### Add top margin/spacing
```markdown
{: style="margin-top: 2em;"}
```

### Adjust box size
```html
<div style="max-width: 600px; margin: 0 auto;">
  Content here...
</div>
```

---

## 15. Common Patterns

### Two-Column Layout with Image
```markdown
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2em; align-items: center;">
  <div>
    <h3>Text Title</h3>
    <p>Description text here...</p>
  </div>
  <div>
    ![Image Description]({{ site.baseurl }}/assets/images/image.jpg)
  </div>
</div>
```

### Centered Content Box
```markdown
<div style="max-width: 700px; margin: 2em auto; text-align: center;">
  <h2>Centered Title</h2>
  <p>Centered content and description.</p>
  <p><a href="#" class="btn">Action Button</a></p>
</div>
```

---

## Tips for Best Results

1. **Consistency**: Use the same components across similar sections
2. **Spacing**: Use section dividers between major sections
3. **Hierarchy**: Use H1 for page title, H2 for sections, H3 for subsections
4. **Color**: Use highlight boxes sparingly for emphasis
5. **Icons**: Use emoji from the provided reference list
6. **Responsiveness**: All components are mobile-friendly by default

---

## Troubleshooting

**Issue**: Classes not applying?
- Check spelling of class names
- Ensure styles.scss is loaded
- Clear browser cache

**Issue**: Images not showing?
- Verify file path is correct
- Check file exists in `/assets/images/`
- Use correct file extension (.jpg, .png, etc.)

**Issue**: Layout looks broken on mobile?
- All components are responsive
- Check if custom inline styles are causing issues
- Test in different screen sizes

---

**Need More Examples?**
- Check `DESIGN_IMPROVEMENTS.md` for detailed documentation
- Check `IMAGES_GUIDE.md` for image integration help
- Review existing pages: `index.md`, `consortium.md`, `calendar.md`

---

Last Updated: November 26, 2025  
**Project:** BUGATTI - Embedded Security Testing and Automation
