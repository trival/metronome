export interface Beat {
	beat: 'H' | 'L'
	bpm: number
}

export type Pattern = Beat[]

export function beat(bpm: number, beat: 'L' | 'H' = 'L'): Beat {
	return {
		beat,
		bpm,
	}
}

export function repeat(times: number, pattern: Pattern | Beat) {
	let p: Pattern = []
	for (let i = 0; i < times; i++) {
		p = p.concat(pattern)
	}
	return p
}

export function sequence(length: number, bpm: number) {
	const p = repeat(length - 1, beat(bpm))
	p.unshift(beat(bpm, 'H'))
	return p
}

export function subdivide(pattern: Pattern, n: number = 2) {
	return pattern.reduce(
		(p, b) => {
			return p.concat(repeat(n, beat(b.bpm * n, b.beat)))
		},
		[] as Pattern,
	)
}

export function introPattern(length: number, bpm: number, subdivideCount = 2) {
	const b = beat(bpm, 'H')
	return repeat(Math.max(length - 2, 0), b)
		.concat(subdivide([b], subdivideCount))
		.concat([b])
}

export function trainingSection(
	beats: number,
	bpm: number,
	repetitions: number,
	subdivideCount = 2,
) {
	return introPattern(beats, bpm, subdivideCount)
		.concat(repeat(repetitions, sequence(beats, bpm)))
		.concat(beat(bpm / beats, 'H'))
}

export function escalationTrainingSequenses(
	beats: number,
	startBpm: number,
	bpmStep: number,
	maxBpm: number,
	repetitions: number,
	subdivideCount = 2,
) {
	let p: Pattern = []
	for (; startBpm <= maxBpm; startBpm += bpmStep) {
		p = p.concat(trainingSection(beats, startBpm, repetitions, subdivideCount))
	}
	return p
}
