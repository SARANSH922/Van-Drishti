// Initialize map
const map = L.map('indiaMap').setView([22.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Store state center coordinates
const stateCenters = {
  "Odisha": [20.9517, 85.0985],
  "Jharkhand": [23.6102, 85.2799],
  "Telangana": [17.9784, 79.5941],
  "Madhya Pradesh": [23.4733, 77.9470],
  "Tripura": [23.9408, 91.9882]
};

// Store cities inside each state
const stateCities = {
  "Odisha": [
    { name: "Bhubaneswar", coords: [20.2961, 85.8245] },
    { name: "Cuttack", coords: [20.4625, 85.8828] }
  ],
  "Jharkhand": [
    { name: "Ranchi", coords: [23.3441, 85.3096] },
    { name: "Jamshedpur", coords: [22.8046, 86.2029] }
  ],
  "Telangana": [
    { name: "Hyderabad", coords: [17.3850, 78.4867] },
    { name: "Warangal", coords: [17.9789, 79.5941] }
  ],
  "Madhya Pradesh": [
    { name: "Bhopal", coords: [23.2599, 77.4126] },
    { name: "Indore", coords: [22.7196, 75.8577] }
  ],
  "Tripura": [
    { name: "Agartala", coords: [23.8315, 91.2868] }
  ]
};

// Dropdown references
const stateSelect = document.getElementById('stateSelect');
const citySelect = document.getElementById('citySelect');

let cityMarker = null; // marker for city

// Handle state selection
stateSelect.addEventListener('change', () => {
  const selectedState = stateSelect.value.trim();

  // Reset city dropdown
  citySelect.innerHTML = '<option value="">--Select City--</option>';

  if (selectedState && stateCenters[selectedState]) {
    // Zoom to state
    map.setView(stateCenters[selectedState], 6);

    // Add city options
    stateCities[selectedState].forEach(city => {
      const option = document.createElement('option');
      option.value = JSON.stringify(city.coords);
      option.textContent = city.name;
      citySelect.appendChild(option);
    });
  }
});

// Handle city selection
citySelect.addEventListener('change', () => {
  const coords = JSON.parse(citySelect.value);
  if (coords && Array.isArray(coords)) {
    map.setView(coords, 9);

    // Remove old marker
    if (cityMarker) map.removeLayer(cityMarker);

    // Add new marker
    cityMarker = L.marker(coords).addTo(map).bindPopup("City").openPopup();
  }
});
