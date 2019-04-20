export function beat(bpm, type = 'L') {
    return {
        type,
        bpm,
    };
}
export function repeat(times, pattern) {
    let p = [];
    for (let i = 0; i < times; i++) {
        p = p.concat(pattern);
    }
    return p;
}
export function sequence(beats, bpm) {
    const p = repeat(beats - 1, beat(bpm));
    p.unshift(beat(bpm, 'H'));
    return p;
}
export function subdivide(pattern, n = 2) {
    return pattern.reduce((p, b) => {
        return p.concat(repeat(n, beat(b.bpm * n, b.type)));
    }, []);
}
export function introPattern(beats, bpm, subdivideCount = 2) {
    const b = beat(bpm, 'H');
    return repeat(Math.max(beats - 2, 0), b)
        .concat(subdivide([b], subdivideCount))
        .concat(b);
}
export function trainingSection(beats, bpm, repetitions, subdivideCount = 2) {
    return introPattern(beats, bpm, subdivideCount)
        .concat(repeat(repetitions, sequence(beats, bpm)))
        .concat(beat(bpm / beats, 'H'));
}
export function acceleratingTrainingSequenses(beats, startBpm, bpmStep, maxBpm, repetitions, subdivideCount = 2) {
    let p = [];
    for (; startBpm <= maxBpm; startBpm += bpmStep) {
        p = p.concat(trainingSection(beats, startBpm, repetitions, subdivideCount));
    }
    return p;
}
