# Prompt Helper LWC

Interactive multi-step carousel component for FINS Fest demo.

## Overview
4-step walkthrough with suggested questions for different use cases.
Each step shows clickable question cards that copy to clipboard.

## Files
- `promptHelper.html` - Component template
- `promptHelper.js` - Controller with STEPS array
- `promptHelper.css` - Custom styling
- `promptHelper.js-meta.xml` - Metadata (exposed on Home Pages)

## Configuration
Edit the STEPS array in `promptHelper.js` to change:
- Question text
- Number of steps
- Titles and subtitles

Step 4 renders as single full-width card automatically.

## Deployment
```bash
sf project deploy start --source-dir force-app/main/default/lwc/promptHelper --target-org "FINS Demo"
