# Pagination
Quick first, previous, next, last, and page buttons for pagination control of another component (such as <b-table> or lists).

## Overview

```<b-pagination>``` is a custom input component that provides a current page number input control. The value should be bound via ```v-model``` in your app. Page numbers are indexed from 1. The number of pages is computed from the provided prop values for ```total-rows``` and per-page.

For pagination that changes to a new URL, use the ```<b-pagination-nav>``` component instead.