import { createBeeper } from "./beeper.js";
import { createPlayer } from "./player.js";
import * as P from "./pattern.js";
export function createMetronome() {
    const beeper = createBeeper();
    function patternPlayer(p) {
        return createPlayer(beeper, p);
    }
    return { patternPlayer, beeper, P };
}
