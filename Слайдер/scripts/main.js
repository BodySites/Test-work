const slider = document.querySelector(".slides");
const prevButton = document.querySelector(".left");
const nextButton = document.querySelector(".right");
const imagesIcon = document.querySelectorAll(".icons-slider a");
const countSlides = slider.querySelectorAll("img").length;

let currentIndex = 0;
let targetIndex = 0;
let intervalId;
let isAnimated = false;
const animationDuration = 500;
const framesPerSecond = 60;
const totalFrames = framesPerSecond * (animationDuration / 1000);
let currentFrame = 0;

if (countSlides > 1) {
	prevButton.addEventListener(
		"click",
		() => !isAnimated && changeSlide("left")
	);
	nextButton.addEventListener(
		"click",
		() => !isAnimated && changeSlide("right")
	);
	imagesIcon.forEach(icon =>
		icon.addEventListener("click", e => !isAnimated && imagesIconClick(e))
	);
}

function changeSlide(direction) {
	if (direction === "left") {
		if (currentIndex === 0) {
			const EndSlideClone = slider.lastElementChild.cloneNode(true);
			EndSlideClone.style.position = "absolute";
			EndSlideClone.style.left = "-100%";
			EndSlideClone.style.width = "100%";
			slider.prepend(EndSlideClone);

			moveSlide(currentIndex - 1);
			setTimeout(() => {
				slider.removeChild(EndSlideClone);
			}, animationDuration);
		} else {
			moveSlide(currentIndex - 1);
		}
	} else if (direction === "right") {
		if (currentIndex === countSlides - 1) {
			const firstSlideClone = slider.firstElementChild.cloneNode(true);
			slider.append(firstSlideClone);

			moveSlide(currentIndex + 1);
			setTimeout(() => {
				slider.removeChild(firstSlideClone);
			}, animationDuration);
		} else {
			moveSlide(currentIndex + 1);
		}
	}
}

function moveSlide(target) {
	isAnimated = true;
	targetIndex = target;
	currentFrame = 0;
	const step = (targetIndex - currentIndex) / totalFrames;

	clearInterval(intervalId);
	intervalId = setInterval(
		() => animateSlide(step),
		animationDuration / totalFrames
	);
}

function animateSlide(step) {
	if (currentFrame < totalFrames) {
		currentIndex += step;
		slider.style.transform = `translateX(${-currentIndex * 100}%)`;
		currentFrame++;
	} else {
		if (currentIndex > countSlides - 0.9) currentIndex = 0;
		else if (currentIndex < -0.1) currentIndex = countSlides - 1;
		else currentIndex = targetIndex;
		slider.style.transform = `translateX(${-currentIndex * 100}%)`;
		clearInterval(intervalId);
		changeIcon(currentIndex);
		isAnimated = false;
	}
}

function imagesIconClick(event) {
	event.preventDefault();
	imagesIcon.forEach((_img, index) => {
		if (imagesIcon[index] === event.currentTarget && index !== currentIndex) {
			moveSlide(index);
			changeIcon(index);
		}
	});
}

function changeIcon(index) {
	imagesIcon.forEach(imgIcon => {
		imgIcon.classList.remove("selected");
	});
	imagesIcon[index].classList.add("selected");
}
