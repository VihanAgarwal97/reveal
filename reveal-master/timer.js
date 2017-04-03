/*This file holds the current game state*/
define(["PIXI"], function(PIXI) {
    return {
        Timer: function(stage) {
            this.secs = 0;
            this.sec =0;
            this.minute = 0;
            this.min =0;
            this.time=0;            
            this.stage = stage;
            
            this.addTimerToStage = function(){
                var labelStyle = new PIXI.TextStyle({
                    fontFamily: 'Macondo, cursive',
                    fontSize: 32,
                    fill: '#ffffff',
                });
                var timerText = new PIXI.Text(0, labelStyle);
                timerText.position.x = 100;
                timerText.position.y = 150;
                stage.addChild(timerText);
            }
            
            this.startTime = function() {
                setTimeout(updateTimeSections(),1000);
            }
            
            this.updateTimeSections = function() {
                secs = secs +1;
                if (sec<10){
                    sec = "0" + secs;
                }
                else{
                    sec = secs
                }
               if (secs == 59){
                   secs = 0; 
                   min++;
               }
                if (min<10){
                    minute = "0" + min; 

                }
                else{
                    minute = min;   
                }  
                drawTime();
            }
            
            this.drawTime = function() {
                timertext.text = minute + ":" + sec;
            }
            
            this.stopTime = function() {
                return (minute*60) + sec;
            }
        }
    }
});












    
   
   
   
    function updateTimeSections(){
        
    }