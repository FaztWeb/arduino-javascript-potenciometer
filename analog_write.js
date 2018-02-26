const Board = require('firmata');

// LED PIN ON A5
const LED = 5; // PIN DIGITAL PWM 5~

let brightness = 0; 
let fadeAmount = 5;

Board.requestPort((err, port) => {
    if (err) {
        console.error(err);
        return;
    }

    let board = new Board(port.comName);

    board.on('ready', function() {
        // pin as PWM
        board.pinMode(LED, board.MODES.PWM);

         // fade the LED every 30ms
        function fadeLed() {
            brightness += fadeAmount;
            if (brightness == 0 || brightness == 255) {
                fadeAmount = -fadeAmount;
            }
            board.analogWrite(LED, brightness);
            setTimeout(fadeLed, 30);
        }
        fadeLed();
    });
});