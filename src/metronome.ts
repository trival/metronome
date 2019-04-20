import { createBeeper } from './beeper.js'
import { createPlayer } from './player.js'
import * as P from './pattern.js'

export function createMetronome() {
	const beeper = createBeeper()

	function patternPlayer(p: P.Pattern) {
		return createPlayer(beeper, p)
	}

	return { patternPlayer, beeper, P }
}

export type Metronome = ReturnType<typeof createMetronome>
