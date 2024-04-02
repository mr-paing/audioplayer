// GET UI 
const getaudioscreen = document.getElementById('audioscreen');
const prevbtn = document.getElementById('prev'),
    playbtn = document.getElementById('play'),
    nextbtn = document.getElementById('next'),
    stopbtn = document.getElementById('stop');
const getprogressctn = document.getElementById('progress-container'),
    getprogress = document.getElementById('progress');
const getvolprogress = document.getElementById('volumeprogress');
const getdisplaytime = document.getElementById('displaytime');




const audios = ["sampleaudio1","sampleaudio2","sampleaudio3"];

let curridx = 0;

// loadaudio(audios[curridx]); //disabled to fix displaytime NaN error

function loadaudio(ado){
    getaudioscreen.src = `./source/${ado}.mp3`;
}

function playado(){
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    getaudioscreen.play(); //paly() method come form audio & video 
}

function pauseado(){
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    getaudioscreen.pause(); //pause() method comes form audio & video
}


function playpauseado(){
    if(getaudioscreen.paused){
        getaudioscreen.play();
        // playado();
    }else{
        getaudioscreen.pause();
        // pauseado();
    }
}

function previousado(){
    curridx--;
    if(curridx < 0){
        curridx = audios.length - 1;
    }

    loadaudio(audios[curridx]);
    playado();
}

function nextado(){
    curridx++;
    if(curridx > audios.length -1){
        curridx = 0;
    }

    loadaudio(audios[curridx]);
    playado();
}

function stopado(){
    getaudioscreen.currentTime = 0;
    getprogress.width = getaudioscreen.currentTime;
    // getprogress.value = getaudioscreen.currentTime;
    pauseado();
}

function updateprogress(e){
    const {currentTime} = e.target;
    const {duration} = e.target;

    if(getaudioscreen.currentTime === 0){
        getprogress.style.width = `0%`;
    }else{
        const progresspercent = (currentTime / duration)*100;
        getprogress.style.width = `${progresspercent}%`;
    }

// Time Forward 
    let minsfw = Math.floor(getaudioscreen.currentTime / 60);
    let secsfs = Math.floor(getaudioscreen.currentTime % 60);

    const minvalfw = minsfw.toString().padStart(2,'0');
    const secvalfw = secsfs.toString().padStart(2,'0');

// Time backward 
    let minsbw = Math.floor((duration - getaudioscreen.currentTime) / 60);
    let secsbs = Math.floor((duration - getaudioscreen.currentTime) % 60);

    const minutevalbw = minsbw.toString().padStart(2,'0');
    const secondvalbw = secsbs.toString().padStart(2,'0');

    getdisplaytime.innerText = `${minvalfw}:${secvalfw} /${minutevalbw}:${secondvalbw}`;
}

function setaudioprogress(e){
    const width = this.clientWidth;
    const clickx = e.offsetX;
    // console.log(clickx);
    const duration = getaudioscreen.duration;
    getaudioscreen.currentTime = (clickx / width) * duration;

}

function volumecontrol(){
    // console.log(getvolprogress.value);
    
    // valume come from audio/video api
    getaudioscreen.volume = getvolprogress.value / 100;

    // 1 is default = (100%)
    // 0.5 is half of volume (50%)
    // 0 is mute (0%)
}

getaudioscreen.addEventListener('timeupdate',updateprogress);
getaudioscreen.addEventListener('play',playado);
getaudioscreen.addEventListener('pause',pauseado);

playbtn.addEventListener('click',playpauseado);
prevbtn.addEventListener('click',previousado);
nextbtn.addEventListener('click',nextado);
stopbtn.addEventListener('click',stopado);

getprogressctn.addEventListener('click',setaudioprogress);

getvolprogress.addEventListener('change',volumecontrol);



