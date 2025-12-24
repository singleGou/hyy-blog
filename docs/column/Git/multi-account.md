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

## github actions

你已有的 SSH key（hyyyKey）是你自己电脑连接 GitHub 用的，GitHub Actions 运行在云端全新容器里，拿不到你本地的私钥，所以 peaceiris/actions-gh-pages 依旧报 “not found deploy key”

想让 Action 也能用 SSH 推代码，需要把一对“专为 CI 而生”的 DeployKey放到仓库里

1. 在本地再生成一把新密钥（别覆盖你原来的 hyyyKey）

    ```bash
    ssh-keygen -C "github-action-deploy" -f deploy_key
    # 得到两个文件：
    # deploy_key     ← 私钥
    # deploy_key.pub ← 公钥
     ```

2. 把公钥填进仓库
GitHub 仓库 → Settings → Deploy keys → Add deploy key
Title 随意，Key 框里粘贴 deploy_key.pub 的全部内容，一定要勾选 “Allow write access” → Save

3. 把私钥填进 Secrets
同一仓库 → Settings → Secrets and variables → Actions → New repository secret
Name 写 DEPLOY_KEY（或你喜欢的名字），Value 把 deploy_key 文件全文复制进去 → Save

4. 工作流里用这把新钥匙

    ```bash
    name: Deploy to gh-pages
    uses: peaceiris/actions-gh-pages@v4
    with:
      deploy_key: ${{ secrets.DEPLOY_KEY }}   # 与第 3 步名字保持一致
      publish_dir: docs/.vitepress/dist
    ```

或者干脆就采用偷懒方法：

```bash
- name: Deploy to gh-pages
  uses: peaceiris/actions-gh-pages@v4
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}  # 官方自动生成，已有写权限
    publish_dir: docs/.vitepress/dist
```