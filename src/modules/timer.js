const timerClass = class {
  constructor() {
    this.startTime = null,
      this.endTime = null,
      this.sessionTime = 25,
      this.shortBreak = 5,
      this.longBreak = 30,
      this.isRunning = false,
      this.state = '',
      this.stateDuration = 0,
      this.completedSessions = 0,
      this.interval = null,
      this.oneSec = 1000,
      this.ui = null
  }

  //Handel first session start
  start() {
    if (this.state === '' && this.startTime === null) {
      this.state = 'Session';
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.sessionTime * 60) * this.oneSec);
      this.stateDuration = this.endTime - this.startTime;
      this.isRunning = true;
      this.ui.displayState(`${this.state === 'Session' ? `${this.state} #${this.completedSessions + 1}` : this.state }`);
      this.updateTime()
      this.ui.colorProgressBar(this.state);
      this.countDown();
    } else {
      this.pauseResume();
    }
  }

  //Handle new session start
  startSession() {
    if (this.state === 'Session') {
      this.ui.playSound(this.state);
      console.log('click');
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.sessionTime * 60) * this.oneSec);
      this.stateDuration = this.endTime - this.startTime;
      if (!this.isRunning) {
        this.isRunning = true;
      }
      this.ui.displayState(`${this.state === 'Session' ? `${this.state} #${this.completedSessions + 1}` : this.state }`);
      this.updateTime()
      this.ui.colorProgressBar(this.state);
      this.countDown();
    } else {
      return;
    }
  }

  //Main countdown function
  countDown() {
    if (this.isRunning) {
      if (this.startTime < this.endTime) {
        this.interval = setTimeout(() => {
          this.updateTime();
          this.countDown();
        }, this.oneSec);
      } else {
        console.log(`Finished`);
        if (this.state === 'Session') {
          this.completedSessions++;
          this.startBreak();
        } else {
          this.state = 'Session';
          this.startSession();
        }
      }
    }
  }

  //Pause/Resume function
  pauseResume() {
    if (this.isRunning) {
      this.isRunning = false;
      clearTimeout(this.interval);
      this.ui.displayState(`Pause`);
    } else {
      this.isRunning = true;
      this.ui.displayState(`${this.state === 'Session' ? `${this.state} #${this.completedSessions + 1}` : this.state }`);
      this.countDown();
    }
  }

  //Reset timer to initial state
  reset() {
    clearTimeout(this.interval);
    this.interval = null;
    this.startTime = null;
    this.endTime = null;
    this.isRunning = false;
    this.completedSessions = 0;
    this.state = '';
    console.log(`reseting`);
  }

  //Update remaining time, progress bar width and state 
  updateTime() {
    this.startTime = this.startTime + this.oneSec;
    const remainingTime = new Date();
    remainingTime.setTime(this.endTime - this.startTime);
    this.ui.displayTime(remainingTime);
    this.ui.animateProgressBar(((this.endTime - this.startTime) * 100) / this.stateDuration);
    this.ui.displayState(`${this.state === 'Session' ? `${this.state} #${this.completedSessions + 1}` : this.state }`);
  }

  //Handle breaks
  startBreak() {
    if (this.completedSessions % 4 !== 0) {
      this.state = 'Break';
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.shortBreak * 60) * this.oneSec);
      this.ui.colorProgressBar(this.state);
      this.ui.playSound(this.state);
    } else {
      this.state = 'Long Break';
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + ((this.longBreak * 60) * this.oneSec);
      this.ui.colorProgressBar(this.state);
      this.ui.playSound(this.state);
    }
    this.stateDuration = this.endTime - this.startTime;
    this.updateTime()
    this.countDown();

  }

}

export default timerClass;