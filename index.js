// A map plug-in under hexo, which supports rendering of beautiful interactive maps on article pages.
// * author: guole
// * https://guole.fun/
// * license: Apache-2.0
// * https://guole.fun/posts/41887//blob/main/LICENSE
// {% map altLan, altLat, alt, zoom, mapWidth, mapHeight, tuceng %}
// {% map 经度, 纬度, 文本, 缩放级别, 宽, 高, 图层 %}
// 一个例子：{% map 114.533983, 22.569441,这里是西涌沙滩, 14, 100%, 360px, 1 %}
// 一个例子：{% map %}
// 使用说明：https://guole.fun/posts/41887/

'use strict';

const css_text = `<link rel="stylesheet" href="//unpkg.com/hexo-tag-map/lib/leaflet@1.7.1.css">`;
const js_text = `<script data-pjax src="//unpkg.com/hexo-tag-map/lib/leaflet@1.7.1.js"></script>`;
const ChineseTmsProviders = `<script data-pjax src="//unpkg.com/hexo-tag-map/lib/leaflet.ChineseTmsProviders@1.0.4.js"></script>`;
const proj4 = `<script data-pjax src="//unpkg.com/hexo-tag-map/lib/proj4@2.4.3.js"></script>`;
const proj4leaflet = `<script data-pjax src="//unpkg.com/hexo-tag-map/lib/proj4leaflet@1.0.1.min.js"></script>`;
let geoq_txt = "GeoQ";
let gaode_txt = "高德地图";
let google_txt = "Google Maps";
let baidu_txt = "Baidu Map";

