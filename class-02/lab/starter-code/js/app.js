'use strict';

function Gallary(img_url, title, description, keyword, horns) {
    this.img_url = img_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
}

Gallary.prototype.render = function() {
    let imageSection = $('#photo-template').clone();
    $('main').append(imageSection);
    imageSection.find('h2').text(this.title);
    imageSection.find('img').attr('src', this.img_url);
    imageSection.find('p').text(this.description);
    let hornNumber = $('<h3></h3>').text(this.horns);
    imageSection.append(hornNumber);
    let selectSec = $('select').append($('<option>', {
        value: this.title,
        text: this.keyword
    }));
    $('select').on('change', function() {
        let value = $(this).val();
        console.log(value);

    });
};


function gettingImagesData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    console.log('i will use ajax'); //checked
    $.ajax('./data/page-1.json', ajaxSettings).then(data => {
        console.log('heres the data', data);

        data.forEach(element => {
            console.log(element);
            let newImages = new Gallary(element.image_url, element.title, element.description, element.keyword, element.horns);
            console.log(newImages);
            newImages.render();
        });
    });
}
$('document').ready(gettingImagesData);