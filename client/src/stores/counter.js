import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    access_token: localStorage.access_token,
    base_url: 'http://localhost:3000',
    isLogin: false,

  }),
  actions: {
    async login(data){
      try {
        const response = await axios.post(`${this.base_url}/login`, data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timer: 1000
        })
        localStorage.access_token = response.data.access_token
        this.isLogin = true
        this.router.push('/')
      } catch (err) {
        console.log(err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }
    }
  }
})
