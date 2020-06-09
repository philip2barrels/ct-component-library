<template>
  <div class="pl-3">
    <h5>Components</h5>
    <ul>
     <li>
          <a href="/#/components/button">Button</a>
        </li>
           <li>
          <a href="/#/components/ct-centered-spinner">Ct Centered Spinner</a>
        </li>
           <li>
          <a href="/#/components/input">Input</a>
        </li>
           <li>
          <a href="/#/components/list">List</a>
        </li>
           <li>
          <a href="/#/components/pagination">Pagination</a>
        </li>
           <li>
          <a href="/#/components/table">Table</a>
        </li>
          </ul>
  </div>
</template>

<script>

/*
  !!Warning!!
  This file is created dynamically based on the contents of src/components.
  Edit build-sidebar.js to make layout changes.
*/

export default {
  name: 'Sidebar',
};
</script>

<style lang="scss" scoped>
  ul {
    margin: 0;
    margin-left: 1em;
    padding: 0;
    li {
      list-style-type: none;
      text-align: left;
    }
  }
</style>
