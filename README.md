# 📊 Habit Tracker

A simple, lightweight habit tracking web application built with vanilla HTML, CSS, and JavaScript. Track your daily habits, build streaks, and visualize your progress with an intuitive dashboard.

## ✨ Features

- **📝 Add Habits** — Create new daily habits with a simple form
- **✅ Daily Check-offs** — Mark habits as complete each day
- **🔥 Streak Tracking** — See your consecutive-day streaks with dynamic emoji (🔥⭐🌟)
- **📊 Progress Visualization** — 7-day completion percentage with visual progress bars
- **📈 Dashboard Overview** — See total habits, completed today, and average streak at a glance
- **💾 Persistent Storage** — Data saved in browser localStorage, survives page refreshes
- **📱 Responsive Design** — Works on desktop, tablet, and mobile devices
- **🎨 Beautiful UI** — Clean gradient design with emoji indicators

## 🚀 Quick Start

### Option 1: Online
1. Open http://localhost:8000 in your browser (if server is running)

### Option 2: Local Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/bytemania/habit-tracker.git
   cd habit-tracker
   ```

2. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Or use Node.js:
   ```bash
   npx http-server
   ```

3. Open http://localhost:8000 in your browser

## 📋 How to Use

1. **Add a Habit** — Type a habit name (e.g., "Exercise", "Read", "Meditate") and click "Add Habit"
2. **Check Off Daily** — Click the checkbox next to a habit to mark it complete for today
3. **View Progress** — See your streak count and 7-day completion percentage
4. **Monitor Dashboard** — Track total habits, today's completions, and average streak

## 🏗️ Project Structure

```
habit-tracker/
├── index.html       # Main HTML template
├── app.js          # Core application logic
├── style.css       # Complete styling
├── .claude/        # Project documentation
│   └── CLAUDE.md   # Technical details
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## 💾 Data Storage

All data is stored in your browser's localStorage under the key `habits`:

```javascript
[
  {
    id: "1234567890",
    name: "Exercise",
    completions: ["2026-05-30", "2026-05-29", "2026-05-28"]
  }
]
```

Data persists across browser sessions but is **not synced across devices**.

## 🎨 Streak Emoji System

- 🔥 **1-7 days** — Building momentum
- ⭐ **8-14 days** — Going strong
- 🌟 **15+ days** — On fire!

## 🛠️ Technical Details

- **Framework:** Vanilla JavaScript (no dependencies)
- **Storage:** Browser localStorage API
- **Styling:** Pure CSS3 with gradients and responsive layout
- **Browser Support:** All modern browsers (Chrome, Firefox, Safari, Edge)

## 🚀 Future Enhancements

- [ ] Export habits as JSON backup
- [ ] Import from backup file
- [ ] Dark mode toggle
- [ ] Habit categories/tags
- [ ] Custom completion times
- [ ] Weekly email summaries
- [ ] Cloud sync across devices
- [ ] Habit statistics and charts

## 💡 Tips

- **Consistency is key** — The longer your streak, the harder it is to break!
- **Start small** — Begin with 1-2 habits to build confidence
- **Track anything** — Not just fitness: reading, learning, meditation, or household tasks
- **Daily reset** — Your check-off status resets each day at midnight

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to:
1. Open an issue
2. Submit a pull request
3. Share feedback

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Built With

- HTML5
- CSS3
- JavaScript ES6+
- Browser localStorage API

---

**Start building your habits today!** 🚀
