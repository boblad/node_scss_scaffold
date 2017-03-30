;(function ($){
    $(function() {

      console.log('loaded');

// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

// if browser doesn't support WebSocket, just show some notification and exit

// open connection
var connection = new WebSocket('ws://localhost:3015');

connection.onopen = function () {
    console.log('plsl')
    console.log('con', connection)

    $('#hi').on('input',function() {
      connection.send($(this).val())
    })
};

connection.onerror = function (error) {
  console.log('err', error)
};

// most important part - incoming messages
connection.onmessage = function (message) {
  console.log('mes', message)
  $('#hi').val(message.data)
};


    });
})(jQuery);
