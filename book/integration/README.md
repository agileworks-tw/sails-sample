## 整合

運行 `npm test` 將會看到

```
對 User Controller 進行使用者驗證
  ✓ 透過 email 以及 password 確認使用者確實存在 (346ms)

對 User Model 進行使用者驗證
  ✓ 透過 email 以及 password 確認使用者確實存在

對 User Service 進行使用者驗證
  ✓ 透過 email 以及 password 確認使用者確實存在


3 passing (1s)
```

接著

`npm start`

開啟瀏覽器進入網站 `http://localhost:1337/login`

輸入：

* email: user@gmail.com
* password: user

可以正確登入，完成透過 TDD 進行 Login 功能實作體驗！
