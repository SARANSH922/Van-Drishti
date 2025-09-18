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
});// DOM Elements
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const profileImage = document.getElementById('profileImage');
const defaultAvatar = document.getElementById('defaultAvatar');
const photoUpload = document.getElementById('photoUpload');
const removePhotoBtn = document.querySelector('.remove-photo');
const formInputs = document.querySelectorAll('form input, form select');
const saveBtn = document.querySelector('button.primary');
const cancelBtn = document.querySelector('button.secondary');

// Sidebar Animation
let sidebarTimer;
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    clearTimeout(sidebarTimer);
    
    // Add pulse effect to mini logo
    if (sidebar.classList.contains('collapsed')) {
        const miniLogo = document.querySelector('.mini-logo');
        miniLogo.classList.add('pulse');
        sidebarTimer = setTimeout(() => miniLogo.classList.remove('pulse'), 1000);
    }
});

// Profile Photo Handling
photoUpload.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.style.opacity = '0';
            setTimeout(() => {
                profileImage.src = e.target.result;
                profileImage.style.display = 'block';
                defaultAvatar.style.display = 'none';
                profileImage.style.opacity = '1';
            }, 200);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
});

removePhotoBtn.addEventListener('click', function() {
    profileImage.style.opacity = '0';
    setTimeout(() => {
        profileImage.src = '';
        profileImage.style.display = 'none';
        defaultAvatar.style.display = 'flex';
        defaultAvatar.style.opacity = '0';
        setTimeout(() => {
            defaultAvatar.style.opacity = '1';
        }, 50);
    }, 200);
});

// Form Handling
let formChanged = false;
formInputs.forEach(input => {
    const originalValue = input.value;
    input.addEventListener('input', () => {
        formChanged = true;
        saveBtn.classList.add('pulse');
        setTimeout(() => saveBtn.classList.remove('pulse'), 500);
    });
});

// Save Changes Animation
saveBtn.addEventListener('click', () => {
    if (!formChanged) return;
    
    saveBtn.classList.add('saving');
    saveBtn.textContent = 'Saving...';
    
    setTimeout(() => {
        saveBtn.classList.remove('saving');
        saveBtn.classList.add('saved');
        saveBtn.textContent = 'Saved!';
        
        setTimeout(() => {
            saveBtn.classList.remove('saved');
            saveBtn.textContent = 'Save Changes';
            formChanged = false;
        }, 1500);
    }, 1000);
});

// Cancel Button Animation
cancelBtn.addEventListener('click', () => {
    formInputs.forEach(input => {
        input.classList.add('cancel-shake');
        setTimeout(() => input.classList.remove('cancel-shake'), 500);
    });
});

// Menu Item Hover Effect
const menuItems = document.querySelectorAll('.menu li');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('active')) {
            item.classList.add('hover-effect');
        }
    });
    
    item.addEventListener('mouseleave', () => {
        item.classList.remove('hover-effect');
    });
});

// Input Focus Effects
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Smooth Scroll to Form Fields
document.querySelectorAll('label').forEach(label => {
    label.addEventListener('click', () => {
        const input = document.getElementById(label.getAttribute('for'));
        if (input) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// Add unsaved changes warning
window.addEventListener('beforeunload', (e) => {
    if (formChanged) {
        e.preventDefault();
        e.returnValue = '';
    }
});
