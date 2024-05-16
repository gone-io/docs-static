---
sidebar: auto
prev: ./mysql
next: false
---

# JWT + MySQL + Redis + Schedule

在本章节中，我们将在[上一个例子](https://goner.fun/zh/quick-start/mysql.html)的基础上增加：使用JWT鉴权，Redis做缓存，集成定时任务的Web项目。

## 业务和接口说明
在这个例子中，我们将实现如下功能和接口：
1. 我们将用户分为管理员和普通用户两种角色，管理员可以管理用户，普通用户只能查看自己的信息。

下面是普通用户的接口：

- 用户注册接口
    - 请求
    ```http
    POST /api/users/register HTTP/1.1
    Content-Type: application/json

    {
        "username": "admin",
        "password": "123456",
        "email": "admin@goner.fun"
        "verifyCode": "123456"
    }
    ```
    - 应答
      - 状态码：200
      - 返回内容
        ```json
        {
            "code": 0,
            "data": {
                "id": 1,
            }
        }

- 用户登录接口
    ```http
    POST /api/users/login HTTP/1.1
    Content-Type: application/json

    {
        "username": "admin",
        "password": "123456"
    }

- 获取当前用户信息接口
    ```http
    GET /api/users/info HTTP/1.1
    Authorization: Bearer <token>
    Content-Type: application/json
    ```


- 修改当前用户信息接口
    ```http
    PUT /api/users/info HTTP/1.1
    Authorization: Bearer <token>
    Content-Type: application/json
    {
        "username": "admin",
        "email": "admin@goner.fun"
    }