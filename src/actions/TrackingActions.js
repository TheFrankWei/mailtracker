import { API, graphqlOperation  } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import Instance from '../util/AxiosUtil';

//queries
export const GET_TRACKING_STARTED = 'GET_TRACKING_STARTED';
export const GET_TRACKING_SUCCEEDED = 'GET_TRACKING_SUCCEEDED';
export const GET_TRACKING_FAILED = 'GET_TRACKING_FAILED';

//mutations
export const CREATE_TRACKING_STARTED = 'CREATE_TRACKING_STARTED';
export const CREATE_TRACKING_SUCCEEDED = 'CREATE_TRACKING_SUCCEEDED';
export const CREATE_TRACKING_FAILED = 'CREATE_TRACKING_FAILED';

export const UPDATE_TRACKING_STARTED = 'UPDATE_TRACKING_STARTED';
export const UPDATE_TRACKING_SUCCEEDED = 'UPDATE_TRACKING_SUCCEEDED';
export const UPDATE_TRACKING_FAILED = 'UPDATE_TRACKING_FAILED';

export const DELETE_TRACKING_STARTED = 'DELETE_TRACKING_STARTED';
export const DELETE_TRACKING_SUCCEEDED = 'DELETE_TRACKING_SUCCEEDED';
export const DELETE_TRACKING_FAILED = 'DELETE_TRACKING_FAILED';


const onCreateTrackingStarted = () => ({
    type: CREATE_TRACKING_STARTED,
  });
  
  const onCreateTrackingSucceeded = response => ({
    type: CREATE_TRACKING_SUCCEEDED,
    response,
  });
  
  const onCreateTrackingFailed = error => ({
    type: CREATE_TRACKING_FAILED,
    error,
  });

const onGetTrackingStarted = () => ({
    type: GET_TRACKING_STARTED,
  });
  
  const onGetTrackingSucceeded = response => ({
    type: GET_TRACKING_SUCCEEDED,
    response,
  });
  
  const onGetTrackingFailed = error => ({
    type: GET_TRACKING_FAILED,
    error,
  });

  
  export const createTracking = (userID, carrier, trackingNumber, trackingSummary, userNotes) => (dispatch) => {
    dispatch(onCreateTrackingStarted());

    const variables = {
      "userID": userID,
      "carrier": carrier,
      "trackingNumber": trackingNumber,
      "trackingSummary": trackingSummary,
      "userNotes": userNotes,
    };

    //no use of axiosInstance?
    return API.graphql(graphqlOperation(mutations.createTrackingNumber, variables))
      .then((response) => {
        dispatch(onCreateTrackingSucceeded(response));
        return response;
      })
      .catch((error) => {
        const { response } = error;
        dispatch(onCreateTrackingFailed(response));
        throw error;
      });
  };

  export const getTracking = (userID) => (dispatch) => {
      dispatch(onGetTrackingStarted());

      const variables = {
        "userID": userID
      };

      //no use of axiosInstance?
      return API.graphql(graphqlOperation(queries.getTrackingNumbersByUser, variables))
        .then((response) => {
          dispatch(onGetTrackingSucceeded(response));
          return response;
        })
        .catch((error) => {
          const { response } = error;
          dispatch(onGetTrackingFailed(response));
          throw error;
        });
    };
    