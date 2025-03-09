document.addEventListener('DOMContentLoaded', () => {
    const eggSpots = document.querySelectorAll('.egg-spot');
    const eggsFoundElement = document.getElementById('eggs-found');
    const totalEggsElement = document.getElementById('total-eggs');
    const coalSpots = document.querySelectorAll('.coal-spot');
    const ovens = document.querySelectorAll('.oven');
    const coalCountElement = document.getElementById('coal-count');
    
    let eggsFound = 0;
    let coalCount = 0;
    const totalEggs = eggSpots.length + ovens.length; // Regular eggs + potential oven eggs
    
    // Update total eggs display
    totalEggsElement.textContent = totalEggs;

    // Function to show message
    function showMessage(text) {
        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = text;
        document.body.appendChild(message);
        message.style.display = 'block';
        
        setTimeout(() => {
            message.style.display = 'none';
            document.body.removeChild(message);
        }, 2000);
    }

    // Add click handlers to all egg spots
    eggSpots.forEach(spot => {
        spot.addEventListener('click', function() {
            if (!this.classList.contains('found')) {
                this.classList.add('found');
                eggsFound++;
                eggsFoundElement.textContent = eggsFound;
                showMessage('You found an egg! 🎉');
                checkWinCondition();
            }
        });
    });

    // Coal spot click handler
    coalSpots.forEach(spot => {
        spot.addEventListener('click', function() {
            if (!this.classList.contains('collected')) {
                this.classList.add('collected');
                coalCount++;
                coalCountElement.textContent = coalCount;
                
                // Create draggable coal
                const coal = document.getElementById('coal-template').cloneNode(true);
                coal.style.display = 'block';
                coal.style.left = (event.clientX - 15) + 'px';
                coal.style.top = (event.clientY - 15) + 'px';
                document.body.appendChild(coal);
                
                makeDraggable(coal);
                showMessage('You found coal! Drag it to an oven! 🪨');
            }
        });
    });

    // Make elements draggable
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            checkOvenCollision(element);
        }
    }

    // Check if coal is dropped on an oven
    function checkOvenCollision(coalElement) {
        const coalRect = coalElement.getBoundingClientRect();
        
        ovens.forEach(oven => {
            const ovenRect = oven.getBoundingClientRect();
            
            if (isColliding(coalRect, ovenRect) && oven.getAttribute('data-needs-coal') === 'true') {
                // Coal dropped on oven successfully
                oven.setAttribute('data-needs-coal', 'false');
                coalElement.remove();
                coalCount--;
                coalCountElement.textContent = coalCount;
                
                // Create egg
                eggsFound++;
                eggsFoundElement.textContent = eggsFound;
                oven.innerHTML = '🥚';
                showMessage('The oven created an egg! 🎉');
                checkWinCondition();
            }
        });
    }

    // Check for collision between two rectangles
    function isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    // Check if all eggs have been found
    function checkWinCondition() {
        if (eggsFound === totalEggs) {
            setTimeout(() => {
                showMessage('Congratulations! You found all the eggs! 🏆');
            }, 1000);
        }
    }
});
