<template>
  <div class="card mb-0">
    <div class="flex flex-col gap-4">
      <div
        class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border"
        style="width: 2.5rem; height: 2.5rem">
        <i class="pi pi-dollar text-green-500 !text-xl"></i>
      </div>
      <p class="header">Montant total des ventes</p>
      <Select
        v-model="period"
        :options="periods"
        size="small"
        optionLabel="name"
        placeholder="Période"
        class="w-full" />
      <Skeleton v-if="loading" />
      <p v-else class="header text-green-600">
        {{ formatCurrency(ammount) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import service from "../service";

const ammount = ref(0);
const loading = ref(false);

const period = ref({ name: "Tout", value: "" });
const periods = [
  { name: "Tout", value: "" },
  { name: "Aujourd'hui", value: "today" },
  { name: "Hier", value: "yesterday" },
  { name: "Cette semaine", value: "this_week" },
  { name: "Ce mois", value: "this_month" },
  { name: "Cette année", value: "this_year" },
];

onMounted(async () => {
  await fetchTotal();
});

const fetchTotal = async (startDate: string = "", endDate: string = "") => {
  loading.value = true;
  ammount.value = await service.getTotalSales(startDate, endDate);
  loading.value = false;
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};

watch(
  () => period.value,
  async (value) => {
    if (value) {
      const dates = await service.getDates(value.value);

      if (dates) {
        fetchTotal(dates.dateStart, dates.dateEnd);
      }
    }
  }
);
</script>
