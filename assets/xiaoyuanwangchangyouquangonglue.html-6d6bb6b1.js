import{_ as s,p as n,q as a,Y as e}from"./framework-f2b64c38.js";const r={},o=e(`<h2 id="回顾" tabindex="-1"><a class="header-anchor" href="#回顾" aria-hidden="true">#</a> 回顾</h2><p>在2018年11月22日<br> 我们讲了如何在机房破解老师的控制<br> 以及利用windows自带的远程桌面连接宿舍的电脑</p><p>在2019年3月17日<br> 我们讲了如何在校内网登陆迅雷</p><p>今天我们要讲</p><ul><li>如何解决在某一时刻开始远程连接无法使用的问题</li><li>如何不交网费，使用舍友（至少要有一个交钱吧）电脑网络上网</li><li>网线共享文件夹，轻松互拖文件</li></ul><h2 id="远程连接无法访问" tabindex="-1"><a class="header-anchor" href="#远程连接无法访问" aria-hidden="true">#</a> 远程连接无法访问</h2><p>先说结论，远程连接端口使用的是<strong>3389</strong>，学校<strong>屏蔽</strong>了3389端口 所以我们只要更换windows远程端口不为3389即可<br> 实现方式有两种</p><h3 id="更换远程连接服务端口" tabindex="-1"><a class="header-anchor" href="#更换远程连接服务端口" aria-hidden="true">#</a> 更换远程连接服务端口</h3><p>WIN+R 打开运行<br> 输入<strong>regedit</strong>打开注册表<br> 找到下面路径<br><code>HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\\Wds\\rdpwd\\Tds\\tcp</code><br> 双击右边<strong>PortNumber</strong><br> 点击10进制，改为你想要的端口<br> 重启电脑</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20201017161156.png"><p>远程桌面连接的时候就填写ip:端口即可</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20201017161246.png"><h3 id="利用win10代理转发请求" tabindex="-1"><a class="header-anchor" href="#利用win10代理转发请求" aria-hidden="true">#</a> 利用win10代理转发请求</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 需要管理员权限运行</span>
<span class="token comment"># listenport=4445 listenaddress=0.0.0.0 表示将任何访问4445端口的请求</span>
<span class="token comment"># connectport=3389 connectaddress=127.0.0.1 转发到127.0.0.1:3389</span>
<span class="token comment"># 这样我们就可以不访问3389，而是访问4445，虽然我们的电脑又会将4445端口的请求转发到3389</span>
<span class="token comment"># 从而绕过学校的3389端口限制</span>
netsh interface portproxy <span class="token function">add</span> v4tov4 <span class="token assign-left variable">listenport</span><span class="token operator">=</span><span class="token number">4445</span> <span class="token assign-left variable">listenaddress</span><span class="token operator">=</span>* <span class="token assign-left variable">connectport</span><span class="token operator">=</span><span class="token number">3389</span> <span class="token assign-left variable">connectaddress</span><span class="token operator">=</span><span class="token number">127.0</span>.0.1

<span class="token comment"># 查看所有配置</span>
netsh interface portproxy show all
<span class="token comment"># 删除转发策略</span>
netsh interface portproxy delete v4tov4 <span class="token assign-left variable">listenport</span><span class="token operator">=</span><span class="token number">4445</span> <span class="token assign-left variable">listenaddress</span><span class="token operator">=</span>*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何宿舍共享上网-有线" tabindex="-1"><a class="header-anchor" href="#如何宿舍共享上网-有线" aria-hidden="true">#</a> 如何宿舍共享上网（有线）</h2><p>先说结论，在要共享网络的电脑搭建ss服务器<br> 其他电脑用<strong>ipv6</strong>使用ss客户端连接这一台电脑<br> 然后就可以实现没网的情况下将请求转发到你舍友的电脑</p><p><strong>缺点是大家会一起占用网速</strong></p><p>虽然实现过了之后才发现其实可以用那台电脑开热点。。<br> 考虑到可以开热点以及需要搭建ss服务器<br> 这里就不放具体实现方式了<br> 仅提供思路</p><p>注意需要使用ipv6，因为网线之间的连接无法使用ipv4</p><h2 id="win10-smb共享" tabindex="-1"><a class="header-anchor" href="#win10-smb共享" aria-hidden="true">#</a> Win10 SMB共享</h2><p>当你使用<strong>网线</strong>连接的时候（同样基于ipv6）<br> 可以看到在<code>计算机-&gt;网络</code>里有显示出别人的电脑</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20201017204830.png"><p>双击之后(可能需要密码)可以打开查看别人共享的文件夹/打印机等<br> 我们也可以使用这种方式来实现宿舍互传文件</p><p>为此我们需要进行一些设置</p><h3 id="启用共享" tabindex="-1"><a class="header-anchor" href="#启用共享" aria-hidden="true">#</a> 启用共享</h3><p>打开<code>共享选项</code>，配置一下<code>启用共享</code><br><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20201017205435.png"></p><h3 id="设置共享文件夹" tabindex="-1"><a class="header-anchor" href="#设置共享文件夹" aria-hidden="true">#</a> 设置共享文件夹</h3><p>右键你想要共享的文件夹,点击<code>属性</code><br> 切换到<code>共享</code>选项卡<br> 选择共享，设置共享用户<br> 此时能看到我们的访问路径<br> 格式为<code>\\\\主机名\\文件路径</code><br> 将其复制到资源管理器即可打开</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora/Ikaros/20201017210157.png"><p>经过以上操作，你只要在<code>网络</code>里打开共享文件方的电脑即可下载/上传文件</p>`,30),t=[o];function i(c,p){return n(),a("div",null,t)}const l=s(r,[["render",i],["__file","xiaoyuanwangchangyouquangonglue.html.vue"]]);export{l as default};