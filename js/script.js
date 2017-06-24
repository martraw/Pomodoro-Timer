$(function(){
    // Time settings
    let sessionTime = 25,
        shortBreakTime = 5,
        longBreakTime = 15,
        isTimeRunning = false,
        completedSessions = 0,
        _60sec = 60;

    let session = $("#sessionTime"),
        shortBreak = $("#shortBreakTime"),
        longBreak = $("#longBreakTime");


    //Time settings display
    session.text(sessionTime);
    shortBreak.text(shortBreakTime);
    longBreak.text(longBreakTime);

    //Session time add and substract buttons functionality
    $("#sessionTimeAdd").on("click", () => {
        sessionTime++;
        session.text(sessionTime);
    })

    $("#sessionTimeSub").on("click", () => {
        sessionTime--;
        if (sessionTime < 1) {
            sessionTime = 1;
        }
        session.text(sessionTime);
    })

    //Short break time add and substract buttons functionality
    $("#shortBreakTimeAdd").on("click", () => {
        shortBreakTime++;
        shortBreak.text(shortBreakTime);
    })

    $("#shortBreakTimeSub").on("click", () => {
        shortBreakTime--;
        if (shortBreakTime < 1) {
            shortBreakTime = 1;
        }
        shortBreak.text(shortBreakTime);
    })

    //Long break time add and substract buttons functionality
    $("#longBreakTimeAdd").on("click", () => {
        longBreakTime++;
        longBreak.text(longBreakTime);
    })

    $("#longBreakTimeSub").on("click", () => {
        longBreakTime--;
        if (longBreakTime < 1) {
            longBreakTime = 1;
        }
        longBreak.text(longBreakTime);
    })



})//Koniec
