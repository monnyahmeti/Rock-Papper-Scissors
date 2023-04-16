const userScoreCard = document.querySelector(".score .user");
const compScoreCard = document.querySelector(".score .comp");
const rockButton = document.querySelector(".options .r");
const paperButton = document.querySelector(".options .p");
const scissorsButton = document.querySelector(".options .s");
const status = document.querySelector(".status");
const endStatus = document.querySelector(".game-end");
const resetButton = document.querySelector("#reset");

let userScore = 0;
let compScore = 0;
let statusString;
let userChoice;
let rounds = 0;

let compChoice = randChoice();

main();

function randChoice() {
	switch (Math.floor(Math.random() * 3) + 1) {
		case 1:
			return "r";
		case 2:
			return "p";
		case 3:
			return "s";
	}
}

function main() {
	rockButton.addEventListener("click", () => {
		userChoice = "r";
		rounds++;
		checkDecision(userChoice);
		compChoice = randChoice();
		checkRoundOver();
	});

	paperButton.addEventListener("click", () => {
		userChoice = "p";
		rounds++;
		checkDecision(userChoice);
		compChoice = randChoice();
		checkRoundOver();
	});

	scissorsButton.addEventListener("click", () => {
		userChoice = "s";
		rounds++;
		checkDecision(userChoice);
		compChoice = randChoice();
		checkRoundOver();
	});

	resetButton.addEventListener("click", reset);
}

function checkDecision(userChoice) {
	switch (userChoice + compChoice) {
		case "rs":
		case "pr":
		case "sp":
			win(userChoice);
			break;
		case "rr":
		case "pp":
		case "ss":
			draw(userChoice);
			break;
		case "rp":
		case "sr":
		case "ps":
			loss(compChoice);
			break;
	}
	userScoreCard.innerHTML = userScore;
	compScoreCard.innerHTML = compScore;
}

function win(user) {
	userScore++;
	switch (user) {
		case "r":
			statusString = "Guri i thej Gersheret. ";
			break;
		case "p":
			statusString = "Letra e mbuloj Gurin. ";
			break;
		case "s":
			statusString = "Gersheret e prejten Letren.";
			break;
	}
	status.innerHTML =
		`Round ${rounds}: ` + statusString + "<strong>Ti</strong> Fitove <b>🔥</b>.";

	document.querySelector(`.${userChoice}`).classList.add("win");
	setTimeout(
		() => document.querySelector(`.${userChoice}`).classList.remove("win"),
		600
	);
}

function loss(comp) {
	compScore++;
	switch (comp) {
		case "r":
			statusString = "Guri i thej Gersheret. ";
			break;
		case "p":
			statusString = "Letra e mbuloj Gurin.";
			break;
		case "s":
			statusString = "Gersheret e prejten Letren.";
			break;
	}
	status.innerHTML =
		`Round ${rounds}: ` +
		statusString +
		"<strong>Kompjuteri</strong> fitoj <b>🤖</b>.";
	document.querySelector(`.${userChoice}`).classList.add("loss");
	setTimeout(
		() => document.querySelector(`.${userChoice}`).classList.remove("loss"),
		600
	);
}

function draw(user) {
	switch (user) {
		case "r":
			statusString = "Te dy keni zgjedhur gurin";
			break;
		case "p":
			statusString = "Te dy keni zgjedhur letren";
			break;
		case "s":
			statusString = "Te dy keni zgjedhur gersheren";
			break;
	}
	status.innerHTML =
		`Round ${rounds}: ` + statusString + "<strong>Baraz</strong> <b>😑</b>.";
	document.querySelector(`.${userChoice}`).classList.add("draw");
	setTimeout(
		() => document.querySelector(`.${userChoice}`).classList.remove("draw"),
		600
	);
}

function reset() {
	userScore = 0;
	compScore = 0;
	if (
		status.innerText ===
			"Zgjedhe nje. Mos u merakos shume , kompjuteri ka vendosur cfare te luaj." ||
		status.innerHTML === "Loje e re! Pac fat kesaj here <b>👍🏼</b>." ||
		status.innerHTML === "Loja ka rifilluar<b>😉</b>."
	) {
		status.innerHTML = "Loja ka rifilluar <b>😉</b>.";
	} else status.innerHTML = "Loje e re! Pac fat kesaj here <b>👍🏼</b>.";
	userScoreCard.innerHTML = userScore;
	compScoreCard.innerHTML = compScore;
	rockButton.disabled = false;
	paperButton.disabled = false;
	scissorsButton.disabled = false;
	rounds = 0;
	endStatus.innerHTML = "";
}

function checkRoundOver() {
	if (rounds === 5) {
		rockButton.disabled = true;
		paperButton.disabled = true;
		scissorsButton.disabled = true;

		if (userScore > compScore) {
			endStatus.innerHTML = `Ti fitove. Je i mrekullueshem <b>🤩</b>. <p>Deshironi te luani perseri?</p>`;
		} else if (compScore > userScore) {
			endStatus.innerHTML = `Ti humbe. Pac fat me te mire herave tjera <b>🤕</b>. <p>Deshironi te luani perseri?</p>`;
		} else {
			endStatus.innerHTML = `Loja perfundoj baraz <b>🥴</b>. <p>Deshironi te luani perseri?</p>`;
		}
	}
}