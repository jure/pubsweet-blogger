import faker from 'faker'
import start from 'pubsweet/src/startup/start'
import { addUser, createTables } from '@pubsweet/db-manager'

let server

export async function startServer() {
  if (!server) {
    server = await start()
  }
}

export async function setup(user, collection) {
  await createTables(true)

  const userData = user || {
    username: faker.internet.domainWord(),
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
    admin: true,
  }

  await addUser(userData)
  return { userData }
}
