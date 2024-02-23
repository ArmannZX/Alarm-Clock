let ContorolHour = document.getElementById("contorol1");
let ContorolMin = document.getElementById("contorol2");
let HH = document.getElementById("HH");
let MM = document.getElementById("MM");
let SS = document.getElementById("SS");
let SetButton = document.getElementById("set");


const Clock = {
    Hour: "",
    Min: "",
    Sec: "",
    SetHour: undefined,
    SetMin: undefined,
    IsAdjusted: false,
    IsAlarmed: false,
    SetCurrentTime: function () {
        let CurrentDate = new Date();
        this.Hour = CurrentDate.getHours();
        this.Min = CurrentDate.getMinutes();
        this.Sec = CurrentDate.getSeconds();
    },
    SetHtmlElements: function () {
        if (this.Hour > 9) {
            HH.innerHTML = this.Hour;
        } else {
            HH.innerHTML = "0" + this.Hour;
        }
        if (this.Min > 9) {
            MM.innerHTML = this.Min;
        } else {
            MM.innerHTML = "0" + this.Min;
        }
        if (this.Sec > 9) {
            SS.innerHTML = this.Sec;
        } else {
            SS.innerHTML = "0" + this.Sec;
        }
    },
    SetAlarm: function () {

        if (Clock.IsAdjusted === false) {
            if (ContorolHour.value !== "Hour" && ContorolMin.value !== "Minute") {
                Clock.SetHour = ContorolHour.value;
                Clock.SetMin = ContorolMin.value;
                Clock.IsAdjusted = true;
                SetButton.value = "Clear Alarm";
                ContorolHour.disabled = true;
                ContorolMin.disabled = true;

                Clock.StartTimer(true)
                console.log(Clock);
            } else {
                alert("Please Set Alarm!")

            }
        } else {
            Clock.IsAdjusted = false;
            Clock.IsAlarmed = false;
            SetButton.value = "Set Alarm";
            ContorolHour.disabled = false;
            ContorolMin.disabled = false;

        }

    },
    ClearAlarm: function () {

    },
    StartTimer: function (Request) {


        let timer = setInterval(function () {
            if (Clock.IsAdjusted === false) {
                clearInterval(timer);
            }
            if (Clock.Hour == Clock.SetHour && Clock.Min == Clock.SetMin) {
                Clock.IsAlarmed = true;
                let AlaramSound = new Audio("./Audio/ringtone.mp3");
                AlaramSound.play();
                let AlarmReapet = setInterval(function () {
                    if (Clock.IsAlarmed === false) {
                        AlaramSound.pause();
                    }

                }, 1000)
                clearInterval(timer);
            }
        }, 1000)

    }
}

function MainProgram() {

    function ShowTime() {
        let TickSound = new Audio("./Audio/TickTock.mp3");
        TickSound.play();
        Clock.SetCurrentTime();
        Clock.SetHtmlElements();

    }

    let interval1 = setInterval(ShowTime, 1000)

    SetButton.addEventListener("click", Clock.SetAlarm)

}

MainProgram();

MakeNodeOption(ContorolHour, 23);
MakeNodeOption(ContorolMin, 59);
function MakeNodeOption(Element, counter) {
    for (let i = 0; i <= counter; i++) {
        Element.innerHTML += ` <option>${i}</option> `;
    }
}