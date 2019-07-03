$(document).ready(function () {
  //HTML ELEMENTS
  var images = [];
  var keywords = [];
  let $gallaryEl = $('#gallary');
  let $dropdown = $('#filterID');
  let $filterBtn = $('#filterButton');
  //filter
  $filterBtn.on('click',function(){
    let drVal = $dropdown[0].value;
    $('#gallary').empty();
    let newImages = []
    images.forEach((el, i)=>{
      console.log(i);
      if(el.keyword === drVal){
        newImages.push(el);
      }

    })   
    newImages.forEach(image => {
      renderImages(image);
    });

  })
  var Image = function (image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    images.push(this);
  }
  function renderImages(image) {
    let $newSection = $('<section></section>');
    let $imageTemplate = $('.image').html();
    $newSection.html($imageTemplate);
    $newSection.find('h2').text(image.title)
    $newSection.find('img').attr({
      'src': image.image_url,
      'alt': image.description
    })
    $newSection.find('p').text(image.keyword)
    $newSection.find('h3').text(`horn count: ${image.horns}`)
    $gallaryEl.append($newSection);
  }
  Image.getImages = function () {
    $.get('./data/page-1.json', function (data) {
      $(data).each(
        function () {
          if (!(keywords.indexOf(this.keyword) > -1)) {
            keywords.push(this.keyword);
          }
          new Image(this.image_url, this.title, this.description, this.keyword, this.horns);
        }
      )
      keywords.forEach( keyword => {
        let $newOption = $('<option></option>');
        $newOption.attr('value', keyword);
        $newOption.text(keyword);
        $dropdown.append($newOption);
      })
      images.forEach(image => {
        renderImages(image);
      });

    });
  }
  Image.getImages();

  //



  //TODO: Stretch: Sort

});
