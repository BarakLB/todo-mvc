'use strict'
var gTodos
var gFilterBy = 'ALL'
var gSortBy = 'TXT'
var gImportance = '1';
_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'ALL'){
        return gTodos
    }
    const todos = gTodos.filter(todo =>
        (todo.isDone && gFilterBy === 'DONE') ||
        (!todo.isDone && gFilterBy === 'ACTIVE'))
    return todos
}

function getSortedTodos() {
    if (gSortBy === 'TXT') {
        gTodos.sort((a, b) => {
            const txt1 = a.txt.toLowerCase()
            const txt2 = b.txt.toLowerCase()
            return (txt1 < txt2) ? -1 : (txt1 > txt2) ? 1 : 0;
        })
    }if(gSortBy === 'CREATED') {
        gTodos.sort((a,b) => {
            return parseFloat(a.createdAt) - parseFloat(b.createdAt)
        })
    }if(gSortBy === 'IMPORTANCE') {
        gTodos.sort((a,b) => {
            return b.importance - a.importance;
        })
    }

}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    const todos = gTodos.filter(todo => !todo.isDone)
    return todos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy
}
function setImportance(importance, idx) {
    var idx = gTodos.findIndex(todo => todo.id === idx);
    gTodos[idx].importance = +importance;
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function addTodo(txt) {
    if (!txt) return
    const todo = _createTodo(txt)
    gTodos.unshift(todo)
    _saveTodosToStorage()
}


// Those are "private" functions meant to be used ONLY by the service itself
function _createTodo(txt) {
    if (!txt) return
    const todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: gImportance,
    }
    return todo
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (!todos || todos.length === 0) {
        todos = [
            _createTodo('Learn JS'),
            _createTodo('Master CSS'),
            _createTodo('Study HTML'),
        ]
    }
    gTodos = todos
    _saveTodosToStorage()
}