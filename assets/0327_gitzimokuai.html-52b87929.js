import{_ as n,p as s,q as a,Y as e}from"./framework-f2b64c38.js";const i={},t=e(`<h1 id="git子模块" tabindex="-1"><a class="header-anchor" href="#git子模块" aria-hidden="true">#</a> git子模块</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>最近将博客部署在了github.io上，因为这新建了一个仓库专门放编译后的网页，导致我从vuepress编译后将编译后的文件夹上传到仓库比较麻烦，以前知道git的submodule，但是没有研究过，可以趁这个机会了解一下。</p><h2 id="git-submodule" tabindex="-1"><a class="header-anchor" href="#git-submodule" aria-hidden="true">#</a> git submodule</h2><p>根据官网，<code>git submodule</code>允许你将另外一个仓库B作为你自己仓库A的一个文件夹，实现模块化或者复用。<br> 在我的场景下我希望将vuepress打包后的文件夹作为我部署github.io的仓库，这样我只需要build完在这个文件夹下面commit和push就可以了，而且不影响主仓库，这些有一个特性就是submodule下的commit是互不影响的。</p><h2 id="try" tabindex="-1"><a class="header-anchor" href="#try" aria-hidden="true">#</a> try</h2><p>这是我的主仓库文件夹tree</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/picgo20230327214136.png"><p>我希望将dist文件夹作为子模块</p><h3 id="添加子模块" tabindex="-1"><a class="header-anchor" href="#添加子模块" aria-hidden="true">#</a> 添加子模块</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加子模块，如果不指定路径，会看到其实类似于中执行了git clone，在当前目录下会有相当于仓库名的文件夹出现</span>
<span class="token function">git</span> submodule <span class="token function">add</span> git@github.com:Ikarosx/ikarosx.github.io.git
<span class="token comment"># 进入目录查看</span>
<span class="token builtin class-name">cd</span> ikarosx.github.io
<span class="token comment"># remote -v查看远程仓库地址</span>
<span class="token comment"># origin  git@github.com:Ikarosx/ikarosx.github.io.git (push)</span>
<span class="token function">git</span> remote <span class="token parameter variable">-v</span>
<span class="token comment"># 可以看到该目录的仓库地址指向了github.io，确实添加成功</span>

<span class="token comment"># .gitmodules文件，表明这个路径已经作为子模块添加进来了</span>
<span class="token punctuation">[</span>submodule <span class="token string">&quot;ikarosx.github.io&quot;</span><span class="token punctuation">]</span>
	path <span class="token operator">=</span> ikarosx.github.io
	url <span class="token operator">=</span> git@github.com:Ikarosx/ikarosx.github.io.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/picgo20230327220321.png"><h3 id="删除子模块" tabindex="-1"><a class="header-anchor" href="#删除子模块" aria-hidden="true">#</a> 删除子模块</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 因为前面没有指定路径，所以先删除</span>
<span class="token comment"># (use --cached to keep the file, or -f to force removal)</span>
<span class="token comment"># -f可以改成--cached，区别是否保留文件</span>
<span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">-r</span> <span class="token string">&#39;.\\ikarosx.github.io\\&#39;</span> <span class="token parameter variable">-f</span>
<span class="token comment"># 删除.git/config &amp;&amp; .git/modules文件下有关配置</span>

<span class="token comment"># 重新添加指定路径的子模块,将路径放在结尾即可</span>
<span class="token function">git</span> submodule <span class="token function">add</span> git@github.com:Ikarosx/ikarosx.github.io.git ./vuepress/dist

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="验证" tabindex="-1"><a class="header-anchor" href="#验证" aria-hidden="true">#</a> 验证</h3><p>子模块添加成功后，按我的想法就是编译后在子模块add/commit/push就可以看到效果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># deploy.sh</span>
<span class="token function">yarn</span> run build
<span class="token builtin class-name">cd</span> .vuepress/dist
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;deploy&quot;</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是后来我发现这样子行不通，原因是build后会先删除,类似执行了rm -rf的效果，导致子模块无法正常运行<br> 所以新的想法是换一个目录，build后将文件复制到新目录上 (也可以从研究build不删除目录只删除文件入手) 此时期间遇到了一个报错</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 执行git submodule add git@github.com:Ikarosx/ikarosx.github.io.git ./deploy 报错</span>
<span class="token comment"># 我在添加模块的时候，提示我已经将deploy文件夹配置了，问我是不是要复用原有的文件夹，还是强制clone</span>
<span class="token comment"># 这个原因是我们删除的时候没有删除完全，需要在主仓库下.git/config &amp;&amp; .git/modules文件下删除相关的配置</span>
fatal: A <span class="token function">git</span> directory <span class="token keyword">for</span> <span class="token string">&#39;deploy&#39;</span> is found locally with remote<span class="token punctuation">(</span>s<span class="token punctuation">)</span>:
  origin        git@github.com:Ikarosx/ikarosx.github.io.git
If you want to reuse this <span class="token builtin class-name">local</span> <span class="token function">git</span> directory instead of cloning again from
  git@github.com:Ikarosx/ikarosx.github.io.git
use the <span class="token string">&#39;--force&#39;</span> option. If the <span class="token builtin class-name">local</span> <span class="token function">git</span> directory is not the correct repo
or you are unsure what this means choose another name with the <span class="token string">&#39;--name&#39;</span> option.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最后尝试" tabindex="-1"><a class="header-anchor" href="#最后尝试" aria-hidden="true">#</a> 最后尝试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在已经有了子模块的基础上，尝试build后复制编译后的文件到子模块上</span>
<span class="token comment"># 脚本如下</span>
<span class="token function">yarn</span> run build
<span class="token function">cp</span> <span class="token parameter variable">-Force</span> <span class="token parameter variable">-R</span> .vuepress/dist ./deploy
<span class="token builtin class-name">cd</span> ./deploy
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;deploy&quot;</span>
<span class="token function">git</span> push
<span class="token comment"># 查看github io效果，可以看到可以成功</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可不可以不使用子模块而只是手动添加remote" tabindex="-1"><a class="header-anchor" href="#可不可以不使用子模块而只是手动添加remote" aria-hidden="true">#</a> 可不可以不使用子模块而只是手动添加remote</h3><p>为什么不能直接在文件夹下面remote add自己的子仓库呢? 如果我在一个文件夹下面手动<code>remote add</code>，然后当我在主仓库下<code>add .</code>的时候，git会提示我有嵌套的git仓库，让我使用submodule，或者删除</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202303280951523.png"><h3 id="如何更新子模块的内容" tabindex="-1"><a class="header-anchor" href="#如何更新子模块的内容" aria-hidden="true">#</a> 如何更新子模块的内容</h3><p>这里需要先了解git是怎么处理子模块的<br> 根据前面的操作，我们可以知道<br> 当我在子模块里面<code>修改了内容/commit</code>以后，在主仓库里<code>git status</code>可以看到会将整个deploy标记为modified，而不是具体将其中的内容哪里修改了列出<br> 因此如果我们想将子模块的变动同步给其他使用者，需要先在本地处理好模块的变动（可能是从远端拉取最新的子模块仓库的代码，也可能是你本地修改了），再将这个变动推送给远端</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># git status</span>
On branch v2
Your branch is up to <span class="token function">date</span> with <span class="token string">&#39;origin/v2&#39;</span><span class="token builtin class-name">.</span>

Changes not staged <span class="token keyword">for</span> commit:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to update what will be committed<span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">&quot;git restore &lt;file&gt;...&quot;</span> to discard changes <span class="token keyword">in</span> working directory<span class="token punctuation">)</span>
        modified:   deploy <span class="token punctuation">(</span>new commits<span class="token punctuation">)</span>

no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实操一下" tabindex="-1"><a class="header-anchor" href="#实操一下" aria-hidden="true">#</a> 实操一下</h4><p>假设现在有AB在维护主仓库，C在维护子模块里的仓库<br> C今天更新了子模块的内容并add/commit/push之后<br> 我们想要在主仓库里更新一下子模块的代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ------ A -------</span>
<span class="token comment"># A首先进入主仓库，如何拉取子模块的代码呢</span>
<span class="token comment"># 先拉取代码</span>
<span class="token function">git</span> pull 
<span class="token comment"># 将子模块拉取最新的代码</span>
<span class="token function">git</span> submodule update <span class="token parameter variable">--remote</span>
<span class="token comment"># 查看此时状态，可以看到子模块有了变动</span>
<span class="token function">git</span> status
<span class="token comment"># A提交变动</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;xx&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> push
<span class="token comment"># ------ A -------</span>

<span class="token comment"># ------ B -------</span>
<span class="token comment"># 同事A已经更新了代码，此时同事B也想要拉取最新的代码</span>
<span class="token comment"># 此时pull可以看到子模块有变动</span>
<span class="token comment"># Updating 9ff31de..ecfc65b</span>
<span class="token comment"># Fast-forward</span>
<span class="token comment">#  deploy | 2 +-</span>
<span class="token comment"># 1 file changed, 1 insertion(+), 1 deletion(-)</span>
<span class="token function">git</span> pull
<span class="token comment"># 但是需要注意，git pull会把子模块的变更拉取到本地，但是不会实际更新，更新需要执行新的命令git submodule update</span>
<span class="token comment"># 执行子模块更新, </span>
<span class="token function">git</span> submodule update
<span class="token comment"># Submodule path &#39;deploy&#39;: checked out &#39;d6993c5f64edca75dbdf3d21802f11b03357ff10&#39;</span>
<span class="token comment"># 可以看到update以后才实际会check out更新代码</span>
<span class="token comment"># ------ B -------</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里需要解释一下<code>git submodule update</code>加不加--remote的区别<br> --remote指的是从远端拉取最新的代码<br> 不加表示只依据pull拉取到的去更新</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>submodule可以很好的使我们在一个repository内添加其他的repository，利用好这个特性可以更加规范，运维更加清楚，而我则是用来方便部署github.io，从需求出发。<br> 但也相对的增加了复杂性，需要开发人员学习新的概念以及技能，可能会导致新的问题产生。</p><h2 id="引用" tabindex="-1"><a class="header-anchor" href="#引用" aria-hidden="true">#</a> 引用</h2><ol><li>https://git-scm.com/book/en/v2/Git-Tools-Submodules</li><li>https://stackoverflow.com/questions/1260748/how-do-i-remove-a-submodule</li></ol>`,35),o=[t];function l(c,d){return s(),a("div",null,o)}const r=n(i,[["render",l],["__file","0327_gitzimokuai.html.vue"]]);export{r as default};