function hunhe(args){
    args = args.join(' ').split(',');
    let mapWidth = '100%';
    let mapHeight = '360px';
    let zoom = 14;
    let alt = '';
    let altLan = 113.884049;
    let altLat = 22.543389;
    if (args.length == 1) {
        alt = '这里是深圳欢乐港湾，有着亚洲最大的摩天轮！';
    } else if (args.length == 2) {
        altLan = args[0].trim();
        altLat = args[1].trim();
    } else if (args.length == 3) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
    } else if (args.length == 4) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
    } else if (args.length == 5) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
    } else if (args.length == 6 || args.length == 7) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
        mapHeight = args[5].trim();
    } else if (args.length > 7 ) {
        console.error('>>>>>>>map标签错误：标签内参数不正确,请查看文档：https://guole.fun/posts/41887/');
        throw new Error('标签内参数不正确,请查看文档：https://guole.fun/posts/41887/');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom)) {
             } else {
                console.error('>>>>>>>map标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(3~18),文档：https://guole.fun/posts/41887/');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
                }
        } else {
            console.error('>>>>>>>map标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(3~18),文档：https://guole.fun/posts/41887/');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
        }
        if (args.length >= 4) {
            if (zoom < 3 || zoom > 18 ) {
                console.error('>>>>>>>map标签错误：标签内缩放等级超出范围(3~18)，请查看文档：https://guole.fun/posts/41887/');
                throw new Error('标签内缩放等级超出范围(3~18)，请查看文档：https://guole.fun/posts/41887/');
            } else {}
        } else {}
    let mapid = 'map-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += '<div class="map-box" style="margin: 0.8rem 0 1.6rem 0;">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;border-radius: 5px;"></div>';
    result += '</div>';
    result += '<script type="text/javascript">';
    result += "var normalm=L.tileLayer.chinaProvider('GaoDe.Normal.Map',{maxZoom:20,minZoom:1,attribution:'" + gaode_txt + "'});";
    result += "var imgm=L.tileLayer.chinaProvider('GaoDe.Satellite.Map',{maxZoom:20,minZoom:1,attribution:'" + gaode_txt + "'});";
    result += "var imga=L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion',{maxZoom:20,minZoom:1,attribution:'" + gaode_txt + "'});";
    result += "var normalMap=L.tileLayer.chinaProvider('Google.Normal.Map',{maxZoom:20,minZoom:1,attribution:'" + google_txt + "'}),satelliteMap=L.tileLayer.chinaProvider('Google.Satellite.Map',{maxZoom:21,minZoom:1,attribution:'" + google_txt + "'});";
    result += "routeMap=L.tileLayer.chinaProvider('Google.Satellite.Annotion',{maxZoom:21,minZoom:1});";
    result += "var normalMap=L.tileLayer.chinaProvider('Google.Normal.Map',{maxZoom:21,minZoom:1,attribution:'" + google_txt + "'}),satelliteMap=L.tileLayer.chinaProvider('Google.Satellite.Map',{maxZoom:21,minZoom:1,attribution:'" + google_txt + "'}),routeMap=L.tileLayer.chinaProvider('Google.Satellite.Annotion',{maxZoom:21,minZoom:1,attribution:'" + google_txt + "'});";
    result += "var normalm1=L.tileLayer.chinaProvider('Geoq.Normal.Map',{maxZoom:21,minZoom:1,attribution:'" + geoq_txt + "'});";
    result += 'var normal=L.layerGroup([normalm]),image=L.layerGroup([imgm,imga]);';
    result += 'var baseLayers={"高德地图":normal,"智图地图":normalm1,"谷歌地图":normalMap,"高德卫星地图":imgm,"谷歌卫星地图":satelliteMap,"高德卫星标注":image,"谷歌卫星标注":routeMap};';
        if (args.length == 7) {
            if (args[6].trim() == 2) {
                result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[normalm1],zoomControl:false});";
            } else if (args[6].trim() == 3) {
                result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[normalMap],zoomControl:false});";
            } else if (args[6].trim() == 4) {
                result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[imgm],zoomControl:false});";
            } else if (args[6].trim() == 5) {
                result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[satelliteMap],zoomControl:false});";
            } else if (args[6].trim() == 6) {
                result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[image],zoomControl:false});";
            } else if (args[6].trim() == 7) {
                result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[routeMap],zoomControl:false});";
            } else {
                result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[normal],zoomControl:false});";
            }
        } else {
            result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[normal],zoomControl:false});";
        }
    result += "L.control.layers(baseLayers,null).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
        if (args.length == 2) {
            result += '</script>';
            return result;
        } else {
            result += "var marker = L.marker(['" + altLat + "','" + altLan + "']).addTo(mymap);";
            result += 'marker.bindPopup("' + alt + '").openPopup();';
            result += '</script>';
            return result;
        }
};
hexo.extend.tag.register('map', hunhe);
hexo.extend.tag.register('Map', hunhe);

