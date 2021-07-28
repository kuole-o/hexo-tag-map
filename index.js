// A map plug-in under hexo, which supports rendering of beautiful interactive maps on article pages.
// * author: guole
// * https://guole.fun/
// * license: Apache-2.0
// * https://github.com/kuole-o/hexo-tag-map/blob/main/LICENSE
// {% map altLan, altLat, alt, zoom, mapWidth, mapHeight %}
// {% map 经度, 纬度, 文本, 缩放级别, 宽, 高 %}
// 一个例子：{% map 114.533983, 22.569441,这里是西涌沙滩, 14, 100%, 360px %}
// 一个例子：{% map %}

'use strict';

const css_text = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hexo-tag-map/lib/leaflet@1.7.1.css">`;
const js_text = `<script data-pjax src="https://cdn.jsdelivr.net/npm/hexo-tag-map/lib/leaflet@1.7.1.js"></script>`;
const ChineseTmsProviders = `<script data-pjax src="./lib/leaflet.ChineseTmsProviders.js"></script>`;
const proj4 = `<script src="https://cdn.bootcss.com/proj4js/2.4.3/proj4.js"></script>`;
const proj4leaflet = `<script src="https://cdn.bootcss.com/proj4leaflet/1.0.1/proj4leaflet.min.js"></script>`;
let geoq_txt = "智图地图 Geoq.cn";
let gaode_txt = "高德地图 Amap.com";
let google_txt = "谷歌地图 Google.com";
let baidu_txt = "百度地图 Baidu.com";

function hunhe(args){
    args = args.join(' ').split(',');
    let mapWidth = '100%';
    let mapHeight = '360px';
    let zoom = 14;
    let alt = '';
    let altLan = 113.884049;
    let altLat = 22.543389;
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
        console.error('>>>>>>>错误：标签内参数不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内参数不正确,请查看文档：https://github.com/kuole-o/hexo-tag-map');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom) && zoom <= 20 ) {
             } else {
                console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                }
        } else {
            console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        }
    let mapid = 'map-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += '<div class="map-box">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;"></div>';
    result += '</div>';
    result += '<script>';
    result += "var normalm=L.tileLayer.chinaProvider('GaoDe.Normal.Map',{maxZoom:18,minZoom:5,attribution:'" + gaode_txt + "'});";
    result += "var imgm=L.tileLayer.chinaProvider('GaoDe.Satellite.Map',{maxZoom:18,minZoom:5,attribution:'" + gaode_txt + "'});";
    result += "var imga=L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion',{maxZoom:18,minZoom:5,attribution:'" + gaode_txt + "'});";
    result += "var normalMap=L.tileLayer.chinaProvider('Google.Normal.Map',{maxZoom:18,minZoom:5,attribution:'" + google_txt + "'}),satelliteMap=L.tileLayer.chinaProvider('Google.Satellite.Map',{maxZoom:18,minZoom:5,attribution:'" + google_txt + "'});";
    result += "var normalm1=L.tileLayer.chinaProvider('Geoq.Normal.Map',{maxZoom:18,minZoom:5,attribution:'" + geoq_txt + "'});";
    result += 'var baseLayers={"高德地图":normal,"智图地图":normalm1,"谷歌地图":normalMap,"高德卫星地图":image,"谷歌卫星地图":satelliteMap};';
    result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[normal],zoomControl:false});";
    result += "L.control.layers(baseLayers,null).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
    result += '</script>';
    return result;
};
hexo.extend.tag.register('map', hunhe);

function gaode(args){
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
        console.error('>>>>>>>错误：标签内参数不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内参数不正确,请查看文档：https://github.com/kuole-o/hexo-tag-map');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom) && zoom <= 19 ) {
             } else {
                console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                }
        } else {
            console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        }
    let mapid = 'gaodeMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += '<div class="map-box">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;"></div>';
    result += '</div>';
    result += '<script>';
    result += "var normalm=L.tileLayer.chinaProvider('GaoDe.Normal.Map',{maxZoom:18,minZoom:5,attribution:'" + gaode_txt + "'});";
    result += "var imgm=L.tileLayer.chinaProvider('GaoDe.Satellite.Map',{maxZoom:18,minZoom:5,attribution:'" + gaode_txt + "'});";
    result += "var imga=L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion',{maxZoom:18,minZoom:5,attribution:'" + gaode_txt + "'});";
    result += 'var normal=L.layerGroup([normalm]),image=L.layerGroup([imgm,imga]);var baseLayers={"高德地图":normal,"高德卫星图":image,}';
    result += "var mymap=L.map('" + mapid + "',{center:[" + altLat + "," + altLan + "],zoom:" + zoom + ",layers:[normal],zoomControl:false});";
    result += "L.control.layers(baseLayers,null).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
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
hexo.extend.tag.register('gaodeMap', gaode);

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
        console.error('>>>>>>>错误：标签内参数不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内参数不正确,请查看文档：https://github.com/kuole-o/hexo-tag-map');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom) && zoom <= 18 ) {
             } else {
                console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                }
        } else {
            console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        }
    let mapid = 'openstreetMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += '<div class="map-box">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;"></div>';
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

