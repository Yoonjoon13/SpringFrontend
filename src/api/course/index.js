import api from '@/plugins/axiosinterceptor'

const list = async () => {
  let data = {}

  await api
    .get('/json/course/list')
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

const detail = async (courseId) => {
  let data = {}

  await api
    .get(`/json/course/detail/${courseId}`)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

export default { list, detail }
