## 数据库
### 数据库查询中的各种连接类型
| 连接类型 | 定义 | 例子 | 
| - | :-: | -: | 
|内连接 | 只连接匹配的行 | select A.c1,B.c2 from A join B on A.c3 = B.c3; | 
| 左外连接 | 包含左边表的全部行(不管右边的表中是否存在与它们匹配的行)以及右边表中全部匹配的行 | select A.c1,B.c2 from A left join B on A.c3 = B.c3; | 
| 右外连接 | 	包含右边表的全部行（不管左边的表中是否存在与它们匹配的行）以及左边表中全部匹配的行 | select A.c1,B.c2 from A right join B on A.c3 = B.c3; |
| 全外连接 | 包含左、右两个表的全部行，不管在另一边的表中是否存在与它们匹配的行 | select A.c1,B.c2 from A full join B on A.c3 = B.c3; |
| θ连接 | 使用等值以外的条件来匹配左、右两个表中的行 | select A.c1,B.c2 from A join B on A.c3 != B.c3; |
| 交叉连接 | 生成笛卡尔积——它不使用任何匹配或者选取条件，而是直接将一个数据源中的每个行与另一个数据源的每个行一一匹配 | select A.c1,B.c2 from A,B; |

DML、DDL、DCL区别 .

总体解释：

DML(data manipulation language)：

它们是SELECT、UPDATE、INSERT、DELETE，就象它的名字一样，这4条命令是用来对数据库里的数据进行操作的语言

DDL(data definition language)：

DDL比DML要多，主要的命令有CREATE、ALTER、DROP等，DDL主要是用在定义或改变表(TABLE)的结构，数据类型，表之间的链接和约束等初始化工作上，他们大多在建立表时使用

DCL(Data Control Language)：

是数据库控制功能。是用来设置或更改数据库用户或角色权限的语句，包括(grant,deny,revoke等)语句。在默认状态下，只有sysadmin,dbcreator,db_owner或db_securityadmin等人员才有权力执行DCL
