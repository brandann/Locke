/* File: EnemyStateChase.js  */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// sets the enemy state to pace around an initial position
Enemy.prototype.setChaseState = function(initPos) {
    var r = new RigidRectangle(this.getXform(), 5, 5);
    r.setMass(0);  // less dense than Minions
    
    this.mInitialPosition = initPos;
    this.getXform().setPosition(initPos[0], initPos[1]);
    
    this.kXDelta = .1;
    this.mDir = 1;
    this.mState = null;
    this.mSpeedVel = 1;
    
    this._updateState(this.updateChase);
};

Enemy.prototype.updateChase = function () {
    
    var xform = this.getXform();
    var distFromHero = vec2.distance(xform.getPosition(), this.mHero.getXform().getPosition());
    var distFromInitial = vec2.distance(xform.getPosition(), this.mInitialPosition);
    
    if(distFromHero < 30) {                                                                 // check hero distance firsrt
        this.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.05);
        this.setSpeed(0.05);
        this.mEnemy.setColor([1, 0, 0, 1]);                                                 // show red on chase
    }
    else {
        this.setSpeed(0.0);
        this.mEnemy.setColor([1, 0, 1, 1]);                                                 // show pink on patrol
    }
    //xform.incXPosBy(this.kXDelta * this.mDir * this.mSpeedVel);                             // change position
};