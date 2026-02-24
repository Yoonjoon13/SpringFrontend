import api from '@/plugins/axiosinterceptor'

const list = async () => {
  let data = {}

  await api
    .get('/json/mentoring/list')
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

const detail = async (mentoringId) => {
  let data = {}

  await api
    .get(`/json/mentoring/detail/${mentoringId}`)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

export default { list, detail }
