const timerClass = class {
  constructor() {
    this.startTime = null,
      this.endTime = null,
      this.sessionTime = 1,
      this.shortBreak = 2,
      this.longBreak = 3,
      this.isRunning = false,
      this.state = 'session',
      this.completedSessions = 0,
      this.interval = null,
      this.oneSec = 1000,
      this.ui = null
  }

  start() {
    if (this.state === 'session') {
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
          this.updateTime();
          this.countDown();
        }, 100) //this.oneSec)
      } else {
        console.log(`Finished`);
        if (this.state === 'session') {
          this.completedSessions++;
          this.state = 'break'
          this.startBreak();
        } else {
          this.state = 'session';
          this.start()
        }
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
    this.startTime = this.startTime + this.oneSec;

    const remainingTime = new Date();
    remainingTime.setTime(this.endTime - this.startTime);
    this.ui.displayTime(remainingTime)
    console.log(this);
  }

  startBreak() {
    if (this.completedSessions % 4 !== 0) {
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.shortBreak * 60) * this.oneSec);
    } else {
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.longBreak * 60) * this.oneSec);
    }
    this.countDown()

  }

}

export default timerClass;