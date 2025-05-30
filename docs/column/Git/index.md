# Git 基础

## 创建版本库

```bash
# 把指定目录变为 git 可以管理的仓库
git init

# 把文件添加到仓库
git add 1.txt
git add 2.txt

# 把文件提交到仓库
git commit -m 'commit message'
```

## 版本回退

```bash
# 查看仓库当前的状态
git status

# 查看具体修改了什么内容，后面可以跟具体的文件，在 add 前查看
git diff
git diff <file>
git diff HEAD -- <file>

# 查看提交历史，显示从最近到最远的提交日志
git log
git log --pretty=oneline

# commit id（版本号），由 SHA1 计算出来的十六进制数字

# 版本回退
git reset --hard HEAD^
git reset --hard <commit_id>

# 查看命令历史
git reflog
```

> git reset
>
> --hard 会回退到上个版本的已提交状态
>
> --soft 会回退到上个版本的未提交状态
>
> --mixed 会回退到上个版本已添加但未提交的状态

上一个版本是 `HEAD^`，上上一个版本就是 `HEAD^^`，上 100 个版本 `HEAD~100`

### 工作区和暂存区

**工作区（Working Directory）**：

在电脑里能看到的目录

**版本库（Repository）**：

工作区有一个隐藏目录 .git ，里面存放的就是 Git 的版本库

Git 的版本库里存了很多东西，其中最重要的就是称为 stage（或者叫 index）的暂存区，还有 Git 为我们自动创建的第一个分支 master，以及指向 master 的一个指针叫 HEAD

> git add 实际上是把文件添加到暂存区
>
> git commit 实际上是把暂存区的所有内容提交到当前分支

### 管理修改

Git 管理的是修改而不是文件

```bash
# 撤销修改
git checkout -- <file> #旧版 git
git restore <file> # 新版 git
```

撤销修改分为两种情况，一种是没有添加到暂存区，撤销修改就是恢复到和版本库一样的状态：

```bash
git checkout -- <file>
# or
git restore <file>
```

一种是已经添加到了暂存区，把暂存区的修改撤销掉（unstage），重新放回工作区：

```bash
git reset HEAD <file>
# or
git restore --staged <file>
```

> git reset 命令既可以回退版本，也可以把暂存区的修改回退到工作区

## 远程仓库

本地 Git 仓库和 GitHub 仓库之间的传输是通过 SSH 加密的

### 创建 SSH Key

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

完事会生成两个文件，id_rsa 是私钥，不能泄露出去，id_rsa.pub 是公钥，需要到 github 上配置一下

为什么 GitHub 需要 SSH Key 呢？因为 GitHub 需要识别出你推送的提交确实是你推送的

## 分支管理

```bash
# 新建分支
git branch <branch_name>

# 创建并切换到分支
git checkout -b <branch_name>
# git 最新语法
git switch -c <branch_name>
```

### 多人协作

查看远程库信息，使用 git remote -v；

本地新建的分支如果不推送到远程，对其他人就是不可见的；

从本地推送分支，使用 git push origin branch-name，如果推送失败，先用 git pull 抓取远程的新提交；

在本地创建和远程分支对应的分支，使用 git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；

建立本地分支和远程分支的关联，使用 git branch --set-upstream branch-name origin/branch-name；

从远程抓取分支，使用 git pull，如果有冲突，要先处理冲突。

## 标签管理

发版的时候一般会打标签，标签是版本库的一个快照，其实就是指向某个 commit 的指针，但是和分支不同的是，标签不能移动

> Git 有 commit 为什么还要引入 tag ？
>
> 其实就是 commit_id 太长了不好记，相当于 IP 地址跟域名一样

### 创建标签

先切换到需要打标签的分支，使用 `git tag <name>` 就可以打一个新标签：

```bash
git tag v1.0
# 默认标签是打在最新提交的 commit 上的，要打在某个 commit 上需要在后面跟 commid_id
git tag v0.9 <commit_id>

# 查看所有标签
git tag

# 查看标签信息
git show <tagname>

# 创建带有说明的标签，用-a 指定标签名，-m 指定说明文字：
git tag -a v1.1 -m 'version 1.1 released' <commit_id>

# 推送某个标签到远程
git push origin <tagname>
# 一次性推送全部尚未推送到远程的本地标签
git push origin --tags
```

> 标签不是按时间顺序列出，而是按字母排序的

如果标签已经推送到远程，要先从本地删除，再从从远程删除：
```bash
git tag -d <tagname>
git push origin :refs/tags/<tagname>
```

# 基于标签创建新分支并切换到该分支
git checkout -b <new_branch_name> <tagname>

# 更新远程分支信息（删除本地已经不存在的远程分支缓存）
git fetch --prune
# 或简写
git fetch -p