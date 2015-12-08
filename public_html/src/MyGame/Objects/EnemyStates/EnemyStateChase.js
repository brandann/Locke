/* File: EnemyStateChase.js  */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// sets the enemy state to pace around an initial position
Enemy.prototype.setChaseState = function(initPos, range) {
                                                        // turn off mass so flying object does not fall
    
    this.getXform().setPosition(initPos[0], initPos[1]);                        // set the GameObject position to the initPos
    
    this.mState = null;                                                         // null the mState, this is just percautionary
    this.mSpeedVel = 0.15;                                                      // speed of the enemy when moving
    
    this._updateState(this.updateChase);                                        // set the update state to this state
    
    this.mRange = 40;
};

Enemy.prototype.updateChase = function () {
    
    var distFromHero = vec2.distance(this.getXform().getPosition(), this.mHero.getXform().getPosition());
    if(distFromHero < this.mRange) {                                            // check hero distance firsrt
        this.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.05);       // turn the enemy torwards the hero
        this.setSpeed(this.mSpeedVel);                                          // set the speed to make the enemy move torwards hero
    }
    else if(this.getSpeed() !== 0) {
        this.setSpeed(0.0);                                                     // set the speed to 0 to stop movement
    }
};