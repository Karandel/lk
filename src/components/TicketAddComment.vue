<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-text-field
          label="От"
          :value="from"
          readonly
        ></v-text-field>
        <v-switch
          v-model="hidden"
          label="Скрытый комментарий"
        ></v-switch>
        <v-combobox
          v-model="toModel"
          label="Кому"
          :items="recipients"
          multiple
          readonly
        >
        </v-combobox>
        <v-combobox
          label="Копия"
          :items="recipients"
          multiple
          hideSelected
          clearable
        >
        </v-combobox>
        <v-textarea
          v-model="text"
          :rules = 'textRules'
          label="Текст комментария"
          required
        ></v-textarea>
        <v-btn
          color="primary"
          dark
          :disabled="!valid"
          @click="submit"
        >
          Добавить
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
export default {
  data () {
    return {
      from: 'helpdesk@alp.ru',
      toModel: [
        'Иванов Иван',
        'Петров Петр'
      ],
      recipients: [
        'Сергеев Сергей',
        'Алексеев Алексей'
      ],
      valid: true,
      hidden: false,
      text: '',
      textRules: [
        v => !!v || 'Пожалуйста, заполните'
      ]
    }
  },
  mounted () {
    this.$store.commit('setMainNavbarState', {title: 'Новый комментарий', returnButton: true})
  },
  methods: {
    onBackClicked () {
      this.$router.go(-1)
    },
    submit () {

    }
  },
  name: 'TicketAddComment'
}
</script>
