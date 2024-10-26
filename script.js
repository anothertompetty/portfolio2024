document.addEventListener('DOMContentLoaded', function() {
    const customCursor = document.getElementById('custom-cursor');
    
    if (!customCursor) {
        console.error('Custom cursor element not found!');
        return;
    }

    function updateCursorPosition(e) {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    }

    function showCursor() {
        customCursor.style.opacity = '1';
    }

    function hideCursor() {
        customCursor.style.opacity = '0';
    }

    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', showCursor);

    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', hideCursor);

    // Update cursor position
    document.addEventListener('mousemove', updateCursorPosition);

    // Default cursor text
    customCursor.textContent = '•';

    document.querySelectorAll('.image-gallery img').forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            const cursorText = e.target.getAttribute('data-cursor-text');
            customCursor.textContent = cursorText;
        });

        img.addEventListener('mouseleave', () => {
            customCursor.textContent = '•';
        });
    });

    // Show cursor initially if mouse is already in the window
    if (document.hasFocus()) {
        showCursor();
    }
});
