# 权限系统接口文档


**简介**:权限系统接口文档


**HOST**:http://192.168.1.22:9108/securityb/services


**联系人**:开发团队


**Version**:1.0


**接口路径**:/securityb/services/v3/api-docs


[TOC]






# 用户模块


## 人员导入


**接口地址**:`/securityb/services/user/userImport`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|file||query|true|file||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 修改用户密码


**接口地址**:`/securityb/services/user/update_pwd`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>只允许修改本人创建的用户</p>



**请求示例**:


```javascript
{
  "id": "",
  "name": "",
  "tel": "",
  "mobile": "",
  "password": "",
  "sex": "",
  "birthday": "",
  "address": "",
  "email": "",
  "identifyCard": "",
  "icon": "",
  "deptId": "",
  "postId": "",
  "createdUserId": "",
  "createdTime": "",
  "updateUserId": "",
  "updateTime": "",
  "identify": "",
  "departmentList": [
    {
      "id": 0,
      "name": "",
      "parentId": 0,
      "code": "",
      "personNum": 0,
      "area": "",
      "leader": "",
      "children": [
        {
          "id": 0,
          "name": "",
          "parentId": 0,
          "code": "",
          "personNum": 0,
          "area": "",
          "leader": "",
          "children": [
            {}
          ]
        }
      ]
    }
  ],
  "postList": [
    {
      "id": 0,
      "deptId": 0,
      "name": ""
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|user|User|body|true|User|User|
|&emsp;&emsp;id|用户账号||false|string||
|&emsp;&emsp;name|用户名称||false|string||
|&emsp;&emsp;tel|固定电话||false|string||
|&emsp;&emsp;mobile|手机号||false|string||
|&emsp;&emsp;password|密码||false|string||
|&emsp;&emsp;sex|性别, 1:男 2:女||false|string||
|&emsp;&emsp;birthday|生日||false|string(date)||
|&emsp;&emsp;address|地址||false|string||
|&emsp;&emsp;email|邮箱||false|string||
|&emsp;&emsp;identifyCard|身份证||false|string||
|&emsp;&emsp;icon|用户头像||false|string||
|&emsp;&emsp;deptId|所属组织id||false|string||
|&emsp;&emsp;postId|所属岗位id||false|string||
|&emsp;&emsp;createdUserId|创建人||false|string||
|&emsp;&emsp;createdTime|创建时间||false|string(date-time)||
|&emsp;&emsp;updateUserId|修改人||false|string||
|&emsp;&emsp;updateTime|修改时间||false|string(date-time)||
|&emsp;&emsp;identify|新密码||false|string||
|&emsp;&emsp;departmentList|组织机构集合||false|array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名||false|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数||false|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区||false|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导||false|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门||false|array|Department|
|&emsp;&emsp;postList|岗位集合||false|array|Post|
|&emsp;&emsp;&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;deptId|组织id||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|岗位名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 修改用户本人密码


**接口地址**:`/securityb/services/user/update_mine_pwd`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>只允许本人修改密码</p>



**请求示例**:


```javascript
{
  "id": "",
  "name": "",
  "tel": "",
  "mobile": "",
  "password": "",
  "sex": "",
  "birthday": "",
  "address": "",
  "email": "",
  "identifyCard": "",
  "icon": "",
  "deptId": "",
  "postId": "",
  "createdUserId": "",
  "createdTime": "",
  "updateUserId": "",
  "updateTime": "",
  "identify": "",
  "departmentList": [
    {
      "id": 0,
      "name": "",
      "parentId": 0,
      "code": "",
      "personNum": 0,
      "area": "",
      "leader": "",
      "children": [
        {
          "id": 0,
          "name": "",
          "parentId": 0,
          "code": "",
          "personNum": 0,
          "area": "",
          "leader": "",
          "children": [
            {}
          ]
        }
      ]
    }
  ],
  "postList": [
    {
      "id": 0,
      "deptId": 0,
      "name": ""
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|user|User|body|true|User|User|
|&emsp;&emsp;id|用户账号||false|string||
|&emsp;&emsp;name|用户名称||false|string||
|&emsp;&emsp;tel|固定电话||false|string||
|&emsp;&emsp;mobile|手机号||false|string||
|&emsp;&emsp;password|密码||false|string||
|&emsp;&emsp;sex|性别, 1:男 2:女||false|string||
|&emsp;&emsp;birthday|生日||false|string(date)||
|&emsp;&emsp;address|地址||false|string||
|&emsp;&emsp;email|邮箱||false|string||
|&emsp;&emsp;identifyCard|身份证||false|string||
|&emsp;&emsp;icon|用户头像||false|string||
|&emsp;&emsp;deptId|所属组织id||false|string||
|&emsp;&emsp;postId|所属岗位id||false|string||
|&emsp;&emsp;createdUserId|创建人||false|string||
|&emsp;&emsp;createdTime|创建时间||false|string(date-time)||
|&emsp;&emsp;updateUserId|修改人||false|string||
|&emsp;&emsp;updateTime|修改时间||false|string(date-time)||
|&emsp;&emsp;identify|新密码||false|string||
|&emsp;&emsp;departmentList|组织机构集合||false|array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名||false|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数||false|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区||false|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导||false|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门||false|array|Department|
|&emsp;&emsp;postList|岗位集合||false|array|Post|
|&emsp;&emsp;&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;deptId|组织id||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|岗位名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 修改用户基础信息


**接口地址**:`/securityb/services/user/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>只修改用户基础信息,此接口不会修改密码,只允许修改本人创建的用户</p>



**请求示例**:


```javascript
{
  "id": "",
  "name": "",
  "tel": "",
  "mobile": "",
  "password": "",
  "sex": "",
  "birthday": "",
  "address": "",
  "email": "",
  "identifyCard": "",
  "icon": "",
  "deptId": "",
  "postId": "",
  "createdUserId": "",
  "createdTime": "",
  "updateUserId": "",
  "updateTime": "",
  "identify": "",
  "departmentList": [
    {
      "id": 0,
      "name": "",
      "parentId": 0,
      "code": "",
      "personNum": 0,
      "area": "",
      "leader": "",
      "children": [
        {
          "id": 0,
          "name": "",
          "parentId": 0,
          "code": "",
          "personNum": 0,
          "area": "",
          "leader": "",
          "children": [
            {}
          ]
        }
      ]
    }
  ],
  "postList": [
    {
      "id": 0,
      "deptId": 0,
      "name": ""
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|user|User|body|true|User|User|
|&emsp;&emsp;id|用户账号||false|string||
|&emsp;&emsp;name|用户名称||false|string||
|&emsp;&emsp;tel|固定电话||false|string||
|&emsp;&emsp;mobile|手机号||false|string||
|&emsp;&emsp;password|密码||false|string||
|&emsp;&emsp;sex|性别, 1:男 2:女||false|string||
|&emsp;&emsp;birthday|生日||false|string(date)||
|&emsp;&emsp;address|地址||false|string||
|&emsp;&emsp;email|邮箱||false|string||
|&emsp;&emsp;identifyCard|身份证||false|string||
|&emsp;&emsp;icon|用户头像||false|string||
|&emsp;&emsp;deptId|所属组织id||false|string||
|&emsp;&emsp;postId|所属岗位id||false|string||
|&emsp;&emsp;createdUserId|创建人||false|string||
|&emsp;&emsp;createdTime|创建时间||false|string(date-time)||
|&emsp;&emsp;updateUserId|修改人||false|string||
|&emsp;&emsp;updateTime|修改时间||false|string(date-time)||
|&emsp;&emsp;identify|新密码||false|string||
|&emsp;&emsp;departmentList|组织机构集合||false|array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名||false|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数||false|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区||false|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导||false|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门||false|array|Department|
|&emsp;&emsp;postList|岗位集合||false|array|Post|
|&emsp;&emsp;&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;deptId|组织id||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|岗位名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 添加用户


**接口地址**:`/securityb/services/user/save`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": "",
  "name": "",
  "tel": "",
  "mobile": "",
  "password": "",
  "sex": "",
  "birthday": "",
  "address": "",
  "email": "",
  "identifyCard": "",
  "icon": "",
  "deptId": "",
  "postId": "",
  "createdUserId": "",
  "createdTime": "",
  "updateUserId": "",
  "updateTime": "",
  "identify": "",
  "departmentList": [
    {
      "id": 0,
      "name": "",
      "parentId": 0,
      "code": "",
      "personNum": 0,
      "area": "",
      "leader": "",
      "children": [
        {
          "id": 0,
          "name": "",
          "parentId": 0,
          "code": "",
          "personNum": 0,
          "area": "",
          "leader": "",
          "children": [
            {}
          ]
        }
      ]
    }
  ],
  "postList": [
    {
      "id": 0,
      "deptId": 0,
      "name": ""
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|user|User|body|true|User|User|
|&emsp;&emsp;id|用户账号||false|string||
|&emsp;&emsp;name|用户名称||false|string||
|&emsp;&emsp;tel|固定电话||false|string||
|&emsp;&emsp;mobile|手机号||false|string||
|&emsp;&emsp;password|密码||false|string||
|&emsp;&emsp;sex|性别, 1:男 2:女||false|string||
|&emsp;&emsp;birthday|生日||false|string(date)||
|&emsp;&emsp;address|地址||false|string||
|&emsp;&emsp;email|邮箱||false|string||
|&emsp;&emsp;identifyCard|身份证||false|string||
|&emsp;&emsp;icon|用户头像||false|string||
|&emsp;&emsp;deptId|所属组织id||false|string||
|&emsp;&emsp;postId|所属岗位id||false|string||
|&emsp;&emsp;createdUserId|创建人||false|string||
|&emsp;&emsp;createdTime|创建时间||false|string(date-time)||
|&emsp;&emsp;updateUserId|修改人||false|string||
|&emsp;&emsp;updateTime|修改时间||false|string(date-time)||
|&emsp;&emsp;identify|新密码||false|string||
|&emsp;&emsp;departmentList|组织机构集合||false|array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名||false|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数||false|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区||false|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导||false|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门||false|array|Department|
|&emsp;&emsp;postList|岗位集合||false|array|Post|
|&emsp;&emsp;&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;deptId|组织id||false|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|岗位名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 人员导入-模板下载


**接口地址**:`/securityb/services/user/userTemplate`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK||


**响应参数**:


暂无


**响应示例**:
```javascript

```


## 用户解锁


**接口地址**:`/securityb/services/user/unlock`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|用户id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 用户保存角色


**接口地址**:`/securityb/services/user/save_roles`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId|用户id|query|true|string||
|roleIds|角色id,多个用逗号拼接|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 用户管理查询角色配置列表


**接口地址**:`/securityb/services/user/roles`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId|用户id|query|true|string||
|type|type, 1:已配置的关联角色 2:未关联的角色|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListRole|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|Role|
|&emsp;&emsp;id|id|string||
|&emsp;&emsp;name|角色名称|string||
|&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;createdTime|创建时间|string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": "",
			"name": "",
			"createdUserId": "",
			"createdTime": ""
		}
	]
}
```


## 删除用户


**接口地址**:`/securityb/services/user/remove`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|用户id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 用户管理查询


**接口地址**:`/securityb/services/user/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||
|name|用户id或名称|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPageUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPageUser|IPageUser|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|User|
|&emsp;&emsp;&emsp;&emsp;id|用户账号|string||
|&emsp;&emsp;&emsp;&emsp;name|用户名称|string||
|&emsp;&emsp;&emsp;&emsp;tel|固定电话|string||
|&emsp;&emsp;&emsp;&emsp;mobile|手机号|string||
|&emsp;&emsp;&emsp;&emsp;password|密码|string||
|&emsp;&emsp;&emsp;&emsp;sex|性别, 1:男 2:女|string||
|&emsp;&emsp;&emsp;&emsp;birthday|生日|string(date)||
|&emsp;&emsp;&emsp;&emsp;address|地址|string||
|&emsp;&emsp;&emsp;&emsp;email|邮箱|string||
|&emsp;&emsp;&emsp;&emsp;identifyCard|身份证|string||
|&emsp;&emsp;&emsp;&emsp;icon|用户头像|string||
|&emsp;&emsp;&emsp;&emsp;deptId|所属组织id|string||
|&emsp;&emsp;&emsp;&emsp;postId|所属岗位id|string||
|&emsp;&emsp;&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;&emsp;&emsp;createdTime|创建时间|string(date-time)||
|&emsp;&emsp;&emsp;&emsp;updateUserId|修改人|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|修改时间|string(date-time)||
|&emsp;&emsp;&emsp;&emsp;identify|新密码|string||
|&emsp;&emsp;&emsp;&emsp;departmentList|组织机构集合|array|Department|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;children|子部门|array|Department|
|&emsp;&emsp;&emsp;&emsp;postList|岗位集合|array|Post|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;deptId|组织id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;name|岗位名|string||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": "",
				"name": "",
				"tel": "",
				"mobile": "",
				"password": "",
				"sex": "",
				"birthday": "",
				"address": "",
				"email": "",
				"identifyCard": "",
				"icon": "",
				"deptId": "",
				"postId": "",
				"createdUserId": "",
				"createdTime": "",
				"updateUserId": "",
				"updateTime": "",
				"identify": "",
				"departmentList": [
					{
						"id": 0,
						"name": "",
						"parentId": 0,
						"code": "",
						"personNum": 0,
						"area": "",
						"leader": "",
						"children": [
							{
								"id": 0,
								"name": "",
								"parentId": 0,
								"code": "",
								"personNum": 0,
								"area": "",
								"leader": "",
								"children": [
									{}
								]
							}
						]
					}
				],
				"postList": [
					{
						"id": 0,
						"deptId": 0,
						"name": ""
					}
				]
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```


## 获取用户信息详情


**接口地址**:`/securityb/services/user/detail`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|用户id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||User|User|
|&emsp;&emsp;id|用户账号|string||
|&emsp;&emsp;name|用户名称|string||
|&emsp;&emsp;tel|固定电话|string||
|&emsp;&emsp;mobile|手机号|string||
|&emsp;&emsp;password|密码|string||
|&emsp;&emsp;sex|性别, 1:男 2:女|string||
|&emsp;&emsp;birthday|生日|string(date)||
|&emsp;&emsp;address|地址|string||
|&emsp;&emsp;email|邮箱|string||
|&emsp;&emsp;identifyCard|身份证|string||
|&emsp;&emsp;icon|用户头像|string||
|&emsp;&emsp;deptId|所属组织id|string||
|&emsp;&emsp;postId|所属岗位id|string||
|&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;createdTime|创建时间|string(date-time)||
|&emsp;&emsp;updateUserId|修改人|string||
|&emsp;&emsp;updateTime|修改时间|string(date-time)||
|&emsp;&emsp;identify|新密码|string||
|&emsp;&emsp;departmentList|组织机构集合|array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门|array|Department|
|&emsp;&emsp;postList|岗位集合|array|Post|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;deptId|组织id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|岗位名|string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": "",
		"name": "",
		"tel": "",
		"mobile": "",
		"password": "",
		"sex": "",
		"birthday": "",
		"address": "",
		"email": "",
		"identifyCard": "",
		"icon": "",
		"deptId": "",
		"postId": "",
		"createdUserId": "",
		"createdTime": "",
		"updateUserId": "",
		"updateTime": "",
		"identify": "",
		"departmentList": [
			{
				"id": 0,
				"name": "",
				"parentId": 0,
				"code": "",
				"personNum": 0,
				"area": "",
				"leader": "",
				"children": [
					{
						"id": 0,
						"name": "",
						"parentId": 0,
						"code": "",
						"personNum": 0,
						"area": "",
						"leader": "",
						"children": [
							{}
						]
					}
				]
			}
		],
		"postList": [
			{
				"id": 0,
				"deptId": 0,
				"name": ""
			}
		]
	}
}
```


# 租户管理


## 修改租户


**接口地址**:`/securityb/services/tenant/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>只允许修改名称、是否启用、过期时间</p>



**请求示例**:


```javascript
{
  "id": 0,
  "name": "",
  "userId": "",
  "valid": "",
  "expDate": "",
  "createdUserId": "",
  "createdTime": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|tenant|Tenant|body|true|Tenant|Tenant|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;name|租户名称||false|string||
|&emsp;&emsp;userId|租户账号||false|string||
|&emsp;&emsp;valid|是否启用, 1:是 2:否||false|string||
|&emsp;&emsp;expDate|失效日期||false|string(date)||
|&emsp;&emsp;createdUserId|创建人||false|string||
|&emsp;&emsp;createdTime|创建时间||false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 添加租户


**接口地址**:`/securityb/services/tenant/save`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "name": "",
  "userId": "",
  "valid": "",
  "expDate": "",
  "createdUserId": "",
  "createdTime": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|tenant|Tenant|body|true|Tenant|Tenant|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;name|租户名称||false|string||
|&emsp;&emsp;userId|租户账号||false|string||
|&emsp;&emsp;valid|是否启用, 1:是 2:否||false|string||
|&emsp;&emsp;expDate|失效日期||false|string(date)||
|&emsp;&emsp;createdUserId|创建人||false|string||
|&emsp;&emsp;createdTime|创建时间||false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 删除租户


**接口地址**:`/securityb/services/tenant/remove`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|租户id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 租户查询


**接口地址**:`/securityb/services/tenant/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||
|name|租户名称|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPageTenant|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPageTenant|IPageTenant|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|Tenant|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|租户名称|string||
|&emsp;&emsp;&emsp;&emsp;userId|租户账号|string||
|&emsp;&emsp;&emsp;&emsp;valid|是否启用, 1:是 2:否|string||
|&emsp;&emsp;&emsp;&emsp;expDate|失效日期|string(date)||
|&emsp;&emsp;&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;&emsp;&emsp;createdTime|创建时间|string(date-time)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": 0,
				"name": "",
				"userId": "",
				"valid": "",
				"expDate": "",
				"createdUserId": "",
				"createdTime": ""
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```


## 保存或更新租户菜单


**接口地址**:`/securityb/services/tenant/operation`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|operations|菜单ids,用逗号拼接|query|true|string||
|id|租户id|query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 获取租户详情


**接口地址**:`/securityb/services/tenant/detail`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|租户id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultTenant|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||Tenant|Tenant|
|&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;name|租户名称|string||
|&emsp;&emsp;userId|租户账号|string||
|&emsp;&emsp;valid|是否启用, 1:是 2:否|string||
|&emsp;&emsp;expDate|失效日期|string(date)||
|&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;createdTime|创建时间|string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"name": "",
		"userId": "",
		"valid": "",
		"expDate": "",
		"createdUserId": "",
		"createdTime": ""
	}
}
```


# 角色管理


## 修改角色


**接口地址**:`/securityb/services/role/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": "",
  "name": "",
  "createdUserId": "",
  "createdTime": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|role|Role|body|true|Role|Role|
|&emsp;&emsp;id|id||false|string||
|&emsp;&emsp;name|角色名称||false|string||
|&emsp;&emsp;createdUserId|创建人||false|string||
|&emsp;&emsp;createdTime|创建时间||false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 添加角色


**接口地址**:`/securityb/services/role/save`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": "",
  "name": "",
  "createdUserId": "",
  "createdTime": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|role|Role|body|true|Role|Role|
|&emsp;&emsp;id|id||false|string||
|&emsp;&emsp;name|角色名称||false|string||
|&emsp;&emsp;createdUserId|创建人||false|string||
|&emsp;&emsp;createdTime|创建时间||false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 角色管理查询配置用户列表


**接口地址**:`/securityb/services/role/users`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleId|角色id|query|true|string||
|type|type, 1:已配置的用户 2:未配置的用户|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|User|
|&emsp;&emsp;id|用户账号|string||
|&emsp;&emsp;name|用户名称|string||
|&emsp;&emsp;tel|固定电话|string||
|&emsp;&emsp;mobile|手机号|string||
|&emsp;&emsp;password|密码|string||
|&emsp;&emsp;sex|性别, 1:男 2:女|string||
|&emsp;&emsp;birthday|生日|string(date)||
|&emsp;&emsp;address|地址|string||
|&emsp;&emsp;email|邮箱|string||
|&emsp;&emsp;identifyCard|身份证|string||
|&emsp;&emsp;icon|用户头像|string||
|&emsp;&emsp;deptId|所属组织id|string||
|&emsp;&emsp;postId|所属岗位id|string||
|&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;createdTime|创建时间|string(date-time)||
|&emsp;&emsp;updateUserId|修改人|string||
|&emsp;&emsp;updateTime|修改时间|string(date-time)||
|&emsp;&emsp;identify|新密码|string||
|&emsp;&emsp;departmentList|组织机构集合|array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门|array|Department|
|&emsp;&emsp;postList|岗位集合|array|Post|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;deptId|组织id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|岗位名|string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": "",
			"name": "",
			"tel": "",
			"mobile": "",
			"password": "",
			"sex": "",
			"birthday": "",
			"address": "",
			"email": "",
			"identifyCard": "",
			"icon": "",
			"deptId": "",
			"postId": "",
			"createdUserId": "",
			"createdTime": "",
			"updateUserId": "",
			"updateTime": "",
			"identify": "",
			"departmentList": [
				{
					"id": 0,
					"name": "",
					"parentId": 0,
					"code": "",
					"personNum": 0,
					"area": "",
					"leader": "",
					"children": [
						{
							"id": 0,
							"name": "",
							"parentId": 0,
							"code": "",
							"personNum": 0,
							"area": "",
							"leader": "",
							"children": [
								{}
							]
						}
					]
				}
			],
			"postList": [
				{
					"id": 0,
					"deptId": 0,
					"name": ""
				}
			]
		}
	]
}
```


## 角色保存用户


**接口地址**:`/securityb/services/role/save_users`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleId|角色id|query|true|string||
|userIds|用户id,多个用逗号拼接|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 角色配置菜单


**接口地址**:`/securityb/services/role/save_operations`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleId|角色id|query|true|string||
|operationIds|菜单id,多个用逗号拼接|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 删除角色


**接口地址**:`/securityb/services/role/remove`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|角色id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 角色查询


**接口地址**:`/securityb/services/role/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||
|name|角色名称|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPageRole|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPageRole|IPageRole|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|Role|
|&emsp;&emsp;&emsp;&emsp;id|id|string||
|&emsp;&emsp;&emsp;&emsp;name|角色名称|string||
|&emsp;&emsp;&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;&emsp;&emsp;createdTime|创建时间|string(date-time)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": "",
				"name": "",
				"createdUserId": "",
				"createdTime": ""
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```


## 获取角色详情


**接口地址**:`/securityb/services/role/detail`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|角色id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultRole|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||Role|Role|
|&emsp;&emsp;id|id|string||
|&emsp;&emsp;name|角色名称|string||
|&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;createdTime|创建时间|string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": "",
		"name": "",
		"createdUserId": "",
		"createdTime": ""
	}
}
```


# 岗位管理


## 修改岗位


**接口地址**:`/securityb/services/post/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "deptId": 0,
  "name": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|post|岗位集合|body|true|Post|Post|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;deptId|组织id||false|integer(int64)||
|&emsp;&emsp;name|岗位名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 添加岗位


**接口地址**:`/securityb/services/post/save`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "deptId": 0,
  "name": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|post|岗位集合|body|true|Post|Post|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;deptId|组织id||false|integer(int64)||
|&emsp;&emsp;name|岗位名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 删除岗位


**接口地址**:`/securityb/services/post/remove`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|岗位id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 根据组织id查询岗位


**接口地址**:`/securityb/services/post/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|deptId|父级组织id|query|true|integer(int64)||
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||
|name|岗位名,模糊查询|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPagePost|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPagePost|IPagePost|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|Post|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;deptId|组织id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|岗位名|string||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": 0,
				"deptId": 0,
				"name": ""
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```


# 菜单管理


## 修改菜单


**接口地址**:`/securityb/services/operation/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": "",
  "name": "",
  "uri": "",
  "type": "",
  "orderNum": 0,
  "parentId": "",
  "icon": "",
  "config": "",
  "component": "",
  "redirect": "",
  "isRoute": 0,
  "hidden": 0,
  "keepAlive": 0,
  "internalOrExternal": 0,
  "perms": "",
  "children": [
    {
      "id": "",
      "name": "",
      "uri": "",
      "type": "",
      "orderNum": 0,
      "parentId": "",
      "icon": "",
      "config": "",
      "component": "",
      "redirect": "",
      "isRoute": 0,
      "hidden": 0,
      "keepAlive": 0,
      "internalOrExternal": 0,
      "perms": "",
      "children": []
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|operation|Operation|body|true|Operation|Operation|
|&emsp;&emsp;id|菜单id||false|string||
|&emsp;&emsp;name|菜单名称||false|string||
|&emsp;&emsp;uri|页面地址||false|string||
|&emsp;&emsp;type|类型, 2:菜单 3:按钮||false|string||
|&emsp;&emsp;orderNum|排序||false|integer(int32)||
|&emsp;&emsp;parentId|父id||false|string||
|&emsp;&emsp;icon|菜单图标||false|string||
|&emsp;&emsp;config|前端配置||false|string||
|&emsp;&emsp;component|前端组件(交付部门使用)||false|string||
|&emsp;&emsp;redirect|默认跳转地址(交付部门使用)||false|string||
|&emsp;&emsp;isRoute|是否路由菜单（0:不是  1:是（默认值1））交付部门使用||false|integer(int32)||
|&emsp;&emsp;hidden|隐藏路由(0否,1是（默认值0）)交付部门使用||false|integer(int32)||
|&emsp;&emsp;keepAlive|是否缓存路由（0否,1是（默认值0））交付部门使用||false|integer(int32)||
|&emsp;&emsp;internalOrExternal|打开方式（0：内部， 1：外部（默认值0））交付部门使用||false|integer(int32)||
|&emsp;&emsp;perms|授权标识||false|string||
|&emsp;&emsp;children|子菜单||false|array|Operation|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 添加菜单


**接口地址**:`/securityb/services/operation/save`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": "",
  "name": "",
  "uri": "",
  "type": "",
  "orderNum": 0,
  "parentId": "",
  "icon": "",
  "config": "",
  "component": "",
  "redirect": "",
  "isRoute": 0,
  "hidden": 0,
  "keepAlive": 0,
  "internalOrExternal": 0,
  "perms": "",
  "children": [
    {
      "id": "",
      "name": "",
      "uri": "",
      "type": "",
      "orderNum": 0,
      "parentId": "",
      "icon": "",
      "config": "",
      "component": "",
      "redirect": "",
      "isRoute": 0,
      "hidden": 0,
      "keepAlive": 0,
      "internalOrExternal": 0,
      "perms": "",
      "children": []
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|operation|Operation|body|true|Operation|Operation|
|&emsp;&emsp;id|菜单id||false|string||
|&emsp;&emsp;name|菜单名称||false|string||
|&emsp;&emsp;uri|页面地址||false|string||
|&emsp;&emsp;type|类型, 2:菜单 3:按钮||false|string||
|&emsp;&emsp;orderNum|排序||false|integer(int32)||
|&emsp;&emsp;parentId|父id||false|string||
|&emsp;&emsp;icon|菜单图标||false|string||
|&emsp;&emsp;config|前端配置||false|string||
|&emsp;&emsp;component|前端组件(交付部门使用)||false|string||
|&emsp;&emsp;redirect|默认跳转地址(交付部门使用)||false|string||
|&emsp;&emsp;isRoute|是否路由菜单（0:不是  1:是（默认值1））交付部门使用||false|integer(int32)||
|&emsp;&emsp;hidden|隐藏路由(0否,1是（默认值0）)交付部门使用||false|integer(int32)||
|&emsp;&emsp;keepAlive|是否缓存路由（0否,1是（默认值0））交付部门使用||false|integer(int32)||
|&emsp;&emsp;internalOrExternal|打开方式（0：内部， 1：外部（默认值0））交付部门使用||false|integer(int32)||
|&emsp;&emsp;perms|授权标识||false|string||
|&emsp;&emsp;children|子菜单||false|array|Operation|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 删除菜单


**接口地址**:`/securityb/services/operation/remove`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|菜单id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 移动菜单层级


**接口地址**:`/securityb/services/operation/move`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|菜单id|query|true|string||
|parentId|新的父级id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 菜单查询,返回当前登录人所能查看的菜单


**接口地址**:`/securityb/services/operation/list_tree`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListOperation|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|Operation|
|&emsp;&emsp;id|菜单id|string||
|&emsp;&emsp;name|菜单名称|string||
|&emsp;&emsp;uri|页面地址|string||
|&emsp;&emsp;type|类型, 2:菜单 3:按钮|string||
|&emsp;&emsp;orderNum|排序|integer(int32)||
|&emsp;&emsp;parentId|父id|string||
|&emsp;&emsp;icon|菜单图标|string||
|&emsp;&emsp;config|前端配置|string||
|&emsp;&emsp;component|前端组件(交付部门使用)|string||
|&emsp;&emsp;redirect|默认跳转地址(交付部门使用)|string||
|&emsp;&emsp;isRoute|是否路由菜单（0:不是  1:是（默认值1））交付部门使用|integer(int32)||
|&emsp;&emsp;hidden|隐藏路由(0否,1是（默认值0）)交付部门使用|integer(int32)||
|&emsp;&emsp;keepAlive|是否缓存路由（0否,1是（默认值0））交付部门使用|integer(int32)||
|&emsp;&emsp;internalOrExternal|打开方式（0：内部， 1：外部（默认值0））交付部门使用|integer(int32)||
|&emsp;&emsp;perms|授权标识|string||
|&emsp;&emsp;children|子菜单|array|Operation|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": "",
			"name": "",
			"uri": "",
			"type": "",
			"orderNum": 0,
			"parentId": "",
			"icon": "",
			"config": "",
			"component": "",
			"redirect": "",
			"isRoute": 0,
			"hidden": 0,
			"keepAlive": 0,
			"internalOrExternal": 0,
			"perms": "",
			"children": []
		}
	]
}
```


## 获取菜单详情


**接口地址**:`/securityb/services/operation/detail`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|菜单id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultOperation|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||Operation|Operation|
|&emsp;&emsp;id|菜单id|string||
|&emsp;&emsp;name|菜单名称|string||
|&emsp;&emsp;uri|页面地址|string||
|&emsp;&emsp;type|类型, 2:菜单 3:按钮|string||
|&emsp;&emsp;orderNum|排序|integer(int32)||
|&emsp;&emsp;parentId|父id|string||
|&emsp;&emsp;icon|菜单图标|string||
|&emsp;&emsp;config|前端配置|string||
|&emsp;&emsp;component|前端组件(交付部门使用)|string||
|&emsp;&emsp;redirect|默认跳转地址(交付部门使用)|string||
|&emsp;&emsp;isRoute|是否路由菜单（0:不是  1:是（默认值1））交付部门使用|integer(int32)||
|&emsp;&emsp;hidden|隐藏路由(0否,1是（默认值0）)交付部门使用|integer(int32)||
|&emsp;&emsp;keepAlive|是否缓存路由（0否,1是（默认值0））交付部门使用|integer(int32)||
|&emsp;&emsp;internalOrExternal|打开方式（0：内部， 1：外部（默认值0））交付部门使用|integer(int32)||
|&emsp;&emsp;perms|授权标识|string||
|&emsp;&emsp;children|子菜单|array|Operation|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": "",
		"name": "",
		"uri": "",
		"type": "",
		"orderNum": 0,
		"parentId": "",
		"icon": "",
		"config": "",
		"component": "",
		"redirect": "",
		"isRoute": 0,
		"hidden": 0,
		"keepAlive": 0,
		"internalOrExternal": 0,
		"perms": "",
		"children": []
	}
}
```


# 上传附件、上传图片


## 上传


**接口地址**:`/securityb/services/minio/file/upload`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|file||query|true|file||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 删除


**接口地址**:`/securityb/services/minio/file/remove`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|fileName||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 下载


**接口地址**:`/securityb/services/minio/file/download`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|fileName||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK||


**响应参数**:


暂无


**响应示例**:
```javascript

```


# 字典管理


## 修改字典类型内容


**接口地址**:`/securityb/services/dict/update_content`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "dictId": 0,
  "code": "",
  "name": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dictContent|DictContent|body|true|DictContent|DictContent|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;dictId|dict主键||false|integer(int64)||
|&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;name|名称||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 修改字典类型


**接口地址**:`/securityb/services/dict/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "code": "",
  "name": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dict|Dict|body|true|Dict|Dict|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;name|类型名称||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 添加字典类型内容


**接口地址**:`/securityb/services/dict/save_content`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "dictId": 0,
  "code": "",
  "name": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dictContent|DictContent|body|true|DictContent|DictContent|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;dictId|dict主键||false|integer(int64)||
|&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;name|名称||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 添加字典类型


**接口地址**:`/securityb/services/dict/save`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "code": "",
  "name": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dict|Dict|body|true|Dict|Dict|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;name|类型名称||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 删除字典类型内容


**接口地址**:`/securityb/services/dict/remove_content`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|字典类型内容id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 删除字典类型


**接口地址**:`/securityb/services/dict/remove`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|字典类型id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 字典类型查询


**接口地址**:`/securityb/services/dict/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||
|condition|查询条件|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPageDict|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPageDict|IPageDict|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|Dict|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;name|类型名称|string||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": 0,
				"code": "",
				"name": ""
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```


## 字典类型内容查询


**接口地址**:`/securityb/services/dict/content_page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|字典类型id|query|true|integer(int64)||
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||
|condition|查询条件|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPageDictContent|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPageDictContent|IPageDictContent|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|DictContent|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;dictId|dict主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;name|名称|string||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": 0,
				"dictId": 0,
				"code": "",
				"name": ""
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```


# 组织管理


## 修改组织


**接口地址**:`/securityb/services/dept/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "name": "",
  "parentId": 0,
  "code": "",
  "personNum": 0,
  "area": "",
  "leader": "",
  "children": [
    {
      "id": 0,
      "name": "",
      "parentId": 0,
      "code": "",
      "personNum": 0,
      "area": "",
      "leader": "",
      "children": [
        {
          "id": 0,
          "name": "",
          "parentId": 0,
          "code": "",
          "personNum": 0,
          "area": "",
          "leader": "",
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|department|组织机构集合|body|true|Department|Department|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;name|组织名||false|string||
|&emsp;&emsp;parentId|父级id||false|integer(int64)||
|&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;personNum|组织人数||false|integer(int32)||
|&emsp;&emsp;area|行政区||false|string||
|&emsp;&emsp;leader|组织领导||false|string||
|&emsp;&emsp;children|子部门||false|array|Department|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 添加组织


**接口地址**:`/securityb/services/dept/save`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "name": "",
  "parentId": 0,
  "code": "",
  "personNum": 0,
  "area": "",
  "leader": "",
  "children": [
    {
      "id": 0,
      "name": "",
      "parentId": 0,
      "code": "",
      "personNum": 0,
      "area": "",
      "leader": "",
      "children": [
        {
          "id": 0,
          "name": "",
          "parentId": 0,
          "code": "",
          "personNum": 0,
          "area": "",
          "leader": "",
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|department|组织机构集合|body|true|Department|Department|
|&emsp;&emsp;id|主键||false|integer(int64)||
|&emsp;&emsp;name|组织名||false|string||
|&emsp;&emsp;parentId|父级id||false|integer(int64)||
|&emsp;&emsp;code|编码||false|string||
|&emsp;&emsp;personNum|组织人数||false|integer(int32)||
|&emsp;&emsp;area|行政区||false|string||
|&emsp;&emsp;leader|组织领导||false|string||
|&emsp;&emsp;children|子部门||false|array|Department|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 根据组织id查询该组织用户,只查当前级


**接口地址**:`/securityb/services/dept/user`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|组织id|query|true|integer(int64)||
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPageUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPageUser|IPageUser|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|User|
|&emsp;&emsp;&emsp;&emsp;id|用户账号|string||
|&emsp;&emsp;&emsp;&emsp;name|用户名称|string||
|&emsp;&emsp;&emsp;&emsp;tel|固定电话|string||
|&emsp;&emsp;&emsp;&emsp;mobile|手机号|string||
|&emsp;&emsp;&emsp;&emsp;password|密码|string||
|&emsp;&emsp;&emsp;&emsp;sex|性别, 1:男 2:女|string||
|&emsp;&emsp;&emsp;&emsp;birthday|生日|string(date)||
|&emsp;&emsp;&emsp;&emsp;address|地址|string||
|&emsp;&emsp;&emsp;&emsp;email|邮箱|string||
|&emsp;&emsp;&emsp;&emsp;identifyCard|身份证|string||
|&emsp;&emsp;&emsp;&emsp;icon|用户头像|string||
|&emsp;&emsp;&emsp;&emsp;deptId|所属组织id|string||
|&emsp;&emsp;&emsp;&emsp;postId|所属岗位id|string||
|&emsp;&emsp;&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;&emsp;&emsp;createdTime|创建时间|string(date-time)||
|&emsp;&emsp;&emsp;&emsp;updateUserId|修改人|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|修改时间|string(date-time)||
|&emsp;&emsp;&emsp;&emsp;identify|新密码|string||
|&emsp;&emsp;&emsp;&emsp;departmentList|组织机构集合|array|Department|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;children|子部门|array|Department|
|&emsp;&emsp;&emsp;&emsp;postList|岗位集合|array|Post|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;deptId|组织id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;name|岗位名|string||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": "",
				"name": "",
				"tel": "",
				"mobile": "",
				"password": "",
				"sex": "",
				"birthday": "",
				"address": "",
				"email": "",
				"identifyCard": "",
				"icon": "",
				"deptId": "",
				"postId": "",
				"createdUserId": "",
				"createdTime": "",
				"updateUserId": "",
				"updateTime": "",
				"identify": "",
				"departmentList": [
					{
						"id": 0,
						"name": "",
						"parentId": 0,
						"code": "",
						"personNum": 0,
						"area": "",
						"leader": "",
						"children": [
							{
								"id": 0,
								"name": "",
								"parentId": 0,
								"code": "",
								"personNum": 0,
								"area": "",
								"leader": "",
								"children": [
									{}
								]
							}
						]
					}
				],
				"postList": [
					{
						"id": 0,
						"deptId": 0,
						"name": ""
					}
				]
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```


## 删除组织


**接口地址**:`/securityb/services/dept/remove`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|组织id|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {}
}
```


## 根据父id查询子级,返回page


**接口地址**:`/securityb/services/dept/page_children`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|parentId|父级组织id|query|true|integer(int64)||
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||
|deptName|组织名,模糊查询|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPageDepartment|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPageDepartment|IPageDepartment|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门|array|Department|
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": 0,
				"name": "",
				"parentId": 0,
				"code": "",
				"personNum": 0,
				"area": "",
				"leader": "",
				"children": [
					{
						"id": 0,
						"name": "",
						"parentId": 0,
						"code": "",
						"personNum": 0,
						"area": "",
						"leader": "",
						"children": [
							{}
						]
					}
				]
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```


## 组织树查询


**接口地址**:`/securityb/services/dept/list_tree`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListDepartment|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|Department|
|&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;code|编码|string||
|&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;children|子部门|array|Department|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": 0,
			"name": "",
			"parentId": 0,
			"code": "",
			"personNum": 0,
			"area": "",
			"leader": "",
			"children": [
				{
					"id": 0,
					"name": "",
					"parentId": 0,
					"code": "",
					"personNum": 0,
					"area": "",
					"leader": "",
					"children": [
						{}
					]
				}
			]
		}
	]
}
```


## 根据父id查询子级,返回集合


**接口地址**:`/securityb/services/dept/list_children`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|parentId|父级组织id|query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListDepartment|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|Department|
|&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;code|编码|string||
|&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;children|子部门|array|Department|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": 0,
			"name": "",
			"parentId": 0,
			"code": "",
			"personNum": 0,
			"area": "",
			"leader": "",
			"children": [
				{
					"id": 0,
					"name": "",
					"parentId": 0,
					"code": "",
					"personNum": 0,
					"area": "",
					"leader": "",
					"children": [
						{}
					]
				}
			]
		}
	]
}
```


# 登录模块


## pc登录接口


**接口地址**:`/securityb/services/login/rest`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId|登录人账号|query|true|string||
|password|登录人密码|query|true|string||
|captcha|验证码|query|true|string||
|random|随机数|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultLoginUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||LoginUser|LoginUser|
|&emsp;&emsp;userId|用户id|string||
|&emsp;&emsp;uid|uid|string||
|&emsp;&emsp;name|用户名称|string||
|&emsp;&emsp;roleList|角色集合|array|Role|
|&emsp;&emsp;&emsp;&emsp;id|id|string||
|&emsp;&emsp;&emsp;&emsp;name|角色名称|string||
|&emsp;&emsp;&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;&emsp;&emsp;createdTime|创建时间|string(date-time)||
|&emsp;&emsp;deptList|所属组织集合|array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门|array|Department|
|&emsp;&emsp;mobile|手机号|string||
|&emsp;&emsp;tel|固定电话|string||
|&emsp;&emsp;status|登录状态|string||
|&emsp;&emsp;token|token|string||
|&emsp;&emsp;msg|信息|string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"userId": "",
		"uid": "",
		"name": "",
		"roleList": [
			{
				"id": "",
				"name": "",
				"createdUserId": "",
				"createdTime": ""
			}
		],
		"deptList": [
			{
				"id": 0,
				"name": "",
				"parentId": 0,
				"code": "",
				"personNum": 0,
				"area": "",
				"leader": "",
				"children": [
					{
						"id": 0,
						"name": "",
						"parentId": 0,
						"code": "",
						"personNum": 0,
						"area": "",
						"leader": "",
						"children": [
							{}
						]
					}
				]
			}
		],
		"mobile": "",
		"tel": "",
		"status": "",
		"token": "",
		"msg": ""
	}
}
```


## 登出接口


**接口地址**:`/securityb/services/login/out`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId|登录人账号|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultLoginUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||LoginUser|LoginUser|
|&emsp;&emsp;userId|用户id|string||
|&emsp;&emsp;uid|uid|string||
|&emsp;&emsp;name|用户名称|string||
|&emsp;&emsp;roleList|角色集合|array|Role|
|&emsp;&emsp;&emsp;&emsp;id|id|string||
|&emsp;&emsp;&emsp;&emsp;name|角色名称|string||
|&emsp;&emsp;&emsp;&emsp;createdUserId|创建人|string||
|&emsp;&emsp;&emsp;&emsp;createdTime|创建时间|string(date-time)||
|&emsp;&emsp;deptList|所属组织集合|array|Department|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;name|组织名|string||
|&emsp;&emsp;&emsp;&emsp;parentId|父级id|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;code|编码|string||
|&emsp;&emsp;&emsp;&emsp;personNum|组织人数|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;area|行政区|string||
|&emsp;&emsp;&emsp;&emsp;leader|组织领导|string||
|&emsp;&emsp;&emsp;&emsp;children|子部门|array|Department|
|&emsp;&emsp;mobile|手机号|string||
|&emsp;&emsp;tel|固定电话|string||
|&emsp;&emsp;status|登录状态|string||
|&emsp;&emsp;token|token|string||
|&emsp;&emsp;msg|信息|string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"userId": "",
		"uid": "",
		"name": "",
		"roleList": [
			{
				"id": "",
				"name": "",
				"createdUserId": "",
				"createdTime": ""
			}
		],
		"deptList": [
			{
				"id": 0,
				"name": "",
				"parentId": 0,
				"code": "",
				"personNum": 0,
				"area": "",
				"leader": "",
				"children": [
					{
						"id": 0,
						"name": "",
						"parentId": 0,
						"code": "",
						"personNum": 0,
						"area": "",
						"leader": "",
						"children": [
							{}
						]
					}
				]
			}
		],
		"mobile": "",
		"tel": "",
		"status": "",
		"token": "",
		"msg": ""
	}
}
```


## 获取验证码


**接口地址**:`/securityb/services/login/get_verify`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|random|随机数,非必填|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


# 操作日志管理


## 操作日志查询


**接口地址**:`/securityb/services/log/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page|页码|query|false|integer(int32)||
|size|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultIPageOperateLog|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||IPageOperateLog|IPageOperateLog|
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;records||array|OperateLog|
|&emsp;&emsp;&emsp;&emsp;id|主键|integer(int64)||
|&emsp;&emsp;&emsp;&emsp;userId|操作人|string||
|&emsp;&emsp;&emsp;&emsp;operateUrl|操作接口路径|string||
|&emsp;&emsp;&emsp;&emsp;operateTime|操作时间|string(date-time)||
|&emsp;&emsp;&emsp;&emsp;ip|ip|string||
|&emsp;&emsp;&emsp;&emsp;remark|说明|string||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;total||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"size": 0,
		"records": [
			{
				"id": 0,
				"userId": "",
				"operateUrl": "",
				"operateTime": "",
				"ip": "",
				"remark": ""
			}
		],
		"current": 0,
		"pages": 0,
		"total": 0
	}
}
```