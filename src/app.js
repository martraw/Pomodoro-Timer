import "./scss/main.scss";
import uiClass from './modules/ui';
import timerClass from './modules/timer';


class Pomodoro {
  
  addListeners() {
    ui.progressBarContainer.addEventListener('click', timer.start.bind(timer));
    ui.resetButton.addEventListener('click', timer.pauseResume.bind(timer));

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
      console.log(timer.sessionTime);
    } else {
      timer[timeValue]--;
      if (timer[timeValue] < 1) {
        timer[timeValue] = 1;
      }
      ui.updateUiElement(ui[timeValue], timer[timeValue])
      console.log(timer.sessionTime);
    }
  }

  init() {
    this.addListeners()
  }
}

const app = new Pomodoro();
const timer = new timerClass()
const ui = new uiClass()
app.init()