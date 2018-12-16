---
title: Django 模板标签详解
lang: zh
meta:
  - name: description
    content: Django - 模板标签详解
  - name: keywords
    content: Django - 模板标签详解
---
# `DTL` 模板标签详解
> 接着上一篇 [urls与视图详解](https://zhb333.github.io/readme-blog/Python/Django/urls.html "urls与视图详解") 继续往下讲

## 一、模板查找路径

`mysite/setting.py`： 模板查找的优先级最高为如下配置

```py
TEMPLATES = [
    {
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
    },
]
```

其次是，在各自的 `app` 中， 注意， 需要在 `INSTALLED_APPS` 中注册后才能起作用：
```py
INSTALLED_APPS = [
    'front',
]

TEMPLATES = [
    {
        'APP_DIRS': True,
    },
]
```

最后如果在当前 `app` 中还找不到模板，会到其它已安装的 `app` 中查找， 如果还找不到就会报错了！

##  二、`render_to_string`

* 在根目录新建 `templates` 文件夹

* 创建 `templates/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body {
            color: #f00;
        }
    </style>
</head>
<body>
佛曰： 我执， 是痛苦的根源！
</body>
</html>
```

* 修改 `front/urls.py`

```py
 path('', views.index, name='index'),
```

* 修改 `front/views.py`
```py
from django.template.loader import render_to_string
from django.http import HttpResponse


def index(request):
    # 在 mysite/settings.py 配置了项目模板路径
    html = render_to_string("index.html")
    return HttpResponse(html)
```

## 三、`render`
> `render_to_string` 与 `HttpResponse` 组合的快捷方式， 可 `pycharm` 查看 `render` 的实现如下：

```py
def render(request, template_name, context=None, content_type=None, status=None, using=None):
    content = loader.render_to_string(template_name, context, request, using=using)
    return HttpResponse(content, content_type, status)
```

修改 `front/views.py`
```py
from django.shortcuts import render


def index(request):
    return render(request, 'index.html')
```


## 四、模板变量
> 可以通过`render` 函数的 `context` 参数，给模板传递数据

**模板中，不支持中括号语法，只能通过 `.` 语法获取**

* 传递字符串

    修改 `front/views.py`
    ```py
    def index(request):
        context = {'username': 'zhb333'}
        return render(request, 'index.html', context=context)
    ```

    修改 `templates/index.html`
    ```html
    <body>
    {{ username }}
    </body>
    ```

    访问：`http://localhost:8000/`, 页面显示： **zhb333**

* 传递一个对象  

    修改 `front/views.py`
    ```py
    class Person:
    def __init__(self, username):
        self.username = username


    def index(request):
        context = {'person': Person('理想三旬')}
        return render(request, 'index.html', context=context)
    ```

    修改 `templates/index.html`
    ```html
    {{ person.username }}
    ```

* 传递的数据是一个字典时， 字典中不要出现关键字，这样会造成歧义  

    修改 `front/views.py`
    ```py
    def index(request):
        context = {'person': {'username': '我要你'}}
        return render(request, 'index.html', context=context)
    ```

    修改 `templates/index.html`  

    ```html
    {{ person.keys }}
    ```

    浏览器显示： **dict_keys(['username'])**  

    修改 `front/views.py`
    ```py
    def index(request):
        context = {'person': {'username': '我要你', 'keys': '夜空中最亮的星'}}
        return render(request, 'index.html', context=context)
    ```

    浏览器显示： **夜空中最亮的星**

* 传递列表或元组

    修改 `front/views.py`
    ```py
    # context = {'persons': ['那些花儿', '她们都老了吧', '她们在哪里呀']}
    context = {'persons': ('那些花儿', '她们都老了吧', '她们在哪里呀')}
    ```

    修改 `templates/index.html`  

    ```html
    {{ persons.0 }} <br>
    {{ persons.1 }} <br>
    {{ persons.2 }} <br>
    ```  

## 五 常用的模板标签

**所有标签都需要用 `{%%}` 进行包裹**

* `if` 标签
    > `if` 标签中可以使用： `==`、`!=`、`<`、`<=`、`>`、`>=`、`in`、`not in`、`is`、`is not` 等判断运算符  
    * `if...else` 运算符举例  

        修改 `templates/index.html`    

        ```html
        {% if '那些花儿' in persons %}
            <p style="color: hotpink">可爱的花儿</p>
        {% else %}
            <p style="color: darkgray">可伶的花儿</p>
        {% endif %}
        ``` 

    * `if...elif...else` 举例
     修改 `templates/index.html`
        ```py
        {% if age < 18 %}
            <p>乳臭未干的小子</p>
        {% elif age == 18 %}
            <p>恰逢少年时</p>
        {% else %}
            <p>老男人</p>
        {% endif %}
        ```

* `for...in` 循环列表



    * 循环列表

        修改 `front/views.py` 
        ```py
        context = {
                'books': ['深入理解ES6', 'JavaScript权威指南', 'JavaScript语言精粹']
            }
        ```

        修改 `templates/index.html`  

        ```html
        <ul>
            {% for book in books %}
                <li>{{ book }}</li>
            {% endfor %}
        </ul>
        ```  

    * 反向循环列表  `reversed`

        修改 `templates/index.html`  

        ```html
        {% for book in books reversed %}
            <li>{{ book }}</li>
        {% endfor %}
        ```  
* `for...in` 循环中， `DTL` 提供了一些可用的模板变量：  

    * 列表的下标 `forloop.counter` 从 `1` 开始

        修改 `templates/index.html`  

        ```html
        {% for book in books %}
            <li>{{ forloop.counter }} -- {{ book }}</li>
        {% endfor %}
        ```   

    * 列表的下标 `forloop.counter0` 从 `0` 开始

        修改 `templates/index.html`  

        ```html
        {% for book in books %}
            <li>{{ forloop.counter0 }} -- {{ book }}</li>
        {% endfor %}
        ``` 
    * 列表的反向下标 `forloop.revcounter` 从 `1` 开始
        ```html
        {% for book in books reversed %}
            <li>{{ forloop.revcounter }} -- {{ book }}</li>
        {% endfor %}
        ```
    
    * 列表的反向下标 `forloop.revcounter0` 从 `0` 开始
        ```html
        {% for book in books reversed %}
            <li>{{ forloop.revcounter0 }} -- {{ book }}</li>
        {% endfor %}
        ```

    * 是否是第一次遍历 `forloop.first`
        ```html
        {% for book in books %}
            {% if forloop.first %}
                <li style="color: green;">{{ forloop.revcounter0 }} -- {{ book }}</li>
            {% else %}
                <li style="color: red;">{{ forloop.revcounter0 }} -- {{ book }}</li>
            {% endif %}
        {% endfor %}
        ```
    
    * 是否是最后一次次遍历 `forloop.last`
        ```html
        {% for book in books %}
            {% if forloop.last %}
                <li style="color: green;">{{ forloop.revcounter0 }} -- {{ book }}</li>
            {% else %}
                <li style="color: red;">{{ forloop.revcounter0 }} -- {{ book }}</li>
            {% endif %}
        {% endfor %}
        ```
    * 调用上一级循环的 `forloop` 模板变量  `forloop.parentloop`  
        修改 `front/views.py` 
        ```py
        context = {
            'family': [{'father': '大头爸爸', 'children': ['小头孩儿', '小头女儿']}]
        }
        ```

         修改 `templates/index.html`  

        ```html
        {% for who in family %}
            <p>this is <strong style="color: green">{{ who.father }}</strong></p>
            {% for child in who.children %}
                <p>{{ child }}</p>
                <p>{{ forloop.parentloop.first }}</p>
                <p>{{ forloop.parentloop.last }}</p>
                <p>{{ forloop.parentloop.counter }}</p>
                <p>{{ forloop.parentloop.revcounter }}</p>
            {% endfor %}
        {% endfor %}
        ``` 
* `for...in` 循环字典  

    * 循环字典 `keys`
        修改 `front/views.py` 
        ```py
           context = {'student': {
                'name': '道明寺',
                'girl': '杉菜',
                'age': '18',
            }}
        ```

        修改 `templates/index.html`  

        ```html
        <ul>
            {% for key in student.keys %}
                <li>{{ key }}</li>
            {% endfor %}
        </ul>
        ```      
        
    * 循环字典 `values`    

        修改 `templates/index.html`  

        ```html
        {% for value in student.values %}
            <li>{{ value }}</li>
        {% endfor %}
        ```   

    * 循环字典 `items`    

        修改 `templates/index.html`  

        ```html
        {% for key,value in student.items %}
            <li>{{ key }}--{{ value }}</li>
        {% endfor %}
        ```   
    
* `for...in...empty...`  

    修改 `front/views.py` 
    ```py
    context = {
    'comments': []
    }
    ```

    修改 `templates/index.html`  

    ```html
    {% for comment in comments %}
        {{ comment }}
    {% empty %}
        还没有任何评论
    {% endfor %}
    ```   

* `with` 标签 （在模板中定义变量）

    **通过 `with` 标签定义的变量只能在， 只能在 `with` 标签包裹的语句块中使用**

    修改 `front/views.py` 
    ```py
    context = {
        'students': ['孙悟空', '猪八戒', '沙和尚']
    }
    ```

    修改 `templates/index.html`  

    ```html
    {% with students.0 as monkey %}
        {{ monkey }}
    {% endwith %}

    {% with pig=students.1 %}
        {{ pig }}
    {% endwith %}
    ```   

* `url` 标签

    **通过 `url` 标签 可以把 `urls.py` 中， 对应的 `path` 或 `re_path` 的命名，转换化为浏览器可识别的链接**

    修改 `front/urls.py`
    ```py
    from django.urls import path
    from . import views

    app_name = 'front'

    urlpatterns = [
        path('', views.index, name='index'),
        path('book/<book_id>/', views.book, name='book'),
        path('movie/', views.movie, name='movie'),
        path('story/<story_id>/<category>/', views.story, name='story'),
    ]
    ```

    修改 `front/views.py`
    ```py  
    from django.http import HttpResponse
    from django.template.loader import render_to_string


    def index(request):
        return HttpResponse(render_to_string('index.html'))


    def book(request, book_id):
        return HttpResponse('书籍, %s' % book_id)


    def movie(request):
        movie_id = request.GET.get('movie_id')
        return HttpResponse('电影, %s' % movie_id)


    def story(request, story_id, category):
        _type = request.GET.get('type')
        return HttpResponse('故事id: %s, 分类： %s, 类型： %s' % (story_id, category, _type))

    ```

    修改 `templates/index.html`  

    ```html
    <p><a href="{% url 'front:index' %}">首页</a></p>
    <p><a href="{% url 'front:book' book_id=1 %}">书籍</a></p>
    <p><a href="{% url 'front:movie' %}?movie_id=2">电影</a></p>
    <p><a href="{% url 'front:story' story_id=3 category='冒险' %}?type=未知">故事</a></p>
    ``` 

* `spaceless` 标签 （去除html代码中的空白字符）

    **下面的 `html` 模板代码存在很多空白字符，可以通过 `spaceless` 标签去除**
    ```html
    {% spaceless %}
        <ul>
            <li>
                <a href="https://www.baidu.com">
                    百度
                </a>
            </li>
        </ul>
    {% endspaceless %}
    ```  

* `autoescape`标签 （默认开启了特殊字符自动转义）

    **可以通过设置 `autoescape` 标签的自动转义 为 `off`, 关闭自动转义**
    修改 `front/urls.py`
    ```py
    urlpatterns = [
        path('', views.index, name='index'),
    ]
    ```

    修改 `front/views.py`

    ```py
    from django.shortcuts import render


    def index(request):
        return render(request, 'index.html', context={'link': '<p><a href="http://www.baidu.com">百度</a></p>'})
    ```  
    
    修改 `templates/index.html`
    ```html
    <body>
    {{ link }}
    {% autoescape off %}
        {{ link }}
    {% endautoescape %}
    </body>
    ```

* `verbatim` 标签  
 **当不想要`DTL`编译 {{}} 或 {%%} 时， 可以通过 `verbatim` 标签包裹**

    ```html
    {% verbatim %}
        {{ 哈哈 }}
        {% 呵呵 %}
    {% endverbatim %}
    ```




<Valine></Valine>
