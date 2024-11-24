<template>
  <div class="card">
    <div class="text-center">Ventes par Catégorie</div>
    <div v-if="loading" class="h-full w-full">
      <div class="flex h-full w-full gap-3 items-center justify-center">
        <Skeleton shape="circle" width="20rem" height="20rem"> </Skeleton>
      </div>
    </div>
    <Chart v-else type="pie" :data="data" class="h-full" />
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
