import{_ as e,p as a,q as i,Y as d}from"./framework-f2b64c38.js";const t={},n=d(`<h1 id="http缓存" tabindex="-1"><a class="header-anchor" href="#http缓存" aria-hidden="true">#</a> Http缓存</h1><p>http缓存控制通过Cache-Control/ETag/Last-Modified控制</p><h2 id="cache-control" tabindex="-1"><a class="header-anchor" href="#cache-control" aria-hidden="true">#</a> Cache-Control</h2><p>通过Cache-Control可以控制缓存的具体行为，如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># max-age表示从上次接收到资源（Last-Modified）后，在该时间内再次请求的话会从缓存取
# 单位second
Cache-Control: max-age=60
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我现在请求了一个资源，服务器返回Last-Modified为2022-6-25 11:45:00，表示该资源最后修改时间<br> 那么我下次请求该资源，如果携带了Cache-Control: max-age=60，表示<br> Last-Modified + max-age = 2022-6-25 11:46:00 ，在这个时间之前请求该资源可以从缓存里面取<br> 当然这个是前端控制的，可以将这个max-age调大，那么很长一段时间内都会从缓存取<br> 如果超过了2022-6-25 11:46:00，则会发送接口请求资源，采用协商缓存<br> 协商缓存通过ETag/Last-Modified由后端判断是否采用缓存，如果可以采用缓存则返回304</p><h2 id="协商缓存" tabindex="-1"><a class="header-anchor" href="#协商缓存" aria-hidden="true">#</a> 协商缓存</h2><h3 id="last-modified-if-modified-since" tabindex="-1"><a class="header-anchor" href="#last-modified-if-modified-since" aria-hidden="true">#</a> Last-Modified/If-Modified-Since</h3><p>Last-Modified配合If-Modified-Since，浏览器在发现缓存过期后会携带If-Modified-Since<br> 服务器收到后会检查服务器资源的最后修改时间是否在If-Modified-Since之后<br> 如果修改时间在If-Modified-Since之后，说明缓存较旧，则会返回新的资源，状态码200<br> 如果修改时间在If-Modified-Since之前，说明缓存还能用，状态码304，不返回数据<br> 浏览器收到304后继续使用缓存</p><h3 id="etag-if-none-match" tabindex="-1"><a class="header-anchor" href="#etag-if-none-match" aria-hidden="true">#</a> Etag/If-None-Match</h3><p>Etag配合If-None-Match，浏览器在发现缓存过期后会携带If-None-Match<br> If-None-Match的值为请求服务端第一次返回的ETag<br> 服务端收到If-None-Match后，会判断现有资源的ETag和If-None-Match是否一致<br> 一致返回304，不一致返回新的资源<br> ETag的生成是服务端根据文件（包含修改时间）生成的值</p><h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2><ul><li>Cache-Control可以多个值并列， 如Cache-Control: public, max-age=60，更多的值参考文档</li><li>chrome下会有两种缓存，一个是memory，一个是disk，通常css文件采用disk缓存，js存放在memory缓存，因为css文件通常加载了就不会变，js可能频繁加载</li></ul>`,13),r=[n];function c(o,h){return a(),i("div",null,r)}const f=e(t,[["render",c],["__file","0625_httphuancun.html.vue"]]);export{f as default};