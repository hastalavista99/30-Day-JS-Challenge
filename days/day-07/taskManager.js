// Exercise: Project - Task Manager Library

class TaskManager {
  constructor(storageKey = 'taskManagerTasks') {
    this.storageKey = storageKey;
    this.tasks = this.loadTasks();
  }

  generateId() {
    return Date.now().toString();
  }

  loadTasks() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveTasks() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  createTask({ title, description = '', dueDate = null }) {
    const task = {
      id: this.generateId(),
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.push(task);
    this.saveTasks();
    return task;
  }

  readTasks(filterFn = () => true, sortFn = null) {
    let result = this.tasks.filter(filterFn);
    if (sortFn) result.sort(sortFn);
    return result;
  }

  updateTask(id, updates) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
      this.saveTasks();
      return task;
    }
    return null;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    return {
      total,
      completed,
      pending: total - completed,
      completionRate: total ? Math.round((completed / total) * 100) : 0
    };
  }

  clearAllTasks() {
    this.tasks = [];
    this.saveTasks();
  }
}
