## 无法提交到 github

```bash
$ git push
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

It looks like you're having trouble connecting to GitHub via SSH on port 22. This is a common issue that can occur due to network restrictions. Here are some solutions:

1. Try using HTTPS port (443) for SSH connections:

Create or edit `~/.ssh/config`:
```bash
notepad "$env:USERPROFILE\.ssh\config"
```

Add these lines:
```
Host github.com
  Hostname ssh.github.com
  Port 443
```

2. Test the connection:
```bash
ssh -T git@github.com
```



fatal: unable to access 'https://gitee.com/singlegou/lure-admin.git/': Failed to connect to gitee.com port 443 after 21143 ms: Could not connect to server

```bash
ipconfig /flushdns
```



## 更新远程分支信息（删除本地已经不存在的远程分支缓存）

```bash
git fetch --prune
# 或简写
git fetch -p
```

