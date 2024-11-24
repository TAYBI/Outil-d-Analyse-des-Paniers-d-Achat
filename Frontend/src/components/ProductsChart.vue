<template>
  <div class="card">
    <div v-if="loading" class="h-full w-full">
      <div class="text-center">Totales des ventes par produit</div>
      <div class="flex h-full gap-3 w-full">
        <Skeleton v-for="i in 30" :key="i" height="95%"> </Skeleton>
      </div>
    </div>
    <Chart v-else type="bar" :data="data" class="h-full" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import service from "../service";
import { Product } from "../types";

const data = ref({});
const products = ref<(Product & { totalSales: number })[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  products.value = await service.getProducts();

  data.value = {
    labels: products.value.map((product) => product.ProductName),
    datasets: [
      {
        label: "Totales des ventes par produit",
        data: products.value.map((product) => product.totalSales),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  loading.value = false;
});
</script>
