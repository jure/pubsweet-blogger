import config from 'config'
import { Selector, t } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'

const login = {
  url: `${config.get('pubsweet-server.baseUrl')}/login`,

  username: Selector('form input[type=text]'),
  password: Selector('form input[type=password]'),
  submit: Selector('form button'),
  signUp: ReactSelector('Login')
    .findReact('Link')
    .withProps({ to: '/signup' }),
  resetPassword: ReactSelector('Login')
    .findReact('Link')
    .withProps({ to: '/password-reset' }),
  alert: Selector(() => document.querySelector('form').previousSibling),

  doLogin: (username, password) =>
    t
      .navigateTo(login.url)
      .typeText(login.username, username)
      .typeText(login.password, password)
      .click(login.submit),
}

export default login
