async function deleteVehicle(event) {
  event.preventDefault();

  console.log(this.id);
}

document
  .querySelector("#delete-vehicle")
  .addEventListener("click", deleteVehicle);
