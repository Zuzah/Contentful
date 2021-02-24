module.exports = function (migration) {
    const contentType = migration.editContentType('yourContentModel');
   
    /* Below are just some select examples of possible updates  */
    
    contentType.editField('aField').required(false); // make a field no longer required
    contentType.moveField('fieldOne').afterField('fieldOther'); // move a field relative to another
    contentType.changeFieldControl('someField', 'extension', 'some-contentful-ui-extension-id'); // apply an extension
    contentType.changeFieldControl('link', 'builtin', 'multipleLine'); // changes the field entry from a single line input to multi

}