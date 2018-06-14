<template>
  <div>
    <template v-if="item.user_id === user.id">
      <addform></addform>
    </template>
    <template v-else>
      <additem></additem>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddForm from '@/components/AddForm'
import AddItem from '@/components/AddItem'

export default {
  name: 'addItem',
  components: {
    'addform': AddForm,
    'additem': AddItem
  },
  data: () => ({
  }),
  computed: {
    ...mapState('products', {
      item: 'addItem'
    }),
    ...mapState({
      auth: 'isAuth',
      user: 'user'
    })
  },

  created () {
    this.$store.dispatch('products/show', {id: this.$route.params.id})
  }
}
</script>
