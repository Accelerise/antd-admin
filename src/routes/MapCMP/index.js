import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {Map, Marker, MapvLayer, InfoWindow, NavigationControl} from 'react-bmap'
import queryString from 'query-string'
import { Page } from 'components'
// var polygonData = [
//   {geometry: {"type":"Polygon","coordinates":[[[116.417475,39.923688],[116.42078,39.919704],[116.413881,39.918708],[116.412013,39.921917]]]}},
//   {geometry: {"type":"Polygon","coordinates":[[[116.416828,39.924573],[116.411007,39.924407],[116.41036,39.927451],[116.422721,39.928502]]]}}
// ]

const MapCMP = ({mapCMP}) => {
  // location.query = queryString.parse(location.search)
  const { dataset } = mapCMP

  return (
    <Page inner>
      <Map center = {{
        lng: 116.450229,
        lat: 39.946158
      }}
      zoom = '13'
      mapStyle={{style: 'midnight'}}>
      <NavigationControl />
      <MapvLayer data={dataset} options={{
        fillStyle: 'rgba(255, 250, 50, 0.8)',
        methods: {click: (item)=>{console.log(item)}},
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        size: 1,
        draw: 'simple',
        autoViewport: true,
        viewportOptions: {zoomFactor: 1}
      }} />
    </Map>
    {/* <Map center = {{
      lng: 105.403119,
      lat: 38.028658
    }}
    zoom = '5'
    mapStyle={{style: 'midnight'}}>
    <MapvLayer data={polygonData} options={{
      fillStyle: 'rgba(255, 250, 50, 0.8)',
      draw: 'simple',
      autoViewport: true
    }} />
  </Map> */}
</Page>
)
}

MapCMP.propTypes = {
  loading: PropTypes.object,
  location: PropTypes.object,
}

export default connect(props => props)(MapCMP)
