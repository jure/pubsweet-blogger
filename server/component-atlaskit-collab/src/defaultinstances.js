const { defaultSchema: schema } = require('@atlaskit/adf-schema')

const $node = (type, attrs, content, marks) =>
  schema.node(type, attrs, content, marks)
const $text = (str, marks) => schema.text(str, marks)
const em = schema.marks.em.create()

function populateDefaultInstances(newInstance) {
  newInstance(
    'Example',
    $node('doc', null, [
      $node('heading', { level: 2 }, [$text('Example Document')]),
      $node('paragraph', null, [
        $text('There is nothing here yet. '),
        $text('Add something!', [em]),
      ]),
    ]),
  )
}
exports.populateDefaultInstances = populateDefaultInstances
