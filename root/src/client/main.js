"use strict";

var $ = require('jquery');

$( function() {
  $('body').append( $('<p>').text('Good to see you') );
  
  var $table = $('<table>').attr('class', 'jpmvc-control-container');

  test_collection.each()
    .progress( function(obj) {
      var $tr = $('<tr>');
      var $td = $('<td>').appendTo($tr);
      obj.get('EVENT_NAME').then( function(value) { $td.text(value) } );
      $tr.appendTo($table);
    })
  
  $('body').append($table);
})