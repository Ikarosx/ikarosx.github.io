import{_ as n,p as s,q as a,Y as t}from"./framework-f2b64c38.js";const p={},e=t(`<h2 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h2><p>最近练习开发小程序<br> 采用云开发<br> 存入数据库时使用Date.now()<br> 前端取出时是UTC格式<br> 如2021-02-23T09:16:26.851Z</p><h2 id="解决" tabindex="-1"><a class="header-anchor" href="#解决" aria-hidden="true">#</a> 解决</h2><p>由于获取到的格式通过typeof查看为string<br> 所以不能直接调用date.getXXX()方法<br> 需要先转成date类型</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 假如数据库取出来的为这样子</span>
<span class="token keyword">var</span> utcDateString <span class="token operator">=</span> <span class="token string">&quot;2021-02-23T09:16:26.851Z&quot;</span>  
<span class="token comment">// 通过Date.parse得到时间戳</span>
<span class="token keyword">var</span> timestamp <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>utcDateString<span class="token punctuation">)</span>
<span class="token comment">// 通过new Date得到日期对象</span>
<span class="token keyword">var</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>timestamp<span class="token punctuation">)</span>
<span class="token comment">// 通过以下函数得到格式化后的时间</span>
<span class="token keyword">function</span> <span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token parameter">date</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> fmt <span class="token operator">=</span> <span class="token string">&#39;yyyy-MM-dd hh:mm:ss&#39;</span>
  <span class="token keyword">const</span> o <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;M+&#39;</span><span class="token operator">:</span> date<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 月份</span>
    <span class="token string-property property">&#39;d+&#39;</span><span class="token operator">:</span> date<span class="token punctuation">.</span><span class="token function">getDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//日</span>
    <span class="token string-property property">&#39;h+&#39;</span><span class="token operator">:</span> date<span class="token punctuation">.</span><span class="token function">getHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//小时</span>
    <span class="token string-property property">&#39;m+&#39;</span><span class="token operator">:</span> date<span class="token punctuation">.</span><span class="token function">getMinutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//分钟</span>
    <span class="token string-property property">&#39;s+&#39;</span><span class="token operator">:</span> date<span class="token punctuation">.</span><span class="token function">getSeconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//秒</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(y+)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>fmt<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    fmt <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>RegExp<span class="token punctuation">.</span>$1<span class="token punctuation">,</span>date<span class="token punctuation">.</span><span class="token function">getFullYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> k <span class="token keyword">in</span> o<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">&#39;(&#39;</span><span class="token operator">+</span>k<span class="token operator">+</span><span class="token string">&#39;)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>fmt<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
     fmt <span class="token operator">=</span>  fmt<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>RegExp<span class="token punctuation">.</span>$1<span class="token punctuation">,</span> o<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token string">&#39;0&#39;</span> <span class="token operator">+</span> o<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">:</span> o<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// console.log(fmt)</span>
  <span class="token keyword">return</span> fmt
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","weixinxiaochengxuyunkaifashujukuUTCshijiangeshihua.html.vue"]]);export{r as default};