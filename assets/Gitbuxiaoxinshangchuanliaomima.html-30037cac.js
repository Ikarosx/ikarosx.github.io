import{_ as e,p as a,q as i,Y as t}from"./framework-f2b64c38.js";const r={},n=t('<div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p><p>解决思路：对于每一个版本都删除，然后上传版本覆盖远程仓库的版本</p></div><h2 id="本地删除" tabindex="-1"><a class="header-anchor" href="#本地删除" aria-hidden="true">#</a> 本地删除</h2><p><code>git filter-branch --force --index-filter &#39;git rm --cached --ignore-unmatch src/main/resources/application.yaml&#39; --prune-empty --tag-name-filter cat -- --all</code></p><p>可能遇到</p><p><code>Cannot rewrite branches: You have unstaged changes</code></p><p>解决：执行<code>git stash</code></p><h2 id="覆盖远程仓库" tabindex="-1"><a class="header-anchor" href="#覆盖远程仓库" aria-hidden="true">#</a> 覆盖远程仓库</h2><p>覆盖所有的branch和tags</p><p><code>git push origin --force --all</code></p><p><code>git push origin --force --tags</code></p><h2 id="强制解除对本地存储库中的所有对象的引用和垃圾收集" tabindex="-1"><a class="header-anchor" href="#强制解除对本地存储库中的所有对象的引用和垃圾收集" aria-hidden="true">#</a> 强制解除对本地存储库中的所有对象的引用和垃圾收集</h2><ul><li>git for-each-ref --format=&#39;delete %(refname)&#39; refs/original | git update-ref --stdin</li><li>git reflog expire --expire=now --all</li><li>git gc --prune=now</li></ul>',12),o=[n];function c(s,l){return a(),i("div",null,o)}const d=e(r,[["render",c],["__file","Gitbuxiaoxinshangchuanliaomima.html.vue"]]);export{d as default};