function baidu(args){
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
        console.error('>>>>>>>错误：标签内参数不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内参数不正确,请查看文档：https://github.com/kuole-o/hexo-tag-map');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom) && zoom <= 18 ) {
             } else {
                console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                }
        } else {
            console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        }
    let mapid = 'baiduMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += proj4;
    result += proj4leaflet;
    result += '<div class="map-box">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;"></div>';
    result += '</div>';
    result += '<script>';
    result += "var normalMap=L.tileLayer.chinaProvider('Baidu.Normal.Map',{maxZoom:18,minZoom:5,attribution:'" + baidu_txt + "'}),satelliteMap=L.tileLayer.chinaProvider('Baidu.Satellite.Map',{maxZoom:18,minZoom:5,attribution:'" + baidu_txt + "'}),annotionMap=L.tileLayer.chinaProvider('Baidu.Satellite.Annotion',{maxZoom:18,minZoom:5,attribution:'" + baidu_txt + "'});";
    result += 'var baseLayers={"百度地图":normalMap,"百度卫星图":satelliteMap}';
    result += 'var mymap=L.map("' + mapid + '",{crs:L.CRS.Baidu,minZoom:3,maxZoom:18,attributionControl:false,center:[' + altLat + ',' + altLan + '],zoom:' + zoom + '});';
    result += "L.control.layers(baseLayers,null).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
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
hexo.extend.tag.register('baiduMap', baidu);

function geoq(args){
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
        console.error('>>>>>>>错误：标签内参数不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内参数不正确,请查看文档：https://github.com/kuole-o/hexo-tag-map');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom) && zoom <= 18 ) {
             } else {
                console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                }
        } else {
            console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        }
    let mapid = 'geoqMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += '<div class="map-box">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;"></div>';
    result += '</div>';
    result += '<script>';
    result += "var normalm1=L.tileLayer.chinaProvider('Geoq.Normal.Map',{maxZoom:18,minZoom:5,attribution:'" + geoq_txt + "'});";
    result += "var normalm2=L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue',{maxZoom:18,minZoom:5,attribution:'" + geoq_txt + "'});";
    result += "var normalm3=L.tileLayer.chinaProvider('Geoq.Normal.Gray',{maxZoom:18,minZoom:5,attribution:'" + geoq_txt + "'});";
    result += "var normalm4=L.tileLayer.chinaProvider('Geoq.Normal.Warm',{maxZoom:18,minZoom:5,attribution:'" + geoq_txt + "'});";
    result += "var normalm5=L.tileLayer.chinaProvider('Geoq.Theme.Hydro',{maxZoom:18,minZoom:5,attribution:'" + geoq_txt + "'});";
    result += 'var normal=L.layerGroup([normalm1,normalm2,normalm3,normalm4,normalm5]);';
    result += 'var baseLayers={"智图地图":normalm1,"午夜蓝":normalm2,"灰色":normalm3,"暖色":normalm4,"水系":normalm5}';
    result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalm1],zoomControl:false});';
    result += "L.control.layers(baseLayers,null).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
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
hexo.extend.tag.register('geoqMap', geoq);

function google(args){
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
        console.error('>>>>>>>错误：标签内参数不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内参数不正确,请查看文档：https://github.com/kuole-o/hexo-tag-map');
    }
        let n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
        let r = /^\+?[1-9][0-9]*$/; //匹配正整数
        if (n.test(altLan) && n.test(altLat) && altLan <= 180 && altLan >= -180 && altLat <= 90 && altLat >= -90 ) {
            if (r.test(zoom) && zoom <= 18 ) {
             } else {
                console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
                }
        } else {
            console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
            throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        }
    let mapid = 'googleMap-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += ChineseTmsProviders;
    result += '<div class="map-box">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;z-index:1;"></div>';
    result += '</div>';
    result += '<script>';
    result += "var normalMap=L.tileLayer.chinaProvider('Google.Normal.Map',{maxZoom:18,minZoom:5,attribution:'" + google_txt + "'}),satelliteMap=L.tileLayer.chinaProvider('Google.Satellite.Map',{maxZoom:18,minZoom:5,attribution:'" + google_txt + "'});";
    result += 'var baseLayers={"谷歌地图":normalMap,"谷歌卫星图":satelliteMap}';
    result += 'var overlayLayers={}';
    result += 'var mymap=L.map("' + mapid + '",{center:[' + altLat + ',' + altLan + '],zoom:' + zoom + ',layers:[normalMap],zoomControl:false});';
    result += "L.control.layers(baseLayers,overlayLayers).addTo(mymap);L.control.zoom({zoomInTitle:'放大',zoomOutTitle:'缩小'}).addTo(mymap);";
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
hexo.extend.tag.register('googleMap', google);