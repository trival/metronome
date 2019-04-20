const RAMP_VALUE = 0.000001
const RAMP_DURATION = 0.5

const FREQ_HIGH = 880
const FREQ_LOW = 440 + 440 * (1 / 2)

export function createBeeper() {
	// === initialization ===

	const ctx = new AudioContext()

	// === methods ===

	function destroy() {
		return ctx.close()
	}

	function beep({ frequency = 440 } = {}) {
		const currentTime = ctx.currentTime

		const osc = ctx.createOscillator()
		osc.type = 'sine'
		osc.frequency.value = frequency

		const gain = ctx.createGain()
		gain.connect(ctx.destination)

		gain.gain.setValueAtTime(gain.gain.value, currentTime)
		gain.gain.exponentialRampToValueAtTime(
			RAMP_VALUE,
			currentTime + RAMP_DURATION,
		)

		osc.connect(gain)
		osc.onended = () => {
			gain.disconnect(ctx.destination)
			osc.disconnect(gain)
		}

		osc.start(currentTime)
		osc.stop(currentTime + RAMP_DURATION)
	}

	// === exports ===

	return {
		destroy,
		beepHigh: () => beep({ frequency: FREQ_HIGH }),
		beepLow: () => beep({ frequency: FREQ_LOW }),
	}
}

export type Beeper = ReturnType<typeof createBeeper>
