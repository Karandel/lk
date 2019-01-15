<template>
  <div class='height-100'>
    <TicketListSelectionBar/>
    <v-container fill-height class='padding-top-0'>
      <v-layout row wrap>
        <v-flex md3>
          <v-card class='full-height-card'>
            <v-card-text class='border-bottom border-color-yellow'>
              <h2>Открытые</h2>
            </v-card-text>
            <TicketShortInfoForBoard
              v-for="ticket in tickets.open"
              v-bind:ticket="ticket"
              v-bind:key="ticket.number"
              @click.native='onTicketClicked(ticket)'
            ></TicketShortInfoForBoard>
          </v-card>
        </v-flex>
        <v-flex md3>
          <v-card class='full-height-card'>
            <v-card-text class='border-bottom border-color-green'>
              <h2>В работе</h2>
            </v-card-text>
            <TicketShortInfoForBoard
              v-for="ticket in tickets.inProgress"
              v-bind:ticket="ticket"
              v-bind:key="ticket.number"
              @click.native='onTicketClicked(ticket)'
            ></TicketShortInfoForBoard>
          </v-card>
        </v-flex>
        <v-flex md3>
          <v-card class='full-height-card'>
            <v-card-text class='border-bottom border-color-blue'>
              <h2>На паузе</h2>
            </v-card-text>
            <TicketShortInfoForBoard
              v-for="ticket in tickets.onHold"
              v-bind:ticket="ticket"
              v-bind:key="ticket.number"
              @click.native='onTicketClicked(ticket)'
            ></TicketShortInfoForBoard>
          </v-card>
        </v-flex>
        <v-flex md3>
          <v-card class='full-height-card'>
            <v-card-text class='border-bottom border-color-black'>
              <h2>Завершены</h2>
            </v-card-text>
            <TicketShortInfoForBoard
              v-for="ticket in tickets.completed"
              v-bind:ticket="ticket"
              v-bind:key="ticket.number"
              @click.native='onTicketClicked(ticket)'
            ></TicketShortInfoForBoard>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style scoped>
  .full-height-card {
    height: 100%;
    margin-left: 0px;
    margin-right: 10px;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
  .border-bottom {
    border-bottom: 3px solid;
    border-radius: 10px;
  }
  .border-color-green {
    border-color: rgb(39, 153, 68);
  }
  .border-color-yellow {
    border-color: rgb(244, 172, 65);
  }
  .border-color-blue {
    border-color: rgb(66, 116, 244);
  }
  .border-color-black {
    border-color: black;
  }
  .height-100 {
    height: 100%;
  }
  .padding-top-0 {
    padding-top: 0px;
  }
</style>

<script>
import TicketListSelectionBar from '@/components/parts/TicketListSelectionBar'
import TicketShortInfoForBoard from '@/components/parts/TicketShortInfoForBoard'

export default {
  components: {TicketListSelectionBar, TicketShortInfoForBoard},
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
