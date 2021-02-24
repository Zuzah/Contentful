module.exports = function (migration) {

// This differs from v1 script in the stucture of the file

const yourNewContentModel = migration.editContentType('yourNewContentModel', {
    name: 'Your Content Model',
    description: '',
    displayField: 'Id'
   })

  
   yourNewContentModel.createField('fieldOnes', {
    name: "Field One",
    type: "Array",
    required: false,
    localized: false,
    validations: [],
    disabled: false,
    omitted: false,
    deleted: false,
    items: {
      type: "Link",
      validations: [{ linkContentType: ["fieldOne"] }],
      linkType: "Entry"
    }
   });

}