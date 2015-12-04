/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Power(pos,dir) {
    this.mCycleLeft = 200;
    var spritesheet = 'assets/spritesheet_hud.png';
    this.powerUp = new LightRenderable(spritesheet);

    this.powerUp.setColor([1, 1, 1, 0]);
    this.powerUp.getXform().setPosition(pos[0],pos[1]);
    this.powerUp.getXform().setSize(10, 10);
    
    this.powerUp.setElementPixelPosArray([256,384,896,1024]);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.powerUp);
    this.setSpeed(0.5);
    this.setCurrentFrontDir([dir,0]);
    
    this.interval = 10;
    this.current = 0;
    this.currentY = -0.5;
    this.up = true;
    this.down = false;
    
    this.dir = dir;

//    var rigidShape = new RigidCircle(this.getXform(), 4);
//    rigidShape.setMass(0.1);
//    rigidShape.setAcceleration([2, 1]);
//    rigidShape.setDrawBounds(true);
//    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Power, GameObject);


Power.prototype.update = function () {
    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    this.mCycleLeft--;
    
    if(this.hasExpired()){
        this.powerUp.setElementPixelPosArray([-1,-1,-1,-1]);
    }
    
   
    if(this.up){
        this.currentY += 0.1;
        this.setCurrentFrontDir([this.dir, this.currentY ]);
        this.current++;
        
        if(this.current > this.interval){
                this.down = true;
                this.up = false;
        }

    }
    else if(this.down){
        this.currentY -= 0.1;
        this.setCurrentFrontDir([this.dir, this.currentY ]);
        this.current--;
        if(this.current < 0){
                this.down = false;
                this.up = true;
        }
        
    }     

};

Power.prototype.hasExpired = function() { return this.mCycleLeft <= 0; };