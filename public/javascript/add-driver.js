async function addDriver(event) {
    event.preventDefault();

    const first_name = document.querySelector('input[name="first_name"]').value.trim();
    const last_name = document.querySelector('input[name="last_name"]').value.trim();
    const relation = document.querySelector('input[name="relation"]').value.trim();

    const response = await fetch('/api/drivers', {
        method: "POST",
        body: JSON.stringify({
            first_name,
            last_name,
            relation
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace('/driver');
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector("#add-driver")
    .addEventListener("click", addDriver);