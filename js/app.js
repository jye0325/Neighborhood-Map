// Map Initializer
var map;
var markers = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'),{
        center: {lat: 40.59784399999999, lng: -73.97898839999999},
        zoom: 13,
        mapTypeControl: false
    });

    // InfoWindow Initializer
    var infowindow = new google.maps.InfoWindow();
    
    for (var i = 0; i < bookmarkLocations.length; i++){
        // Marker Initializer
        var marker = new google.maps.Marker({
            position: bookmarkLocations[i].position,
            map: map,
            animation: google.maps.Animation.DROP,
            title: bookmarkLocations[i].title,
            content:bookmarkLocations[i].description
        });

        // Hold the markers in an array
        markers.push(marker);

        // Marker Event Handler
        marker.addListener('click', function() {
            toggleInfoWindow(this, infowindow);
        });
    }

    // Creates a function that displays the information of the clicked marker.
    function toggleInfoWindow(marker, infowindow){
        // Check if infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.maxWidth = 200;
            infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + marker.content + '</div>')
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            })
        }
    }
}
/*
var placeMarker = function(position, title){
    // Marker Initializer
    var marker = new google.maps.Marker({
        position: position,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        map: map,
        title: title
    });

    // Plot markers on the map
    marker.setMap(map);
}
*/
// Default Location - My Home
var house = [
    {
        title: 'Home',
        position:{lat: 40.59784399999999, lng: -73.97898839999999}
    }
]

// Five hardcoded locations
var bookmarkLocations = [
    {
        title: 'L&B Spumoni Gardens',
        description: 'Favorite Square Pizza', 
        position: {lat: 40.594712, lng: -73.981313}
    },
    {
        title: 'Brooklyn Technical High School', 
        description: 'High School I Attended', 
        position: {lat: 40.6889551, lng: -73.97678209999999}
    },
    {
        title: 'Mark Twain I.S.239', 
        description: 'Middle School I Attended', 
        position: {lat: 40.5786601, lng: -73.9923915}
    },
    {
        title: 'P.S.97', 
        description: 'Elementary School I Attended', 
        position: {lat: 40.6011147, lng: -73.9857078}
    },
    {
        title: 'Brooklyn Bridge Park', 
        description: 'Favorite Park To Play Basketball', 
        position: {lat: 40.700291, lng: -73.996699}
    },
];

// ViewModel - Defines the data and behavior of my UI
var ViewModel = function () {
    var self = this;

    // Creates an observableArray to hold the locations for the Menu Pane
    this.locationList = ko.observableArray([]);

    // Pass the initial 5 hardcoded locations into the observableArray
    bookmarkLocations.forEach(function(location){
        self.locationList.push( new Location(location) );
    });

    // An click event handler when one of the locations is clicked on in the Menu Pane
    // <-- CODE GOES HERE -->
    
}

// Model - Defines the data for the ViewModel
var Location = function(data) {
    this.title = ko.observable(data.title);
    this.description = ko.observable(data.desc);
    this.position = ko.observable(data.position);
}

ko.applyBindings(new ViewModel())