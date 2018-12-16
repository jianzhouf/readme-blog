---
title: Django urls与视图详解
lang: zh
meta:
  - name: description
    content: Django - urls与视图详解
  - name: keywords
    content: Django - urls与视图详解
---
# `urls`与视图详解
> 环境 `Windows10`

## 一、准备工作

* 使用 `virtualenvwrapper` 创建并进入虚拟环境

  ```shell
  mkvirtualenv myenv
  ```

* 安装 `Django2.0`
  ```shell
  pip install django==2.0
  ```

* 查看是否安装成功
  ```shell
  pip list
  ```

* 创建一个名为 `mysite` 的 `django` 项目
  ```shell
  django-admin startproject mysite
  ```

* 进入虚拟环境所在目录
  ```shell
  cdvirtualenv
  ```

* 打开当前目录
  ```shell
  start %cd%
  ```

* 将 `mysite` 目录拖到 `pycharm` 打开

* 设置 `pycharm` 的 `python` 环境  具体设置： [点击查看](https://zhb333.github.io/readme-blog/Python/Python/virtualenv-win.html#pycharm-%E4%B8%8E-virtualenvwrapper-%E7%9A%84%E9%85%8D%E5%90%88 'pycharm配置python环境')  


## 二、项目结构分析
* `manange.py` 项目的管理与交互都基于这个文件， 如启动项目：
  ```shell
  python manange.py runserver
  ```

* `__init__.py` 表示这是一个 `python` 模块

* `setting.py` 保存项目的所有配置信息

* `urls.py` 编写路由与视图的映射规则

* `wsig.py` 项目部署文件  

## 三、`DEBUG` 模式  与 `ALLOWED_HOSTS`

* 在 `mysite/settings.py` 中 默认是开启了 `DEBUG` 模式的
  ```python
  DEBUG = True
  ```

* `DEBUG` 模式的作用
  * 修改后自动重启项目
  * 详细的报错详细

* 关闭了 `DEBUG` 模式，必须设置 `ALLOWED_HOSTS `, 否则项目起不来
  ```python
  ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '192.168.0.108']
  ```

* `DEBUG` 模式, 默认是以 `IP` `0.0.0.0` 启动服务的， 但只要设置了 `ALLOWED_HOSTS`， 就只能通过`ALLOWED_HOSTS` 中的 `IP` 或 域名进行访问

* 开发阶段，开启 `DEBUG`, 线上环境必须关闭 `DEBUG` 模式


## 四、`ROOT_URLCONF` 设置 `urls` 匹配的入口文件
  ```python
  ROOT_URLCONF = 'mysite.urls'
  ```

## 五、初识视图函数
* 视图函数的第一个参数永远是 `HttpRequest` 对象
* 视图函数只能返回 `HttpResponseBase`的子类对象
  ```python
  from django.http import HttpResponse


  def index(request):
      return HttpResponse('cms首页')
  ```


## 六、`urls` 分层模块化

* 每个独立的模块对应 `Django` 的一个 `app`

* 创建两个 `app` : `front` 和 `cms`

  ```shell
  # 创建前台模块
  python manange.py startapp front

  # 创建后台cms模块
  python manange.py startapp cms
  ```



* 编写 `front/views.py`
  ```python
  # from django.shortcuts import render
  from django.http import HttpResponse

  # Create your views here.


  def index(request):
      return HttpResponse('前台首页')

  ```

* 编写 `cms/views.py`
  ```python
  # from django.shortcuts import render
  from django.http import HttpResponse

  # Create your views here.


  def index(request):
      return HttpResponse('cms首页')

  ```

* 创建 `front/urls.py`
  ```python
  from django.urls import path
  from . import views

  app_name = 'front'

  urlpatterns = [
      path('', views.index, name='index')
  ]
  ```

* 创建 `cms/urls.py`
  ```python
  from django.urls import path
  from . import views

  app_name = 'cms'

  urlpatterns = [
      path('', views.index, name='index')
  ]
  ```

* 编写 `mysite/urls.py`
  ```python
  from django.contrib import admin
  from django.urls import path, include

  urlpatterns = [
      path('admin/', admin.site.urls),
      path('', include('front.urls')),
      path('cms/', include('cms.urls')),
  ]
  ```

* 启动项目
  ```shell
  python manange.py runserver
  ```

* 访问 `front` 应用： `http://127.0.0.1:8000` 

* 访问 `cms` 应用： `http://127.0.0.1:8000/cms/`  
  

## 七、`url`中的参数传递
* 通过 `path` 传递
  * 编写视图函数 `front/views.py`
    ```python
    def detail(request, article_id):
    return HttpResponse('当前文章id: %s' % article_id)
    ```
  * 编写urls `front/urls.py`
    ```python
    path('detail/<article_id>', views.detail, name='detail'),
    ```

  * 访问方式： `http://localhost:8000/detail/1`

* 通过 查询字符串 传递
  * 编写视图函数 `front/views.py`
    ```python
    def article_list(request):
      author = request.GET.get('author')
      return HttpResponse('%s 相关的文章' % author)
    ```
  * 编写urls `front/urls.py`
    ```python
    path('list/', views.article_list, name='list'),
    ```

  * 访问方式： `http://localhost:8000/list/?author=%E6%9D%8E%E7%99%BD`

## 八、 内置的 `path` 转换器

* `int` 类型：
  * 实现原理如下
    ```python
    class IntConverter:
      regex = '[0-9]+'

      def to_python(self, value):
          return int(value)

      def to_url(self, value):
          return str(value)
    ```
  * 改写 `front/urls.py`
    ```python
    path('detail/<int:article_id>', views.detail, name='detail'),
    ```

  * 改写  `front/views.py`
    ```python
    def detail(request, article_id):
    print(type(article_id))
    return HttpResponse('当前文章id: %s' % article_id)
    ```
  
  * 访问： **http://localhost:8000/detail/1**

  * 控制台输出 `<class 'int'>`

* `str` 类型， 默认不指定类型，就是 `str` 类型
  * 原理：
    ```python
    class StringConverter:
    regex = '[^/]+'

    def to_python(self, value):
        return value

    def to_url(self, value):
        return value

    ```
  
* `uuid` 类型，通用唯一识别码
  * 原理：
    ```python
    class UUIDConverter:
    regex = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'

    def to_python(self, value):
        return uuid.UUID(value)

    def to_url(self, value):
        return str(value)
    ```
  
  * 生成一个`uuid` 如： `b8f12562-7006-4e21-9aeb-c3426d9dcbd3`
    ```shell
    python

    import uuid

    uuid.uuid4()
    ```

  * 改写 `front/urls.py`
    ```python
    path('detail/<uuid:article_id>', views.detail, name='detail'),
    ```
  
  * 访问： `http://localhost:8000/detail/b8f12562-7006-4e21-9aeb-c3426d9dcbd3`

* `slug` 类型
  * 原理：
    ```python
      regex = '[-a-zA-Z0-9_]+'
    ```

* `path` 类型
  * 原理：
    ```python
      regex = '.+'
    ```

## 九、自定义 `path` 转换器
**这里，我们实现一个规则为： python+django+flask 的 `url` 参数， `python` 代码接收到的是通过 `+` 拆分后的列表, 转换器接收的参数也必须是一个列表； 比较抽象，还是看代码吧！**

* 创建 `front/converters.py`
  ```python
  from django.urls import register_converter


  class CateConverter:
      regex = r'\w+|(\w+\+\w+)+'

      def to_python(self, value):
          return value.split('+')

      def to_url(self, value):
          if isinstance(value, list):
              return '+'.join(value)
          else:
              raise RuntimeError('分类参数必须为 list 类型')


  # 注册 path 转换器
  register_converter(CateConverter, 'cate')
  ```

* 修改 `front/__init__.py`
  ```python
    # 运行我们自定义的转换器
    from . import converters
  ```

* 修改 `front/urls.py`
  ```python
    path('category/<cate:category>/', views.index_category, name='category'),
  ```

* 修改 `front/views.py`
  ```python
  def index_category(request, category):
    pathname = reverse('front:category', kwargs={'category': category})
    return HttpResponse('分类列表为： %s, url 的 pathname 部分为： %s' % (category, pathname))
  ```
* 访问： `http://localhost:8000/category/python+django/`, 浏览器显示如下：

  `分类列表为： ['python', 'django'], url 的 pathname 部分为： /category/python+django/`

## 十、重定向 与 `url` 命名反转
> 通过模拟 `cms` 后台登录进行讲解

* 修改 `cms/urls.py`
  ```python
    path('login/', views.login, name='login'),
  ```

* 修改 `cms/views.py`
  ```python
  # from django.shortcuts import render
  from django.http import HttpResponse
  from django.shortcuts import redirect, reverse

  # Create your views here.


  def index(request):
      username = request.GET.get('username')
      if username:
          return HttpResponse('cms首页')
      else:
          # 重定向登录页面
          return redirect(reverse('cms:login'))  # url 命名反转


  def login(request):
      return HttpResponse('登录页面')

  ```

* 访问： `http://localhost:8000/cms/` 会自动跳转到登录页面

* 访问： `http://localhost:8000/cms/?username=zhb33` 才能访问 `cms` 后台首页

* `url` 命名反转时的参数传递
  > 如果反转时，`url` 需要接收参数， 可通过关键字参数传递， 如果传递的查询字符串， 需要手动进行拼接

  * 修改 `cms/urls.py`
  ```python
  path('login/<location>', views.login, name='login'),
  ```

  * 修改 `cms/views.py`
  ```python
  def index(request):
    username = request.GET.get('username')
    if username:
        return HttpResponse('cms首页')
    else:
        # 重定向登录页面
        login_url = reverse('cms:login', kwargs={'location': '深圳'})  # url传参
        login_url += '?next=/'  # 查询字符串
        return redirect(login_url)  # url 命名反转


  def login(request, location):
      return HttpResponse('登录页面, 登录地点是 %s' % location)
  ```

  *  `http://localhost:8000/cms/` 跳转到 `http://localhost:8000/cms/login/深圳?next=/`


## 十一、 `urls`的 应用命名空间 与 实例命名空间

* 应用命名空间
  * 可以在每个应用的 `urls.py` 通过 `app_name` 进行设置 (一般使用这种方式设置)
    ```python
    app_name = 'cms'
    ```
  
  * 也可以在 `ROOT_URLCONF` 指定的 `urls.py` 中使用 `include` 时进行设置(不常用)
    ```python
    # mysite/urls.py
    path('cms/', include(('cms.urls', 'cms'))),  # 引入 cms 模块的 urls.py 并设置应用命名空间 为 cms
    ```
  * 作用： 如上面的 `url` 命名反转时 `reverse('cms:login')`, 可以防止与其它应用的 `url` 命名冲突

* 实例命名空间
  * 在通过 `include` 引用时，进行设置
    ```python
    # 设置实例命名空间
    path('cms/', include('cms.urls', namespace='cms')),

    # 同时设置 应用命名空间 和 实例命名空间
    path('cms/', include(('cms.urls', 'cms'), namespace='cms')),
    ```
  * 作用： 当多个不同 `url` 指向同一个应用时， 防止 `url` 冲突

    **不使用实例命名空间的情况**

    * 修改`mysite/urls.py`
      ```python
      path('cms1/', include('cms.urls')),  # 不同的 url 指向同一个 应用
      path('cms2/', include('cms.urls')),
      ```

    * 访问 `http://localhost:8000/cms1/` 跳转到 `http://localhost:8000/cms1/login/深圳?next=/`  
    * 访问 `http://localhost:8000/cms2/` 也跳转到 `http://localhost:8000/cms1/login/深圳?next=/`  

    **冲突了吧！**

    **使用实例命名空间**

    * 修改`mysite/urls.py`
      ```python
      path('cms1/', include('cms.urls', namespace='cms1')),
      path('cms2/', include('cms.urls', namespace='cms2')),
      ```
    * 修改`mysite/views.py`
      ```python
      def index(request):
      username = request.GET.get('username')
      if username:
          return HttpResponse('cms首页')
      else:
          # 重定向登录页面
          current_namespace = request.resolver_match.namespace
          login_url = reverse('%s:login' % current_namespace, kwargs={'location': '深圳'})  # url传参
          login_url += '?next=/'  # 查询字符串
          return redirect(login_url)  # url 命名反转
      ```

    * 访问 `http://localhost:8000/cms1/` 跳转到 `http://localhost:8000/cms1/login/深圳?next=/`  
    * 访问 `http://localhost:8000/cms2/` 跳转到 `http://localhost:8000/cms2/login/深圳?next=/`


## 十二、 `re_path` 函数
  > 通过正则进行匹配参数

  **匹配生日**

* 修改 `front/urls.py`
  ```python
  from django.urls import path, re_path
  from . import views

  app_name = 'front'

  urlpatterns = [
      path('', views.index, name='index'),
      # ?P<birthday> 表示参数为 birthday 匹配 \d{4}-\d{2}-\d{2}
      re_path(r'^birthday/(?P<birthday>\d{4}-\d{2}-\d{2})/$', views.index_birthday, name='birthday')
  ]
  ```
* 修改 `front/views.py`
  ```python
  def index_birthday(request, birthday):
    return HttpResponse('生日快乐 %s' % birthday)
  ```

* 访问： `http://localhost:8000/birthday/1992-12-28/`

* 能用 `path` 解决的问题， 尽量不要用 `re_path` 因为 `re_path` 可读性差


## 十三、默认参数
**要实现默认参数，需要两条 `url` 的配合**

* 修改 `front/urls.py`
  ```python
  from django.urls import path, re_path
  from . import views

  app_name = 'front'

  urlpatterns = [
      path('', views.index_list, name='index'),
      path('list/<int:category_id>', views.index_list, name='list'),
  ]
  ```

* 修改 `front/views.py`
  ```python
  from django.http import HttpResponse


  category = ['python', 'django', 'flask']


  def index_list(request, category_id=0):
      return HttpResponse(category[category_id])

  ```

* 访问： `http://localhost:8000`, 显示:  
  `python`

* 访问： `http://localhost:8000/list/2`, 显示：  
  `flask`



<Valine></Valine>
