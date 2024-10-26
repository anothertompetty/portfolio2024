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
        customCursor.style.display = 'block';
    }

    function hideCursor() {
        customCursor.style.opacity = '0';
        setTimeout(() => {
            customCursor.style.display = 'none';
        }, 300); // Match this to your transition time
    }

    document.querySelectorAll('.image-gallery img').forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            const cursorText = e.target.getAttribute('data-cursor-text');
            customCursor.textContent = cursorText;
            showCursor();
        });

        img.addEventListener('mousemove', updateCursorPosition);

        img.addEventListener('mouseleave', hideCursor);
    });
});