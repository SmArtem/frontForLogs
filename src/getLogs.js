import Faker from 'faker'

let fields = []
for (let i = 0; i < 100; i++) {
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
let logs = [{
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
export default logs
