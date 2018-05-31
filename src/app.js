import "./scss/main.scss";
import uiClass from './modules/ui';
import timerClass from './modules/timer';

(function () {
  class Pomodoro {
  
    addListeners() {
      document.querySelector('#progress-bar-container').addEventListener('click',  this.start);
      
      ui.resetButton.addEventListener('click', this.reset);
  
      document.querySelector('#sessionTimeAdd').addEventListener('click', (e) => this.changeTimeValue(e, 'sessionTime'));
      document.querySelector('#sessionTimeSub').addEventListener('click', (e) => this.changeTimeValue(e, 'sessionTime'));
  
      document.querySelector('#shortBreakTimeAdd').addEventListener('click', (e) => this.changeTimeValue(e, 'shortBreak'));
      document.querySelector('#shortBreakTimeSub').addEventListener('click', (e) => this.changeTimeValue(e, 'shortBreak'));
  
      document.querySelector('#longBreakTimeAdd').addEventListener('click', (e) => this.changeTimeValue(e, 'longBreak'));
      document.querySelector('#longBreakTimeSub').addEventListener('click', (e) => this.changeTimeValue(e, 'longBreak'));
    }
    //
    changeTimeValue(e, timeValue) {
      if (e.target.textContent === '+') {
        timer[timeValue]++;
        ui.updateUiElement(ui[timeValue], timer[timeValue])
        console.log(timer[timeValue]);
      } else {
        timer[timeValue]--;
        if (timer[timeValue] < 1) {
          timer[timeValue] = 1;
        }
        ui.updateUiElement(ui[timeValue], timer[timeValue])
        console.log(timer[timeValue]);
      }
    }

    start() {
       timer.start();
      }

    pauseResume() {
      this.pauseResume().bind(timer);
    }

    reset() {
      timer.reset();
      ui.progressBarTime.textContent = `Click here to Start/Pause`;
      ui.animateProgresBar(100);
      ui.displayStatus('Do it. NOW!!!')
    }

    init() {
      this.addListeners();
      ui.progressBarTime.textContent = `Click here to Start/Pause`;
    }
  }
  
  const ui = new uiClass();
  const timer = new timerClass();
  const app = new Pomodoro();
  ui.app = app;
  ui.timer = timer;
  timer.ui = ui;
  timer.app = app;

  app.init();
})();

