document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('viewport');
    const content = document.getElementById('content');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    let isDragging = false;
    let startX, startY;
    let initialX, initialY;
    let scale = 1;

    // Function to scale the content
    const scaleContent = (factor) => {
        scale *= factor;
        content.style.transform = `scale(${scale})`;
    };

    // Event listener for zoom in button
    zoomInButton.addEventListener('click', () => {
        scaleContent(1.1); // Increase scale by 10%
    });

    // Event listener for zoom out button
    zoomOutButton.addEventListener('click', () => {
        scaleContent(0.9); // Decrease scale by 10%
    });

    viewport.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        initialX = content.offsetLeft;
        initialY = content.offsetTop;
        viewport.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        viewport.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            content.style.left = `${initialX + dx}px`;
            content.style.top = `${initialY + dy}px`;
        }
    });

    const images = document.querySelectorAll('.img-button');
    images.forEach((img, index) => {
        img.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from propagating to the parent container
            // Open popup here
            document.getElementById('popup').classList.remove('hidden');
            document.getElementById('popup').style.right = '0';

            // Set current image index
            const currentImageIndex = index + 1;

            // Load input values for current image
            document.getElementById('input1').value = inputValues[`image${currentImageIndex}`].input1;
            document.getElementById('input2').value = inputValues[`image${currentImageIndex}`].input2;
            document.getElementById('input3').value = inputValues[`image${currentImageIndex}`].input3;
        });
    });

    const closePopup = document.getElementById('close-popup');
    closePopup.addEventListener('click', () => {
        document.getElementById('popup').style.right = '-300px';
        setTimeout(() => document.getElementById('popup').classList.add('hidden'), 300);
    });

    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', () => {
        const input1Value = document.getElementById('input1').value;
        const input2Value = document.getElementById('input2').value;
        const input3Value = document.getElementById('input3').value;

        // Get current image index (for demonstration, let's assume it's 1)
        const currentImageIndex = 1;

        // Prepare data to send to the server
        const data = {
            input1: input1Value,
            input2: input2Value,
            input3: input3Value,
            image_index: currentImageIndex
        };

        // Send data to the server
        fetch('/save_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
