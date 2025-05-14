// Exercise: Create a countdown timer with pause/resume functionality

function createCountdown(seconds, onTick, onComplete) {
  let remaining = seconds;
  let intervalId = null;

  function tick() {
    if (remaining <= 0) {
      clearInterval(intervalId);
      onComplete?.();
    } else {
      onTick?.(remaining);
      remaining--;
    }
  }

  return {
    start() {
      if (!intervalId) intervalId = setInterval(tick, 1000);
    },
    pause() {
      clearInterval(intervalId);
      intervalId = null;
    },
    reset(newSeconds = seconds) {
      remaining = newSeconds;
      this.pause();
    }
  };
}

// Example
const timer = createCountdown(10, sec => console.log(sec), () => console.log('Done!'));
timer.start();
// You can call timer.pause() and timer.reset()
