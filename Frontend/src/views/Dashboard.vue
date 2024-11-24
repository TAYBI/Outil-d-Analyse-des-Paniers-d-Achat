<script setup lang="ts">
import ProductsChart from "../components/ProductsChart.vue";
import ProductsTable from "../components/ProductsTable.vue";
import SalesByCategories from "../components/SalesByCategories.vue";
import TopProducts from "../components/TopProducts.vue";
import TotalSales from "../components/TotalSales.vue";
</script>

<template>
  <div
    class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div
      class="row-span-5 sm:col-span-2 md:col-span-3 lg:col-span-3 lg:row-span-5">
      <ProductsTable />
    </div>
    <div class="row-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
      <TotalSales />
    </div>
    <div class="row-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
      <TopProducts />
    </div>
    <div class="row-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
      <SalesByCategories />
    </div>
    <div class="row-span-5 sm:col-span-2 md:col-span-3 lg:col-span-4">
      <ProductsChart />
    </div>
  </div>
</template>
