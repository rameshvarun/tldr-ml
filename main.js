$(function() {
  var search = $("#search");
  var noresults = $("#no-results");
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
        $(".term-entry").show();
        noresults.hide();
      } else {
        $(".term-entry").hide();
        var results = fuse.search(val);
        for (result of results) result.entry.show();
        if (results.length == 0) noresults.show();
        else noresults.hide();
      }
    })
  });
});
