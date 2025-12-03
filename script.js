const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const themeBtn = document.getElementById("themeBtn");

// ======================
// Load Data from LocalStorage
// ======================
let pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
let theme = localStorage.getItem("theme") || "light";

function saveData() {
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// ======================
// Theme Handling
// ======================
function applyTheme() {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "☀ Light Mode";
    } else {
        document.body.classList.remove("dark-mode");
        themeBtn.textContent = "🌙 Dark Mode";
    }
}

themeBtn.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme);
    applyTheme();
});

// Apply theme on load
applyTheme();

// ======================
// Render Tasks
// ======================
function renderTasks() {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    pendingTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task}
            <div>
                <button class="complete-btn" onclick="markCompleted(${index})">✔</button>
                <button class="delete-btn" onclick="deletePending(${index})">❌</button>
            </div>
        `;
        pendingList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task}
            <div>
                <button class="undo-btn" onclick="undoTask(${index})">↩</button>
                <button class="delete-btn" onclick="deleteCompleted(${index})">❌</button>
            </div>
        `;
        completedList.appendChild(li);
    });
}

function addTask() {
    const task = input.value.trim();
    if (task === "") return;

    pendingTasks.push(task);
    saveData();
    input.value = "";
    renderTasks();
}

function markCompleted(index) {
    completedTasks.push(pendingTasks[index]);
    pendingTasks.splice(index, 1);
    saveData();
    renderTasks();
}

function undoTask(index) {
    pendingTasks.push(completedTasks[index]);
    completedTasks.splice(index, 1);
    saveData();
    renderTasks();
}

function deletePending(index) {
    pendingTasks.splice(index, 1);
    saveData();
    renderTasks();
}

function deleteCompleted(index) {
    completedTasks.splice(index, 1);
    saveData();
    renderTasks();
}

addBtn.addEventListener("click", addTask);

renderTasks();
