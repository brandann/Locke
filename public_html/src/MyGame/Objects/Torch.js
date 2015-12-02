/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

MyGame.prototype._initLights = function() {
    var l = this._createALight(Light.eLightType.ePointLight,
            [30, 0, 5],         // position
            [0, 0, -1],          // Direction 
            [0.6, 1.0, 0.0, .1],  // some color
            3, 30,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
                    1.0                  // drop off
            );
    
    // this.mBg.getRenderable is not a function:
    this.mBg.addLight(l); 
    this.mHero.getRenderable().addLight(l);
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

//this.mIllumHero.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));