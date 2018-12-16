---
title: Django ORM常用Field详解
lang: zh
meta:
  - name: description
    content: Django - Django ORM常用Field详解
  - name: keywords
    content: Django - Django ORM常用Field详解
---
# `ORM`常用`Field`详解

## 一、常用的`Field`

`book/models.py`

```py
class Fields(models.Model):

    # 映射到数据库中是int类型，可以有自动增长的特性。一般不需要使用这个类型，如果不指定主键，那么模型会自动的生成一个叫做id的自动增长的主键。
    # auto_id = models.AutoField()

    # 64位的整形，类似于AutoField，只不过是产生的数据的范围是从1-9223372036854775807
    id = models.BigAutoField(primary_key=True)

    # 在模型层面接收的是True / False。在数据库层面是tinyint类型 存储的是 0/1。如果没有指定默认值，默认值是None。
    removed = models.BooleanField()

    # 在数据库层面是varchar类型。在Python层面就是普通的字符串。这个类型在使用的时候必须要指定最大的长度，也即必须要传递max_length
    title = models.CharField(max_length=100)

    # 日期类型。在Python中是datetime.date类型，可以记录年月日。在映射到数据库中也是date类型。使用这个Field可以传递以下几个参数：
    #
    # auto_now：最后一次修改时间，可以将这个属性设置为True。
    # auto_now_add：新增时间，可以将这个属性设置为True。
    birth = models.DateField(auto_now_add=True)

    # 日期时间类型，类似于DateField。不仅仅可以存储日期，还可以存储时间。映射到数据库中是datetime类型。这个Field也可以使用auto_now和auto_now_add两个属性。
    created_time = models.DateTimeField(auto_now_add=True)

    # 时间类型。在数据库中是time类型。在Python中是datetime.time类型。
    lunch_time = models.TimeField()

    # 类似于CharField。在数据库底层也是一个varchar类型。最大长度是254个字符。并不验证邮箱格式，配合 ModelForm 使用时，才会与进行邮箱格式验证
    email = models.EmailField()

    # 用来存储文件的。这个请参考后面的文件上传章节部分。
    # file = models.FileField()

    # 用来存储图片文件的。这个请参考后面的图片上传章节部分。
    # image = models.ImageField()

    # 浮点类型。映射到数据库中是double类型。
    price = models.FloatField()

    # 整形。值的区间是-2147483648——2147483647
    age = models.IntegerField()

    # 大整形。值的区间是-9223372036854775808——9223372036854775807。
    total = models.BigIntegerField()

    # 正整形。值的区间是0——2147483647。
    money = models.PositiveIntegerField()

    # 小整形。值的区间是-32768——32767。
    apple = models.SmallIntegerField()

    # 小整形。值的区间是-32768——32767。
    pear = models.PositiveSmallIntegerField()

    # 小整形。值的区间是-32768——32767。
    content = models.TextField()

    # 只能存储uuid格式的字符串。uuid是一个32位的全球唯一的字符串，一般用来作为主键。
    uuid = models.UUIDField()

    # 类似于CharField，只不过只能用来存储url格式的字符串。并且默认的max_length是200。
    url = models.URLField()
```

## 二、注意事项：

* 已经将模型映射到数据库后，修改或新增表字段，如果没有提供默认值，在生成迁移文件时，会提供两个选项，让你添加默认值

  ```bash
  (myenv) E:\code\PythonEnvs\myenv\book_manager>python manage.py makemigrations
  You are trying to add a non-nullable field 'age' to fields without a default; we can't do that (the database nee
  ds something to populate existing rows).
  Please select a fix:
  1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
  2) Quit, and let me add a default in models.py
  ```

* 使用 `DateField`、 `DateTimeField` 的自动添加时间参数 `auto_now_add` 或 `auto_now`， 添加到数据库使用的是 `django.utils.timezone.now()` , 这是一个  `UTC` 时间， 为了在模板中正确显示当前时区的时间，需要配置正确时区  

  `book_manager/settings.py`
  ```py
  TIME_ZONE = 'Asia/Shanghai'
  ```
  -----------

  `book_manager/urls.py`

  ```py
  from django.urls import path, include

  urlpatterns = [
      path('', include('book.urls')),
  ]
  ```
  ---------

  `book/urls.py`

  ```py
  from django.urls import path
  from . import views

  app_name = 'book'

  urlpatterns = [
      path('', views.index, name='index')
  ]
  ```

  ---------

  `book/models.py`
  ```py
  class Book(models.Model):
      id = models.AutoField(primary_key=True)
      title = models.CharField(max_length=100, null=False)
      author = models.CharField(max_length=100, null=False)
      price = models.FloatField(default=0)
      create_time = models.DateTimeField(auto_now_add=True)
  ```
  -----

  `book/views.py`
  ```py
  from django.shortcuts import render
  from . import models

  def index(request):
      book = models.Book(title='精通ES6', author='zhb333', price=333)
      book.save()
      obj = models.Book.objects.get(pk=1)
      # UTC 时间
      return render(request, 'book/index.html', context={'create_time': obj.create_time})
  ```

  -------

  `book/templates/book/index.html`
  ```html
  {#正确配置时区，即便存储在数据库中的时间是UTC时间，模板中也会正确显示配置的时区所对应的时间#}
  {{ create_time }}
  ```


## 三、其它不常用的 `Field`

**可以在 `pycharm` 中按`ctrl` 并点击任一个 `Field`进入所有`Field`的定义文件查看**


<Valine></Valine>
