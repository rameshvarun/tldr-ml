$(function() {
  var search = $("#search");
  var noresults = $("#no-results");
  var termentries = $(".term-entry");

  function navigate() {
    var hash = window.location.hash;
    if (hash.length > 1 && hash[0] == "#") {
      var id = hash.substring(1);
      termentries.hide();
      $("[data-term-id='" + id + "']").show();
    }
  }
  navigate();

  $(window).on('hashchange',function(){ navigate(); });

  $.getJSON("terms.json", function(terms) {
    for (var term of terms) {
      term.entry = $("[data-term-id='" + term.id + "']");
    }

    var fuse = new Fuse(terms, {
      caseSensitive: false,
      keys: ['term', 'aliases'],
      shouldSort: true
    });

    search.on('input', function(value) {
      var val = search.val();
      if (val.trim() === "") {
        termentries.show();
        noresults.hide();
      } else {
        termentries.hide();
        var results = fuse.search(val);
        for (result of results) result.entry.show();
        if (results.length == 0) noresults.show();
        else noresults.hide();
      }
    })
  });
});
