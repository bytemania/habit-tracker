# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

**No build step required.** Run a local HTTP server and open the app:

```bash
# Python 3
python3 -m http.server 8000

# or Node.js
npx http-server
```

Then open http://localhost:8000 in your browser.

## Code Architecture

The app uses a **simple state management + DOM rendering pattern** with no frameworks:

```
┌─────────────────────────────────────────────┐
│ State Layer (app.js)                        │
│ ├─ habits[] — in-memory array               │
│ └─ localStorage persistence                 │
└──────────────┬──────────────────────────────┘
               │
┌──────────────┴──────────────────────────────┐
│ Business Logic (app.js)                     │
│ ├─ getStreak(habit) — streak calculation    │
│ ├─ getProgress(habit) — 7-day %             │
│ ├─ addHabit/deleteHabit — state mutation    │
│ └─ toggleToday(id) — check-off logic        │
└──────────────┬──────────────────────────────┘
               │
┌──────────────┴──────────────────────────────┐
│ Rendering Layer (app.js)                    │
│ ├─ renderHabits() — generate habit cards    │
│ ├─ updateDashboard() — summary stats        │
│ └─ Event listeners (checkbox, delete)       │
└──────────────┬──────────────────────────────┘
               │
┌──────────────┴──────────────────────────────┐
│ DOM (index.html)                            │
│ ├─ Form for adding habits                   │
│ ├─ Dashboard stats cards                    │
│ └─ Habit list container (#habitsList)       │
└─────────────────────────────────────────────┘
```

### Data Flow

1. **User adds habit** → `addHabit(name)` → state update → `saveHabits()` to localStorage → `renderHabits()` re-renders UI
2. **User checks off habit** → Checkbox event → `toggleToday(id)` → state update → `saveHabits()` → `renderHabits()` refreshes UI
3. **Page loads** → `init()` → `loadHabits()` restores from localStorage → `renderHabits()` displays

Every user action triggers a full re-render of the habit list, which is fine at this scale.

## Key Files

### `app.js` (183 lines)
Contains **all** application logic:
- **State management:** `habits`, `loadHabits()`, `saveHabits()`
- **Core calculations:** `getStreak()`, `getProgress()`, `getLast7Days()`
- **Mutations:** `addHabit()`, `deleteHabit()`, `toggleToday()`
- **UI rendering:** `renderHabits()`, `updateDashboard()`, `updateDateDisplay()`
- **Initialization:** `init()` entry point

### `index.html` (45 lines)
Minimal HTML structure:
- Dashboard summary section with stat cards (`#totalHabits`, `#completedToday`, `#avgStreak`)
- Form for adding habits (`#habitForm`, `#habitInput`)
- Container for habit list (`#habitsList` — dynamically populated by `renderHabits()`)

### `style.css` (260 lines)
Complete styling:
- Gradient background and container
- Dashboard stat cards with glassmorphism
- Habit cards with checkbox, progress bar, delete button
- Responsive grid layout (mobile-first)
- No external dependencies (pure CSS3)

## Important Details

### Streak Calculation (`getStreak()`)
- Iterates through sorted completions in reverse (newest first)
- Counts consecutive days where `diffDays === streak` (no gap in history)
- Returns 0 if no completions or first completion is in the past

**Note:** A gap in completions breaks the streak. Missing even one day resets it.

### Progress Calculation (`getProgress()`)
- Generates last 7 days as ISO date strings
- Counts how many of those days appear in habit's completions array
- Returns percentage (0-100)

### localStorage Key
- Stored under key: `'habits'`
- Format: JSON stringified array of habit objects
- **No automatic syncing across devices**

### Emoji Indicators
Dynamic based on streak length:
- 🔥 = 1-7 days
- ⭐ = 8-14 days
- 🌟 = 15+ days

See `renderHabits()` line 117 for the logic.

## Development Notes

### Adding a Feature
1. **New calculation?** Add function to app.js, call from `renderHabits()` or event handler
2. **New UI element?** Update index.html markup, style in style.css, wire event listener in `renderHabits()`
3. **New state?** Add to habits object structure, update `addHabit()`, handle in rendering
4. **Always commit and push after changes** (workflow is set up for automatic commits)

### Testing Manually
- Add a habit, check it off for today → streak should be 1
- Navigate away and back → data should persist (localStorage)
- Check it off for 7 consecutive days → progress bar should reach 100%
- Miss a day → streak resets to 0, you can build a new one

### Common Bugs
- **Streak doesn't increment:** Check that completions array has consecutive dates with no gaps
- **UI doesn't update:** Ensure `renderHabits()` is called after state changes (it is in all mutations)
- **Data lost on refresh:** Verify `loadHabits()` is called in `init()` before rendering

## Git Workflow

**All changes are committed and pushed automatically after each meaningful change.**

### Commit Standards
Every commit should:
- Use a clear, descriptive message following conventional commits:
  - `feat:` — new feature or enhancement
  - `fix:` — bug fix
  - `docs:` — documentation (README, CLAUDE.md, comments)
  - `refactor:` — code improvements without changing behavior
- Include what changed and why (not just "update" or "fix")
- Example: `feat: Add habit categories - allows users to organize habits by type`

### Process
1. Make code changes
2. Verify they work
3. Run: `git add <files>`
4. Run: `git commit -m "type: Description"`
5. Run: `git push origin main`

**All commits go directly to main** — no PR review needed for solo development.

### Rollback Strategy
If something goes wrong, rollback safely:
```bash
git revert <commit-hash>  # Creates new commit undoing changes (preferred)
git checkout <commit-hash> -- app.js  # Restore specific file to past state
git log --oneline  # View commit history on GitHub or locally
```

### CLAUDE.md Updates
As the codebase evolves (new architecture, patterns, dependencies), **update CLAUDE.md** to reflect those changes:
- Document new functions and their purpose
- Update architecture diagrams if structure changes
- Add development tips for new patterns
- Keep it current so future instances can be productive immediately

## No External Dependencies

This is a 100% vanilla JavaScript app:
- No npm packages
- No build process
- No transpilation
- Works on any static file server (Python, Node, Apache, GitHub Pages, etc.)

This is intentional for simplicity and portability.
