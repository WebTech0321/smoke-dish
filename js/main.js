var dishImages = new Array();
var loadedImage = 0;
var slideWidth = 400;
var slideHeight = 400;
var imageUrls = [
    'img/dishes/dish01.jpg',
    'img/dishes/dish02.jpg',
    'img/dishes/dish03.jpg',
    'img/dishes/dish04.jpg',
    'img/dishes/dish05.jpg',
    'img/dishes/dish06.jpg',
    'img/dishes/dish07.jpg',
    'img/dishes/dish08.jpg',
    'img/dishes/dish09.jpg',
    'img/dishes/dish10.jpg',
    'img/dishes/dish11.jpg',
    'img/dishes/dish12.jpg',    
    'img/dishes/dish13.jpg',
    'img/dishes/dish14.jpg',
]
  
$(document).ready(function () {
    //you can set this, as long as it's not greater than the slides length
    var show = 4;
    //calculate each slides width depending on how many you want to show
    var w = $('#slider').width() / show;
    var l = $('.slide').length;
    slideWidth = w;
    //set each slide width
    $('.slide').width(w);
    //set the container width to fix the animation and make it look sliding
    $('#slide-container').width(w * l)
    
    function slider() {
        $('.slide:first-child').animate({
            marginLeft: -w //hide the first slide on the left
        }, 'slow', function () {
            //once completely hidden, move this slide next to the last slide
            $(this).appendTo($(this).parent()).css({marginLeft: 0});
        });
    }
    //use setInterval to do the timed execution and animation
    var timer = setInterval(slider, 2000);
    
    /* pausing the slider */   
    $('#slider').hover(function(){
        //mouse in, clearinterval to pause
        clearInterval(timer);
    },function(){
        //mouse out, setinterval to continue
        timer = setInterval(slider, 2000);
    });

    for(let i = 0; i < imageUrls.length; i++) {
        let img = new Image();
        img.onload = function() {
            loadedImage++;           

            if( loadedImage == imageUrls.length ) {
                for(let k = 0; k < imageUrls.length; k++)
                    drawCanvasItems(k)
            }
        };

        img.src = imageUrls[i];
        dishImages.push(img);
    }
});

function drawCanvasItems(k) {        
    var canvas = document.getElementById('canvas' + (k + 1))
    canvas.width = slideWidth
    canvas.height = slideHeight
    var ctx = canvas.getContext('2d')
    var party = smokemachine(ctx, [200, 200, 200])
    party.setImageDish(dishImages[k])
    party.start() // start animating
    party.setPreDrawCallback(function(context, dt){
        party.addSmoke(canvas.width/2, canvas.height - 100, .3)
        drawImageScaled(party.getImageDish(), context)
    })
}

function drawImageScaled(img, ctx) {
   var canvas = ctx.canvas
   var hRatio = canvas.width  / img.width
   var vRatio =  canvas.height / img.height
   var ratio  = Math.min ( hRatio, vRatio )
   var centerShift_x = ( canvas.width - img.width*ratio ) / 2
   var bottomShift_y = ( canvas.height - img.height*ratio ); 
   ctx.globalAlpha = 1
   ctx.drawImage(img, 0,0, img.width, img.height,
                      centerShift_x,bottomShift_y,img.width*ratio, img.height*ratio)
}