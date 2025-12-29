const playPauseButton = document.querySelector('#play-pause');
const audioChapter = document.querySelector('#audio-chapter');
const chapter = document.querySelector('#chapter');
const previousChapterButton = document.querySelector('#previous');
const nextChapterButton = document.querySelector('#next');
const currentTime = document.querySelector('#current-time');
const audioProgress = document.querySelector('#audio-progress');
const durationTime = document.querySelector('#duration-time');
const numberOfChapters = 10;

let isPlaying = false;
let chapterNumber = 1;
let durationValue;

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	
	return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function setRangeColor(direction, firstColor, secondColor, value) {
	return `linear-gradient(${direction}, ${firstColor} ${value}%, ${secondColor} ${value}%)`;
}

function playTrack() {
	audioChapter.play();
	isPlaying = true;
	playPauseButton.classList.add('playing-audio');
}

function pauseTrack() {
	audioChapter.pause();
	isPlaying = false;
	playPauseButton.classList.remove('playing-audio');
}

function playOrPauseTrack() {
	if (isPlaying) {
		pauseTrack();
	} else {
		playTrack();
	}
}

function nextChapter() {
	pauseTrack();
	
	if (chapterNumber < numberOfChapters) {
		chapterNumber++;
	} else {
		chapterNumber = 1;
	}
	
	audioChapter.src = `audios/${chapterNumber}.mp3`;
	chapter.innerText = `Capítulo ${chapterNumber}`;
	currentTime.textContent = '00:00';
	audioProgress.value = 0;
	audioProgress.max = audioChapter.duration;
	
	audioChapter.addEventListener('loadedmetadata', () => {
		durationTime.textContent = formatTime(audioChapter.duration);
	});
}

function previousChapter() {
	pauseTrack();
	
	if (chapterNumber > 1) {
		chapterNumber--;
	} else {
		chapterNumber = numberOfChapters;
	}
	
	audioChapter.src = `audios/${chapterNumber}.mp3`;
	chapter.innerText = `Capítulo ${chapterNumber}`;
	currentTime.textContent = '00:00';
	audioProgress.value = 0;
	audioProgress.max = audioChapter.duration;
	
	audioChapter.addEventListener('loadedmetadata', () => {
		durationTime.textContent = formatTime(audioChapter.duration);
	});
}

playPauseButton.addEventListener('click', playOrPauseTrack);
nextChapterButton.addEventListener('click', nextChapter);
previousChapterButton.addEventListener('click', previousChapter);
audioChapter.addEventListener('ended', nextChapter);

audioChapter.addEventListener('loadedmetadata', () => {
	audioProgress.max = audioChapter.duration;
	durationTime.textContent = formatTime(audioChapter.duration);
	durationValue = 100 / audioChapter.duration;
});

audioChapter.addEventListener('timeupdate', () => {
	audioProgress.value = audioChapter.currentTime;
	currentTime.textContent = formatTime(audioChapter.currentTime);
	audioProgress.style.backgroundImage = setRangeColor('to right', '#FFFFFF', '#757575', audioChapter.currentTime * durationValue);
});

audioProgress.addEventListener('input', () => {
	audioChapter.currentTime = audioProgress.value;
	currentTime.textContent = formatTime(audioChapter.currentTime);
	audioProgress.style.backgroundImage = setRangeColor('to right', '#FFFFFF', '#757575', audioChapter.currentTime * durationValue);
});