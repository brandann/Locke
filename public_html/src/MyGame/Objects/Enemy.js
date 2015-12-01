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
}

gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype.update = function () {
    // must call super class update
    GameObject.prototype.update.call(this);
    
    if(this.mHero !== null) {
        if(this.mState === null) {console.log("Enemy is missing updatestate! call setState()");}
        else {this.mState();}
        this._heroCollision();
    }
};

Enemy.prototype._heroCollision = function () {
    var enemyBBox = this.getBBox();
    var heroBBox = this.mHero.getBBox();
    
    if(enemyBBox.intersectsBound(heroBBox)){ 
        console.log("Coll w/ Hero");
        this.mEnemy.setColor([1, 1, 1, 1]); // show white on collision
    }
    else { 
        // TODO: something w/ hero on collision
    }
};

Enemy.prototype._updateState = function (func) {
    this.mState = func;
};

Enemy.prototype.setHeroObject = function(hero) {
    this.mHero = hero;
};