// [KEEP] Function that Returns System Time
function getHour () {
    var d = new Date();
    var h =  d.getHours();
    return h;
}

// [KEEP] Obtains the System Time
var hour = getHour();

var map;
var infowindow;
var markers = [];
var infowindowIsOpen = true;

// [KEEP] Google Map Initializer
function initMap() {
    // [KEEP] Styles Google Maps based on day-time or night-time. 
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

    // [KEEP] Creates a new instance of Google Maps
    map = new google.maps.Map(document.getElementById('map'),{
        // Centered location is at my house
        center: {lat: 40.59784399999999, lng: -73.97898839999999},
        zoom: 13,
        mapTypeControl: false,
        styles: styles
    });

    // [REMOVE/DEPRACATE] InfoWindow Initializer
    infowindow = new google.maps.InfoWindow();

    // [KEEP] Boundary Initializer
    var bounds = new google.maps.LatLngBounds();
    
    // [REFACTOR] Creates (5) hardcoded markers
    for (var i = 0; i < bookmarkLocations.length; i++){
        // [REFACTOR] Marker Initializer
        var marker = new google.maps.Marker({
            position: bookmarkLocations[i].position,
            map: map,
            animation: google.maps.Animation.DROP,
            index: i,
        });

        // [KEEP] Extends viewport boundary
        bounds.extend(marker.position);

        // [REFACTOR] Marker Event Handler
        marker.addListener('click', function() {
            toggleInfoWindow(this, infowindow);
        });

        // [REFACTOR] Hold the markers in an array
        markers.push(marker);
    }

    // [KEEP] Fixes the viewport
    map.fitBounds(bounds);

    // [REMOVE/DEPRACATE] Creates a function that displays the information of the clicked marker.
    function toggleInfoWindow(marker, infowindow){
        // Check if infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            var info = globalAccess.viewModel.populate(marker.index);
            infowindow.marker = marker;
            infowindow.maxWidth = 200;
            infowindow.setContent(info);
            infowindow.open(map, marker);
            infowindowIsOpen = true;
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
                infowindowIsOpen = false;
            });
        }
    }

    // [REMOVE]
    function toggleMarker(index){

    }
}

// [KEEP/REFACTOR] Five Hardcoded Locations 
// - By default, these locations will have default information in case of:
//   Foursquare API Failed Query
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

// [KEEP] ViewModel - Defines the data and behavior of my UI
var ViewModel = function () {
    var self = this;

    // [KEEP] API KEYS for FourSquare
    var client_id = 'DI2FHGCELBERLPRHWBRH1DBXEMMHML1OY1CUPMA2K31H4YN2';
    var client_secret = 'RILIOHICFEPSBPONF0Q0CTTRQJM5HO44RDAAJLGGD2VMGKC5';

    // [REFACTOR] Creates an observableArray to Hold the Locations for the Menu Pane
    this.locationList = ko.observableArray([]);

    // [REFACTOR] Passes the Initial (5) Hardcoded Locations into the observableArray
    bookmarkLocations.forEach(
        function(location){
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
                        self.locationList.push( new Location(location) );
                    } 
                    else{
                        console.log('Error ' + code + ': Please see ' + FOURSQUARE_ERROR_REFERENCE + 'for more informaiton');
                    }
                })
            .fail(function(){ console.log("Failed query");});
    });

    // [REFACTOR] An click event handler when one of the locations is clicked on 
    // in the Menu Pane
    this.toggleMarker = function (index) {
        if(infowindowIsOpen == true){
            // If InfoWindow is already open
            infowindow.close();
            infowindow.marker = null;
            infowindowIsOpen = false;
        } else {
            // If InfoWindow is not open
            var marker = markers[index];
            google.maps.event.trigger(marker, 'click');
            infowindowIsOpen = true;
        }
    };

    // [REFACTOR] Automatically Updates the Locations as You Type into the Filter Textbox
    this.filterText = ko.observable("");
    this.filterEntries = function(){
        var input;
        input = this.filterText().toUpperCase();
        entries = document.getElementsByClassName("entries");
        for (i=0; i<entries.length; i++){
            // Find the corresponding index for marker and entry
            var eIndex, entry;
            entry = entries[i].getElementsByTagName("span")[0];
            eIndex = entries[i].getElementsByTagName("div")[1].getAttribute("id");
            if(entry.innerHTML.toUpperCase().indexOf(input) > -1){
                entries[i].style.display = "";
                markers[eIndex].setMap(map);
                // Markers will not bounce when clearing the filter input
                if (input != ""){
                    markers[eIndex].setAnimation(google.maps.Animation.BOUNCE);
                }
            } else {
                entries[i].style.display = "none";
                markers[eIndex].setMap(null);
            }

        }
    };

    // [REFACTOR/REMOVE] A Function for Google Maps InfoWindow to Populate with Foursquare Info
    this.populate = function (index){
        var location;
        for(i = 0; i < this.locationList().length; i++){
            if(this.locationList()[i].index() == index){
                location = this.locationList()[i];
            }
        }
        var name = location.name();
        var address = location.address();
        var script = "<div id=" + index + "><p>" + name + "</p><p>" + address + "</p></div>"; 
        return script;
    };

};

// [KEEP] Model - Defines the data for the ViewModel
var Location = function(data) {
    // [REFACTOR] NEEDS REFACTORING
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

// [REFACTOR] Stores the view Model in a function so that Google Maps can access it later
globalAccess  = {viewModel: new ViewModel()};
ko.applyBindings(globalAccess.viewModel);
//ko.applyBindings(new ViewModel());
