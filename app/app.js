import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

import { Root } from 'pubsweet-client'

import theme from '@pubsweet/coko-theme'

import { createBrowserHistory } from 'history'
import routes from './routes'

const history = createBrowserHistory()

const rootEl = document.getElementById('root')

ReactDOM.render(
  <Root history={history} routes={routes} theme={theme} />,
  rootEl,
)

export default hot(module)(Root)
