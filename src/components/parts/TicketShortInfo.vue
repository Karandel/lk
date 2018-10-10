<template>
  <v-flex>
    <v-card class="clickable cardElementOfList" hover>
      <v-card-text>
        <v-layout row wrap>
          <v-flex md8>
            <span>{{ticket.number}} от {{ticket.creationDate | moment($defaultDateTimeFormat)}}</span><br>
            <h3 v-html="ticket.title"></h3>
          </v-flex>
          <v-flex md4>
            <b><span>Статус: {{ticket.status}}</span></b><br>
            <span>Инициатор: {{ticket.requestor}}</span><br>
            <span>Крайний срок: {{ticket.deadlineDate | moment($defaultDateTimeFormat)}}</span>
          </v-flex>
        </v-layout>
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
    border-left: 6px solid green;
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
