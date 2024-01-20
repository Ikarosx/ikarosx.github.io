import{_ as p,n as l,p as o,q as c,s as n,R as a,t,Y as e}from"./framework-f2b64c38.js";const i={},u=e('<h2 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h2><p>以往在编写SSM的Maven项目的时候<br> 有时候需要手动导入jar包（不通过Maven导入<br> 然后就会出现莫名其妙的<strong>ClassNotFoundException</strong><br> 需要去<br><code>Project Structure -&gt; Artifacts -&gt; 中右键put into output root</code><br> 但每次这样子就非常麻烦，所以想花时间了解一下这个问题是怎么回事</p><p>解决以下问题</p><ul><li>import可以正确识别包，智能提示也可以，但Run/Debug ClassNotFound</li><li>mvn packing打包出现ClassNotFound</li></ul><h2 id="idea-tomcat" tabindex="-1"><a class="header-anchor" href="#idea-tomcat" aria-hidden="true">#</a> IDEA Tomcat</h2><p>我们正常通过Tomcat启动SSM项目时<br> 先添加了tomcat的配置文件然后添加Artifacts</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200809173235.png"><p>最后通过Run/Debug来启动项目</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200809172942.png"><p>在我们点击Run/Debug的时候<br> 其实在配置文件里有写执行了哪些操作</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200809174256.png"><p>也就是目前我的项目启动时会执行 build<br> build 项目:war exploded</p><div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">exploded</p><p>exploded指的是war包解压后的文件<br> 而没有带exploded模式是一个war包</p></div><h2 id="idea-build" tabindex="-1"><a class="header-anchor" href="#idea-build" aria-hidden="true">#</a> IDEA build</h2>',14),r={href:"https://www.jetbrains.com/help/idea/compiling-applications.html",target:"_blank",rel:"noopener noreferrer"},d=n("details",{class:"custom-container details"},[n("summary",{class:"custom-container-title"},"DETAILS"),n("p",null,"The IntelliJ IDEA compilation and building process compiles source files and brings together external libraries, properties files, and configurations to produce a living application. IntelliJ IDEA uses a compiler that works according to the Java specification."),n("p",null,"You can compile a single file, use the incremental build for a module or a project, and rebuild a project from scratch."),n("p",null,"If you have a pure Java or a Kotlin project we recommend that you use IntelliJ IDEA to build your project since IntelliJ IDEA supports the incremental build which significantly speeds up the building process."),n("p",null,[a("However, IntelliJ IDEA native builder might not correctly build the Gradle or Maven project if its build script file uses custom plugins or tasks. "),n("strong",null,"In this case, the build delegation to Gradle or Maven can help you build your project correctly.")])],-1),g=n("strong",null,"编译以及整合资源",-1),k=n("br",null,null,-1),m=n("br",null,null,-1),b=n("strong",null,"maven插件",-1),v=n("br",null,null,-1),h={href:"https://www.jetbrains.com/help/idea/delegate-build-and-run-actions-to-maven.html#delegate_to_maven",target:"_blank",rel:"noopener noreferrer"},_=e('<p>默认是不开启的</p><img id="delegation" src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200809183330.png"><p>由于两种机制，可能会出现各方面的差异<br> 比如加载resources文件/compile的差异<br> idea默认会加载标记为resources的文件夹（就那个几根黄线的<br> 但使用maven去打包的时候是不识别这个resources文件夹的<br> 而我平常的使用习惯是</p><ul><li>测试用Run/Debug</li><li>上线用mvn packing<br> 这就会导致开发测试环境很有可能跟上线的不同</li></ul><h2 id="run-debug-classnotfound" tabindex="-1"><a class="header-anchor" href="#run-debug-classnotfound" aria-hidden="true">#</a> Run/Debug ClassNotFound</h2><p>根据上面两种模式，我们解决Run/Debug ClassNotFound有两种思路</p><ul><li>使用IDEA自己的build</li><li>将build委托给Maven</li></ul><h3 id="idea自己build" tabindex="-1"><a class="header-anchor" href="#idea自己build" aria-hidden="true">#</a> IDEA自己build</h3>',8),f=n("br",null,null,-1),x=n("br",null,null,-1),w={href:"https://www.jetbrains.com/help/idea/library.html?q=add%20as%20library",target:"_blank",rel:"noopener noreferrer"},y=e('<details class="custom-container details"><summary class="custom-container-title">Libraries</summary><p>A library is a collection of compiled code that a module can depend on.</p><p>After you define a library and add it to module dependencies, the IDE will be supplying its contents to you as you write your code. IntelliJ IDEA will also use the code from the libraries to build and deploy your application.</p></details><p>可以得知，如果我们添加library之后，IDEA则会将其加入<strong>智能提示</strong>，并且IDEA会使用库中的代码来<strong>build</strong>和<strong>deploy</strong>我们的应用</p><p>我们可以通过进行和不进行add as library来测试build，我测试的结果是</p><ul><li>add as library之后，build正常</li><li>没有add as library，build ClassNotFound</li></ul><p>还记得前面提到的Run/Debug时两个步骤</p><ul><li>build</li><li>build artifact</li></ul>',6),I=n("br",null,null,-1),A=n("br",null,null,-1),E=n("code",null,"put into output root",-1),D=n("br",null,null,-1),j={href:"https://www.jetbrains.com/help/idea/output-layout-tab.html#reorder_items",target:"_blank",rel:"noopener noreferrer"},M=e(`<details class="custom-container details"><summary class="custom-container-title">DETAILS</summary><p>The Available Elements pane shows the elements that can be but are not yet added to the artifact.</p></details><p>Available Elements面板展示了可以被加入artifact中的但以前没有被添加过的元素<br> 当我们添加完之后再看build之后的classes就可以看到我们lib目录下的jar包了</p><h3 id="maven-build" tabindex="-1"><a class="header-anchor" href="#maven-build" aria-hidden="true">#</a> maven build</h3><p>参考<a href="#delegation">前面图片(点我)</a>开启build委托给maven<br> 然后maven配置参考下文</p><h2 id="maven" tabindex="-1"><a class="header-anchor" href="#maven" aria-hidden="true">#</a> maven</h2><h3 id="maven-plugin" tabindex="-1"><a class="header-anchor" href="#maven-plugin" aria-hidden="true">#</a> maven plugin</h3><p>在maven中，只要在同一个生命周期， 你执行后面的阶段，那么前面的阶段也会被执行<br> 而且不需要额外去输入前面的阶段<br> 这也是为什么比如我们执行mvn compile的时候<br> 会执行针对resources的操作</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200809180638.png"><p>对于maven-resources-plugin，我们可以在pom.xml中指定版本<br> 也可以不指定，不指定的时候，使用默认绑定的插件版本</p><div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">如何查看默认maven插件版本</p><p><code>mvn -v</code>查看maven版本<br> 官网查看，将数字改为你查看到的版本即可（可能存在目录不对应，这个我没有测试过<br> 如果目录不对应自己翻翻官网找一下即可<br> https://maven.apache.org/ref/3.5.3/maven-core/default-bindings.html</p></div><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 手动指定 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginManagement</span><span class="token punctuation">&gt;</span></span><span class="token comment">&lt;!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>maven-resources-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginManagement</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="maven-resources-plugin" tabindex="-1"><a class="header-anchor" href="#maven-resources-plugin" aria-hidden="true">#</a> maven-resources-plugin</h3><p>对于maven-resources-plugin<br> 如果我们什么都不配置<br> 默认会打包src/main/resources目录<br> 但有时候我们需要自己指定要打包哪些文件<br> 这时我们可以自己配置</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resource</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">&gt;</span></span>src/main/java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directory</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">&gt;</span></span>**/*.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includes</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resource</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resource</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">&gt;</span></span>src/main/resources<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directory</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">&gt;</span></span>**/*.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">&gt;</span></span>**/*.properties<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">&gt;</span></span>**/excel/**<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includes</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resource</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),N=n("br",null,null,-1),R=n("br",null,null,-1),T=n("br",null,null,-1),C=n("strong",null,"classpath找不到文件",-1),J=n("br",null,null,-1),S={href:"https://maven.apache.org/plugins/maven-resources-plugin/examples/resource-directory.html",target:"_blank",rel:"noopener noreferrer"},F=e(`<h3 id="maven-compiler-plugin" tabindex="-1"><a class="header-anchor" href="#maven-compiler-plugin" aria-hidden="true">#</a> maven-compiler-plugin</h3><p>compile的时候基本上就是看配置<br> 因为内置build的配置文件和mvn compile的配置是不公用<br> 所以我们需要给compiler插件添加上lib目录</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>maven-compiler-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.8.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 添加lib目录 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>-extdirs<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>\${project.basedir}/lib<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这部分配置完mvn compile即可正常运行</p><h3 id="maven-war-plugin" tabindex="-1"><a class="header-anchor" href="#maven-war-plugin" aria-hidden="true">#</a> maven-war-plugin</h3><p>同样，由于是war包，所以packing会执行war插件<br> 我们需要给war插件配置jar包目录</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>maven-war-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.2.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- 加载自定义lib --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>webResources</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resource</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">&gt;</span></span>lib/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directory</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>targetPath</span><span class="token punctuation">&gt;</span></span>WEB-INF/lib<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>targetPath</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">&gt;</span></span>**/*.jar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includes</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resource</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>webResources</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过上面的配置，我们在packing时也可以正常运行了<br> 这就解决了第二个问题</p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>上面其实很多东西可以扩展</p><ul><li>比如部署在Tomcat的项目是并不是在Tomcat的Webapp下，而是让Tomcat扫描IDEA给他的目录</li><li>Maven的生命周期</li></ul><p>然后总结起来就是<br> 如果我们启用了build委托给maven<br> 那么只需要在pom.xml中配置compile和war插件即可<br> 如果使用IDEA自带的build<br> 那么需要配置IDEA和maven插件</p>`,12);function B(L,z){const s=l("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[a("查阅了IDEA"),n("a",r,[a("官网资料"),t(s)])]),d,n("p",null,[a("从第一段可知，build所做的工作是"),g,a("，并且默认是使用IDEA去build项目"),k,a(" 从最后一段可知，如果你是maven项目，可能会有自定义配置的问题，此时使用IDEA去build项目会出现无法预期的错误"),m,a(" 所以这个时候可以开启委托，将build的工作给maven实现，即"),b,v,n("a",h,[a("官网参考地址"),t(s)])]),_,n("p",null,[a("我们在maven项目中用lib文件夹来存放jar包"),f,a(" 首先是右键lib add as library"),x,a(" 根据"),n("a",w,[a("官网"),t(s)])]),y,n("p",null,[a("第一步build已经解决了，问题还有第二步"),I,a(" build artifact时，我们需要在Output Layout面板中的Available Elements操作一下"),A,a(" 即"),E,D,a(" 根据"),n("a",j,[a("官方文档"),t(s)])]),M,n("p",null,[a("比如上面这段配置就是打包src/main/java里所有的xml文件"),N,a(" 以及src/main/resources下所有的xml和properties以及所有excel目录下的所有文件"),R,a(" 注意如果配置了resources，那么只会遵循你配置的resources目录"),T,a(" 所以如果有时候"),C,a("，请检查是否将资源文件打包进去了"),J,a(" 更多详情参考"),n("a",S,[a("官网"),t(s)])]),F])}const V=p(i,[["render",B],["__file","MavenPlugin.html.vue"]]);export{V as default};