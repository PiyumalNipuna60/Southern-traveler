document.addEventListener('DOMContentLoaded', function() {
    // Sri Lankan districts array
    const districts = [
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
        "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
        "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
        "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
        "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
    ];

    // Get all required DOM elements
    const elements = {
        locationSelect: document.getElementById('locationSelect'),
        destinationSelect: document.getElementById('destinationSelect'),
        searchBtn: document.getElementById('searchBtn'),
        locationInput: document.getElementById('locationInput'),
        distanceInput: document.getElementById('distanceInput'),
        miniPrice: document.getElementById('miniPrice'),
        sedanPrice: document.getElementById('sedanPrice'),
        vanPrice: document.getElementById('vanPrice'),
        vehicleSelect: document.getElementById('vehicleSelect'),
        whatsappNo: document.getElementById('whatsappNo'),
        bookingDate: document.getElementById('bookingDate'),
        bookingTime: document.getElementById('bookingTime'),
        bookBtn: document.getElementById('bookBtn')
    };

    // Check if all elements exist
    for (const [key, element] of Object.entries(elements)) {
        if (!element && key !== 'searchBtn' && key !== 'bookBtn') {
            console.error(`Element ${key} not found`);
        }
    }

    // Populate dropdowns
    function populateDropdowns() {
        districts.forEach(district => {
            const option1 = new Option(district, district);
            const option2 = new Option(district, district);
            elements.locationSelect.add(option1);
            elements.destinationSelect.add(option2);
        });
    }

    // Initialize Google Maps service
    const distanceService = new google.maps.DistanceMatrixService();

    // Calculate actual distance
    async function calculateDistance(origin, destination) {
        return new Promise((resolve, reject) => {
            distanceService.getDistanceMatrix({
                origins: [origin + ", Sri Lanka"],
                destinations: [destination + ", Sri Lanka"],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC
            }, (response, status) => {
                if (status !== 'OK') {
                    reject(new Error(`Error: ${status}`));
                    return;
                }
                
                const result = response.rows[0].elements[0];
                if (result.status === "OK") {
                    resolve({
                        distance: result.distance.value / 1000, // Convert to km
                        duration: result.duration.text
                    });
                } else {
                    reject(new Error('Route not available'));
                }
            });
        });
    }

    // Update prices based on distance
    function updatePrices(distance) {
        const rates = {
            mini: 120,
            sedan: 140,
            van: 160
        };
        
        if (elements.miniPrice) elements.miniPrice.textContent = `Rs.${Math.round(distance * rates.mini)}/-`;
        if (elements.sedanPrice) elements.sedanPrice.textContent = `Rs.${Math.round(distance * rates.sedan)}/-`;
        if (elements.vanPrice) elements.vanPrice.textContent = `Rs.${Math.round(distance * rates.van)}/-`;
    }

    // Handle search
    async function handleSearch() {
        const origin = elements.locationSelect.value;
        const destination = elements.destinationSelect.value;
        
        if (!origin || !destination) {
            alert("Please select both location and destination");
            return;
        }
        
        if (origin === destination) {
            alert("Location and destination cannot be the same");
            return;
        }
        
        elements.locationInput.value = `${origin} to ${destination}`;
        elements.distanceInput.value = "Calculating...";
        
        try {
            const { distance } = await calculateDistance(origin, destination);
            elements.distanceInput.value = `${distance.toFixed(1)} km`;
            updatePrices(distance);
        } catch (error) {
            console.error(error);
            elements.distanceInput.value = "Error calculating distance";
        }
    }

    // Handle booking
    function handleBooking() {
        // Add your booking logic here
        alert("Booking functionality will be implemented here");
    }

    // Initialize the calculator
    function init() {
        populateDropdowns();
        
        // Event listeners
        if (elements.searchBtn) elements.searchBtn.addEventListener('click', handleSearch);
        if (elements.bookBtn) elements.bookBtn.addEventListener('click', handleBooking);
    }

    init();
});