function gaode(args){
    args = args.join(' ').split(',');
    let mapWidth = '100%';
    let mapHeight = '360px';
    let zoom = 14;
    let alt = '';
    let altLan = 117.086471;
    let altLat = 36.264217;
    if (args.length == 1) {
        alt = '这里是东岳泰山，海拔1532.7米！';
    } else if (args.length == 2) {
        altLan = args[0].trim();
        altLat = args[1].trim();
    } else if (args.length == 3) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
    } else if (args.length == 4) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
    } else if (args.length == 5) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
    } else if (args.length == 6 || args.length == 7) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
        mapHeight = args[5].trim();
    } else if (args.length > 7 ) {
        console.error('>>>>>>>gaodeMap标签错误：标签内参数不正确，请查看文档：https://guole.fun/posts/41887/');
        throw new Error('标签内参数不正确,请查看文档：https://guole.fun/posts/41887/');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom)) {
             } else {
                console.error('>>>>>>>gaodeMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(3~18),文档：https://guole.fun/posts/41887/');
                throw new Error('标签内经纬度或缩放等级值不正确，文档：https://guole.fun/posts/41887/');
                }
        } else {
            console.error('>>>>>>>gaodeMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(3~18),文档：https://guole.fun/posts/41887/');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
        }
        if (args.length >= 4) {
            if (zoom < 3 || zoom > 18 ) {
                console.error('>>>>>>>gaodeMap标签错误：标签内缩放等级超出范围(3~18)，请查看文档：https://guole.fun/posts/41887/');
                throw new Error('标签内缩放等级超出范围(3~18)，请查看文档：https://guole.fun/posts/41887/');
            } else {}
        } else {}
    let mapid = 'gaodeMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += '<div class="map-box" style="margin: 0.8rem 0 1.6rem 0;">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;border-radius: 5px;"></div>';
    result += '</div>';
    result += '<script type="text/javascript">';
    result += "var normalm=L.tileLayer.chinaProvider('GaoDe.Normal.Map',{maxZoom:20,minZoom:1,attribution:'" + gaode_txt + "'});";
    result += "var imgm=L.tileLayer.chinaProvider('GaoDe.Satellite.Map',{maxZoom:20,minZoom:1,attribution:'" + gaode_txt + "'});";
    result += "var imga=L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion',{maxZoom:20,minZoom:1,attribution:'" + gaode_txt + "'});";
    result += 'var normal=L.layerGroup([normalm]),image=L.layerGroup([imgm,imga]);';
    result += 'var baseLayers={"高德地图":normal,"高德卫星地图":imgm,"高德卫星标注":image};';
    if (args.length == 7) {
        if (args[6].trim() == 2) {
            result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[imgm],zoomControl:false});";
        } else if (args[6].trim() == 3) {
            result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[image],zoomControl:false});";
        } else {
            result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[normal],zoomControl:false});";
        }    
    } else {
        result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[normal],zoomControl:false});";
    }
    result += "L.control.layers(baseLayers,null).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
        if (args.length == 2) {
            result += '</script>';
            return result;
        } else {
            result += "var marker = L.marker(['" + altLat + "','" + altLan + "']).addTo(mymap);";
            result += 'marker.bindPopup("' + alt + '").openPopup();';
            result += '</script>';
            return result;
        }
};
hexo.extend.tag.register('gaodeMap', gaode);
hexo.extend.tag.register('GaodeMap', gaode);
hexo.extend.tag.register('Amap', gaode);
hexo.extend.tag.register('amap', gaode);

function openstreet(args){
    args = args.join(' ').split(',');
    let mapWidth = '100%';
    let mapHeight = '360px';
    let zoom = 14;
    let alt = '';
    let altLan = 113.892994;
    let altLat = 22.55025;
    if (args.length == 1) {
        alt = '这里是深圳欢乐港湾！';
    } else if (args.length == 2) {
        altLan = args[0].trim();
        altLat = args[1].trim();
    } else if (args.length == 3) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
    } else if (args.length == 4) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
    } else if (args.length == 5) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
    } else if (args.length == 6) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
        mapHeight = args[5].trim();
    } else if (args.length > 6 ) {
        console.error('>>>>>>>openstreetMap标签错误：标签内参数不正确,请查看文档：https://guole.fun/posts/41887/');
        throw new Error('标签内参数不正确,请查看文档：https://guole.fun/posts/41887/');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom)) {
             } else {
                console.error('>>>>>>>openstreetMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(1~18),文档：https://guole.fun/posts/41887/');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
                }
        } else {
            console.error('>>>>>>>openstreetMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(1~18),文档：https://guole.fun/posts/41887/');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
        }
        if (args.length >= 4) {
            if (zoom < 1 || zoom > 18 ) {
                console.error('>>>>>>>openstreetMap标签错误：标签内缩放等级超出范围(1~18)，请查看文档：https://guole.fun/posts/41887/');
                throw new Error('标签内缩放等级超出范围(1~18)，请查看文档：https://guole.fun/posts/41887/');
            } else {}
        } else {}
    let mapid = 'openstreetMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += '<div class="map-box" style="margin: 0.8rem 0 1.6rem 0;">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;border-radius: 5px;"></div>';
    result += '</div>';
    result += '<script>';
    result += "var mymap = L.map('" + mapid + "', { attributionControl:false }).setView(['" + altLat + "','" + altLan + "']," + zoom + ");";
    result += "L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(mymap);";
    result += "var marker = L.marker(['" + altLat + "','" + altLan + "']).addTo(mymap);";
        if (args.length == 2) {
            result += '</script>';
            return result;
        } else {
            result += 'marker.bindPopup("' + alt + '").openPopup();';
            result += '</script>';
            return result;
        }
};
hexo.extend.tag.register('openstreetMap', openstreet);
hexo.extend.tag.register('OpenStreetMap', openstreet);

