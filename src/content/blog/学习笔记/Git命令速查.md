---
title: Git 命令速查
description: 涵盖日常开发中最常用的 Git 命令，包括基础配置、分支操作、合并回退、远程同步等核心指令
pubDate: 2026-05-03
type: reference
domain: git
status: draft
---
### 一、 基础配置与初始化

- **配置个人信息**
    
    Bash
    
    ```
    git config --global user.name "你的名字"
    git config --global user.email "你的邮箱@example.com"
    ```
    
    _(注：去掉 `--global` 则只对当前仓库生效)_
    
- **初始化个人仓库**
    
    Bash
    
    ```
    git init
    ```
    

### 二、 工作区与提交操作

- **暂存文件**
    
    Bash
    
    ```
    git add <文件名>     # 暂存指定文件
    git add .           # 暂存当前目录下所有更改
    ```
    
- **提交到本地仓库**
    
    Bash
    
    ```
    git commit -m "你的提交信息描述"
    ```
    
- **更改某次提交的内容**
    
    Bash
    
    ```
    git commit --amend -m "新的提交信息"  # 修改最后一次提交的内容或注释
    ```
    
    _(如果需要修改更早的提交，需要用到交互式变基 `git rebase -i <commit-hash>`)_
    

### 三、 分支操作 (Branch)

- **创建分支**
    
    Bash
    
    ```
    git branch <新分支名>
    ```
    
- **在某个特定节点创建分支**
    
    Bash
    
    ```
    git branch <新分支名> <commit-hash>
    ```
    
- **切换分支**
    
    Bash
    
    ```
    git switch <分支名>       # 推荐，Git 2.23+ 引入的新指令，语义更明确
    git checkout <分支名>     # 传统指令
    ```
    
    _(附：创建并直接切换过去可以使用 `git switch -c <新分支名>`)_
    
- **将当前(或某个)分支设置到某个节点**
    
    Bash
    
    ```
    # 强制将当前分支重置到某节点
    git reset --hard <commit-hash> 
    
    # 强制将特定分支指向某个节点（不切换到该分支）
    git branch -f <分支名> <commit-hash>
    ```
    

### 四、 远程与历史记录

- **查看远程连接**
    
    Bash
    
    ```
    git remote -v
    ```
    
- **查看远程分支**
    
    Bash
    
    ```
    git branch -r      # 仅查看远程分支
    git branch -a      # 查看所有分支（本地 + 远程）
    ```
    
- **查看本地和远程的历史提交记录**
    
    Bash
    
    ```
    git log --oneline --graph --all  # 以图形化单行显示所有本地和远程的历史记录
    git log <remote>/<branch>        # 查看特定远程分支的记录，例如 git log origin/main
    ```
    

### 五、 合并与回退 (Merge & Revert)

- **合并当前分支和某节点(或分支)**
    
    Bash
    
    ```
    git merge <分支名或commit-hash>
    ```
    
- **关于“本地仓库的回退”及其原理**
    
    **是的，本地回退在本质上就是“将分支指针设置（移动）到过去的某个节点”。**
    
    本地回退最常用的指令是 `git reset`，它有三种模式：
    
    Bash
    
    ```
    git reset --hard <commit-hash>  # 最彻底：分支指向该节点，工作区和暂存区的代码也会完全恢复到该节点的状态。（危险操作，会丢失未提交的修改）
    git reset --soft <commit-hash>  # 仅撤销提交：分支指向该节点，但你之后的代码修改会保留在暂存区（绿字）。
    git reset --mixed <commit-hash> # 默认模式：分支指向该节点，之后的修改会保留在工作区（红字），需要重新 add。
    ```
    
- **远程仓库的回退**
    
    远程仓库的回退不能直接用 `reset`（除非只有你一个人在使用且强行推送），通常推荐用“生成一次反向提交”的方式来撤销，这样不会破坏历史记录：
    
    Bash
    
    ```
    # 1. 安全做法（推荐）：撤销某次提交的更改，并生成一个新的提交记录
    git revert <commit-hash>
    git push origin <分支名>
    
    # 2. 暴力做法（危险）：先在本地 reset 到旧节点，然后强制推送到远程（会覆盖远程历史）
    git reset --hard <commit-hash>
    git push -f origin <分支名>
    ```
    

---

### 六、 你漏掉的常用核心指令补充

结合你上面列出的操作，要完成一个完整的 Git 工作流（尤其是涉及远程协作或多端同步时），你还漏掉了以下几个极其高频的指令：

1. **查看状态 (核心中的核心)**
    
    Bash
    
    ```
    git status
    ```
    
    _用途：在执行 add、commit 或切换分支前，随时查看当前工作区和暂存区的状态，避免误操作。_
    
2. **拉取远程代码 (Pull / Fetch)**
    
    Bash
    
    ```
    git pull origin <分支名>   # 获取远程最新代码并自动合并到本地
    git fetch origin          # 仅获取远程代码历史，不自动合并（更安全）
    ```
    
    _用途：多设备同步（比如不同电脑同步笔记）或团队协作时，必须先 pull 最新代码才能解决潜在冲突。_
    
3. **推送到远程仓库 (Push)**
    
    Bash
    
    ```
    git push origin <分支名>
    git push -u origin <分支名> # 首次推送并建立本地与远程分支的追踪关系
    ```
    
4. **克隆远程仓库 (Clone)**
    
    Bash
    
    ```
    git clone <仓库地址>
    ```
    
5. **工作区暂存 (Stash)**
    
    Bash
    
    ```
    git stash         # 把当前未提交的修改藏起来，让工作区保持干净（常用于临时需要切换分支时）
    git stash pop     # 切换回来后，把藏起来的修改恢复到工作区
    ```
    
6. **变基 (Rebase)**
    
    Bash
    
    ```
    git rebase <分支名>
    ```
    
    _用途：这是与 `merge` 并列的合并指令。它能把你的提交历史梳理成一条完美的直线，在处理笔记库或个人项目的多端自动同步冲突时非常有用。_
    
7. **撤销工作区的修改 (Restore)**
    
    Bash
    
    ```
    git restore <文件名>      # 撤销工作区中对某个文件的修改（回到最近一次 commit 的状态）
    git restore --staged <文件名> # 将文件从暂存区移出（等同于撤销 git add）
    ```