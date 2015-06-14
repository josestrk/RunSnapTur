(function() {

    $('#geolocation').bind('pageshow', function() {
        // Fullscreen map
        var height = $('#geolocation').height() - $('#geolocation div[data-role="header"]').height() - 80; 
        var width  = $('#geolocation').width();
        $('#map_canvas').css({
            'height': height + 'px',
            'width':  width  + 'px'
        });

        // Default map is centered on Nitobi office
        var map = new google.maps.Map(document.getElementById("map_canvas"), {
            center:    new google.maps.LatLng(49.280, -123.105),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom:      15,
        });
        
        if(navigator.geolocation){
            var onSuccess = function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var marker = new google.maps.Marker({
                    animation: google.maps.Animation.BOUNCE,
                    map:       map,
                    position:  latlng,
                    title:     'Estoy aqui'
                });
                map.setCenter(latlng);
            };

            var onFail = function() {
                console.log('Failed to get geolocation');
            };

            navigator.geolocation.getCurrentPosition(onSuccess, onFail);
        }
    });

})();
