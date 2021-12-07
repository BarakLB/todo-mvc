'use strict'

function onInit() {
    renderTodos()
}

function renderTodos() {
    getSortedTodos()
    const todos = getTodosForDisplay();
    const strHTMLs = todos.map(todo => {
        const className = (todo.isDone) ? 'done' : ''
        const strHTML = `<li class="${className}" onclick="onToggleTodo(this, '${todo.id}')">
        <span>${todo.txt}</span>
        <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>`

        return strHTML
    })
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.todo-total-count').innerText = getTotalCount()
    document.querySelector('.todo-active-count').innerText = getActiveCount()
}

function onRemoveTodo(ev, todoId) {
    if (window.confirm('You really want to delete it?')) {
        ev.stopPropagation()
        console.log('Removing..', todoId);
        removeTodo(todoId)
        renderTodos()
    } else ev.stopPropagation()
}

function onToggleTodo(elTodo, todoId) {
    console.log('Toggling..', todoId);
    toggleTodo(todoId)
    // elTodo.classList.toggle('done') // but also need to re-render stat
    renderTodos()
}

function onAddTodo() {
    const elInput = document.querySelector('input');
    if (!elInput.value) return
    console.log('Adding Todo', elInput.value);
    addTodo(elInput.value)
    elInput.value = ''
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering By', filterBy);
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(sortBy) {
    console.log('Sorting By', sortBy);
    setSort(sortBy)
    getSortedTodos()
    renderTodos()

}