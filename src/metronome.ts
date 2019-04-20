import { createBeeper } from './beeper.js'
import * as P from './pattern.js'
import { createPlayer } from './player.js'

export function createMetronome() {
	const beeper = createBeeper()

	function patternPlayer(p: P.Pattern) {
		return createPlayer(beeper, p)
	}

	function destroy() {
		return beeper.destroy()
	}

	return { patternPlayer, beeper, P, destroy }
}

export type Metronome = ReturnType<typeof createMetronome>
