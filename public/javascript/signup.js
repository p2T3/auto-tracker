//////////////////////////////////////////////////////////////////////////////////////////////
// Handle the 'sign-up' activity
async function signupFormHandler(event) {
  event.preventDefault();
  // // Get the data from the sign-up form
  const first_name = document.querySelector(".first_name-signup").value.trim();
  const last_name = document.querySelector(".last_name-signup").value.trim();
  const email = document.querySelector(".email-signup").value.trim();
  const password = document.querySelector(".password-signup").value.trim();

  if (email && password) {
    const response = await fetch("/api/owners", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // check the response status
    if (response.ok) {
      document.location.replace("/driver");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
