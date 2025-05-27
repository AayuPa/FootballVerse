// Player data
const playerData = {
  position: 'Attacker',
  stats: {
    goals: 15,
    assists: 8,
    shotsOnTarget: 45,
    xG: 14.2,
    keyPasses: 25,
    dribbles: 52
  },
  matchRatings: [
    { match: 1, rating: 7.5, minutes: 90, cards: 0 },
    { match: 2, rating: 8.2, minutes: 85, cards: 1 },
    { match: 3, rating: 7.8, minutes: 90, cards: 0 },
    { match: 4, rating: 7.1, minutes: 75, cards: 0 },
    { match: 5, rating: 8.5, minutes: 90, cards: 0 },
    { match: 6, rating: 7.9, minutes: 88, cards: 1 },
    { match: 7, rating: 8.0, minutes: 90, cards: 0 },
    { match: 8, rating: 7.4, minutes: 82, cards: 0 },
    { match: 9, rating: 8.3, minutes: 90, cards: 0 },
    { match: 10, rating: 7.7, minutes: 79, cards: 0 }
  ],
  heatmapData: [
    // Left wing movements
    { x: 15, y: 20, value: 8 },
    { x: 20, y: 30, value: 12 },
    { x: 25, y: 40, value: 15 },
    { x: 30, y: 50, value: 10 },
    // Central movements
    { x: 45, y: 25, value: 14 },
    { x: 50, y: 35, value: 18 },
    { x: 55, y: 45, value: 16 },
    { x: 50, y: 55, value: 12 },
    // Right wing movements
    { x: 70, y: 20, value: 6 },
    { x: 75, y: 30, value: 9 },
    { x: 80, y: 40, value: 11 },
    { x: 75, y: 50, value: 7 },
    // Penalty area movements
    { x: 85, y: 35, value: 20 },
    { x: 85, y: 45, value: 22 },
    { x: 90, y: 40, value: 25 }
  ]
};

// Initialize visualizations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initRadarChart();
  initHeatmap();
  initFormTracker();
  initTabHandling();
});

