import api from '@/plugins/axiosinterceptor'

const list = async () => {
  let data = {}

  await api
    .get('/board/list')
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
    .post('/board/create', req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

const listByUser = async (username) => {
  let data = {}

  await api
    .get(`/board/list/${encodeURIComponent(username)}`)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
}

const modifyPost = async (idx, req) => {
  let data = {}

  await api
    .put(`/board/modify/${idx}`, req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

const deletePost = async (idx, username) => {
  let data = {}

  await api
    .delete(`/board/delete/${idx}`, {
      params: { username },
    })
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

export default { list, listByUser, createPost, modifyPost, deletePost }
