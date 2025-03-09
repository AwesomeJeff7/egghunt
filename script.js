document.addEventListener('DOMContentLoaded', () => {
    const eggSpots = document.querySelectorAll('.egg-spot');
    const eggsFoundElement = document.getElementById('eggs-found');
    const totalEggsElement = document.getElementById('total-eggs');
    
    let eggsFound = 0;
    const totalEggs = eggSpots.length;
    
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

                // Check if all eggs are found
                if (eggsFound === totalEggs) {
                    setTimeout(() => {
                        showMessage('Congratulations! You found all the eggs! 🏆');
                    }, 1000);
                }
            }
        });
    });
});
