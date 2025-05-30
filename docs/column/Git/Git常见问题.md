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
```powershell
notepad "$env:USERPROFILE\.ssh\config"
```

Add these lines:
```text
Host github.com
  Hostname ssh.github.com
  Port 443
```

2. Test the connection:
```powershell
ssh -T git@github.com
```