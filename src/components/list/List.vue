<template>
  <b-list-group>
    <b-list-group-item>Default list group item</b-list-group-item>
    <b-list-group-item variant="primary"
      >Primary list group item</b-list-group-item
    >
    <b-list-group-item variant="secondary"
      >Secondary list group item</b-list-group-item
    >
    <b-list-group-item variant="success"
      >Success list group item</b-list-group-item
    >
    <b-list-group-item variant="danger"
      >Danger list group item</b-list-group-item
    >
    <b-list-group-item variant="warning"
      >Warning list group item</b-list-group-item
    >
    <b-list-group-item variant="info">Info list group item</b-list-group-item>
    <b-list-group-item variant="light">Light list group item</b-list-group-item>
    <b-list-group-item variant="dark">Dark list group item</b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: 'List',
  props: {
    msg: String,
  },
}
</script>

<style scoped lang="scss"></style>
