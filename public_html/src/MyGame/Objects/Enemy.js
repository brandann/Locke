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

function Enemy() {
    
    this.mEnemy = new Renderable();
    this.mEnemy.setColor([1, 0, 1, 1]);
    this.mEnemy.getXform().setPosition(-30, 10);
    this.mEnemy.getXform().setSize(5, 5);

    GameObject.call(this, this.mEnemy);
    var r = new RigidRectangle(this.getXform(), 5, 5);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([1, 1, 0, 1]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
    
    this.mHero = null;
    
    this.mRange = 30;
}

gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype.update = function () {
    // must call super class update
    GameObject.prototype.update.call(this);
    console.log("enemy pos: " + this.getXform().getXPos() + ", " + this.getXform().getYPos());
    if(this.mHero !== null) {                                                   // if the hero is null or not set do not do anything with the enemy
        if(this.mState === null) {console.log("Enemy is missing estate");}      // if the state is set to null then the enemy has no AI or logic
        else {this.mState();}                                                   // update the state
        this._heroCollision();                                                  // check for collisions with the hero
    }
};

// this looks for hero collisions and maybe reports to the hero
// when a collision has been detected
Enemy.prototype._heroCollision = function () {
    
    var enemyBBox = this.getBBox();
    var heroBBox = this.mHero.getBBox();
    
    if(enemyBBox.intersectsBound(heroBBox)){ 
        this.mEnemy.setColor([1, 1, 1, 1]);                                     // show white on collision
        this.mHero.handleEnemyCollision(this);
    }
};

// sets the enemy AI state
// set the function to be called. fancy Javascript right here.
Enemy.prototype._updateState = function (func) {
    this.mState = func;
};

// set the hero object, each update state uses the hero
// different however they want
// set the hero for the enemy to interact with
Enemy.prototype.setHeroObject = function(hero) {
    this.mHero = hero;
};