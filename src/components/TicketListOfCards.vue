<template>
  <v-container>
    <TicketListSelectionBar/>
    <TicketShortInfo
      v-for="ticket in tickets"
      v-bind:ticket="ticket"
      v-bind:key="ticket.number"
      @click.native='onTicketClicked(ticket)'
    ></TicketShortInfo>
  </v-container>
</template>

<script>
import TicketListSelectionBar from '@/components/parts/TicketListSelectionBar'
import TicketShortInfo from '@/components/parts/TicketShortInfo'

export default {
  components: {TicketListSelectionBar, TicketShortInfo},
  created () {
    this.$store.commit('setMainNavbarState', {title: 'Мои заявки'})
    this.$store.dispatch('fetchTickets', {self: this})
  },
  computed: {
    tickets () {
      return this.$store.state.pageContent
    }
  },
  methods: {
    onTicketAddClicked () {
      alert('WIP')
    },
    onTicketClicked (ticket) {
      this.$router.push({name: 'TicketView', params: { ticketNumber: ticket.number }})
    }
  },
  name: 'TicketList'
}
</script>
