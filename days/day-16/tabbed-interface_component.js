// Exercise: Implement a tabbed interface component

document.querySelectorAll('#tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.querySelector(`[data-content="${tab}"]`).style.display = 'block';
  });
});
