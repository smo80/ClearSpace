// public/focus.js

let focusMinutes = 25;
let meditationMinutes = 5;
let seconds = 0;
let timer;

// Update Timer Display
function updateTimerDisplay(minutes, seconds) {
  const display = document.getElementById('timer-display');
  display.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start Focus Timer
function startFocusTimer() {
  clearInterval(timer);
  const durationInput = document.getElementById('focus-duration').value;
  focusMinutes = durationInput ? parseInt(durationInput) : 25;
  let minutes = focusMinutes;
  seconds = 0;
  updateTimerDisplay(minutes, seconds);
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        startMeditationTimer();
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    updateTimerDisplay(minutes, seconds);
  }, 1000);
}

function startMeditationTimer() {
  alert("Time for a break!");
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div class="meditation-session">
      <h2>Meditation Session</h2>
      <video id="meditation-video" width="600" controls autoplay>
        <source src="meditation.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
  const video = document.getElementById('meditation-video');
  video.onended = () => {
    // Reload the page after video ends
    window.location.reload();
  };
}

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// Write a review functionality
const writeReviewBtn = document.getElementById('write-review-btn');
writeReviewBtn.addEventListener('click', () => {
  const review = prompt('Please write your review:');
  if (review) {
    // Handle the review (e.g., send to server or store locally)
    console.log('User review:', review);
    alert('Thank you for your review!');
  }
});

// Reset Timer
function resetFocusTimer() {
  clearInterval(timer);
  updateTimerDisplay(focusMinutes, 0);
}

// Task Management
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  if (taskText) {
    const tasks = document.getElementById('tasks');
    const li = document.createElement('li');
    li.innerText = taskText;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => li.remove();
    li.appendChild(deleteBtn);
    tasks.appendChild(li);
    taskInput.value = "";
  }
}

// Distraction Blocker
function addWebsite() {
  const websiteInput = document.getElementById('website-input');
  const website = websiteInput.value.trim();
  if (website) {
    fetch('/api/blocked-websites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ website })
    }).then(() => {
      updateBlockedWebsites();
      websiteInput.value = "";
      window.postMessage({ type: 'websiteAdded' }, '*');
    });
  }
}

function updateBlockedWebsites() {
  fetch('/api/blocked-websites')
    .then(response => response.json())
    .then(data => {
      const websitesList = document.getElementById('websites');
      websitesList.innerHTML = '';
      data.blockedWebsites.forEach(site => {
        const li = document.createElement('li');
        li.innerText = site;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => removeWebsite(site);
        li.appendChild(deleteBtn);
        websitesList.appendChild(li);
      });
    });
}

function removeWebsite(website) {
  fetch('/api/blocked-websites', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ website })
  }).then(() => {
    updateBlockedWebsites();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateBlockedWebsites();
});

