async function addVehicle(event) {
  //   event.preventDefault();

  const make = document.querySelector('input[name="make"]').value.trim();
  const model = document.querySelector('input[name="model"]').value.trim();
  const color = document.querySelector('input[name="color"]').value.trim();
  const year = document.querySelector('input[name="year"]').value.trim();
  const mileage = document
    .querySelector('input[name="purchase-mileage"]')
    .value.trim();
  const vin = document.querySelector('input[name="vin"]').value.trim();
  const license_plate = document
    .querySelector('input[name="license-plate"]')
    .value.trim();
  const toll_tag = document
    .querySelector('input[name="tolltag-number"]')
    .value.trim();
  const registration_expiration = document
    .querySelector('input[name="registration-expiration"]')
    .value.trim();
  const insurance_expiration = document
    .querySelector('input[name="insurance-expiration"]')
    .value.trim();
  const oil_mileage = document
    .querySelector('input[name="oil-change-mileage"]')
    .value.trim();
  const tire_mileage = document
    .querySelector('input[name="tire-change-mileage"]')
    .value.trim();
  const image_url = document
    .querySelector('input[name="image_url"]')
    .value.trim();

  // Hard-coded both values for now for testing purposes but need to figure out how to grab this information.

  const response = await fetch("/api/autos", {
    method: "POST",
    body: JSON.stringify({
      image_url,
      make,
      model,
      color,
      year,
      mileage,
      vin,
      license_plate,
      toll_tag,
      registration_expiration,
      insurance_expiration,
      oil_mileage,
      tire_mileage,
      driver_id,
    }),
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.ok) {
    document.location.replace("/vehicle");
  } else {
    alert(response.statusText);
  }
}

// document.querySelector("#add-vehicle").addEventListener("click", addVehicle);
