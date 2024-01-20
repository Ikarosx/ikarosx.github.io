import{_ as e,n as p,p as c,q as o,s as n,R as s,t as l,Y as a}from"./framework-f2b64c38.js";const i={},u=a('<h1 id="rabbitmq入门" tabindex="-1"><a class="header-anchor" href="#rabbitmq入门" aria-hidden="true">#</a> rabbitmq入门</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><blockquote><p>RabbitMQ is the most widely deployed open source message broker.</p></blockquote><p>RabbitMQ是最广泛部署的开源消息中间件。</p><p>最常见的例子就是发短信（老生常谈 在发短信的例子中采用了消息队列后可以将发邮件这个操作分离出去<br> 接口只需要发消息给消息队列后即可直接返回，减少用户等待时间，提高用户体验</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202209151030782.png"><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>',7),r={href:"https://www.rabbitmq.com/which-erlang.html",target:"_blank",rel:"noopener noreferrer"},k=a(`<h3 id="yum" tabindex="-1"><a class="header-anchor" href="#yum" aria-hidden="true">#</a> yum</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 更新yum</span>
<span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> <span class="token function">install</span> epel-release
<span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> update


<span class="token comment"># 安装erlang</span>
<span class="token comment"># centos7，选择el/7的版本</span>
<span class="token function">curl</span> <span class="token parameter variable">-s</span> https://packagecloud.io/install/repositories/rabbitmq/erlang/script.rpm.sh <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">bash</span> 
<span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> <span class="token function">install</span> erlang-23.3.4.11-1.el7.x86_64
<span class="token comment"># 查看erl是否安装成功</span>
erl <span class="token parameter variable">-version</span>
<span class="token comment"># 安装rabbitmq</span>
<span class="token function">curl</span> <span class="token parameter variable">-s</span> https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.rpm.sh <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">bash</span>
<span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> <span class="token function">install</span> rabbitmq-server-3.9.9-1.el7.noarch

<span class="token comment"># 启用管理界面</span>
rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_management

<span class="token comment"># 开放端口</span>
<span class="token comment"># https://www.rabbitmq.com/install-rpm.html#configuration</span>
<span class="token comment"># firewalld的情况</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public <span class="token parameter variable">--permanent</span> --add-port<span class="token operator">=</span><span class="token number">4369</span>/tcp --add-port<span class="token operator">=</span><span class="token number">15672</span>/tcp  --add-port<span class="token operator">=</span><span class="token number">25672</span>/tcp --add-port<span class="token operator">=</span><span class="token number">5671</span>-5672/tcp
<span class="token comment"># 装在新的规则</span>
firewall-cmd <span class="token parameter variable">--reload</span>
<span class="token comment"># 默认账号密码guest/guest，但是只能本地登录，所以需要新增账号密码</span>
rabbitmqctl add_user admin password
rabbitmqctl set_user_tags admin administrator
<span class="token comment"># 将vhost（虚拟主机，作隔离） &#39;/&#39; 配置给admin，后三个分别配置为config权限、写权限、读权限，支持正则表达式</span>
rabbitmqctl set_permissions <span class="token parameter variable">-p</span> / admin <span class="token string">&#39;.*&#39;</span> <span class="token string">&#39;.*&#39;</span> <span class="token string">&#39;.*&#39;</span>
<span class="token comment"># 配置完就可以打开ip:15672访问了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">5672</span>:5672 <span class="token parameter variable">-p</span> <span class="token number">15672</span>:15672 <span class="token parameter variable">--name</span> rabbitmq rabbitmq:management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="管理界面" tabindex="-1"><a class="header-anchor" href="#管理界面" aria-hidden="true">#</a> 管理界面</h2><p>访问15672端口，用我们刚才添加的账号密码登陆</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202209190858323.png"><h3 id="测试1-helloword" tabindex="-1"><a class="header-anchor" href="#测试1-helloword" aria-hidden="true">#</a> 测试1 HelloWord</h3><h4 id="图示" tabindex="-1"><a class="header-anchor" href="#图示" aria-hidden="true">#</a> 图示</h4><p>参考https://www.rabbitmq.com/tutorials/tutorial-one-java.html</p><p>消息的生产者指定某个队列发送消息<br> 消息的消费者指定某个队列消费消息</p><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202209191019971.png"><h4 id="maven配置" tabindex="-1"><a class="header-anchor" href="#maven配置" aria-hidden="true">#</a> maven配置</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.rabbitmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>amqp-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.14.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="发送消息" tabindex="-1"><a class="header-anchor" href="#发送消息" aria-hidden="true">#</a> 发送消息</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>ikarosx<span class="token punctuation">.</span>rabbitmq</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">Channel</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">Connection</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">ConnectionFactory</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> 许培宇
 * <span class="token keyword">@date</span> 2022/9/19 9:43
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMqProducer</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_NAME</span> <span class="token operator">=</span> <span class="token string">&quot;test_queue&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
        <span class="token class-name">ConnectionFactory</span> connectionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置rabbitmq地址</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.5.128&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 账号</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 密码</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">&quot;StrongPassword&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建连接</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Connection</span> connection <span class="token operator">=</span> connectionFactory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 创建通道</span>
            <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 声明队列</span>
            channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 消息内容</span>
            <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">// 发送消息</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Producer send message： &quot;</span>  <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202209190951549.png"><img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202209190951239.png"><h4 id="消费消息" tabindex="-1"><a class="header-anchor" href="#消费消息" aria-hidden="true">#</a> 消费消息</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>ikarosx<span class="token punctuation">.</span>rabbitmq</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">Channel</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">Connection</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">ConnectionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">DeliverCallback</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>nio<span class="token punctuation">.</span>charset<span class="token punctuation">.</span></span><span class="token class-name">StandardCharsets</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> 许培宇
 * <span class="token keyword">@date</span> 2022/9/19 9:43
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMqConsumer</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_NAME</span> <span class="token operator">=</span> <span class="token string">&quot;test_queue&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
        <span class="token class-name">ConnectionFactory</span> connectionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置rabbitmq地址</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.5.128&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 账号</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 密码</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">&quot;StrongPassword&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建连接</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Connection</span> connection <span class="token operator">=</span> connectionFactory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 创建通道</span>
            <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 声明队列</span>
            channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 消费回调</span>
            <span class="token class-name">DeliverCallback</span> deliverCallback <span class="token operator">=</span> <span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> delivery<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>delivery<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot; Consumer received：&quot;</span> <span class="token operator">+</span> message <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token comment">// 消费</span>
            channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> deliverCallback<span class="token punctuation">,</span> consumerTag <span class="token operator">-&gt;</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 防止直接结束导致看不到输出</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先启动生产者再启动消费者，可以看到消费到了一条消息<br> 在这里我们只声明了队列名称， <img src="https://ikaros-picture.oss-cn-shenzhen.aliyuncs.com/typora202209190955503.png"></p><h3 id="消费者ack和生产者confirm" tabindex="-1"><a class="header-anchor" href="#消费者ack和生产者confirm" aria-hidden="true">#</a> 消费者ack和生产者confirm</h3><p>参考资料https://www.rabbitmq.com/confirms.html</p><p>由于发送的消息不能保证被成功接收或处理，所以需要使用一种手动消息确认机制，默认情况下是自动确认<br> 未确认的情况下</p>`,24);function d(m,v){const t=p("ExternalLinkIcon");return c(),o("div",null,[u,n("p",null,[s("安装需要注意的点是要保证erlang和rabbitmq的版本能够兼容 "),n("a",r,[s("版本对应关系"),l(t)])]),k])}const h=e(i,[["render",d],["__file","0915_RabbitMQrumen.html.vue"]]);export{h as default};