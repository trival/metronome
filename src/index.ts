import { createMetronome } from './metronome.js'
import { createUI } from './ui.js'

const metronome = createMetronome()
;(window as any).metronome = metronome

createUI(metronome)
