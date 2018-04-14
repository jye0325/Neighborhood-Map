// Function that Returns System Time
function getHour () {
    var d = new Date();
    var h =  d.getHours();
    return h;
}

// Obtains the System Time
var hour = getHour();

var map;
var markers = [];
var bouncingMarker = null;

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

    // Creates a new instance of Google Maps
    map = new google.maps.Map(document.getElementById('map'),{
        // Centered location is at my house
        center: {lat: 40.59784399999999, lng: -73.97898839999999},
        zoom: 13,
        mapTypeControl: false,
        styles: styles
    });

    // Boundary Initializer
    var bounds = new google.maps.LatLngBounds();
    
    // Creates (5) Hardcoded Locations Using forEach()
    bookmarkLocations.forEach(function(marker,index){
        marker = new google.maps.Marker({
            position: bookmarkLocations[index].position,
            map: map,
            animation: google.maps.Animation.DROP,
            index: index,
        });

        // Extends Viewport Boundaries
        bounds.extend(marker.position);
        
        // Toggle Bounce
        marker.addListener('click', function() {
            toggleBounce(this);
        });

        // Stores Markers in a Global Array
        markers.push(marker);
    });

    // Fixes the Viewport
    map.fitBounds(bounds);

    // Toggle Bounce
    function toggleBounce(marker) {
        // Checks if Any Other Marker is Bouncing.
        if((bouncingMarker !== null ) && (bouncingMarker !== marker)){
            bouncingMarker.setAnimation(null);
            bouncingMarker = null;
        }
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          bouncingMarker = marker;
        }
      }
}

// Five Hardcoded Locations
var bookmarkLocations = [
    {
        // L&B Spumoni Gardens
        name: 'L&B Spumoni Gardens',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.594712, lng: -73.981313},
        index: 0
    },
    {
        // Barclay's Center
        name: 'Barclay\'s Center',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.682784, lng: -73.975825},
        index: 1
    },
    {
        // Ichiran
        name: 'Ichiran',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.70738, lng: -73.93323},
        index: 2
    },
    {
        // Peter Luger Steak House
        name: 'Peter Luger Steak House',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.709819, lng: -73.962467},
        index: 3
    },
    {
        // Grimaldi's Pizzaria
        name: 'Grimaldi\'s Pizzaria',
        address: '',
        phone: '',
        url: '',
        description: '', 
        position: {lat: 40.702604, lng: -73.99322},
        index: 4
    }
];

// ViewModel - Defines the data and behavior of my UI
var ViewModel = function () {
    var self = this;

    // API KEYS for FourSquare
    var client_id = 'DI2FHGCELBERLPRHWBRH1DBXEMMHML1OY1CUPMA2K31H4YN2';
    var client_secret = 'RILIOHICFEPSBPONF0Q0CTTRQJM5HO44RDAAJLGGD2VMGKC5';

    // Creates an observableArray to Hold the Locations for the Menu Pane
    this.locationList = ko.observableArray([]);

    // Passes the Initial (5) Hardcoded Locations into the observableArray
    bookmarkLocations.forEach(
        function(location, index){
            var lat = location.position.lat;
            var lng = location.position.lng;
            $.getJSON("https://api.foursquare.com/v2/venues/search?client_id="+client_id+"&client_secret="+client_secret+"&ll="+lat+","+lng+"&v=20180307", 
                function( data ) {
                    var code = data.meta.code;
                    var venue = data.response.venues[0];
                    var FOURSQUARE_ERROR_REFERENCE = 'https://developer.foursquare.com/docs/api/troubleshooting/errors';
                    if(code == '200'){
                        console.log('Successfully query of JSON response for: ' + venue.name);
                        location.name = venue.name;
                        location.address = venue.location.formattedAddress[0] + ", " + venue.location.formattedAddress[1];
                        location.phone = venue.contact.formattedPhone;
                        location.url = venue.url;
                        location.marker = markers[index]; // Must do this since Google Maps loads faster.
                        self.locationList.push( new Location(location) );
                    } 
                    else{
                        // For my Reference
                        console.log('Error ' + code + ': Please see ' + FOURSQUARE_ERROR_REFERENCE + 'for more informaiton');
                        // [Temporary Fix] Notification for End Users
                        window.alert("Error code: " + code + " -- " + FOURSQUARE_ERROR_REFERENCE);
                    }
                })
            .fail(function(){ 
                // For my Reference
                console.log("Failed query");
                // [Temporary Fix] Notification for End Users
                window.alert("Error: Failed query!");
            });
    });

    // A Click Event Handler When One of the Location is Clicked on 
    // in the Menu Pane
    this.toggleMarker = function (index) {
        var marker = markers[index];
        google.maps.event.trigger(marker, 'click');
    };

    // Automatically Updates the Locations as You Type into the Filter Textbox
    this.filterText = ko.observable("");
    this.filterEntries = function(){
        var input;
        // Converts Input to UpperCase for Case-Insensitive Search
        input = this.filterText().toUpperCase();
        this.locationList().forEach(function(entry){
            var name = entry.name().toUpperCase();
            var displayEntry = (name.includes(input)) ? true:false;
            entry.visible(displayEntry);
            entry.marker().setVisible(displayEntry);
       });
    };
};

// Model - Defines the Data for the viewModel
var Location = function(data) {
    this.index = ko.observable(data.index);
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.phone = ko.observable(data.phone);
    this.url = ko.observable(data.url);
    this.description = ko.observable(data.desc);
    this.position = ko.observable(data.position);

    // Creates a Pointer for Marker to Allow Access from Knockout.JS
    this.marker = ko.observable(data.marker);

    // Toggles Entry Display Based on Filter Function
    this.visible = ko.observable(true);
    
    // Necessary Function for Accordion to Have the Correct Data Target
    this.dataTarget = ko.pureComputed({
        read: function () {
            return "#" + this.name();
        },
        owner: this
    });
};

// Stores the viewModel in a Function so that Google Maps can Access it Later
globalAccess  = {viewModel: new ViewModel()};
ko.applyBindings(globalAccess.viewModel);