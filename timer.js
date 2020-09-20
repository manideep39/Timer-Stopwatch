
window.addEventListener("load", function() {

    var buttons = document.querySelectorAll("button")
    buttons[0].addEventListener("click", start)
    buttons[1].addEventListener("click", reset)

})

var clr_int;
var flag;
var current_time;
var input_time = get_from_input();

function reset() {

    var buttons = document.querySelectorAll('button')

    stop()

    stop_alarm()

    // var h_m_s = get_from_input()
    var h_m_s = input_time

    display(h_m_s)

    flag = false
    disable_enable_inputs()
    show_input()

    buttons[0].removeEventListener("click", ok)
    buttons[0].addEventListener("click", start)

}

function stop() {

    var buttons = document.querySelectorAll("button")

    buttons[0].textContent = "START"

    clearInterval(clr_int)

    flag = true

    buttons[0].removeEventListener("click", stop)
    buttons[0].addEventListener("click", start)
   
}

function start() {

    if ( flag ) {

        start_interval(current_time)

    } else {

        var h_m_s = get_from_input()

        display(h_m_s)

        start_interval(h_m_s)
    }
    disable_enable_inputs()
    event.target.textContent = "STOP"
    event.target.removeEventListener("click", start)
    event.target.addEventListener("click", stop)
}

function start_interval(h_m_s) {

    clr_int = setInterval( function() {

        current_time = timer(h_m_s)

        display(current_time)

        h_m_s = current_time

        hide_inputs(h_m_s)

        times_up(h_m_s)

    }, 1000) 
}

function get_from_input() {

    var inputs = document.querySelectorAll("input")
    
    var hr = Number(inputs[0].value)
    var min = Number(inputs[2].value)
    var sec = Number(inputs[4].value)
    return [sec, min, hr]
}

function timer(h_m_s) {

    var cnt_s = h_m_s[0]
    var cnt_m = h_m_s[1]
    var cnt_h = h_m_s[2]

    if ( cnt_s ) {
        cnt_s-- 
    } else if ( cnt_m ) {
        cnt_m--
        cnt_s = 59
    } else if ( cnt_h ) {
        cnt_h--
        cnt_m = 59
        cnt_s = 59
    } else if ( cnt_s == 0 && cnt_m == 0 && cnt_h == 0 ) {
        clearInterval(clr_int)
    }
    return [cnt_s, cnt_m, cnt_h]
}

function display(current_time) {

    var cnt_s = current_time[0]
    var cnt_m = current_time[1]
    var cnt_h = current_time[2]

    var display = document.querySelectorAll("input")
    
    if ( cnt_s < 10 ) {
        if ( cnt_m || cnt_h ) {
            display[4].value = "0" + cnt_s
        } else {
            display[4].value = cnt_s
        }
    } else {
        display[4].value = cnt_s
    }

    if ( cnt_m < 10 ) {
        display[2].value = "0" + cnt_m
    } else {
        display[2].value = cnt_m
        
    }

    if ( cnt_h < 10 ) {
        display[0].value = "0" + cnt_h
    } else {
        display[0].value = cnt_h
    }
}

function disable_enable_inputs() {

    var inputs = document.querySelectorAll("input")

    if ( event.target.textContent == "START" ) {

        for ( var i = 0; i < inputs.length; i = i + 2 ) {
            inputs[i].setAttribute("disabled", "true")
        }

    } else if ( event.target.textContent == "RESET" ) {
        for ( var i = 0; i < inputs.length; i = i + 2 ) {
            inputs[i].removeAttribute("disabled")
        }
    } 

}

function hide_inputs(h_m_s) {

    var cnt_s = h_m_s[0]
    var cnt_m = h_m_s[1]
    var cnt_h = h_m_s[2]

    var inputs = document.querySelectorAll("input")

    if ( cnt_h == 0 ) {
        
        for ( var i = 0; i < 2; i++ ) {
            inputs[i].style.display = "none"
        }

    } 
    
   if ( cnt_m == 0 && cnt_h == 0) {

        for ( var i = 2; i < 4; i++ ) {
            inputs[i].style.display = "none"
        }
    } 

}

function show_input() {

    var inputs = document.querySelectorAll("input")

    for ( var i = 0; i < inputs.length; i++ ) {
        inputs[i].style.display = ""
    }

}

function times_up(h_m_s) {

    var cnt_s = h_m_s[0]
    var cnt_m = h_m_s[1]
    var cnt_h = h_m_s[2]

    var inputs = document.querySelectorAll("input")

    if ( cnt_s == 0 && cnt_m == 0 && cnt_h == 0 ) {

        var buttons = document.querySelectorAll("button")
        buttons[0].textContent = "OK"
        buttons[0].removeEventListener("click", stop)
        buttons[0].addEventListener("click", ok)

        start_alarm()
    }
}

function ok() {
    

    stop_alarm()
    reset()

    var inputs = document.querySelectorAll("input")
    for ( var i = 0; i < inputs.length; i = i + 2 ) {
        inputs[i].removeAttribute("disabled")
    }

    event.target.removeEventListener("click", ok)
    event.target.addEventListener("click", start)
}

function start_alarm() {

    var audio = document.querySelector("audio")
    audio.play()
}

function stop_alarm() {

    var audio = document.querySelector("audio")
    audio.pause()
}