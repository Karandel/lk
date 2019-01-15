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
      commit('setDoneFetchingState')
    },
    fetchTicket ({commit}, {self}) {
      commit('setFetchingPageContentState')
      commit('setDoneFetchingState')
    },
    fetchComments ({commit}, {self}) {
      commit('setFetchingPageContentState')
      commit('setDoneFetchingState')
    }
  }
})
