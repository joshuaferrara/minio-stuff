class UploadForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="uploadform">
      <form name="upload">
          <h1>Upload Image</h1>
          Enter a caption: <input id="captionTxt" type="text"></input><br><br>
          Select File: <input id="fileInput" type="file"></input><br><br>
          <input id="submitBtn" type="submit" value="Upload Image"></input><br>
      </form>
    </div>`;
  }
}

customElements.define('upload-form', UploadForm);

$(document).ready(() => {
  'use strict';


  var endpoint = new AWS.Endpoint('http://localhost:9000/images');
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'CMCN6J2V7TR7UBBT7W3S',
    secretAccessKey: 'kyZujbWojNIdPmdJ0ZmJWf+TveGEgnXXazKm0y3+',
    sslEnabled: false
  });

  var s3 = new AWS.S3({
    endpoint: endpoint,
    params: {
      Bucket: 'images',
      s3ForcePathStyle: false,
      s3BucketEndpoint: true
    }
  });

  $('#submitBtn').click((event) => {
    event.preventDefault();

    const caption = $('#captionTxt').val();
    const file = $('#fileInput')[0].files[0];

    s3.upload({
      Key: file.name,
      Body: file,
      ACL: 'public-read'
    }, function (err, data) {
      if (err) {
        return alert('There was an error uploading your photo: ', err.message);
      }
      $.post('http://localhost:3000/images', {
        'src': `http://localhost:9000/images/${file.name}`,
        'caption': caption
      }, (err, result, body) => {
        window.location = 'http://localhost:8000/images.html';
      });
    });
  });
});

