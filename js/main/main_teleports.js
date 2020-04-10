'use strict';

var runescape_map = L.gameMap('map', {
        crs: L.CRS.Simple,
        maxBounds: [[-1000, -1000], [12800 + 1000, 6400 + 1000]],
        maxBoundsViscosity: 0.5,
		
		customZoomControl:true,	
        fullscreenControl: true,
		planeControl: true,
		positionControl: true,

        zoom: 2,
        initialMapId: -1,
        plane: 0,
        x: 3232,
        y: 3232,
        minPlane: 0,
        maxPlane: 3,
        doubleClickZoom: false,
        showMapBorder: true,
        enableUrlLocation: true
    });

var main = L.tileLayer.main('layers/{source}/{mapId}/{zoom}/{plane}_{x}_{y}.png', {
        source: 'map_squares',
        minZoom: -4,
        maxNativeZoom: 3,
        maxZoom: 4,
    }).addTo(runescape_map);

var zones = L.tileLayer.main('layers/{source}/{mapId}/{zoom}_0_{x}_{y}.png', {
        source: 'zonemap_squares',
        minZoom: -4,
        maxNativeZoom: 2,
        maxZoom: 4,
    }).addTo(runescape_map);

var areas = L.tileLayer.main('layers/{source}/{mapId}/{zoom}/{plane}_{x}_{y}.png', {
        source: 'areas_squares',
        minZoom: -4,
        maxNativeZoom: 2,
        maxZoom: 4,
    });

var watery = L.tileLayer.main('layers/{source}/{mapId}/plane_0/zoom_{zoom}/{x}_{y}.png', {
        source: 'warp_map',
        minZoom: -4,
        maxNativeZoom: 2,
        maxZoom: 4,
        tileSize: 512
    });

var teleports = L.teleports({
    API_KEY: "AIzaSyBrYT0-aS9VpW2Aenm-pJ2UCUhih8cZ4g8",
    SHEET_ID: "1ZjKyAMUWa1qxFvBnmXwofNkRBkVfsizoGwp6rZylXXM",
	minZoom: -3,
	filterFn: item => item.type === "teleport"


}).addTo(runescape_map);


L.control.layers({}, {
    zones: zones,
    areas: areas,
    watery: watery,
	teleports: teleports

}, {
    collapsed: false,
    position: 'bottomright'
}).addTo(runescape_map);

