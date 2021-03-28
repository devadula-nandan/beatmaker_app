//object oriented concept
//reference dev ed


//object declaration/constructor
class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.selections = document.querySelectorAll("select");
        this.muteBtn = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.step = 0;
        this.bpm = 150;
        this.isPlaying = null;
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        const activeBars = document.querySelectorAll(`.b${this.step}`);
        activeBars.forEach(bar => {
            bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
            if (bar.classList.contains("active")) {
                switch (bar.classList[1]) {
                    case "kick-pad":
                        this.kickAudio.currentTime = 0;
                        this.kickAudio.play();
                        break;
                    case "snare-pad":
                        this.snareAudio.currentTime = 0;
                        this.snareAudio.play();
                        break;
                    case "hihat-pad":
                        this.hihatAudio.currentTime = 0;
                        this.hihatAudio.play();
                        break;
                }

                // removed the below code after refactoring

                // if (bar.classList.contains("kick-pad")) {
                //this.kickAudio.currentTime = 0;
                //     this.kickAudio.play();
                // }
                // else if (bar.classList.contains("snare-pad")) {
                // this.snareAudio.currentTime = 0;
                //     this.snareAudio.play();
                // }
                // else if (bar.classList.contains("hihat-pad")) {
                //this.hihatAudio.currentTime = 0;
                //     this.hihatAudio.play();
                // }
            }
        })

        this.step == 7 ? this.step = 0 : this.step++;  // this line is refactored
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        if (this.isPlaying) {
            clearInterval(this.isPlaying);

            this.playBtn.innerHTML = "Play";
            this.playBtn.classList.remove("active");

            this.isPlaying = null;
        } else {

            this.playBtn.innerHTML = "Stop";
            this.playBtn.classList.add("active");

            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
    }
    changeSound(e) {
        switch (e.target.name) {
            case "kick-select":
                this.kickAudio.src = e.target.value;
                break;
            case "snare-select":
                this.snareAudio.src = e.target.value;
                break;
            case "hihat-select":
                this.hihatAudio.src = e.target.value;
                break;
        }
    }
    mute(e) {
        e.target.classList.toggle("active");
        console.log(e.target.classList);
        if (e.target.classList.contains("active")) {
            switch (e.target.classList[1]) {
                case "kick-volume":
                    this.kickAudio.volume = 0;
                    break;
                case "snare-volume":
                    this.snareAudio.volume = 0;
                    break;
                case "hihat-volume":
                    this.hihatAudio.volume = 0;
                    break;
                default:
                    break;
            }
        } else {
            switch (e.target.classList[1]) {
                case "kick-volume":
                    this.kickAudio.volume = 1;
                    break;
                case "snare-volume":
                    this.snareAudio.volume = 1;
                    break;
                case "hihat-volume":
                    this.hihatAudio.volume = 1;
                    break;
                default:
                    break;
            }
        }
    }
    changeTempo(e) {
        const tempoNbr = document.querySelector(".tempo-nr");
        tempoNbr.innerHTML = e.target.value;
    }
    tempoUpdate(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

//object creation/construction
const drumKit = new Drumkit();


//event listeners
drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", function () {
    drumKit.start();
});
drumKit.selections.forEach(selection => {
    selection.addEventListener("change", (e) => {
        drumKit.changeSound(e);
    });
});
drumKit.muteBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        drumKit.mute(e);
    });
});
drumKit.tempoSlider.addEventListener("input", (e) => {
    drumKit.changeTempo(e);
})
drumKit.tempoSlider.addEventListener("change", (e) => {
    drumKit.tempoUpdate(e);
})