import { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import { withRouter } from 'next/router'
import App from 'next/app'

import createStore from 'store/createStore'
import theme from 'theme'
import Page from '../src/components/Page'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Backdrop, CircularProgress } from '@material-ui/core'

class MyApp extends App {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      isNumber : 0,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading : false,
      })
    }, 1000)
  }

  render () {
    const { Component, pageProps, router, store } = this.props
    const title = 'ASA FARMA'
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta property='og:title' content={title} />
          <meta name="theme-color" content="#f0ad4e" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            {this.state.isLoading ? (
              <div className="bg-warning" style={{position: 'fixed', width: '100%', height: '100%', }}>
                  <div className="row align-items-center h-100">
                      <div className="col-12 text-center text-white mx-auto">
                          <h1>
                            <img src='/static/UI/assets/logo.png' width={250} />
                          </h1>
                          <CircularProgress className="text-white" />
                      </div>
                  </div>
              </div>
            ) : (
              window.location.pathname === '/auth/login' ? (
                <Component router={router} {...pageProps} />
              ) : (
                <Page>
                  <Component router={router} {...pageProps} />
                </Page>
              )
            )}
          </Provider>
        </ThemeProvider>
      </>
    )
  }
}

export default withRedux(createStore)(
  withRouter(MyApp)
)
