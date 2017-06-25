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
        longBreak = $("#longBreakTime"),
        progressBarTime = $("#progress-bar-time");


    //Time settings display
    session.text(sessionTime);
    shortBreak.text(shortBreakTime);
    longBreak.text(longBreakTime);
    progressBarTime.text(sessionTime + " : 00");

    //Session time add and substract buttons functionality

    $("#sessionTimeAdd").on("click", () => {
        $(session.text(sessionTime)).fadeOut(100, () => {
            sessionTime++;
            $(session.text(sessionTime)).fadeIn(100);
        });
    });

    // $("#sessionTimeAdd").on("click", () => {
    //     sessionTime++;
    //     session.text(sessionTime);
    //
    // })

    $("#sessionTimeSub").on("click", () => {
        $(session.text(sessionTime)).fadeOut(100, () => {
            sessionTime--;
            if (sessionTime < 1) {
                sessionTime = 1;
            }
            $(session.text(sessionTime)).fadeIn(100);
        });
    });

    // $("#sessionTimeSub").on("click", () => {
    //     sessionTime--;
    //     if (sessionTime < 1) {
    //         sessionTime = 1;
    //     }
    //     session.text(sessionTime);
    // })

    //Short break time add and substract buttons functionality
    $("#shortBreakTimeAdd").on("click", () => {
        $(shortBreak.text(shortBreakTime)).fadeOut(100, () => {
            shortBreakTime++;
            $(shortBreak.text(shortBreakTime)).fadeIn(100);
        });
    });

    $("#shortBreakTimeSub").on("click", () => {
        $(shortBreak.text(shortBreakTime)).fadeOut(100, () => {
            shortBreakTime--;
            if (shortBreakTime < 1) {
                shortBreakTime = 1;
            }
            $(shortBreak.text(shortBreakTime)).fadeIn(100);
        })
    })

    //Long break time add and substract buttons functionality
    $("#longBreakTimeAdd").on("click", () => {
        $(longBreak.text(longBreakTime)).fadeOut(100, () => {
            longBreakTime++;
            $(longBreak.text(longBreakTime)).fadeIn(100);
        })
    })

    $("#longBreakTimeSub").on("click", () => {
        $(longBreak.text(longBreakTime)).fadeOut(100, () => {
            longBreakTime--;
            if (longBreakTime < 1) {
                longBreakTime = 1;
            }
            $(longBreak.text(longBreakTime)).fadeIn(100);
        });
    });



})//Koniec
