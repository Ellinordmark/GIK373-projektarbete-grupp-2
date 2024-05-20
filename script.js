// ------------------- EVENT LISTENERS -------------------- //

const source1 = document.querySelector(".source-1");
const colorChange1 = document.getElementById("S1");

function sourceFunc1() {
  const html = `<p class="source-link">Source: <a href="https://www.unep.org/news-and-stories/story/putting-brakes-fast-fashion">The European Parliament</a></p>`;
  source1.insertAdjacentHTML("beforeend", html);
  colorChange1.style.color = "#e39800";
}

function removeSource1() {
  const remove = document.querySelector(".source-link");
  remove.remove();
  colorChange1.style.color = "#a1c144";
}

source1.addEventListener("mouseleave", removeSource1);
source1.addEventListener("mouseenter", sourceFunc1);

//SOURCE 2 GÖR DYNAMISK
const source2 = document.querySelector(".source-2");
const colorChange2 = document.getElementById("S2");

function sourceFunc2() {
  const html = `<p class="source-link">Source: <a href="https://www.unep.org/news-and-stories/story/putting-brakes-fast-fashion">The European Parliament</a></p>`;
  source2.insertAdjacentHTML("beforeend", html);
  colorChange2.style.color = "#e39800";
}

function removeSource2() {
  const remove = document.querySelector(".source-link");
  remove.remove();
  colorChange2.style.color = "#a1c144";
}

source2.addEventListener("mouseenter", sourceFunc2);
source2.addEventListener("mouseleave", removeSource2);

//SOURCE 3
const source3 = document.querySelector(".source-3");
const colorChange3 = document.getElementById("S3");

function sourceFunc3() {
  const html = `<p class="source-link">Source: <a href="https://www.eea.europa.eu/publications/microplastics-from-textiles-towards-a">European Environment Agency</a></p>`;
  source3.insertAdjacentHTML("beforeend", html);
  colorChange3.style.color = "#e39800";
}

function removeSource3() {
  const remove = document.querySelector(".source-link");
  remove.remove();
  colorChange3.style.color = "#a1c144";
}

source3.addEventListener("mouseleave", removeSource3);
source3.addEventListener("mouseenter", sourceFunc3);

//SOURCE 4
const source4 = document.querySelector(".source-4");
const colorChange4 = document.getElementById("S4");

function sourceFunc4() {
  const html = `<p class="source-link">Source: <a href="https://www.bbc.com/future/article/20200710-why-clothes-are-so-hard-to-recycle">BBC</a></p>`;
  source4.insertAdjacentHTML("beforeend", html);
  colorChange4.style.color = "#e39800";
}

function removeSource4() {
  const remove = document.querySelector(".source-link");
  remove.remove();
  colorChange4.style.color = "#a1c144";
}

source4.addEventListener("mouseenter", sourceFunc4);
source4.addEventListener("mouseleave", removeSource4);

//SOURCE 5
const source5 = document.querySelector(".source-5");
const colorChange5 = document.getElementById("S5");

function sourceFunc5() {
  const html = `<p class="source-link">Source: <a href="https://www.europarl.europa.eu/topics/en/article/20201208STO93327/the-impact-of-textile-production-and-waste-on-the-environment-infographics">The European Parliament</a></p>`;
  source5.insertAdjacentHTML("beforeend", html);
  colorChange5.style.color = "#e39800";
}

function removeSource5() {
  const remove = document.querySelector(".source-link");
  remove.remove();
  colorChange5.style.color = "#a1c144";
}

source5.addEventListener("mouseenter", sourceFunc5);
source5.addEventListener("mouseleave", removeSource5);

//SOURCE 6
const source6 = document.querySelector(".source-6");
const colorChange6 = document.getElementById("S6");

function sourceFunc6() {
  const html = `<p class="source-link">Source: <a href="https://www.europarl.europa.eu/topics/en/article/20201208STO93327/the-impact-of-textile-production-and-waste-on-the-environment-infographics">The European Parliament</a></p>`;
  source6.insertAdjacentHTML("beforeend", html);
  colorChange6.style.color = "#e39800";
}

function removeSource6() {
  const remove = document.querySelector(".source-link");
  remove.remove();
  colorChange6.style.color = "#a1c144";
}

source6.addEventListener("mouseenter", sourceFunc6);
source6.addEventListener("mouseleave", removeSource6);

// ------------------- ANIMATIONER -------------------- //

const heading = document.getElementById("text-animation");
const textContent = heading.textContent.trim();
const letters = textContent.split("");

heading.textContent = ""; // Clear the text content

letters.forEach((letter, index) => {
  const span = document.createElement("span");
  span.textContent = letter;
  span.style.animationDelay = `${index * 600}ms`; // Adjust the delay here
  span.style.animationIterationCount = 100;
  heading.appendChild(span);
});

// ------------------- MEDIA QUERIES -------------------- //

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    source1.insertAdjacentHTML("beforeend", `<p class="source-link">Source: <a href="https://www.unep.org/news-and-stories/story/putting-brakes-fast-fashion">The European Parliament</a></p>`);
    source2.insertAdjacentHTML("beforeend", `<p class="source-link">Source: <a href="https://www.unep.org/news-and-stories/story/putting-brakes-fast-fashion">The European Parliament</a></p>`);
    source3.insertAdjacentHTML(
      "beforeend",
      `<p class="source-link">Source: <a href="https://www.eea.europa.eu/publications/microplastics-from-textiles-towards-a">European Environment Agency</a></p>`
    );
    source4.insertAdjacentHTML("beforeend", `<p class="source-link">Source: <a href="https://www.bbc.com/future/article/20200710-why-clothes-are-so-hard-to-recycle">BBC</a></p>`);
    source5.insertAdjacentHTML(
      "beforeend",
      `<p class="source-link">Source: <a href="https://www.europarl.europa.eu/topics/en/article/20201208STO93327/the-impact-of-textile-production-and-waste-on-the-environment-infographics">The European Parliament</a></p>`
    );
    source6.insertAdjacentHTML(
      "beforeend",
      `<p class="source-link">Source: <a href="https://www.europarl.europa.eu/topics/en/article/20201208STO93327/the-impact-of-textile-production-and-waste-on-the-environment-infographics">The European Parliament</a></p>`
    );
  }
}

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 700px)");

// Call listener function at run time
myFunction(x);

// Attach listener function on state changes
x.addEventListener("change", function () {
  myFunction(x);
});
