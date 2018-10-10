<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        prepend-icon="person"
        v-model="email"
        :rules="emailRules"
        :loading = 'apiRequestInProgress'
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        prepend-icon="lock"
        v-model="password"
        :rules="passwordRules"
        :error='passwordFieldError'
        :error-messages='passwordFieldErrorMessages'
        :loading = 'apiRequestInProgress'
        label="Пароль"
        type="password"
        required
      ></v-text-field>
      <v-btn block color="primary" @click="onLoginClicked ()">Войти</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      email: localStorage.getItem('userName'),
      emailRules: [
        v => !!v || 'Пожалуйста, укажите email',
        v => /.+@.+/.test(v) || 'Не правильный формат email'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Пожалуйста, введите пароль'
      ],
      apiRequestInProgress: false,
      passwordFieldError: false,
      passwordFieldErrorMessages: []
    }
  },
  mounted () {
    this.$store.commit('setMainNavbarState', {title: 'ALP:ITIL', returnButton: false})
  },
  watch: {
    password () {
      this.passwordFieldError = false
      this.passwordFieldErrorMessages = []
    }
  },
  methods: {
    onLoginClicked () {
      this.apiError = ''
      if (!(this.$refs.form.validate())) {
        return
      }
      this.$store.commit('setServerCallState', 'loading')

      var requestData = {
        email: this.email,
        password: this.password
      }

      this.$ALP_ITIL_API.authUser(requestData, this.apiResponseConsume)
    },
    apiResponseConsume (data) {
      if (data && data.errorDescription) {
        this.passwordFieldError = true
        this.passwordFieldErrorMessages.push(data.errorDescription)
        return
      }
      if (data && data.sessionID) {
        localStorage.userName = this.email
        localStorage.ALP_ITIL_API_SessionID = data.sessionID
        this.$router.push({name: 'TicketList'})
      }
    }
  },
  name: 'Login'
}
</script>
