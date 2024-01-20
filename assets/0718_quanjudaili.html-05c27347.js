import{_ as t,n as i,p as o,q as l,s as n,R as s,t as a,Y as c}from"./framework-f2b64c38.js";const r={},p=c(`<h1 id="全局代理" tabindex="-1"><a class="header-anchor" href="#全局代理" aria-hidden="true">#</a> 全局代理</h1><blockquote><p>以下讨论仅针对windows</p></blockquote><h2 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h2><p>最近有个朋友问我当我们的代理软件（v2rayn）设置成全局代理后<br> 比如自己写的java程序会不会受代理的影响<br> 扩展一下也可以理解成这里的全局代理是不是真的是全局的</p><h2 id="探究" tabindex="-1"><a class="header-anchor" href="#探究" aria-hidden="true">#</a> 探究</h2><h3 id="常规" tabindex="-1"><a class="header-anchor" href="#常规" aria-hidden="true">#</a> 常规</h3><p>直观来讲，通常我们的代理是在服务器上搭建服务端<br> 本机上搭建客户端<br> 客户端配置好连接<br> 设置本地监听哪个端口<br> 然后在我们的软件上配置代理地址（客户端电脑地址）和端口<br> 软件的流量就会通过客户端<br> 再由客户端进行策略选择进行流量分发<br> 为了避免被拦截<br> 有些代理软件也会对流量进行伪装<br> 如v2rayN<br><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202207180939000.png"></p><h3 id="全局" tabindex="-1"><a class="header-anchor" href="#全局" aria-hidden="true">#</a> 全局</h3><p>在v2rayN中提供了一个全局代理的选项（不同版本软件叫法不同）<br><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202207180942427.png"><br> 其原理本质上是修改windows系统下的代理设置(可通过注册表)<br><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202207180943767.png"></p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202207180948628.png"><p>当我们设置了系统代理后<br> 软件可以选择直接获取系统代理<br><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202207180955684.png"><br> 有些软件默认是使用系统代理的如<strong>IE/Edge/Firefox</strong><br> 但如果软件默认不使用系统代理，或者软件不支持设置代理<br> 则我们的系统代理配置是不生效的</p><p>这就有了一开始的问题</p><blockquote><p>v2rayN中配置了全局代理,自己写的java程序会不会受代理的影响</p></blockquote><p>这取决于你有没有在java程序里配置</p><h4 id="java代理" tabindex="-1"><a class="header-anchor" href="#java代理" aria-hidden="true">#</a> Java代理</h4><p>可以手动指定<br> 也可以通过<code>java.net.useSystemProxies</code>使用系统代理</p><h5 id="原生请求" tabindex="-1"><a class="header-anchor" href="#原生请求" aria-hidden="true">#</a> 原生请求</h5><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>

import lombok.extern.slf4j.Slf4j;
import sun.net.www.protocol.http.HttpURLConnection;

import java.io.IOException;
import java.net.URL;

/**
 * @author 许培宇
 * @date 2022/6/1 15:31
 */
@Slf4j
public class Demo {
    public static void main(String[] args) throws Exception {
        String property = System.getProperty(&quot;java.net.useSystemProxies&quot;);
        log.info(&quot;java.net.useSystemProxies:{}&quot;, property);
        HttpURLConnection googleConnection = null;
        Object content = null;
        try {
            URL url = new URL(&quot;http://www.google.com&quot;);
            googleConnection = (HttpURLConnection) url.openConnection();
            googleConnection.setConnectTimeout(3000);
            googleConnection.connect();
            content = googleConnection.getContent();
            log.info(&quot;withOutProxy:{}&quot;, content);
        } catch (IOException e) {
            log.info(&quot;withOutProxy occur error&quot;);
        }

        try {
            googleConnection = new HttpURLConnection(new URL(&quot;http://www.google.com&quot;), &quot;127.0.0.1&quot;, 10809);
            googleConnection.setConnectTimeout(3000);
            googleConnection.connect();
            content = googleConnection.getContent();
            log.info(&quot;customProxy:{}&quot;, content);
        } catch (IOException e) {
            log.info(&quot;customProxy occur error&quot;);
        }


        try {

            googleConnection = new HttpURLConnection(new URL(&quot;http://www.google.com&quot;), null);
            googleConnection.setConnectTimeout(3000);
            googleConnection.connect();
            content = googleConnection.getContent();
            log.info(&quot;systemProxy:{}&quot;, content);
        } catch (IOException e) {
            log.info(&quot;systemProxy occur error&quot;);
        }

        // 输出结果
        // 10:34:36.114 [main] INFO cn.ikarosx.Demo - java.net.useSystemProxies:false
        // 10:34:39.169 [main] INFO cn.ikarosx.Demo - withOutProxy occur error
        // 10:34:39.265 [main] INFO cn.ikarosx.Demo - customProxy:sun.net.www.protocol.http.HttpURLConnection$HttpInputStream@5479e3f
        // 10:34:42.279 [main] INFO cn.ikarosx.Demo - systemProxy occur error

        // java.net.useSystemProxies可以指定使用系统代理参数
        // 需要添加虚拟机启动参数-Djava.net.useSystemProxies=true，不能在代码设置  
        // On recent Windows systems and on Gnome 2.x systems it is possible to tell the java.net stack, setting this property to true, to use the system proxy settings (both these systems let you set proxies globally through their user interface). Note that this property is checked only once at startup.


        // 系统代理输出结果
        // 10:55:49.416 [main] INFO cn.ikarosx.Demo - java.net.useSystemProxies:true
        // 10:55:49.542 [main] INFO cn.ikarosx.Demo - withOutProxy:sun.net.www.protocol.http.HttpURLConnection$HttpInputStream@5479e3f
        // 10:55:49.653 [main] INFO cn.ikarosx.Demo - customProxy:sun.net.www.protocol.http.HttpURLConnection$HttpInputStream@27082746
        // 10:55:49.773 [main] INFO cn.ikarosx.Demo - systemProxy:sun.net.www.protocol.http.HttpURLConnection$HttpInputStream@66133adc


    }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="resttemplate" tabindex="-1"><a class="header-anchor" href="#resttemplate" aria-hidden="true">#</a> RestTemplate</h5><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> property <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;java.net.useSystemProxies&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;java.net.useSystemProxies:{}&quot;</span><span class="token punctuation">,</span> property<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">RestTemplate</span> restTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> forEntity <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span><span class="token string">&quot;http://www.google.com&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>forEntity<span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 10:59:40.075 [main] INFO cn.ikarosx.Demo - java.net.useSystemProxies:true</span>
    <span class="token comment">// 10:59:40.346 [main] DEBUG org.springframework.web.client.RestTemplate - HTTP GET http://www.google.com</span>
    <span class="token comment">// 10:59:40.360 [main] DEBUG org.springframework.web.client.RestTemplate - Accept=[text/plain, application/json, application/*+json, */*]</span>
    <span class="token comment">// 10:59:40.466 [main] DEBUG org.springframework.web.client.RestTemplate - Response 200 OK</span>
    <span class="token comment">// 10:59:40.499 [main] DEBUG org.springframework.web.client.RestTemplate - Reading to [java.lang.String] as &quot;text/html;charset=ISO-8859-1&quot;</span>
    <span class="token comment">// 200 OK</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="其他配置" tabindex="-1"><a class="header-anchor" href="#其他配置" aria-hidden="true">#</a> 其他配置</h5><p>https://docs.oracle.com/javase/8/docs/api/java/net/doc-files/net-properties.html</p><h4 id="真全局" tabindex="-1"><a class="header-anchor" href="#真全局" aria-hidden="true">#</a> 真全局</h4><p>那有没有什么办法实现让不支持代理的软件也走代理呢？<br> ssTap/proxifier/freeCap就可以实现类似的功能<br> 大致是如下几种方案</p><h5 id="虚拟网卡" tabindex="-1"><a class="header-anchor" href="#虚拟网卡" aria-hidden="true">#</a> 虚拟网卡</h5>`,25),u=n("br",null,null,-1),d=n("br",null,null,-1),m=n("br",null,null,-1),v=n("br",null,null,-1),b=n("br",null,null,-1),h={href:"https://cloud.tencent.com/developer/article/1432451",target:"_blank",rel:"noopener noreferrer"},k=n("br",null,null,-1),g=n("p",null,[s("ssTap/vpn/wireguard是这么做的"),n("br"),s(" 当我们使用之后可以在网络适配器里查看网卡"),n("br"),s(" 可以看到多了一个"),n("br"),n("code",null,"route print"),s("可以查看路由表"),n("br"),n("img",{src:"https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202207191707926.png"})],-1),y=n("h5",{id:"winsock-lsp劫持",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#winsock-lsp劫持","aria-hidden":"true"},"#"),s(" Winsock LSP劫持")],-1),w=n("br",null,null,-1),x={href:"https://www.komodia.com/lsp-sub#what-is-lsp",target:"_blank",rel:"noopener noreferrer"},f=n("br",null,null,-1),_=n("br",null,null,-1),q=n("br",null,null,-1),j={href:"https://bbs.csdn.net/topics/390647458?list=lz",target:"_blank",rel:"noopener noreferrer"},C=n("br",null,null,-1),S=n("br",null,null,-1),P=n("img",{src:"https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202207200850141.png"},null,-1);function R(I,O){const e=i("ExternalLinkIcon");return o(),l("div",null,[p,n("p",null,[s("原理是新建一个(Tun/Tap)虚拟网卡"),u,s(" 然后修改路由规则"),d,s(" 将某些网段的请求经由这个虚拟网卡处理"),m,s(" 具体网卡是如何处理的这部分不是很清楚"),v,s(" 找了很多资料也没有看不太懂"),b,s(" 这里引用一篇"),n("a",h,[s("文章"),a(e)]),s("说的是我们的客户端会监听虚拟网卡"),k,s(" 虚拟网卡接收到后会发给我们的客户端去处理")]),g,y,n("p",null,[s("这种方式是proxifier的实现方式"),w,s(" 参考"),n("a",x,[s("文章"),a(e)]),f,s(" 原理就是说应用层进行网络通讯时会调用Winsock API"),_,s(" LSP做的就是在中间进行拦截，达到修改等目的"),q,s(" 根据这篇"),n("a",j,[s("文章"),a(e)]),s("所说"),C,s(" 查看注册表(proxifier v3.42)可以看到"),S,P])])}const T=t(r,[["render",R],["__file","0718_quanjudaili.html.vue"]]);export{T as default};
