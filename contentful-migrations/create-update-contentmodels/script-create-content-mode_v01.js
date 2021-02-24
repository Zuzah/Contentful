module.exports = function (migration) {

    const contentType = migration.createContentType('yourNewContentModel', {
        "name": "Your New Content Model",
        "displayField": "uniqueID",
        "description": "",
    })

    contentType.createField('name', {
        "name": "Name",
        "type": "Symbol",
        "localized": false,
        "required": true,
        "validations": [{
            "unique": true
        }],
        "disabled": false,
        "omitted": false
    })

    contentType.createField('uniqueID', {
        "name": "Unique ID",
        "type": "Symbol",
        "localized": false,
        "required": true,
        "validations": [{
            "unique": true
        }, {
            "regexp": {
                "pattern": "^[A-Z0-9]+$",
                "flags": null
            },
            "message": "ID can only contain uppercase alpha chars (A - Z) and numbers (0 - 9)"
        }],
        "disabled": false,
        "omitted": false
    })

    contentType.createField('fieldOnes', {
        "name": "Field Ones",
        "type": "Array",
        "localized": false,
        "required": true,
        "validations": [],
        "disabled": false,
        "omitted": false,
        "items": {
            "type": "Link",
            "validations": [{
                "linkContentType": ["fieldOne"]
            }],
            "linkType": "Entry"
        }
    })

    contentType.createField('fieldTwos', {
        "name": "Field Twos",
        "type": "Array",
        "localized": false,
        "required": true,
        "validations": [],
        "disabled": false,
        "omitted": false,
        "items": {
            "type": "Link",
            "validations": [{
                "linkContentType": ["fieldTwo"]
            }],
            "linkType": "Entry"
        }
    })

    contentType.createField('fieldThrees', {
        "name": "Field Threes",
        "type": "Array",
        "localized": false,
        "required": true,
        "validations": [],
        "disabled": false,
        "omitted": false,
        "items": {
            "type": "Link",
            "validations": [{
                "linkContentType": ["fieldThree"]
            }],
            "linkType": "Entry"
        }
    })

    // Add help text
    contentType.changeFieldControl('name', 'builtin', 'singleLine', {
        helpText: 'A text to help user to understand'
    })

    // Perform this to ensure now warning label on LinkType
    contentType.changeFieldControl('fieldOnes', 'builtin', 'entryLinksEditor', {
        showCreateEntityAction: false,
        showLinkEntityAction: true
    })

    // Perform this to ensure now warning label on LinkType
    contentType.changeFieldControl('fieldTwos', 'builtin', 'entryLinksEditor', {
        showCreateEntityAction: false,
        showLinkEntityAction: true
    })

    // Perform this to ensure now warning label on LinkType
    contentType.changeFieldControl('fieldThrees', 'builtin', 'entryLinksEditor', {
        showCreateEntityAction: false,
        showLinkEntityAction: true
    })


}