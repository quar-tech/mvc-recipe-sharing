const newFormHandler = async (event) => {
    event.preventDefault();
  
    const commentBody = document.querySelector('#comment-body').value.trim();
    const recipeId = document.querySelector('#recipe-id').value.trim();
  
    if (commentBody) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ body: commentBody, recipe_id: recipeId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/recipes/${recipeId}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  