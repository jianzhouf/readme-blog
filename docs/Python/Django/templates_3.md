---
title: Django 自定义模板过滤器
lang: zh
meta:
  - name: description
    content: Django - 自定义模板过滤器
  - name: keywords
    content: Django - 自定义模板过滤器
---
# `DTL` 自定义模板过滤器
  > 接着 [内置模板过滤器](https://zhb333.github.io/readme-blog/Python/Django/templates_2.html '模板标签详解') 往下讲

## 一、模板过滤器的定义

* 在应用的目录下，如 `front` 下， 新建一个名为： `templatetags` 的 `python` 包

* 新建 `front/templatetags/custom_filter.py`, 并定义两个模板过滤器如下： 

  ```py
  from django import template

  register = template.Library()


  def my_add(value, arg):
      try:
          return value + arg
      except (Exception,):
          return ''


  def my_upper(value):
      try:
          return value.upper()
      except (Exception,):
          return value


  register.filter('my_add', my_add)
  register.filter('my_upper', my_upper)
  ```

* 需要使用 `{% load custom_filter %}`, 把应用下定义模板过滤器的文件导入模板

* `templates/index.html` 代码修改如下：
  ```html
  {% load custom_filter %}
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
  </head>
  <body>
  {#abcdef#}
  {{ "abc"|my_add:"def" }} <br>
  {#HELLO#}
  {{ "hello"|my_upper }}
  </body>
  </html>
  ```

* **注意，`front` 应用必须在 `mysite/settings.py` 进行注册，在 `front` 下定义的模板过滤器才能起作用*

  ```py
  INSTALLED_APPS = [
      'front',
  ]
  ```

## 二、实战--自定义时间计算过滤器

`front/templatetags/custom_filter.py`

```py
from django import template
from datetime import datetime

register = template.Library()


@register.filter
def time_since(value):
    """
    time距离现在的时间间隔
    1 如果时间间隔小于1分钟，那么显示 刚刚
    2 如果时间间隔大于1分钟小于1小时， 那么显示 xx 分钟前
    3 如果是大于1小时小于24小时，那么显示 xx 小时前
    4 如果大于24小时，小于30天， 那么显示 xx 天前
    5 否则显示具体时间， 2018/12/10 23:05
    """
    if not isinstance(value, datetime):
        return value
    now = datetime.now()
    timestamp = (now - value).total_seconds()
    if timestamp < 60:
        return '刚刚'
    elif 60 <= timestamp < 60 * 60:
        minutes = int(timestamp/60)
        return '%s分钟前' % minutes
    elif 60 * 60 <= timestamp < 60 * 60 * 24:
        hour = int(timestamp / (60 * 60))
        return '%s 小时前' % hour
    elif 60 * 60 * 24 <= timestamp < 60 * 60 * 24 * 30:
        days = int(timestamp / (60 * 60 * 24))
        return '%s 天前' % days
    else:
        return value.strftime("%Y/%m/%d %H:%M")
```


`front/views.py`

```py
from django.shortcuts import render
from datetime import datetime


def index(request):
    context = {
        'my_time_1': datetime.now(),
        'my_time_2': datetime(year=2018, month=12, day=10, hour=23, minute=18),
        'my_time_3': datetime(year=2018, month=12, day=10, hour=18, minute=18),
        'my_time_4': datetime(year=2018, month=12, day=1, hour=22, minute=18),
        'my_time_5': datetime(year=2017, month=12, day=10, hour=23, minute=18),
    }
    return render(request, 'index.html', context=context)
```

`templates/index.html`
```py
{% load custom_filter %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{#刚刚 #}
{{ my_time_1|time_since }} <br>
{#7分钟前 #}
{{ my_time_2|time_since }} <br>
{#5 小时前 #}
{{ my_time_3|time_since }} <br>
{#9 天前 #}
{{ my_time_4|time_since }} <br>
{#2017/12/10 23:18#}
{{ my_time_5|time_since }}
</body>
</html>
```



<Valine></Valine>
