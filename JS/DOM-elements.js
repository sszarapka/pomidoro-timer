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
    }
}
export const DOM = new Elements()
