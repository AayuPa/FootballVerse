// Event Listeners for Team-Stats.html
document.addEventListener('DOMContentLoaded', function() {
    // View toggle functionality
    const viewRadios = document.querySelectorAll('input[name="view"]');
    const playersContainer = document.querySelector('.grid-cols-2.md\\:grid-cols-5');
    
    viewRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                if (this.parentElement.textContent.includes('List')) {
                    playersContainer.classList.remove('grid-cols-2', 'md:grid-cols-5');
                    playersContainer.classList.add('flex', 'flex-col', 'gap-4');
                } else {
                    playersContainer.classList.remove('flex', 'flex-col', 'gap-4');
                    playersContainer.classList.add('grid-cols-2', 'md:grid-cols-5');
                }
            }
        });
    });

    // Player card click handlers
    const playerCards = document.querySelectorAll('.bg-gray-50.rounded-xl.p-3');
    playerCards.forEach(card => {
        card.addEventListener('click', function() {
            const playerName = this.querySelector('.font-semibold').textContent;
            window.location.href = `player-stats.html?player=${encodeURIComponent(playerName.toLowerCase().replace(/\s+/g, '-'))}`;
        });
    });

    // Season statistics expandable sections
    const expandableSections = document.querySelectorAll('.bg-gray-50.rounded-xl.p-4.mt-2');
    expandableSections.forEach(section => {
        section.addEventListener('click', function() {
            const content = this.querySelector('.text-gray-400');
            if (content) {
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    // Competition selector
    const competitionSelect = document.querySelector('select:first-of-type');
    competitionSelect.addEventListener('change', function() {
        // Here you would typically fetch and update statistics based on selected competition
        console.log('Selected competition:', this.value);
    });

    // Season selector
    const seasonSelect = document.querySelector('select:nth-of-type(2)');
    seasonSelect.addEventListener('change', function() {
        // Here you would typically fetch and update statistics based on selected season
        console.log('Selected season:', this.value);
    });

    // Navigation links
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });

    // Chat button functionality
    const chatButton = document.querySelector('button[onclick*="chat.html"]');
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            window.location.href = 'chat.html';
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            if (email) {
                // Here you would typically send this to your backend
                alert('Thank you for subscribing to FootballVerse newsletter!');
                emailInput.value = '';
            }
        });
    }
}); 