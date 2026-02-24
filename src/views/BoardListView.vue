<template>
  <main>
    <section class="page card">
      <h1>Board List</h1>

      <form class="toolbar" @submit.prevent="fetchByUser">
        <label class="search">
          Username
          <input v-model="username" type="text" placeholder="Filter by username" />
        </label>
        <div class="actions">
          <button type="submit" :disabled="loading">Search</button>
          <button type="button" class="ghost" :disabled="loading" @click="fetchAll">
            Reset
          </button>
        </div>
      </form>

      <p v-if="message" :class="{ error: isError }">{{ message }}</p>

      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="posts.length === 0" class="empty">No posts.</div>

      <ul v-else class="list">
        <li v-for="post in posts" :key="post.idx" class="item">
          <div class="item-head">
            <h2 class="title">{{ post.title }}</h2>
            <span class="meta">#{{ post.idx }} · {{ post.username || 'Unknown' }}</span>
          </div>

          <p v-if="editingId !== post.idx" class="contents">{{ post.contents }}</p>

          <form v-if="editingId === post.idx" class="edit-form" @submit.prevent="submitEdit(post.idx)">
            <label>
              Title
              <input v-model="editForm.title" type="text" required />
            </label>
            <label>
              Contents
              <textarea v-model="editForm.contents" rows="6" required />
            </label>
            <label>
              Author Name
              <input v-model="editForm.username" type="text" required />
            </label>
            <div class="edit-actions">
              <button type="submit" :disabled="loading">Save</button>
              <button type="button" class="ghost" :disabled="loading" @click="cancelEdit">
                Cancel
              </button>
            </div>
          </form>

          <div class="item-meta">Views: {{ post.watched ?? 0 }}</div>
          <div v-if="editingId !== post.idx" class="item-actions">
            <button class="ghost" :disabled="loading" @click="startEdit(post)">Modify</button>
            <button class="danger" :disabled="loading" @click="deletePostItem(post)">Delete</button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import communityApi from '@/api/community'

const posts = ref([])
const username = ref('')
const loading = ref(false)
const message = ref('')
const isError = ref(false)
const editingId = ref(null)
const route = useRoute()
const editForm = reactive({ title: '', contents: '', username: '' })

const fetchAll = async () => {
  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const result = await communityApi.list()
    posts.value = Array.isArray(result) ? result : []
  } catch (err) {
    isError.value = true
    message.value = err?.message || 'Failed to load posts.'
    posts.value = []
  } finally {
    loading.value = false
  }
}

const fetchByUser = async () => {
  const value = username.value.trim()
  if (!value) {
    await fetchAll()
    return
  }

  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const result = await communityApi.listByUser(value)
    posts.value = Array.isArray(result) ? result : []
  } catch (err) {
    isError.value = true
    message.value = err?.message || 'Failed to load posts.'
    posts.value = []
  } finally {
    loading.value = false
  }
}

const syncFromRoute = async () => {
  const param = route.params.username
  if (typeof param === 'string' && param.trim()) {
    username.value = param
    await fetchByUser()
  } else {
    username.value = ''
    await fetchAll()
  }
}

const startEdit = (post) => {
  editingId.value = post.idx
  editForm.title = post.title
  editForm.contents = post.contents
  editForm.username = post.username || ''
}

const cancelEdit = () => {
  editingId.value = null
}

const submitEdit = async (idx) => {
  if (!editForm.username.trim()) {
    isError.value = true
    message.value = 'Author name is required.'
    return
  }

  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const result = await communityApi.modifyPost(idx, {
      title: editForm.title,
      contents: editForm.contents,
      username: editForm.username,
    })

    if (result && result.success === false) {
      isError.value = true
      message.value = result?.message || 'Failed to update.'
      return
    }

    editingId.value = null
    await syncFromRoute()
  } catch (err) {
    isError.value = true
    message.value = err?.message || 'Failed to update.'
  } finally {
    loading.value = false
  }
}

const deletePostItem = async (post) => {
  if (!window.confirm('Delete this post?')) {
    return
  }

  if (!post.username) {
    isError.value = true
    message.value = 'Unknown author. Cannot delete.'
    return
  }

  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const result = await communityApi.deletePost(post.idx, post.username)

    if (result && result.success === false) {
      isError.value = true
      message.value = result?.message || 'Failed to delete.'
      return
    }

    if (editingId.value === post.idx) {
      editingId.value = null
    }
    await syncFromRoute()
  } catch (err) {
    isError.value = true
    message.value = err?.message || 'Failed to delete.'
  } finally {
    loading.value = false
  }
}

onMounted(syncFromRoute)
watch(() => route.params.username, syncFromRoute)
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.search {
  display: grid;
  gap: 0.35rem;
  font-weight: 600;
  min-width: 220px;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

input,
button,
textarea {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  cursor: pointer;
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}

button.ghost {
  background: #fff;
  color: #111827;
  border-color: #d1d5db;
}

button.danger {
  background: #dc2626;
  border-color: #dc2626;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.item {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fafafa;
}

.item-head {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: baseline;
}

.title {
  margin: 0;
  font-size: 1.1rem;
}

.contents {
  margin: 0.6rem 0 0.8rem;
  white-space: pre-wrap;
}

.item-meta {
  font-size: 0.9rem;
  color: #6b7280;
}

.meta {
  font-size: 0.9rem;
  color: #6b7280;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.edit-form {
  display: grid;
  gap: 0.6rem;
  margin: 0.6rem 0 0.9rem;
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
}

.loading,
.empty {
  padding: 1rem 0;
  color: #6b7280;
}

.error {
  color: #dc2626;
}
</style>
