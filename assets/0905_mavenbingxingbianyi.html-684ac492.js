import{_ as i,n as l,p as t,q as c,s as n,R as a,t as s,Y as r}from"./framework-f2b64c38.js";const d={},o=r(`<h1 id="maven并行编译" tabindex="-1"><a class="header-anchor" href="#maven并行编译" aria-hidden="true">#</a> maven并行编译</h1><p>Java开发人员大部分普遍用过maven<br> maven作为项目管理工具<br> 帮助我们管理依赖与构建项目<br> 常见命令就是</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打包</span>
mvn clean package
<span class="token comment"># 安装到仓库</span>
mvn clean <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但随着项目或者模块的越来越多<br> 打包速度越来越慢<br> 这个时候自然而然想有没有提高打包速度的方式<br> 因为看过gradle的文章，知道gradle编译是有多线程的<br> 那么maven编译有没有呢<br> 查找资料后有2种</p><ul><li>maven3原生命令</li><li>mvnd</li></ul><h2 id="maven3" tabindex="-1"><a class="header-anchor" href="#maven3" aria-hidden="true">#</a> maven3</h2>`,6),p={href:"https://cwiki.apache.org/confluence/display/MAVEN/Parallel+builds+in+Maven+3",target:"_blank",rel:"noopener noreferrer"},m=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 直接上命令</span>
<span class="token comment"># 4线程构建</span>
mvn <span class="token parameter variable">-T</span> <span class="token number">4</span> clean <span class="token function">install</span> 
<span class="token comment"># 每个cpu核心1个线程，比如我是4核cpu那么就4个线程</span>
mvn <span class="token parameter variable">-T</span> 1C clean <span class="token function">install</span> 
<span class="token comment"># 每个cpu核心1.5个线程</span>
mvn <span class="token parameter variable">-T</span> <span class="token number">1</span>.5C clean <span class="token function">install</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在并行编译模式下会分析我们项目的依赖图并调度可以并行执行的模块从而加速构建<br> 官方文档说了虽然这个新特性经过了大量测试，但仍然建议我们项目内部需要自己慢慢实践<br> 并且可能有部分插件不是线程安全的，这个会通过<code>@threadSafe</code>提示</p><p>maven3中并行执行的过程，是一层一层执行的，比如第一层先并行执行完5个模块，再并行执行完第二层的3个模块<br> 耗时取决于编译时间最长的那个模块，所以如果多的小模块收益会更大<br><img src="https://cwiki.apache.org/confluence/download/attachments/18153538/PastedGraphic-6.png?version=1&amp;modificationDate=1379608014000&amp;api=v2"></p><h2 id="mvnd" tabindex="-1"><a class="header-anchor" href="#mvnd" aria-hidden="true">#</a> mvnd</h2><p>说到mvnd就不得不提一下gradle<br> gradle的编译快是基于C/S架构<br> 启动gradle的时候会在后台启动一个server端<br> gradle默认支持多线程处理<br> 服务端可以重用之前的输入和输出，在<strong>增量编译</strong>上速度非常快<br> mvnd指在提供类似于gradle和Takari的更快的maven构建方式</p>`,5),v=n("br",null,null,-1),u={href:"https://www.jianshu.com/p/e925db5bc4e5",target:"_blank",rel:"noopener noreferrer"},h=n("img",{src:"https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202209061727507.png"},null,-1),b=n("h3",{id:"安装mvnd",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装mvnd","aria-hidden":"true"},"#"),a(" 安装mvnd")],-1),g={href:"https://github.com/apache/maven-mvnd/releases/tag/0.8.0",target:"_blank",rel:"noopener noreferrer"},_=n("br",null,null,-1),k=n("br",null,null,-1),f=n("br",null,null,-1),x=n("br",null,null,-1),w=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># MVND_HOME/conf/mvnd.properties</span>
<span class="token comment"># 拉到最下面修改maven.settings</span>
<span class="token assign-left variable">maven.settings</span><span class="token operator">=</span>xxx<span class="token punctuation">\\</span><span class="token punctuation">\\</span>apache-maven-3.5.0<span class="token punctuation">\\</span><span class="token punctuation">\\</span>conf<span class="token punctuation">\\</span><span class="token punctuation">\\</span>settings.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><p>使用命令和mvn一样<br> 只是把mvn换成mvnd即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mvnd clean package
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="mvn-vs-mvnd" tabindex="-1"><a class="header-anchor" href="#mvn-vs-mvnd" aria-hidden="true">#</a> mvn vs mvnd</h2><p>在选择原生maven或者mvnd上<br> 我个人觉得maven3提供的并行构建也够用了<br> 大约提升了50%的构建速度<br> 当然花点心思用上mvnd也可以<br> 也没啥成本<br> 考虑实际情况旧项目迁移到gradle基本不太可能<br> 现在同事也不用gradle</p>`,6);function N(V,y){const e=l("ExternalLinkIcon");return t(),c("div",null,[o,n("p",null,[n("a",p,[a("官方参考资料"),s(e)])]),m,n("p",null,[a("mvnd采用了takari smart builder，比原先maven的并行更快一些"),v,n("a",u,[a("图片来源"),s(e)]),h]),b,n("p",null,[n("a",g,[a("github"),s(e)]),a("下载安装包"),_,a(" 也可以用Scoop等包管理工具"),k,a(" Windows手动下载二进制文件情况下"),f,a(" 需要配置一下环境变量"),x,a(" 修改maven仓库地址为自己的（如果需要的话")]),w])}const T=i(d,[["render",N],["__file","0905_mavenbingxingbianyi.html.vue"]]);export{T as default};