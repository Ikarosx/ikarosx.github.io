import{_ as n,p as s,q as a,Y as e}from"./framework-f2b64c38.js";const t={},i=e(`<h2 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h2><p>有时候我们可能想把多个仓库合并在一起</p><p>比如一个前端一个后端</p><p>但由于创建时没想太多</p><p>所以需要弥补一下</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作" aria-hidden="true">#</a> 操作</h2><p>现在有A仓库和B仓库</p><p>我们想把A和B合并在C</p><p>A仓库的内容放在C/A文件夹下</p><p>B仓库的内容放在C/B文件夹下</p><h3 id="创建c仓库" tabindex="-1"><a class="header-anchor" href="#创建c仓库" aria-hidden="true">#</a> 创建C仓库</h3><p>在github上操作一下创建仓库</p><p>本地拉取下来</p><p><code>git clone c.git</code></p><h3 id="合并a仓库" tabindex="-1"><a class="header-anchor" href="#合并a仓库" aria-hidden="true">#</a> 合并A仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在C仓库下添加A仓库的git地址</span>
<span class="token function">git</span> remote <span class="token function">add</span> A a.git
<span class="token comment"># fetch</span>
<span class="token function">git</span> fetch A
<span class="token comment"># 拉取A仓库的master分支到本地分支localA</span>
<span class="token function">git</span> branch <span class="token parameter variable">-b</span> localA A/master
<span class="token comment"># 切换到本地master</span>
<span class="token function">git</span> checkout master
<span class="token comment"># 合并localA到master</span>
<span class="token function">git</span> merge localA
<span class="token comment"># 删除多余的branch和remote</span>
<span class="token function">git</span> remote remove A
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> localA
<span class="token comment"># 但此时我们合并过来的A仓库代码是在根目录，需要移动位置</span>
<span class="token comment"># 代表将xxx移动到A文件夹下</span>
<span class="token function">git</span> <span class="token function">mv</span> xxx A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>移动位置借助powershell遍历</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># Get-ChildItem . 表示列出当前目录下的文件</span>
<span class="token comment"># | 管道操作</span>
<span class="token comment"># ForEach-Object -Process 遍历</span>
<span class="token function">Get-ChildItem</span> <span class="token punctuation">.</span> <span class="token punctuation">|</span> <span class="token function">ForEach-Object</span> <span class="token operator">-</span><span class="token keyword">Process</span> <span class="token punctuation">{</span>
	<span class="token comment"># 判断文件名字不等于A</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$_</span><span class="token punctuation">.</span>name <span class="token operator">-ne</span> <span class="token string">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment"># 执行git mv操作</span>
		git <span class="token function">mv</span> <span class="token variable">$_</span><span class="token punctuation">.</span>name A<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合并b仓库" tabindex="-1"><a class="header-anchor" href="#合并b仓库" aria-hidden="true">#</a> 合并B仓库</h3><p>同上</p>`,20),c=[i];function l(p,o){return s(),a("div",null,c)}const r=n(t,[["render",l],["__file","githebingcangku.html.vue"]]);export{r as default};
