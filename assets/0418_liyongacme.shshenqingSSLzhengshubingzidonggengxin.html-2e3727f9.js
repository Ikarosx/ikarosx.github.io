import{_ as c,n as l,p as r,q as t,s as n,R as e,t as a,Y as i}from"./framework-f2b64c38.js";const d={},o=i('<h1 id="利用acme-sh申请ssl证书并自动更新" tabindex="-1"><a class="header-anchor" href="#利用acme-sh申请ssl证书并自动更新" aria-hidden="true">#</a> 利用acme.sh申请SSL证书并自动更新</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>有时候买了国外的域名，但是可能不提供直接申请免费的SSL证书，这个时候需要我们去购买付费的证书或者找到一些免费的服务机构，比如<code>Let&#39;s Encrypt</code>,于是我就找有没有比较快捷地申请证书的方式，答案就是acme。</p><h2 id="什么是acme" tabindex="-1"><a class="header-anchor" href="#什么是acme" aria-hidden="true">#</a> 什么是ACME</h2>',4),m={href:"https://datatracker.ietf.org/doc/html/rfc8555",target:"_blank",rel:"noopener noreferrer"},p=n("h2",{id:"acme实现",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#acme实现","aria-hidden":"true"},"#"),e(" ACME实现")],-1),h={href:"https://datatracker.ietf.org/doc/html/rfc8555",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/acmesh-official/acme.sh",target:"_blank",rel:"noopener noreferrer"},u={href:"https://letsencrypt.org/zh-cn/docs/client-options/",target:"_blank",rel:"noopener noreferrer"},b=i(`<h2 id="acme-sh" tabindex="-1"><a class="header-anchor" href="#acme-sh" aria-hidden="true">#</a> acme.sh</h2><p>acme.sh是一个bash环境下运行的脚本，实现了ACME协议。</p><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
<span class="token function">curl</span> https://get.acme.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> <span class="token assign-left variable">email</span><span class="token operator">=</span>my@example.com
<span class="token comment"># 查看帮助</span>
acme.sh <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装程序做了3步骤</p><ol><li>复制acme.sh到~/.acme.sh/下，所有的证书都会被放在这里</li><li>创建别名acme.sh=~/.acme.sh/acme.sh</li><li>创建定时任务，每天检查是否有证书过期并续订</li></ol><h3 id="申请证书" tabindex="-1"><a class="header-anchor" href="#申请证书" aria-hidden="true">#</a> 申请证书</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 通过这个命令申请证书，-d域名，-w nginx下的目录（主要用于校验，所以需要先配置好解析和nginx）</span>
acme.sh <span class="token parameter variable">--issue</span> <span class="token parameter variable">-d</span> xxx.com <span class="token parameter variable">-w</span> /usr/share/nginx/html/fanli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>申请完毕可以在<code>~/.acme.sh/</code>下看到<br> 证书申请好后我们还需要配置让nginx使用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -d 域名</span>
<span class="token comment"># 在nginx配置下新建文件夹ssl，将证书放在这里面</span>
<span class="token comment"># reloadcmd写好nginx的重启命令</span>
<span class="token comment"># 配置好以后，acme.sh会将前面创建好的证书放在我们指定的目录下</span>
<span class="token comment"># 并且通过最开始的定时检测证书是否过期（一般是60天）</span>
<span class="token comment"># 如果过期会自动续订并更新证书文件到现在指定的目录，且会执行reloadcmd重启nginx</span>
acme.sh --install-cert <span class="token parameter variable">-d</span> xxx.com <span class="token punctuation">\\</span> 
--key-file /etc/nginx/conf.d/ssl/xxx.com.key.pem <span class="token punctuation">\\</span> 
--fullchain-file /etc/nginx/conf.d/ssl/xxx.com.cert.pem <span class="token punctuation">\\</span>
<span class="token parameter variable">--reloadcmd</span> <span class="token string">&quot;systemctl restart nginx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置nginx" tabindex="-1"><a class="header-anchor" href="#配置nginx" aria-hidden="true">#</a> 配置nginx</h3><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># nginx.conf
server {
        listen 443 ssl;
        server_name xxx.com;
        ssl_certificate /etc/nginx/conf.d/ssl/xxx.com.cert.pem;
        ssl_certificate_key /etc/nginx/conf.d/ssl/xxx.com.key.pem;
        location / {
                root /usr/share/nginx/html/xxx;
        }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存修改后重启<br> 然后访问域名正常应该可以看到https</p><h2 id="可能遇到的问题" tabindex="-1"><a class="header-anchor" href="#可能遇到的问题" aria-hidden="true">#</a> 可能遇到的问题</h2><h3 id="verify错误" tabindex="-1"><a class="header-anchor" href="#verify错误" aria-hidden="true">#</a> verify错误</h3><p>这个问题是acme在校验网站的所有权时校验失败</p><ol><li>可能原因是你的域名解析没有解析到你的nginx所在地址</li><li>nginx需要配置好目录，这个目录要和申请证书时的-w对应上</li></ol><h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2><h3 id="查看证书类型" tabindex="-1"><a class="header-anchor" href="#查看证书类型" aria-hidden="true">#</a> 查看证书类型</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看证书内容，</span>
<span class="token comment"># -in指定证书位置（是key，不是cert）</span>
<span class="token comment"># -text 输出证书所有信息</span>
<span class="token comment"># -noout 不输出证书本身</span>
openssl x509 <span class="token parameter variable">-in</span> xxx.key.pem <span class="token parameter variable">-text</span> <span class="token parameter variable">-noout</span>
<span class="token comment"># 查看公钥算法和签名算法</span>
openssl x509 <span class="token parameter variable">-in</span> xxx.key.pem <span class="token parameter variable">-text</span> <span class="token parameter variable">-noout</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/Public Key|Signature Algorithm/&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/picgo20230418162010.png"><h3 id="sslscan查看网站支持的加密算法和版本" tabindex="-1"><a class="header-anchor" href="#sslscan查看网站支持的加密算法和版本" aria-hidden="true">#</a> sslscan查看网站支持的加密算法和版本</h3><p>使用sslscan查看网站目前支持的加密套件和TLS版本</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/picgo20230418163644.png"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装sslscan</span>
<span class="token comment"># centos如果提示没有zlib.h需要安装这个（可以先不安装）</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> zlib zlib-devel
<span class="token comment"># clone</span>
<span class="token function">git</span> clone https://github.com/rbsec/sslscan
<span class="token builtin class-name">cd</span> sslscan/
<span class="token function">make</span> static
<span class="token comment"># 查看是否安装成功</span>
./sslscan
<span class="token comment"># 使用，就可以出现上面的图片类似的结果</span>
./sslscan xxx.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上图可以看到目前网站支持TLS1.0和1.1，这是不安全的，等保过不了<br> 包括下面的支持的加密套件，如果是弱加密套件也有问题<br> 配置nginx TLS版本</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>server {
	listen 443 ssl;
	server_name xxx.com;
	ssl_certificate /etc/nginx/conf.d/ssl/xxx.com.cert.pem;
	ssl_certificate_key /etc/nginx/conf.d/ssl/xxx.com.key.pem;
    # TLS版本
	ssl_protocols TLSv1.2 TLSv1.3;
    # 加密套件
	ssl_ciphers HIGH:!aNULL:!MD5;
	location / {
		root /usr/share/nginx/html/fanli;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更改完nginx配置重启<br> 再次使用sslscan查看，就可以看到只支持TLS1.2和1.3了</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/picgo20230418164618.png"><h3 id="泛域名" tabindex="-1"><a class="header-anchor" href="#泛域名" aria-hidden="true">#</a> 泛域名</h3><p>泛域名就是通配符域名，比如<code>*.xxx.com</code>，这样的域名可以匹配任意子域名<br> 这样子我们就可以申请一个泛域名证书，然后所有的子域名都可以使用这个证书了<br> 泛域名需要使用dns模式<br> 可以使用厂商一键模式，也可以使用手动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 颁发泛域名证书</span>
acme.sh  <span class="token parameter variable">--issue</span>  <span class="token parameter variable">-d</span> <span class="token string">&#39;*.xxx.com&#39;</span>  <span class="token parameter variable">--dns</span> --yes-I-know-dns-manual-mode-enough-go-ahead-please
<span class="token comment"># 按提示在DNS解析上增加TXT_VALUE等值，等待生效  </span>
<span class="token comment"># 使用dig查看是否生效</span>
<span class="token function">dig</span> <span class="token parameter variable">-t</span> txt _acme-challenge.xxx.com @8.8.8.8
<span class="token comment"># renew，重新颁发</span>
acme.sh <span class="token parameter variable">--renew</span> <span class="token parameter variable">-d</span> *.xxx.com <span class="token punctuation">\\</span>
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
<span class="token comment"># 重新install即可</span>
acme.sh --install-cert <span class="token parameter variable">-d</span> *.xxx.com <span class="token punctuation">\\</span> 
--key-file /etc/nginx/conf.d/ssl/common.xxx.com.key.pem <span class="token punctuation">\\</span> 
--fullchain-file /etc/nginx/conf.d/ssl/common.xxx.com.cert.pem <span class="token punctuation">\\</span>
<span class="token parameter variable">--reloadcmd</span> <span class="token string">&quot;systemctl restart nginx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/picgo20230418173643.png"><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/picgo20230418200643.png"><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>acme申请证书还是挺方便的，对于企业来说，可能云厂商通常只提供20个，如果不想付费可以采用<br> 对于个人来说，这更是简单了，虽然有60天的限制，但是基于自动更新的话也不用操心,而且可以申请泛域名，很方便。</p><h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h1>`,37),x={href:"https://www.keyfactor.com/blog/what-is-acme-protocol-and-how-does-it-work/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://letsencrypt.org/zh-cn/getting-started/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://datatracker.ietf.org/doc/html/rfc8555",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/acmesh-official/acme.sh",target:"_blank",rel:"noopener noreferrer"};function _(y,L){const s=l("ExternalLinkIcon");return r(),t("div",null,[o,n("p",null,[e("Automated Certificate Management Environment,即自动证书管理环境，是一种协议来着（"),n("a",m,[e("RFC8555"),a(s)]),e("），可以自动颁发和续订证书，当然也可以实现我们的需求申请证书，这只是一个最基本的功能。")]),p,n("p",null,[e("既然ACME是一个标准，那么定然会有众多实现，比如Let's Encrypt官网描述的"),n("a",h,[e("certbot"),a(s)]),e(",以及本文重点描述的"),n("a",v,[e("acme.sh"),a(s)]),e("，感兴趣也可以看看"),n("a",u,[e("其他客户端"),a(s)])]),b,n("ol",null,[n("li",null,[n("a",x,[e("What is ACME protocol and how does it work? "),a(s)])]),n("li",null,[n("a",g,[e("Let's Encrypt"),a(s)])]),n("li",null,[n("a",k,[e("RFC8555"),a(s)])]),n("li",null,[n("a",f,[e("acme.sh"),a(s)])])])])}const w=c(d,[["render",_],["__file","0418_liyongacme.shshenqingSSLzhengshubingzidonggengxin.html.vue"]]);export{w as default};
