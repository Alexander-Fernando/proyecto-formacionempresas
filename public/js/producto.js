$(document).ready(function(){

    $('.small-image img').click(function(){

        $(this).addClass('active').siblings().removeClass('active');

        let image = $(this).attr('src');
        $('.big-image img').attr('src',image);

    });

});
$(".stars").mousemove(function(e) {
   var gLeft = $(".stars .stars-ghost").offset().left,
      pX = e.pageX;

   $(".stars .stars-ghost").width(pX - gLeft);

});