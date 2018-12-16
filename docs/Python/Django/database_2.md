---
title: Django 创建和映射ORM模型到数据库
lang: zh
meta:
  - name: description
    content: Django - Django 创建和映射ORM模型到数据库
  - name: keywords
    content: Django - Django 创建和映射ORM模型到数据库
---
# 创建和映射`ORM`模型到数据库

## 1、新建应用 `book`
```bash
python manage.py startapp book
```

## 2、配置 `book` 为已安装应用 

`book_manager/settings.py`
```py
INSTALLED_APPS = [
    'book',
]
```

## 3、创建模型

`book/models.py`
```py
from django.db import models

# Create your models here.


class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, null=False)
    author = models.CharField(max_length=100, null=False)
    price = models.FloatField(default=0)
```

## 4、生成数据库迁移文件

```bash
python manage.py makemigrations
```

## 5、将已安装的应用的迁移文件映射到数据库
```bash
python manage.py migrate
```

**注意：**

1. 如果在模型中不指定表名，默认是以 应用名_模型名（小写）如：`book_book` 作为表名

2. 模型中默认以 `id` 作为主键，因此在模型中可以省略主键的定义即：  

    `book/models.py`
    ```py
    class Book(models.Model):
        title = models.CharField(max_length=100, null=False)
        author = models.CharField(max_length=100, null=False)
        price = models.FloatField(default=0)
    ```


<Valine></Valine>
