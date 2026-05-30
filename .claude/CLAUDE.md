# Habit Tracker App

A simple, lightweight habit tracking web application built with vanilla HTML, CSS, and JavaScript.

## Overview

This is a single-page web app that helps users build daily habits by:
- Adding habits with a simple form
- Marking habits as complete each day
- Tracking consecutive-day streaks
- Viewing progress across the last 7 days
- Seeing an overview dashboard with statistics

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, ES6+ JavaScript
- **Storage:** Browser localStorage (no server required)
- **Hosting:** Static files only, runs on any HTTP server

## Project Structure

```
.
├── index.html       # Main HTML shell and markup
├── app.js          # All application logic (state, DOM, localStorage)
├── style.css       # Complete styling and responsive layout
├── .gitignore      # Git ignore rules
└── .claude/        # Project documentation
```

## Data Model

Habits are stored in localStorage under the key `habits`:

```javascript
[
  {
    id: "1234567890",           // timestamp-based unique ID
    name: "Exercise",           // habit name
    completions: [              // ISO date strings of completed days
      "2026-05-30",
      "2026-05-29"
    ]
  }
]
```

## Key Features

### Dashboard
- Total habit count
- Number completed today
- Average streak across all habits

### Per-Habit Stats
- Current streak (consecutive days)
- 7-day completion percentage
- Visual progress bar
- Completion status (✅ or ⭕)

### Emoji Indicators
- 🔥 Standard streak (1-7 days)
- ⭐ Good streak (8-14 days)
- 🌟 Excellent streak (15+ days)

## Running the App

1. Open a terminal in this directory
2. Start a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser

## Core Functions (app.js)

- `addHabit(name)` — Create a new habit
- `deleteHabit(id)` — Remove a habit
- `toggleToday(id)` — Check/uncheck habit for today
- `getStreak(habit)` — Calculate consecutive days completed
- `getProgress(habit)` — Calculate 7-day completion %
- `renderHabits()` — Re-render all UI elements
- `updateDashboard()` — Update summary statistics

## Design Notes

- **No build step** — Works immediately when opened in a browser
- **Persistent** — Data survives page refreshes via localStorage
- **Responsive** — Mobile-friendly layout
- **Minimal** — Pure vanilla JS, no frameworks or dependencies
- **Accessible** — Semantic HTML, clear visual feedback

## Future Enhancement Ideas

- Export/import habits as JSON
- Dark mode toggle
- Habit categories/tags
- Custom completion times
- Streak notifications
- Cloud sync across devices
