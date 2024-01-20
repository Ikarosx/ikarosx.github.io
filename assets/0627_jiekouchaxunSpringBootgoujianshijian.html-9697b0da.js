import{_ as t,n as l,p as r,q as o,s as e,R as n,t as a,Y as s}from"./framework-f2b64c38.js";const d={},c=s('<h1 id="接口查询springboot版本构建时间" tabindex="-1"><a class="header-anchor" href="#接口查询springboot版本构建时间" aria-hidden="true">#</a> 接口查询SpringBoot版本构建时间</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>由于公司项目是部署到现场，不同现场用的版本不同，需要提供一个接口查询当前系统部署的版本</p><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><p>利用maven动态获取当前编译时间以及jar包版本（project.version）<br> 通过resource/Filtering将变量替换到我们的文件当中，比如application.yml<br> 那么我们的程序就可以获取到这些值</p><h3 id="程序取properties的值" tabindex="-1"><a class="header-anchor" href="#程序取properties的值" aria-hidden="true">#</a> 程序取properties的值</h3>',6),u=e("code",null,"project.version",-1),m=e("br",null,null,-1),p=e("code",null,"Apache Maven Resources Plugin",-1),v=e("br",null,null,-1),b=e("br",null,null,-1),g=e("code",null,"project.version",-1),h=e("br",null,null,-1),_={href:"https://maven.apache.org/plugins/maven-resources-plugin/examples/filter.html",target:"_blank",rel:"noopener noreferrer"},k=s(`<h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h4><p>新建<code>src/main/resourecs/hello.txt</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># src/main/resourecs/hello.txt
Hello \${name}  
# 注意如果parent是\`spring-boot-starter-parent\`，需要使用@name@
Hello @name@  

# pom.xml
&lt;project&gt;
  &lt;name&gt;My Resources Plugin Practice Project&lt;/name&gt;
  ...

  &lt;build&gt;
    &lt;resources&gt;
      &lt;resource&gt;
        &lt;directory&gt;src/main/resources&lt;/directory&gt;
      &lt;/resource&gt;
      ...
    &lt;/resources&gt;
  &lt;/build&gt;
&lt;/project&gt;

# 执行
mvn resources:resources

# 结果1
Hello \${name}

# 修改resource加上filtering
&lt;resources&gt;
    &lt;resource&gt;
    &lt;directory&gt;src/main/resources&lt;/directory&gt;
    &lt;filtering&gt;true&lt;/filtering&gt;
    &lt;/resource&gt;
    ...
&lt;/resources&gt;

# 执行
mvn resources:resources

# 结果2,此时name已经被替换了
Hello My Resources Plugin Practice Project

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),x={class:"custom-container tip"},f=s('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p>',2),y=e("br",null,null,-1),j=e("br",null,null,-1),M={href:"https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto.properties-and-configuration.expand-properties",target:"_blank",rel:"noopener noreferrer"},w=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># application.yml，配置后，经过resources插件处理，@project.version@会变成
system:
    config: 
        # build_version: #{project.version}
        build_version: @project.version@
# 经过处理后我们可以直接在程序里使用我们熟悉的@Value获取到值使用
@Value(&quot;\${system.config.build_version}&quot;)
private String buildVersion;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="maven-model-interpolation" tabindex="-1"><a class="header-anchor" href="#maven-model-interpolation" aria-hidden="true">#</a> maven Model Interpolation</h3><p>上面我们获取到了版本，现在我们需要获取到编译时间</p><p>maven提供了内置变量<code>maven.build.timestamp</code>为编译开始的时间 <br> 默认格式为<code>yyyy-MM-dd&#39;T&#39;HH:mm:ss&#39;Z&#39;</code><br> 可以通过 <code>maven.build.timestamp.format</code>格式化</p><blockquote><p>maven.build.timestamp<br> the UTC timestamp of build start, in yyyy-MM-dd&#39;T&#39;HH:mm:ss&#39;Z&#39; default format, which can be overridden with maven.build.timestamp.format POM property<br> 我们可以通过\${}的形式在pom.xml这种获取到这个变量</p></blockquote><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!--maven.build.timestamp保存了maven编译时间戳--&gt;</span>
    <span class="token comment">&lt;!-- 经过 maven Model Interpolation 的处理，实际上相当于--&gt;</span>
    <span class="token comment">&lt;!-- &lt;timestamp&gt;2022-6-28 16:03:11&lt;/timestamp&gt; --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>timestamp</span><span class="token punctuation">&gt;</span></span>\${maven.build.timestamp}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>timestamp</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!--指定时间格式--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.build.timestamp.format</span><span class="token punctuation">&gt;</span></span>yyyy-MM-dd HH:mm:ss<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.build.timestamp.format</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这种格式maven会通过<code>Model Interpolation</code>插值处理帮我们替换，但只限于pom.xml<br> 替换完成后就和我们获取版本的使用方式一样了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>system:
    config:
        # 获取properties的时候可以直接用key取值,一样如果不是使用parent用#{}的写法
        build_time: @timestamp@
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function H(P,B){const i=l("ExternalLinkIcon");return r(),o("div",null,[c,e("p",null,[n("程序要获取jar包版本主要是获取pom.xml里"),u,n("的值"),m,n(" 这里我们需要查看"),p,n("插件"),v,n(" 经过这个插件可以使我们在程序的文件，比如application.yml里获取到我们想要获取的值"),b,n(" 如"),g,n(",实现原理是通过写指定格式，然后插件会替换对应的值"),h,e("a",_,[n("官方filtering参考文档"),a(i)])]),k,e("div",x,[f,e("p",null,[n("关于${}不生效的问题，可能是你使用了spring-boot-starter-parent"),y,n(" 需要改成@...@的形式"),j,e("a",M,[n("相关文档"),a(i)])])]),w])}const I=t(d,[["render",H],["__file","0627_jiekouchaxunSpringBootgoujianshijian.html.vue"]]);export{I as default};
