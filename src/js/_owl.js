$(document).ready(function() {
    
  var partners = $("#partners-carousel_main");

  partners.owlCarousel ({
        autoPlay: 2000,
        stopOnHover:true,
        loop : true,
        items : 2,
        itemsDesktop : [960, 2],
        itemsTablet : [600, 2],
        itemsMobile : [480, 1],
  });
});