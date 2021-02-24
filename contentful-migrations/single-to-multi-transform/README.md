# Transport Data from Single type to Multi/Array Type Script

The purpose of this script is to address the situation of migrating the content data from a field of 'single' type to a multi-type 'array'. This be needed in the event:
    - a content model was previously created as a 'single' link type
    - the original content model now already has 100s of rows of data reside in the 'single' link type
    - the content model is now going to be changed from a 'single' to 'multi' which requires you to then port the data

# Dependencies

Install the following

npm install --save es6-promise-pool
npm install --save csv-parse
npm install --save contentful-management
