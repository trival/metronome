import { Metronome } from './metronome.js'
import { Pattern } from './pattern.js'
import { Player } from './player.js'

interface Controls extends HTMLFormControlsCollection {
	accelerating: RadioNodeList
	beats: HTMLInputElement
	bpm: HTMLInputElement
	'bpm-step': HTMLInputElement
	looping: HTMLInputElement
	'max-bpm': HTMLInputElement
	repetitions: HTMLInputElement
}

interface State {
	player: Player
}

export function createUI(metronome: Metronome) {
	// === DOM elemnts ===

	const form: HTMLFormElement = (document.forms as any).controls
	const controls = form.elements as Controls
	console.log(controls)

	form.onsubmit = e => e.preventDefault()

	// === State ===

	const state = {} as State

	// === init controls ===

	function onInputChange() {
		const accelerating = controls.accelerating.value === 'true' ? true : false
		const looping = controls.looping.checked
		const beats = Number(controls.beats.value)
		const bpm = Number(controls.bpm.value)
		const bpmStep = Number(controls['bpm-step'].value)
		const maxBpm = Number(controls['max-bpm'].value)
		const repetitions = Number(controls.repetitions.value)

		const pattern = accelerating
			? metronome.P.acceleratingTrainingSequenses(
					beats,
					bpm,
					bpmStep,
					maxBpm,
					repetitions,
			  )
			: metronome.P.sequence(beats, bpm)

		let playing = false
		if (state.player) {
			playing = state.player.state.playing
			state.player.stop()
		}
		state.player = metronome.patternPlayer(pattern)
		state.player.setLooping(looping)
		if (playing) {
			state.player.play()
		}
	}

	// tslint:disable-next-line:prefer-for-of
	for (let i = 0; i < controls.length; i++) {
		;(controls[i] as any).onchange = onInputChange
	}

	onInputChange()

	// === init player ===

	const play = document.getElementById('play')
	const stop = document.getElementById('stop')
	const reset = document.getElementById('reset')

	play.onclick = () => state.player.play()
	stop.onclick = () => state.player.stop()
	reset.onclick = () => state.player.reset()
}
