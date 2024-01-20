import{_ as l,n as t,p,q as c,s,R as n,t as e,Y as i}from"./framework-f2b64c38.js";const r={},o=i(`<h2 id="默认主题" tabindex="-1"><a class="header-anchor" href="#默认主题" aria-hidden="true">#</a> 默认主题</h2><h3 id="流程" tabindex="-1"><a class="header-anchor" href="#流程" aria-hidden="true">#</a> 流程</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># yarn安装</span>
<span class="token function">yarn</span> global <span class="token function">add</span> vuepress
<span class="token comment"># npm安装</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> vuepress
<span class="token comment"># 创建一个文件夹</span>
<span class="token function">mkdir</span> blog
<span class="token comment"># 初始化README.md</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;# Hello VuePress!&#39;</span> <span class="token operator">&gt;</span> README.md
<span class="token comment"># 开发环境运行，.表示默认页面路由地址</span>
vuepress dev <span class="token builtin class-name">.</span>
<span class="token comment"># 构建静态文件</span>
vuepress build <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M10 10l4 4m0-4l-4 4"></path></g></svg><p class="custom-container-title">echo</p><p><code>echo &#39;# Hello VuePress!&#39; &gt; README.md</code><br> 执行这句之后，运行访问出现乱码，这是因为默认PowerShell选择UTF-16编码<br> 执行下面这句将编码指定为UTF-8<br><code>$PSDefaultParameterValues[&#39;Out-File:Encoding&#39;] = &#39;utf8&#39;</code></p></div><p>运行完出现的应该就是下面这样子</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200805192219.png" style="box-shadow:1px 1px 20px #888888;"><h3 id="添砖加瓦" tabindex="-1"><a class="header-anchor" href="#添砖加瓦" aria-hidden="true">#</a> 添砖加瓦</h3><p>这是基本的目录结构，当我们使用 <code>vuepress dev docs</code> 所有的访问路径都是基于docs文件夹</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span>  
├── docs  
│   ├── .vuepress  <span class="token comment"># 用于存放全局的配置、组件、静态资源等</span>
│   │   ├── config.js  <span class="token comment"># 配置文件的入口文件，也可以是 YML 或 toml</span>
│   │   └── public <span class="token comment"># 静态资源目录</span>
│   └── README.md <span class="token comment"># 默认页面</span>
└── package.json  

<span class="token number">3</span> directories, <span class="token number">4</span> files  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们修改一下README.md主页</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">home</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> /hero.png
<span class="token key atrule">heroText</span><span class="token punctuation">:</span> Hero 标题
<span class="token key atrule">tagline</span><span class="token punctuation">:</span> Hero 副标题
<span class="token key atrule">actionText</span><span class="token punctuation">:</span> 快速上手 →
<span class="token key atrule">actionLink</span><span class="token punctuation">:</span> /zh/guide/
<span class="token key atrule">features</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 简洁至上
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Vue驱动
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 高性能
  <span class="token key atrule">details</span><span class="token punctuation">:</span> VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
<span class="token key atrule">footer</span><span class="token punctuation">:</span> MIT Licensed <span class="token punctuation">|</span> Copyright © 2018<span class="token punctuation">-</span>present Evan You</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就能看到下面的效果</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200805212023.png" style="box-shadow:1px 1px 20px #888888;"><p>然后再docs下新建文件夹或者新建md文件<br> 然后访问对应的路径，就可以访问到文件<br> 比如以下目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── README.md  
├── docs  
│   ├── .vuepress  
│   │   ├── config.js  
│   │   └── public  
│   ├── <span class="token number">2020</span>  
│   │   └── b.md  
│   ├── README.md  
│   └── a.md  
└── package.json  

<span class="token number">4</span> directories, <span class="token number">6</span> files  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200805212828.png" style="box-shadow:1px 1px 20px #888888;"><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200805212901.png" style="box-shadow:1px 1px 20px #888888;"><h2 id="reco主题" tabindex="-1"><a class="header-anchor" href="#reco主题" aria-hidden="true">#</a> Reco主题</h2><div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">主题</p><p>如果你和我一样不擅长前端开发的话<br> 使用现成的主题也不失为一个好的方案<br> 这里选择了Reco</p></div><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 全局安装reco提供的cli工具，比较方便</span>
<span class="token function">npm</span> <span class="token function">install</span> @vuepress-reco/theme-cli <span class="token parameter variable">-g</span>
<span class="token comment"># 项目初始化,跟着他的操作来就可以了</span>
<span class="token comment"># 最后有一个style的选择,我三个都试了,没发现什么区别</span>
theme-cli init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">theme-cli无法找到</p><p>没有配置npm全局包的环境变量<br> npm config list查看prefix =后面的值<br> 将其加入环境变量即可</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入你刚刚创建的文件夹</span>
<span class="token builtin class-name">cd</span> blog   
<span class="token comment"># 安装依赖</span>
<span class="token function">npm</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开发环境</span>
<span class="token function">npm</span> run dev
<span class="token comment"># 编译</span>
<span class="token function">npm</span> run build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行起来之后就能看到跟我这个博客一样的界面了</p><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>`,27),d=s("code",null,".vuepress/config.js",-1),u=s("br",null,null,-1),v={href:"https://www.vuepress.cn/guide",target:"_blank",rel:"noopener noreferrer"},m={href:"https://vuepress-theme-reco.recoluan.com/views/1.x/",target:"_blank",rel:"noopener noreferrer"},k=s("h3",{id:"采坑",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#采坑","aria-hidden":"true"},"#"),n(" 采坑")],-1),b=s("h4",{id:"热加载",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#热加载","aria-hidden":"true"},"#"),n(" 热加载")],-1),h=s("br",null,null,-1),g={href:"https://github.com/vuejs/vuepress/issues/221",target:"_blank",rel:"noopener noreferrer"},x=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vuepress dev <span class="token builtin class-name">.</span> <span class="token parameter variable">--host</span> localhost
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg><p class="custom-container-title">WARNING</p><p>注意不能写在package.json的script里，无法生效<br> 要直接运行vuepress dev . --host localhost</p></div><h4 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> build</h4><p>我还在想build之后我们是如何更新新的文章<br> 结果发现其实需要我们手动去替换新生成的文件<br> 这里我们可以使用脚本来解决</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># upload.sh</span>
<span class="token comment"># 先删除本地文件</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> blog
<span class="token comment"># 编译</span>
vuepress build <span class="token builtin class-name">.</span>
<span class="token comment"># 编译之后是public，我们重命名为想要的文件名</span>
<span class="token function">mv</span> public blog
<span class="token comment"># 使用scp -r上传</span>
<span class="token function">scp</span> <span class="token parameter variable">-r</span> blog root@ikarosx.cn:/usr/share/nginx/yps/html/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),w=s("br",null,null,-1),y={href:"https://www.vuepress.cn/guide/deploy.html#github-pages",target:"_blank",rel:"noopener noreferrer"},f=i('<div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">scp乱码</p><p>更改为git带的scp命令<br> 可以用Get-Command查看命令地址，类似于which<br> 2021-2-20 22:22:51更新</p></div><h3 id="插件" tabindex="-1"><a class="header-anchor" href="#插件" aria-hidden="true">#</a> 插件</h3>',2),_={href:"https://valine.js.org/vuepress.html",target:"_blank",rel:"noopener noreferrer"},M={href:"https://github.com/vuepress-reco/vuepress-plugin-bgm-player",target:"_blank",rel:"noopener noreferrer"},j=i(`<img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200805213501.png" style="box-shadow:1px 1px 20px #888888;"><p>下面是我的配置文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">&#39;vuepress-plugin-comment&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">choosen</span><span class="token operator">:</span> <span class="token string">&#39;valine&#39;</span><span class="token punctuation">,</span> 
        <span class="token comment">// options选项中的所有参数，会传给Valine的配置</span>
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#valine-vuepress-comment&#39;</span><span class="token punctuation">,</span>
          <span class="token comment">// 需要去注册，很简单</span>
          <span class="token literal-property property">appId</span><span class="token operator">:</span> <span class="token string">&#39;your app Id&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">appKey</span><span class="token operator">:</span> <span class="token string">&#39;your app Key&#39;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
      <span class="token string">&#39;@vuepress-reco/vuepress-plugin-bgm-player&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">audios</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;野孩子&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// bgm目录放在.vuepress/public下</span>
            <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;/bgm/杨千嬅 - 野孩子.mp3&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">cover</span><span class="token operator">:</span> <span class="token string">&#39;/bgm/1.jpg&#39;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function E(V,I){const a=t("ExternalLinkIcon");return p(),c("div",null,[o,s("p",null,[n("主要是针对"),d,n("的修改"),u,s("a",v,[n("官网"),e(a)]),n("和"),s("a",m,[n("主题"),e(a)]),n("的文档都非常详细，建议参考官方文档")]),k,b,s("p",null,[n("启动之后一直无法热加载，网上说的是md文件可以，config.js不行 但我md文件也不行"),h,n(" 最后在"),s("a",g,[n("issue"),e(a)]),n("上找到了答案")]),x,s("p",null,[n("我用这种做法是因为我是将网站部署在自己的云服务器"),w,n(" 如果你是部署在github可以参考"),s("a",y,[n("官方"),e(a)])]),f,s("p",null,[n("有很多好用的插件,比如"),s("a",_,[n("评论"),e(a)]),n("、"),s("a",M,[n("背景音乐"),e(a)])]),j])}const A=l(r,[["render",E],["__file","dajianvuepress.html.vue"]]);export{A as default};
