$(document).ready(() => {
  const imageList = document.querySelector('#images');

  // Load posts
  $.getJSON('http://localhost:3000/images', (images) => {
    const fragment = document.getElementById('image-template');
    images.forEach((image) => {
      const instance = document.importNode(fragment.content, true);
      instance.querySelector('.pic').setAttribute("src", image.src);
      instance.querySelector('.caption').innerHTML = image.caption;
      document.getElementById('images').appendChild(instance);
    });
  });
});
