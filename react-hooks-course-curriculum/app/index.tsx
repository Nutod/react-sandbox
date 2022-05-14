import React from 'react'
import ReactDOM from 'react-dom'
import Provider from './provider'
import { App } from './app'

ReactDOM.render(<Provider>
   <App />
</Provider>, document.getElementById('app'))
