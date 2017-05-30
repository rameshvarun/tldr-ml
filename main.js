$(function() {
  var search = $("#search");
  var noresults = $("#no-results");
  var termentries = $(".term-entry");

  $.getJSON("terms.json", function(terms) {
    for (var term of terms) {
      term.entry = $("[data-term-id='" + term.id + "']");
    }

    var fuse = new Fuse(terms, {
      caseSensitive: false,
      keys: ['term', 'aliases'],
      shouldSort: true
    });

    function navigate() {
      var hash = window.location.hash;
      if (hash.length >= 3 && hash.substr(0, 3) == "#q=") {
        var query = decodeURIComponent(window.location.hash.substr(3));
        if (query.trim() === "") {
          termentries.show();
          noresults.hide();
        } else {
          termentries.hide();
          var results = fuse.search(query);
          for (result of results) result.entry.show();
          if (results.length == 0) noresults.show();
          else noresults.hide();
        }
      }
      else if (hash.length >= 2 && hash[0] == "#") {
        var id = hash.substring(1);
        termentries.hide();
        $("[data-term-id='" + id + "']").show();
      }
    }
    navigate();

    $(window).on('hashchange',function(){ navigate(); });

    search.on('input', function(value) {
      var val = search.val();
      window.location.hash = "q=" + encodeURIComponent(val);
    });
  });
});
