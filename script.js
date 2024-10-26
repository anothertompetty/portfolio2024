const customCursor = document.getElementById('custom-cursor');
let cursorVisible = false;
let cursorHidden = null;

function showCursor() {
    if (!cursorVisible) {
        cursorVisible = true;
        customCursor.style.opacity = '1';
    }
    if (cursorHidden) {
        clearTimeout(cursorHidden);
        cursorHidden = null;
    }
}

function hideCursor() {
    if (cursorVisible && !cursorHidden) {
        cursorHidden = setTimeout(() => {
            customCursor.style.opacity = '0';
            cursorVisible = false;
            cursorHidden = null;
        }, 300);
    }
}

document.querySelectorAll('.image-gallery img').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const cursorText = e.target.getAttribute('data-cursor-text');
        customCursor.textContent = cursorText;
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
        showCursor();
    });

    img.addEventListener('mouseleave', hideCursor);
});

// Hide custom cursor when leaving the window
document.addEventListener('mouseleave', hideCursor);
