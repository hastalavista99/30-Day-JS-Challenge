// Exercises: Day 30: Final Project - Personal Dashboard Application
// Combine everything you've learned to build a personal dashboard:
// • Weather widget using API integration
// • Task manager with localStorage persistence
// • Notes section with rich text editing
// • Custom UI components and responsive design
// • State management for application data
// • Error handling and offline support

// Weather Widget
fetch("https://api.open-meteo.com/v1/forecast?latitude=1.2921&longitude=36.8219&current_weather=true")
    .then(res => res.json())
    .then(data => {
        const weatherDiv = document.getElementById("weather");
        const weather = data.current_weather;
        weatherDiv.textContent = `Temp: ${weather.temperature}°C, Wind: ${weather.windspeed}km/h`;
    })
    .catch(() => {
        document.getElementById("weather").textContent = "Failed to load weather.";
    });

// Task Manager
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function renderTasks() {
    taskList.innerHTML = "";
    savedTasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.textContent = task;
        li.classList = "flex justify-between items-center p-1 border-b hover:bg-gray-50";
        const btn = document.createElement("button");
        btn.textContent = "×";
        btn.classList = "text-red-500 text-lg";
        btn.onclick = () => {
            savedTasks.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            renderTasks();
        };
        li.appendChild(btn);
        taskList.appendChild(li);
    });
}

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && taskInput.value.trim()) {
        savedTasks.push(taskInput.value.trim());
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        taskInput.value = "";
        renderTasks();
    }
});

renderTasks();

// Notes
const notesArea = document.getElementById("notes");
notesArea.value = localStorage.getItem("notes") || "";
notesArea.addEventListener("input", () => {
    localStorage.setItem("notes", notesArea.value);
});