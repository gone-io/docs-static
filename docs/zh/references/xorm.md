---
sidebar: auto
prev: ./http-inject
next: ./redis
---

# Gone对Xorm的增强

## 1. 自动事务
使用`Transaction`函数包裹的函数，执行前会自动开启事务，返回`error`或者发生`panic`自动完成事务回滚，不返回`error`则自动提交事务。

> 注意：在`Transaction`函数包裹的数据库操作函数需要使用`session xorm.Interface`执行数据库操作

```go
type db struct {
	gone.Flag
	gone.XormEngine `gone:"gone-xorm"` //注入数据库引擎
}

func (d *db) updateUser(user *entity.User) error {

    // 使用Transaction包裹的函数，执行前会自动开启事务
	return d.Transaction(func(session xorm.Interface) error {

        //注意：使用的session进行数据库操作
		_, err := session.ID(user.Id).Update(user)
		return gone.ToError(err)
	})
}
```

## 2. 事务自动传递
嵌套使用`Transaction`函数包裹的函数，只会开启一个事务，嵌套事务会自动传递，嵌套事务的`error`或者发生`panic`自动完成事务回滚，不返回`error`则自动提交事务。

这样带来一个好处，让我们编写的函数在组合时能够自动合并到一个事务中。

请看下面代码，如果`updateUser`、`updateFriends`函数单独使用，会分别开启事务；将他们嵌套在`DoUpdate`的`Transaction`的函数中，则会合并到一个事务中。

```go
type db struct {
	gone.Flag
	gone.XormEngine `gone:"gone-xorm"` //注入数据库引擎
}

func (d *db) updateUser(user *entity.User) error {

    // 使用Transaction包裹的函数，执行前会自动开启事务
	return d.Transaction(func(session xorm.Interface) error {

        //注意：使用的session进行数据库操作
		_, err := session.ID(user.Id).Update(user)
		return gone.ToError(err)
	})
}

func (d *db) updateFriends(userId int64, friedns []*entity.Friend) error {
	return d.Transaction(func(session xorm.Interface) error {
		//todo: 更新朋友的相关操作

		return nil
	})
}

func (d *db) DoUpdate(user *entity.User, friedns []*entity.Friend) error {
	return d.Transaction(func(session xorm.Interface) error {
		err := d.updateUser(user)
		if err != nil {
			return err
		}

		return d.updateFriends(user.Id, friedns)
	})
}
```

## 3. SQL支持名字参数

```go
	sql, args := xorm.MustNamed(`
		update user
		set
		    status = :status,
			avatar = :avatar
		where
		    id = :id`,
		map[string]any{
			"id":     1,
			"status": 1,
			"avatar": "https://wwww....",
		},
	)
```
通过`xorm.MustNamed`处理后的sql为：
```sql
update user
set
    status = ?,
    avatar = ?
where
    id = ?
```

`args`为`[]any`类型，值为：`1,1,"https://wwww...."`。
