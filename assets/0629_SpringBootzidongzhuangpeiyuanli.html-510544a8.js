import{_ as n,p as a,q as s,Y as t}from"./framework-f2b64c38.js";const o={},e=t(`<h1 id="springboot自动装配原理" tabindex="-1"><a class="header-anchor" href="#springboot自动装配原理" aria-hidden="true">#</a> SpringBoot自动装配原理</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>学过SpringBoot一直听到自动装配这个东西<br> 帮我们简化了很多配置，但具体不知道怎么做的<br> 就比如以前搭建SSM的时候，需要在xml配置很多东西<br> 配置Spring/SpringMVC<br> 但在使用了SpringBoot之后,一个最简单的demo<br> 只需要引入jar包<code>spring-boot-starter-web</code><br> 就可以直接使用@Controller/@RequestMapping等功能<br> 无需额外的配置<br> 当然少不了@SpringBootApplication注解</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>本质上自动装配是因为SpringBoot遵循约定大于配置<br> spring-core下的<code>org.springframework.core.io.support.SpringFactoriesLoader</code>会自动扫描<code>META-INF/spring.factories</code>路径<br> 并将其中配置好的类注入到Spring IOC容器中<br> 体现了所谓的约定大于配置</p><p>而我们常见的自动装配的类都包含在<code>spring-boot-autoconfigure</code>包下面的<code>META-INF/spring.factories</code><br> 如里面就描述了刚刚说的mvc配置类<br><code>org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration</code></p><h3 id="常见注解" tabindex="-1"><a class="header-anchor" href="#常见注解" aria-hidden="true">#</a> 常见注解</h3><ul><li>@Configuration,描述为配置类</li><li>@Conditional，可以设置配置类在什么条件下启用</li><li>@EnableAutoConfiguration，<strong>只有启用该注解才会实现自动装配</strong>，我们默认不需要手动加上该注解，因为**@SpringBootApplication**注解里包含了该注解</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@SpringBootConfiguration</span>
<span class="token comment">// 复合注解</span>
<span class="token annotation punctuation">@EnableAutoConfiguration</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span>
    excludeFilters <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>
    type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span><span class="token constant">CUSTOM</span><span class="token punctuation">,</span>
    classes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">TypeExcludeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>
    type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span><span class="token constant">CUSTOM</span><span class="token punctuation">,</span>
    classes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">AutoConfigurationExcludeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SpringBootApplication</span> <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),p=[e];function i(c,l){return a(),s("div",null,p)}const u=n(o,[["render",i],["__file","0629_SpringBootzidongzhuangpeiyuanli.html.vue"]]);export{u as default};