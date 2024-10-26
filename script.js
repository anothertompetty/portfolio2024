document.addEventListener('DOMContentLoaded', function() {
    const customCursor = document.getElementById('custom-cursor');
    const imageGallery = document.querySelector('.image-gallery');
    let isOverImage = false;
    let cursorHideTimeout;
    
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
            }, 300); // Match this to your transition time
        }, 50); // Small delay to prevent flickering
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

    // Update cursor position even when not over images
    document.addEventListener('mousemove', updateCursorPosition);
});