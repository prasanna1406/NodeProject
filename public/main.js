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
