import api from '@/plugins/axiosinterceptor'

const list = async () => {
  let data = {}

  await api
    .get('/json/community/list')
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

const createPost = async (req) => {
  let data = {}

  await api
    .post('/json/community/create', req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

export default { list, createPost }
