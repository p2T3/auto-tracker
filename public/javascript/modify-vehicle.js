async function deleteVehicle(event) {
  event.preventDefault();
}

//   $(".modal").text($(this).attr("data-id"));
document
  .querySelector("#delete-vehicle")
  .addEventListener("click", deleteVehicle);

// document
//   .querySelector("#save-vehicle")
//   .addEventListener("click", function (event) {
//     let dataId = event.target.getAttribute("data-id");

//     console.log(dataId);
//   });


  