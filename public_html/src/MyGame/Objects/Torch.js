/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

MyGame.prototype._initLights = function(pos) {
    var l = this._createALight(Light.eLightType.ePointLight,
            [pos[0], pos[1], 0],         // position
            [0, 0, -1],          // Direction 
            [255/255, 30/255, 0/255, 1],  // some color
            0, 10,               // near and far distances
            0.1, 0.2,            // inner and outer cones
                    .5,                   // intensity
                            1                  // drop off
            );
    
    
    this.mBg.addLight(l); 
    this.mHero.getRenderable().addLight(l);
    
    var torch = new Torch(pos, this.kspritesheet_torch);
    torch.addLight(l);
    
    return torch;
};

MyGame.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);      
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    
    return light;
};

function Torch(pos, spriteSheet) {
    this.mTorch = new LightRenderable(spriteSheet);
    this.mTorch.setColor([1, 1, 1, 0]);
    this.mTorch.getXform().setPosition(pos[0], pos[1]);
    this.mTorch.getXform().setSize(2.5,5);
    
    this.mTorch.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mTorch.setAnimationSpeed(20); 
    this.mTorch.setSpriteSequence(128, 0, 46, 128, 2, 0);
    
    this.mRedColor = [255/255, 0/255, 0/255, 1];
    this.mOrangeColor = [255/255, 30/255, 0/255, 1];
    this.mColorCount = 20;
    this.mColorToggle = false;
    
    
    
    GameObject.call(this, this.mTorch);
}

gEngine.Core.inheritPrototype(Torch, GameObject);

Torch.prototype.addLight = function(l) {
    this.mTorch.addLight(l);
};

Torch.prototype.update = function () {
    // must call super class update
    GameObject.prototype.update.call(this);
    this.mTorch.updateAnimation();
    this.mColorCount--;
    if(this.mColorCount <= 0) {
        var tcolor = this.mTorch.getLightAt(0).getColor();
        if(this.mColorToggle) { this.mTorch.getLightAt(0).setColor(this.mRedColor);}
        else {this.mTorch.getLightAt(0).setColor(this.mOrangeColor);}
        this.mColorCount = 20;
        this.mColorToggle = !this.mColorToggle;
    }
};