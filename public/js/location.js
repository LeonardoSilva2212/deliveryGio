// script.js
document.getElementById('toggle-location').addEventListener('click', function() {
    const inputField = document.getElementById('location-input');
    inputField.style.display = inputField.style.display === 'inline-block' ? 'none' : 'inline-block';
    inputField.focus();
});

document.getElementById('location-input').addEventListener('blur', function() {
    const inputField = document.getElementById('location-input');
    const displayField = document.getElementById('location-display');
    if (inputField.value.trim() !== '') {
        displayField.textContent = inputField.value;
    }
    inputField.style.display = 'none';
});
