const header = document.querySelector(".header__bottom");
const cookies = document.querySelector(".cookies");
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
const closeMenu = document.querySelector(".menu__close");
const contactButtons = document.querySelectorAll(
	".button-contact[type='button']"
);
const popup = document.querySelector(".popup");
const closePopupIcons = document.querySelectorAll(".close-popup");
const requiredInputs = document.querySelectorAll(
	".form-contact__item_required input"
);
const submitButton = document.querySelector(".form-contact__button");
const thanksButton = document.querySelector(".thank-you__button");
const form = document.querySelector(".form-contact");
const thanksBlock = document.querySelector(".thank-you");
const errorForm = document.querySelector(".form-contact__error_big");

const validInputs = [];

window.addEventListener("scroll", () => {
	if (window.scrollY > 38) {
		!header.classList.contains("fix") && header.classList.add("fix");
	} else {
		header.classList.contains("fix") && header.classList.remove("fix");
	}
});

setTimeout(() => {
	cookies.style.bottom = "30px";
}, 2000);

function closeCookies() {
	cookies.style.display = "none";
}

burger.addEventListener("click", () => {
	document.body.classList.add("lock");
	menu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
	menu.classList.remove("active");
	document.body.classList.remove("lock");
});

contactButtons.forEach(button => {
	button.addEventListener("click", () => {
		menu.classList.remove("active");
		document.body.classList.add("lock");
		button.style.visibility = "hidden";
		popup.style.display = "flex";
	});
});

closePopupIcons.forEach(close => {
	close.addEventListener("click", () => {
		closePopup();
	});
});

thanksButton.addEventListener("click", () => {
	closePopup();
});

function closePopup() {
	document.body.classList.remove("lock");
	contactButtons.forEach(button => (button.style.visibility = "visible"));
	popup.style.display = "none";
	form.style.display = "flex";
	thanksBlock.style.display = "none";
}

requiredInputs.forEach((input, index) => {
	input.addEventListener("input", () => {
		const error = input
			.closest(".form-contact__item")
			.querySelector(".form-contact__error");
		const valid = validInput(input);
		validInputs[index] = valid[0];

		if (!valid[0]) {
			!input.classList.contains("error") && input.classList.add("error");
			error.innerHTML = valid[1];
			error.style.display = "block";
		} else {
			input.classList.contains("error") && input.classList.remove("error");
			error.style.display = "none";
		}
		if (validInputs.includes(false)) {
			submitButton.setAttribute("disabled", true);
			errorForm.style.display = "block";
		} else {
			submitButton.removeAttribute("disabled");
			errorForm.style.display = "none";
		}
	});
});

function validInput(input) {
	if (!input.value) return [false, "This field is required."];
	switch (input.id) {
		case "name":
			return input.value.match(/^[A-Za-z]+.*$/) ? [true, ""] : [false, "Error"];
		case "email":
			return input.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9]+.[A-Z]{2,4}$/i)
				? [true, ""]
				: [false, "Invalid email."];
		case "phone":
			return input.value.match(/^\+7 \d{3} \d{3} \d{4}$/)
				? [true, ""]
				: [false, "Invalid phone number."];
		default:
			break;
	}
	return [true, ""];
}

form.addEventListener("submit", e => {
	e.preventDefault();
	form.style.display = "none";
	thanksBlock.style.display = "flex";
});
