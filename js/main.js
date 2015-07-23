
function jqueryInit() {

    $('body').keyup(function (event) {

        if (event.which == 27) {
            closeMenu();
        }
    });

    $('body').on('mouseenter', "div#overlay", function () {
        closeMenu();
    });

    $("nav.mob").find('button').keyup(function (event) {
        if (event.which == 13) {
            showMobMenu()
        }
    });

    $("nav.mob").on("click", "button", function () {
        showMobMenu()
    });

    $("div.filter-menu").find('button').keyup(function (event) {
        if (event.which == 13) {
            showMobMenu()
        }
    });

    $("div.filter-menu").on("click", "button", function () {
        showFilterMenu()
    });


}

/*------------------------- MENUS ----------------------------- */

function showMobMenu(){

    $( "nav.mob").find('button').addClass('returnFocus');
    $('div#overlay').css('display','block');
    var mobMenu = $( 'div#main-menu');
    mobMenu.addClass('openMenu');
    mobMenu.css('display','block');
    mobMenu.attr('aria-hidden', 'false');
    mobMenu.focus();
    mobMenu.trap();

}

function showFilterMenu(){

    $( "div.filter-menu" ).find('button').addClass('returnFocus');
    $('div#overlay').css('display','block');
    var filterMenu = $( 'div#filter-menu');
    filterMenu.addClass('openMenu');
    filterMenu.css('display','block');
    filterMenu.attr('aria-hidden', 'false');
    filterMenu.focus();
    filterMenu.trap();

}

function closeMenu(){
    $( 'div#overlay').css('display','none');
    var menu = $('.openMenu');
    menu.css('display','none');
    menu.removeClass('openMenu');
    menu.attr('aria-hidden', 'true');
    var initButton = $('.returnFocus');
    initButton.focus();
    initButton.removeClass('returnFocus');

}



/*------------------------- Radio Group ----------------------------- */

function radioGroup() {


    var radioGroups = $( 'div.radio-group');

    radioGroups.each(function() {

        var radioGroup = $( this );
        var labels = radioGroup.find('label');

        radioGroup.on( "click", "label", function() {

            labels.removeClass('checked');
            $( this).addClass('checked');

        });

    });

}




/*------------------------- ANGULAR ----------------------------- */