import { Beeper } from './beeper.js'
import { Pattern } from './pattern.js'

export function createPlayer(beeper: Beeper, pattern: Pattern) {
	const beats = pattern.map(b => ({
		play: b.type === 'H' ? beeper.beepHigh : beeper.beepLow,
		time: (60 / b.bpm) * 1000,
	}))

	const state = {
		currentBeat: 0,
		playing: false,
		looping: false,
	}

	function play() {
		const beat = beats[state.currentBeat]
		if (beat) {
			state.playing = true
			beat.play()
			state.currentBeat++
			setTimeout(() => {
				state.playing && play()
			}, beat.time)
		} else {
			reset()
			state.looping ? play() : stop()
		}
	}

	function stop() {
		state.playing = false
	}

	function setBeat(n: number) {
		state.currentBeat = n
	}

	function reset() {
		setBeat(0)
	}

	function setLooping(l = true) {
		state.looping = l
	}

	return {
		play,
		stop,
		setBeat,
		reset,
		setLooping,
		state,
	}
}

export type Player = ReturnType<typeof createPlayer>
