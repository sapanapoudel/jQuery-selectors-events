$(document).ready(function () {
  //HTML ELEMENTS
  var images = [];
  var keywords = [];
  let $gallaryEl = $('#gallary');
  let $dropdown = $('#filterID');
  let $filterBtn = $('#filterButton');
  //filter
  $filterBtn.on('click', function () {
    let drVal = $dropdown[0].value;
    $('#gallary').empty();
    let newImages = []
    images.forEach((el) => {
      if (el.keyword === drVal) {
        newImages.push(el);
      }
    })
    newImages.forEach(image => {
      renderImages(image);
    });

  })
  var Image = function (image_url, title, description, keyword, horns, page) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    this.page = page;
    images.push(this);
  }
  function renderImages(image) {
    const source = $('#template').html();
    const template = Handlebars.compile(source);
    const context = image;
    const newHtml = template(context);
    $gallaryEl.append(newHtml);
  }
  Image.getImages = function () {
    $.get('./data/page-1.json', function (data) {
      handleData(data, 1)
    });

  }
  // function hidePage(targetPage) {
  //   if (targetPage === 1) {

  //     $('.1').each(
  //       function () {
  //         $(this).hide()
  //       })
  //     $('.2').each(
  //       function () {
  //         $(this).show()
  //       })
  //   } else {
  //     $('.2').each(
  //       function () {
  //         $(this).hide();
  //       }
  //     )
  //     $('.1').each(
  //       function () {
  //         $(this).show();
  //       }
  //     )
  //   }
  // }
  function handleData(data, page) {
    images = [];
    $gallaryEl.children().each(
      function(){
        this.remove();
      }
    )
    keywords=[];
    $(data).each(
      function () {
        if (!(keywords.indexOf(this.keyword) > -1)) {
          keywords.push(this.keyword);
        }
        new Image(this.image_url, this.title, this.description, this.keyword, this.horns, this.page = page);
      }
    )
    $dropdown.html('');
    keywords.forEach(keyword => {
      let $newOption = $('<option></option>');
      $newOption.attr('value', keyword);
      $newOption.text(keyword);
      $dropdown.append($newOption);

    })
    images.forEach(image => {
      renderImages(image);
    });
  }
  Image.getImages();

  $('#show1').on('click', function () {
    $.get('./data/page-1.json', function (data) {
      handleData(data, 1)
    });
  })

  $('#show2').on('click', function () {
    $.get('./data/page-2.json', function (data) {
      handleData(data, 1)
    });
  })
  $('#sortHorns').on('click', function(){
    $gallaryEl.children().each(
      function(){
        this.remove();
      })
    images.sort( (a,b)=>{
      console.log(a.horns -b.horns)
      return a.horns -b.horns;
    })
    images.forEach(image => {
      renderImages(image);
    });
  })
  $('#sortName').on('click', function(){
    $gallaryEl.children().each(
      function(){
        this.remove();
      })
    images.sort((a,b)=>{
      let aName = a.title;
      let bName = b.title;
      if (aName < bName){
        return -1
      } else if (aName > bName){
        return 1
      } else {
        return 0;
      }
      
    })
    images.forEach(image => {
      renderImages(image);
    });
  })

});
