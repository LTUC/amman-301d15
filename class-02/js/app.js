'use strict';

function Image(image_url,title,description,keyword,horns) {
    this.image_url = image_url;
    this.title = title ;
    this.description =description ;
    this.keyword = keyword ;
    this .horns  = horns ;

}

Image.prototype.render = function() {
    let imgSection = $('#photo-template').clone();
    $('main').append(imgSection);

    let list = $('<option></option>').text(this.keyword);
    $('select').append(list);
    imgSection.find('h2').text(this.title);
    imgSection.find('img').attr('src', this.image_url);
    imgSection.find('p').text(this.description);
    imgSection.removeAttr('id');
    imgSection.attr('class', this.keyword);

}

$('select').on('change', function () {
    let selecList = this.value;
    $('div').hide();
    $(`.${selecList}`).show();
  })
  





function getImageData() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
 
    $.ajax('./data/page-1.json', ajaxSettings).then(data=> { 
        data.forEach(element=> {
            let imgObj = new Image(element.image_url, element.title ,element.description,element.keyword,element.horns);
            imgObj.render();
        });
        
    })
}
$('document').ready(getImageData);   


























  