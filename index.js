var song = document.querySelector('#song')
var progress = document.querySelector('.timeline-bar')
var ctrlIcon = document.querySelector('.play-icon')
var time = document.querySelector('#current-time').innerHTML
var soundIcon = document.querySelector('.sound-img')
var volProgress = document.querySelector('#volume-slider')

song.onloadedmetadata = function(){
            progress.max = song.duration;
             document.querySelector('#duration').innerHTML= ((progress.max)/60).toFixed(2)
            progress.value = song.currentTime;
}

function playPause(){
            if(ctrlIcon.src.includes('assets/icons/pause-icon.svg')){
                        song.pause()
                        ctrlIcon.src='assets/icons/play-icon.svg'
            }else{
                        song.play();
                        ctrlIcon.src='assets/icons/pause-icon.svg'
            }
}

if(song.play()){
            setInterval(()=>{
                        progress.value=song.currentTime
                        time = song.currentTime
                        document.querySelector('#current-time').innerHTML = (time/60).toFixed(2);
            },500)
}

progress.onchange = ()=>{
            song.play()
            song.currentTime = progress.value
            ctrlIcon.src='assets/icons/pause-icon.svg'
}

soundIcon.addEventListener('click', () => {
            if (song.volume > 0) {
                song.volume = volProgress.value = 0;
                soundIcon.src = 'assets/icons/sound-off-icon.svg';
            } else {
                song.volume = volProgress.value = 1;
                soundIcon.src = 'assets/icons/sound-on-icon.svg';
            }
        });
        
        volProgress.onchange = () => {
            song.volume = volProgress.value;
            soundIcon.src = song.volume == 0 ? 'assets/icons/sound-off-icon.svg' : 'assets/icons/sound-on-icon.svg';
        };

document.querySelector('.replay').addEventListener('click',()=>{
            song.currentTime = 0
})
document.querySelector('.repeat-icon').addEventListener('click',()=>{
            song.loop=true
})

function toggleSoundBar() {
            const soundBar = document.querySelector('.sound-progress-bar');
            if (soundBar.style.display === 'none' || soundBar.style.display === '') {
              soundBar.style.display = 'block';
            } else {
              soundBar.style.display = 'none';
            }
          }

// Upload Section

const fileUpload = document.getElementById('fileUpload');
const fileNameDisplay = document.getElementById('fileName');

fileUpload.addEventListener('change', function() {
    if (fileUpload.files.length > 0) {
        const fileName = fileUpload.files[0].name;
        song.src = URL.createObjectURL(fileUpload.files[0])
        fileNameDisplay.textContent = fileName;
        document.querySelector('.song-name').textContent = fileName.slice(0,fileName.length-4)
    }
});
