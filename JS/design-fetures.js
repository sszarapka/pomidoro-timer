'use strict'

import { DOM } from './DOM-elements.js'

export const setTabLine = function (e, el = false) {
    let element
    el ? (element = el) : (element = e.target)

    if (element.classList.contains('display__tabs')) return

    const w = element.getBoundingClientRect().width
    const l = element.getBoundingClientRect().left
    const t =
        element.getBoundingClientRect().top +
        element.getBoundingClientRect().height

    DOM.line.style.width = w + 'px'
    DOM.line.style.left = l + 'px'
    DOM.line.style.top = t + 'px'
}

DOM.startStop.addEventListener('mousedown', () =>
    DOM.startStop.classList.toggle('display__start-stop--active')
)
DOM.startStop.addEventListener('mouseup', () =>
    DOM.startStop.classList.toggle('display__start-stop--active')
)

setTabLine(null, DOM.pomodoro)
DOM.tabs.addEventListener('click', setTabLine)
