import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainNavbarState: {title: 'ALP ITIL mobile', returnButton: false},
    serverCallState: '',
    pageContent: {},
    currentTicketNumber: '',
    generalErrorMsg: ''
  },
  mutations: {
    setMainNavbarState (state, payload) {
      state.mainNavbarState = payload
    },
    setGeneralErrorMsg (state, errorMsg) {
      state.generalErrorMsg = errorMsg
    },
    setCurrentTicketNumber (state, currentTicketNumber) {
      state.currentTicketNumber = currentTicketNumber
    },
    setFetchingPageContentState (state) {
      state.serverCallState = 'loading'
      state.pageContent = {}
    },
    setDoneFetchingState (state) {
      state.serverCallState = ''
    },
    setServerCallState (state, serverCallState) {
      state.serverCallState = serverCallState
    },
    FETCH_PAGE_CONTENT (state, pageContent) {
      state.pageContent = pageContent
      state.serverCallState = ''
    }
  },
  actions: {
    fetchTickets ({commit}, {self}) {
      commit('setFetchingPageContentState')
      self.$ALP_ITIL_API.getPersonalTicketList()
        .then((response) => {
          if (response && response.data && response.data.tickets) {
            commit('FETCH_PAGE_CONTENT', response.data.tickets)
          }
          commit('setDoneFetchingState')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchTicket ({commit}, {self}) {
      commit('setFetchingPageContentState')
      self.$ALP_ITIL_API.getTicketData(this.state.currentTicketNumber)
        .then((response) => {
          if (response && response.data && response.data.ticket) {
            if (response.data.ticket.attachments) {
              response.data.ticket.attachments.forEach(function (element) {
                element.downloading = false
              })
            }
            commit('FETCH_PAGE_CONTENT', response.data.ticket)
          }
          commit('setDoneFetchingState')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchComments ({commit}, {self}) {
      commit('setFetchingPageContentState')
      self.$ALP_ITIL_API.getTicketComments(this.state.currentTicketNumber)
        .then((response) => {
          if (response && response.data && response.data.comments) {
            commit('FETCH_PAGE_CONTENT', response.data.comments)
          }
          commit('setDoneFetchingState')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
