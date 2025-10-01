document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const addBtn = document.getElementById("addBtn");
  const clearBtn = document.getElementById("clearBtn");

  // Load saved tasks from localStorage
  loadTasks();

  function addTask(text, completed = false) {
    if (!text || text.trim() === "") return;

    const li = document.createElement("li");
    li.textContent = text;

    if (completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
    saveTasks();
  }

  function clearCompleted() {
    document.querySelectorAll("li.completed").forEach(li => li.remove());
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      tasks.push({
        text: li.textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      JSON.parse(saved).forEach(task => addTask(task.text, task.completed));
    }
  }

  addBtn.addEventListener("click", () => {
    addTask(taskInput.value);
    taskInput.value = "";
  });

  clearBtn.addEventListener("click", clearCompleted);

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask(taskInput.value);
      taskInput.value = "";
    }
  });
});
