$(function() {
  var template = $("#term-template");
  var search = $("#search");
  $.getJSON("terms.json", function(terms) {
    for (var term of terms) {
      var entry = template.clone();
      term.entry = entry;

      entry.find("#term-name").html(term.term);
      entry.find("#term-definition").html(term.definition);
      entry.addClass("term");
      entry.show();
      entry.insertAfter(template);
    }

    var fuse = new Fuse(terms, {
      keys: ['term']
    });

    search.on('input', function(value) {
      var val = search.val();
      if (val.trim() === "") {
        $(".term").show();
      } else {
        $(".term").hide();
        var results = fuse.search(val);
        for (result of results) result.entry.show();
      }
    })
  });
});
