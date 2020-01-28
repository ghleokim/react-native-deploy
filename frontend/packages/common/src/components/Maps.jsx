import React, { Component } from 'react';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';

class Maps extends Component {
   render() {
    return (
      <RenderAfterNavermapsLoaded clientId={"5w2twxe8nk"}>
      <NaverMap 
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%',
          height: '400px',
        }}
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={10}
      />
    </RenderAfterNavermapsLoaded>
     )
   }
}

export default Maps;