async function getStarted(event) {
  event.preventDefault();

  document.location.replace("/login");
}

document.querySelector("#get-started").addEventListener("click", getStarted);
