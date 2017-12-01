/********************************************
loader page time out js
*********************************************/
const loader = document.getElementsByClassName("loader-container");
const content = document.getElementsByClassName("content");
const mainPageContainer = document.getElementsByClassName("main-page-container");
setTimeout(function() {
  loader[0].style.display = "none";
  loader[0].style.height = "0";
  content[0].style.visibility = "visible";
  content[0].style.height = "100%";
  mainPageContainer[0].style.visibility = "visible";
  mainPageContainer[0].style.height = "200px";
}, 10);

/********************************************
main page js
*********************************************/
$('.main-button').click(function() {
  $(this).parents('.slide').toggleClass('is-transitioned');
});
$('.home').click(function() {
  $(this).parents('.slide').toggleClass('is-transitioned');
});

/********************************************
jquery.visible.min.js plugin
*********************************************/
!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery); 

/********************************************
header nav js
*********************************************/
// dropdown menu click event for icon list
$('.icon-list').click(function() {
  if ($('#dropdown-menu-1').attr('class') === 'dropdown-menu-disable') {
    $('#dropdown-menu-1').addClass('dropdown-menu-enable');
    $('#dropdown-menu-1').removeClass('dropdown-menu-disable');
  } else {
    $('#dropdown-menu-1').removeClass('dropdown-menu-enable');
    $('#dropdown-menu-1').addClass('dropdown-menu-disable');
  }
});
  
// dropdown menu click event for social login
$('.login-text').click(function() {
  if ($(this).find('li').attr('class') === 'dropdown-menu-disable') {
    $('.menu-2 li').addClass('dropdown-menu-enable');
    $('.menu-2 li').removeClass('dropdown-menu-disable');
  } else {
    $('.menu-2 li').removeClass('dropdown-menu-enable');
    $('.menu-2 li').addClass('dropdown-menu-disable');
  }
})
  
// close dropdown menu after click event
$('nav a').click(function() {
  $('#dropdown-menu-1').removeClass('dropdown-menu-enable');
  $('#dropdown-menu-1').addClass('dropdown-menu-disable');
  $('nav a').removeClass('selected');
  $(this).addClass('selected');
});

/********************************************
step by step message form js
*********************************************/
$('.message-container .button').click(function(){
  var $btn = $(this),
      $step = $btn.parents('.modal-body'),
      stepIndex = $step.index(),
      $pag = $('.modal-header span').eq(stepIndex);

  if(stepIndex === 0 || stepIndex === 1) { step1($step, $pag); }
  else { step3($step, $pag); }
  
});

function step1($step, $pag){
  // animate the step out
  $step.addClass('animate-out');
  
  // animate the step in
  setTimeout(function(){
    $step.removeClass('animate-out is-showing')
         .next().addClass('animate-in');
    $pag.removeClass('is-active')
          .next().addClass('is-active');
  }, 600);
  
  // after the animation, adjust the classes
  setTimeout(function(){
    $step.next().removeClass('animate-in')
          .addClass('is-showing');
    
  }, 1200);
}

function step3($step, $pag){
  // animate the step out
  $step.parents('.modal-wrap').addClass('animate-up');

  setTimeout(function(){
    $('.rerun-button').css('display', 'inline-block');
  }, 300);
}

$('.rerun-button').click(function(){
 $('.modal-wrap').removeClass('animate-up')
                  .find('.modal-body')
                  .first().addClass('is-showing')
                  .siblings().removeClass('is-showing');

  $('.modal-header span').first().addClass('is-active')
                          .siblings().removeClass('is-active');
 $(this).hide();
});
  

  