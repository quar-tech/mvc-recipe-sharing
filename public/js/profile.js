const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#recipe-name').value.trim();
  const ingredients = document.querySelector('#recipe-ingredients').value.trim();
  const description = document.querySelector('#recipe-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({ name, ingredients, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create recipe');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete recipe');
    }
  }
};



document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

