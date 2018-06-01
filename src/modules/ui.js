const uiClass = class {
  constructor() {
    this.sessionTime = document.querySelector('#sessionTime'),
    this.shortBreak = document.querySelector('#shortBreakTime'),
    this.longBreak = document.querySelector('#longBreakTime'),
    this.sessionStatus = document.querySelector('#status'),
    this.progressBar = document.querySelector('.main-bar'),
    this.progressBarContainer = document.querySelector('#progress-bar-container'),
    this.progressBarWidth = 100,
    this.progressBarTime = document.querySelector('#progress-bar-time'),
    this.descriptionQuestion = document.querySelector('#descriptionQuestion'),
    this.descriptionText = document.querySelector('.descriptionText'),
    this.resetButton = document.querySelector('.resetButton'),
    this.sound1 = new Audio('./sounds/timeForBreak.ogg'),
    this.sound2 = new Audio('./sounds/timeToWork.ogg'),
    this.sound3 = new Audio('./sounds/long_break.mp3')
    
  }
  //Update appropriate value in ui
  updateUiElement(element, value) {
    element.textContent = value;
  }
  
  //Display current time in ui
  displayTime(time) {
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    this.progressBarTime.textContent = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}`: seconds }`;
  }

  //Change progress bar width
  animateProgressBar(percentage) {
    this.progressBar.style.width = `${percentage}%`;
  }

  //Change progress bar color accordingly to current state
  colorProgressBar(state) {
    if (state === 'Session') {
      this.progressBar.style.backgroundColor = '#ffeb3b';
    } else if (state === 'Break') {
      this.progressBar.style.backgroundColor = '#89ff00';
    } else if (state === 'Long Break') {
      this.progressBar.style.backgroundColor = '#6ad3ff';
    }
  }

  //Dispaly current state in ui
  displayState(state) {
    this.sessionStatus.textContent = state;
  }

  //Play appropriate sound at state change
  playSound(state) {
    if (state === 'Session') {
      this.sound2.play();
    } else if (state === 'Break') {
      this.sound1.play();
    } else if (state === 'Long Break') {
      this.sound3.play();
    }
  }

  //Show and hide Pomodoro technique description block
  toggleDescription() {
    if (this.descriptionText.style.display === '' || this.descriptionText.style.display === 'none') {
      this.descriptionText.style.display = 'block';
    } else {
      this.descriptionText.style.display = 'none';
    }
  }
}

export default uiClass;