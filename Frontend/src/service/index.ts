class Service {
  readonly URL: string = "http://localhost:3000";

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
}

export default new Service();
