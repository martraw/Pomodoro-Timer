const timerClass = class {
  constructor() {
    this.startTime = null,
      this.endTime = null,
      this.sessionTime = 0.3,
      this.shortBreak = 0.5,
      this.longBreak = 1,
      this.isRunning = false,
      this.state = '',
      this.stateDuration = 0,
      this.completedSessions = 0,
      this.interval = null,
      this.oneSec = 1000,
      this.ui = null
  }

  start() {
    // console.log(`Strat 1 ${this.startTime} ${this.endTime} isRunning: ${this.isRunning} state: ${this.state} ${this.completedSessions}`);
    if (this.state === '' && this.startTime === null) {
      this.state = 'Session'
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.sessionTime * 60) * this.oneSec);
      this.stateDuration = this.endTime - this.startTime;
      this.isRunning = true
      console.log(`Strat 2 ${this.startTime} ${this.endTime} isRunning: ${this.isRunning} state: ${this.state} ${this.completedSessions}`);
      this.countDown()
     } else {

      this.pauseResume()
    }
  }

  startSession() {
    if (this.state === 'Session') {
      console.log('click');
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.sessionTime * 60) * this.oneSec);
      this.stateDuration = this.endTime - this.startTime;
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
        if (this.state === 'Session') {

          this.completedSessions++;
          // this.state = 'Break'
          console.log(`Countdown 1 ${this.startTime} ${this.endTime} isRunning: ${this.isRunning} state: ${this.state} ${this.completedSessions}`);
          this.startBreak();
        } else {
          this.state = 'Session';
          console.log(`Countdown 2 ${this.startTime} ${this.endTime} isRunning: ${this.isRunning} state: ${this.state} ${this.completedSessions}`);


          this.startSession()
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
      this.ui.displayStatus(`Pause`)
      console.log(`pauseResume 1 ${this.startTime} ${this.endTime} isRunning: ${this.isRunning} state: ${this.state} ${this.completedSessions}`);
    } else {

      this.isRunning = true;
      this.countDown();
      console.log(`pauseResume 2 ${this.startTime} ${this.endTime} isRunning: ${this.isRunning} state: ${this.state} ${this.completedSessions}`);
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
    this.ui.displayTime(remainingTime);
    this.ui.animateProgresBar(((this.endTime - this.startTime) * 100) / this.stateDuration);
    this.ui.displayStatus(`${this.state === 'Session' ? `${this.state} #${this.completedSessions + 1}` : this.state }`)
  }

  startBreak() {
    if (this.completedSessions % 4 !== 0) {
      this.state = 'Break'
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.shortBreak * 60) * this.oneSec);
    } else {
      this.state = 'Long Break'
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.longBreak * 60) * this.oneSec);
    }
    this.stateDuration = this.endTime - this.startTime;
    this.countDown()

  }

}

export default timerClass;