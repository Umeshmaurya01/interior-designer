const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Hide any previous success message
  successMessage.style.display = 'none';

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('http://localhost:5000/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Clear form
      form.reset();
      // Show success message
      successMessage.style.display = 'flex';
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    alert('Error sending message. Please try again.');
    console.error('Error:', error);
  }
});