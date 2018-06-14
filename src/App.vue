<template>
  <v-app>
    <v-content>
      <v-container :grid-list-lg="true">
         <v-card style="padding: 1.2em;">
           <v-layout>
            <v-flex xs4>
              <v-text-field v-model.trim="userSearch" :label="$t('userName')"/>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="dateMenuEnd"
                :close-on-content-click="false"
                v-model="dateMenuStart"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateSearchStart"
                  :label="$t('dateStart')"
                  prepend-icon="event"
                  readonly/>
                <v-date-picker v-model="dateSearchStart" :locale="$i18n.locale" no-title @input="dateMenuStart = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="timeMenuStart"
                :close-on-content-click="false"
                v-model="timeMenuStart"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="timeSearchStart"
                  :label="$t('timeStart')"
                  prepend-icon="access_time"
                  readonly/>
                <v-time-picker v-model="timeSearchStart" format="24hr" @input="timeMenuStart = false"/>
              </v-menu>
            </v-flex>
           </v-layout>
           <v-layout>
            <v-flex xs4>
              <v-select
                :items="options"
                v-model="selected"
                :label="$t('actionType')"
                item-value="text"
              />
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="dateMenuEnd"
                :close-on-content-click="false"
                v-model="dateMenuEnd"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateSearchEnd"
                  :label="$t('dateEnd')"
                  prepend-icon="event"
                  readonly/>
                <v-date-picker v-model="dateSearchEnd" :locale="$i18n.locale" no-title @input="dateMenuEnd = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="timeMenuStart"
                :close-on-content-click="false"
                v-model="timeMenuEnd"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="timeSearchEnd"
                  :label="$t('timeEnd')"
                  prepend-icon="access_time"
                  readonly/>
                <v-time-picker v-model="timeSearchEnd" format="24hr" @input="timeMenuEnd = false"/>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs8>
              <v-btn @click="reset" color="info">{{$t("reset")}}</v-btn>
            </v-flex>
            <v-flex xs4>
              <v-btn-toggle v-model="$i18n.locale">
                <v-btn :value="l" v-for="(l, index) in languages" :key="index">
                  <img :src="`http://www.countryflags.io/${l[3]+l[4]}/flat/64.png`" width="32">
                </v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
      <v-container :grid-list-xl="true">
        <v-card>
          <v-data-table
            :rows-per-page-items="[5,10,25, {'text': $t('all'),'value':-1}]"
            :rows-per-page-text="$t('rowsPerPage')"
            :headers="headers"
            :no-data-text="$t('noDataAvailable')"
            :items="tabletWithFilter"
            item-key="id"
            :total-items="logs.lenght"
          >
            <template slot="items" slot-scope="props">
              <td>
                <div>{{ props.item.actionType }}</div>
                <div><a href="http://">{{ props.item.username }}</a></div>
              </td>
              <td>{{ props.item.username }}</td>
              <td>{{ props.item.timestamp }}</td>
            </template>
            <template slot="pageText" slot-scope="props">
              {{ props.pageStart }}-{{ props.pageStop }} {{$t('pretextForPages')}} {{ props.itemsLength }}
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import logs from './getLogs.js'

export default {
  name: 'App',
  data () {
    console.log(this)
    return {
      selected: null,
      options: [
        'USER_UPDATED',
        'USER_LOGIN',
        'USER_LOGOUT',
        'UPDATE_PROFILE'
      ],
      userSearch: '',
      dateSearchStart: null,
      dateMenuStart: null,
      dateSearchEnd: null,
      dateMenuEnd: false,
      timeSearchStart: null,
      timeMenuStart: null,
      timeSearchEnd: null,
      timeMenuEnd: null,
      pagination: {
        sortBy: 'created_time',
        descending: true,
        itemPerPage: 10
      },
      logs: logs
    }
  },
  methods: {
    upgrateDate: function (dateJSON) {
      let date = new Date(Date.parse(dateJSON))
      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      return date.toLocaleString('en-US', options).replace(/,/g, '')
    },
    reset () {
      this.userSearch = ''
      this.dateSearchStart = null
      this.dateSearchEnd = null
      this.timeSearchStart = null
      this.timeSearchEnd = null
      this.selected = null
    }
  },
  computed: {
    tabletWithFilter () {
      return this.logs.filter(el => {
        const timestamp = new Date(Date.parse(el.timestamp))
        let username = true
        let type = true
        let date = true
        let time = true
        if (this.selected) {
          if (el.actionType !== this.selected) { type = false }
        }
        if (this.dateSearchStart && this.dateSearchEnd) {
          const dateStartArray = this.dateSearchStart.split('-')
          const dateEndArray = this.dateSearchEnd.split('-')
          const dateSearchStart = new Date(dateStartArray[0], dateStartArray[1], dateStartArray[2])
          const dateSearchEnd = new Date(dateEndArray[0], dateEndArray[1], dateEndArray[2])
          if (dateSearchStart < timestamp && dateSearchEnd > timestamp) {
            date = true
          } else {
            date = false
          }
        }
        if (this.timeSearchStart && this.timeSearchEnd) {
          const timeStartArray = this.timeSearchStart.split(':')
          const timeEndArray = this.timeSearchEnd.split(':')
          const timeSearchStart = new Date(Date.now())
          const timeSearchEnd = new Date(Date.now())
          timeSearchStart.setHours(timeStartArray[0], timeStartArray[1], 0, 0)
          timeSearchEnd.setHours(timeEndArray[0], timeEndArray[1], 0, 0)

          if (timeSearchStart < timestamp && timeSearchEnd > timestamp) {
            date = true
          } else {
            date = false
          }
        }
        if (this.userSearch) {
          if (el.user.username.toLowerCase().search(this.userSearch.toLowerCase()) === -1) { username = false }
        }
        return (type && date && time && username)
      }).map(el => {
        return {
          actionType: el.actionType,
          username: el.user.username,
          timestamp: this.upgrateDate(el.timestamp)
        }
      })
    },
    headers () {
      return [
        {
          text: this.$t('action'),
          align: 'left',
          sortable: false
        },
        {
          text: this.$t('userName'),
          align: 'left',
          sortable: false
        },
        {
          text: this.$t('timestamp'),
          align: 'left',
          sortable: false
        }
      ]
    },
    languages () {
      console.log(this.$i18n.messages)
      return Object.keys(this.$i18n.messages)
    }
  }
}
</script>
