const STORAGE_KEY = 'habits';

let habits = [];

function getToday() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

function loadHabits() {
  const stored = localStorage.getItem(STORAGE_KEY);
  habits = stored ? JSON.parse(stored) : [];
}

function saveHabits() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function addHabit(name) {
  const habit = {
    id: Date.now().toString(),
    name: name.trim(),
    completions: []
  };
  habits.push(habit);
  saveHabits();
}

function deleteHabit(id) {
  habits = habits.filter(h => h.id !== id);
  saveHabits();
}

function toggleToday(id) {
  const habit = habits.find(h => h.id === id);
  if (!habit) return;

  const today = getToday();
  const index = habit.completions.indexOf(today);

  if (index > -1) {
    habit.completions.splice(index, 1);
  } else {
    habit.completions.push(today);
  }

  saveHabits();
}

function getStreak(habit) {
  if (habit.completions.length === 0) return 0;

  const sorted = habit.completions.sort().reverse();
  let streak = 0;
  let currentDate = new Date(getToday());

  for (const dateStr of sorted) {
    const completionDate = new Date(dateStr);
    const diffDays = Math.floor((currentDate - completionDate) / (1000 * 60 * 60 * 24));

    if (diffDays === streak) {
      streak++;
      currentDate = new Date(completionDate);
    } else {
      break;
    }
  }

  return streak;
}

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

function getProgress(habit) {
  const last7 = getLast7Days();
  const completed = last7.filter(day => habit.completions.includes(day)).length;
  return (completed / 7) * 100;
}

function isCompletedToday(habit) {
  return habit.completions.includes(getToday());
}

function updateDashboard() {
  const totalHabits = habits.length;
  const completedToday = habits.filter(h => isCompletedToday(h)).length;
  const avgStreak = habits.length > 0
    ? Math.round(habits.reduce((sum, h) => sum + getStreak(h), 0) / habits.length)
    : 0;

  document.getElementById('totalHabits').textContent = totalHabits;
  document.getElementById('completedToday').textContent = completedToday;
  document.getElementById('avgStreak').textContent = avgStreak;
}

function renderHabits() {
  const container = document.getElementById('habitsList');

  if (habits.length === 0) {
    container.innerHTML = '<p class="empty-state">✨ No habits yet. Add one to get started!</p>';
    updateDashboard();
    return;
  }

  container.innerHTML = habits.map(habit => {
    const streak = getStreak(habit);
    const progress = getProgress(habit);
    const completedToday = isCompletedToday(habit);
    const streakEmoji = streak > 14 ? '🌟' : streak > 7 ? '⭐' : '🔥';

    return `
      <div class="habit-card">
        <input
          type="checkbox"
          class="habit-checkbox"
          data-id="${habit.id}"
          ${completedToday ? 'checked' : ''}
        />
        <div class="habit-info">
          <div class="habit-name">${completedToday ? '✅' : '⭕'} ${habit.name}</div>
          <div class="habit-stats">
            <span class="streak">${streakEmoji} ${streak} day streak</span>
            <span class="progress-label">📊 7-day: ${Math.round(progress)}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <button class="habit-delete" data-id="${habit.id}">🗑️</button>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.habit-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      toggleToday(e.target.dataset.id);
      renderHabits();
    });
  });

  document.querySelectorAll('.habit-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      deleteHabit(e.target.dataset.id);
      renderHabits();
    });
  });

  updateDashboard();
}

function updateDateDisplay() {
  const today = getToday();
  const date = new Date(today);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('today').textContent = date.toLocaleDateString('en-US', options);
}

function init() {
  loadHabits();
  updateDateDisplay();
  renderHabits();

  document.getElementById('habitForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('habitInput');
    if (input.value.trim()) {
      addHabit(input.value);
      input.value = '';
      renderHabits();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
