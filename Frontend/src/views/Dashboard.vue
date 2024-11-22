<script setup lang="ts">
import { ref, onMounted } from "vue";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface ChartOptions {
  plugins: {
    legend: {
      labels: {
        color: string;
      };
    };
  };
  scales: {
    x: {
      ticks: {
        color: string;
      };
      grid: {
        color: string;
      };
    };
    y: {
      beginAtZero: boolean;
      ticks: {
        color: string;
      };
      grid: {
        color: string;
      };
    };
  };
}

const chartData = ref<ChartData>();
const chartOptions = ref<ChartOptions>();

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = (): ChartData => {
  return {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Sales",
        data: [540, 325, 702, 620],
        backgroundColor: [
          "rgba(249, 115, 22, 0.2)",
          "rgba(6, 182, 212, 0.2)",
          "rgb(107, 114, 128, 0.2)",
          "rgba(139, 92, 246, 0.2)",
        ],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const setChartOptions = (): ChartOptions => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color").trim();
  const textColorSecondary = documentStyle
    .getPropertyValue("--p-text-muted-color")
    .trim();
  const surfaceBorder = documentStyle
    .getPropertyValue("--p-content-border-color")
    .trim();

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

<template>
  <div class="flex w-full gap-3">
    <Card class="w-full" style="overflow: hidden">
      <template #header>
        <div class="px-5 pt-5">
          <i class="pi pi-money-bill" style="font-size: 2.5rem"></i>
        </div>
      </template>
      <template #title>880</template>
      <template #subtitle>statistics</template>
    </Card>
    <Card class="w-full" style="overflow: hidden">
      <template #header>
        <div class="px-5 pt-5">
          <i class="pi pi-file" style="font-size: 2.5rem"></i>
        </div>
      </template>
      <template #title>880</template>
      <template #subtitle>Walks-ins</template>
    </Card>
    <Card class="w-full" style="overflow: hidden">
      <template #header>
        <div class="px-5 pt-5">
          <i class="pi pi-user" style="font-size: 2.5rem"></i>
        </div>
      </template>
      <template #title>880</template>
      <template #subtitle>Walks-ins</template>
    </Card>
  </div>

  <div class="flex w-full gap-3">
    <div class="w-full">
      <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
