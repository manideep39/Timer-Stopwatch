
// this is experimentation, if something is working wiered this may be one of the reason. 

window.onload = function(params) {

    set_timer_stopwatch_events()

}

function set_timer_stopwatch_events() {
    
    var timer = document.getElementById("timer")
    var stopwatch = document.getElementById("stopwatch")


    timer.addEventListener("click", function(){
        modify_timer_style()

    })
    stopwatch.addEventListener("click", function(){
        modify_stopwatch_style()

    })
}

function modify_timer_style() {

    var timer = document.getElementById("timer")
    var stopwatch = document.getElementById("stopwatch")

    var current_att = timer.getAttribute("class")

    if ( !current_att.includes("nav") ) {
        var new_att = current_att + " " + "nav"
        timer.setAttribute("class", new_att)
        
        stopwatch.removeAttribute("class", "nav")
        stopwatch.setAttribute("class", "timer_stopwatch")
        location = "index.html"
        // t_s_switch()
    }
}

function modify_stopwatch_style() {

    var timer = document.getElementById("timer")
    var stopwatch = document.getElementById("stopwatch")

    var current_att = stopwatch.getAttribute("class")

    if ( !current_att.includes("nav") ) {
        var new_att = current_att + " " + "nav"
        stopwatch.setAttribute("class", new_att)
        
        timer.removeAttribute("class", "nav")
        timer.setAttribute("class", "timer_stopwatch")
        location = "stopwatch.html"
        // t_s_switch()
    }

}

function t_s_switch() {
    
    if ( event.target.id == "timer" ) {
        var t_s_switch = document.getElementById("t_s_switch")

        t_s_switch.setAttribute("src", "./timer.js")
    } else {
        var t_s_switch = document.getElementById("t_s_switch")

        t_s_switch.setAttribute("src", "./stopwatch.js")
    }
}



