const uiClass = class {
  constructor(timer) {
    this.sessionTime = document.querySelector('#sessionTime'),
    this.shortBreak = document.querySelector('#shortBreakTime'),
    this.longBreak = document.querySelector('#longBreakTime'),
    this.progressBar = document.querySelector('.main-bar'),
    this.progressBarContainer = document.querySelector('#progress-bar-container'),
    this.progressBarWidth = 100,
    this.progressBarTime = document.querySelector('#progress-bar-time'),
    this.descriptionQuestion = document.querySelector('#descriptionQuestion'),
    this.resetButton = document.querySelector('.resetButton'),
    this.sound1 = new Audio('./sounds/timeForBreak.ogg'),
    this.sound2 = new Audio('./sounds/timeToWork.ogg'),
    this.sound3 = new Audio('./sounds/long_break.mp3')
    
  }

  updateUiElement(element, value) {
    element.textContent = value
  }
  
  displayTime(time) {
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    this.progressBarTime.textContent = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}`: seconds }`
  }

  animateProgresBar(percentage) {
    this.progressBar.style.width = `${percentage}%`;
  }




}

export default uiClass;