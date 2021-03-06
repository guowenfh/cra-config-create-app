import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'
import { renderRoutes } from 'react-router-config'
import { HashRouter as Router } from 'react-router-dom'
import routes from './common/router.js'

class Root extends Component {
  render() {
    return (
      <Router>
        {/* kick it all off with the root route */}
        {renderRoutes(routes)}
      </Router>
    )
  }
}
export default process.env.NODE_ENV === 'development' ? hot(Root) : Root
// export default Root
