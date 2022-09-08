markdown教程
=

## 1.使用 = 和 - 标记一级和二级标题
```markdown
我展示的是一级标题
=

我展示的是二级标题
-
```
我展示的是一级标题
=
我展示的是二级标题
-

## 2.使用 # 号标记
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 3.字体
```markdown
*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___
```
*斜体文本*

_斜体文本_

**粗体文本**

__粗体文本__

***粗斜体文本***

___粗斜体文本___

## 4.分隔线
### 你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：
```markdown
***

* * *

*****

- - -

----------
```
***
* * *
*****
- - -
----------

## 5.删除线
### 如果段落上的文字要添加删除线，只需要在文字的两端加上两个波浪线 ~~ 即可，实例如下：
```markdown
RUNOOB.COM
GOOGLE.COM
~~BAIDU.COM~~
```
RUNOOB.COM

GOOGLE.COM

~~BAIDU.COM~~

## 6.下划线
### 下划线可以通过 HTML 的 u 标签来实现：
```markdown
<u>带下划线文本</u>
```
<u>带下划线文本</u>

## 7.脚注
### 脚注是对文本的补充说明。
```markdown
[^要注明的文本]
```
创建脚注格式类似这样 [^RUNOOB]。

[^RUNOOB]: 菜鸟教程 -- 学的不仅是技术，更是梦想！！！

## 8.Markdown 列表
### Markdown 支持有序列表和无序列表。
### 无序列表使用星号(*)、加号(+)或是减号(-)作为列表标记，这些标记后面要添加一个空格，然后再填写内容：
```markdown
* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项


- 第一项
- 第二项
- 第三项
```
* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项


- 第一项
- 第二项
- 第三项

### 有序列表使用数字并加上 . 号来表示，如：
```markdown
1. 第一项
2. 第二项
3. 第三项
```
1. 第一项
2. 第二项
3. 第三项

### 列表嵌套
### 列表嵌套只需在子列表中的选项前面添加两个或四个空格即可：
```markdown
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
```
1. 第一项：
  - 第一项嵌套的第一个元素
  - 第一项嵌套的第二个元素
2. 第二项：
  - 第二项嵌套的第一个元素
  - 第二项嵌套的第二个元素

## 9.Markdown 区块
### Markdown 区块引用是在段落开头使用 > 符号 ，然后后面紧跟一个空格符号：
```markdown
> 区块引用
> 菜鸟教程
> 学的不仅是技术更是梦想
```
> 区块引用

> 菜鸟教程

> 学的不仅是技术更是梦想

### 另外区块是可以嵌套的，一个 > 符号是最外层，两个 > 符号是第一层嵌套，以此类推：
```markdown
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
```
> 最外层
> > 第一层嵌套
> > > 第二层嵌套

### 区块中使用列表
```markdown
> 区块中使用列表
> 1. 第一项
> 2. 第二项
> + 第一项
> + 第二项
> + 第三项
```
> 区块中使用列表
> 1. 第一项
> 2. 第二项
> + 第一项
> + 第二项
> + 第三项

### 列表中使用区块
```markdown
* 第一项
    > 菜鸟教程
    > 学的不仅是技术更是梦想
* 第二项
```
* 第一项
  > 菜鸟教程
  > 
  > 学的不仅是技术更是梦想
* 第二项

## 10.Markdown 代码
### 如果是段落上的一个函数或片段的代码可以用反引号把它包起来（`），例如：
```markdown
`printf()` 函数
```
`printf()` 函数
### 可以用 ``` 包裹一段代码，并指定一种语言（也可以不指定）：
```markdown
  ```javascript
  $(document).ready(function () {
      alert('RUNOOB');
  });
  ```
```
  ```javascript
  $(document).ready(function () {
      alert('RUNOOB');
  });
  ```
## 11.Markdown 链接
### 链接使用方法如下：
```markdown
这是一个链接 [百度](https://www.baidu.com)
```
这是一个链接 [百度](https://www.baidu.com)
```markdown
<https://www.baidu.com>
```
<https://www.baidu.com>
### 高级链接
### 我们可以通过变量来设置一个链接，变量赋值在文档末尾进行：
```markdown
这个链接用 1 作为网址变量 [Google][1]
这个链接用 baidu 作为网址变量 [百度][baidu]
然后在文档的结尾为变量赋值（网址）

  [1]: http://www.google.com/
  [baidu]: http://www.baidu.com/
```
这个链接用 1 作为网址变量 [Google][1]

这个链接用 baidu 作为网址变量 [百度][baidu]

然后在文档的结尾为变量赋值（网址）

[1]: http://www.google.com/
[baidu]: http://www.baidu.com/

## 12.Markdown 图片
### Markdown 图片语法格式如下：
```markdown
![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png)

![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png "RUNOOB")
```
![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png)

![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png "RUNOOB")

### 当然，也可以像网址那样对图片网址使用变量:
```markdown
这个链接用 2 作为网址变量 [RUNOOB][2].
然后在文档的结尾为变量赋值（网址）

[2]: http://static.runoob.com/images/runoob-logo.png
```
这个链接用 2 作为网址变量 [RUNOOB][2].

然后在文档的结尾为变量赋值（网址）

[2]: http://static.runoob.com/images/runoob-logo.png

### Markdown 还没有办法指定图片的高度与宽度，如果你需要的话，你可以使用普通的 img 标签。
```markdown
<img src="http://static.runoob.com/images/runoob-logo.png" width="258px" height="39px">
```
<img src="http://static.runoob.com/images/runoob-logo.png" width="258px" height="39px">

## 12.Markdown 表格
### Markdown 制作表格使用 | 来分隔不同的单元格，使用 - 来分隔表头和其他行。
```markdown
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
### 我们可以设置表格的对齐方式：
> -: 设置内容和标题栏居右对齐
> :- 设置内容和标题栏居左对齐
> :-: 设置内容和标题栏居中对齐

```markdown
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格单元格单元格 | 单元格 | 单元格单元格 |
| 单元格 | 单元格单元格单元格 | 单元格单元格单元格 |
```
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格单元格单元格 | 单元格 | 单元格单元格 |
| 单元格 | 单元格单元格单元格 | 单元格单元格单元格 |

## 13.Markdown 高级技巧
### 支持的 HTML 元素
### 不在 Markdown 涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写。
### 目前支持的 HTML 元素有：kbd b i em sup sub br等 ，如：
```markdown
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
```
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑

### Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用转义字符，Markdown 使用反斜杠转义特殊字符：
```markdown
**文本加粗** 
\*\* 正常显示星号 \*\*
```
**文本加粗**

\*\* 正常显示星号 \*\*
### Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：
```markdown
\   反斜线
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```