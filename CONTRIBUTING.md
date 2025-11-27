# Contributing to the BUGATTI Website

Thank you for contributing to the BUGATTI project website! This guide will help you add content and make updates.

## Quick Start

The easiest way to contribute is through GitHub's web interface - no local setup required!

## Adding a Presentation

### Via GitHub Web Interface

1. **Upload your PDF:**
   - Navigate to `assets/presentations/` in GitHub
   - Click "Add file" → "Upload files"
   - Upload your PDF presentation
   - Commit with a descriptive message

2. **Create presentation metadata:**
   - Navigate to `_presentations/` folder
   - Click "Add file" → "Create new file"
   - Name it: `YYYY-MM-DD-short-title.md` (e.g., `2024-03-15-kickoff-meeting.md`)
   - Add the following content:

   ```yaml
   ---
   layout: default
   title: "Your Presentation Title"
   speaker: "Speaker Name / Organization"
   date: 2024-03-15
   event: "Event Name (e.g., Quarterly Meeting Q1)"
   description: "A brief description of what the presentation covers"
   slides: "/bugatti/assets/presentations/your-file.pdf"
   ---
   ```

3. **Commit:** Click "Commit new file"

The presentation will automatically appear on the website within a few minutes!

### Via Local Development

If you prefer working locally:

```bash
# Clone the repository
git clone https://github.com/ku-leuven-msec/bugatti.git
cd bugatti

# Add your files
cp ~/Downloads/presentation.pdf assets/presentations/
nano _presentations/2024-03-15-meeting.md

# Commit and push
git add .
git commit -m "Add presentation from Q1 meeting"
git push
```

## Updating the Calendar

### Adding an Event to the Calendar Page

Edit `calendar.md` and add your event in the appropriate section:

```markdown
### Upcoming Events

<div class="event-item">
  <h4>Event Title</h4>
  <p class="event-meta">
    <strong>Date:</strong> March 15, 2024<br>
    <strong>Location:</strong> KU Leuven, Belgium
  </p>
  <p>Event description here.</p>
</div>
```

### Adding to the iCalendar Feed

Edit `calendar.ics` to add events to the subscribable calendar:

```ics
BEGIN:VEVENT
UID:unique-id-2024-q1@ku-leuven-msec.github.io
DTSTAMP:20240101T120000Z
DTSTART:20240315T100000Z
DTEND:20240315T170000Z
SUMMARY:Quarterly Meeting Q1
DESCRIPTION:First quarterly meeting of 2024
LOCATION:KU Leuven, Leuven, Belgium
STATUS:CONFIRMED
END:VEVENT
```

**Date format:** `YYYYMMDDTHHMMSSZ` (UTC time)

Subscribers will automatically receive the update!

## Updating Consortium Information

Edit `consortium.md` to:

- Add new research partners
- Update advisory board members
- Add company information

Example partner block:

```markdown
### Partner Name

<div class="partner-block">
  <p><strong>Type:</strong> University / Company</p>
  <p><strong>Expertise:</strong> Area of expertise</p>
  
  <p>Brief description of the partner's role and contribution.</p>
  
  <p><strong>Website:</strong> <a href="https://partner.com">partner.com</a></p>
</div>
```

## Updating General Content

- **Home page:** Edit `index.md`
- **Presentations page:** Edit `presentations.md`
- **Calendar page:** Edit `calendar.md`
- **Consortium page:** Edit `consortium.md`

All pages use Markdown formatting. [Markdown Guide](https://www.markdownguide.org/basic-syntax/)

## Adding Images

1. Upload images to `assets/images/`
2. Reference in markdown:

```markdown
![Alt text](/bugatti/assets/images/your-image.jpg)
```

## Testing Locally (Optional)

To preview changes before publishing:

```bash
# Install dependencies (first time only)
bundle install

# Start local server
bundle exec jekyll serve

# Open http://localhost:4000/bugatti in your browser
```

## Style Guidelines

- Use clear, professional language
- Keep descriptions concise
- Include dates in presentations (YYYY-MM-DD format)
- Always include speaker information
- Test links before committing

## Getting Help

- **Technical issues:** Open an issue in the repository
- **Content questions:** Contact bugatti@cs.kuleuven.be

## Review Process

All contributions are welcome! Changes pushed to the main branch will:
1. Trigger automatic builds (GitHub Actions)
2. Deploy to the live site (usually within 2-5 minutes)
3. Be visible at https://ku-leuven-msec.github.io/bugatti

For major changes, consider:
- Opening a pull request for review
- Discussing with the project team first

Thank you for contributing to BUGATTI!
