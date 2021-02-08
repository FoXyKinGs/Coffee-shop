const mixins = {
  data () {
    return {
    }
  },
  methods: {
    parseToRupiah (data) {
      return `Rp ${data.toLocaleString('id-ID')}`
    }
  }
}

export default mixins
