<template>
  <v-flex>
    <v-card class="clickable cardElementOfList" hover>
      <v-card-text>
          <span>{{ticket.number}} от {{ticket.creationDate | moment($defaultDateTimeFormat)}}</span><br>
          <h3 v-html="ticket.title"></h3>
          <span>Инициатор: {{ticket.requestor}}</span><br>
          <span>Крайний срок: {{ticket.deadlineDate | moment($defaultDateTimeFormat)}}</span>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<style scoped>
  .clickable {
    cursor: pointer;
  }
  .cardElementOfList {
    margin: 5px;
    border-radius: 10px;
  }
</style>

<script>
export default {
  props: {
    ticket: Object
  },
  name: 'TicketListShortInfoForBoard'
}
</script>
