<template>
  <div class="card">
    <DataTable
      :value="products"
      tableStyle="min-width: 50rem"
      showGridlines
      paginator
      removableSort
      scrollable
      scrollHeight="700px"
      :loading="loading"
      :rows="20">
      <template #empty> Aucun produit trouvé. </template>
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="header">Produits</span>
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
      <Column sortable field="date" header="Date">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p v-else>
            {{ formatDateTime(slotProps.data.date) }}
          </p>
        </template>
      </Column>
      <Column sortable field="Price" header="Prix">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p class="text-right" v-else>
            {{ formatCurrency(slotProps.data.Price) }}
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
      <Column sortable field="salesCount" header="Nombre de Ventes">
        <template #body="slotProps">
          <Skeleton v-if="loading" />
          <p class="text-center" v-else>
            {{ slotProps.data.salesCount }}
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

const products = ref<(Product & { salesCount: number })[]>([]);
const loading = ref(false);

onMounted(async () => {
  await fetchProducts();
});

const fetchProducts = async () => {
  loading.value = true;
  products.value = await service.getProducts();
  loading.value = false;
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
