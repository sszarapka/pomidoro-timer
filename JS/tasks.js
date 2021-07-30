import { DOM } from './DOM-elements.js'

export class Tasks {
    constructor() {
        this.tasks = []
        this.currentId
        DOM.addTask.addEventListener('click', this._showForm.bind(this))
        DOM.saveForm.addEventListener('click', this._saveTask.bind(this))
        DOM.cancelForm.addEventListener('click', this._deleteTask.bind(this))
        DOM.tasks.addEventListener('click', this._editTask.bind(this))
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
        let exists = false
        let taskToEdit = {}
        let task = {
            name: '',
            pomodoros: 1,
            id: Math.floor(Math.random() * 1000000),
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
            console.log(task1.id)

            if (task1.id == this.currentId) {
                taskToEdit = task1
                exists = true
            }
        })
        if (exists === true) {
            taskToEdit.name = DOM.taskNameForm.value
            taskToEdit.pomodoros = parseInt(DOM.estPomodorosForm.value)
        } else this.tasks.push(task)
        //console.log(this.tasks)
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
                <div class="tasks__item" data-id="${task.id}" data-done="${
                task.done
            }">
                   
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

        console.log(this.tasks)
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
}
