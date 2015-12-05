/* File: EnemyStatePace.js  */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// sets the enemy state to pace around an initial position
Enemy.prototype.setPaceState = function(initPos, dist, range) {
    
    this.mInitialPosition = initPos;
    this.getXform().setPosition(initPos[0], initPos[1]);
    
    this.kXDelta = .1;
    this.mDir = 1;
    this.mState = null;
    this.mSpeedVel = 1;
    this.mPaceDistance = dist;
    
    this._updateState(this.updatePace);
    
    this.mRange = range;
};

Enemy.prototype.updatePace = function () {
    
    var xform = this.getXform();
    var distFromHero = vec2.distance(xform.getPosition(), this.mHero.getXform().getPosition());
    var distFromInitial = vec2.distance(xform.getPosition(), this.mInitialPosition);
    var heroXPos = this.mHero.getXform().getXPos();
    var enemyXPos = xform.getXPos();
    
    if(distFromHero < this.mRange) {                                            // check hero distance firsrt
        if(heroXPos > enemyXPos) { this.mDir = 1; }                             // chase right
        else { this.mDir = -1; }                                                // chase left
        this.mSpeedVel = 1.75;                                                  // increase speed
        if(Math.abs(heroXPos - enemyXPos) < 0.11) {this.mSpeedVel = 0;}         // if the enemy is under the hero stop pacing
        this.mEnemy.setColor([1, 0, 0, 1]);                                     // show red on chase
    }
    else {
        if (distFromInitial > this.mPaceDistance) {                                              // reached patrol bounds
            if(enemyXPos < this.mInitialPosition[0]) { this.mDir = 1; }         // partol right
            else { this.mDir = -1;}                                             // patrol left
        }
        this.mSpeedVel = 1;                                                     // set speed to normal
        this.mEnemy.setColor([1, 0, 1, 1]);                                     // show pink on patrol
    }
    xform.incXPosBy(this.kXDelta * this.mDir * this.mSpeedVel);                 // change position
};