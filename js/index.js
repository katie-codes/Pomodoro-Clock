// initialise global variables
var break_counter = 0;
var timer_counter = 0;

// Get quick access to fields
var break_field = document.getElementById("break_field");
var timer_field = document.getElementById("timer_field");


// timer and break setters
var counterFunction = (function() {
  
  return {
             breakCounterPlus : function(field) {
                                break_counter += 1;
                                field.value = break_counter;
                                 },
             breakCounterMinus : function(field) {
                                if (break_counter>0){    
                                    break_counter -= 1;
                                    field.value = break_counter;
                                  }
                                },
             timerCounterPlus : function(field) {
                                  timer_counter += 1;
                                  field.value = timer_counter;
                                     },
             timerCounterMinus : function(field) {
                                  if (timer_counter > 0) {    
                                      timer_counter -= 1;
                                      field.value = timer_counter;
                                         }
                                      }
                          };

  
}()) 
    


function restart() {
  timer_field.value = 0;
  break_field.value = 0;
  break_counter = 0;
  timer_counter = 0;
  document.getElementById("countdown").innerHTML = "00:00";
  // brute force clear intervals - note: in future, avoid intervals like plague
for (var i = 1; i < 1000; i++)
        window.clearInterval(i);

}


function countdownToDom(counter) {

  var timer_str = counter.toString();
  
 var timer_todisplay = timer_str + ":00";

 document.getElementById("countdown").innerHTML = timer_todisplay;
  
  // call actual countdown to begin
  counter -=1;
countdown(counter, "countdown").interval;
}


 // Timer countdown
function countdown(counter, dom_element) {
 

 var time =  { "minutes" : counter,
                  "seconds" : 60,   }; 
 
 
var interval = {
          interval : setInterval(function() {
                time.seconds -= 1;
                 document.getElementById(dom_element).innerHTML = time.minutes + ":" +  time.seconds;
   
            if (time.seconds == 0 && counter !== 0) {
               clearInterval(interval.interval);
                counter -= 1;
                countdown(counter, dom_element).interval;
             } else if (counter == 0 && time.seconds == 0) {
               clearInterval(interval.interval);
                document.getElementById(dom_element).innerHTML = "Break!";
                breakCountdown(break_counter, "countdown");
               
              }
            }, 1000),  
  };


  return interval;
}

// break counter 
function breakCountdown(counter, dom_element) {
 
  var time =  { "minutes" : counter,
                  "seconds" : 60,   }; 
  
var ticker = {
    ticker : setInterval(function() {
                time.seconds -= 1;
                 document.getElementById(dom_element).innerHTML = time.minutes + ":" +  time.seconds;
   
            if (time.seconds == 0 && counter !== 0) {
               clearInterval(ticker.ticker);
                counter -= 1;
                breakCountdown(counter, dom_element).ticker;
             } else if (counter == 0 && time.seconds == 0) {
               clearInterval(ticker.ticker);
               document.getElementById(dom_element).innerHTML = "Back to work!"
                countdown(timer_counter, "countdown");
               
              }
            }, 1000),  
  
        };

 
  return ticker;
}