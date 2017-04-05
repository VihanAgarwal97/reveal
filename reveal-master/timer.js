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
            this.timertext;

            this.addTimerToStage = function(){
                var labelStyle = new PIXI.TextStyle({
                    fontFamily: 'Macondo, cursive',
                    fontSize: 32,
                    fill: '#ffffff',
                });
                timertext = new PIXI.Text("00:00", labelStyle);
                timertext.position.x = 100;
                timertext.position.y = 150;
                stage.addChild(timertext);
            }
            
              
            this.updateTime = function(picGuessed){
                    if(!picGuessed){
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
                    }else{
                        console.log("Time ended");       
                    }
            }   
            
            this.drawTime = function() {
                timertext.text = this.minute + ":" + this.sec;
            }
            
            this.stopTime = function() {
                return (this.minute*60) + this.sec;
            }
        }
    }
});