function baidu(args){
    args = args.join(' ').split(',');
    let mapWidth = '100%';
    let mapHeight = '360px';
    let zoom = 14;
    let alt = '';
    let altLan = 110.073028;
    let altLat = 34.497647;
    if (args.length == 1) {
        alt = '这里是西岳华山，海拔2154.9米！';
    } else if (args.length == 2) {
        altLan = args[0].trim();
        altLat = args[1].trim();
    } else if (args.length == 3) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
    } else if (args.length == 4) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
    } else if (args.length == 5) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
    } else if (args.length == 6 || args.length == 7) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
        mapHeight = args[5].trim();
    } else if (args.length > 7 ) {
        console.error('>>>>>>>baiduMap标签错误：标签内参数不正确，请查看文档：https://guole.fun/posts/41887/');
        throw new Error('标签内参数不正确,请查看文档：https://guole.fun/posts/41887/');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom)) {
             } else {
                console.error('>>>>>>>baiduMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(4~18),文档：https://guole.fun/posts/41887/');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
                }
        } else {
            console.error('>>>>>>>baiduMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(4~18),文档：https://guole.fun/posts/41887/');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
        }
        if (args.length >= 4) {
            if (zoom < 4 || zoom > 18 ) {
                console.error('>>>>>>>baiduMap标签错误：标签内缩放等级超出范围(4~18)，请查看文档：https://guole.fun/posts/41887/');
                throw new Error('标签内缩放等级超出范围(4~18)，请查看文档：https://guole.fun/posts/41887/');
            } else {}
        } else {}
    let mapid = 'baiduMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += proj4;
    result += proj4leaflet;
    result += ChineseTmsProviders;
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;border-radius: 5px;"></div>';
    result += '<script type="text/javascript">';
    result += "var normalMap=L.tileLayer.chinaProvider('Baidu.Normal.Map',{maxZoom:20,minZoom:4,attribution:'" + baidu_txt + "'}),satelliteMap=L.tileLayer.chinaProvider('Baidu.Satellite.Map',{maxZoom:18,minZoom:1,attribution:'" + baidu_txt + "'}),annotionMap=L.tileLayer.chinaProvider('Baidu.Satellite.Annotion',{maxZoom:18,minZoom:1,attribution:'" + baidu_txt + "'});";
    result += 'var imageMap=L.layerGroup([satelliteMap,annotionMap]);';
    result += 'var baseLayers={"百度地图":normalMap,"百度卫星图":satelliteMap,"百度卫星标注":imageMap};';
    if (args.length == 7) {
        if (args[6].trim() == 2) {
            result += 'var mymap=L.map("' + mapid + '",{crs:L.CRS.Baidu,minZoom:2,maxZoom:20,attributionControl:true,center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[satelliteMap],zoomControl:false});';
        } else {
            result += 'var mymap=L.map("' + mapid + '",{crs:L.CRS.Baidu,minZoom:2,maxZoom:20,attributionControl:true,center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalMap],zoomControl:false});';
        }
    } else {
        result += 'var mymap=L.map("' + mapid + '",{crs:L.CRS.Baidu,minZoom:2,maxZoom:20,attributionControl:true,center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalMap],zoomControl:false});';
    }
    result += "L.control.layers(baseLayers,overlayLayers).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
        if (args.length == 2) {
            result += '</script>';
            return result;
        } else {
            result += "var marker = L.marker(['" + altLat + "','" + altLan + "']).addTo(mymap);";
            result += 'marker.bindPopup("' + alt + '").openPopup();';
            result += '</script>';
            return result;
        }
};
hexo.extend.tag.register('baiduMap', baidu);
hexo.extend.tag.register('BaiduMap', baidu);

