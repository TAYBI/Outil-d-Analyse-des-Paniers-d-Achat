<template>
  <div class="w-full h-full">
    <div v-if="loading" class="h-full w-full">
      <div class="text-center">Totales des ventes par produit</div>
      <div class="flex h-full gap-3 w-full">
        <Skeleton v-for="i in 30" :key="i" height="95%"> </Skeleton>
      </div>
    </div>
    <Chart
      v-else
      type="bar"
      :data="data"
      :options="options"
      class="h-[30rem]" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import service from "../service";
import { Product } from "../types";

const data = ref({});
const options = ref({});
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

  options.value = setOptions();
  loading.value = false;
});

const setOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>
