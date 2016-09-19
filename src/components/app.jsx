import React, {Component} from 'react'
import {Router, Route, Link} from 'react-router'
import Header from 'components/partials/Header'
import Footer from 'components/partials/Footer'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="main-wrapper">
          <Header/>
          <section className="main-content">
            <div className="container container1">
              <div className="row">
                {this.props.children}
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
