// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Handle search functionality
    const searchInput = document.querySelector('input[placeholder="Search FootballVerse (players/teams)"]');
    const searchButton = searchInput.nextElementSibling;
    
    // Search button click handler
    searchButton.addEventListener('click', handleSearch);
    
    // Search on Enter key press
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Add loading state
            searchButton.innerHTML = '<span class="material-icons animate-spin">refresh</span>';
            
            // Simulate search (replace with actual search logic)
            setTimeout(() => {
                console.log('Searching for:', searchTerm);
                alert(`Searching for: ${searchTerm}\nThis would redirect to search results page.`);
                searchButton.innerHTML = 'Search';
            }, 1000);
        } else {
            searchInput.focus();
            searchInput.classList.add('animate-pulse');
            setTimeout(() => {
                searchInput.classList.remove('animate-pulse');
            }, 1000);
        }
    }
    
    // Handle carousel scrolling for AI Insights
    const carousel = document.querySelector('.overflow-x-auto');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('cursor-grabbing');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            e.preventDefault();
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('cursor-grabbing');
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('cursor-grabbing');
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
        
        // Touch support for mobile
        let startTouch;
        carousel.addEventListener('touchstart', (e) => {
            startTouch = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!startTouch) return;
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startTouch) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Handle match card hover effects
    const matchCards = document.querySelectorAll('.bg-gray-700');
    matchCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
        
        // Add click handler for match details
        card.addEventListener('click', () => {
            const teams = card.querySelectorAll('.font-medium');
            if (teams.length >= 2) {
                const team1 = teams[0].textContent;
                const team2 = teams[1].textContent;
                alert(`Match Details: ${team1} vs ${team2}\nThis would open match details page.`);
            }
        });
    });
    
    // Handle analytics card interactions with ripple effect
    const analyticsCards = document.querySelectorAll('.bg-gray-50');
    analyticsCards.forEach(card => {
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        
        card.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            card.appendChild(ripple);
            
            // Get analytics type
            const analyticsType = card.querySelector('.font-medium').textContent;
            
            setTimeout(() => {
                ripple.remove();
                console.log('Analytics clicked:', analyticsType);
                alert(`Opening ${analyticsType} analytics...\nThis would navigate to detailed analytics page.`);
            }, 600);
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
    
    // Handle navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                const linkText = link.textContent.trim();
                
                // Add visual feedback
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
                
                // Simulate navigation
                if (linkText.includes('Match')) {
                    alert('Navigating to Match section...');
                } else if (linkText.includes('Teams')) {
                    alert('Navigating to Teams section...');
                } else if (linkText.includes('Explore')) {
                    alert('Exploring FootballVerse features...');
                }
            }
        });
    });
    
    // Handle floating chat button
    const chatButton = document.querySelector('.fixed.bottom-6.right-6');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            chatButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                chatButton.style.transform = 'scale(1)';
                alert('Opening chat support...\nThis would open a chat widget.');
            }, 150);
        });
        
        // Add pulse animation on hover
        chatButton.addEventListener('mouseenter', () => {
            chatButton.style.animation = 'pulse 1s infinite';
        });
        
        chatButton.addEventListener('mouseleave', () => {
            chatButton.style.animation = '';
        });
    }
    
    // Handle carousel item clicks
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h4').textContent;
            alert(`Opening article: ${title}\nThis would navigate to the full article.`);
        });
        
        // Enhanced hover effect for carousel items
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
            item.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Handle discussion forum links
    const discussionTitles = document.querySelectorAll('h4.hover\\:text-teal-500');
    discussionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const discussionTitle = title.textContent;
            alert(`Opening discussion: ${discussionTitle}\nThis would navigate to the forum thread.`);
        });
    });
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add loading states for external links
    document.querySelectorAll('a:not([href^="#"]):not([href="#"])').forEach(link => {
        link.addEventListener('click', (e) => {
            // Add loading indicator
            const originalText = link.innerHTML;
            link.innerHTML = '<span class="material-icons animate-spin text-sm">refresh</span> Loading...';
            
            // Reset after a short delay (in real app, this would be handled by page navigation)
            setTimeout(() => {
                link.innerHTML = originalText;
            }, 2000);
        });
    });
    
    console.log('FootballVerse interactive features loaded successfully!');
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .animate-pulse {
        animation: pulse 1s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Event Listeners for index.html
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter subscription
    const newsletterForm = document.querySelector('form');
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

    // Chat button functionality
    const chatButton = document.querySelector('button[onclick*="chat.html"]');
    chatButton.addEventListener('click', function() {
        window.location.href = 'chat.html';
    });

    // Navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });

    // Analytics section links
    const analyticsLinks = document.querySelectorAll('a[href*="analytics.html"]');
    analyticsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'analytics.html';
        });
    });

    // Forum links
    const forumLinks = document.querySelectorAll('a[href*="forum.html"]');
    forumLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'forum.html';
        });
    });
});