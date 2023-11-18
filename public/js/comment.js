const newFormHandler = async (event) => {
    event.preventDefault();
  
    const commentBody = document.querySelector('#comment-body').value.trim();
    const recipeId = document.querySelector('#recipe-id').value.trim();
  
    if (commentBody) {
        console.log('hello')
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
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
        console.log(id)
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);

  document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);
  