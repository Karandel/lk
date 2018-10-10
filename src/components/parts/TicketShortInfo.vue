<template>
  <v-flex xs12>
    <v-card class="clickable" tile flat >
      <v-card-title primary-title>
        <div>
          <span>{{ticket.number}}</span><br>
          <span>{{ticket.status}}</span><br>
          <span>{{ticket.type}}</span><br>
          <span>Крайний срок: {{ticket.deadlineDate | moment($defaultDateTimeFormat)}}</span><br>
          <span v-html="ticket.title"></span>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<style scoped>
  .clickable {
    cursor: pointer;
  }
</style>

<script>
export default {
  props: {
    ticket: Object
  },
  name: 'TicketListShortInfo'
}
</script>
