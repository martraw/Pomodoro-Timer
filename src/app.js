import "./scss/main.scss";
import uiClass from './modules/ui';
import timerClass from './modules/timer';

(function () {
  class Pomodoro {

    addListeners() {
      ui.progressBarContainer.addEventListener('click', this.start);

      document.querySelector('#sessionTimeAdd').addEventListener('click', (e) => this.changeTimeValue(e, 'sessionTime'));
      document.querySelector('#sessionTimeSub').addEventListener('click', (e) => this.changeTimeValue(e, 'sessionTime'));

      document.querySelector('#shortBreakTimeAdd').addEventListener('click', (e) => this.changeTimeValue(e, 'shortBreak'));
      document.querySelector('#shortBreakTimeSub').addEventListener('click', (e) => this.changeTimeValue(e, 'shortBreak'));

      document.querySelector('#longBreakTimeAdd').addEventListener('click', (e) => this.changeTimeValue(e, 'longBreak'));
      document.querySelector('#longBreakTimeSub').addEventListener('click', (e) => this.changeTimeValue(e, 'longBreak'));

      ui.resetButton.addEventListener('click', this.reset);

      ui.descriptionQuestion.addEventListener('click', this.showDescription);
    }
    //Handle change of the appropriate time value (Sesion/Break/Long Break) on click at +/- element
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
    //Start pomodoro on click at progress bar
    start() {
      timer.start();
    }

    //Pause/Resume countdown on click at progress bar
    pauseResume() {
      this.pauseResume().bind(timer);
    }

    //Reset 
    reset() {
      timer.reset();
      ui.progressBarTime.textContent = `Click here to Start/Pause`;
      ui.animateProgressBar(100);
      ui.displayState('Do it. NOW!!!');
      ui.colorProgressBar('Session');
    }

    //Show and hide Pomodoro technique description block
    showDescription() {
      ui.toggleDescription();
    }

    //Initialise event listeners and set default values
    init() {
      this.addListeners();
      ui.progressBarTime.textContent = `Click here to Start/Pause`;
      ui.sessionTime.textContent = timer.sessionTime;
      ui.shortBreak.textContent = timer.shortBreak;
      ui.longBreak.textContent = timer.longBreak;
    }
  }

  //Instantiate objects
  const ui = new uiClass();
  const timer = new timerClass();
  const app = new Pomodoro();
  ui.app = app;
  ui.timer = timer;
  timer.ui = ui;
  timer.app = app;

  app.init();
})();