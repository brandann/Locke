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

function Hero(spriteSheet) {
    
    this.kXDelta = 1;
    this.kYDelta = 5.0;
    this.kJumpHeight = 40;
    this.kMaxVelocity = 40;
    
    this.mSpriteSheet = spriteSheet;
    this.mSpriteMap = {};
    
    //topPixel, leftPixel, widthPixel, HeightPixel, numelements, paddingPixel
    var key;
    key = 'stand';
    this.mSpriteMap[key] = [128,0,86,86,1,0];
    key = 'blueDiamond';
    this.mSpriteMap[key] = [0,128,896,1024];
    key = 'goldKeyEmpty';
    this.mSpriteMap[key] = [256,384,256,384];
    key = 'goldKey';
    this.mSpriteMap[key] = [256,384,128,256];
    key = 'bomb';
    this.mSpriteMap[key] = [256,384,128,256];
    
    
    
    this.mDye = new LightRenderable(this.mSpriteSheet);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(20, 60);
    this.mDye.getXform().setSize(10, 13);
    
    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mDye.setAnimationSpeed(2.5); 
    this.mDye.setSpriteSequence(512, 0, 67, 92, 1, 0);

    GameObject.call(this, this.mDye);
    var r = new RigidRectangle(this.getXform(), 9.85, 12.5);
    r.setMass(0.7); 
    r.setRestitution(0.05);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
    
    //Hero States
    this.mState = Hero.state.Idle;
    this.mDir = Hero.dir.Foward;
    this.mPrevState = null;
    this.mNumJump = 0;
    
    this.mLifeCounter = null;
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
    
    this.mDye.updateAnimation();
    
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
                v[0] -= 1;
            }
            if(v[0] < 0){
                v[0] = 0;
            }

        }
        if(!controlsPressed && this.mDir === Hero.dir.Left){
            if(v[0] < 0){
                v[0] += 1;
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
                v[1] += this.kJumpHeight * 0.50;
                this.mState = Hero.state.Jumping;
                this.mNumJump++;                
            }
            else if(v[1] < 15 && v[1] > 0){
                v[1] += this.kJumpHeight * 0.75;
                this.mState = Hero.state.Jumping;
                this.mNumJump++;                
            }
            else if(v[1] < 0){
                v[1] += this.kJumpHeight * 1.0;
                this.mState = Hero.state.Jumping;
                this.mNumJump++;                
            }
        }
    }
};

Hero.prototype.handleEnemyCollision = function(enemy) {
    this.getXform().setPosition(20, 20);
    this.mLifeCounter.decByOne();
};

Hero.prototype.setLifeCounter = function(life) {
    this.mLifeCounter = life;
};

Hero.prototype.changeAnimation = function () {
    if (this.mHeroState !== this.mPreviousHeroState) {
        switch (this.mHeroState) {
            case Hero.eHeroState.eFaceLeft:
                this.mDye.setSpriteSequence(1508, 0, 140, 180, 3, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
//            case Hero.eHeroState.eFaceRight:
//                this.mDye.setSpriteSequence(1508, 0, 140, 180, 3, 0);
//                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(20);
//                break;
//            case Hero.eHeroState.eRunLeft:
//                this.mDye.setSpriteSequence(1688, 0, 140, 180, 6, 0);
//                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(5);
//                break;
//            case Hero.eHeroState.eRunRight:
//                this.mDye.setSpriteSequence(1688, 0, 140, 180, 6, 0);
//                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(5);
//                break;
//            case Hero.eHeroState.eJumpLeft:
//                this.mDye.setSpriteSequence(2048, 0, 140, 180, 10, 0);
//                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(4);
//                break;
//            case Hero.eHeroState.eJumpRight:
//                this.mDye.setSpriteSequence(2048, 0, 140, 180, 10, 0);
//                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(4);
//                break;
        }
    }
};