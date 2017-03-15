$(function() {

  /* Images preload */
  $.imgpreload([
    '/images/participe_btn_appstore_hover@2x.png',
    '/images/participe_btn_playstore_hover@2x.png',
    '/images/participe_btn_cadastrese_completo_hover@2x.png']);

  /* Generate stats radial graph */
  var percentageDegrees = function( p ) {
    p = ( p >= 100 ? 100 : p );
    var d = 3.6 * p;
    return d;
  };

  var createGradient = function ( elem, d, color ) {
    if ( d <= 180 ) {
      d = 90 + d;
      elem.css( 'background', 'linear-gradient(90deg, #e3eaee 50%, transparent 50%), linear-gradient('+ d +'deg, ' + color + ' 50%, #e3eaee 50%)' );
    } else {
      d = d - 90;
      elem.css( 'background', 'linear-gradient(-90deg, ' + color + ' 50%, transparent 50%), linear-gradient('+ d +'deg, #e3eaee 50%, ' + color + ' 50%)' );
    }
  };

  /* Smooth scroll */
  $('.nav a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 450);
        return false;
      }
    }
  });

  /* Fixed menu */
  var $document = $(document),
      $element = $('nav, #navPlaceholder'),
      className = 'hasScrolled';

  $document.scroll(function() {
    $element.toggleClass(className, $document.scrollTop() >= $('header').outerHeight());
  });

  /* Get stats */
  var apiUrl = 'http://particity.cascavel.pr.gov.br:8282';

  if(apiUrl.charAt(apiUrl.length - 1) !== '/') {
      apiUrl += '/';
  }

  var statsValue;
  var statsEnabled;

  isStatsEnabled();

  function isStatsEnabled() {
    $.ajax({
      url: apiUrl + 'feature_flags',
      type: 'GET',
      cache: false,
      success: function(data) {

        $.each(data.flags, function(i, v) {
          if (v.name == "stats") {
            statsValue = String(v.status_name);
            return;
          }
        });

        if(statsValue == 'enabled') {
          statsEnabled = 1;

          isEnabled();
        } else {
          $('#estatisticas, li.stats').hide();
        }
      }
    });
  }

  function isEnabled() {
    $('.estatisticas').fadeOut(300);

    console.log('getting data');

    $.ajax({
      url: apiUrl + 'reports/stats.json',
      type: 'GET',
      cache: false,
      success: function(data) {

        var emAndamento = 0;
        var emAberto = 0;
        var resolvidas = 0;
        var total = 0;

        // Em andamento
        for(var i = 0; i < data.stats.length; i++) {
          emAndamento += data.stats[i].statuses[0].count;
        }

        // Em aberto
        for(var i = 0; i < data.stats.length; i++) {
          emAberto += data.stats[i].statuses[1].count;
        }

        // Resolvidas
        for(var i = 0; i < data.stats.length; i++) {
          resolvidas += data.stats[i].statuses[2].count;
        }

        total = emAndamento + emAberto + resolvidas;
        //console.log('Total: ' + total + ' solicitações');

        var emAndamentoP = parseInt((emAndamento / total) * 100);
        var emAbertoP = parseInt((emAberto / total) * 100);
        var resolvidasP = parseInt((resolvidas / total) * 100);

        /*console.log('Em andamento: ' + emAndamento + ' (' + emAndamentoP + '%)');
        console.log('Em aberto: ' + emAberto + ' (' + emAbertoP + '%)');
        console.log('Resolvidas: ' + resolvidas + ' (' + resolvidasP + '%)');*/

        $('.pie.resolvidas').each(function() {
          var $this = $(this);
          var degrees = percentageDegrees( resolvidasP );
          createGradient( $this, degrees, '#78c953' );
        });

        $('.stats-wrapper.resolvidas > .stats > h1').html(resolvidas);

        $('.pie.andamento').each(function() {
          var $this = $(this);
          var degrees = percentageDegrees( emAndamentoP );
          createGradient( $this, degrees, '#ffac2d' );
        });

        $('.stats-wrapper.andamento > .stats > h1').html(emAndamento);

        $('.pie.aberto').each(function() {
          var $this = $(this);
          var degrees = percentageDegrees( emAbertoP );
          createGradient( $this, degrees, '#ff6049' );
        });

        $('.stats-wrapper.aberto > .stats > h1').html(emAberto);

        $('.loading-wrapper').fadeOut(500, function() {
          $('.estatisticas').fadeIn(300);
        });

      }
    });
  }
});
