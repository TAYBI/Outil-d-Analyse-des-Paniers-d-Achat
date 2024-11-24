<template>
  <div class="card">
    <DataTable
      :value="products"
      removableSort
      scrollHeight="400px"
      size="small"
      :sortOrder="1"
      sortField="Category"
      :loading="loading">
      <template #empty> Aucun produit trouvé. </template>
      <template #header>
        <span class="header"> Top 5 des produits les plus vendus </span>
      </template>

      <Column sortable field="ProductName" header="Nom">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p v-else>
            {{ slotProps.data.ProductName }}
          </p>
        </template>
      </Column>
      <Column sortable field="Category" header="Catégorie">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p v-else>
            {{ slotProps.data.Category }}
          </p>
        </template>
      </Column>
      <Column sortable field="percentage" header="Pourcentage">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p class="text-right" v-else>{{ slotProps.data.percentage }} %</p>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import service from "../service";
import { Product } from "../types";

const products = ref<(Product & { totalSales: number })[]>([]);
const loading = ref(false);

onMounted(async () => {
  await fetchProducts();
});

const fetchProducts = async () => {
  loading.value = true;
  products.value = await service.getTrendingProducts();
  loading.value = false;
};
</script>
