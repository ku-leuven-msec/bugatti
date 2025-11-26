---
layout: default
title: "Example: Introduction to BUGATTI"
speaker: "Project Team"
date: 2025-03-15
event: "Kickoff Meeting"
description: "An introductory presentation about the BUGATTI project: embedded security testing and automation for IoT solutions."
slides: "/bugatti/assets/presentations/example-intro.pdf"
---

# {{ page.title }}

**Speaker:** {{ page.speaker }}  
**Date:** {{ page.date | date: "%B %d, %Y" }}  
**Event:** {{ page.event }}

## Abstract

{{ page.description }}

This is an example presentation entry. To add real presentations:

1. Upload your PDF to the `assets/presentations/` directory
2. Create a new markdown file in the `_presentations` directory with the presentation metadata
3. The presentation will automatically appear on the presentations page

{% if page.slides %}
[Download Slides]({{ page.slides | relative_url }})
{% endif %}
