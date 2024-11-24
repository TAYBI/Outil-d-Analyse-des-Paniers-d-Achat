<script setup lang="ts">
import ProductsChart from "../components/ProductsChart.vue";
import ProductsTable from "../components/ProductsTable.vue";
import SalesByCategories from "../components/SalesByCategories.vue";
import TopProducts from "../components/TopProducts.vue";
import TotalSales from "../components/TotalSales.vue";
</script>

<template>
  <div class="grid grid-cols-3 gap-4 min-h-screen">
    <div class="col-span-2 row-span-3">
      <ProductsChart />
    </div>
    <div class="col-span-1 row-span-1">
      <TotalSales />
    </div>
    <div class="col-span-1 row-span-2">
      <SalesByCategories />
    </div>
    <div class="col-span-1 row-span-3">
      <TopProducts />
    </div>
    <div class="col-span-2 row-span-3">
      <ProductsTable />
    </div>
  </div>
</template>
