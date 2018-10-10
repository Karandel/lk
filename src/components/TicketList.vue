<template>
  <v-container>
    <TicketListSelectionBar/>
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
import TicketListSelectionBar from '@/components/parts/TicketListSelectionBar'

export default {
  components: {TicketListSelectionBar},
  created () {
    this.$store.commit('setMainNavbarState', {title: 'Мои заявки', returnButton: false})
    this.$store.dispatch('fetchTickets', {self: this})
  },
  computed: {
    tickets () {
      return this.$store.state.pageContent
    }
  },
  methods: {
    onTicketClicked (ticket) {
      this.$router.push({name: 'TicketView', params: { ticketNumber: ticket.number }})
    },
    onTicketAddClicked () {
      alert('WIP')
    }
  },
  name: 'TicketList'
}
</script>
