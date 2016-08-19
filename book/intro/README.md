在這次練習中各自所扮演的角色如下：

* Model: 資料庫的結構，將定義 User 所擁有的欄位
* Service: 一旦定義好 Model 我們可以將 Model 的操作，包成一個個 Service 方便重覆使用，主要商業邏輯實作上也會在這一層
* Controller: 作為 API 或是 view 的接口，專職接收資料後，將 Input 傳入 Service 處理，再將 Service 處理過後的 Output 回傳給 API 呼叫者。
* View: 作為前端呈現，在 UI 部分將根據 Controller 回傳的資料進行顯示，專職於畫面呈現。

根據上面的 MVCS 我們要進行練習的步驟如下，在最後的驗證步驟前，請試著只用

`npm test`

進行相關程式碼的驗證，在一開始運行 `npm test` 將會看到所有測試將會 fail 如下

```
對 User Controller 進行使用者驗證
  1) 透過 email 以及 password 確認使用者確實存在

對 User Model 進行使用者驗證
  2) 透過 email 以及 password 確認使用者確實存在

對 User Service 進行使用者驗證
  3) 透過 email 以及 password 確認使用者確實存在


0 passing (2s)
3 failing
```

我們要做的就是讓上沒辦法通過的測試能夠完成，並且完成 Login 功能
