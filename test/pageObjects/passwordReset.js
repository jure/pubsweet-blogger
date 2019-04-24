import config from 'config'
import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'

const passwordReset = {
  url: `${config.get('pubsweet-server.baseUrl')}/password-reset`,

  title: Selector('h1'),

  username: Selector('form input[type=text]'),
  password: Selector('form input[type=password]'),
  submit: Selector('form button'),

  alert: ReactSelector('PasswordReset styled.div'),
}

export default passwordReset
