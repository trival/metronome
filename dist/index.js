import { createMetronome } from './metronome.js';
import { createUI } from './ui.js';
const metronome = createMetronome();
window.metronome = metronome;
createUI(metronome);
