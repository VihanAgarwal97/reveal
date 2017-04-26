/*This file holds a timer*/
define(["PIXI"], function(PIXI) {
    return {
        Timer: function(stage) {
            this.secs = 0;
            this.sec =0;
            this.minute = 0;
            this.min =0;
            this.time=0;            
            this.stage = stage;
            this.timertext;
            
            /*Render the timer to the PIXI Stage*/
            this.addTimerToStage = function(){
                var labelStyle = new PIXI.TextStyle({
                    fontFamily: 'Macondo, cursive',
                    fontSize: 32,
                    fill: '#ffffff',
                });
                timertext = new PIXI.Text("00:00", labelStyle);
                timertext.position.x = 120;
                timertext.position.y = 150;
                stage.addChild(timertext);
            }
            
            /*Update the time. Increase seconds by 1*/  
            this.updateTime = function(){
                    this.secs++;
                    if (this.secs > 59){
                       this.secs = "00"; 
                       this.min++;
                    }
                    if (this.sec<9){
                        this.sec = "0" + this.secs;
                    }
                    else{
                        this.sec = this.secs
                    }
                    if (this.min<9){
                        this.minute = "0" + this.min; 
                    }
                    else{
                        this.minute = this.min;   
                    }
                    this.drawTime();
            } 
            
            /*Update the timer label*/
            this.drawTime = function() {
                timertext.text = this.minute + ":" + this.sec;
            }
            
            /*Get time in seconds*/
            this.getTimePoints = function() {
                var min,second;
                if(this.minute[0]=="0"){
                    min=this.minute[1];
                }else {
                    min=this.minute;
                }
                if(this.sec[0]=="0"){
                    second=this.sec[1];
                }else {
                    second=this.sec;
                }
                
                totalTime = (parseInt(min)*60)+parseInt(second);            
                return 3600 - (10 * totalTime);
            }
        }
    }
});
