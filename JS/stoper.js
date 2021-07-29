'use strict'

import { DOM } from './DOM-elements.js'
import { setTabLine } from './design-fetures.js'
export class Stoper {
    constructor() {
        this.state = false
        this.time = 1500
        this.start
        this.pomodoro = true
        this.timeEnd = false
        this.mode = 'pomodoro'
        DOM.startStop.addEventListener('click', this._startStopTimer.bind(this))
        this._changeModes()
    }
    _startStopTimer() {
        // tick sound

        const timer = () => {
            this.time--
            this._displayTime(this.time)
            if (this.time === 0) this._timerEnd()
        }

        if (!this.state) {
            timer()
            this.start = setInterval(timer, 1000)
            DOM.startStop.textContent = 'STOP'
        } else {
            DOM.startStop.textContent = 'START!'
            clearInterval(this.start)
            // DOM.startStop.style.transition = '5s ease'
        }

        console.log(this.time)

        this.state = !this.state
    }

    _timerEnd() {
        //sound
        const audio = new Audio('../sounds/bell.mp3')
        //audio.play()
        //bgc
        if (!this.timeEnd) DOM.startStop.style.animation = 'red-blue 3s ease'
        if (this.timeEnd) DOM.startStop.style.animation = 'blue-red 3s ease'
        this._toggleBreakColorMode()

        this.pomodoro = !this.pomodoro
        clearInterval(this.start)
        if (this.pomodoro) {
            this.time = 1500
            setTabLine(null, DOM.pomodoro)
        } else {
            this.time = 300
            setTabLine(null, DOM.shortBreak)
        }
        this._displayTime(this.time)
        this.state = !this.state
        this.timeEnd = !this.timeEnd
    }

    _displayTime(time) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const minutesStr = String(minutes).padStart(2, '0')
        const secondsStr = String(seconds).padStart(2, '0')

        DOM.timer.textContent = `${minutesStr}:${secondsStr}`
    }

    _toggleBreakColorMode() {
        DOM.container.classList.toggle('blue')
        DOM.header.classList.toggle('blue')
        DOM.main.classList.toggle('blue')
        DOM.timer.classList.toggle('blue')
        DOM.startStop.classList.toggle('blue')
    }
    _shortBreakMode() {
        if (this.mode === 'short') {
            return
        }
        this.mode = 'short'

        this.time = 300
        this._displayTime(this.time)
        this._toggleBreakColorMode()
        DOM.startStop.style.animation = 'red-blue 3s ease'
    }
    _pomodoroMode() {
        if (this.mode === 'pomodoro') {
            return
        }
        this.mode = 'pomodoro'
        this.time = 1500
        this._displayTime(this.time)
        this._toggleBreakColorMode()
        DOM.startStop.style.animation = 'blue-red 3s ease'
    }
    _changeModes() {
        DOM.shortBreak.addEventListener(
            'click',
            this._shortBreakMode.bind(this)
        )
        DOM.pomodoro.addEventListener('click', this._pomodoroMode.bind(this))
    }
}
