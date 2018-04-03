// Get system time
function getHour () {
    var d = new Date();
    var h =  d.getHours();
    return h;
}
var hour = getHour();


var map;
var markers = [];
// Google Map Initializer
function initMap() {
    // Styles Google Maps based on day-time or night-time.
    var styles;
    if (hour <= 6 || hour >= 18){
        // Night-time
        styles = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ];
    } else {
        // Day-time
        styles = [];
    }

    map = new google.maps.Map(document.getElementById('map'),{
        // Centered location is at my house
        center: {lat: 40.59784399999999, lng: -73.97898839999999},
        zoom: 13,
        mapTypeControl: false,
        styles: styles
    });

    // InfoWindow Initializer
    var infowindow = new google.maps.InfoWindow();

    // Boundary Initializer
    var bounds = new google.maps.LatLngBounds();
    
    for (var i = 0; i < bookmarkLocations.length; i++){
        // Marker Initializer
        var marker = new google.maps.Marker({
            position: bookmarkLocations[i].position,
            map: map,
            animation: google.maps.Animation.DROP,
            // Fix it so that it's bookmarkLocations[i].index and not i
            index: i
        });

        // Extends viewport boundary
        bounds.extend(marker.position);

        // Marker Event Handler
        marker.addListener('click', function() {
            toggleInfoWindow(this, infowindow);
        });

         // Hold the markers in an array
         markers.push(marker);
    }

    // Fixes the viewport
    map.fitBounds(bounds);

    // Creates a function that displays the information of the clicked marker.
    function toggleInfoWindow(marker, infowindow){
        // Check if infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.maxWidth = 200;
            infowindow.setContent('<div data-bind="with: $root.locationList()[' + marker.index + ']"> <div class="infoWindow">' + 
                '<div class="infoTitle"> <p data-bind="text: name"> </p></div>' + 
                '<div class="infoContent">' + marker.content + '</div></div></div>');
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
        }
    }
}

// Five hardcoded locations
// All of this information is for reference
var bookmarkLocations = [
    {
        // L&B Spumoni Gardens
        name: '',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.594712, lng: -73.981313},
        index: 0
    },
    {
        // Barclay's Center
        name: '',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.682784, lng: -73.975825},
        index: 1
    },
    {
        // Ichiran
        name: '',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.70738, lng: -73.93323},
        index: 2
    },
    {
        // Peter Luger Steak House
        name: '',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.709819, lng: -73.962467},
        index: 3
    },
    {
        // Grimaldi's Pizzaria
        name: '',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.702604, lng: -73.99322},
        index: 4
    },
];

// ViewModel - Defines the data and behavior of my UI
var ViewModel = function () {
    var self = this;

    // API KEYS for FourSquare
    var client_id = 'DI2FHGCELBERLPRHWBRH1DBXEMMHML1OY1CUPMA2K31H4YN2';
    var client_secret = 'RILIOHICFEPSBPONF0Q0CTTRQJM5HO44RDAAJLGGD2VMGKC5';

    // Creates an observableArray to hold the locations for the Menu Pane
    this.locationList = ko.observableArray([]);

    // Pass the initial 5 hardcoded locations into the observableArray
    bookmarkLocations.forEach(
        function(location){
            location.index = bookmarkLocations.index;
            var lat = location.position.lat;
            var lng = location.position.lng;
            $.getJSON("https://api.foursquare.com/v2/venues/search?client_id="+client_id+"&client_secret="+client_secret+"&ll="+lat+","+lng+"&v=20180307", 
                function( data ) {
                    var code = data.meta.code;
                    var venue = data.response.venues[0];
                    var FOURSQUARE_ERROR_REFERENCE = 'https://developer.foursquare.com/docs/api/troubleshooting/errors';
                    if(code == '200'){
                        console.log('Successfully query of JSON response');
                        console.log(venue.name);
                        location.name = venue.name;
                        location.address = venue.location.formattedAddress[0] + ", " + venue.location.formattedAddress[1];
                        location.phone = venue.contact.formattedPhone;
                        location.url = venue.url;
                        self.locationList.push( new Location(location) );
                    } 
                    else{
                        console.log('Error ' + code + ': Please see ' + FOURSQUARE_ERROR_REFERENCE + 'for more informaiton');
                    }
                })
            .fail(function(){ window.alert("Failed query");});
    });

    // An click event handler when one of the locations is clicked on 
    // in the Menu Pane
    this.toggleMarker = function () {
        // To be updated!
        window.alert("This is a test.");
    };

    // Automatically update the locations as you type into the filter textbox
    this.filterText = ko.observable("");    

    // An event handler when the filter button is clicked on
    this.filter = function () {
        // To be updated!
        window.alert("This is a test");
    };
};

// Model - Defines the data for the ViewModel
var Location = function(data) {
    this.index = ko.observable(data.index);
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.phone = ko.observable(data.phone);
    this.url = ko.observable(data.url);
    this.description = ko.observable(data.desc);
    this.position = ko.observable(data.position);
    this.marker = ko.observable(data.marker);
    this.dataTarget = ko.pureComputed({
        read: function () {
            return "#" + this.name();
        },
        owner: this
    });
};

ko.applyBindings(new ViewModel());
