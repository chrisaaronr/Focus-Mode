//----------Music Player---------//

const audio = document.querySelector('audio')
const playPauseBtn = document.querySelector('#play-pause')
const nextBtn = document.querySelector('#next')
const previousBtn = document.querySelector('#previous')

const songList = document.querySelector('.song-list')
const title = document.querySelector('#title')
const playlistImage = document.querySelector('.playlist-image')
const volSlider = document.querySelector('.slider')

let songArray = [];
let songHeading = '';
let songIndex = 0;
let isPlaying = false;

function loadAudio() {
    audio.src = songArray[songIndex];

    let songListItems = songList.getElementsByTagName('li');
    songHeading = songListItems[songIndex].getAttribute('data-name');
    title.innerText = songHeading;

    // Highlight
    for (i = 0; i < songListItems.length; i++) {
        songListItems[i].classList.remove('active');
    }

    songList.getElementsByTagName('li')[songIndex].classList.add('active');
}

function loadSongs() {
    let songs = songList.getElementsByTagName('li');
    for (i = 0; i < songs.length; i++) {
        songArray.push(songs[i].getAttribute('data-src'));
    }

    loadAudio();
}

loadSongs();

function playAudio() {
    audio.play();
    playPauseBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playPauseBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    isPlaying = true;
    playlistImage.classList.add('playlist-image-animation');
}

function pauseAudio() {
    audio.pause();
    playPauseBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    playPauseBtn.querySelector('i.fa-solid').classList.add('fa-play');
    isPlaying = false;
    playlistImage.classList.remove('playlist-image-animation');
}

function nextSong() {
    songIndex++;
    if (songIndex > songArray.length - 1) {
        songIndex = 0;
    };
    loadAudio();
    playAudio();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songArray.length - 1;
    };
    loadAudio();
    playAudio();
}

playPauseBtn.addEventListener('click', function () {
    if (isPlaying) {
        pauseAudio();
    }
    else {
        playAudio();
    }
}, false);

nextBtn.addEventListener('click', function () {
    nextSong();
}, false);

previousBtn.addEventListener('click', function () {
    previousSong();
}, false);

songList.addEventListener('click', function (e) {
    songIndex = e.target.closest('li').getAttribute('data-index');
    loadAudio();
    playAudio();
}, false);

audio.addEventListener('ended', function () {
    nextSong();
});

volSlider.addEventListener('input', function () {
    audio.volume = volSlider.value / 100;
}, false);

//------------------Pomodoro Timer------------------//
const progressBar = document.querySelector(".outerRing"),
    minElem = document.querySelector("#minutes"),
    secElem = document.querySelector("#seconds"),
    startStop = document.querySelector("#stsp"),
    setting = document.querySelector("#setting");

let minutes = document.querySelector("#minutes").innerHTML,
    seconds = document.querySelector("#seconds").innerHTML,
    progress = null,
    progressStart = 0,
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds),
    speed = 1000,
    degTravel = 360 / progressEnd,
    toggleSettings = false,
    secRem = 0,
    minRem = 0;

function progressTrack() {
    progressStart++;

    secRem = Math.floor((progressEnd - progressStart) % 60);
    minRem = Math.floor((progressEnd - progressStart) / 60);

    secElem.innerHTML = secRem.toString().length == 2 ? secRem : `0${secRem}`;
    minElem.innerHTML = minRem.toString().length == 2 ? minRem : `0${minRem}`;

    progressBar.style.background = `conic-gradient(
        #9d0000 ${progressStart * degTravel}deg,
        #17171a ${progressStart * degTravel}deg
      )`;
    if (progressStart == progressEnd) {
        progressBar.style.background = `conic-gradient(
        #00aa51 360deg,
        #00aa51 360deg
      )`;
        clearInterval(progress);
        startStop.innerHTML = "START";
        progress = null;
        progressStart = 0;
    }
}

function startStopProgress() {
    if (!progress) {
        progress = setInterval(progressTrack, speed);
    } else {
        clearInterval(progress);
        progress = null;
        progressStart = 0;
        progressBar.style.background = `conic-gradient(
        #17171a 360deg,
        #17171a 360deg
      )`;
    }
}

function resetValues() {
    if (progress) {
        clearInterval(progress);
    }
    minutes = document.querySelector("#minutes").innerHTML;
    seconds = document.querySelector("#seconds").innerHTML;
    toggleSettings = false;
    minElem.contentEditable = false;
    minElem.style.borderBottom = `none`;
    secElem.contentEditable = false;
    secElem.style.borderBottom = `none`;
    progress = null;
    progressStart = 0;
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
    degTravel = 360 / progressEnd;
    progressBar.style.background = `conic-gradient(
        #17171a 360deg,
        #17171a 360deg
      )`;
}

startStop.onclick = function () {
    if (startStop.innerHTML === "START") {
        if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
            startStop.innerHTML = "STOP";
            startStopProgress();
        } else {
            alert("Enter the Time Value in your Timer!");
        }
    } else {
        startStop.innerHTML = "START";
        startStopProgress();
    }
};

setting.onclick = function () {
    if (!toggleSettings) {
        toggleSettings = true;
        minElem.contentEditable = true;
        minElem.style.borderBottom = `1px dashed #ffffff50`;
        secElem.contentEditable = true;
        secElem.style.borderBottom = `1px dashed #ffffff50`;
    } else {
        resetValues();
    }
};

minElem.onblur = function () {
    resetValues();
};

secElem.onblur = function () {
    resetValues();
};