const Board = require('firmata');

// Components ARDUINO PINs
const LED = 13; // LED ON PIN 13
const POT = 0; // Potenciometer PIN A0

// Init State Componentes
let ledOn = 0; // LED turn on
let delay = 0; // time of delay

// When the blink delay is below 100 ms, the human eye cannot perceive the blink of
// the LED anymore. To map the blink delay to a range that can be seen by the human
// eye, you use a “map” function. 

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

Board.requestPort((err, port) => {
    
    if (err) {
        console.log(err);
        return;
    }

    let board = new Board(port.comName);
    
    board.on('ready', () => {
        function blink() {
            board.digitalWrite(LED, ledOn);
            ledOn = !ledOn;
            setTimeout(blink, delay);
        }
        
        board.analogRead(0, function (d) {
            // delay = d;
            // minimun blink delay of 400ms, and 1.6s
            delay = map(d, 0, 1023, 400, 1600);
        });

        blink();
    });
})