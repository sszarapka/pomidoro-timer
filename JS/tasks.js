import { DOM } from './DOM-elements.js'
import { v4 as uuidv4 } from 'uuid'

export class Tasks {
    constructor() {
        this.tasks = []
        this.currentId
        DOM.addTask.addEventListener('click', this._showForm.bind(this))
        DOM.saveForm.addEventListener('click', this._saveTask.bind(this))
        DOM.cancelForm.addEventListener('click', this._deleteTask.bind(this))
        DOM.tasks.addEventListener('click', this._editTask.bind(this))
        window.addEventListener('load', this._getLocalStorage.bind(this))
        this._dragging()
    }
    _showForm() {
        DOM.form.style.display = 'flex'
        if (!DOM.estPomodorosForm.value) DOM.estPomodorosForm.value = '1'
    }
    _hideForm() {
        DOM.estPomodorosForm.value = '1'
        DOM.taskNameForm.value = ''
        DOM.form.style.display = 'none'
    }
    _saveTask() {
        console.log(uuidv4())

        let exists = false
        let taskToEdit = {}
        let task = {
            name: '',
            pomodoros: 1,
            //id: Math.floor(Math.random() * 1000000),
            id: uuidv4(),
            done: 0,
        }

        task.name = DOM.taskNameForm.value
        if (!DOM.estPomodorosForm.value) DOM.estPomodorosForm.value = '1'
        task.pomodoros = parseInt(DOM.estPomodorosForm.value)
        if (!DOM.taskNameForm.value) {
            alert('Pole zadania nie może być puste')
            return
        }

        this.tasks.forEach(task1 => {
            if (task1.id == this.currentId) {
                taskToEdit = task1
                exists = true
            }
        })
        if (exists === true) {
            taskToEdit.name = DOM.taskNameForm.value
            taskToEdit.pomodoros = parseInt(DOM.estPomodorosForm.value)
        } else this.tasks.push(task)

        DOM.estPomodorosForm.value = '1'
        DOM.taskNameForm.value = ''

        this._hideForm()
        this._renderTasks()
    }

    _renderTasks() {
        let html = ''
        this.tasks.forEach(task => {
            const name = task.name
            const pomodoros = task.pomodoros
            let element = document.createElement('div')

            html += `
                <div class="tasks__item draggable" data-id="${
                    task.id
                }" data-done="${task.done}" draggable="true">
                   
                    <div class="tasks-container-1">
                        
                                ${
                                    task.done
                                        ? '<i class="fas fa-check-square"></i>'
                                        : '<i class="far fa-square"></i>'
                                }
                                 
                        
                        <p class="tasks__name">${name}</p>
                    </div>
                    <div class="tasks-container-2">
                        <div class="tasks__pomodoros-number">0/${pomodoros}</div>
                        <i class="fas fa-edit"></i>
                    </div>
                </div>
            `
        })
        DOM.tasks.innerHTML = html

        const squaresUnchecked = document.querySelectorAll('.far.fa-square')

        squaresUnchecked.forEach(square =>
            square.addEventListener('click', this._done.bind(this))
        )
        const squaresChecked = document.querySelectorAll('.fas.fa-check-square')
        squaresChecked.forEach(square =>
            square.addEventListener('click', this._unDone.bind(this))
        )
        this._setLocalStorage()
        this._dragging()
    }

    _editTask(e) {
        if (!e.target.classList.contains('fa-edit')) return
        this._showForm()
        const item = e.target.closest('.tasks__item')
        this.currentId = item.dataset.id
        const taskName = item.querySelector('.tasks__name').textContent
        const str = item.querySelector('.tasks__pomodoros-number').textContent
        const [r, pomodoros] = str.split('/')

        DOM.taskNameForm.value = taskName
        DOM.estPomodorosForm.value = parseInt(pomodoros)
        this._setLocalStorage()
    }

    _deleteTask(e) {
        this._hideForm()

        this.tasks.forEach(task1 => {
            if (task1.id == this.currentId) {
                const index = this.tasks.indexOf(task1)
                this.tasks.splice(index, 1)
            }
        })
        this._renderTasks()
    }

    _done(e) {
        const element = e.target.closest('.tasks__item')
        element.dataset.done = '1'
        e.target.classList = 'fas fa-check-square'
        const item = this.tasks.find(task => task.id == element.dataset.id)
        item.done = 1
        const squaresChecked = document.querySelectorAll('.fas.fa-check-square')
        squaresChecked.forEach(square =>
            square.addEventListener('click', this._unDone.bind(this))
        )
    }
    _unDone(e) {
        const element = e.target.closest('.tasks__item')
        element.dataset.done = ''
        e.target.classList = 'far fa-square'
        const item = this.tasks.find(task => task.id == element.dataset.id)
        item.done = 0
        const squaresUnchecked = document.querySelectorAll('.far.fa-square')

        squaresUnchecked.forEach(square =>
            square.addEventListener('click', this._done.bind(this))
        )
    }

    _dragging() {
        const draggables = document.querySelectorAll('.draggable')
        draggables.forEach(drag => {
            drag.addEventListener('dragstart', () => {
                drag.classList.add('dragging')
            })

            drag.addEventListener('dragend', () => {
                drag.classList.remove('dragging')
            })

            // MOBILE
            drag.addEventListener('touchstart', () => {
                drag.classList.add('dragging')
            })

            drag.addEventListener('touchend', () => {
                drag.classList.remove('dragging')
            })
        })

        DOM.tasks.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = this._getDrag(e.clientY)
            const draggable = document.querySelector('.dragging')

            if (afterElement == null) DOM.tasks.appendChild(draggable)
            else DOM.tasks.insertBefore(draggable, afterElement)

            this._getOrderFromHTML()
        })

        DOM.tasks.addEventListener('touchmove', e => {
            e.preventDefault()
            const afterElement = this._getDrag(e.touches[0].clientY)

            const draggable = document.querySelector('.dragging')
            if (afterElement == null) DOM.tasks.appendChild(draggable)
            else DOM.tasks.insertBefore(draggable, afterElement)

            this._getOrderFromHTML()
        })
    }

    _getDrag(y) {
        const draggableElements = [
            ...DOM.tasks.querySelectorAll('.draggable:not(.dragging)'),
        ]

        return draggableElements.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect()
                const offset = y - box.top - box.height / 2

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else {
                    return closest
                }
            },
            { offset: Number.NEGATIVE_INFINITY }
        ).element
    }

    _getOrderFromHTML() {
        const elements = document.querySelectorAll('.draggable')
        let newTaskOrder = []
        let IDs = []
        elements.forEach(element => {
            IDs.push(element.dataset.id)
        })

        IDs.forEach(id => {
            const element = this.tasks.find(task => id == task.id)
            newTaskOrder.push(element)
        })

        this.tasks = newTaskOrder
        this._setLocalStorage()
    }

    _setLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('tasks'))
        if (!data) return

        this.tasks = data
        this._renderTasks()
    }
}
