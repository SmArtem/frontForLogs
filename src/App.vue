<template>
  <v-app>
    <v-content>
      <v-container :grid-list-lg="true">
         <v-card style="padding: 1.2em;">
           <v-layout>
            <v-flex xs4>
              <v-text-field v-model.trim="userSearch" label="Username"/>
              {{dateSearchStart}}
              {{timeSearchStart}}
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
                  label="Picker without buttons"
                  prepend-icon="event"
                  readonly/>
                <v-date-picker v-model="dateSearchStart" no-title @input="dateMenuStart = false"></v-date-picker>
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
                  label="Picker without buttons"
                  prepend-icon="access_time"
                  readonly/>
                <v-time-picker v-model="timeSearchStart" @input="timeMenuStart = false"/>
              </v-menu>
            </v-flex>
           </v-layout>
           <v-layout>
            <v-flex xs4>
              <v-select
                :items="options"
                v-model="selected"
                label="Select"
                item-value="text"
              />
              {{dateSearchEnd}}
              {{timeSearchEnd}}
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
                  label="Picker without buttons"
                  prepend-icon="event"
                  readonly/>
                <v-date-picker v-model="dateSearchEnd" no-title @input="dateMenuEnd = false"></v-date-picker>
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
                  label="Picker without buttons"
                  prepend-icon="access_time"
                  readonly/>
                <v-time-picker v-model="timeSearchEnd" @input="timeMenuEnd = false"/>
              </v-menu>
            </v-flex>
           </v-layout>
           <v-btn @click="reset" color="info">RESET</v-btn>
         </v-card>
      </v-container>
      <v-container :grid-list-xl="true">
        <v-card>
          <v-data-table
            :rows-per-page-items="[5,10,25,{'text':'Все','value':-1}]"
            :headers="headers"
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
          </v-data-table>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Faker from 'faker'

let fields = []
for (let i = 0; i < 1000; i++) {
  const firstName = Faker.fake('{{name.firstName}}')
  const lastName = Faker.fake('{{name.lastName}}')
  const email = Faker.fake('{{internet.email}}')
  let date = null
  if (i % 2 === 0) {
    date = Faker.date.between(new Date(Date.parse('2017-05-29T05:13:43.000Z')), new Date(Date.parse('2018-05-29T05:13:43.000Z')))
  } else {
    const today = new Date()
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    date = Faker.date.between(yesterday, today)
  }
  fields.push({
    id: Faker.fake('{{random.number}}'),
    actionType: Faker.random.arrayElement(['USER_UPDATED',
      'USER_LOGIN',
      'USER_LOGOUT',
      'UPDATE_PROFILE']),
    timestamp: date.toISOString(),
    userId: i,
    createdAt: '2018-05-29T05:22:10.000Z',
    updatedAt: date.toISOString(),
    user: {
      id: i,
      username: email,
      password: '$2a$10$CB8uR3Zsm.weM4M66uJ4JOBRicCsSdgPg8M7Gmv7yIwuBQq9MIgMe',
      role: Faker.random.arrayElement(['MANAGER',
        'ADMIN',
        'CLIENT']),
      isActive: true,
      canOpenBox: false,
      canSendEmail: false,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: Faker.phone.phoneNumber(),
      street: Faker.address.streetName(),
      houseno: '1',
      zip: Faker.address.zipCode(),
      city: '1',
      country: Faker.address.countryCode(),
      createdAt: '2018-05-29T05:13:43.000Z',
      updatedAt: '2018-05-29T05:22:10.000Z'
    },
    meta: {
      text: email,
      url: '/users/' + i
    }
  })
}
console.log(fields)
export default {
  name: 'App',
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
          console.log(timeSearchStart)
          console.log(timeSearchEnd)
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
    }
  },
  data () {
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
      headers: [
        {
          text: 'Action',
          align: 'left',
          sortable: false
        },
        {
          text: 'Username',
          align: 'left',
          sortable: false
        },
        {
          text: 'Timestamp',
          align: 'left',
          sortable: false
        }
      ],
      logs: [{
        id: 964,
        'actionType': 'USER_UPDATEDID:21',
        'timestamp': '2018-06-29T05:22:10.000Z',
        'userId': 21,
        'createdAt': '2018-05-29T05:22:10.000Z',
        'updatedAt': '2018-05-29T05:22:10.000Z',
        'user': {
          'id': 21,
          'username': 'egor@gg.ru',
          'password': '$2a$10$CB8uR3Zsm.weM4M66uJ4JOBRicCsSdgPg8M7Gmv7yIwuBQq9MIgMe',
          'role': 'MANAGER',
          'isActive': true,
          'canOpenBox': false,
          'canSendEmail': false,
          'resetPasswordToken': null,
          'resetPasswordExpires': null,
          'firstName': 'Egor',
          'lastName': 'Ivanov',
          'email': 'egor@gg.ru',
          'phoneNumber': '+7123123123123',
          'street': '1',
          'houseno': '1',
          'zip': '1',
          'city': '1',
          'country': 'AO',
          'createdAt': '2018-05-29T05:13:43.000Z',
          'updatedAt': '2018-05-29T05:22:10.000Z'
        },
        'meta': {
          'text': 'egor@gg.ru',
          'url': '/users/21'
        }
      },
      {
        'id': 964,
        'actionType': 'USER_UPDATEDID:21',
        'timestamp': '2018-05-29T05:22:10.000Z',
        'userId': 21,
        'createdAt': '2018-05-29T05:22:10.000Z',
        'updatedAt': '2018-05-29T05:22:10.000Z',
        'user': {
          'id': 21,
          'username': 'egor@gg.ru',
          'password': '$2a$10$CB8uR3Zsm.weM4M66uJ4JOBRicCsSdgPg8M7Gmv7yIwuBQq9MIgMe',
          'role': 'MANAGER',
          'isActive': true,
          'canOpenBox': false,
          'canSendEmail': false,
          'resetPasswordToken': null,
          'resetPasswordExpires': null,
          'firstName': 'Egor',
          'lastName': 'Ivanov',
          'email': 'egor@gg.ru',
          'phoneNumber': '+7123123123123',
          'street': '1',
          'houseno': '1',
          'zip': '1',
          'city': '1',
          'country': 'AO',
          'createdAt': '2018-05-29T05:13:43.000Z',
          'updatedAt': '2018-05-29T05:22:10.000Z'
        },
        'meta': {
          'text': 'egor@gg.ru',
          'url': '/users/21'
        }
      }].concat(fields)
    }
  }
}
</script>
