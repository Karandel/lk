<template>
  <v-container>

      <v-list three-line>
        <template v-for="(ticket, index) in tickets">
          <v-list-tile @click='onTicketClicked(ticket)'>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ticket.number}}</v-list-tile-sub-title>
              <v-list-tile-title>{{ticket.status}}</v-list-tile-title>
              <v-list-tile-title>{{ticket.type}}</v-list-tile-title>
              <v-list-tile-sub-title>Крайний срок: {{ticket.deadlineDate | moment($defaultDateTimeFormat)}}</v-list-tile-sub-title>
              <v-list-tile-title v-html="ticket.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < tickets.length" :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    startDate: null,
    startDateError: '',
    endDate: null,
    ticketsStatus: '',
    ticketsStatuses: ['Открытые', 'Завершенные', 'Все']
  }),
  created () {
    this.$store.commit('setMainNavbarState', {title: 'Мои заявки', returnButton: false})
    this.$store.dispatch('fetchTickets', {self: this})
  },
  computed: {
    tickets () {
      return this.$store.state.pageContent
    }
  },
  watch: {
    startDate (current, prev) {
      this.onTicketSelectionChanged()
    },
    endDate (current, prev) {
      this.onTicketSelectionChanged()
    },
    ticketsStatus (current, prev) {
      this.onTicketSelectionChanged()
    }
  },
  methods: {
    onTicketClicked (ticket) {
      this.$router.push({name: 'TicketView', params: { ticketNumber: ticket.number }})
    },
    onTicketAddClicked () {
      alert('WIP')
    },
    onTicketSelectionChanged () {
      this.startDateError = ''
      if (this.startDate > this.endDate) {
        this.startDateError = 'Дата начала больше даты окончания'
        return
      }
      this.$store.dispatch('fetchTickets', {self: this})
    }
  },
  name: 'TicketList'
}
</script>
