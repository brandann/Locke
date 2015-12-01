/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function PlatformFactory(mapOfSprites, globalPlatformSet) {
    this.mSpriteSheetMap = mapOfSprites;
    this.mSpriteMap = {};
    this.mAllPlatforms = globalPlatformSet;
    
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
    key = 'spikes';
    this.mSpriteMap[key] = [129.5,257,0,65];
}

PlatformFactory.prototype.newSimplePlatform = function (object, sheet, pos) {
    var platform = new Platform(this.mSpriteMap[object], this.mSpriteSheetMap[sheet], pos, [10,15]);
    this.mAllPlatforms.addToSet(platform);
    return platform.getWidth();
};

PlatformFactory.prototype.newBoxPlatform = function (object, sheet, pos) {
    var platform = new Platform(this.mSpriteMap[object], this.mSpriteSheetMap[sheet], pos, [8,8]);
    this.mAllPlatforms.addToSet(platform);
    return platform.getWidth();

};

PlatformFactory.prototype.newSpikePlatform = function (pos) {
    var objectKey = 'spikes';
    var sheetKey = 'objects';
    var platform = new SpikePlatform(this.mSpriteMap[objectKey], this.mSpriteSheetMap[sheetKey], pos, [8,5]);
    this.mAllPlatforms.addToSet(platform);
    return platform.getWidth();

};

PlatformFactory.prototype.newAwardPlatform = function (pos) {
    var objectKey = '!withBorder';
    var sheetKey = 'objects';
    var platform = new AwardBox(this.mSpriteMap[objectKey], this.mSpriteSheetMap[sheetKey], pos, [8,8]);
    this.mAllPlatforms.addToSet(platform);
    return platform.getWidth();
};