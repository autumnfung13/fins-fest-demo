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

## Viewing in App Builder

After deploying via terminal, the component is immediately 
available in Lightning App Builder as a draggable component.

### Steps to Add to a Page
1. Go to **Setup** in your Salesforce org
2. Search for **Lightning App Builder** in the Quick Find box
3. Open an existing page or create a new one
4. In the **Components panel** on the left, search for `prompt`
5. You'll see **Prompt Helper** under the **Custom** section
6. **Drag and drop** it onto the canvas
7. Click **Save** → then **Activation...** to make it live

### Notes
- The component is exposed on: Home Pages, App Pages, Record Pages
- No configuration needed — questions are hardcoded in the STEPS array
- To edit questions, update the STEPS array in `promptHelper.js` 
  and redeploy
- Changes in the org are instant after deploy — no need to 
  re-add the component to the page
