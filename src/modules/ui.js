const uiClass = class {
  constructor(timer) {
    this.sessionTime = document.querySelector('#sessionTime'),
    this.shortBreak = document.querySelector('#shortBreakTime'),
    this.longBreak = document.querySelector('#longBreakTime'),
    this.progressBar = document.querySelector('.mani-bar'),
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
    this.timer.updateTime()
  }
  



}

export default uiClass;