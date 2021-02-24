import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';

const JsonEditor = ({ sdk }) => {
  const ref = React.createRef();

  const [value, setValue] = useState(sdk.field.getValue() || {});
  const [detachExternalChangeHandler, setDetachExternalChangeHandler] = useState(null);
  const [jsonEditor, setJSONEditor] = useState(null);

  useEffect(() => {
    const onExternalChange = value => {
      setValue(value);
    };

    const initializeEditor = editorRef => {
      const watcherCallback = () => {
        sdk.window.updateHeight();
        validateAndSave(editorRef);
      };

      Object.keys(editorRef.editors).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(editorRef.editors, key) && key !== 'root') {
          editorRef.watch(key, watcherCallback.bind(editorRef, key));
        }
      });
    };

    // Validate/Save on Contentful
    const validateAndSave = _debounce((editorReference) => {
      const errors = editorReference.validate();
      if (errors && Array.isArray(errors) && !errors.length) {
        sdk.field.setValue(editorReference.getValue());
      } else {
        
          // error is an array: `path`, `property`, and `message` parameter
          const error = errors.find(element => element.path !== 'root');

          // notify of the error
          if (error && error.length) {
            sdk.notifier.error(`${error.path}: ${error.message}`);
          }
          
      }
    }, 150);

    // Define the jsonEditor data and properties
    const createEditor = () => {

      var contentfulFieldID = sdk.field.id; // determine the current FieldID on Contentful
   
      /* 
        The following block of code will utilize a specific json schema based on the contentfulID it detects

        Note to Developers: After making your json schema in /schema, you can add an additional IF statement to use it
      
      */

      // TODO: Also have a check against 'content model' in addition to field
  
      // If fieldID is 'fieldOne'
      if ((contentfulFieldID === "fieldOne")) {
          // Then apply the following schema
          window.CONTENTFUL_FORM_EDITOR_SCHEMA  = require('../schema/sampleSchema.json');
      }

      // If YOUR-NEW-FIELD  field
      //if ((contentfulFieldID ===  'YOUR-NEW-FIELD')) {
      //    window.CONTENTFUL_FORM_EDITOR_SCHEMA  = require('../schemas/YOUR-NEW-SCHEMA.json');
      //}
      
      try {
          
        const editorRef = new JSONEditor(ref.current, { // eslint-disable-line no-undef
            compact: false,
            disable_array_add: false,
            disable_array_delete: false,
            disable_array_reorder: false,
            enable_array_copy: false,
            disable_collapse: true,
            disable_edit_json: true,
            disable_properties: true,
            array_controls_top: true,
            disable_array_delete_all_rows: true,
            disable_array_delete_last_row: true,
            form_name_root: 'root',
            format: 'grid',
            theme: 'html', // html | tailwind | bootstrap. Must set format to 'grid'
            iconlib: 'spectre',
            remove_button_labels: false,
            no_additional_properties: false,
            required_by_default: false,
            keep_oneof_values: true,
            schema: window.CONTENTFUL_FORM_EDITOR_SCHEMA,
            show_errors: 'interaction', // interaction | change | always | never
            startval: value,
            template: 'default',
            display_required_only: false,
            show_opt_in: true,
            prompt_before_delete: false,
            object_layout: 'table',
            plugin: {
            selectize: true,
            },
        });

        // Note: only used if ajax property set above. Used for fetching an external schema via url
        editorRef.on('ready', () => {
            // set the json data value
            initializeEditor(editorRef);
        });

        // event is fired whenever the editor's value changes
        editorRef.on('change', () => {
            // set the json data value
            initializeEditor(editorRef);
            
        });

        // event is fired whenever the editor's value is deleted
        editorRef.on('deleteRow', () => {
            // set the json data value
            validateAndSave(editorRef);
            
        });


        return editorRef;
        } catch (error) {
            // For developers to examine errors
            console.error(error.message);
        }
    
    };

    sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    if (!detachExternalChangeHandler) {
      setDetachExternalChangeHandler(sdk.field.onValueChanged(onExternalChange));
    }

    if (ref && !jsonEditor) {
      setJSONEditor(createEditor());
    }

    return function cleanup() {
      if (detachExternalChangeHandler) detachExternalChangeHandler();

      if (jsonEditor) {
        jsonEditor.destroy();
        setJSONEditor(null);
      }
    };
  }, [detachExternalChangeHandler, jsonEditor, ref, sdk.field, sdk.notifier, sdk.parameters,
    sdk.window, value]);

  return <div ref={ref} />;
}

JsonEditor.propTypes = {
  sdk: PropTypes.object.isRequired
};

export default JsonEditor;