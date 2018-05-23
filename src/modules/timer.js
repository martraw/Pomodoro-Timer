const timerClass = class {
  constructor() {
    this.startTime = null,
      this.endTime = null,
      this.sessionTime = 5,
      this.shortBreak = 5,
      this.longBreak = 20,
      this.isRunning = false,
      this.completedSessions = 0,
      this.interval = null,
      this.oneSec = 1000,
      this.ui = null
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
          this.updateTime()
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
    this.startTime = this.startTime + this.oneSec;
    
    const remainingTime = new Date();
    remainingTime.setTime(this.endTime - this.startTime);
   this.ui.displayTime(remainingTime)
    console.log(this);
  }

}

export default timerClass;