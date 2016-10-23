$(function(){

    var map, lat, lng, rec;
    localStorage.geoMap= (localStorage.geoMap || "[]");
    rec = JSON.parse(localStorage.geoMap);

    function enlazarMarcador(e){
        // muestra ruta entre marcas anteriores y actuales
        map.drawRoute({
            origin: [lat, lng],  // origen en coordenadas anteriores
            // destino en coordenadas del click o toque actual
            destination: [e.latLng.lat(), e.latLng.lng()],
            travelMode: 'driving',
            strokeColor: '#000000',
            strokeOpacity: 0.6,
            strokeWeight: 5
        });

        lat = e.latLng.lat();   // guarda coords para marca siguiente
        lng = e.latLng.lng();
        rec = JSON.parse(localStorage.geoMap);
        rec.push([lat, lng]);
        map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa
        localStorage.geoMap = JSON.stringify(rec);
    };

    function recMap(map){
        for (var i=0; i<rec.length; i++){
            map.addMarker({ lat: rec[i][0], lng: rec[i][1]});  // marcador recordado pos i  [lat, lng]
            if(i < rec.length-1)
                map.drawRoute({
                    origin: [rec[i][0], rec[i][1]],  // origen en coordenadas anteriores
                    // destino en coordenadas del click o toque actual
                    destination: [rec[i+1][0], rec[i+1][1]],
                    travelMode: 'driving',
                    strokeColor: '#EF0',
                    strokeOpacity: 0.6,
                    strokeWeight: 5
                });
        }
    };

    function geolocalizar(){
        GMaps.geolocate({
            success: function(position){
                lat = position.coords.latitude;  // guarda coords en lat y lng
                lng = position.coords.longitude;
                rec.push([lat,lng]);
                localStorage.geoMap = JSON.stringify(rec);
                map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
                    el: '#map',
                    lat: lat,
                    lng: lng,
                    click: enlazarMarcador,
                    tap: enlazarMarcador,
                });
                map.addMarker({ lat: lat, lng: lng}); 
                recMap(map);
            },
            error: function(error) { alert('Geolocalización falla: '+error.message); },
            not_supported: function(){ alert("Su navegador no soporta geolocalización"); },
        });
    };

    function compactar(){
        var inil= rec[0][0];
        var inia= rec[0][1];
        for (var i=0; i<rec.length-1; i++){
            map.drawRoute({
                origin: [rec[i][0], rec[i][1]],  // origen en coordenadas anteriores
                // destino en coordenadas del click o toque actual
                destination: [rec[i+1][0], rec[i+1][1]],
                travelMode: 'driving',
                strokeColor: '#F00',
                strokeOpacity: 0.6,
                strokeWeight: 5
            });
        }
        map.removeMarkers();
        map.addMarker({ lat: inil, lng: inia});  // marcador recordado pos i  [lat, lng]
        map.addMarker({ lat: rec[rec.length-1][0], lng: rec[rec.length-1][1]});
    };
    geolocalizar();
    $("iniciar").on('click', function(){localStorage.geoMap="[]"; map.removeMarkers(); map.cleanRoute();});
    $("compactar").on('click', function(){compactar()});
});
//
//    var map="";
//    var lat, lng, rec;
//    localStorage.geoMap= (localStorage.geoMap || "[]");
//    rec = JSON.parse(localStorage.geoMap);
//
//    function enlazarMarcador(e){
//        // muestra ruta entre marcas anteriores y actuales
//        map.drawRoute({
//            origin: [lat, lng],  // origen en coordenadas anteriores
//            // destino en coordenadas del click o toque actual
//            destination: [e.latLng.lat(), e.latLng.lng()],
//            travelMode: 'driving',
//            strokeColor: '#000000',
//            strokeOpacity: 0.6,
//            strokeWeight: 5
//        });
//
//        lat = e.latLng.lat();   // guarda coords para marca siguiente
//        lng = e.latLng.lng();
//        rec = JSON.parse(localStorage.geoMap);
//        rec.push([lat, lng]);
//        map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa
//        localStorage.geoMap = JSON.stringify(rec);
//    };
//
//    function recMap(map){
//        for (var i=0; i<rec.length; i++){
//            map.addMarker({ lat: rec[i][0], lng: rec[i][1]});  // marcador recordado pos i  [lat, lng]
//            if(i < rec.length-1)
//                map.drawRoute({
//                    origin: [rec[i][0], rec[i][1]],  // origen en coordenadas anteriores
//                    // destino en coordenadas del click o toque actual
//                    destination: [rec[i+1][0], rec[i+1][1]],
//                    travelMode: 'driving',
//                    strokeColor: '#EF0',
//                    strokeOpacity: 0.6,
//                    strokeWeight: 5
//                });
//        }
//    };
//
//    function geolocalizar(){
//        GMaps.geolocate({
//            success: function(position){
//                lat = position.coords.latitude;  // guarda coords en lat y lng
//                lng = position.coords.longitude;
//                rec.push([lat,lng]);
//                localStorage.geoMap = JSON.stringify(rec);
//                map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
//                    el: '#map',
//                    lat: lat,
//                    lng: lng,
//                    click: enlazarMarcador,
//                    tap: enlazarMarcador,
//                });
//
//                map.addMarker({ lat: lat, lng: lng}); 
//                recMap(map);
//            },
//            error: function(error) { alert('Geolocalización falla: '+error.message); },
//            not_supported: function(){ alert("Su navegador no soporta geolocalización"); },
//        });
//    };
//
//    function compactar(){
//        var inil= rec[0][0];
//        var inia= rec[0][1];
//        for (var i=0; i<rec.length-1; i++){
//            map.drawRoute({
//                origin: [rec[i][0], rec[i][1]],  // origen en coordenadas anteriores
//                // destino en coordenadas del click o toque actual
//                destination: [rec[i+1][0], rec[i+1][1]],
//                travelMode: 'driving',
//                strokeColor: '#F00',
//                strokeOpacity: 0.6,
//                strokeWeight: 5
//            });
//        }
//        map.removeMarkers();
//        map.addMarker({ lat: inil, lng: inia});  // marcador recordado pos i  [lat, lng]
//        map.addMarker({ lat: rec[rec.length-1][0], lng: rec[rec.length-1][1]});
//    }
//
//geolocalizar();
//$("#compactar").on('click', function(){debugger});
//$("#iniciar").on('click', function(){localStorage.geoMap="[]"; map.removeMarkers(); map.cleanRoute();});
