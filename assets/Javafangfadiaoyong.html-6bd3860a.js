import{_ as e,n as o,p as c,q as i,s as n,R as s,t,Y as p}from"./framework-f2b64c38.js";const l={},u=p(`<h1 id="java方法调用" tabindex="-1"><a class="header-anchor" href="#java方法调用" aria-hidden="true">#</a> Java方法调用</h1><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>x<span class="token punctuation">.</span><span class="token function">f</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="流程" tabindex="-1"><a class="header-anchor" href="#流程" aria-hidden="true">#</a> 流程</h2><ol><li>编译器会找到该对象的描述类型和方法名称，列出所有该对象的叫做f的方法以及父类可以访问的叫做f的方法，这里可能会有多个相同名称但是不同参数的方法，比如f(int)和f(String)</li><li>编译器决定方法调用的参数，如果找不到合适的方法，报错，比如f(&quot;sss&quot;)会找到f(String)这个方法</li><li>如果方法是private、static、final或者构造函数，那么编译器知道实际上应该调用哪个方法，这个过程叫做<strong>静态绑定</strong>，否则调用方法取决于对象的实际类型，这个叫做<strong>动态绑定</strong></li><li>假设程序运行时使用动态绑定去调用方法，C有一个子类D，如果D定义了方法f(String)，那么该方法会被调用，否则重复寻找父类是否有该方法<br> 如果每次都去这么搜索那么很浪费时间，所以虚拟机会为每个方法维护一个<strong>方法表</strong></li></ol><h2 id="绑定" tabindex="-1"><a class="header-anchor" href="#绑定" aria-hidden="true">#</a> 绑定</h2><p>当子类和父类（接口和实现类）存在同一个方法时，子类重写父类（接口）方法时，程序在运行时调用的方法时，是调用父类（接口）的方法呢？还是调用子类的方法呢？我们将确定这种调用何种方法的操作称之为<strong>绑定</strong>。 绑定又分为<strong>静态绑定和动态绑定</strong>。</p><h3 id="静态绑定" tabindex="-1"><a class="header-anchor" href="#静态绑定" aria-hidden="true">#</a> 静态绑定</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;A.say&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">staticSay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;A.staticSay&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">finalSay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;A.finalSay&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">finalSay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">staticSay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),r=n("strong",null,"private/statis/final和构造函数都是静态绑定",-1),k=n("strong",null,"invokestatic",-1),d=n("strong",null,"invokespecial",-1),v=n("strong",null,"invokevirtual",-1),m={href:"https://www.zhihu.com/question/45131640",target:"_blank",rel:"noopener noreferrer"},b=n("img",{src:"https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora20211203141025.png"},null,-1),h=p(`<h3 id="动态绑定" tabindex="-1"><a class="header-anchor" href="#动态绑定" aria-hidden="true">#</a> 动态绑定</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;A.say&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;B.say&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字节码详情，可以看到在调用方法时找到的全限定类名为A，这是因为虽然实际类型为B，但我们的声明还是A类型，所以如果A没有say方法，那么编译期间就会报错<br> astore_1会将B对象放入局部变量表下标为1的位置<br> aload_1取出局部变量表下表为1的值压入操作数栈<br> invokevirtual会根据aload_1取出的对象找到所属类型的方法表<br> 很明显，根据对象的声明类型(A)还不能够确定调用方法say的位置，必须根据a在堆中实际创建的对象类型B来确定say方法所在的位置。这种在程序运行过程中，通过动态创建的对象的方法表来定位方法的方式，我们叫做 动态绑定机制。</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora20211203145651.png"><h2 id="分派" tabindex="-1"><a class="header-anchor" href="#分派" aria-hidden="true">#</a> 分派</h2><p>        Java 的<strong>动态分派和静态分派</strong>也是 Java 方法的执行原理。 Java 源代码的编译之后，方法之间的调用是使用符号引用来表示的。当字节码被 JVM 加载之后，符号引用才会被替换为对应方法在方法区的真实内存地址。那么在替换之前，由于 Java 的方法重写、重载，就导致符号引用对应的方法可能是一个虚方法，那么方法的真实实现在运行时就可能有多个。 所以在将符号引用替换为真实地址时，还需要做一件事情：那就是确定符号引用要替换的方法的版本。<br>         只要能被invokestatic和invokespecial指令调用的方法，都可以在解析阶段确定唯一的调用版本，符合这个条件的有静态方法、私有方法、实例构造器和父类方法四类，它们在类加载时就会把符号引用解析为该方法的直接引用。这些方法可以称为 <strong>非虚方法</strong> （还包括final方法），与之相反，其他方法就称为<strong>虚方法</strong>（final方法除外）。</p><p>        这里要特别说明下final方法，虽然调用final方法使用的是invokevirtual指令，但是由于它无法覆盖，没有其他版本，所以也无需对方发接收者进行多态选择。Java语言规范中明确说明了final方法是一种非虚方法。<br> 解析调用一定是个静态过程，在编译期间就完全确定，在类加载的解析阶段就会把涉及的符号引用转化为可确定的直接引用， 不会延迟到运行期再去完成。<br>         而分派调用则可能是静态的也可能是动态的，根据分派依据的宗量数（方法的调用者和方法的参数统称为方法的宗量）又可分为单分派和多分派。两类分派方式两两组合便构成了<strong>静态单分派、静态多分派、动态单分派、动态多分派</strong>四种分派情况。</p><h3 id="静态分派" tabindex="-1"><a class="header-anchor" href="#静态分派" aria-hidden="true">#</a> 静态分派</h3><p>根据变量的「静态类型(外观类型)」匹配调用方法的过程称为静态分派。发生的场景为<strong>方法重载</strong>。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token class-name">String</span> string<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;A.say &quot;</span> <span class="token operator">+</span> string<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token class-name">Object</span> demo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;A.say object &quot;</span> <span class="token operator">+</span> demo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Object为静态类型，String为实际类型</span>
        <span class="token class-name">Object</span> s <span class="token operator">=</span> <span class="token string">&quot;sss&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">// </span>
        a<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="动态分派" tabindex="-1"><a class="header-anchor" href="#动态分派" aria-hidden="true">#</a> 动态分派</h3><p>根据变量的「实际类型」匹配调用方法的过程称为<strong>动态分派</strong>。发生的场景为<strong>方法重写</strong>。当调用一个可能被子类重写或继承的方法时，就会触发动态分派。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;A.say&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;B.say&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 输出B.say</span>
        a<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用say方法时，JVM会先去当前调用的对象的类(参考动态绑定中字节码的的aload)中查找是否存在和目标方法的描述符、简单名称一样的方法，如果存在则将符号引用替换为找到的方法的直接引用，否则就向父类去查找，向父类的父类去查找..., 直到最后找不到抛出NoSuchMethod异常。</p><h2 id="单分派和多分派" tabindex="-1"><a class="header-anchor" href="#单分派和多分派" aria-hidden="true">#</a> 单分派和多分派</h2><p>宗量：方法的接收者和方法的参数统称为方法的宗量。<br> 单分派：根据一个宗量对目标方法进行选择（静态）<br> 多分派：多于一个宗量对目标方法进行选择（动态）</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,17),y={href:"https://zhuanlan.zhihu.com/p/110771964",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.zhihu.com/question/45131640",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.zhihu.com/question/387264955/answer/1148743997",target:"_blank",rel:"noopener noreferrer"},w={href:"https://blog.csdn.net/bruce_suxin/article/details/57415289",target:"_blank",rel:"noopener noreferrer"};function _(S,q){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[s("字节码详情，这里很奇怪的是书上说"),r,s("，但从图片来看，staticSay和构造函数都是正常的，用的"),k,s("和"),d,s("，但final方法的finalSay用的却是"),v,s("，这里查询了"),n("a",m,[s("资料"),t(a)]),b]),h,n("ol",null,[n("li",null,[n("a",y,[s("Java的动态分派和静态分派"),t(a)])]),n("li",null,[n("a",g,[s("java中调用final方法"),t(a)])]),n("li",null,[n("a",f,[s("如何理解java中的动态绑定和静态绑定"),t(a)])]),n("li",null,[n("a",w,[s("静态多分派和动态单分派"),t(a)])])])])}const j=e(l,[["render",_],["__file","Javafangfadiaoyong.html.vue"]]);export{j as default};
