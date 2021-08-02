'use strict'

import { DOM } from './DOM-elements.js'

export class Settings {
    constructor() {
        DOM.settingsBtn.addEventListener('click', this._openSettings)
        DOM.settingsClose.addEventListener(
            'click',
            this._closeSettings.bind(this)
        )
        document.addEventListener('click', this._closeSettings.bind(this))
        DOM.autoStart.addEventListener(
            'click',
            this._toggleAutoStart.bind(this)
        )
        DOM.darkMode.addEventListener('click', this._toggleDarkMode.bind(this))
        DOM.sound.addEventListener('click', this._openSoundMenu.bind(this))
        DOM.soundMenu.addEventListener('click', this._selectSound.bind(this))
        DOM.soundVolume.addEventListener('input', this._changeVolume.bind(this))

        this.set = {
            autostart: false,
            darkMode: false,
            sound: '../sounds/sound1.mp3',
            volume: 50,
        }

        this.sound = new Audio(this.set.sound)
    }
    _openSettings() {
        // DOM.settings.style.opacity = '1'
        DOM.settings.style.display = 'flex'
    }
    _closeSettings(e) {
        if (!e.target.classList.contains('sound__select'))
            this._closeSoundMenu()
        if (e.target.classList.contains('close')) return

        // DOM.settings.style.opacity = '0'
        DOM.settings.style.display = 'none'
    }

    _toggleAutoStart() {
        DOM.autoStart.classList.toggle('slider--active')
        this.set.autostart = !this.set.autostart
        // console.log(this.set)
    }

    _toggleDarkMode() {
        DOM.darkMode.classList.toggle('slider--active')
        this.set.darkMode = !this.set.darkMode
        // console.log(this.set)
    }

    _openSoundMenu() {
        DOM.selectSoundArrow.style.transform = 'rotate(180deg)'
        DOM.soundMenu.style.display = 'block'
        DOM.soundSelect.classList.add('sound__select--active')
    }
    _closeSoundMenu() {
        DOM.selectSoundArrow.style.transform = 'rotate(0deg)'
        DOM.soundMenu.style.display = 'none'
        DOM.soundSelect.classList.remove('sound__select--active')
    }

    _selectSound(e) {
        this.set.sound = e.target.dataset.source
        this.sound.pause()
        this.sound = new Audio(this.set.sound)
        this.sound.volume = this.set.volume / 100
        this.sound.play()
        // console.log(this.set)
    }

    _changeVolume(e) {
        this.set.volume = parseInt(e.target.value)
        this.sound.volume = this.set.volume / 100
        this.sound.play()
    }
}
