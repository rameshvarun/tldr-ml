$(function() {
  var template = $("#term-template");
  $.getJSON("index.json", function(data) {
    for (var term of Object.values(data.terms)) {
      var entry = template.clone();
      entry.find("#term-name").html(term.term);
      entry.find("#term-definition").html(term.definition);
      entry.show();
      entry.insertAfter(template);
    }

    var fuse = new Fuse(data.terms, {
      i
    })
  });
});
