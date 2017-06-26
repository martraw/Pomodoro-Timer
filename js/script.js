$(function(){
    // Time settings
    let sessionTime = 1,
        shortBreakTime = 2,
        longBreakTime = 15,
        started = false,
        isTimeRunning = false,
        resumed = false,
        isSession = true,
        completedSessions = 0,
        seconds = 60,
        mainInterval,
        tempMin,
        tempSec,
        tempBreakMin,
        tempBreakSec;

    // UI elements
    let session = $("#sessionTime"),
        shortBreak = $("#shortBreakTime"),
        longBreak = $("#longBreakTime"),
        progressBar = $(".main-bar"),
        progressBarWidth = 100,
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
            updateBarTime();
            $(session.text(sessionTime)).fadeIn(100);
        });
    });

    $("#sessionTimeSub").on("click", () => {
        $(session.text(sessionTime)).fadeOut(100, () => {
            sessionTime--;
            if (sessionTime < 1) {
                sessionTime = 1;
            }
            updateBarTime();
            $(session.text(sessionTime)).fadeIn(100);
        });
    });

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

    function updateBarTime(event){
        console.log(sessionTime);
        progressBarTime.text(sessionTime + " : 00");
    }

    progressBar.on("click", () => {
        startStop();
        // timer()
    } )

    function timer(){
        isTimeRunning = true;
        // let currentMin = sessionTime -1;
        // let totalSec = sessionTime * 60;
        let currentMin;
        let totalSec;

        if (resumed === false && isSession === true) {
            currentMin = sessionTime -1;
            totalSec = sessionTime * 60;
            tempMin = currentMin;
            tempSec = totalSec;
            // console.log("Pierwszy if: sessionTime", sessionTime + "; currentMin ", currentMin + "; totalSec ", totalSec + "; tempMin " + tempMin + "; tempSec ", tempSec + "; resumed = ", resumed);

        } else if (resumed === true && isSession === true) {
            currentMin = tempMin;
            totalSec = tempSec;
            // console.log("Pierwszy else if: sessionTime", sessionTime + "; currentMin ", currentMin + "; totalSec ", totalSec + "; tempMin " + tempMin + "; tempSec ", tempSec + "; resumed = ", resumed);

        }   else if (resumed === false && isSession === false) {
            currentMin = tempBreakMin;
            totalSec = tempBreakSec;
            console.log("Drugi else if: sessionTime",  sessionTime + "; currentMin ", currentMin + "; totalSec ", totalSec + "; tempMin " + tempMin + "; tempSec ", tempSec + "; tempBreakMin " + tempBreakMin + "; tempBreakSec ", tempBreakSec +  "; resumed = ", resumed);

        }  else if (resumed === true && isSession === false) {
            currentMin = tempBreakMin
            totalSec = tempBreakSec
            console.log("Trzeci else if: sessionTime", sessionTime + "; currentMin ", currentMin + "; totalSec ", totalSec + "; tempMin " + tempMin + "; tempSec ", tempSec + "; tempBreakMin " + tempBreakMin + "; tempBreakSec ", tempBreakSec +  "; resumed = ", resumed);
        }

        console.log("currentMin: ",currentMin);

        mainInterval = setInterval(() => {
            // console.log(progressBarWidth);

            progressBarWidth -= 100/totalSec;
            progressBar.css("width", progressBarWidth + "%");
            // console.log("Diałam");

            seconds -= 1;
            if (seconds < 0) {
                seconds = 59;
                // console.log("currentMin:  ",currentMin + " seconds", seconds);
                currentMin -= 1;
                if (tempMin > 0) {
                    tempMin -= 1;
                }
                if (tempBreakMin > 0) {
                    tempBreakMin -=1;
                }

                console.log("Minęła minuta: sessionTime", sessionTime + "; currentMin ", currentMin + "; totalSec ", totalSec + "; tempMin " + tempMin + "; tempSec ", tempSec + "; resumed = ", resumed);
                // console.log("1 tempMin ", tempMin );
            }

            // break
            if (isSession === true) {
                if (currentMin < 0) {
                    isSession = false;
                    resumed = false;
                    currentMin = shortBreakTime -1;
                    tempBreakMin = currentMin;
                    totalSec = shortBreakTime * 60;
                    tempBreakSec = totalSec
                    $("#status").text("BREAK");
                    progressBarWidth = 100;
                    progressBarWidth -= 100/totalSec;
                    progressBar.css("width", progressBarWidth + "%");

                    console.log("Przerwa sessionTime", sessionTime + "; currentMin ", currentMin + "; totalSec ", totalSec + "; tempMin " + tempMin + "; tempSec ", tempSec + "; resumed = ", resumed);
                }
            }

            //Next session
            else if (currentMin < 0) {
                tempMin = 0;
                tempSec = 0;
                resumed = false;
                isSession = true;
                $("#status").text("Session");
                currentMin = sessionTime -1;
                totalSec = sessionTime * 60;
                tempMin = currentMin;
                tempSec = totalSec;
                progressBarWidth = 100;
                progressBarWidth -= 100/totalSec;
                progressBar.css("width", progressBarWidth + "%");

            }


            if (seconds < 10) {
                progressBarTime.text(currentMin + " : 0" + seconds);
            } else {
                progressBarTime.text(currentMin + " : " + seconds);
            }

        }, 200);// Koniec Interwału
    };// Koniec funkcji timer()

    function startStop(){
        if (!started) {
            started = true;
            timer();
        } else {
            resumed = true
            if (isTimeRunning === true) {
                clearInterval(mainInterval);
                isTimeRunning = false;

            } else {
                timer();
            }
        }
    }

// timer()



})//Koniec
