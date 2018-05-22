const timerClass = class {
  constructor() {
    this.startTime = null,
    this.endTime = null,
    this.sessionTime = 1,
    this.shortBreak = 5,
    this.longBreak = 20,
    this.isRunning = false,
    this.completedSessions = 0,
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
      let interval
      if (this.startTime < this.endTime) {
        interval = setTimeout(() => {
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
      this.isRunning = false
    } else {
      this.isRunning = true
      this.countDown()
    }
  }

  updateTime() {

  }
}

export default timerClass;