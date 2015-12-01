/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function HUDManager(hudSpriteSheet) {
    this.mSpriteSheet = hudSpriteSheet;
    this.mSpriteMap = {};
 
    var key;
    
    key = 'heart';
    this.mSpriteMap[key] = [0,128,640,768];
    key = 'blueDiamond';
    this.mSpriteMap[key] = [0,128,896,1024];
    key = 'goldKeyEmpty';
    this.mSpriteMap[key] = [256,384,256,384];
    key = 'goldKey';
    this.mSpriteMap[key] = [256,384,128,256];
   
    this.lifeCounter = new Counter(this.mSpriteSheet);
    this.keyCounter = new Counter(this.mSpriteSheet);
    this.powerCounter = new Counter(this.mSpriteSheet);
    
    this.heartIcon = this.createIcon('heart');
    this.powerIcon = this.createIcon('blueDiamond');
    this.keyIcon = this.createIcon('goldKeyEmpty');
}

HUDManager.prototype.createIcon = function (key) {
    var sprite = new SpriteRenderable(this.mSpriteSheet);
    sprite.setColor([1, 1, 1, 0]);
    sprite.setElementPixelPosArray(this.mSpriteMap[key]); 
    return sprite;
};

HUDManager.prototype.update = function (aCamera,lifeCount,keyCount) {

    
    var camX = aCamera.getWCCenter()[0];
    var camY = aCamera.getWCCenter()[1];
    var camW = aCamera.getWCWidth();
    var camH = aCamera.getWCHeight();
    
    var upperRightX = camX + camW/2;
    var upperRightY = camY + camH/2;
    
    var offsetY = camH * 0.03;
    var offsetX = camW * 0.02;
    
    var hudelemH = 5;
    var hudelemW = 5;
    
    this.lifeCounter.set(upperRightX - offsetX, upperRightY - offsetY,
                            hudelemW, hudelemH);
    
    var Offset = upperRightX - (offsetX/2) - hudelemW;
    this.heartIcon.getXform().setPosition(Offset, upperRightY - offsetY);
    this.heartIcon.getXform().setSize(hudelemW,hudelemH);
    
    Offset = upperRightX - (offsetX) - (2* hudelemW);
    this.powerCounter.set(Offset, upperRightY - offsetY,
                            hudelemW, hudelemH);
    
    Offset = upperRightX - (offsetX/2) - (3 * hudelemW);
    this.powerIcon.getXform().setPosition(Offset, upperRightY - offsetY);
    this.powerIcon.getXform().setSize(hudelemW,hudelemH);
    
    Offset = upperRightX - (offsetX) - (4 * hudelemW);
    this.keyIcon.getXform().setPosition(Offset, upperRightY - offsetY);
    this.keyIcon.getXform().setSize(hudelemW,hudelemH);
};

HUDManager.prototype.draw = function (aCamera) {
    this.lifeCounter.draw(aCamera);
    this.heartIcon.draw(aCamera);
    this.powerCounter.draw(aCamera);
    this.powerIcon.draw(aCamera);
    this.keyIcon.draw(aCamera);
};

HUDManager.prototype.getLifeCounter = function() {
    return this.lifeCounter;
};