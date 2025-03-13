# Docusaurus Changelog

## 1.1.0 (2025-03-12)

#### 好友系統

### :bug: 問題修復

- `Tab 4`
  - [#269] fix(tab 4): 在「新增好友」會看到自己的名字（但＠的編碼不同） [🔗](https://www.notion.so/1b23114ed6438102bd30d459334eee7b) ([@AidChen0509](https://github.com/AidChen0509)) [優先級: 最高]

#### 邀請函系統

### :bug: 問題修復

- `Tab 5`, `邀請函介面`
  - [#268] fix(tab 5): 編輯邀請函內文後發送邀請出去，但受邀者那端點開邀請函內文是沒有修改過的 [🔗](https://www.notion.so/1b23114ed643814e9f79ede9a2328372) ([@AidChen0509](https://github.com/AidChen0509)) [優先級: 最高]
  - [#248] fix(邀請函介面): 邀請函背面出現兩個「查看」按鈕 [🔗](https://www.notion.so/1b23114ed643811a8d67c8d22fde3f03) [優先級: 最高]
  - [#243] fix(邀請函介面): 邀請函顯示錯誤（外部連結） [🔗](https://www.notion.so/1b23114ed643819a8befc29ae5b42fdb) [優先級: 最高]
  - [#225] fix(邀請函介面): 「傳送邀請函連結」到不同瀏覽器呈現方式不一樣 [🔗](https://www.notion.so/1b23114ed64381428f4fdf100b093a7e) [優先級: 最高]

#### 行程創建

### :bug: 問題修復

- `Tab 2`
  - [#258] fix(tab 2): 建立行程 - Step 1 「加入地點」- 點擊從地圖加入後頁面，Search Bar、icon、地點縮圖中的內容、按鈕與設計稿皆不符。地點縮圖被覆蓋無法看到全貌。關鍵字搜尋的預設狀態誤植為查無結果 [🔗](https://www.notion.so/1b23114ed64381378614dc1025dda8d2) [優先級: 最高]
  - [#252] fix(tab 2): 建立行程 - 建立行程後回到 2.0a，無預設的圖片顯示（Step 2 選擇預設圖） [🔗](https://www.notion.so/1b23114ed643818db704c50bdb7deadc) [優先級: 最高]
  - [#235] fix(tab 2): 選擇行程時間後，回到上一頁，再點下一步，選好的時間就重置了 [🔗](https://www.notion.so/1b23114ed64381aab202e29df8278e8a) [優先級: 最高]

### :gear: 介面優化

- `Tab 2`
  - [#230] chore(tab 2): 建立行程第二步的「編輯首圖」下方「下一步」按鈕被遮擋一部分 [🔗](https://www.notion.so/1b23114ed643814e9880d0dbc3699f27) [優先級: 最高]
  - [#220] chore(tab 2): 建立行程 - Step 1 「行程名稱」輸入框 Placeholder 文字內容及文字大小錯誤 [🔗](https://www.notion.so/1b23114ed64381fba90eebcc0f8c6ed5) ([@94Peter](https://github.com/94Peter)) [優先級: 最高]

#### 地圖功能

### :bug: 問題修復

- `Tab 3`
  - [#245] fix(tab 3): 星星顯示錯誤變成鯨魚（應該為星星） [🔗](https://www.notion.so/1b23114ed64381649658c6a000684db3) [優先級: 最高]

#### 拍立得

### :bug: 問題修復

- `Tab 3`
  - [#231] fix(tab 3): 分享拍立得時，沒有帶入行程名稱 [🔗](https://www.notion.so/1b23114ed64381a3b399c37a5eaf9e4f) [優先級: 最高]

#### Committers: 2

- Peter Chen ([@94Peter](https://github.com/94Peter))
- Tommy Chang ([@AidChen0509](https://github.com/AidChen0509))

## 未指定版本 (2025-03-10)

#### 未分類功能

### :gear: 其他

- `Tab 1`, `Tab 2`, `Tab 3`, `Tab 4`, `訪客`
  - [#279] chore: 好友邀請的「婉拒」按鈕一直按一直有 (1)｛與Bug331相關｝ [🔗](https://www.notion.so/1b23114ed643812c951ec0d3306b0c19) [優先級: 待釐清：是否已經解決？, 高]
  - [#273] chore: 好友邀請通知不會消失 (1) [🔗](https://www.notion.so/1b23114ed6438138b729c52838ca6ac8) [優先級: 待釐清：是否已經解決？, 高]
  - [#259] chore: 查看朋友檔案時，朋友顯示有 100 人，與實際數字不符 [🔗](https://www.notion.so/1b23114ed64381a18505edc7fbb8cae3) [優先級: 最高]
  - [#256] chore: 邀請函「查看」按鈕上面有左右箭咀但無法點選按鈕 [🔗](https://www.notion.so/1b23114ed643812c9af7e9c881df9bf8) [優先級: 最高]
  - [#257] chore: 選擇好友篩選共同回憶後，共同回憶的按鈕狀態沒有改變，點開也沒有出現剛選擇的好友，且點擊其他 tab 再切回來後，篩選狀態就自動復原了 [🔗](https://www.notion.so/1b23114ed64381a3ac59f21b03ab9fec) [優先級: 最高]
  - [#255] chore: 建立行程 - Step 3 選擇日期時，點擊同一日期後日期消失 [🔗](https://www.notion.so/1b23114ed643810286b3ccb85b43248f) [優先級: 最高]
  - [#251] chore: 上傳拍立得之後無法顯任何照片（自己與夥伴） [🔗](https://www.notion.so/1b23114ed643819681bfc0736d272a2e) [優先級: 最高]
  - [#253] chore: 從 E1 往下滑至「重點公告區域」時交通版無「展開」按鈕，點擊一下至其他版後，再次點擊交通版，「展開」按鈕才出現 [🔗](https://www.notion.so/1b23114ed64381f2a099d7e520bf4f30) [優先級: 最高]
  - [#249] chore: 建立行程 - 設定 - 集合點、Google Map 縮圖、誰可以查看活動邀請區域文字內容不符 [🔗](https://www.notion.so/1b23114ed64381c0a527f803451ea7b0) [優先級: 最高]
  - [#250] chore: 建立回顧日誌時報名截止時間應刪除 [🔗](https://www.notion.so/1b23114ed64381eca7b8ea2ed0570742) [優先級: 最高]
  - [#246] chore: 建立行程 - 設定 - 缺失「成員邀請中」的狀態 [🔗](https://www.notion.so/1b23114ed64381da8862d9a92e5c3dbd) [優先級: 最高]
  - [#242] chore: 行程按「加入」自動加入，就算團主設只有受邀者可以加入 [🔗](https://www.notion.so/1b23114ed6438176b12fc51051da38c9) [優先級: 最高]
  - [#240] chore: 查看/編輯已建立行程 [🔗](https://www.notion.so/1b23114ed64381019a98ff50d4e15051) [優先級: 最高]
  - [#241] chore: 加入行程後，沒有退出行程的按鈕 [🔗](https://www.notion.so/1b23114ed643813d963ac1a2e1540c79) [優先級: 最高, 高]
  - [#239] chore: 團主建立行程後，若再次修改活動時間，則行程的「行程表」原有的資料有可能因時間不同而消失 [🔗](https://www.notion.so/1b23114ed6438149a963d24755f1fa75) [優先級: 最高]
  - [#237] chore: 建立行程 - Step 3 最後一步 loading 過久(後來等3分鐘都沒出現其他畫面) [🔗](https://www.notion.so/1b23114ed6438108b8e0c87ae675e891) [優先級: 最高]
  - [#236] chore: 人數上限 → 若創建時無填寫則為 0 人，但因按鈕判斷不足致使只有受邀請者才能參加、任何未受邀請的用戶皆無法按下按鈕 [🔗](https://www.notion.so/1b23114ed643818daa96c8d7ad5c5d4f) [優先級: 最高]
  - [#238] chore: 建立行程 - 設定 - 集合點、Google Map 縮圖、誰可以查看活動邀請區域文字內容不符 [🔗](https://www.notion.so/1b23114ed64381f5b2a6c836fb93a5c5) [優先級: 最高]
  - [#234] chore: 記帳本若新增了空白的欄位，儲存編輯後應像行程的空白欄位一樣處理而不顯示 [🔗](https://www.notion.so/1b23114ed64381d39aa0cf9475a316e8) [優先級: 最高]
  - [#232] chore: 在上傳拍立得頁面，底部的「完成」按鈕在 disabled 狀態下點擊會變灰色 [🔗](https://www.notion.so/1b23114ed64381a38edec0bb26f8e03c) [優先級: 最高]
  - [#229] chore: 加入行程後，沒有退出行程的按鈕 [🔗](https://www.notion.so/1b23114ed643814db20ee76f7cb62a99) [優先級: 最高]
  - [#228] chore: 查看地標在澎湖的回顧日誌時，地圖上看不到拍立得，若向左移動地圖，會出現錯誤頁面並自動重整 [🔗](https://www.notion.so/1b23114ed64381f4b3dbf82ee6dc0677) [優先級: 最高]
  - [#227] chore: 點擊查看與好友的星空地圖—頭像無法顯示 [🔗](https://www.notion.so/1b23114ed64381a69b94d617d33ccefd) [優先級: 最高]
  - [#226] chore: 建立行程 - 設定 - 缺失刪除成員按鈕 [🔗](https://www.notion.so/1b23114ed64381f99e26cb2b9ede3524) [優先級: 最高]
  - [#224] chore: 無法貼上相簿連結 [🔗](https://www.notion.so/1b23114ed64381119065c736329713ba) [優先級: 最高]
  - [#221] chore: 邀請函字數不該可超過 50 字，行數也不該能超出邀請函範圍 [🔗](https://www.notion.so/1b23114ed643811086ccc9744e1415d9) [優先級: 最高]
  - [#223] chore: 設定行程時間，拉出選項範圍時，畫面突然白屏 [🔗](https://www.notion.so/1b23114ed64381aa80a8c224843a4fc9) [優先級: 最高]
  - [#222] chore: 修改行程時間，拉出選項範圍時，文字會出現 “{時間} undefined” [🔗](https://www.notion.so/1b23114ed64381e79bdad0f6c2b2ae3b) [優先級: 最高]
  - [#218] chore: Line或瀏覽器桌面捷徑中的OOSA縮圖置換 [🔗](https://www.notion.so/1b23114ed64381b7a80ad9abdf5cc0aa) [優先級: 最高]
  - [#215] chore: 建立行程 - Step 1 「行程名稱」輸入框 Placeholder 文字內容及文字大小錯誤 (1) [🔗](https://www.notion.so/1b23114ed6438191b29cc922d1ffabb0) [優先級: 最高]
  - [#211] chore: tab3「切換地區」地圖載入過久 (1) [🔗](https://www.notion.so/1b23114ed64381e9aa71d16fe31e3828) [優先級: 最高]
  - [#207] chore: 行程留言板沒有「發送」的按鈕 (1) [🔗](https://www.notion.so/1b23114ed64381e3a331d0931bebaaab) [優先級: 最高]
  - [#197] chore: 確認好友邀請後，訊息不會消失，而是會一直存在，並且可以隨時「婉拒」刪除 (1) [🔗](https://www.notion.so/1b23114ed6438192bdfec809b82fa099) [優先級: 最高]
  - [#196] chore: Tab1 功能調整為建置中頁面 (1) [🔗](https://www.notion.so/1b23114ed64381c2ae5bc9ea2a283163) [優先級: 最高]
  - [#131] chore(tab 1): 關鍵字搜尋 - 點擊搜尋框，輸入搜尋結果時，右上方的「建立野放點」及「儲存清單」按鈕未隱藏 [🔗](https://www.notion.so/1b23114ed64381b5a391d2fad37440dc) [優先級: 最高]
  - [#12] chore(tab 2): 行程名稱格式『輸入錯誤訊息』 (1) [🔗](https://www.notion.so/1b23114ed6438176bfaefcae7e643f76) [優先級: 最高]
  - [#7] chore(tab 3): 移動畫面時會有黑頻閃爍的情形 [🔗](https://www.notion.so/1b23114ed643819ca009e920bb5a677f) [優先級: 最高]
  - [#8] chore(tab 1): 日期篩選 - 點擊重置按鈕後自動收合日期篩選器 [🔗](https://www.notion.so/1b23114ed64381b9a4bee1a2b8d5d67d) [優先級: 最高]
  - [#4] chore(tab 4): 「公益」和「小舖」按鈕樣式應 Disabled [🔗](https://www.notion.so/1b23114ed64381b59b15cff5d4761788) [優先級: 最高]
  - [#3] chore(tab 2): 關鍵字搜尋 - 當搜尋框內有內容時，Search Bar 最右方顯示「Ｘ」按鈕，點擊後清除所有搜尋結果及搜尋框內的內容 [🔗](https://www.notion.so/1b23114ed64381d59705cfe50f5b46ca) [優先級: 最高]
  - [#2] chore(訪客): 訪客模式需求檢核（根據訪客模式需求檔案） (1) [🔗](https://www.notion.so/1b23114ed64381d7a167c1bc22ae2947) [優先級: 最高, 高]

