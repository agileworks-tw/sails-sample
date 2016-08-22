# Modern Web 2016：Backend Testing Dojo

撰寫 Test 測試程式，到底是減輕工作還是帶來更多負擔？Backend Testing Dojo 將透過實作常見的 Login 登入功能，讓大家在短時間內瞭解前後端開發的工作，如何實現測試驅動（TDD）開發方式，進行分工並且準確完成實作，以及更快速進行整合測試，利用測試在開發過程中累積能量。

## 練習目標

期望透過此練習，讓大家體驗 TDD 實施的要領，經由單純的使用者登入功能實作引領大家完成第一個 TDD。

## 練習情境

使用者可以透過電子郵件，並且需要輸入密碼，完成登入的功能，確保個人資料能被保護

## 練習方式

使用 [Sails.js (MVC Framework for Node.js)](http://sailsjs.org/) 作為此次練習的框架，Sails 為 MVCS（Model, View, Controller, Service）架構，是 MVC 的延伸，分層的好處除了程式碼責任清楚之外，也利於分工，在 test 撰寫上，也較能清楚切分驗證範圍。

![](./mvcs.png)
