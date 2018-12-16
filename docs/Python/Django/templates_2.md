---
title: Django 模板过滤器详解
lang: zh
meta:
  - name: description
    content: Django - 模板过滤器详解
  - name: keywords
    content: Django - 模板过滤器详解
---
# `DTL` 模板过滤器
  > 接着 [模板标签详解](https://zhb333.github.io/readme-blog/Python/Django/templates_1.html '模板标签详解') 往下讲

## `add`

* 原理： 

  ```py
  def add(value, arg):
    """Add the arg to the value"""
    try:
      return int(value) + int(arg)
    except (ValueError, TypeError):
      try:
        return value + arg
      except Exception:
        return ''
  ```

* 使用
  `front/views.py`  
  ```py
  def index(request):
    context = {
        "number": 1,
        "persons": ['baby', 'dear'],
        "girls": ['宝宝', '亲爱的']
    }
    return render(request, 'index.html', context=context)
  ```

  `templates/index.html`
  ```html
  {#数字相加#}
  {{ number|add:"2" }} <br>
  {#字符串拼接#}
  {{ number|add:'abc' }} <br>
  {#列表拼接#}
  {{ persons|add:girls }}
  ```

## `cut`
* 原理： 

  ```py
  def cut(vaule, arg):
    """Remove all values of arg from the given string"""
    safe = isinstance(value, SafeData)
    value = value.replace(arg, '')
    if safe and arg != ';':
      return mark_safe(value)
    return value
  ```

* 使用
  `templates/index.html`
  ```html
  {# 去除字符串中空格 #}
  {{ "This is ten percent luck, twenty percent skill"|cut:" " }}
  ```

## `date`
* 所有格式  
  | 格式字符 | 描述 | 示例输出 |
  | :------: | :------: | :------: |
  | a | 'a.m.' 或 'p.m.' （请注意，这与PHP输出略有不同，因为这包括与Associated Press样式匹配的句点。） | 'a.m.' |
  | A | 'AM' 或 'PM'。 | 'a.m.' |
  | b | 月，文字，3个字母，小写。 | 'jan' |
  | B | 未实现。 |  |
  | c | ISO 8601格式。 （注意：与其他格式化程序，如“Z”，“O”或“r”不同，如果值是一个天真的datetime（见 datetime.tzinfo），“c”格式化程序不会添加时区偏移。  | 2008-01-02T10:30:00.000123+02:00 或 2008-01-02T10:30:00.000123 （如果datetime是天真的） |
  | d |  月的日期，带前导零的2位数字。 | '01' 到 '31' |
  | D | 星期几，文字，3个字母。  | 'Fri' |
  | e | 时区名称。可以是任何格式，或可能返回一个空字符串，具体取决于datetime。  | ''，'GMT'，'-500'，'US/Eastern' 等。 |
  | E |  月，特定于语言环境的替代表示，通常用于长日期表示。 | 'listopada' （对于波兰语区域，而不是 'Listopad'） |
  | f | 时间，12小时小时和分钟，如果他们为零，分钟将关闭。专有扩展。| '1'，'1:30' |
  | F | 月，文字，长。 | 'January' |
  | g | 小时，12小时格式，不含前导零。 | '1' 到 '12' |
  | G | 小时，24小时格式，无前导零。 | '0' 到 '23' |
  | h | 小时，12小时格式。 | '01' 到 '12' |
  | H | 小时，24小时格式。 | '00' 到 '23' |
  | i | 分钟。 | '00' 到 '59' |
  | I | 夏令时，无论是否生效。 | '1' 或 '0' |
  | j | 没有前导零的月份日。 | '1' 到 '31' |
  | l | 星期几，文字，长。 | 'Friday' |
  | L | 是否为闰年的布尔值。 | True 或 False |
  | m | 月，2位数字，前导零。 | '01' 到 '12' |
  | M | 月，文字，3个字母。 | 'Jan' |
  | n | 没有前导零的月。 | '1' 到 '12' |
  | N | 月缩写在Associated Press风格。专有扩展。 | 'Jan.'，'Feb.'，'March'，'May' |
  | o | ISO-8601周编号年，对应于使用闰年的ISO-8601周编号（W）。更常见的年份格式见Y。 | '1999' |
  | O | 与格林威治时间的差值（以小时为单位）。 | '+0200' |
  | P | 时间，12小时制，分钟和’a.m。’/’p.m。’，如果它们为零，分钟将关闭，如果合适，分钟将保留特殊字符串’午夜’和’中午’。专 |有扩展。 '1 a.m.'，'1:30 p.m.'，'midnight'，'noon'，'12:30 p.m.' |
  | r | RFC 5322 格式的日期。 | 'Thu, 21 Dec 2000 16:01:07 +0200' |
  | s | 秒，带前导零的2位数。 | '00' 到 '59' |
  | S | 每月日期的英文序数后缀，2个字符。 | 'st'，'nd'，'rd' 或 'th' |
  | t | 指定月份的天数。 | 28 到 31 |
  | T | 本机的时区。 | 'EST'，'MDT' |
  | u | 微秒。 | 000000 到 999999 |
  | U | 自Unix时代以来的秒数（1970年1月1日00:00:00 UTC）。 |   |
  | w | 星期几，没有前导零的数字。 | '0' （星期日）至 '6' （星六） |
  | W | ISO-8601年的周数，周从星期一开始。 | 1，53 |
  | y | 年，2位数。 | '99' |
  | Y | 年，4位数。 | '1999' |
  | z | 一年中的一天。 | 0 到 365 |
  | Z | 时区偏移（以秒为单位）。 UTC之前的时区的偏移总是负的，并且对于UTC的东部的偏移总是正的。 | -43200 到 43200 

* 常用格式
  | 格式字符 | 描述 | 示例输出 |
  | :------: | :------: | :------: |
  | Y | 年，4位数。 | '1999' |
  | m | 月，2位数字，前导零。 | '01' 到 '12' |
  | n | 没有前导零的月。 | '1' 到 '12' |
  | d |  月的日期，带前导零的2位数字。 | '01' 到 '31' |
  | j | 没有前导零的月份日。 | '1' 到 '31' |
  | g | 小时，12小时格式，不含前导零。 | '1' 到 '12' |
  | h | 小时，12小时格式。 | '01' 到 '12' |
  | G | 小时，24小时格式，无前导零。 | '0' 到 '23' |
  | H | 小时，24小时格式。 | '00' 到 '23' |
  | i | 分钟。 | '00' 到 '59' |
  | s | 秒，带前导零的2位数。 | '00' 到 '59' |

`front/views.py`  
```py
from django.shortcuts import render
from datetime import datetime


def index(request):
    context = {
        "today": datetime.now()
    }
    return render(request, 'index.html', context=context)
```


`templates/index.html`
```html
{# 2018/12/09 #}
{{ today|date:"Y/m/d" }}
```

## `default`  

`front/views.py`  
```py
from django.shortcuts import render


def index(request):
    context = {
        'list': [],
        'dict': {},
        'str': '',
        'none': None,
        'number': 0,
    }
    return render(request, 'index.html', context=context)
```


`templates/index.html`
```html
{# 空列表 #}
{{ list|default:'空列表' }}
{#空字典#}
{{ dict|default:'空字典' }}
{#空字符串#}
{{ str|default:'空字符串' }}
{#数字0#}
{{ number|default:'数字0' }}
{#None#}
{{ none|default:'None' }}
```

## `default-if-none`

**只有值为`None`才会起作用**

`templates/index.html`
```html
{#[]#}
{{ list|default_if_none:'空字典' }}
{{ str|default_if_none:'空字符串' }}
{#0#}
{{ number|default_if_none:'数字0' }}
{#None#}
{{ none|default_if_none:'None' }}
```

## `first`
**返回列表或元组中的第一个元素**

`front/views.py`  
```py
from django.shortcuts import render


def index(request):
    context = {
        'student': ['威震天', '擎天柱']
    }
    return render(request, 'index.html', context=context)
```


`templates/index.html`
```html
{# 威震天 #}
{{ student|first }}
```

## `last`
**返回列表或元组中的最后一个元素**

`templates/index.html`
```html
{# 擎天柱 #}
{{ student|last }}
```

## `floatformat`

**四舍五入格式化浮点类型**

* 没有参数是，默认保留一位小数点

* 传递的参数代表小数点的位数

`templates/index.html`
```html
{#3.1#}
{{ 3.141592654|floatformat }} <br>
{#3.14159 #}
{{ 3.141592654|floatformat:5 }} <br>
```

## `join`

**指定分隔符把元组或者列表，转换为字符串**  

`templates/index.html`
```html
{#威震天-擎天柱#}
{{ student|join:'-' }}
```

## `length`

**返回元组、列表、字符串的长度**  
`templates/index.html`
```html
{#2#}
{{ student|length }}
```

## `lower`
**将字符串转换为小写**  
`templates/index.html`
```html
{#abc#}
{{ "ABC"|lower }}
```

## `upper`
**将字符串转换为大写**   
`templates/index.html`
```html
{#ABC#}
{{ "abc"|upper }}
```

## `random`

**返回元组、列表、字符串中随机选取一个值**  
`templates/index.html`
```html
{{ "abc"|random }}
```

## `safe`

**标记一个字符串是安全的，包含特殊字符，也不会被转义， 类似关闭`autoescape`标签的自动转义**
`templates/index.html`
```html
{{ "<h1>autoescape off</h1>"|safe }}
```

## `slice`

**类似于`python`的切片操作**

`front/views.py`  
```py
def index(request):
    context = {
        'data': list(range(10))
    }
    return render(request, 'index.html', context=context)
```


`templates/index.html`
```html
{#[1, 3, 5, 7, 9]#}
{{ data|slice:"1::2"}}
```  

## `striptags`

**去除字符串中的 `HTML` 标签**

`templates/index.html`
```html
{{ "<h1>去除字符串中的html标签</h1>"|striptags }}
```  


## `truncatechars`

**显示指定字符长度，超出部分显示..., 三个点也纳入指定字符范围的长度**

`templates/index.html`
```html
{#显示...#}
{{ "显示指定字符长度，超出部分显示..."|truncatechars:5 }}
```  

## `truncatechars_html`

**类似 `truncatechars`, 只不过不会切割 `HTML` 标签**
`templates/index.html`
```html
{{ "<h1>显示指定字符长度，超出部分显示...</h1>"|truncatechars_html:5 }}
```  


## 其它不常用过滤器

**可以在 `pycharm` 中， 查看源代码**

```py
from django.template import defaultfilters, defaulttags
# defaultfilters 查看内置过滤器
# defaulttags 查看内置标签
```


<Valine></Valine>
