





MyGame.prototype.LevelBlock7 = function (offset) {

    
    
    var bg = new LightRenderable(this.kspritesheet_castleBG);
    var BgXform = bg.getXform();
    BgXform.setPosition(80 + offset,60);
    BgXform.setSize(160,120);
    this.mBackGrouds.addToSet(bg);
    
    var YLayerPos =[];
    YLayerPos[0] = -30;
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
        this.mPlatformFactory.newSimpleTexture('stone','objects',
                                                [XLayerPos[i],YLayerPos[12]]);        
                                                     
    }
    
    
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[1],YLayerPos[4]]);    
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[2],YLayerPos[4]]);
                                                
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[6],YLayerPos[5]]); 
                                                
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[7],YLayerPos[5]]);
                                                
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[7],YLayerPos[6]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[7],YLayerPos[7]]);
                                                
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[12],YLayerPos[6]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[13],YLayerPos[6]]); 
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[15],YLayerPos[4]]);
    this.mPlatformFactory.newSimplePlatform('stone','objects',
                                                [XLayerPos[16],YLayerPos[4]]);                                                
                                               
                                                
    var e = new Enemy();
    e.setHeroObject(this.mHero);
    e.setPaceState(             // set enemy as "not bat"
            [80 + offset, 60],  // initial position
            12,                 // pace distance
            30);                // detection range
    this.mBlobs.addToSet(e);
//    
    var e1 = new Enemy();
    e1.setHeroObject(this.mHero);
    e1.setChaseState(           // set enemy as bat
            [115 + offset, 75], // initial position
            20);                // detection range
    this.mBats.addToSet(e1);
    
    var e = new Enemy();
    e.setHeroObject(this.mHero);
    e.setChaseState(            // set enemy as bat
            [40 + offset, 95],  // initial position
            20);                // detection range
    this.mBats.addToSet(e); 

};


