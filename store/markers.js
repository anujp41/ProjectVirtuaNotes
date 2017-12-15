import firebase from '../firebase';

//ACTION TYPE
const GET_MARKERS = 'GET_MARKERS';

//ACTION CREATORS
function getMarkers (markers) {
    const action = { type: GET_MARKERS, markers};
    return action;
}

//THUNKS
export function getMarkersThunk() {
    firebase.database().ref('location').once('value')
    .then(snapshot => {
      let markerArray = [];
      snapshot.forEach(child => {
        markerArray.push(child.val())
      })
      getMarker(markerArray);
    })
}

//REDUCERS
export default (state = [], action) => {
    switch (action.type) {
        case GET_MARKERS:
            return [action.markers];

        default:
            return [];
    }
}