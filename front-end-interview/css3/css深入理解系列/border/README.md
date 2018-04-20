## border
### 为何border-width不支持百分比值？
    - 所谓边框不会因为设备尺寸改变而改变
    - 类似的还有outline, box-shadow, text-shadow
    - border-width还支持关键字:thin， medium, thick
      - thin 薄薄的 1px
      - medium 薄厚均匀 3px
      - thick 厚厚的 5px
#### 为何medium为3px
     - 因为border-style:double至少3px才有效果
### 了解各种border-style类型
    - solid  实线
    - dashed 虚线
    - dotted 点线
    - double 双线
    - inset 内凹
    - outset 外凹
### border-color与color
    - 当没有指定border-color的时候, 会使用color作为边框色
    - 类似的还有outline, box-shadow, text-shadow