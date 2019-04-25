$(document).ready(() => {
  'use strict';

  var endpoint = new AWS.Endpoint('http://localhost:9000/images');
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AIDXHWUSV1UDVNJY8J77',
    secretAccessKey: 'XyTTxdpU+IcaH+F0UOLBnDRPKbpLnMls7Gk6dOP2',
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
