### 只能输入数字

```vue
<a-input-number v-model="number" :min="1" :precision="0" :parser="value => value.replace(/[^\d]/g, '')" :formatter="value => value.replace(/[^\d]/g, '')" />
```



### 级联菜单

```vue
<a-cascader v-model="cityCascader" :options="cascaderOptions" :field-names="{ label: 'name', value: 'code', children: 'children' }" allow-clear :change-on-select="true" placeholder="请选择" style="width: 200px" />
```

```js
// 处理城市选择变化
handleCityChange(value, selectedOptions) {
  if (value && value.length > 0) {
    // 获取最后一级的值
    const lastValue = value[value.length - 1];
    this.form.setFieldsValue({
      city: lastValue
    });
  }
}
```

