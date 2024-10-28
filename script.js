document.addEventListener('DOMContentLoaded', function() {
    const customCursor = document.getElementById('custom-cursor');
    const imageGallery = document.querySelector('.image-gallery');
    const themeToggle = document.getElementById('theme-toggle');
    let isOverImage = false;
    let cursorHideTimeout;
    
    // Theme toggle functionality
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Set initial theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);

    // Cursor functionality
    if (!customCursor || !imageGallery) {
        console.error('Custom cursor or image gallery element not found!');
        return;
    }

    function updateCursorPosition(e) {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    }

    function showCursor(text) {
        clearTimeout(cursorHideTimeout);
        customCursor.textContent = text;
        customCursor.style.opacity = '1';
        customCursor.style.display = 'block';
    }

    function hideCursor() {
        cursorHideTimeout = setTimeout(() => {
            customCursor.style.opacity = '0';
            setTimeout(() => {
                if (!isOverImage) {
                    customCursor.style.display = 'none';
                }
            }, 300);
        }, 50);
    }

    imageGallery.addEventListener('mousemove', (e) => {
        updateCursorPosition(e);
        const target = e.target;
        if (target.tagName === 'IMG') {
            isOverImage = true;
            const cursorText = target.getAttribute('data-cursor-text');
            showCursor(cursorText);
        } else {
            isOverImage = false;
            hideCursor();
        }
    });

    imageGallery.addEventListener('mouseleave', () => {
        isOverImage = false;
        hideCursor();
    });

    document.addEventListener('mousemove', updateCursorPosition);
});