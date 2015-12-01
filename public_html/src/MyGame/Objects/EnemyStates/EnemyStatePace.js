/* File: EnemyStatePace.js  */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// sets the enemy state to pace around an initial position
Enemy.prototype.setPaceState = function(initPos) {
    
    this.mInitialPosition = initPos;
    this.getXform().setPosition(initPos[0], initPos[1]);
    
    this.kXDelta = .1;
    this.mDir = 1;
    this.mState = null;
    this.mSpeedVel = 1;
    
    this._updateState(this.updatePace);
};

Enemy.prototype.updatePace = function () {
    
    var xform = this.getXform();
    var distFromHero = vec2.distance(xform.getPosition(), this.mHero.getXform().getPosition());
    var distFromInitial = vec2.distance(xform.getPosition(), this.mInitialPosition);
    
    if(distFromHero < 30) {                                                                 // check hero distance firsrt
        if(this.mHero.getXform().getXPos() > this.getXform().getXPos()) { this.mDir = 1; }  // chase right
        else { this.mDir = -1; }                                                            // chase left
        this.mSpeedVel = 2;                                                                 // increase speed
        this.mEnemy.setColor([1, 0, 0, 1]);                                                 // show red on chase
    }
    else {
        if (distFromInitial > 8) {                                                          // reached patrol bounds
            if(xform.getXPos() < this.mInitialPosition[0]) { this.mDir = 1; }               // partol right
            else { this.mDir = -1;}                                                         // patrol left
        }
        this.mSpeedVel = 1;                                                                 // set speed to normal
        this.mEnemy.setColor([1, 0, 1, 1]);                                                 // show pink on patrol
    }
    xform.incXPosBy(this.kXDelta * this.mDir * this.mSpeedVel);                             // change position
};