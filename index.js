// A map plug-in under hexo, which supports rendering of beautiful interactive maps on article pages.
// * author: guole
// * https://guole.fun/
// * license: Apache-2.0
// * https://github.com/kuole-o/hexo-tag-map/blob/main/LICENSE
// {% map mapWidth, mapHeight, altLan, altLat，zoom，alt, displayZoom %}
// {% map 宽, 高, 经度, 纬度，缩放级别，文本, 是否显示缩放开关 %}

'use strict';

const css_text = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hexo-tag-map/lib/leaflet@1.7.1.css">`
const js_text = `<script data-pjax src="https://cdn.jsdelivr.net/npm/hexo-tag-map/lib/leaflet@1.7.1.js"></script>`

hexo.extend.tag.register('map', function(args){
    args = args.join(' ').split(',');

    let mapWidth = '90%';
    let mapHeight = '360px';
    let zoom = 16;
    let alt = '这里是北京天安门';
    let displayZoom = true;
    let altLan = 116.40361;
    let altLat = 39.91469;
    if (args.length == 1) {
        console.error('>>>>>>>错误：请至少标签内包含两个值，经度和维度。请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('缺少经纬度信息，请查看文档：https://github.com/kuole-o/hexo-tag-map');
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
        zoom = args[2].trim();
        alt = args[3].trim();
    } else if (args.length == 5) {
        mapHeight = args[0].trim();
        altLan = args[1].trim();
        altLat = args[2].trim();
        zoom = args[3].trim();
        alt = args[4].trim();
    } else if (args.length == 6) {
        mapWidth = args[0].trim();
        mapHeight = args[1].trim();
        altLan = args[2].trim();
        altLat = args[3].trim();
        zoom = args[4].trim();
        alt = args[5].trim();
    } else if (args.length == 7) {
        mapWidth = args[0].trim();
        mapHeight = args[1].trim();
        altLan = args[2].trim();
        altLat = args[3].trim();
        zoom = args[4].trim();
        alt = args[5].trim();
        if (args[6].trim() == 0) {
            displayZoom = false;
        } else {
            displayZoom = true;
        }
    } else if (args.length > 7 || args.length < 0 ) {
        console.error('>>>>>>>错误：标签内参数不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内参数不正确,请查看文档：https://github.com/kuole-o/hexo-tag-map');
    }
    let mapid = 'map-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += '<div class="max-box">';
    result += '<div id=' + mapid + 'style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;"></div>';
    result += '</div>';
    result += js_text;
    return result;
});
    var mymap = L.map(mapid, { attributionControl:false }).setView([altLat,altLan], zoom);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(mymap);
    var marker = L.marker([altLat,altLan]).addTo(mymap);
	    marker.bindPopup("alt").openPopup();

hexo.extend.tag.register('map', postCheckbox);