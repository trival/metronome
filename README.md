# Metronome

Enables practicing drum patterns in accelerating speeds.

## Console usage

Load the index.html into your browser, then enter the console in your dev tools.
There you can do things like:

```javascript
let pattern = metronome.P.acceleratingTrainingSequense(4, 140, 20, 180, 4, 3)
let player = metronome.patternPlayer(pattern)
player.play()
```

you can generate different Patterns with the metronome.P utility functions.
