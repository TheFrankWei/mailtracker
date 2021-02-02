const getTrackingNumbersByUser = `
    query getTrackingNumbersByUser($userID: String!) {
        listTrackingNumbers(filter: {userID: {contains: $userID}}) {
            items {
                id
                carrier
                trackingNumber
                trackingSummary
                userNotes
                _version
            }
        }
    }
  `


export {getTrackingNumbersByUser};
  