function geoq(args){
    args = args.join(' ').split(',');
    let mapWidth = '100%';
    let mapHeight = '360px';
    let zoom = 14;
    let alt = '';
    let altLan = 114.058975;
    let altLat = 22.543754;
    if (args.length == 1) {
        alt = '这里是中国深圳！';
    } else if (args.length == 2) {
        altLan = args[0].trim();
        altLat = args[1].trim();
    } else if (args.length == 3) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
    } else if (args.length == 4) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
    } else if (args.length == 5) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
    } else if (args.length == 6 || args.length == 7) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
        mapHeight = args[5].trim();
    } else if (args.length > 7 ) {
        console.error('>>>>>>>geoqMap标签错误：标签内参数不正确，请查看文档：https://guole.fun/posts/41887/');
        throw new Error('标签内参数不正确,请查看文档：https://guole.fun/posts/41887/');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom)) {
             } else {
                console.error('>>>>>>>geoqMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(1~18),文档：https://guole.fun/posts/41887/');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
                }
        } else {
            console.error('>>>>>>>geoqMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(1~18),文档：https://guole.fun/posts/41887/');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
        }
        if (args.length >= 4) {
            if (zoom < 1 || zoom > 18 ) {
                console.error('>>>>>>>geoqMap标签错误：标签内缩放等级超出范围(1~18)，请查看文档：https://guole.fun/posts/41887/');
                throw new Error('标签内缩放等级超出范围(1~18)，请查看文档：https://guole.fun/posts/41887/');
            } else {}
        } else {}
    let mapid = 'geoqMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;border-radius: 5px;"></div>';
    result += '<script type="text/javascript">';
    result += "var normalm1=L.tileLayer.chinaProvider('Geoq.Normal.Map',{maxZoom:20,minZoom:1,attribution:'" + geoq_txt + "'});";
    result += "var normalm2=L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue',{maxZoom:20,minZoom:1,attribution:'" + geoq_txt + "'});";
    result += "var normalm3=L.tileLayer.chinaProvider('Geoq.Normal.Gray',{maxZoom:20,minZoom:1,attribution:'" + geoq_txt + "'});";
    result += "var normalm4=L.tileLayer.chinaProvider('Geoq.Normal.Warm',{maxZoom:20,minZoom:1,attribution:'" + geoq_txt + "'});";
    result += "var normalm5=L.tileLayer.chinaProvider('Geoq.Theme.Hydro',{maxZoom:20,minZoom:1,attribution:'" + geoq_txt + "'});";
    result += 'var normal=L.layerGroup([normalm1,normalm2,normalm3,normalm4,normalm5]);';
    result += 'var baseLayers={"智图地图":normalm1,"午夜蓝":normalm2,"灰色":normalm3,"暖色":normalm4,"水系":normalm5};';
    if (args.length == 7) {
        if (args[6].trim() == 2) {
            result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalm2],zoomControl:false});';
        } else if (args[6].trim() == 3) {
            result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalm3],zoomControl:false});';
        } else if (args[6].trim() == 4) {
            result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalm4],zoomControl:false});';
        } else if (args[6].trim() == 5) {
            result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalm5],zoomControl:false});';
        } else {
            result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalm1],zoomControl:false});';
        }
    } else {
        result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalm1],zoomControl:false});';
    }
    result += "L.control.layers(baseLayers,null).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
        if (args.length == 2) {
            result += '</script>';
            return result;
        } else {
            result += "var marker = L.marker(['" + altLat + "','" + altLan + "']).addTo(mymap);";
            result += 'marker.bindPopup("' + alt + '").openPopup();';
            result += '</script>';
            return result;
        }
};
hexo.extend.tag.register('geoqMap', geoq);
hexo.extend.tag.register('GeoqMap', geoq);
hexo.extend.tag.register('GeoQ', geoq);

