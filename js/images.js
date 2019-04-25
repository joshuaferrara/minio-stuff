$(document).ready(() => {
    const imageList = document.querySelector('#images');

    // Load posts
    $.getJSON('http://localhost:3000/images', (images) => {
        images.forEach((image) => {
        $(imageList).append(`<li><img class="pic" src="${image.src}" ><p class="caption">  ${image.caption}</p></li>`);
      });
    });
});