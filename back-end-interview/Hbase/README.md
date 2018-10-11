## Hbase
### Hbase介绍
#### 列族式存储
- Hbase Table的组成
  - Table = RowKey + Family + Column + Timestamp + Value
- 数据存储模式
  - (Table， RowKey, Family, Column, Timestamp) -> Value
- 数据存储原型
  SortedMap<RowKey, List<SortedMap<Column, List<Value, Timestamp>>>>