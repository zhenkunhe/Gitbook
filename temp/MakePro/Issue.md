# 1 分詞

## 1-1 單詞切割
```mermaid
graph LR
  A(無分割句子) -->|模型+lang team| B(Result)
  B -->|grammar| C(X)
```

## 1-2 單詞發音： 1234聲
```mermaid
graph LR
  A(Siri) -->|音不對| B{替換字對應表}
  B -->|無法對應| D[自己錄 + 新欄位]
  B -->|可以對應| E[Good]
```
- TTS (X 不考慮online)
> ML -> 句子 -> 切割

## 1-3 單詞發音： 破音字
```mermaid
graph LR
  A(Siri) -->|音不對| B{替換字對應表}
  B -->|無法對應| D[自己錄 + 新欄位]
  B -->|可以對應| E[Good]
```
- TTS (X 不考慮online)
> ML -> 句子 -> 切割

# 2 字典 (open source)
- Word Definition <-> 1-1 單詞切割
- Online or Offline

# 3 API調整
