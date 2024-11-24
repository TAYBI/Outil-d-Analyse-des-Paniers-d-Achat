<template>
  <div class="card">
    <span class="header">Ventes par Catégorie</span>
    <div class="flex w-full h-full p-2 items-center justify-center">
      <Skeleton
        v-if="loading"
        shape="circle"
        width="15rem"
        height="15rem"
        class="mb-2" />
      <Chart v-else type="pie" :data="data" class="max-h-[20rem]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import service from "../service";

const data = ref({});
type CategorySales = {
  category: string;
  totalSales: number;
  percentage: number;
};

const categorySales = ref<CategorySales[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  categorySales.value = await service.getCategorySales();

  data.value = {
    labels: categorySales.value.map((product) => product.category),
    datasets: [
      {
        label: "Ventes par Catégorie",
        data: categorySales.value.map((product) => product.totalSales),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#47B39C",
          "#EC6B56",
          "#FFC154",
          "#47B39C",
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // options.value = setOptions();
  loading.value = false;
});
</script>
