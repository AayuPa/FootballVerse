// Event Listeners for Landing_Page_Teams.html
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('input[placeholder="Search teams"]');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const teamCards = document.querySelectorAll('.grid-cols-\\[repeat\\(auto-fit\\,minmax\\(158px\\,1fr\\)\\)\\] a');
        
        teamCards.forEach(card => {
            const teamName = card.querySelector('h2').textContent.toLowerCase();
            if (teamName.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Team card click handlers
    const teamCards = document.querySelectorAll('.grid-cols-\\[repeat\\(auto-fit\\,minmax\\(158px\\,1fr\\)\\)\\] a');
    teamCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const teamName = this.querySelector('h2').textContent;
            window.location.href = `team-details.html?team=${encodeURIComponent(teamName.toLowerCase().replace(/\s+/g, '-'))}`;
        });
    });

    // Letter navigation
    const letterLinks = document.querySelectorAll('a[href*="teams-by-letter.html"]');
    letterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const letter = this.getAttribute('href').split('=')[1];
            window.location.href = `teams-by-letter.html?letter=${letter}`;
        });
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

    // Profile click handler
    const profileButton = document.querySelector('div[onclick*="profile.html"]');
    if (profileButton) {
        profileButton.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }

    // Language settings button
    const languageButton = document.querySelector('button[onclick*="language-settings.html"]');
    if (languageButton) {
        languageButton.addEventListener('click', function() {
            window.location.href = 'language-settings.html';
        });
    }
}); 