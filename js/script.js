$(function(){
    // Time settings
    let sessionTime = 1,
        shortBreakTime = 1,
        longBreakTime = 1,
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
        sound1 = new Audio("./sounds/timeForBreak.ogg");
        sound2 = new Audio("./sounds/timeToWork.ogg")

    // UI elements
    let session = $("#sessionTime"),
        shortBreak = $("#shortBreakTime"),
        longBreak = $("#longBreakTime"),
        progressBar = $(".main-bar"),
        progressBarWidth = 100,
        progressBarTime = $("#progress-bar-time");
        descriptionQuestion = $("#descriptionQuestion")


    //Time settings display
    session.text(sessionTime);
    shortBreak.text(shortBreakTime);
    longBreak.text(longBreakTime);
    progressBarTime.text("Click me to Start/Pause");
    descriptionQuestion.on("click", () => {
        if (descriptionQuestion.find("span").text() === "Click me") {
            descriptionQuestion.find("span").text("Click me again to hide this information").fadeIn();
            $(".descriptionText").fadeToggle();
        } else {
            descriptionQuestion.find("span").text("Click me");
            $(".descriptionText").fadeToggle();
        }

    })

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

                console.log("Minęła minuta: sessionTime", sessionTime + "; currentMin ", currentMin + "; totalSec ", totalSec + "; tempMin " + tempMin + "; tempSec ", tempSec + "; resumed = ", resumed );
            }

            //Handles start of the next break
            if (isSession === true) {
                if (currentMin < 0) {
                    completedSessions++;
                    isSession = false;
                    resumed = false;
                    if (completedSessions % 4 === 0) {
                        currentMin = longBreakTime -1;
                        tempBreakMin = currentMin;
                        totalSec = longBreakTime * 60;
                        tempBreakSec = totalSec;
                        sound1.play();
                        $("#status").text("LONG BREAK");
                        progressBar.css("backgroundColor", "#6ad3ff");
                        // completedSessions = 0;
                    } else {
                        currentMin = shortBreakTime -1;
                        tempBreakMin = currentMin;
                        totalSec = shortBreakTime * 60;
                        tempBreakSec = totalSec;
                        sound1.play();
                        $("#status").text("BREAK");
                        progressBar.css("backgroundColor", "#89ff00");
                    }
                    progressBarWidth = 100;
                    progressBarWidth -= 100/totalSec;
                    progressBar.css("width", progressBarWidth + "%");

                    console.log("Przerwa sessionTime", sessionTime + "; currentMin ", currentMin + "; totalSec ", totalSec + "; tempMin " + tempMin + "; tempSec ", tempSec + "; resumed = ", resumed + "; completedSessions ", completedSessions);
                }
            }

            //Handles start of the next sessions
            else if (currentMin < 0) {
                sound2.play();
                tempMin = 0;
                tempSec = 0;
                resumed = false;
                isSession = true;
                $("#status").html("Session #" + (completedSessions+1));
                currentMin = sessionTime -1;
                totalSec = sessionTime * 60;
                tempMin = currentMin;
                tempSec = totalSec;
                progressBarWidth = 100;
                progressBarWidth -= 100/totalSec;
                progressBar.css("backgroundColor", "#ffeb3b");
                progressBar.css("width", progressBarWidth + "%");

            }

            //Handles proper time format on progress bar
            if (seconds < 10) {
                progressBarTime.text(currentMin + " : 0" + seconds);
            } else {
                progressBarTime.text(currentMin + " : " + seconds);
            }

        }, 100);// Koniec Interwału
    };// Koniec funkcji timer()

    function startStop(){
        if (!started) {
            started = true;
            $("#status").text("Session #" + (completedSessions+1));
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

    $("#buttonBox").find("button").on("click", function(){
        clearInterval(mainInterval)
        progressBarWidth = 100;
        seconds = 60;
        started = false,
        isTimeRunning = false;
        resumed = false;
        isSession = true;
        completedSessions = 0;
        progressBar.css("backgroundColor", "#ffeb3b");
        progressBarTime.text("Click me to Start/Pause");
        progressBar.css("width", progressBarWidth + "%");
        $("#status").html("Session");
        tempMin;
        tempSec;
        tempBreakMin;
        tempBreakSec;
    })



// timer()



})//Koniec
