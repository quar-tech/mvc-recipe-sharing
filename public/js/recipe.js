const mailHandler = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-desc')) {
      const description = event.target.getAttribute('data-desc');
      const toEmail = document.querySelector('#input-email').value.trim();
      if (!toEmail) {
        alert('No email address provided.');
        return;
      }

      const response = await fetch(`/api/recipes/email`, {
        method: 'POST',
        body: JSON.stringify({ description, toEmail }),
        headers: {
            'Content-Type':'application/json'
        }
      });
      
      if (response.redirected) {
        window.location.assign('/login');
      } else if (response.ok) {
          console.log('response',response);
          alert('Mail sent.');
      } else {
          alert('Failed to send mail.');
      }
    }
  };

  document
    .querySelector('.input-form')
    .addEventListener('submit', mailHandler);