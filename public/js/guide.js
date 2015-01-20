/*!
 * App.js - 0.0.1
 *
 * Copyright (c) 2015
 * Licensed under the MIT license,
 * http://www.opensource.org/licenses/MIT
 */
;(function($){
    //阻塞等待10秒后返回
    // function sleep(millliSeconds){
    //   var startTime=new Date().getTime();
    //   while(new Date().getTime()<startTime+millliSeconds);
    // }
    //sleep(10000);
  $('body').removeClass('_booting _noscript');
  $('.card').delegate('.flip','mouseover',function(){
    $(this).addClass('flipToBack').removeClass('flipToFront');
  });

  $('.card').delegate('.flip','mouseleave',function(){
    $(this).addClass('flipToFront').removeClass('flipToBack');
  });
  
  $('._sidebar').delegate('._list-arrow','click',function(e){
    e.preventDefault();
    $(this).parent('._list-dir').toggleClass('open');

    //
    //
  });
  



})(Zepto);
