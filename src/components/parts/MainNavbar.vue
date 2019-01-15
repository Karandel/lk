<template>
  <div>
    <v-navigation-drawer
      width='250'
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list v-for="(appPart, index) in avaliableAppParts" :key="index">
        <v-divider v-if='appPart.divider'></v-divider>
        <v-list-tile @click="onListItemClicked(appPart.routerPath)">
          <v-list-tile-action>
            <v-icon>{{appPart.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{appPart.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="primary" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="search"
          label="Поиск"          
        ></v-text-field>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'MainNavbar',
  data () {
    return {
      drawer: false,
      avaliableAppParts: [
        {
          title: 'Обращения',
          icon: 'assignment',
          routerPath: 'TicketList'
        },
        {
          title: 'Инструкции',
          icon: 'book',
          routerPath: 'ManualList'
        },
        {
          title: 'Отчеты',
          icon: 'developer_board',
          routerPath: 'ReportList'
        },
        {
          title: 'Справка',
          icon: 'help',
          routerPath: 'HelpList',
          divider: true
        }
      ]
    }
  },
  methods: {
    onListItemClicked (routerPathName) {
      this.$router.push({name: routerPathName})
    }
  },
  computed: {
    title () {
      return this.$store.state.mainNavbarState.title
    }
  }
}
</script>
