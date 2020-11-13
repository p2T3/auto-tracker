async function getStarted(event) {
  event.preventDefault();

  document.location.replace("/signup");
}

document.querySelector("#get-started").addEventListener("click", getStarted);
