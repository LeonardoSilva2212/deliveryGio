document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-dropdown').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const dropdownId = toggle.dataset.dropdown;
            const dropdownMenu = document.getElementById(dropdownId);
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    });

    document.getElementById('distance-range').addEventListener('input', (event) => {
        document.getElementById('distance-value').textContent = `${event.target.value} km`;
    });
});
