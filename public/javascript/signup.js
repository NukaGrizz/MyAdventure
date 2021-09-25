  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const recaptchaResponse = grecaptcha.getResponse();
    
    if (recaptchaResponse.length != 0) {
        
      if (username && email && password) {
        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
          document.location.replace('/dashboard/');
        } else {
          alert(response.statusText);
        }
      }
    } else {
      alert('Please fill out Capatcha verification');
    }
    }

   


  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  