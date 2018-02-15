  (function() {
    var cx = '006938037332106939758:ikubudf2fxc';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
      '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();


    function gcseCallback() {
      if (document.readyState != 'complete')
        return google.setOnLoadCallback(gcseCallback, true);
      google.search.cse.element.render({gname:'gsearch', div:'results', tag:'searchresults-only', attributes:{linkTarget:''}});
       element = google.search.cse.element.getElement('gsearch');
    //  element.execute('Soundcloud');
    };
    window.__gcse = {
      parsetags: 'explicit',
      callback: gcseCallback
    };
