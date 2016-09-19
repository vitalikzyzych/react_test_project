import Data from 'api/Data'

const EventsApi = {
  //here we should get data from api
  getEventsFromApi() {
    return Data.Events
  },
  //here we should save data to api
  saveAttendeeData(data){
    return true
  }
}
export default EventsApi
