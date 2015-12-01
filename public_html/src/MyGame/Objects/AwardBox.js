/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function AwardBox(pixelPosition, spriteTexture, pos, size) {
    this.mPlatform = new SpriteRenderable(spriteTexture);

    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(pos[0], pos[1]);
    this.mPlatform.getXform().setSize(size[0],size[1]);
    this.mPlatform.setElementPixelPosArray(pixelPosition);
    
    GameObject.call(this,this.mPlatform);
    
    var rigidShape = new RigidRectangle(this.getXform(), size[0], size[1]);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 0.2, 0.2, 1]);
    this.setPhysicsComponent(rigidShape); 

    this.kDelta = 0.25;
    this.EndPos = null;
    this.StartPos = null;
    
    this.state = AwardBox.state.Waiting;
    this.animState = AwardBox.state.Waiting;
}
AwardBox.state = Object.freeze({
    Animating: 1,
    Waiting: 2,
    AnimUp: 3,
    AnimDown: 4
});

gEngine.Core.inheritPrototype(AwardBox, GameObject);


AwardBox.prototype.update = function (hero) {
    
    
    
    var bb = this.getBBox();
    var heroBB = hero.getBBox();
        
    
    
    if(this.state === AwardBox.state.Waiting){
        var status = bb.boundCollideStatus(heroBB);
        //var status = heroBB.boundCollideStatus(bb);
        if(11 === status || 10 === status || 9 === status ){
            this.state = AwardBox.state.Animating;
            this.StartPos = this.getXform().getYPos();
            this.animState = AwardBox.state.AnimUp;
            this.EndPos = this.StartPos + 3;
        }
    }

    if(this.state === AwardBox.state.Animating){
        this.updateAnimation();
    }
    
    GameObject.prototype.update.call(this);
      
};

AwardBox.prototype.updateAnimation = function () {
    var currentPos = this.getXform().getYPos();
    
    if(currentPos < this.EndPos && AwardBox.state.AnimUp === this.animState){
        this.getXform().setYPos(currentPos + this.kDelta);
    }
    else if(currentPos >= this.EndPos && AwardBox.state.AnimUp === this.animState){
        this.animState = AwardBox.state.AnimDown;
        this.getXform().setYPos(this.EndPos);
    }
    else if(currentPos > this.StartPos && AwardBox.state.AnimDown === this.animState){
        this.getXform().setYPos(currentPos - this.kDelta);
    }
    else if(currentPos <= this.StartPos && AwardBox.state.AnimDown === this.animState){
        this.getXform().setYPos(this.StartPos);
        this.state = AwardBox.state.Waiting;
    }
};

AwardBox.prototype.getWidth = function () {
    return this.mPlatform.getXform().getWidth();
};

