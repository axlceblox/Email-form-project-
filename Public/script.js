document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('status');
  const btn = e.target.querySelector('button');

  if (!email || !message) return;

  btn.disabled = true;
  status.textContent = 'Sending...';
  status.className = '';

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      status.textContent = 'Message sent successfully!';
      status.className = 'success';
      e.target.reset();
    } else {
      throw new Error(data.error || 'Failed to send');
    }
  } catch (err) {
    status.textContent = err.message;
    status.className = 'error';
  } finally {
    btn.disabled = false;
  }
});
