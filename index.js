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

const css_text = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hexo-tag-map/lib/leaflet@1.7.1.css">`
const js_text = `<script data-pjax src="https://cdn.jsdelivr.net/npm/hexo-tag-map/lib/leaflet@1.7.1.js"></script>`

hexo.extend.tag.register('map', function(args){
    args = args.join(' ').split(',');

    let mapWidth = '100%';
    let mapHeight = '360px';
    let zoom = 14;
    let alt = '这里是北京天安门';
    let altLan = 116.40361;
    let altLat = 39.91469;
    if (args.length == 2) {
        altLan = args[0].trim();
        altLat = args[1].trim();
        alt = '';
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
    } else if (args.length > 6 || args.length == 1 ) {
        console.error('>>>>>>>错误：标签内参数不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内参数不正确,请查看文档：https://github.com/kuole-o/hexo-tag-map');
    }
    var n = /^(\-|\+)?\d+(\.\d+)?$/; //匹配正负数，包含正负浮点数
    var r = /^\+?[1-9][0-9]*$/; //匹配正整数
    if (n.altLan() && n.altLat() && -180 >= altLan <= 180 && -90 >= altLat <= 90 ) {
        if (r.zoom() && zoom <= 18 ) {
      } else {
        console.error('>>>>>>>错误：标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
        throw new Error('标签内经纬度或缩放等级值不正确，请查看文档：https://github.com/kuole-o/hexo-tag-map');
      }
    }
    let mapid = 'map-' + altLan + '-' + altLat;
    let result = '';
    result += css_text;
    result += js_text;
    result += '<div class="map-box">';
    result += '<div id="' + mapid + '"' + ' style="max-width:' + mapWidth + '; height:' + mapHeight + ';display: block;margin:0 auto;"></div>';
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
});