// Radar Chart
function initRadarChart() {
  // Clear previous SVG
  d3.select('#radar-chart').selectAll('*').remove();

  const width = document.getElementById('radar-chart').clientWidth;
  const height = 300; // Fixed height for better visibility
  const margin = 60;
  const radius = Math.min(width, height) / 2 - margin;

  const svg = d3.select('#radar-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width/2},${height/2})`);

  const attackerAttributes = [
    'Goals', 'Assists', 'Shots on Target',
    'xG', 'Key Passes', 'Dribbles'
  ];

  const angleSlice = (Math.PI * 2) / attackerAttributes.length;

  // Scale for the axes
  const rScale = d3.scaleLinear()
    .range([0, radius])
    .domain([0, 100]);

  // Draw circular grid
  const levels = 5;
  const gridCircles = svg.selectAll('.grid-circle')
    .data(d3.range(1, levels + 1).reverse())
    .enter()
    .append('circle')
    .attr('class', 'grid-circle')
    .attr('r', d => radius / levels * d)
    .style('fill', 'none')
    .style('stroke', '#41474e')
    .style('stroke-dasharray', '4 4');

  // Add percentage labels
  const axisGrid = svg.selectAll('.axis-label')
    .data(d3.range(1, levels + 1).reverse())
    .enter()
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', 4)
    .attr('y', d => -radius / levels * d)
    .attr('dy', '0.4em')
    .style('font-size', '10px')
    .style('fill', '#a3aab2')
    .text(d => `${d * 20}%`);

  // Draw the axes
  const axes = svg.selectAll('.axis')
    .data(attackerAttributes)
    .enter()
    .append('g')
    .attr('class', 'axis');

  axes.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI/2))
    .attr('y2', (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI/2))
    .attr('class', 'line')
    .style('stroke', '#41474e')
    .style('stroke-width', '1px')
    .style('stroke-dasharray', '3 3');

  // Add attribute labels
  axes.append('text')
    .attr('class', 'attribute-label')
    .attr('x', (d, i) => rScale(120) * Math.cos(angleSlice * i - Math.PI/2))
    .attr('y', (d, i) => rScale(120) * Math.sin(angleSlice * i - Math.PI/2))
    .style('font-size', '12px')
    .style('fill', '#a3aab2')
    .style('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .text(d => d);

  // Draw the radar chart path
  const radarLine = d3.lineRadial()
    .radius(d => rScale(d.value))
    .angle((d, i) => i * angleSlice)
    .curve(d3.curveLinearClosed);

  const dataPoints = [
    { value: (playerData.stats.goals / 30) * 100 },
    { value: (playerData.stats.assists / 15) * 100 },
    { value: (playerData.stats.shotsOnTarget / 60) * 100 },
    { value: (playerData.stats.xG / 20) * 100 },
    { value: (playerData.stats.keyPasses / 40) * 100 },
    { value: (playerData.stats.dribbles / 80) * 100 }
  ];

  // Draw background path
  svg.append('path')
    .datum(dataPoints)
    .attr('class', 'radar-path-bg')
    .attr('d', radarLine)
    .style('fill', 'rgba(20, 184, 166, 0.2)')
    .style('stroke', 'none');

  // Draw hover path
  svg.append('path')
    .datum(dataPoints)
    .attr('class', 'radar-path-hover')
    .attr('d', radarLine)
    .style('fill', 'none')
    .style('stroke', '#14B8A6')
    .style('stroke-width', '2px')
    .style('filter', 'drop-shadow(0 0 5px rgba(20, 184, 166, 0.5))');

  // Add data points and percentage labels
  const dataPointsGroup = svg.selectAll('.data-point-group')
    .data(dataPoints)
    .enter()
    .append('g')
    .attr('class', 'data-point-group');

  dataPointsGroup.append('circle')
    .attr('class', 'data-point')
    .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI/2))
    .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI/2))
    .attr('r', 4)
    .style('fill', '#14B8A6')
    .style('stroke', '#000')
    .style('stroke-width', '1px')
    .on('mouseover', function() {
      d3.select(this).attr('r', 6);
      d3.select(this.parentNode).select('.value-label').style('font-size', '12px');
    })
    .on('mouseout', function() {
      d3.select(this).attr('r', 4);
      d3.select(this.parentNode).select('.value-label').style('font-size', '10px');
    });

  dataPointsGroup.append('text')
    .attr('class', 'value-label')
    .attr('x', (d, i) => rScale(d.value + 10) * Math.cos(angleSlice * i - Math.PI/2))
    .attr('y', (d, i) => rScale(d.value + 10) * Math.sin(angleSlice * i - Math.PI/2))
    .style('font-size', '10px')
    .style('fill', '#14B8A6')
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'middle')
    .text(d => Math.round(d.value) + '%');

  // Add hover effect
  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', `translate(${-width/2},${-height/2})`)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', function() {
      svg.select('.radar-path-bg').style('fill', 'rgba(47, 255, 255, 0.3)');
    })
    .on('mouseout', function() {
      svg.select('.radar-path-bg').style('fill', 'rgba(47, 255, 255, 0.2)');
    });
}

// Heatmap
function initHeatmap() {
  const width = document.getElementById('pitch-container').clientWidth;
  const height = 300;
  const pitchColor = '#1e2124';
  const lineColor = '#41474e';

  const svg = d3.select('#pitch-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Draw football pitch
  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', pitchColor)
    .attr('stroke', lineColor);

  // Add heatmap data points
  const heatmap = svg.selectAll('.heatmap-point')
    .data(playerData.heatmapData)
    .enter()
    .append('circle')
    .attr('class', 'heatmap-point')
    .attr('cx', d => d.x * width / 100)
    .attr('cy', d => d.y * height / 100)
    .attr('r', d => d.value)
    .style('fill', 'rgba(20, 184, 166, 0.3)')
    .style('stroke', 'rgba(20, 184, 166, 0.5)');
}

// Form Tracker
function initFormTracker() {
  const width = document.getElementById('form-tracker').clientWidth;
  const height = document.getElementById('form-tracker').clientHeight;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const svg = d3.select('#form-tracker')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const x = d3.scaleLinear()
    .domain([1, 10])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top]);

  // Add the line
  const line = d3.line()
    .x(d => x(d.match))
    .y(d => y(d.rating));

  svg.append('path')
    .datum(playerData.matchRatings)
    .attr('fill', 'none')
    .attr('stroke', '#14B8A6')
    .attr('stroke-width', 2)
    .attr('d', line);

  // Add points
  svg.selectAll('.point')
    .data(playerData.matchRatings)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('cx', d => x(d.match))
    .attr('cy', d => y(d.rating))
    .attr('r', 4)
    .attr('fill', '#14B8A6');

  // Add axes
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(10))
    .style('color', '#a3aab2');

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .style('color', '#a3aab2');
}

// Tab Handling
function initTabHandling() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      // Hide all tab contents
      tabContents.forEach(content => content.classList.add('hidden'));
      // Show selected tab content
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.remove('hidden');
    });
  });
}