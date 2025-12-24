## Git 多账号配置

全局默认账号（可选）
让命令行新建仓库时自动用公司身份：

```bash
git config --global --list

git config --global user.name "hyy"
git config --global user.email "hyy@cestc.cn"
```

1. 生成两套 SSH 密钥，分别对应个人和公司

   ```bash
   # 生成个人密钥
   ssh-keygen -t rsa -C "your-personal-email@gmail.com" -f ～/.ssh/id_rsa_personal
   
   # 生成公司密钥（注意文件名区分）
   ssh-keygen -t rsa -C "your-work-email@company.com" -f ～/.ssh/id_rsa_work
   ```

2. 把公钥分别加到对应平台

3. 配置 .ssh/config

   ```ini
   # 公司别名
   Host github-company
   Port 443
   HostName ssh.github.com
   User git
   IdentityFile ~/.ssh/id_rsa_work
   IdentitiesOnly yes
   
   # 个人别名
   Host github-personal
   Port 443
   HostName ssh.github.com
   User git
   IdentityFile ~/.ssh/id_rsa_personal
   IdentitiesOnly yes
   ```

4. 克隆/远程地址改用别名

   ```bash
   # 公司项目
   git clone git@github-company:your-corp/project.git
   cd project
   git config user.name "Your Name"
   git config user.email "company@corp.com"
   
   # 个人项目
   git clone git@github-personal:your-name/hobby.git
   cd hobby
   git config user.name "Your Name"
   git config user.email "me@personal.com"
   ```

5. 已有仓库快速切换

   ```bash
   # 查看当前远程
   git remote -v
   # 改成别名形式
   git remote set-url origin git@github-company:your-corp/project.git
   ```

   

