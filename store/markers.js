import firebase from '../firebase';

//ACTION TYPE
const GET_MARKERS = 'GET_MARKERS';

//ACTION CREATORS
function getMarkers(markers) {
    const action = { type: GET_MARKERS, markers};
    return action;
}

//THUNKS

export function getMarkersThunk() {
    return function(dispatch) {
        firebase.database().ref('location').once('value')
        .then(snapshot => {
            let markerArray = [];
            snapshot.forEach(marker => {
                markerArray.push(marker.val());
            })
            return markerArray;
        })
        .then(markers => dispatch(getMarkers(markers)))
        .catch(error => console.log(error))
    }
}

//REDUCERS
export default (state = [], action) => {
    switch (action.type) {
        case GET_MARKERS:
            return action.markers;

        default:
            return [];
    }
}