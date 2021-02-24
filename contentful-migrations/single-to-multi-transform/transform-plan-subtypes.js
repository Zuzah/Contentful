const { program } = require('commander')
const { createClient } = require('contentful-management')
const PromisePool = require('es6-promise-pool')

async function transformEntry(environment, entry) {

  if (entry.isArchived()) {
    return
  }

  if (!entry.fields.hasOwnProperty('oldSingleTypeField') || entry.fields.oldSingleTypeField === undefined) {
    return
  }

  if (!entry.fields.hasOwnProperty('newMultiArrayTypeField')) {
    entry.fields.newMultiArrayTypeField = { 'en-CA': [] }
  }

  if (!('en-CA' in entry.fields.oldSingleTypeField)) {
    return
  }

  entry.fields.newMultiArrayTypeField['en-CA'] = [entry.fields.oldSingleTypeField['en-CA']]

  const isPublished = entry.isPublished()

  await entry.update().then(entry => {
    if (isPublished) {
      entry.publish()
    }
  })
    .catch(err => console.error(err))
}

const generatePromises = function * (environment, entries) {
  const startDate = new Date()
  let counter = 0
  for (const entry of entries) {
    counter++

    if (counter % 500 === 0) {
      const endDate = new Date()
      console.log(`${counter} records in ${(endDate.getTime() - startDate.getTime()) / 1000 / 60} minutes`)
    }

    yield transformEntry(environment, entry)
  }
}

async function run(options) {
  const { spaceId, environmentId, managementToken } = options

  const contentful = createClient({ accessToken: managementToken })
  const space = await contentful.getSpace(spaceId)
  const environment = await space.getEnvironment(environmentId)

  // Fetch all contentful entry ids
  const totalRecords = (await environment.getEntries({ content_type: 'targetContentModel', limit: 0 })).total
  const pageSize = 1000
  const pages = Math.ceil(totalRecords / pageSize)
  let entries = []
  let counter = 0

  while (counter < pages) {
    const skip = counter * pageSize;

    console.info(`Query ${counter + 1}: limit: ${pageSize}; skip: ${skip}`)
    const results = await environment.getEntries({ content_type: 'targetContentModel', limit: pageSize, skip: (counter * pageSize), order: 'sys.id' })
      .then(response => response.items)

    // Combine the arrays
    entries = [...entries, ...results]

    counter++
  }

  const promiseIterator = generatePromises(environment, entries)
  const pool = new PromisePool(promiseIterator, 5)

  pool.start()
    .then(() => console.log("Finished!"))

}

async function main() {
  program
    .requiredOption('-s, --space-id <space-id>', 'contentful space id')
    .requiredOption('-e, --environment-id <environment-id>', 'contentful environment id')
    .requiredOption('-t, --management-token <management-token>', 'contentful managemeent token')
    .action(run)

  await program.parseAsync(process.argv)
}

main()
  .catch(err => console.error(err))
