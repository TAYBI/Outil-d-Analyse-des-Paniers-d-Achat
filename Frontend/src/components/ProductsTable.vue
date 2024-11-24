<template>
  <div class="card">
    <DataTable
      :value="products"
      tableStyle="min-width: 50rem"
      paginator
      removableSort
      scrollable
      scrollHeight="400px"
      :loading="loading"
      :rows="20">
      <template #empty> Aucun produit trouvé. </template>
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Produits</span>
          <Button
            label="Actualiser"
            icon="pi pi-refresh"
            size="small"
            @click="fetchProducts" />
        </div>
      </template>

      <Column sortable field="ProductName" header="Nom">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p v-else>
            {{ slotProps.data.ProductName }}
          </p>
        </template>
      </Column>
      <Column sortable field="Price" header="Prix">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p v-else>
            {{ slotProps.data.Price }}
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
      <Column sortable field="totalSales" header="Ventes">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p v-else>
            {{ slotProps.data.totalSales }}
          </p>
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
  products.value = await service.getProducts();
  loading.value = false;
};
</script>
