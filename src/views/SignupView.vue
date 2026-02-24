<template>
  <main>
    <section class="page card">
      <h1>회원가입</h1>

      <form class="form" @submit.prevent="submitSignup">
        <label>
          Email
          <input v-model="form.email" type="email" required />
        </label>

        <label>
          이름
          <input v-model="form.name" type="text" required />
        </label>

        <label>
          비밀번호
          <input v-model="form.password" type="password" required />
        </label>

        <button type="submit" :disabled="loading">가입하기</button>
      </form>

      <p v-if="message" :class="{ error: isError }">{{ message }}</p>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import userApi from '@/api/user'

const form = reactive({
  email: '',
  name: '',
  password: '',
})

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const submitSignup = async () => {
  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const result = await userApi.signup({
      email: form.email,
      name: form.name,
      password: form.password,
    })
    if (!result || result.success !== false) {
      message.value = 'Signup completed.'
      form.email = ''
      form.name = ''
      form.password = ''
      return
    }

    isError.value = true
    message.value = result?.message || 'Signup failed.'
  } catch (err) {
    isError.value = true
    message.value = err?.message || '요청 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page {
  max-width: 520px;
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
button {
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  cursor: pointer;
  color: #fff;
  background: #0ea5e9;
  border-color: #0ea5e9;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
}
</style>
