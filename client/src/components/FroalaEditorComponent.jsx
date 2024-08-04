import React from 'react';
// import FroalaEditor from 'PATH_TO_THE_SDK/lib/froalaEditor.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

// CSS Files
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

//Editor Plugins
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/plugins/image.min.css'


const CustomFroalaEditor = ({content, setContent}) => {
    const config = {
      placeholderText: 'Start typing...',
      
      heightMin: 300, // Minimum height of the editor
      heightMax: 500, // Maximum height of the editor
      width: '100%', // Full width of the container
  
      // Image upload URL
      imageUploadURL: 'http://127.0.0.1:4000/upload_image',
  
      // Image default width and height
      imageDefaultWidth: 500,
      imageDefaultHeight: 350,
  
      // Customizing toolbar buttons
      toolbarButtons: [
        'bold', 'italic', 'underline', 'strikeThrough',
        'formatOL', 'formatUL',
        'insertLink', 'insertImage', '|',
        'undo', 'redo'
      ],
  
      // Image styling options
      imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove'],
  
      // Additional events for better control
      events: {
        'image.uploaded': function (response) {
          // Image was uploaded to the server.
          console.log('Image uploaded:', response);
        },
        'image.inserted': function ($img, response) {
          // Image was inserted into the editor.
          console.log('Image inserted:', $img, response);
        },
        'image.replaced': function ($img, response) {
          // Image was replaced in the editor.
          console.log('Image replaced:', $img, response);
        },
        'image.error': function (error, response) {
          // Handle image upload errors.
          console.error('Image upload error:', error, response);
        },
      },
    }
  

  return (
    <FroalaEditorComponent
      tag="textarea"
      config={config}
      model={content}
      onModelChange={setContent}
    />
  );
};

export default CustomFroalaEditor;
