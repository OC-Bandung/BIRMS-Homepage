mapboxgl.accessToken = 'pk.eyJ1IjoibWlyZWlsbGUiLCJhIjoiY2oyMXhxeHEwMDAwODMzbWdmc2pkZzc2MCJ9.dnTlkXT6i4qEy7LygdIhfA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mireille/cj7bzd3zqal562smk2c0cqpyz',
    center: [107.613285,  -6.917759],
    maxZoom: 20,
    minZoom: 10,
    zoom: 13

});

var title = document.getElementById('location-title');
var description = document.getElementById('location-description');

var locations = [{
    "id": "2",
    "title": "The Bronx",
    "description": "This is where hip-hop was born, where the Yankees became a dynasty and where you can find New York City's leading zoo and botanical garden.",
    "camera": {
        center: [107.609246, -6.911553,],
        zoom: 13,
        pitch: 50
    }
}, {
    "id": "3",
    "title": "Brooklyn",
    "description": "No matter how hip it looks on TV, NYC's most populous borough is best experienced in person. Read on to find out about live music, Prospect Park, Nets basketball and more.",
    "camera": {
        center: [107.584697, -6.911490],
        bearing: -8.9,
        zoom: 14
    }
}, {
    "id": "1",
    "title": "Manhattan",
    "description": "Even if you think you know Manhattan—its world-class museums, fine dining and unforgettable views—the borough always has something new and exciting in store.",
    "camera": {
        center: [107.594160, -6.921895],
        bearing: 25.3,
        zoom: 13
    }
}, {
    "id": "4",
    "title": "Queens",
    "description": "Taste food from around the globe, watch Mets baseball and US Open tennis, see cutting-edge art and more in one of the world's most diverse places.",
    "camera": {
        center: [107.604466, -6.933023],
        bearing: 36,
        zoom: 15
    }
}, {
    "id": "5",
    "title": "Staten Island",
    "description": "Take a free ferry ride to an island getaway filled with historic architecture, stunning views, gardens and many family-friendly attractions.",
    "camera": {
        center: [107.620938,-6.928305],
        bearing: 28.4,
        zoom: 14
    }
}, {
    "title": "Boroughs of new york",
    "description": "New York City is made up of five boroughs: the Bronx, Brooklyn, Manhattan, Queens and Staten Island. Each one has enough attractions—and enough personality—to be a city all its own.",
    "camera": {
        center: [ 107.622808,-6.912025],
        zoom: 12,
        bearing: 0,
        pitch: 0
    }
}];

function highlightBorough(code) {
    // Only show the polygon feature that cooresponds to `borocode` in the data
    map.setFilter('highlight', ["==", "borocode", code]);
}

function playback(index) {
    title.textContent = locations[index].title;
    description.textContent = locations[index].description;

    highlightBorough(locations[index].id ? locations[index].id : '');

    // Animate the map position based on camera properties
    map.flyTo(locations[index].camera);

    map.once('moveend', function() {
        // Duration the slide is on screen after interaction
        window.setTimeout(function() {
            // Increment index
            index = (index + 1 === locations.length) ? 0 : index + 1;
            playback(index);
        }, 3000); // After callback, show the location for 3 seconds.
    });
}

// Display the last title/description first
title.textContent = locations[locations.length - 1].title;
description.textContent = locations[locations.length - 1].description;

map.on('load', function() {

    map.addLayer({
        "id": "highlight",
        "type": "fill",
        "source": {
            "type": "vector",
            "url": "mapbox://mapbox.8ibmsn6u"
        },
        "source-layer": "original",
        "paint": {
            "fill-color": "#fd6b50",
            "fill-opacity": 0.25
        },
        "filter": ["==", "borocode", ""]
    }, 'neighborhood_small_label'); // Place polygon under the neighborhood labels.

    // Start the playback animation for each borough
   ///playback(0);
});