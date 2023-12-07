// Select all elements with the class 'dropdown'
const dropdowns = document.querySelectorAll('.dropdown');

// Function to open the menu
function openMenu(dropdown) {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');

    select.classList.add('select-clicked');
    caret.classList.add('caret-rotate');
    menu.classList.add('menu-open');
}

// Function to close the menu
function closeMenu(dropdown) {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');

    select.classList.remove('select-clicked');
    caret.classList.remove('caret-rotate');
    menu.classList.remove('menu-open');
}

// For each dropdown element found
dropdowns.forEach(dropdown => {
    // Select specific elements within the current dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    // Add mouseenter event to the 'select' element
    select.addEventListener('mouseenter', () => {
        openMenu(dropdown);
    });

    // Add mouseleave event to the 'select' element
    menu.addEventListener('mouseleave', () => {
        closeMenu(dropdown);
    });

    // For each option within the menu
    options.forEach(option => {
        // Add click event to each option
        option.addEventListener('click', () => {
            // Set the inner text of the selected element
            selected.innerText = option.innerText;

            // Remove classes and set only the clicked option as active
            closeMenu(dropdown);
            options.forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});

// Close the dropdown when clicking outside the dropdown
document.addEventListener('click', (event) => {
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.menu');
        if (event.target !== dropdown && !dropdown.contains(event.target)) {
            closeMenu(dropdown);
        }
    });
});
