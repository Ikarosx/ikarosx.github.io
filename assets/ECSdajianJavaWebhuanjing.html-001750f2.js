import{_ as i,n as l,p as c,q as o,s,R as n,t,Y as a}from"./framework-f2b64c38.js";const r={},p=a(`<h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h2><h3 id="免费创建一台临时服务器" tabindex="-1"><a class="header-anchor" href="#免费创建一台临时服务器" aria-hidden="true">#</a> 免费创建一台临时服务器</h3><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200810084202.png"><h3 id="ssh登陆" tabindex="-1"><a class="header-anchor" href="#ssh登陆" aria-hidden="true">#</a> SSH登陆</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ssh</span> username@ip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200810084455.png">`,6),d={class:"custom-container tip"},m=a('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">SSH</p>',2),u=s("br",null,null,-1),v=s("br",null,null,-1),h={href:"http://blog.ikarosx.cn/docs/views/Web/2020/08/SSH%E7%94%A8%E6%88%B7%E8%AE%A4%E8%AF%81.html",target:"_blank",rel:"noopener noreferrer"},k=a(`<h3 id="安装jdk" tabindex="-1"><a class="header-anchor" href="#安装jdk" aria-hidden="true">#</a> 安装JDK</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看yum源中JDK版本</span>
yum list java*
<span class="token comment"># 使用yum安装JDK1.8</span>
<span class="token comment"># -y 表示对于弹出的提示自动输入y，不必手动输入</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> java-1.8.0-openjdk*
<span class="token comment"># 查看是否安装成功</span>
<span class="token function">java</span> <span class="token parameter variable">-version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200810091209.png">`,3),b={href:"https://stackoverflow.com/questions/22358071/differences-between-oracle-jdk-and-openjdk?r=SearchResults",target:"_blank",rel:"noopener noreferrer"},g=a(`<h3 id="安装mysql" tabindex="-1"><a class="header-anchor" href="#安装mysql" aria-hidden="true">#</a> 安装mysql</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装wget下载mysql官方的Yum Repository</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">wget</span>
<span class="token comment"># 下载mysql官方的Yum Repository</span>
<span class="token function">wget</span> http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
<span class="token comment"># 安装mysql官方的Yum Repository</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> mysql57-community-release-el7-10.noarch.rpm
<span class="token comment"># 安装mysql-server</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> mysql-community-server
<span class="token comment"># 启动Mysql数据库</span>
systemctl start mysqld.service
<span class="token comment"># 查看MySQL初始密码</span>
<span class="token function">grep</span> <span class="token string">&quot;password&quot;</span> /var/log/mysqld.log
<span class="token comment"># 登陆mysql</span>
mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span>
<span class="token comment"># 修改MySQL默认密码</span>
<span class="token builtin class-name">set</span> global <span class="token assign-left variable">validate_password_policy</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>  <span class="token comment">#修改密码安全策略为低（只校验密码长度，至少8位）。</span>
ALTER <span class="token environment constant">USER</span> <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED BY <span class="token string">&#39;12345678&#39;</span><span class="token punctuation">;</span>
<span class="token comment"># 授予root用户远程管理权限</span>
GRANT ALL PRIVILEGES ON *.* TO <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;%&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装tomcat" tabindex="-1"><a class="header-anchor" href="#安装tomcat" aria-hidden="true">#</a> 安装Tomcat</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载Tomcat压缩包</span>
<span class="token function">wget</span> https://mirror.bit.edu.cn/apache/tomcat/tomcat-8/v8.5.57/bin/apache-tomcat-8.5.57.tar.gz
<span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-xf</span> apache-tomcat-8.5.57.tar.gz 
<span class="token comment"># 重命名</span>
<span class="token function">mv</span> apache-tomcat-8.5.57 /usr/local/Tomcat8.5
<span class="token comment"># 为sh脚本文件授权</span>
<span class="token comment"># +x表示执行权限</span>
<span class="token function">chmod</span> +x /usr/local/Tomcat8.5/bin/*.sh
<span class="token comment"># 修改Tomcat默认端口8080为80</span>
<span class="token comment"># sed 流编辑器，-i是edit in place</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/Connector port=&quot;8080&quot;/Connector port=&quot;80&quot;/&#39;</span> /usr/local/Tomcat8.5/conf/server.xml
<span class="token comment"># 启动tomcat</span>
/usr/local/Tomcat8.5/bin/./startup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="访问tomcat" tabindex="-1"><a class="header-anchor" href="#访问tomcat" aria-hidden="true">#</a> 访问Tomcat</h3><p>由于配置了Tomcat端口为80，所以直接输入IP即可访问</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20200810102109.png"><h3 id="脚本" tabindex="-1"><a class="header-anchor" href="#脚本" aria-hidden="true">#</a> 脚本</h3>`,8),y={href:"https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/ECS_java_web_env_install.sh",target:"_blank",rel:"noopener noreferrer"},_=s("br",null,null,-1);function f(x,q){const e=l("ExternalLinkIcon");return c(),o("div",null,[p,s("div",d,[m,s("p",null,[n("SSH可以配置证书登陆"),u,n(" 其中我们在初次访问时有指纹确认，这个是为了防止中间人攻击"),v,n(" 详情可以参考我的另一篇博客"),s("a",h,[n("SSH用户认证"),t(e)])])]),k,n(" 可以看到目前openjdk8版本是8u262 而查了一下目前oracle jdk8最新是8u261 这也不难理解，oracle jdk是基于open jdk编写的 "),s("p",null,[n("更多OracleJDK和OpenJDK可以查看"),s("a",b,[n("StackOverFlow"),t(e)])]),g,s("p",null,[n("为了简便起见我写了一个简单的"),s("a",y,[n("脚本"),t(e)]),_,n(" 脚本没有实现更改mysql密码")])])}const S=i(r,[["render",f],["__file","ECSdajianJavaWebhuanjing.html.vue"]]);export{S as default};
