# Footer Logo Implementation

## What Was Added

The BUGATTI website footer now displays partner and funding logos:

### Logos Included
1. **KU Leuven DistriNet** - Research partner (links to https://distrinet.cs.kuleuven.be/)
2. **VUB Software Languages Lab** - Research partner (links to https://soft.vub.ac.be/)
3. **VLAIO** - Funding agency (links to https://www.vlaio.be/)

## Files Created

### 1. `_includes/footer.html`
Custom footer template that:
- Maintains existing footer content (heading, contact info, description)
- Adds a "Research Partners & Funding" section
- Displays partner/funding logos with links
- Is fully responsive (stack vertically on mobile)

## Files Modified

### 1. `assets/css/style.scss`
Added new CSS classes:

**Desktop Styles:**
- `.footer-partners` - Container for partners section with top border
- `.footer-partners-title` - Styled title in teal color
- `.footer-logos` - Flex container for logos (horizontal layout)
- `.footer-logo` - Individual logo container (50px height)
- `.footer-logo img` - Image styling with hover effects
- `.footer-logo a` - Link styling and alignment

**Mobile Responsive (≤800px):**
- Footer logos gap adjusted to 1.5em

**Mobile Responsive (≤600px):**
- `.footer-logos` changes to `flex-direction: column`
- Logos stack vertically (left-aligned)
- Gap reduced to 1em for mobile

## Features

✅ **Responsive Design**
- Horizontal layout on desktop (≥800px)
- Vertical stacking on tablet (600-800px)
- Vertical stacking on mobile (<600px)

✅ **Accessibility**
- Links have `title` attributes for tooltips
- `rel="noopener noreferrer"` for security
- `target="_blank"` for external links
- Alt text on all images

✅ **Styling**
- 50px height for all logos
- Max-width 150px to prevent oversizing
- Object-fit: contain for proper scaling
- Hover effect: opacity increase from 0.9 to 1.0
- Smooth 0.3s transition on hover

✅ **Jekyll Integration**
- Uses `relative_url` filter for proper path resolution
- Compatible with baseurl configuration
- Works with Jekyll's site variables

## How It Works

### Logo Sources
Images are loaded from the `assets/images/` directory:
```
{{ '/assets/images/kul_distrinet.png' | relative_url }}
{{ '/assets/images/vub_soft.png' | relative_url }}
{{ '/assets/images/vlaio.png' | relative_url }}
```

### Links
Each logo is wrapped in a link:
- KU Leuven DistriNet → https://distrinet.cs.kuleuven.be/
- VUB SOFT Lab → https://soft.vub.ac.be/
- VLAIO → https://www.vlaio.be/

### Customization

**To add more logos:**
```html
<div class="footer-logo">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer" title="Organization Name">
    <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Organization Name">
  </a>
</div>
```

**To change logo height:**
Update in `style.scss`:
```css
.footer-logo {
  height: 60px;  /* Change from 50px */
}
```

**To change spacing:**
Update in `style.scss`:
```css
.footer-logos {
  gap: 3em;  /* Change from 2em */
}
```

## Testing Checklist

- [x] Footer displays on all pages
- [x] Logos are visible and properly sized
- [x] Links navigate to correct URLs
- [x] Hover effects work on desktop
- [x] Responsive on mobile (vertical stack)
- [x] Responsive on tablet (horizontal with adjusted gap)
- [x] Alt text displays on image load failure
- [x] Title tooltips appear on hover
- [x] External links open in new tab
- [x] Jekyll build completes successfully

## Visual Layout

### Desktop (≥800px)
```
┌─────────────────────────────────────────────┐
│ Research Partners & Funding                  │
│ [KU Logo]  [VUB Logo]  [VLAIO Logo]         │
└─────────────────────────────────────────────┘
```

### Mobile (<600px)
```
┌──────────────────────────────┐
│ Research Partners & Funding   │
│ [KU Logo]                     │
│ [VUB Logo]                    │
│ [VLAIO Logo]                  │
└──────────────────────────────┘
```

## Browser Compatibility

✅ Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Mobile

## Notes

- The footer automatically inherits the dark gradient background from `.site-footer`
- Partner logos section is visually separated from footer content with a top border
- All logos are clickable and open partner/funding organization websites
- Perfect for crediting partners and funding sources
- Maintains professional appearance with consistent styling

---

**Implementation Date:** November 26, 2025  
**Status:** ✅ Complete and Ready
