<script setup lang="ts">
// Rows × columns showcase table for stories (variant/color/size matrices).
// Scoped slot exposes { row, col } for each cell.
defineProps<{
  rows: (string | number)[]
  cols: (string | number)[]
}>()
</script>

<template>
  <table class="sb-matrix">
    <thead>
      <tr>
        <td></td>
        <th v-for="c in cols" :key="c">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in rows" :key="r">
        <td class="sb-matrix__label">{{ r }}</td>
        <td v-for="c in cols" :key="c">
          <slot :row="r" :col="c" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
