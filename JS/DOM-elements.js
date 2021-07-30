class Elements {
    constructor() {
        this.settingsBtn = document.querySelector('.header__settings')
        this.settingsWheelBtn = this.settingsBtn.querySelector('.fa-cog')
        this.tabs = document.querySelector('.display__tabs')
        this.pomodoro = document.querySelector('.pomodoro')
        this.shortBreak = document.querySelector('.short-break')
        this.line = document.querySelector('.display__tabs--line')
        this.startStop = document.querySelector('.display__start-stop')
        this.addTask = document.querySelector('.tasks__add')
        this.form = document.querySelector('.tasks__form')
        this.timer = document.querySelector('.display__timer')
        this.container = document.querySelector('.container-bg')
        this.header = document.querySelector('.header')
        this.main = document.querySelector('.main')
        this.settings = document.querySelector('.settings')
        this.settingsClose = document.querySelector('.fa-times')
        this.autoStart = document.querySelector('.auto-start__slider')
        this.darkMode = document.querySelector('.dark-mode__slider')
        this.sound = document.querySelector('.settings__sound')
        this.soundVolume = document.querySelector('.settings__sound-volume')
        this.soundMenu = document.querySelector('.sound__menu')
        this.soundSelect = document.querySelector('.sound__select')
        this.taskNameForm = document.querySelector('.form__taskName')
        this.estPomodorosForm = document.querySelector('.form__est-pomodoros')
        this.saveForm = document.querySelector('.form__save')
        this.cancelForm = document.querySelector('.form__cancel')
        this.tasks = document.querySelector('.tasks__list')
        this.notDone = document.querySelector('.far.fa-square')
        this.done = document.querySelector('.fas.fa-check-square')
    }
}
export const DOM = new Elements()
