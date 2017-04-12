$(document).ready(function(){
$('.quote-btn').click(function(){
$.ajax({
type : 'post',
url : '/quote/new',
dataType : 'json',
success : function(res){
response = JSON.parse(res);
console.log('-----res: '+response.quote);
console.log('-----res: '+response.author);
$('.quote').html((response.quote));
$('.author').html((response.author));
}
});
});
});

var sourcesList = [];

$(document).ready(function(){
$.ajax({
type : 'get',
url : '/news/getsources',
dataType : 'json',
success : function(res){
response = JSON.parse(res);

for (var i = 0; i < response.sources.length; i++) {
  $('#sources').append($('<option>', {
    value: response.sources[i].id,
    text: response.sources[i].name
  }));
}
}
});

  $('#sources').change(function(){
      if($('#sources').val()!=""){
        $('.show-news').html("");
        $('.show-news').addClass('loader');
        $.ajax({
          type : 'post',
          data : {
              'source' : $('#sources').val()
          },
          url : '/news/getnewsbysouces',
          dataType : 'json',
          success : function(res){
            response = JSON.parse(res);
            console.log(response);
            var container = '';
            for (var i = 0; i < response.articles.length; i++) {
              container +="<div class='col-md-6'>"+
              "<h3 class='title'>"+response.articles[i].title+"</h3>"+
              "<img class='img-size' src='"+response.articles[i].urlToImage+"'></img>"+
              "<p class=''>"+response.articles[i].description+"</p>"+
              "<p class='col-md-3'><a target='_blank' href='"+response.articles[i].url+"'>More info</a></p>"+
              "</div>";
            }
            $('.show-news').removeClass('loader');
            $('.show-news').html(container);

          }
        });
      }
  });

  $('#sourceshandle').change(function(){
      if($('#sourceshandle').val()!=""){
        $('.show-news').html("");
        $('.show-news').addClass('loader');
        $.ajax({
          type : 'post',
          data : {
              'source' : $('#sourceshandle').val()
          },
          url : '/news/getnewsbysouces',
          dataType : 'json',
          success : function(res){
            response = JSON.parse(res);
            console.log(response);
            var container = '';
            for (var i = 0; i < response.articles.length; i++) {
              container +="<div class='col-md-6'>"+
              "<h3 class='title'>"+response.articles[i].title+"</h3>"+
              "<img class='img-size' src='"+response.articles[i].urlToImage+"'></img>"+
              "<p class=''>"+response.articles[i].description+"</p>"+
              "<p class='col-md-3'><a target='_blank' href='"+response.articles[i].url+"'>More info</a></p>"+
              "</div>";
            }
            $('.show-news').removeClass('loader');
            $('.show-news').html(container);

          }
        });
      }
  });

});
