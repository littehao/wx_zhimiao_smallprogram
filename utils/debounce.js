// 防抖
export default {
  data() {
    return {
      debounceTimer: null
    }
  },
  methods: {
    $debounce(func, ...args) {
      const context = this
      if (this.debounceTimer) clearTimeout(this.debounceTimer)
      const callNow = !this.debounceTimer // 是否立即执行
      this.debounceTimer = setTimeout(() => {
        this.debounceTimer = null
      }, 1000)
      if (callNow) func.apply(context, args)
    }
  }
}
