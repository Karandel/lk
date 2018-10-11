import axios from 'axios'

export default class ALP_ITIL_API {
  constructor () {
    let service = axios.create({
      baseURL: '/api/client/v1',
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic UmVzdCBBUEkgVXNlcjpxZmVlNS5mZDosQTZxUSZC',
        'sessionid': localStorage.getItem('ALP_ITIL_API_SessionID')
      }
    })
    service.interceptors.response.use(this._handleSuccess, this._handleError)
    this.service = service
  }

  _handleSuccess (response) {
    return response
  }

  _handleError = (error) => {
    console.log(error)
    // switch (error.response.status) {
    //   case 401:
    //     this.redirectTo(document, '/')
    //     break;
    //   case 404:
    //     this.redirectTo(document, '/404')
    //     break;
    //   default:
    //     this.redirectTo(document, '/500')
    //     break;
    // }
    return Promise.reject(error)
  }

  authUser (requestData, callback) {
    return this.service.post('/auth', requestData)
      .then((response) => callback(response.data))
  }

  getPersonalTicketList () {
    return this.service.get('/tickets')
  }

  getTicketData (ticketNumber) {
    return this.service.get('/tickets/' + ticketNumber)
  }

  getTicketComments (ticketNumber) {
    return this.service.get('/tickets/' + ticketNumber + '/comments')
  }

  getTicketNewStatuses (ticketNumber, callback) {
    return this.service.get('/tickets/' + ticketNumber + '/newStatuses')
      .then((response) => callback(response.data))
  }

  getAttachmentContent (attachmentID, callback) {
    return this.service.get('/attachments/' + attachmentID)
      .then((response) => callback(response.data))
  }
}
