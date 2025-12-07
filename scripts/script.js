const playPauseButton = document.querySelector('#play-pause');
const audioChapter = document.querySelector('#audio-chapter');
const chapter = document.querySelector('#chapter');
const previousChapterButton = document.querySelector('#previous');
const nextChapterButton = document.querySelector('#next');
const numberOfChapters = 10;

let isPlaying = false;
let chapterNumber = 1;

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
	
	audioChapter.src = `/audios/${chapterNumber}.mp3`;
	chapter.innerText = `Capítulo ${chapterNumber}`;
}

function previousChapter() {
	pauseTrack();
	
	if (chapterNumber > 1) {
		chapterNumber--;
	} else {
		chapterNumber = numberOfChapters;
	}
	
	audioChapter.src = `/audios/${chapterNumber}.mp3`;
	chapter.innerText = `Capítulo ${chapterNumber}`;
}

playPauseButton.addEventListener('click', playOrPauseTrack);
nextChapterButton.addEventListener('click', nextChapter);
previousChapterButton.addEventListener('click', previousChapter);
audioChapter.addEventListener('ended', nextChapter);