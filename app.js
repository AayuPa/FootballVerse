// FootballVerse Matches App
class FootballVerseApp {
    constructor() {
        this.competitions = [
            {"id": "all", "name": "All Competitions", "shortName": "All", "color": "#14B8A6"},
            {"id": "premier-league", "name": "Premier League", "shortName": "EPL", "color": "#37003c"},
            {"id": "champions-league", "name": "UEFA Champions League", "shortName": "UCL", "color": "#00336a"},
            {"id": "la-liga", "name": "La Liga", "shortName": "LL", "color": "#ff6600"},
            {"id": "serie-a", "name": "Serie A", "shortName": "SA", "color": "#008fd7"},
            {"id": "bundesliga", "name": "Bundesliga", "shortName": "BL", "color": "#d20515"},
            {"id": "fa-cup", "name": "FA Cup", "shortName": "FAC", "color": "#1f1f1f"},
            {"id": "efl-cup", "name": "EFL Cup", "shortName": "EFL", "color": "#00a650"},
            {"id": "europa-league", "name": "UEFA Europa League", "shortName": "UEL", "color": "#f68712"}
        ];

        this.matches = [
            {
                "id": 1,
                "homeTeam": "Manchester United",
                "awayTeam": "Liverpool",
                "homeScore": 2,
                "awayScore": 1,
                "status": "finished",
                "competition": "premier-league",
                "date": "2024-05-30",
                "time": "17:30",
                "venue": "Old Trafford"
            },
            {
                "id": 2,
                "homeTeam": "Real Madrid",
                "awayTeam": "Barcelona",
                "homeScore": null,
                "awayScore": null,
                "status": "upcoming",
                "competition": "la-liga",
                "date": "2024-06-01",
                "time": "20:00",
                "venue": "Santiago Bernabéu"
            },
            {
                "id": 3,
                "homeTeam": "Bayern Munich",
                "awayTeam": "Borussia Dortmund",
                "homeScore": 3,
                "awayScore": 1,
                "status": "live",
                "competition": "bundesliga",
                "date": "2024-05-31",
                "time": "18:30",
                "venue": "Allianz Arena",
                "minute": 78
            },
            {
                "id": 4,
                "homeTeam": "Arsenal",
                "awayTeam": "Chelsea",
                "homeScore": 1,
                "awayScore": 1,
                "status": "finished",
                "competition": "premier-league",
                "date": "2024-05-30",
                "time": "15:00",
                "venue": "Emirates Stadium"
            },
            {
                "id": 5,
                "homeTeam": "Juventus",
                "awayTeam": "AC Milan",
                "homeScore": null,
                "awayScore": null,
                "status": "upcoming",
                "competition": "serie-a",
                "date": "2024-06-02",
                "time": "19:45",
                "venue": "Allianz Stadium"
            },
            {
                "id": 6,
                "homeTeam": "Manchester City",
                "awayTeam": "PSG",
                "homeScore": 2,
                "awayScore": 0,
                "status": "live",
                "competition": "champions-league",
                "date": "2024-05-31",
                "time": "20:00",
                "venue": "Etihad Stadium",
                "minute": 65
            },
            {
                "id": 7,
                "homeTeam": "Atletico Madrid",
                "awayTeam": "Sevilla",
                "homeScore": 0,
                "awayScore": 2,
                "status": "finished",
                "competition": "la-liga",
                "date": "2024-05-29",
                "time": "21:30",
                "venue": "Wanda Metropolitano"
            },
            {
                "id": 8,
                "homeTeam": "Tottenham",
                "awayTeam": "Newcastle",
                "homeScore": null,
                "awayScore": null,
                "status": "upcoming",
                "competition": "premier-league",
                "date": "2024-06-01",
                "time": "16:30",
                "venue": "Tottenham Hotspur Stadium"
            },
            {
                "id": 9,
                "homeTeam": "Inter Milan",
                "awayTeam": "Napoli",
                "homeScore": 1,
                "awayScore": 3,
                "status": "finished",
                "competition": "serie-a",
                "date": "2024-05-30",
                "time": "20:45",
                "venue": "San Siro"
            },
            {
                "id": 10,
                "homeTeam": "RB Leipzig",
                "awayTeam": "Bayer Leverkusen",
                "homeScore": null,
                "awayScore": null,
                "status": "upcoming",
                "competition": "bundesliga",
                "date": "2024-06-01",
                "time": "17:30",
                "venue": "Red Bull Arena"
            },
            {
                "id": 11,
                "homeTeam": "West Ham",
                "awayTeam": "Brighton",
                "homeScore": null,
                "awayScore": null,
                "status": "upcoming",
                "competition": "fa-cup",
                "date": "2024-06-03",
                "time": "19:45",
                "venue": "Wembley Stadium"
            },
            {
                "id": 12,
                "homeTeam": "AS Roma",
                "awayTeam": "Villarreal",
                "homeScore": 1,
                "awayScore": 1,
                "status": "live",
                "competition": "europa-league",
                "date": "2024-05-31",
                "time": "21:00",
                "venue": "Stadio Olimpico",
                "minute": 52
            }
        ];

        this.currentFilters = {
            competition: 'all',
            status: 'all',
            date: 'all',
            search: ''
        };

        this.init();
    }

