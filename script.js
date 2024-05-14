// ------------------- EVENT LISTENERS -------------------- //

const sources = document.querySelector(".source-1");
console.log(sources);

sources.addEventListener("mouseover", sourceFunc);

function sourceFunc(e) {
  console.log("Hej funkar detta", e);
  const html = `<p class="hej">Hejsan detta är en källa.</p>`;
  sources.insertAdjacentHTML("beforeend", html);
}

sources.addEventListener("mouseleave", removeSource);

function removeSource() {
  const remove = document.querySelector(".hej");
  remove.remove();
}

// const newSource = document.createElement("p");
// const div = document.querySelector(".container");
// div.insertAdjacentElement("beforeend", newSource);

// ------------------- ANIMATIONER -------------------- //

const heading = document.getElementById("text-animation");
const textContent = heading.textContent.trim();
const letters = textContent.split("");

heading.textContent = ""; // Clear the text content

letters.forEach((letter, index) => {
  const span = document.createElement("span");
  span.textContent = letter;
  span.style.animationDelay = `${index * 400}ms`; // Adjust the delay here
  heading.appendChild(span);
});
