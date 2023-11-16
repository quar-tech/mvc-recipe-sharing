const mailHandler = async (event) => {
    if (event.target.hasAttribute('data-desc')) {
      const description = event.target.getAttribute('data-desc');
  
      console.log('description', description);

      const response = await fetch(`/api/recipes/email`, {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: {
            'Content-Type':'application/json'
        }
      });
      
      if (response.redirected) {
        window.location.assign('/login');
      } else if (response.ok) {
        console.log('response',response);
        
        // document.location.replace('/profile');
        alert('Mail sent');
      } else {
        alert('Failed to send mail');
      }
    }
  };

  document
    .querySelector('#mail-button')
    .addEventListener('click', mailHandler);