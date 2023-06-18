import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import App from './App'

const checkRootElem = document.getElementById('root')

if(checkRootElem){
  const root = ReactDOM.createRoot(checkRootElem)
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  )
}

