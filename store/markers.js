import firebase from '../firebase';

//ACTION TYPE
const GET_MARKERS = 'GET_MARKERS';
const ADD_MARKER = 'ADD_MARKER';

//ACTION CREATORS
function getMarkers(markers) {
    const action = { type: GET_MARKERS, markers };
    return action;
}

function addMarker(marker) {
    const action = { type: ADD_MARKER, marker };
    return action;
}

//THUNKS

export function getMarkersThunk() {
    return function(dispatch) {
        firebase.database().ref('location').once('value')
        .then(snapshot => {
            let markerArray = [];
            snapshot.forEach(marker => {
                const markerDetail = marker.val();
                const markerObject = {
                    key: marker.key,
                    latitude: markerDetail.latitude,
                    longitude: markerDetail.longitude,
                    remainder: markerDetail.remainder
                }
                markerArray.push(markerObject);
            })
            return markerArray;
        })
        .then(markers => dispatch(getMarkers(markers)))
        .catch(error => console.log(error))
    }
}

export function addMarkerThunk(marker) {
    return function(dispatch) {
        dispatch(addMarker(marker));
        firebase.database().ref('location').push({
            latitude: marker.latitude,
            longitude: marker.longitude,
            remainder: marker.remainder
          })
    }
}

export function removeMarkerThunk(key) {
    return function(dispatch) {
        console.log('the key is ', key)
        // firebase.database().ref('location').child(key).remove();
    }
}

//REDUCERS
export default (state = [], action) => {
    switch (action.type) {
        case GET_MARKERS:
            return action.markers;

        case ADD_MARKER:
            return [...state, action.marker]

        default:
            return [];
    }
}