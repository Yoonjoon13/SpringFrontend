import api from '@/plugins/axiosinterceptor'

const login = async (req) => {
  let data = {}
  await api
    .post('/user/login', req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

const signup = async (req) => {
  let data = {}
  await api
    .post('/user/signup', req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

const profile = async () => {
  let data = {}

  await api
    .get('/user/profile')
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

export default { login, signup, profile }
