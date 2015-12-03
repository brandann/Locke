/* File: EnemyStateChase.js  */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// sets the enemy state to pace around an initial position
Enemy.prototype.setChaseState = function(initPos) {
    
    var r = this.getPhysicsComponent();                                         // get the physics component
    r.setMass(0);                                                               // turn off mass so flying object does not fall
    
    this.getXform().setPosition(initPos[0], initPos[1]);                        // set the GameObject position to the initPos
    
    this.mState = null;                                                         // null the mState, this is just percautionary
    this.mSpeedVel = 0.15;                                                      // speed of the enemy when moving
    
    this._updateState(this.updateChase);                                        // set the update state to this state
};

Enemy.prototype.updateChase = function () {
    
    var xform = this.getXform();
    var distFromHero = vec2.distance(xform.getPosition(), this.mHero.getXform().getPosition());
    
    if(distFromHero < this.mRange) {                                            // check hero distance firsrt
        this.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.05);       // turn the enemy torwards the hero
        this.setSpeed(this.mSpeedVel);                                          // set the speed to make the enemy move torwards hero
        this.mEnemy.setColor([1, 0, 0, 1]);                                     // show red on chase
    }
    else {
        this.setSpeed(0.0);                                                     // set the speed to 0 to stop movement
        this.mEnemy.setColor([1, 0, 1, 1]);                                     // show pink on patrol
    }
};