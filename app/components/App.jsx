import React from 'react'
import PropTypes from 'prop-types'

const App = ({ children, ...props }) => <div>{children}</div>

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
