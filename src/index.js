import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import { LocaleProvider, notification } from 'antd'
import zh from 'antd/lib/locale-provider/zh_CN'
import Router from './router'
import * as serviceWorker from './serviceWorker'
notification.config({
  duration: 2,
  maxCount: 1
})

ReactDOM.render(
  <LocaleProvider locale={zh}>
    <Router />
  </LocaleProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
