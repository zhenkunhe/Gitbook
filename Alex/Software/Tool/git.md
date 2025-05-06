# git

[TOC]

## Introduction

git config --global user.name "<使用者名字>"
git config --global user.email "<電子信箱>"

git config --global alias.co checkout
git config --global core.editor vim
git init

使用 git status 來檢視所有檔案的狀態
使用 git add <file> 來告知 git，哪些是我們即將要提交（commit）的檔案

 git rm
使用 git commit 來提交一個 patch，並且使用 vim 編輯提交訊息（包含標題及內容）

git mv
使用 git log 檢視提交的歷史訊息
--oneline  
使用 git show 檢視最後一次提交的 patch 所修改內容

 git add --all  
 不論檔案狀態是 Untracked files 或是 Changes not staged for commit（紅色），都會一口氣變成 Changes to be committed（綠色）

 git add -u        # 一次加入所有被更動的檔案，包含 modified 及 deleted
Changes not staged for commit（紅色），都會一口氣變成 Changes to be committed（綠色）

git add -f <file> 強制 add 被忽略的檔案

    第一行為 commit message 的標題（僅限一行）
    第二行保留空白
    第三行以後是 commit message 的內容（可略過不寫）
    
git diff 只能檢視 Changes not staged for commit 區塊（紅色）的修改內容
git diff hello_world.txt
git diff --cached     # 檢視Changes to be committed(綠色)部分的內容

git reset
git reset HEAD <file>
使用 git reset HEAD <file> 來還原 "檔案狀態"
使用 git checkout -- <file> 來還原 "檔案內容"

使用 git reset --soft HEAD^ 使 patch 回到上一個階段的 Changes to be committed
 git reset --soft HEAD@{1}
git reset --hard HEAD 可以一次將 Changes not staged for commit 和 Changes to be committed 的區域清空，但不包含Untracked files

git reset HEAD^  回到前一個 patch，且恢復檔案的狀態
git reset --soft HEAD^  回到前一個 patch，但保持檔案狀態為 Changes to be committed
git reset --hard HEAD^  回到前一個 patch，且強制清除檔案的修改內容

忽略Untracked files
.gitignore
*.exe       # 忽略所有 xxx.exe 的檔案

接著我們可以透過 git checkout -- <file> 來還原檔案的內容

$ git checkout -- num.txt

組合記
$git add -A                # 把所有檔案加到 Changes to be committed
$git reset --hard HEAD     # 一次還原所有檔案的內容

組合記的組合記
$git submodule foreach --recursive git add -A
$git submodule foreach --recursive git reset --hard HEAD

HEAD^ 或 HEAD~1 可以用來表示上一個 patch
HEAD^^ 或 HEAD~2 可以用來表示上兩個 patch
HEAD^^^ 或 HEAD~3 可以用來表示上三個 patch

git show HEAD~2

在 git 的世界裡，凡事 HEAD 發生改變都會被記錄下來
哪些時候 HEAD 會發生改變呢？

    git commit
    提交一份新的 patch，HEAD 會轉移到新的 patch

    git reset --hard <commit_id>
    切換 patch 的時候
    
    git cherry-pick/revert ...
 挑入/挑出 patch 的時候

 git checkout <branch>
 切換分支的時候

 git merge/rebase ...
 合併分支的時候

git reflog 用來看Head的移動
git log -g 查看 reflog 的詳細內+

git commit --amend 的注意事項（非常雷 x 2）

使用指令 git commit --amend 後，會馬上進入 vim 的文字編輯模式

git 不論你是否有修改 commit message 或是用 :q! 不存檔直接離開 vim

都會為你重新產生新的 commit id

有時候這並不一定是我們想要的結果，要特別留意！

    例如說，我們從 server 上抓了最新的 code 下來，準備要新增一個功能再上傳至 server

    但是你好死不死的手殘按到 git commit --amend 先改到了最新的 patch（P0）

    這時候儘管你按 :q! 退出 vim，但是 commit id 早就已經被改掉了（P0'）

    然後我們基於 P0' 來開發新功能，並且 commit 了一個新的 patch（P1）

    這時候我們要上傳 patch 的時候，會遇到被 git server 拒絕的情形

    被拒絕的原因是，server 認為你提交的 patch 跟 server 的 code 並沒有兩樣

    但其實主要原因是，server 認為你上傳了兩個的 patch，分別是 P0' 跟 P1

    server 先用 P0' 跟 P0 最比對，發現兩個 patch 根本就一模一樣，就直接拒絕了

    當你絞盡腦汁的想要找出 P1 哪裡有問題的時候，其實是被 git commit --amend 背後默默捅了一刀

    因此上傳 patch 前請確保 parent id 正確無誤

git commit --amend    # 使用後會進入 vim 文字編輯模式。把標題改成 "Add 77" 然後存檔離開

$ git reset --hard  edb3d9c     # 回到 P3
$ git cherry-pick   b2dbf88     # 挑入 P5 → P5'
$ git cherry-pick   8cb205e     # 挑入 P6 → P6'
解完衝突請執行 git cherry-pick --continue
若要放棄請執行 git cherry-pick --abort

$ git rebase -i <after this commit>               # 啟動 rebase 互動模式
如果不想要有 git reflog 的紀錄的話，就要將把 TODO 的內容清空或是註解掉

git rebase --skip
git rebase --continue
git rebase --abort 全部取消，並且回到 rebase 前的狀態

patch 多沒有關係，但 patch 改的內容要越細越好

git branch
git branch <new branch name>
git checkout <branch name> 切換分支
git clone -b RB14.12 <https://git.allseenalliance.org/gerrit/core/alljoyn.git>

git checkout -b <new branch name
$ git branch <new branch name>
$ git checkout <new branch name>

git branch -f <branch name> <commit id>
git branch -D <branch name> 刪除分支
我們必須切到其它分支上，才能把 feature 分支刪除

git checkout <commit id> 移動 HEAD 的位置

git push (遠端倉庫名ex:orginal) (分支名ex:master)

Git 除了可以用 cherry-pick 和 rebase 的方式來合併分支之外
還可以用 merge 指令來合併分支

git merge bugFix

git stash
git stash list
git config --global core.editor vim

git add submoudle
 git submoudle add <repo_url> subdir  

git clone submoudle
 git clone --recurse-submodules <https://github.com/schnell18/dotvim.git>  

update submoudle
git submodule foreach git pull origin  

## Merge detached HEAD back to origin/master – Git

$git checkout c2744f95d
$git checkout –b temp #makes a new branch from current detached HEAD
$git branch –f master temp #update master to point to the new <temp> branch
$git branch –d temp #delete the <temp> branch
$git push origin master #push the re-established history

 git pull --rebase

加上 rebase 的意思是，會先 1.把本地 repo. 從上次 pull 之後的變更暫存起來 2. 回復到上次 pull 時的情況 3. 套用遠端的變更 4. 最後再套用剛暫存下來的本地變更。詳細說明可以參考 pull with rebase。

git push origin HEAD:master

If you want to stash only specific files, do the following:

    Stage the files you don't want to stash

    And the following command:

    git stash save --keep-index

For example

```bash
# On branch develop
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#   modified:   fileA
#   modified:   fileB
#
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#   modified:   fileC
#   modified:   fileD
```

git stash save --keep-index
