# 線上題庫
[TOC]
## [**InterviewBit**](https://www.interviewbit.com/)

## [**Topcoder**](https://arena.topcoder.com/#/u/dashboard)

## [**Codeforces**](http://codeforces.com/)

## [**HackerRank**](https://www.hackerrank.com/)

## [**Codility**](https://app.codility.com/programmers/)

## [**UVa**](https://uva.onlinejudge.org/)

## [LeetCode](https://leetcode.com/)

### 高度平衡二元樹

- Treap
- Splay
- AVL tree
- Red–black tree

### Top-down Solution

```cpp
procedure top_down(root, params)
{
	if (root == null)    return something
	if (root == leaf)    update answer using (params);
    top_down(root.left, left_params);
	top_down(root.right, right_params);
}
```

- 算是一種`preorder traversal`
- 使用時機：
    - 當你得到參數時，能在某些結點得到答案
    - 當你得到參數時，雖不能得到答案，但能傳遞參數給子結點解析，得到答案
- 例：二元樹的深度
    
    ```cpp
    int answer;
    void maximum_depth(TreeNode* root, int depth) 
    {
        if (!root) return;
        if (!root->left && !root->right)    answer = max(answer, depth);
        maximum_depth(root->left, depth + 1);
        maximum_depth(root->right, depth + 1);
    }
    ```
    

### Bottom-up Solution

```cpp
procedure bottom_up(root)
{
	if (root == null)    return something
    left_ans = bottom_up(root.left);      // left_params <-- root.val, params
	right_ans = bottom_up(root.right);   // right_params <-- root.val, params 
	return answer using (left_ans && right_ans);
}
```

- 算是一種`postorder traversal`
- 使用時機：
    - 當你知道`左右子結點的答案`時，你能得知`當前結點的答案`
- 例：二元樹的深度
    
    ```cpp
    int maximum_depth(TreeNode* root) 
    {
    	if (!root)    return 0;
    	int left_depth = maximum_depth(root->left);	
    	int right_depth = maximum_depth(root->right);
    	return max(left_depth, right_depth) + 1;
    }
    ```
    

### Deep first search

```cpp
procedure dfs(vertex v)
{
    mark v as visited

    for (each w adjacent to v) 
    {
        if (w 未訪問)    dfs(w)
    }
}
```

### Breadth-first Search

```cpp
procedure BFS(vertex s)
{
    create a queue Q
    enqueue s onto Q
    mark s as visited
    while (Q != empty) 
    {
        dequeue a vertex from Q into v
        for (each w adjacent to v) 
        {
            if ()w unvisited  
            {
                mark w as visited
                enqueue w onto Q       
            }
        }
    }
}
```

- 利用`佇列(Queue)`來處理
- 通常以`迴圈` (while + 1到2個for) 的方式呈現