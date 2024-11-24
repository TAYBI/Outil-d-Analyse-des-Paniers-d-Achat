class Service {
  readonly URL: string = import.meta.env.VITE_API as string;

  async getTotalSales(startDate: string = "", endDate: string = "") {
    const response = await fetch(
      `${this.URL}/analytics/total_sales?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    return data.data;
  }

  async getProducts() {
    const response = await fetch(`${this.URL}/products`);
    const data = await response.json();
    return data.data;
  }

  async getCategorySales() {
    const response = await fetch(`${this.URL}/analytics/category_sales`);
    const data = await response.json();
    return data.data;
  }

  async getTrendingProducts() {
    const response = await fetch(
      `${this.URL}/analytics/trending_products?limit=5`
    );
    const data = await response.json();
    return data.data;
  }

  async getDates(period: string) {
    switch (period) {
      case "":
        return { dateStart: "", dateEnd: "" };

      case "today":
        return {
          dateStart: new Date().toISOString().split("T")[0],
          dateEnd: new Date().toISOString().split("T")[0],
        };

      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return {
          dateStart: yesterday.toISOString().split("T")[0],
          dateEnd: yesterday.toISOString().split("T")[0],
        };

      case "this_week":
        const today = new Date();
        const firstDay = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        return {
          dateStart: firstDay.toISOString().split("T")[0],
          dateEnd: new Date().toISOString().split("T")[0],
        };

      case "this_month":
        const firstDayOfMonth = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
        return {
          dateStart: firstDayOfMonth.toISOString().split("T")[0],
          dateEnd: new Date().toISOString().split("T")[0],
        };

      case "this_year":
        const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
        return {
          dateStart: firstDayOfYear.toISOString().split("T")[0],
          dateEnd: new Date().toISOString().split("T")[0],
        };

      default:
        break;
    }
  }
}

export default new Service();
