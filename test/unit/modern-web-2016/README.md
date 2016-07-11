# modern web 2016：15 分鐘快速體驗 TDD，以使用者登入功能為例

## 使用者登入需求描述

使用者可以透過電子郵件，並且需要輸入密碼，完成登入的功能，確保個人資料能被保護


## 練習目標

期望透過此練習，讓大家體驗 TDD 實施的要領，經由單純的使用者登入功能實作引領大家完成第一個 TDD。

## 練習方式

使用 [Sails.js (MVC Framework for Node.js)](http://sailsjs.org/) 作為此次練習的框架，Sails 為 MVCS（Model, View, Controller, Service）架構，是 MVC 的延伸，分層的好處除了程式碼責任清楚之外，也利於分工，在 test 撰寫上，也較能清楚切分驗證範圍。

![](./mvcs.png)

在這次練習中各自所扮演的角色如下：

* Model: 資料庫的結構，將定義 User 所擁有的欄位
* Service: 一旦定義好 Model 我們可以將 Model 的操作，包成一個個 Service 方便重覆使用，主要商業邏輯實作上也會在這一層
* Controller: 作為 API 或是 view 的接口，專職接收資料後，將 Input 傳入 Service 處理，再將 Service 處理過後的 Output 回傳給 API 呼叫者。
* View: 作為前端呈現，在 UI 部分將根據 Controller 回傳的資料進行顯示，專職於畫面呈現。

## 練習步驟

根據上面的 MVCS 我們要進行練習的步驟如下

1. 使用 Model 進行 Login 使用者驗證
2. 將 Model 所完成的 Login 邏輯，用 Service 包裝
3. 使用 Controller 呼叫 Service 所完成的 Login 驗證函式，並且將驗證結果回傳
4. View 根據 Controller 的定義將 login 資料傳入，並且顯示處理結果
