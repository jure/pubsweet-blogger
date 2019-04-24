#!/usr/bin/env node

const logger = require('@pubsweet/logger')
const { Collection, User } = require('@pubsweet/models')
const { setupDb } = require('@pubsweet/db-manager')

const seed = async () => {
  await setupDb({
    username: 'admin',
    password: 'password',
    email: 'admin@example.com',
    admin: true,
    clobber: true,
  })

  const user = await new User({
    username: 'john',
    email: 'john@example.com',
    password: 'johnjohn',
  }).save()

  const collection = new Collection({
    title: 'My Blog',
    owners: [user.id],
  })

  await collection.save()

  logger.info('Seeding complete. Kill this script with Ctrl-C.')
}

seed()
