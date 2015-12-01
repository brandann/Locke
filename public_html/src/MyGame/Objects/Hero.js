/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero() {
    this.kXDelta = 1;
    this.kYDelta = 2.0;
    this.kJumpHeight = 40;
    this.kMaxVelocity = 20;
    this.mDye = new Renderable();
    this.mDye.setColor([0, 1, 1, 1]);
    this.mDye.getXform().setPosition(20, 20);
    this.mDye.getXform().setSize(6, 6);

    GameObject.call(this, this.mDye);
    var r = new RigidRectangle(this.getXform(), 5.75, 5.75);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.05);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
    
    //Hero States
    this.mState = Hero.state.Idle;
    this.mDir = Hero.dir.Foward;
    this.mPrevState = null;
    this.mNumJump = 0;
    
}
gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.state = Object.freeze({
    Walking: 1,
    Jumping: 2,
    Hurt: 3,
    Idle : 4 
});

Hero.dir = Object.freeze({
    Left: 1,
    Right: 2,
    Forward:3
});

Hero.prototype.update = function (platforms) {
    // must call super class update
    GameObject.prototype.update.call(this);

    this.handlePlatformCollision(platforms);
    this.updateControls();
    
    // now interact with the dyePack ...
//    var i, obj;
//    var heroBounds = this.getBBox();
//    var p = this.getXform().getPosition();
//    for (i=0; i<dyePacks.size(); i++) {
//        obj = dyePacks.getObjectAt(i);
//        // chase after hero
//        obj.rotateObjPointTo(p, 0.8);
//        if (obj.getBBox().intersectsBound(heroBounds)) {
//            dyePacks.removeFromSet(obj);
//        }
//    }
};
Hero.prototype.handlePlatformCollision = function (platforms) {
    
    var i;
    for(i = 0; i < platforms.size(); i++){
        
        var obj = platforms.getObjectAt(i);
        var platformName = getObjectClass(obj);
        
        if(this.collideBottom(obj) && this.mState === Hero.state.Jumping){
            this.mState = Hero.state.Walking;
            this.mNumJump = 0;
        }
        
        switch(platformName) {
            case 'SpikePlatform':
                if(this.collideBottom(obj)){
                    var v = this.getPhysicsComponent().getVelocity();
                    v[1] += 20;
                    //this.getXform().setYPos(this.getXform().getYPos() + 5);
                }
                break;
            //case n:
               // code block
                //break;
            default:
                //default code block
        }        
    }
};

Hero.prototype.collideBottom = function (obj) {
  var heroBB = this.getBBox();
  var status = heroBB.boundCollideStatus(obj.getBBox());

  if(11 === status || 10 === status || 9 === status ){
      return true;
  }
  return false;
};

Hero.prototype.updateControls = function () {
    
    var v = this.getPhysicsComponent().getVelocity();
    var xform = this.getXform();
    
    var controlsPressed = false;
    

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if(Math.abs(v[0]) <= this.kMaxVelocity){
           v[0] -= this.kXDelta;

        }
        this.mDir = Hero.dir.Left;
        controlsPressed = true;

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if(Math.abs(v[0]) <= this.kMaxVelocity){
            v[0] += this.kXDelta;
        }
        this.mDir = Hero.dir.Right;
        controlsPressed = true;
    }
    
    //if the user has not pressed anything slow the hero down more quickly
    //if(this.mState === Hero.state.Walking){
        if(!controlsPressed && this.mDir === Hero.dir.Right){
            if(v[0] > 0){
                v[0] -= 0.5;
            }
            if(v[0] < 0){
                v[0] = 0;
            }

        }
        if(!controlsPressed && this.mDir === Hero.dir.Left){
            if(v[0] < 0){
                v[0] += 0.5;
            }
            if(v[0] > 0){
                v[0] = 0;
            }

        }
    //}

   // console.log(v[1]);
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
//        xform.incXPosBy(-this.kXDelta);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        xform.incXPosBy(this.kXDelta);
//    } 

    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        
        if(this.mNumJump === 0){
            v[1] += this.kJumpHeight;
            this.mState = Hero.state.Jumping;
            this.mNumJump++;
        }
        if(this.mNumJump === 1){
            if(v[1] > 15 && v[1] < 30){
                v[1] += this.kJumpHeight * 0.25;
                this.mState = Hero.state.Jumping;
                this.mNumJump++;                
            }
            else if(v[1] < 15 && v[1] > 0){
                v[1] += this.kJumpHeight * 0.75;
                this.mState = Hero.state.Jumping;
                this.mNumJump++;                
            }
            else if(v[1] < 0){
                v[1] += this.kJumpHeight * 1.25;
                this.mState = Hero.state.Jumping;
                this.mNumJump++;                
            }
        }
    }
};

Hero.prototype.handleEnemyCollision = function(enemy) {
    console.log("Enemy collision with hero");
    this.getXform().setPosition(20, 20);
};