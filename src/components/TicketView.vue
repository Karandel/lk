<template>
  <v-form>
    <v-container>
      <h2>{{ticket.title}}</h2>
      <v-text-field
        append-outer-icon="open_in_new"
        label="Инициатор"
        :value="ticket.author"
        @click:append-outer = 'onUserViewOpenClicked(ticket.author)'
        readonly
      ></v-text-field>
      <v-text-field v-if="ticket.user !== '' && ticket.user !== null"
        append-outer-icon="open_in_new"
        label="Пользователь"
        :value="ticket.user"
        @click:append-outer = 'onUserViewOpenClicked(ticket.user)'
        readonly
      ></v-text-field>
      <v-text-field
        append-outer-icon="open_in_new"
        label="Менеджер"
        :value="ticket.manager"
        @click:append-outer = 'onUserViewOpenClicked(ticket.manager)'
        readonly
      ></v-text-field>
      <v-text-field
        append-icon="edit"
        append-outer-icon="open_in_new"
        label="Исполнитель"
        :value="ticket.assignee"
        @click:append-outer = 'onUserViewOpenClicked(ticket.assignee)'
        readonly
      ></v-text-field>
      <v-text-field
        append-icon="edit"
        label="Текущий этап"
        :value="ticket.status"
        @click = 'onTicketStatusClicked(ticket.number)'
        @click:append = 'onTicketStatusClicked(ticket.number)'
        readonly
      ></v-text-field>
      <v-text-field
        label="Крайний срок"
        :value="ticket.deadlineDate | moment(this.$defaultDateTimeFormat)"
        readonly
      ></v-text-field>
      <template v-for="(attachment, index) in ticket.attachments">
        <v-chip outline color="primary" @click = 'onAttachmentClicked(attachment)'>
          <v-progress-circular
            indeterminate
            color="primary"
            v-if='attachment.downloading'
          ></v-progress-circular>
          <v-icon left v-if='!attachment.downloading'>save_alt</v-icon>{{attachment.name + "(" + attachment.size + ")"}}
        </v-chip>
      </template>
      <v-textarea
        auto-grow
        label="Описание"
        :value="ticket.description"
        readonly
      ></v-textarea>
    </v-container>
    <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        fixed
        color="white"
      >
        <v-btn
          color="teal"
          flat
          value ='active'
          @click="onTicketCommentsClicked(ticket.number)"
        >
          <span>Комментарии</span>
          <v-badge color="red">
            <span slot="badge">{{ticket.commentsCount}}</span>
            <v-icon>message</v-icon>
          </v-badge>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value ='active'
        >
          <span>Трудозатраты</span>
          <v-icon>timer</v-icon>
        </v-btn>

      </v-bottom-nav>
  </v-form>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
export default {
  created () {
    this.$store.commit('setCurrentTicketNumber', this.$route.params.ticketNumber)
    this.$store.dispatch('fetchTicket', {self: this})
  },
  computed: {
    ticket () {
      return this.$store.state.pageContent
    }
  },
  data () {
    return {
      bottomNav: 'active'
    }
  },
  methods: {
    onBackClicked () {
      this.$router.go(-1)
    },
    onUserViewOpenClicked (userName) {
      this.$router.push({name: 'UserView', params: { name: userName }})
    },
    onTicketStatusClicked (ticketNumber) {
      this.$router.push({name: 'TicketAvaliableStatuses', params: { ticketNumber: ticketNumber }})
    },
    onTicketCommentsClicked (ticketNumber) {
      this.$router.push({name: 'TicketComments', params: { ticketNumber: ticketNumber }})
    },
    onAttachmentClicked (attachment) {
      attachment.downloading = true
      this.$ALP_ITIL_API.getAttachmentContent(attachment.id, this.apiGetAttachmentResponseConsume)
    },
    apiGetAttachmentResponseConsume (data) {
      if (data && data.attachment) {
        var sliceSize = 512

        var byteCharacters = atob(data.attachment.content)
        var byteArrays = []

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize)

          var byteNumbers = new Array(slice.length)
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
          }

          var byteArray = new Uint8Array(byteNumbers)

          byteArrays.push(byteArray)
        }

        var blob = new Blob(byteArrays, {type: 'octet/stream'})
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = data.attachment.name
        link.click()
      }
    }
  },
  name: 'TicketView'
}
</script>
