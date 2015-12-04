





MyGame.prototype.LevelBlock1 = function (offset) {
    
    
        
  
    var bg = new LightRenderable(this.kBgGreenLandBG);
    var BgXform = bg.getXform();
    BgXform.setPosition(80 + offset,60);
    BgXform.setSize(160,120);
    this.mBackGrouds.addToSet(bg);
    
    var YLayerPos =[];
    YLayerPos[1] = 5;
    YLayerPos[2] = 15;
    YLayerPos[3] = 25; //base ground layer
    YLayerPos[4] = 35; 
    YLayerPos[5] = 45;
    YLayerPos[6] = 55;
    YLayerPos[7] = 65;
    YLayerPos[8] = 75;
    YLayerPos[9] = 85;
    YLayerPos[10] = 95;
    YLayerPos[11] = 105;
    YLayerPos[12] = 115;
    
    var XLayerPos =[];
    XLayerPos[1] = 5;
    XLayerPos[2] = 15;
    XLayerPos[3] = 25;
    XLayerPos[4] = 35;
    XLayerPos[5] = 45;
    XLayerPos[6] = 55;
    XLayerPos[7] = 65;
    XLayerPos[8] = 75;
    XLayerPos[9] = 85;
    XLayerPos[10] = 95;
    XLayerPos[11] = 105;
    XLayerPos[12] = 115;
    XLayerPos[13] = 125;
    XLayerPos[14] = 135;
    XLayerPos[15] = 145;
    XLayerPos[16] = 155;
    
    var i;
    for(i = 1; i<=16; i++){
        XLayerPos[i] += offset;
    }
    
    for(i = 1; i <= 16; i++){
        this.mPlatformFactory.newSimplePlatform('middleGreen','greenPlatforms',
                                                [XLayerPos[i],YLayerPos[3]]);
        this.mPlatformFactory.newSimpleTexture('dirt','greenPlatforms',
                                                [XLayerPos[i],YLayerPos[2]]);
        this.mPlatformFactory.newSimpleTexture('dirt','greenPlatforms',
                                                [XLayerPos[i],YLayerPos[1]]);
//                                                
    }
    
    this.mPlatformFactory.newSimplePlatform('leftGreen','greenPlatforms',
                                                [XLayerPos[7],YLayerPos[4]]);
    this.mPlatformFactory.newSimplePlatform('dirt','greenPlatforms',
                                                [XLayerPos[8],YLayerPos[4]]);
    this.mPlatformFactory.newSimplePlatform('dirt','greenPlatforms',
                                                [XLayerPos[9],YLayerPos[4]]);
                                                
    this.mPlatformFactory.newSimplePlatform('leftGreen','greenPlatforms',
                                                [XLayerPos[8],YLayerPos[5]]);
    this.mPlatformFactory.newSimplePlatform('rightGreen','greenPlatforms',
                                                [XLayerPos[9],YLayerPos[5]]); 
                                                
                                                
    this.mPlatformFactory.newSimpleTexture('dirt','greenPlatforms',
                                                [XLayerPos[7],YLayerPos[3]]);
    this.mPlatformFactory.newSimpleTexture('dirt','greenPlatforms',
                                                [XLayerPos[8],YLayerPos[3]]);
    this.mPlatformFactory.newSimpleTexture('dirt','greenPlatforms',
                                                [XLayerPos[9],YLayerPos[3]]);
                                                
                                                
    this.mPlatformFactory.newSimplePlatform('plainBox','objects',
                                                [XLayerPos[11],YLayerPos[7]]);
    this.mPlatformFactory.newSimplePlatform('plainBox','objects',
                                                [XLayerPos[12],YLayerPos[7]]);
    this.mPlatformFactory.newSimplePlatform('plainBox','objects',
                                                [XLayerPos[13],YLayerPos[7]]);
    this.mPlatformFactory.newAwardPlatform([XLayerPos[14],YLayerPos[7]]);
    
    
    this.mPlatformFactory.newSimplePlatform('lock','objects',
                                                [XLayerPos[1],YLayerPos[4]]);                                                                                                
    this.mPlatformFactory.newSimplePlatform('lock','objects',
                                                [XLayerPos[1],YLayerPos[5]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[1],YLayerPos[6]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[1],YLayerPos[7]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[1],YLayerPos[8]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[1],YLayerPos[9]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[1],YLayerPos[10]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[1],YLayerPos[11]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[2],YLayerPos[10]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[2],YLayerPos[11]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[1],YLayerPos[12]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[2],YLayerPos[12]]);                                                 
                                                
                                                
                                                

//     this.mPlatformFactory.newSimplePlatform('middle','greenPlatforms',
//                                                [XLayerPos[1],YLayerPos[4]]);
    
//    this.mPlatformFactory.newBoxPlatform('!withBorder','objects',[10,this.kLayerPos[8]]);
//    this.mPlatformFactory.newBoxPlatform('plainBox','objects',[20,this.kLayerPos[8]]);
//    this.mPlatformFactory.newBoxPlatform('plainBox','objects',[30,this.kLayerPos[8]]);
//    this.mPlatformFactory.newSpikePlatform([xPos + 10,this.kLayerPos[3]]);
//    this.mPlatformFactory.newSpikePlatform([xPos + 20,this.kLayerPos[3]]);
//    this.mPlatformFactory.newAwardPlatform([60,this.kLayerPos[8]]);
//    
//    var e = new Enemy();
//    e.setHeroObject(this.mHero);
//    e.setPaceState([70, this.kLayerPos[5]]);
//    this.mEnemies.addToSet(e);
//    
//    var e = new Enemy();
//    e.setHeroObject(this.mHero);
//    e.setChaseState([this.kLayerPos[12], this.kLayerPos[8]]);
//    this.mEnemies.addToSet(e);

};


