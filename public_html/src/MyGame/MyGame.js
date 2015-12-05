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
    this.kspritesheet_hero = "assets/spritesheet_hero_walk.png";
    this.kspritesheet_torch = "assets/Torch.png";
    
    this.kLayerPos = [];
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMiniMap = null;
    this.mBg = null;
    this.mMiniMapBg = null;
    
    
    this.mAllPlatforms = null;
    this.mHUDManager = null;
    this.mEnemies = null;
    this.mTextures = null;
    this.mBackGrouds = null;

    
    this.mPlatformFactory = null;
    this.mHero = null;
    

    this.kGameWorldWidth = 1600;
    
    
    this.mTorchSet = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformGreenSprite);
    gEngine.Textures.loadTexture(this.kBgBlueLandBG);
    gEngine.Textures.loadTexture(this.kBgGreenLandBG);
    gEngine.Textures.loadTexture(this.kspritesheet_tiles);
    gEngine.Textures.loadTexture(this.kspritesheet_hud);
    gEngine.Textures.loadTexture(this.kspritesheet_hero);
    gEngine.Textures.loadTexture(this.kspritesheet_torch);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPlatformGreenSprite);
    gEngine.Textures.unloadTexture(this.kBgBlueLandBG);
    gEngine.Textures.unloadTexture(this.kBgGreenLandBG);
    gEngine.Textures.unloadTexture(this.kspritesheet_tiles);
    gEngine.Textures.unloadTexture(this.kspritesheet_hud);
    gEngine.Textures.unloadTexture(this.kspritesheet_hero);
    gEngine.Textures.unloadTexture(this.kspritesheet_torch);
};

MyGame.prototype.initialize = function () { 
    

    
    //create game object sets
    this.mAllPlatforms = new GameObjectSet();
    this.mTextures = new GameObjectSet();
    this.mBackGrouds = new GameObjectSet();
    this.mEnemies = new GameObjectSet();
 
//Define SpriteSheets-----------------------------------------------------------
    var assetMap = {};
    var key;
    
    key = 'greenPlatforms';
    assetMap[key] = this.kPlatformGreenSprite;    
    
    key = 'objects';
    assetMap[key] = this.kspritesheet_tiles;
    
 // CreateManagers--------------------------------------------------------------   
    
    this.mPlatformFactory = new PlatformFactory(assetMap,this.mAllPlatforms,
                                                this.mTextures);
    this.mHUDManager = new HUDManager(this.kspritesheet_hud,this.kspritesheet_tiles);

//  Create Cameras--------------------------------------------------------------
    var mainCamH = 600;
    var mainCamW = 800;
    this.mCamera = new Camera(
        vec2.fromValues(80, 60), 
        160,                       
        [0, 0, mainCamW, mainCamH]           
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    var miniMapH = mainCamH/2;
    var miniMapW = mainCamW;
    
    var LLX = 0;
    var LLY = mainCamH/2 - miniMapH/2;
            
    this.mMiniMap = new Camera(
        vec2.fromValues(80, 60), 
        this.kGameWorldWidth,                     
        [LLX, LLY, miniMapW, miniMapH]   
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mMiniMapBg = new Renderable();
    this.mMiniMapBg.setColor([0,0,0,1]);
    var mapXform = this.mMiniMapBg.getXform();
    mapXform.setPosition(80,60);
    mapXform.setSize(this.mCamera.getWCWidth(),this.mCamera.getWCHeight()/2 + 1);
    
 
 //set up Lights----------------------------------------------------------------
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

 //initialize game world--------------------------------------------------------

    this.mBg = new LightRenderable(this.kBgGreenLandBG);
    var BgXform = this.mBg.getXform();
    BgXform.setPosition(80,60);
    BgXform.setSize(160,120);
    
    var offset = 0;
    this.LevelBlock1(offset);
    offset += 160;
    this.LevelBlock2(offset);

    
    this.mHero = new Hero(this.kspritesheet_hero);
    this.mHero.setLifeCounter(this.mHUDManager.getLifeCounter());
    this.mHero.setPowerCounter(this.mHUDManager.getPowerCounter());
    
   

    
    this.mTorchSet = new GameObjectSet();
    this.mTorchSet.addToSet(this._initLights([30,0]));
    this.mTorchSet.addToSet(this._initLights([10,0]));
    this.mTorchSet.addToSet(this._initLights([-10,0]));
    this.mTorchSet.addToSet(this._initLights([-30,0]));
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this._drawGameWorld(this.mCamera);
    this.mHUDManager.draw(this.mCamera);
    //draw the minimap if the user pressed M 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M)) {
        
        var mapXform = this.mMiniMapBg.getXform();
        mapXform.setPosition(this.mCamera.getWCCenter()[0],this.mCamera.getWCCenter()[1]);
        this.mMiniMapBg.draw(this.mCamera);
        this.mMiniMap.setupViewProjection();
        this._drawGameWorld(this.mMiniMap);
    }
};

MyGame.prototype._drawGameWorld = function (aCamera) {
    this.mBackGrouds.draw(aCamera);
    
    this.mAllPlatforms.draw(aCamera);
    this.mTextures.draw(aCamera);
    this.mEnemies.draw(aCamera);
    this.mHero.draw(aCamera);
   
    this.mTorchSet.draw(aCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mAllPlatforms.updateWithREF(this.mHero);
    this.mHero.update(this.mAllPlatforms,this.mEnemies);
    this.mHUDManager.update(this.mCamera,0,0);
    this.mEnemies.update();
    this.mTorchSet.update();
    
    this.mCamera.clampAtBoundary(this.mHero.getXform(), 1);
    this.mCamera.update();
    this.mCamera.panWith(this.mHero.getXform(), 0.4);
    this.mCamera.clampToBackGround(this.mBg);

    this._physicsSimulation();
};