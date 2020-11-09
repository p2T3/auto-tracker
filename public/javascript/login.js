// Front-end for the 'sign-up' and 'login' pages.

//////////////////////////////////////////////////////////////////////////////////////////////
// Handle the 'sign-up' activity
// async function signupFormHandler(event) {
//     event.preventDefault();

//     // Get the data from the sign-up form
//     const first_name = document.querySelector('#first_name-signup').value.trim();
//     const last_name  = document.querySelector('#last_name-signup').value.trim();
//     const email      = document.querySelector('#email-signup').value.trim();
//     const password   = document.querySelector('#password-signup').value.trim();

//     if (username && email && password) {  // Only do this if all data exists
//         const response = await fetch('/api/owners', {
//             method: 'post',
//             body: JSON.stringify({
//                 first_name,
//                 last_name,
//                 email,
//                 password
//             }),
//             headers: { 'Content-Type': 'application/json' }
//         //}).then((response) => { console.log(response) })   // don't need this with async/await
//         })

//         // Check the response status
//         if( response.ok ) {
//             document.location.replace('/vehicle-dashboard');
//         }
//         else {
//             alert( response.statusText );
//         }
//     }

// }



//////////////////////////////////////////////////////////////////////////////////////////////
// Handle the 'login' activity
async function loginFormHandler(event) {
    event.preventDefault();

    // Get the data from the form
    const email    = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {  // Only do this if all data exists
        const response = await fetch('/api/owners/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        // Check the response status

        if( response.ok ) {
            console.log( "Login response: ", response );
            document.location.replace('/vehicle');
        }
        else {
            alert( response.statusText );
        }
    }

}
  

  // The 'listeners' for the submit buttons on the forms.
  //document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
