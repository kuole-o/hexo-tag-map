<!-- This plugin is developed by guole.fun -->
# Hexo-tag-map
给你的 Hexo 文章插入交互式地图吧！支持GoogleMap、高德地图、百度地图、Geoq地图、openstreetMap常规地图+卫星地图+卫星标注地图！一个强大的地图插件。  
Insert an interactive map into your Hexo article! Support GoogleMap, Gaode map, Baidu map, Geoq map, openstreetMap regular map + satellite map + satellite annotated map! A powerful map plugin.
* author: guole
* https://guole.fun/
* license: Apache-2.0
* https://github.com/kuole-o/hexo-tag-map/blob/main/LICENSE
* Tutorials：https://guole.fun/posts/41887/

## 特性

* 包含
  * [混合地图]你将获得一个混合切换GoogleMap、高德地图、Geoq地图，常规地图+卫星地图+卫星标注地图共7个图层的地图  
  * [GoogleMap]你还将获得一个单独的谷歌地图+谷歌卫星地图  
  * [高德地图]你还将获得一个单独的高德地图+高德卫星地图+高德卫星标注地图  
  * [百度地图]你还将获得一个单独的百度地图+百度卫星地图+百度卫星标注地图  
  * [Geoq地图]你还将获得一个单独的Geoq地图+5种显示风格  
  * [openstreetMap]你还将获得一个单独的openstreetMap常规地图  
  * 支持标记点提示文本
  * **支持各个地图缩放等级配置+经纬度配置+地图容器宽高配置+默认展示地图类型配置**
  * 用法超级简单
  * Butterfly已验证，其他Hexo主题，欢迎体验  

<details>
<summary>更新日志 v1.2.1</summary>
  * 优化地图容器样式，增加间距 `margin: 0.8rem 0 1.6rem 0;` <br>
  * 更换依赖包为 `unpkg.com` <br>
</details>

## [Demo页面](https://guole.fun/map/)

[详细用法，请点击这里查看](https://guole.fun/posts/41887/)

<details>
<summary>点击展开截图</summary>

* 混合地图
![混合地图](https://cdn.guole.fun/img/202107/hunhe1.jpg)
![混合地图](https://cdn.guole.fun/img/202107/hunhe2.jpg)
![混合地图](https://cdn.guole.fun/img/202107/hunhe3.jpg)
![混合地图](https://cdn.guole.fun/img/202107/hunhe4.jpg)
![混合地图](https://cdn.guole.fun/img/202107/hunhe5.jpg)
![混合地图](https://cdn.guole.fun/img/202107/hunhe6.jpg)
![混合地图](https://cdn.guole.fun/img/202107/hunhe7.jpg)

* 谷歌地图
![谷歌地图](https://cdn.guole.fun/img/202107/google1.jpg)
![谷歌地图](https://cdn.guole.fun/img/202107/google2.jpg)
![谷歌地图](https://cdn.guole.fun/img/202107/google3.jpg)

* 高德地图
![高德地图](https://cdn.guole.fun/img/202107/gaode1.jpg)
![高德地图](https://cdn.guole.fun/img/202107/gaode2.jpg)
![高德地图](https://cdn.guole.fun/img/202107/gaode3.jpg)

* 百度地图
![百度地图](https://cdn.guole.fun/img/202107/baidu1.jpg)
![百度地图](https://cdn.guole.fun/img/202107/baidu2.jpg)
![百度地图](https://cdn.guole.fun/img/202107/baidu3.jpg)

* Geoq地图
![Geoq地图](https://cdn.guole.fun/img/202107/baidu1.jpg)
![Geoq地图](https://cdn.guole.fun/img/202107/baidu2.jpg)
![Geoq地图](https://cdn.guole.fun/img/202107/baidu3.jpg)
![Geoq地图](https://cdn.guole.fun/img/202107/baidu4.jpg)
![Geoq地图](https://cdn.guole.fun/img/202107/baidu5.jpg)

* openstreetMap
![openstreetMap](https://cdn.guole.fun/img/202107/openstreet.jpg)
</details>

## 安装

```shell
npm install hexo-tag-map --save
```

## 用法

<details>
<summary>点击展开详情</summary>

插入一个混合地图的示例：
{% map %}
  
插入一个高德地图的示例：
{% gaodeMap %} 
  
插入一个openstreetMap的示例：
{% openstreetMap %}
  
插入一个百度地图的示例：
{% baiduMap %}
  
插入一个geoqMap的示例：
{% geoqMap %}
  
插入一个googleMap的示例：
{% googleMap %}

[详细用法，请点击这里查看](https://guole.fun/posts/41887/)
</details>

## 许可
[Apache License 2.0](https://github.com/kuole-o/hexo-tag-map/blob/main/LICENSE)