function google(args){
    args = args.join(' ').split(',');
    let mapWidth = '100%';
    let mapHeight = '360px';
    let zoom = 14;
    let alt = '';
    let altLan = 104.077795;
    let altLat = 30.65555;
    if (args.length == 1) {
        alt = '这里是成都春熙路，超多小姐姐！';
    } else if (args.length == 2) {
        altLan = args[0].trim();
        altLat = args[1].trim();
    } else if (args.length == 3) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
    } else if (args.length == 4) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
    } else if (args.length == 5) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
    } else if (args.length == 6 || args.length == 7) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = args[2].trim();
        zoom = args[3].trim();
        mapWidth = args[4].trim();
        mapHeight = args[5].trim();
    } else if (args.length > 7 ) {
        console.error('>>>>>>>googleMap标签错误：标签内参数不正确，请查看文档：https://guole.fun/posts/41887/');
        throw new Error('标签内参数不正确,请查看文档：https://guole.fun/posts/41887/');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom)) {
             } else {
                console.error('>>>>>>>googleMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(1~20),文档：https://guole.fun/posts/41887/');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
                }
        } else {
            console.error('>>>>>>>googleMap标签错误：标签内经纬度或缩放等级值不正确。经度(-180~180),纬度(-90~90),缩放等级(1~20),文档：https://guole.fun/posts/41887/');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://guole.fun/posts/41887/');
        }
        if (args.length >= 4) {
            if (zoom < 1 || zoom > 20 ) {
                console.error('>>>>>>>googleMap标签错误：标签内缩放等级超出范围(1~20)，请查看文档：https://guole.fun/posts/41887/');
                throw new Error('标签内缩放等级超出范围(1~20)，请查看文档：https://guole.fun/posts/41887/');
            } else {}
        } else {}
    let mapid = 'googleMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;border-radius: 5px;"></div>';
    result += '<script type="text/javascript">';
    result += "var normalMap=L.tileLayer.chinaProvider('Google.Normal.Map',{maxZoom:22,minZoom:1,attribution:'" + google_txt + "'}),satelliteMap=L.tileLayer.chinaProvider('Google.Satellite.Map',{maxZoom:22,minZoom:1,attribution:'" + google_txt + "'}),routeMap=L.tileLayer.chinaProvider('Google.Satellite.Annotion',{maxZoom:22,minZoom:1,attribution:'" + google_txt + "'});";
    result += 'var baseLayers={"谷歌地图":normalMap,"谷歌卫星图":satelliteMap,"谷歌卫星标注": routeMap};';
    result += 'var overlayLayers={};';
    if (args.length == 7) {
        if (args[6].trim() == 2) {
            result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[satelliteMap],zoomControl:false});';
        } else if (args[6].trim() == 3) {
            result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[routeMap],zoomControl:false});';
        } else {
            result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalMap],zoomControl:false});';
        }    
    } else {
        result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalMap],zoomControl:false});';
    }
    result += "L.control.layers(baseLayers,null).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
        if (args.length == 2) {
            result += '</script>';
            return result;
        } else {
            result += "var marker = L.marker(['" + altLat + "','" + altLan + "']).addTo(mymap);";
            result += 'marker.bindPopup("' + alt + '").openPopup();';
            result += '</script>';
            return result;
        }
};
hexo.extend.tag.register('googleMap', google);
hexo.extend.tag.register('GoogleMap', google);
