<template>
  <v-layout row wrap>
    <v-flex xs12 sm4 md4>
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
          label="С"
          readonly
        ></v-text-field>
        <v-date-picker v-model="startDate" @input="$refs.startDateMenu.save(startDate)"></v-date-picker>

      </v-menu>
    </v-flex>
    <v-flex xs12 sm4 md4>
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
          label="По"
          readonly
        ></v-text-field>
        <v-date-picker v-model="endDate" @input="$refs.endDateMenu.save(endDate)"></v-date-picker>

      </v-menu>
    </v-flex>
    <v-flex xs12 sm4 md4>
      <v-select
        :items="ticketsStatuses"
        v-model="ticketsStatus"
        prepend-icon=" "
        label="Статус"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'TicketListSelectionBar',
  data: () => ({
    startDate: null,
    startDateError: '',
    endDate: null,
    ticketsStatus: '',
    ticketsStatuses: ['Открытые', 'Завершенные', 'Все']
  }),
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
