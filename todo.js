// To-Do List Application
// Store todos in localStorage for persistence

let todos = [];
let currentFilter = 'all';

// Load todos from localStorage on page load
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Add a new todo item
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    input.value = '';
    saveTodos();
    updateStats();
}

// Toggle completion status of a todo
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        updateStats();
    }
}

// Delete a todo item
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        updateStats();
    }
}

// Filter todos based on current filter
function filterTodos(filter) {
    currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`filter-${filter}`).classList.add('active');
    
    renderTodos();
}

// Get filtered todos
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

// Render todos to the DOM
function renderTodos() {
    const todoList = document.getElementById('todoList');
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        const emptyMessage = currentFilter === 'all' 
            ? 'No tasks yet. Add one above!' 
            : currentFilter === 'active' 
            ? 'No active tasks!' 
            : 'No completed tasks!';
        todoList.innerHTML = `<li class="empty-state">${emptyMessage}</li>`;
        return;
    }
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="todo-delete" onclick="deleteTodo(${todo.id})">Delete</button>
        </li>
    `).join('');
}

// Update statistics
function updateStats() {
    const totalTodos = todos.length;
    const activeTodos = todos.filter(t => !t.completed).length;
    const completedTodos = todos.filter(t => t.completed).length;
    
    let countText = '';
    if (totalTodos === 0) {
        countText = '0 tasks';
    } else if (activeTodos === 0) {
        countText = `All ${totalTodos} task${totalTodos !== 1 ? 's' : ''} completed!`;
    } else {
        countText = `${activeTodos} of ${totalTodos} task${totalTodos !== 1 ? 's' : ''} remaining`;
    }
    
    document.getElementById('todoCount').textContent = countText;
}

// Clear all completed todos
function clearCompleted() {
    const completedCount = todos.filter(t => t.completed).length;
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${completedCount} completed task${completedCount !== 1 ? 's' : ''}?`)) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        updateStats();
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow adding todos with Enter key
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('todoInput');
    if (input) {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTodo();
            }
        });
    }
    
    // Load todos when page loads
    loadTodos();
    updateStats();
});

