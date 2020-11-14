// async function deleteVehicle(event) {
//   event.preventDefault();
// }

// //   $(".modal").text($(this).attr("data-id"));
// document
//   .querySelector("#delete-vehicle")
//   .addEventListener("click", deleteVehicle);

document.querySelector("#vehicle-card").addEventListener("click", function (event) {
  let vehicleId = document.querySelector(".modal-car-id").innerHTML;

  console.log("PLEASE GIVE ME ID", vehicleId);
});

//   let asdghdsag = document.querySelector(".card").value;
//   console.log("PLEASE GIVE ME ID",asdghdsag);

// document
//   .querySelector("#save-vehicle")
//   .addEventListener("click", function (event) {
//     // let dataId = event.target.getAttribute("data-id");

//     let vehicleId = document.querySelector(".modal-car-id").innerHTML;

//     console.log("PLEASE GIVE ME ID",vehicleId);
   
//   });
