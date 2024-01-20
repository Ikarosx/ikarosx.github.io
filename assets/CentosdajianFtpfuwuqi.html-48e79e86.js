import{_ as s,p as n,q as a,Y as e}from"./framework-f2b64c38.js";const i={},l=e(`<h2 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h2><p>舍友录完office的视频<br> 想要把视频分享给其他的同学<br> 然后就在研究怎么上传到服务器<br> 给别人查看<br> 一开始我们想的是用<strong>scp</strong>命令<br> 即在服务器上创建一个用户用于上传下载<br> 后面又<strong>不想让这个用户可以ssh</strong>连接到服务器<br> 所以我们考虑使用sftp<br> 并限制不允许ssh登陆<br> 但是sftp无法用<code>ftp://xx.xx</code>这种形式访问<br> 对使用的人来说有一些不便<br> 最后研究使用vsftpd自搭ftp服务器</p><h2 id="搭建环境" tabindex="-1"><a class="header-anchor" href="#搭建环境" aria-hidden="true">#</a> 搭建环境</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Centos 7</span>
<span class="token comment"># 安装vsftpd</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> vsftpd
<span class="token comment"># 启动</span>
systemctl start vsftpd
<span class="token comment"># 查看是否启动</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> vsftpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h2><p>默认配置文件 <code>/etc/vsftpd/vsftpd.conf</code> 我们需要对配置文件做一些修改</p><h3 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置" aria-hidden="true">#</a> 基本配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用ipv4监听，二者二选一,</span>
<span class="token assign-left variable">listen</span><span class="token operator">=</span>YES
<span class="token assign-left variable">listen_ipv6</span><span class="token operator">=</span>NO
<span class="token comment"># 默认端口21</span>
<span class="token assign-left variable">listen_port</span><span class="token operator">=</span><span class="token number">21</span>
<span class="token comment">###### 主动模式/被动模式 二选一 ######</span>
<span class="token comment">## 主动模式</span>
<span class="token assign-left variable">pasv_enable</span><span class="token operator">=</span>no

<span class="token comment">## 被动模式</span>
<span class="token assign-left variable">pasv_enable</span><span class="token operator">=</span>yes
<span class="token comment"># 设置被动模式的端口范围</span>
<span class="token assign-left variable">pasv_min_port</span><span class="token operator">=</span><span class="token number">50000</span>
<span class="token assign-left variable">pasv_max_port</span><span class="token operator">=</span><span class="token number">50100</span>
<span class="token comment"># 公网IP</span>
<span class="token assign-left variable">pasv_address</span><span class="token operator">=</span><span class="token number">8.210</span>.20.141
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主动模式与被动模式" tabindex="-1"><a class="header-anchor" href="#主动模式与被动模式" aria-hidden="true">#</a> 主动模式与被动模式</h3><p>主动模式是客户端告诉服务器自己要用哪个端口传输数据<br> 被动模式是服务器告诉客户端自己要用哪个端口传输数据<br> 在阿里云这种云主机下由于可能被防火墙拦截<br> 使用被动模式要注意开放范围端口<br> 并设置好公网IP</p><h3 id="匿名用户" tabindex="-1"><a class="header-anchor" href="#匿名用户" aria-hidden="true">#</a> 匿名用户</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">###### 配置匿名用户登陆 ######</span>
<span class="token comment"># 允许匿名</span>
<span class="token assign-left variable">anonymous_enable</span><span class="token operator">=</span>YES
<span class="token comment"># 允许匿名用户上传文件</span>
<span class="token assign-left variable">anon_upload_enable</span><span class="token operator">=</span>YES
<span class="token comment"># 允许匿名用户创建文件夹</span>
<span class="token assign-left variable">anon_mkdir_write_enable</span><span class="token operator">=</span>YES
<span class="token comment"># 允许匿名用户删除/重命名文件</span>
<span class="token assign-left variable">anon_other_write_enable</span><span class="token operator">=</span>YES
<span class="token comment"># 权限掩码,777-022=755,这样子才有权限</span>
<span class="token assign-left variable">anon_umask</span><span class="token operator">=</span>022
<span class="token comment"># 根目录,实际目录/var/ftp下有pub文件夹,注意/var和/var/ftp的owner必须是root</span>
<span class="token assign-left variable">anon_root</span><span class="token operator">=</span>/var/ftp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="本地用户" tabindex="-1"><a class="header-anchor" href="#本地用户" aria-hidden="true">#</a> 本地用户</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">###### 配置本地用户登陆 ######</span>
<span class="token comment"># 根目录可写</span>
<span class="token assign-left variable">allow_writeable_chroot</span><span class="token operator">=</span>YES
<span class="token comment"># 允许本地用户模式</span>
<span class="token assign-left variable">local_enable</span><span class="token operator">=</span>YES                
<span class="token comment"># 设置可写入权限</span>
<span class="token assign-left variable">write_enable</span><span class="token operator">=</span>YES                
<span class="token comment"># 本地用户模式创建文件的umask值</span>
<span class="token assign-left variable">local_umask</span><span class="token operator">=</span>022                 
<span class="token comment"># 参数值为YES即禁止名单中的用户，参数值为NO则代表仅允许名单中的用户</span>
<span class="token assign-left variable">userlist_deny</span><span class="token operator">=</span>YES               
<span class="token comment"># 允许&quot;禁止登陆名单&quot;,名单文件为ftpusers与user_list,默认禁止root用户</span>
<span class="token assign-left variable">userlist_enable</span><span class="token operator">=</span>YES     
<span class="token comment"># 限制活动范围，不能访问其他目录</span>
<span class="token assign-left variable">chroot_local_user</span><span class="token operator">=</span>YES
<span class="token comment"># 根目录    </span>
<span class="token assign-left variable">local_root</span><span class="token operator">=</span>/var/ftp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="虚拟用户" tabindex="-1"><a class="header-anchor" href="#虚拟用户" aria-hidden="true">#</a> 虚拟用户</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### vsftpd.conf ###</span>
<span class="token comment"># 允许匿名用户</span>
<span class="token assign-left variable">guest_enable</span><span class="token operator">=</span>YES
<span class="token comment"># 要映射到的用户</span>
<span class="token assign-left variable">guest_username</span><span class="token operator">=</span>vsftpd
<span class="token comment"># 配置虚拟用户文件夹</span>
<span class="token assign-left variable">user_config_dir</span><span class="token operator">=</span>/etc/vsftpd/vconf

<span class="token comment">### shell操作 ###</span>
<span class="token comment"># 创建编辑用户文件</span>
<span class="token function">vim</span> /etc/vsftpd/virtusers
<span class="token comment"># 第一行为用户名，第二行为密码。不能使用root作为用户名 </span>
Ikarosxx
<span class="token number">123456</span>

<span class="token comment"># 生成用户数据文件</span>
db_load <span class="token parameter variable">-T</span> <span class="token parameter variable">-t</span> <span class="token builtin class-name">hash</span> <span class="token parameter variable">-f</span> /etc/vsftpd/virtusers /etc/vsftpd/virtusers.db
<span class="token comment"># 设定PAM验证文件，并指定对虚拟用户数据库文件进行读取</span>
<span class="token function">chmod</span> <span class="token number">600</span> /etc/vsftpd/virtusers.db 

<span class="token comment"># 修改前先备份 </span>
<span class="token function">cp</span> /etc/pam.d/vsftpd /etc/pam.d/vsftpd.bak
<span class="token function">vim</span> /etc/pam.d/vsftpd
<span class="token comment"># 先将配置文件中原有的 auth 及 account 的所有配置行均注释掉</span>
auth sufficient /lib64/security/pam_userdb.so <span class="token assign-left variable">db</span><span class="token operator">=</span>/etc/vsftpd/virtusers 
account sufficient /lib64/security/pam_userdb.so <span class="token assign-left variable">db</span><span class="token operator">=</span>/etc/vsftpd/virtusers 
<span class="token comment"># 如果系统为32位，上面改为lib</span>

<span class="token comment"># 添加用户，登录终端设为/bin/false，使之不能登录系统</span>
<span class="token function">useradd</span> vsftpd <span class="token parameter variable">-d</span> /home/vsftpd <span class="token parameter variable">-s</span> /bin/false
<span class="token function">chown</span> <span class="token parameter variable">-R</span> vsftpd:vsftpd /home/vsftpd

<span class="token function">mkdir</span> /etc/vsftpd/vconf
<span class="token builtin class-name">cd</span> /etc/vsftpd/vconf

<span class="token comment"># 这里建立虚拟用户Ikarosxx配置文件</span>
<span class="token function">touch</span> Ikarosxx
<span class="token comment"># 编辑Ikarosxx用户配置文件，内容如下，其他用户类似</span>
<span class="token function">vim</span> Ikarosxx

<span class="token assign-left variable">local_root</span><span class="token operator">=</span>/home/vsftpd/Ikarosxx/
<span class="token assign-left variable">write_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_world_readable_only</span><span class="token operator">=</span>NO
<span class="token assign-left variable">anon_upload_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_mkdir_write_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_other_write_enable</span><span class="token operator">=</span>YES

<span class="token comment"># 建立虚拟用户根目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/vsftpd/Ikarosxx/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="centos使用ftp" tabindex="-1"><a class="header-anchor" href="#centos使用ftp" aria-hidden="true">#</a> Centos使用ftp</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">ftp</span>
<span class="token comment"># 查看帮助</span>
<span class="token function">man</span> <span class="token function">ftp</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关闭selinux" tabindex="-1"><a class="header-anchor" href="#关闭selinux" aria-hidden="true">#</a> 关闭SELinux</h2><p>SElinux会影响Permission denied 为啥我也不知道。。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看selinux状态</span>
sestatus
<span class="token comment"># 修改配置文件</span>
<span class="token function">vim</span> /etc/selinux/config
<span class="token comment"># enforcing、permissive、disabled</span>
<span class="token assign-left variable">SELINUX</span><span class="token operator">=</span>disabled
<span class="token comment"># 重启</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>对于linux的权限控制和用户管理更加熟悉了一些<br> 对于ftp的使用也更加深刻<br> （感觉像在写实验报告</p>`,23),t=[l];function c(r,p){return n(),a("div",null,t)}const d=s(i,[["render",c],["__file","CentosdajianFtpfuwuqi.html.vue"]]);export{d as default};
