'use strict';
import * as wasm_pathfinder from '../../wasm-pathfinder/pkg/wasm_pathfinder.js';

//Export wasm to global scope so it can be used from the dev console
window.wasm_pathfinder = wasm_pathfinder;

import "../../js/leaflet.js";
import "../../js/layers.js";
import "../../js/plugins/leaflet.fullscreen.js";
import "../../js/plugins/leaflet.mapSelector.js";
import "../../js/plugins/leaflet.zoom.js";
import "../../js/plugins/leaflet.plane.js";
import "../../js/plugins/leaflet.position.js";
import "../../js/plugins/leaflet.displays.js";
import "../../js/plugins/leaflet.urllayers.js";
import "../../js/plugins/leaflet.rect.js";
import "../../js/plugins/leaflet.clickcopy.js";
import "../../js/plugins/leaflet.maplabels.js";

void function (global) {
    let pathfinder = L.dynamicNavigator({
        initStart: [0, 3220, 3218],
        initEnd: [0, 3212, 3448],
        init: wasm_pathfinder.default,
        algorithm: wasm_pathfinder.race,
        tileUrl: 'layers_osrs/mapsquares/-1/{zoom}/{plane}_{x}_{y}.png',
        errorTileUrl: 'TODO',
        shadowTileUrl: 'layers_osrs/inv_area_tiles/-1/{zoom}/{plane}_{x}_{y}.png',
        shadowErrorTileUrl: 'layers_rs3/shadow_squares/shadow_tile.png',
        messageBox: true
    });

    let runescape_map = global.runescape_map = L.gameMap('map', {

        maxBounds: [[-1000, -1000], [12800 + 1000, 12800 + 1000]],
        maxBoundsViscosity: 0.5,

        customZoomControl: true,
        fullscreenControl: true,
        planeControl: true,
        positionControl: true,
        messageBox: true,
        rect: true,
        initialMapId: -1,
        plane: 0,
        x: 3200,
        y: 3200,
        minPlane: 0,
        maxPlane: 3,
        minZoom: -4,
        maxZoom: 8,
        doubleClickZoom: false,
        showMapBorder: true,
        enableUrlLocation: true,


        // Context Menu
        contextmenu: true,
        contextmenuWidth: 140,
        contextmenuItems: [{
            text: 'Start Route',
            callback: pathfinder.moveStartMarkerTo.bind(pathfinder)
        },
        {
            text: 'End Route',
            callback: pathfinder.moveEndMarkerTo.bind(pathfinder)
        }]

    });

    L.control.display.objects({
        folder: "data_osrs",
        show3d: true,
        displayLayer: L.objects.osrs
    }).addTo(runescape_map);

    L.tileLayer.main('layers_osrs/mapsquares/-1/{zoom}/{plane}_{x}_{y}.png', {
        minZoom: -4,
        maxNativeZoom: 4,
        maxZoom: 8,
    }).addTo(runescape_map).bringToBack();

    let nomove = L.tileLayer.main('layers_osrs/nomove/-1/{zoom}/{plane}_{x}_{y}.png', {
        minZoom: -4,
        maxNativeZoom: 2,
        maxZoom: 8,
    });

    let objects = L.tileLayer.main('layers_osrs/locations/-1/{zoom}/{plane}_{x}_{y}.png', {
        minZoom: -4,
        maxNativeZoom: 2,
        maxZoom: 8,
    });

    let multimap = L.tileLayer.main('layers_osrs/multimap/-1/{zoom}/{plane}_{x}_{y}.png', {
        minZoom: -4,
        maxNativeZoom: 2,
        maxZoom: 8,
    });

    var areas = L.tileLayer.main("layers_osrs/areas_squares/-1/{zoom}/{plane}_{x}_{y}.png", {
        minZoom: -4,
        maxNativeZoom: 2,
        maxZoom: 8,
    });

    let grid = L.grid({
        bounds: [[0, 0], [12800, 6400]],
    });

    let crowdsourcetransports = L.crowdSourceMovement({
        data: "data_osrs/transports_osrs.json",
        show3d: false,
        minZoom: -4
    });
    let crowdsourceteles = L.crowdSourceMovement({
        data: "data_osrs/teleports_osrs.json",
        show3d: false,
        minZoom: -4
    });

    let fairyrings = L.fairyRings({
        data: "data_osrs/transports/fairy_rings.json",
        show3d: false,
        minZoom: -4
    });

    let spirittrees = L.spiritTrees({
        data: "data_osrs/transports/spirit_trees.json",
        show3d: false,
        minZoom: -4
    });

    let gnomegliders = L.gnomeGliders({
        data: "data_osrs/transports/gnome_gliders.json",
        show3d: false,
        minZoom: -4
    });

    let spheres = L.crowdSourceMovement({
        data: "data_osrs/osrs_spheres.json",
        show3d: false,
        minZoom: -4
    });


    const defaults = {
        minZoom: -3,
        maxNativeZoom: 2,
        maxZoom: 6,

    };

    pathfinder.addTo(runescape_map);

    let chunks = L.tileLayer('layers/small_grid/{z}.png', defaults);

    L.control.layers.urlParam({}, {
        "crowdsource_transports": crowdsourcetransports,
        "crowdsource_teles": crowdsourceteles,
        "fairy_rings": fairyrings,
        "spirit_trees": spirittrees,
        "gnome_gliders": gnomegliders,
        "areas": areas,
        "multimap": multimap,
        "spheres": spheres,
        "no_move": nomove,
        "objects": objects,
        "grid": grid,
        "chunks": chunks
    }, {
        collapsed: true,
        position: 'bottomright'
    }).addTo(runescape_map);

}
    (this || window);
