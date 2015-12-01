/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function PlatformFactory(mapOfSprites) {
    this.mSpriteSheetMap = mapOfSprites;
    this.mSpriteMap = {};
    
    var key;
    
    //green platforms
    key = 'middle';
    this.mSpriteMap[key] = [280,349,233,301];
    
    
    //objects
    key = 'plainBox';
    this.mSpriteMap[key] = [0,127,1280,1408];
    key = 'boxWithX';
    this.mSpriteMap[key] = [0,127,1408,1536];
    key = 'boxWithSlash';
    this.mSpriteMap[key] = [0,127,1536,1664];
    key = 'rock';
    this.mSpriteMap[key] = [256,384,1280,1407];
    key = '!withBorder';
    this.mSpriteMap[key] = [512,639,1280,1408];
}

PlatformFactory.prototype.newSimplePlatform = function (object, sheet, pos) {
    return new Platform(this.mSpriteMap[object], this.mSpriteSheetMap[sheet], pos, [10,15]);

};

PlatformFactory.prototype.newBoxPlatform = function (object, sheet, pos) {
    return new Platform(this.mSpriteMap[object], this.mSpriteSheetMap[sheet], pos, [8,8]);

};