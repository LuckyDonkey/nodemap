/*global L*/
/*global $*/

var map

function initMap() {
    map = new L.Map("map", {
        center: new L.LatLng(26.33280692289788, 114.78515624999999),
        zoom: 7
    })

    var mapbox = new L.TileLayer("https://a.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGF0aWFuYSIsImEiOiJjaW9nNWc2enkwMWk0dWRtM3Qwd3J5dHo2In0.42pdJNpJD8BAalQ3nM8KQg", {
        id: "mapbox.Street"
    })
    var osm = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {})
    var mapquest = new L.TileLayer("http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png", {
        subdomains: "1234"
    })
    var mapquestsat = new L.TileLayer("http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png", {
        subdomains: "1234"
    })
    var tianditu = new L.TileLayer("http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}", {
        subdomains: "01234567"
    })
    var tianditusat = new L.TileLayer("http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}", {
        subdomains: "01234567"
    })
    var tianditusurface = new L.TileLayer("http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}", {
        subdomains: "01234567"
    })
    var gaode = new L.TileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}", {
        subdomains: "1234"
    })
    var gaoderoad = new L.TileLayer("http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8", {
        subdomains: "1234"
    })
    var gaodesat = new L.TileLayer("http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}", {
        subdomains: "1234"
    })
    var tuba = new L.TileLayer("http://emap{s}.mapabc.com/mapabc/maptile?&x={x}&y={y}&z={z}", {
        subdomains: "0123"
    })
    var geoqBlue = new L.TileLayer("http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}", {})
    var geoqCommunity = new L.TileLayer("http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}", {})
    var geoqGray = new L.TileLayer("http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}", {})
    var geoColor = new L.TileLayer("http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}", {})
    var geoqWarm = new L.TileLayer(" http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}", {})
    var geoqBound = new L.TileLayer("http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/administrative_division_boundaryandlabel/MapServer/tile/{z}/{y}/{x}", {})
    var geoqBoundonly = new L.TileLayer("http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/administrative_division_boundary/MapServer/tile/{z}/{y}/{x}", {})
    var geoqWater = new L.TileLayer("http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}", {})
    var geoqRailway = new L.TileLayer("http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/Subway/MapServer/tile/{z}/{y}/{x}", {})
    var StamenToner = new L.TileLayer("http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png", {})
    var StamenWaterColor = new L.TileLayer("http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png", {})
    var OpenTopoMap = new L.TileLayer("http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {})
    var esrisat = new L.TileLayer("http://server.arcgisonline.com/arcgis/rest/services/world_imagery/mapserver/tile/{z}/{y}/{x}", {})
    var google = new L.TileLayer("http://khm0.googleapis.com/kh?v=203&hl=zh-CN&&x={x}&y={y}&z={z}", {})

    L.control.layers({
        "高德影像": gaodesat.addTo(map),
        "天地图影像": tianditusat,
        "esrisat": esrisat,
        "MapQuest影像": mapquestsat,
        "谷歌影像": google,
        "Mapbox": mapbox,
        "osm": osm,
        "MapQuest": mapquest,
        "天地图": tianditu,
        "天地图地形": tianditusurface,
        "图吧": tuba,
        "gaode": gaode,
        "gaoderoad": gaoderoad,
        "geoqBlue": geoqBlue,
        "geoqCommunity": geoqCommunity,
        "geoqGray": geoqGray,
        "geoColor": geoColor,
        "geoqWarm": geoqWarm,
        "geoqBound": geoqBound,
        "geoqBoundonly": geoqBoundonly,
        "geoqWater": geoqWater,
        "geoqRailway": geoqRailway,
        "StamenToner": StamenToner,
        "StamenWaterColor": StamenWaterColor,
        "OpenTopoMap": OpenTopoMap
    }, {}, {collapsed: false}).addTo(map)
}

function initPage() {
    $("#downloadstart").click(function () {
        var name = $("#name").val()
        var type = $("#type").val()
        var bound = $("#bound").val()
        var zoom = parseInt($("#zoom").val())

        if (name !== "" && (!isNaN(zoom)) && (zoom > 0 && zoom < 20)) {
            $.post("./download", {
                name: name,
                type: type,
                bound: bound,
                zoom: zoom
            },
                function (data) {
                    alert(data)
                }
            )
            // $("#download").modal()
        }
    })
}


function initControl() {
    //Leaflet.draw
    var drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)

    new L.Control.Draw({
        draw: {
            position: "topleft",
            polygon: false,
            polyline: false,
            circle: false,
            marker: false
        },
        edit: {
            featureGroup: drawnItems
        }
    }).addTo(map)

    map.on("draw:created", function (e) {
        var layer = e.layer

        drawnItems.addLayer(layer)


        layer.bindLabel("双击区域下载地图")
            .on("dblclick", function (e) {
                var bound = e.target.getBounds()
                $("#bound").val(bound.getNorth() + "," + bound.getWest() + "," + bound.getSouth() + "," + bound.getEast())
                $("#setting").modal()
            })
    })

    // coordinate
    var coordinate = L.control({ position: "bottomleft" })

    coordinate.onAdd = function () {
        this._div = L.DomUtil.create("div", "info")
        this._div.innerHTML = "<p id=\"lat\">纬度: " + map.getCenter().lat.toFixed(8) + "</p><p id=\"lng\">经度:" + map.getCenter().lng.toFixed(8) + "</p><p id=\"scale\">级别: " + map.getZoom() + "</p>"
        return this._div
    }

    coordinate.updateLatLng = function (latlng) {
        L.DomUtil.get("lat").innerHTML = "纬度:" + latlng.lat
        L.DomUtil.get("lng").innerHTML = "经度:" + latlng.lng
    }

    coordinate.updateZoom = function (zoom) {
        L.DomUtil.get("scale").innerHTML = "级别:" + zoom
    }

    coordinate.addTo(map)

    map.on("mousemove", function (e) {
        coordinate.updateLatLng(e.latlng)
    })

    map.on("zoomend", function () {
        coordinate.updateZoom(map.getZoom())
    })
}

function init() {
    initMap()
    initPage()
    initControl()
}

init()

// function getBounds(layer) {
//     var latlngs = layer.getLatLngs()
//     for (var index = 0, count = latlngs.length index < count index++) {
//         var latlng = latlngs[index]
//         if (index === 0) {
//             minLat = latlng.lat
//             minLng = latlng.lng
//             maxLat = latlng.lat
//             maxLng = latlng.lng
//         } else {
//             if (latlng.lat < minLat) {
//                 minLat = latlng.lat
//             } else if (latlng.lat > maxLat) {
//                 maxLat = latlng.lat
//             } else if (latlng.lng < minLng) {
//                 minLng = latlng.lng
//             } else if (latlng.lng > maxLng) {
//                 maxLng = latlng.lng
//             }
//         }
//     }
//     return {
//         south: minLat,
//         north: maxLat,
//         west: minLng,
//         east: maxLng
//     }
// }
