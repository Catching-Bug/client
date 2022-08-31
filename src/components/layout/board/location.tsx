import { boardFetchDataTypes } from '../../utils/interface/boardFetchDataTypes'
import Map from '../map/map'

const Location = (boardDatas: boardFetchDataTypes) => {
  return (
    <>
      <div className="locationContainer">
        <div className="mapWrapper">
          <Map
            displayUserLocationMarker={{
              latitude: boardDatas.content.latitude,
              longitude: boardDatas.content.longitude,
            }}
          ></Map>
        </div>
        <div className="locationInfoWrapper">
          <h1 className="addressInfoTab">📌 주소</h1>
          <span className="adrressText">{`${boardDatas.content.region} ${
            boardDatas.content.city
          } ${boardDatas.content.town} ${
            boardDatas.content.detailLocation
              ? boardDatas.content.detailLocation
              : ''
          }`}</span>
        </div>
      </div>

      <style jsx>{`
        .locationContainer {
          width: 98%;
          height: 300px;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          display: flex;
          flex-direction: column;
          align-items: center;
          border-left: 1px solid lightcoral;
        }

        .mapWrapper {
          width: 98%;
          height: 200px;
          border-radius: 10px;
          overflow: hidden;
          margin: 10px 0;
        }

        .locationInfoWrapper {
          width: 98%;
        }

        .addressInfoTab {
          margin: 5px 0;
          font-size: 1.2em;
        }
      `}</style>
    </>
  )
}

export default Location
