const timerClass = class {
  constructor(ui) {
    this.startTime = null,
      this.endTime = null,
      this.sessionTime = 1,
      this.shortBreak = 5,
      this.longBreak = 20,
      this.isRunning = false,
      this.completedSessions = 0,
      this.interval = null,
      this.oneSec = 100
  }

  start() {
    if (this.startTime === null && this.endTime === null) {
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.sessionTime * 60) * this.oneSec);
      if (!this.isRunning) {
        this.isRunning = true
      }
      this.countDown()
    } else {
      return
    }
  }

  countDown() {
    if (this.isRunning) {
      if (this.startTime < this.endTime) {
        this.interval = setTimeout(() => {
          console.log(`setTimeout: isRunning: ${this.isRunning} ${this.completedSessions} StartTime ${this.startTime} EndTime ${this.endTime} ${this.startTime < this.endTime ? 'true' : 'false'}`);
          this.startTime += this.oneSec
          this.completedSessions++;
          this.countDown();
        }, this.oneSec)
      } else {
        console.log(`Finished`);
      }
    } else {
      console.log(`Paused`);
    }

  }

  pauseResume() {
    if (this.isRunning) {
      this.isRunning = false;
      clearTimeout(this.interval);
      
    } else {
      this.isRunning = true;
      this.countDown();
    }
  }

  reset() {
    clearTimeout(this.interval);
    this.startTime = null;
    this.endTime = null
    this.isRunning = false;
    this.completedSessions = 0;
    console.log(`reseting`);
  }

  updateTime() {
    console.log('Weeeeeeee!');
  }
}

export default timerClass;