class ChessClock {
    constructor(){
        // All the time variables are counted in seconds for precision purposes. ;-)
        this._w_time = 0;
        this._b_time = 0;

        this._m_time = 0;
        this._inc_time = 0;

        // True = White; False = Black
        this._player = true;

        // False is flag down
        this._w_flag = true;
        this._b_flag = true;

        this.wflag = undefined;
        this.bflag = undefined;

        this._running = false;
    }
    config(match_time, increment_time, whiteDisplay, blackDisplay, whiteFlag, blackFlag){
        this._m_time = document.getElementById(match_time).value;
        this._inc_time = document.getElementById(increment_time).value;

        this._w_time = Number(this._m_time.substring(0,2))*60 + Number(this._m_time.substring(3));
        this._b_time = Number(this._m_time.substring(0,2))*60 + Number(this._m_time.substring(3));
        

        this._inc_time = Number(this._inc_time.substring(0,2))*60 + Number(this._inc_time.substring(3));

        this._w_display = document.getElementById(whiteDisplay);
        this._b_display = document.getElementById(blackDisplay);

        this.wflag = document.getElementById(whiteFlag);
        this.bflag = document.getElementById(blackFlag);

        this.render_clocks();
    }
    finish_movement(color){
        if(color == 'white' && this._player){
            this._w_time += this._inc_time;
            this._player = !this._player;
        } else if(color == 'black' && !this._player){
            this._b_time += this._inc_time;
            this._player = !this._player;
        }
    }
    render_clocks(){
        let w_minutes, w_seconds, b_minutes, b_seconds;
        w_minutes = Math.floor(this._w_time/60);
        if(this._w_time > w_minutes*60){
            w_seconds = this._w_time - w_minutes*60;
        }else{
            w_seconds = 0;
        }

        b_minutes = Math.floor(this._b_time/60);
        if(this._b_time > b_minutes*60){
            b_seconds = this._b_time - b_minutes*60;
        }else{
            b_seconds = 0;
        }

        w_minutes = String(w_minutes).padStart(2, '0');
        w_seconds = String(w_seconds).padStart(2, '0');
        b_minutes = String(b_minutes).padStart(2, '0');
        b_seconds = String(b_seconds).padStart(2, '0');

        this._w_display.innerHTML = `${w_minutes}:${w_seconds}`;
        this._b_display.innerHTML = `${b_minutes}:${b_seconds}`;

        if(!this._w_flag){
            this.wflag.style = 'color:red';
        }
        if(!this._b_flag){
            this.bflag.style = 'color:red';
        }
    }
    update_clocks(){
        if(this._player){
            this._w_time--;
        }else{
            this._b_time--;
        }

        if(this._w_time <= 0){
            this._w_flag = false;
        }
        if(this._b_time <= 0){
            this._b_flag = false;
        }

        this.render_clocks();
    }
}

let clock = new ChessClock();

let tick;

function start_clock(){
    clock._running = true;
    tick = window.setInterval(tick_tack, 1000, clock);
}

function tick_tack(clock){
    clock.update_clocks();
}

function stop_clock(){
    clock._running = false;
    window.clearInterval(tick);
}

function moved(color){
    if(clock._running) clock.finish_movement(color);
}

function config_btn() {
    clock.config('clock_max', 'clock_inc', 'clock_white', 'clock_black', 'wf', 'bf');
}