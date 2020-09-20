
window.addEventListener("load", function() {

    var buttons = document.querySelectorAll("button")
    buttons[0].addEventListener("click", start)
    buttons[1].addEventListener("click", reset)

    disable_inputs()

    modify_input_value()

    hide_inputs([1, 1, 0])

})


function modify_input_value() {
    
    var inputs = document.querySelectorAll("input")
    inputs[0].value = 0
    inputs[1].value = "m"
    inputs[2].value = 0
    inputs[3].value = "s"
    inputs[4].value = 0
    inputs[5].value = " "


}

var clr_int;
var flag;
var current_time;

function reset() {

    var buttons = document.querySelectorAll('button')

    stop()

    var h_m_s = [0, 0, 0]

    display(h_m_s)

    hide_inputs([1, 1, 0])

    flag = false

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


    }, 10) 
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

    cnt_s++

    if ( cnt_s == 100) {

        cnt_m += 1 
        cnt_s = 0
    }

    if ( cnt_m == 60 ) {
        
        cnt_h += 1
        cnt_m = 0
    }
    
    return [cnt_s, cnt_m, cnt_h]
}

function display(current_time) {

    var cnt_s = current_time[0]
    var cnt_m = current_time[1]
    var cnt_h = current_time[2]

    var display = document.querySelectorAll("input")
    
    display[4].value = cnt_s

    display[2].value = cnt_m
    
    display[0].value = cnt_h
    
}

function disable_inputs() {

    var inputs = document.querySelectorAll("input")

    for ( var i = 0; i < inputs.length; i++ ) {
        inputs[i].setAttribute("disabled", true)
    }

}

function hide_inputs(h_m_s) {

    var cnt_s = h_m_s[0]
    var cnt_m = h_m_s[1]
    var cnt_h = h_m_s[2]

    var inputs = document.querySelectorAll("input")

    if ( !cnt_h ) {
        
        for ( var i = 0; i < 2; i++ ) {
            inputs[i].style.display = "none"
        }

    }  else {

        for ( var i = 0; i < 2; i++ ) {
            inputs[i].style.display = ""
        }
    }
}
