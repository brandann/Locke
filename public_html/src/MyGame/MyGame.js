/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kPlatformGreenSprite = "assets/PlatformSprite_Green.png";
    this.kBgBlueLandBG = "assets/blue_land.png";
    this.kBgGreenLandBG = "assets/green_land.png";
    this.kspritesheet_tiles = "assets/spritesheet_tiles.png";
	this.kspritesheet_hud = "assets/spritesheet_hud.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mAllPlatforms = null;
    this.mHUDManager = null;
    this.mEnemies = null;
    this.mBg = null;
    
    this.mPlatformFactory = null;
    this.mHero = null;
    
    this.kGroundPlatWidth = 10;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformGreenSprite);
    gEngine.Textures.loadTexture(this.kBgBlueLandBG);
    gEngine.Textures.loadTexture(this.kBgGreenLandBG);
    gEngine.Textures.loadTexture(this.kspritesheet_tiles);
    gEngine.Textures.loadTexture(this.kspritesheet_hud);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPlatformGreenSprite);
    gEngine.Textures.unloadTexture(this.kBgBlueLandBG);
    gEngine.Textures.unloadTexture(this.kBgGreenLandBG);
    gEngine.Textures.unloadTexture(this.kspritesheet_tiles);
    gEngine.Textures.unloadTexture(this.kspritesheet_hud);
};

MyGame.prototype.initialize = function () {   
    //create game object sets
    this.mAllPlatforms = new GameObjectSet();
    
    var assetMap = {};
    var key;
    
    key = 'greenPlatforms';
    assetMap[key] = this.kPlatformGreenSprite;    
    
    key = 'objects';
    assetMap[key] = this.kspritesheet_tiles;
    
    
    
    this.mPlatformFactory = new PlatformFactory(assetMap,this.mAllPlatforms);
    this.mHUDManager = new HUDManager(this.kspritesheet_hud);

    
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                       // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    
    var i;
    var xPos = -50;
    
    for(i = 0; i < 15; i++){
        var width = this.mPlatformFactory.newSimplePlatform('middle','greenPlatforms',[xPos,-20]);
        xPos += width;
    }
    
    this.mPlatformFactory.newBoxPlatform('!withBorder','objects',[10,10]);
    this.mPlatformFactory.newBoxPlatform('plainBox','objects',[2,10]);
    this.mPlatformFactory.newBoxPlatform('plainBox','objects',[-6,10]);
    this.mPlatformFactory.newSpikePlatform([-15,-10]);
    this.mPlatformFactory.newSpikePlatform([-23,-10]);
    this.mPlatformFactory.newAwardPlatform([20,10]);
  
    this.mBg = new TextureRenderable(this.kBgGreenLandBG);
    var BgXform = this.mBg.getXform();
    BgXform.setPosition(0,0);
    BgXform.setSize(100,100);
    
    this.mHero = new Hero();
    
    this.mEnemies = new GameObjectSet();
    
    var e = new Enemy();
    e.setHeroObject(this.mHero);
    e.setPaceState([27, -10]);
    this.mEnemies.addToSet(e);
    
    var e = new Enemy();
    e.setHeroObject(this.mHero);
    e.setChaseState([-35, 10]);
    this.mEnemies.addToSet(e);
    
    this._initLights();
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    
    this.mBg.draw(this.mCamera);
    
    this.mAllPlatforms.draw(this.mCamera);
	this.mEnemies.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mHUDManager.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    this.mAllPlatforms.updateWithREF(this.mHero);
    this.mHero.update(this.mAllPlatforms);
    this.mHUDManager.update(this.mCamera,0,0);
	this.mEnemies.update();
    
    this._physicsSimulation();
};