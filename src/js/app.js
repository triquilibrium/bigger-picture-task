'use strict';

(function(){

    var formVal = {

        init: function(){
            
            var that = this;

            $('#contact-form').submit(function(e){
                e.preventDefault();
                $('.form__response').remove();

                $('.form__input').each(function(){

                    that.checkInputs( $(this) );

                }); 

                if ( !$('#contact-form .form__response--error').length ) {
                    $('#submit').prop('disabled', true);
                    $('<div class="form-confirm">Thank you!</div>').insertAfter('#contact-form');
                    $('.form-confirm').slideDown(500);
                    $('#contact-form').slideUp(500);


                    var formPass = {
                        'firstName' : $('#firstname').val(),
                        'lastName' : $('#lastname').val(),
                        'email' : $('#email').val(),
                        'number' : $('#phone-number').val(),
                        'company' : $('#company').val()
                    };

                    console.log(JSON.stringify( formPass , null , 4 ) );

                }
            }); // end submit

            $('.form__input').each(function(){

                $(this).blur(function(){
                    $(this).next('.form__response').remove();
                    that.checkInputs( $(this) );
                });

            });
        },

        checkEmpty: function(inp){
            if ( inp.val().trim() === '' ) {
                return false;
            }
        },

        checkName: function(inp){
            var reName = /\d/;
            if ( reName.test(inp.val()) === true || inp.val().length < 2 ){
                return false;
            }
        },

        checkEmail: function(inp){
            var reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( reEmail.test(inp.val()) === false ) {
                return false;
            }
        },

        checkNum: function(inp){
            var reNum = /^[\d\s\-\(\)\+]{9,}$/g;
            if ( reNum.test(inp.val()) === false ) {
                return false;
            }
        },

        checkInputs: function(inp){
            var that = this;

            var msg = ['ok', 'ok'];

            if ( that.checkEmpty( inp ) === false ) {
                msg = ['error', 'Please fill'];
            } else {

                if ( inp.hasClass('form__input--name') && that.checkName( inp ) === false ) {
                    msg = ['error', 'Wrong name'];
                }

                if ( inp.attr('id') === 'email' && that.checkEmail( inp ) === false ) {
                    msg = ['error', 'Wrong email'];
                }

                if ( inp.attr('id') === 'phone-number' && that.checkNum( inp ) === false ) {
                    msg = ['error', 'Wrong number'];
                }
            }

            $('<div class="form__response form__response--' + msg[0] + '">' + msg[1] + '</div>').insertAfter( inp );
            $('.form__response').fadeIn(300);
        }

    };

    formVal.init();


    // Scroll effects

    var visualEffect = {

        hideSection: function(){
            $('.section').addClass('section-hide');
        },

        showSection: function(){
            this.hideSection();

            var windowHeight = $(window).height();
            var srcollingTop = $(window).scrollTop();

            $('.section').each(function(){

                if ( $(this).hasClass('section-hide') ) {

                    var offT = $(this).offset().top;

                    if ( (offT - srcollingTop) < (windowHeight * 0.8) ) {
                        $(this).addClass('section-show');
                        $(this).removeClass('section-hide');
                    }
                }

            });
        }
    };

    $(document).ready(function(){
        visualEffect.showSection();
    });


    $(window).on('scroll resize', function(){
        visualEffect.showSection();
    });

})();