    init() {
        this.renderCompetitions();
        this.renderMatches();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Competition filter buttons
        document.getElementById('competitionList').addEventListener('click', (e) => {
            if (e.target.classList.contains('competition-btn')) {
                this.setCompetitionFilter(e.target.dataset.competitionId);
            }
        });

        // Status filter
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.renderMatches();
        });

        // Date filter
        document.getElementById('dateFilter').addEventListener('change', (e) => {
            this.currentFilters.date = e.target.value;
            this.renderMatches();
        });

        // Search functionality
        document.querySelector('.search-input').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.renderMatches();
        });

        // Match card clicks
        document.getElementById('matchesContainer').addEventListener('click', (e) => {
            const matchCard = e.target.closest('.match-card');
            if (matchCard) {
                const matchId = matchCard.dataset.matchId;
                this.handleMatchClick(matchId);
            }
        });
    }

    renderCompetitions() {
        const container = document.getElementById('competitionList');
        const competitionsHTML = this.competitions.map(comp => `
            <button 
                class="competition-btn ${comp.id === this.currentFilters.competition ? 'competition-btn--active' : ''}"
                data-competition-id="${comp.id}"
                style="--comp-color: ${comp.color}"
            >
                ${comp.shortName}
            </button>
        `).join('');
        
        container.innerHTML = competitionsHTML;
    }

    setCompetitionFilter(competitionId) {
        this.currentFilters.competition = competitionId;
        this.renderCompetitions();
        this.renderMatches();
    }

    getFilteredMatches() {
        let filtered = [...this.matches];

        // Filter by competition
        if (this.currentFilters.competition !== 'all') {
            filtered = filtered.filter(match => match.competition === this.currentFilters.competition);
        }

        // Filter by status
        if (this.currentFilters.status !== 'all') {
            filtered = filtered.filter(match => match.status === this.currentFilters.status);
        }

        // Filter by date
        if (this.currentFilters.date !== 'all') {
            const today = new Date('2024-05-31'); // Current date from context
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            filtered = filtered.filter(match => {
                const matchDate = new Date(match.date);
                switch (this.currentFilters.date) {
                    case 'today':
                        return this.isSameDay(matchDate, today);
                    case 'yesterday':
                        return this.isSameDay(matchDate, yesterday);
                    case 'tomorrow':
                        return this.isSameDay(matchDate, tomorrow);
                    case 'week':
                        const weekStart = new Date(today);
                        weekStart.setDate(weekStart.getDate() - today.getDay());
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekEnd.getDate() + 6);
                        return matchDate >= weekStart && matchDate <= weekEnd;
                    default:
                        return true;
                }
            });
        }

        // Filter by search
        if (this.currentFilters.search) {
            filtered = filtered.filter(match => 
                match.homeTeam.toLowerCase().includes(this.currentFilters.search) ||
                match.awayTeam.toLowerCase().includes(this.currentFilters.search) ||
                match.venue.toLowerCase().includes(this.currentFilters.search)
            );
        }

        return filtered;
    }

    isSameDay(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    }

    groupMatchesByDate(matches) {
        const groups = {};
        const today = new Date('2024-05-31');

        matches.forEach(match => {
            const matchDate = new Date(match.date);
            let groupKey;

            if (this.isSameDay(matchDate, today)) {
                groupKey = 'Today';
            } else {
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);

                if (this.isSameDay(matchDate, yesterday)) {
                    groupKey = 'Yesterday';
                } else if (this.isSameDay(matchDate, tomorrow)) {
                    groupKey = 'Tomorrow';
                } else {
                    groupKey = matchDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    });
                }
            }

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(match);
        });

        // Sort groups by date
        const sortedGroups = {};
        const sortedKeys = Object.keys(groups).sort((a, b) => {
            if (a === 'Yesterday') return -1;
            if (b === 'Yesterday') return 1;
            if (a === 'Today') return -1;
            if (b === 'Today') return 1;
            if (a === 'Tomorrow') return -1;
            if (b === 'Tomorrow') return 1;
            return new Date(a) - new Date(b);
        });

        sortedKeys.forEach(key => {
            sortedGroups[key] = groups[key];
        });

        return sortedGroups;
    }

    renderMatches() {
        const container = document.getElementById('matchesContainer');
        const loadingState = document.getElementById('loadingState');
        const emptyState = document.getElementById('emptyState');
        const matchesCount = document.getElementById('matchesCount');

        // Show loading state briefly
        loadingState.style.display = 'flex';
        container.style.display = 'none';
        emptyState.style.display = 'none';

        setTimeout(() => {
            const filteredMatches = this.getFilteredMatches();
            
            // Update matches count
            matchesCount.querySelector('.count-text').textContent = 
                `${filteredMatches.length} match${filteredMatches.length !== 1 ? 'es' : ''}`;

            if (filteredMatches.length === 0) {
                loadingState.style.display = 'none';
                emptyState.style.display = 'flex';
                container.style.display = 'none';
                return;
            }

            const groupedMatches = this.groupMatchesByDate(filteredMatches);
            
            const matchesHTML = Object.entries(groupedMatches).map(([date, matches]) => `
                <div class="match-group">
                    <h3 class="match-group__date">${date}</h3>
                    <div class="match-group__matches">
                        ${matches.map(match => this.renderMatchCard(match)).join('')}
                    </div>
                </div>
            `).join('');

            container.innerHTML = matchesHTML;
            loadingState.style.display = 'none';
            emptyState.style.display = 'none';
            container.style.display = 'block';
        }, 300);
    }

    renderMatchCard(match) {
        const competition = this.competitions.find(c => c.id === match.competition);
        const competitionName = competition ? competition.shortName : match.competition;
        
        const statusText = match.status === 'live' && match.minute 
            ? `${match.minute}'` 
            : match.status.charAt(0).toUpperCase() + match.status.slice(1);

        const scoreDisplay = match.status === 'upcoming' 
            ? `<div class="match-time">${match.time}</div>`
            : `<div class="match-score">
                 <span>${match.homeScore || 0}</span>
                 <span class="score-separator">-</span>
                 <span>${match.awayScore || 0}</span>
               </div>`;

        return `
            <div class="match-card match-card--${match.status}" data-match-id="${match.id}">
                <div class="match-card__header">
                    <div class="match-status match-status--${match.status}">
                        ${statusText}
                    </div>
                    <div class="competition-badge" style="color: ${competition?.color || '#666'}">
                        ${competitionName}
                    </div>
                </div>
                
                <div class="match-teams">
                    <div class="team">
                        <div class="team-logo">⚽</div>
                        <div class="team-name">${match.homeTeam}</div>
                    </div>
                    
                    ${scoreDisplay}
                    
                    <div class="team team--away">
                        <div class="team-name">${match.awayTeam}</div>
                        <div class="team-logo">⚽</div>
                    </div>
                </div>
                
                <div class="match-info">
                    <div class="match-time">${match.time}</div>
                    <div class="match-venue">${match.venue}</div>
                </div>
            </div>
        `;
    }

    handleMatchClick(matchId) {
        const match = this.matches.find(m => m.id == matchId);
        if (match) {
            alert(`Match Details:\n${match.homeTeam} vs ${match.awayTeam}\nVenue: ${match.venue}\nTime: ${match.time}\nStatus: ${match.status}`);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FootballVerseApp();
});