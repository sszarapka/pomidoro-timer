'use strict'

import { DOM } from './DOM-elements.js'
import { Stoper } from './stoper.js'
import { Settings } from './settings.js'
import { Tasks } from './tasks.js'

class App {
    constructor() {
        this.stoper = new Stoper()
        this.settings = new Settings()
        this.tasks = new Tasks()

        DOM.darkMode.addEventListener('click', this._applySettings.bind(this))
        //DOM.sound.addEventListener('click', this._applySettings.bind(this))
        DOM.soundMenu.addEventListener('click', this._applySettings.bind(this))
        DOM.soundVolume.addEventListener(
            'input',
            this._applySettings.bind(this)
        )
        DOM.autoStart.addEventListener('click', this._applySettings.bind(this))
    }
    _applySettings() {
        if (this.settings.set.autostart) this.stoper.enableAutoStart()
        else this.stoper.disableAutoStart()

        this.stoper.setSound(this.settings.set.sound)
        this.stoper.setSoundVolume(this.settings.set.volume / 100)
    }
}

const app = new App()
