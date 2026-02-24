<template>
  <main>
    <section class="page card">
      <h1>게시글 작성</h1>

      <form class="form" @submit.prevent="submitPost">
        <label>
          제목
          <input v-model="form.title" type="text" required />
        </label>

        <label>
          이름
          <input v-model="form.name" type="text" required />
        </label>

        <label>
          내용
          <textarea v-model="form.contents" rows="8" required />
        </label>

        <button type="submit" :disabled="loading">제출</button>
      </form>

      <p v-if="message" :class="{ error: isError }">{{ message }}</p>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import communityApi from '@/api/community'

const form = reactive({
  title: '',
  name: '',
  contents: '',
})

const loading = ref(false)
const message = ref('')
const isError = ref(false)
const router = useRouter()

const submitPost = async () => {
  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const result = await communityApi.createPost({
      title: form.title,
      name: form.name,
      contents: form.contents,
    })

    if (!result || result.success !== false) {
      message.value = '게시글???�록?�었?�니??'
      form.title = ''
      form.name = ''
      form.contents = ''
      router.push('/board/list')
      return
    }

    isError.value = true
    message.value = result?.message || '게시글 ?�록???�패?�습?�다.'
  } catch (err) {
    isError.value = true
    message.value = err?.message || '?�청 �??�류가 발생?�습?�다.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page {
  max-width: 560px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
}

.form {
  display: grid;
  gap: 0.75rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 600;
}

input,
textarea,
button {
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  cursor: pointer;
  color: #fff;
  background: #22c55e;
  border-color: #22c55e;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
}
</style>

