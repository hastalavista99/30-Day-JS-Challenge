document.getElementById('list-container').addEventListener('click', e => {
    if (e.target.matches('.list-item')) {
        console.log(`Clicked on item: ${e.target.textContent}`);
    }
});

// This works even for items added later:
// const newItem = document.createElement('div');
// newItem.className = 'list-item';
// newItem.textContent = 'New Item';
// listContainer.appendChild(newItem);
