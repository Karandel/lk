<template>
  <v-container class='padding-bottom-0'>
    <v-layout row wrap>
      <v-flex xs12 sm2 md2>
        <v-menu
          ref="startDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="startDate"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="startDate"
            :error-messages="startDateError"
            label="Созданные с"
            readonly
          ></v-text-field>
          <v-date-picker v-model="startDate" @input="$refs.startDateMenu.save(startDate)"></v-date-picker>

        </v-menu>
      </v-flex>
      <v-flex xs12 sm2 md2>
        <v-menu
          ref="endDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="endDate"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="endDate"
            prepend-icon=" "
            label="по"
            readonly
          ></v-text-field>
          <v-date-picker v-model="endDate" @input="$refs.endDateMenu.save(endDate)"></v-date-picker>

        </v-menu>
      </v-flex>
      <v-flex xs12 sm2 md2>
        <!-- <v-radio-group v-model='allTickets' row>
          <v-radio label="Только мои" value='false'></v-radio>
          <v-radio label="Все" value='true'></v-radio>
        </v-radio-group> -->
        <v-switch
          :label="allTicketsLabel"
          v-model="allTickets"
        ></v-switch>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
 .padding-bottom-0 {
   padding-bottom: 0px;
 }
</style>

<script>
export default {
  name: 'TicketListSelectionBar',
  data: () => ({
    startDate: null,
    startDateError: '',
    endDate: null,
    allTickets: false
  }),
  computed: {
    allTicketsLabel () {
      if (this.allTickets) {
        return 'Все'
      }
      return 'Только мои'
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
    onTicketSelectionChanged () {
      this.startDateError = ''
      if (this.startDate > this.endDate) {
        this.startDateError = 'Дата начала больше даты окончания'
        return
      }
      this.$store.dispatch('fetchTickets', {self: this})
    }
  }
}
</script>
