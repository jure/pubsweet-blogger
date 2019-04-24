import faker from 'faker'
import config from 'config'

import { startServer, setup } from './helpers/setup'
import mailHelper from './helpers/mail'
import { login, passwordReset, helloWorld } from './pageObjects'

let admin

fixture('Admin user')
  .page(passwordReset.url)
  .before(startServer)
  .beforeEach(async () => {
    const result = await setup()
    admin = result.userData
  })

test('Password reset journey', async t => {
  // start mail server
  mailHelper.start()

  // request password reset email
  await t
    .typeText(passwordReset.username, admin.username)
    .click(passwordReset.submit)
    .expect(passwordReset.alert.innerText)
    .contains('email has been sent')

  // extract reset URL from email content
  const mail = await mailHelper.nextEmail()

  const matchResult = mail
    .replace(/=3D/g, '=')
    .replace(/=\r?\n/g, '')
    .match(new RegExp(`${config.get('pubsweet-server.baseUrl')}\\S+`))
  if (!matchResult) throw new Error('URL not found in email')

  // set new password
  const newPass = faker.internet.password()
  await t
    .navigateTo(matchResult[0])
    .typeText(passwordReset.password, newPass)
    .click(passwordReset.submit)

  // login
  await login
    .doLogin(admin.username, newPass)
    .expect(helloWorld.text.innerText)
    .eql('Hello World!')
})
