import axios from 'axios'

class InventoryDataService {
  retrieveAllInventory(name) {
    return axios.get(`http://localhost:8080/users/${name}/inventory`);
  }

  retrieveInventory(name, id) {
    return axios.get(`http://localhost:8080/users/${name}/inventory/${id}`);
  }

  deleteInventory(name, id) {
    return axios.delete(`http://localhost:8080/users/${name}/inventory/${id}`);
  }

  updateInventory(name, id, inventoryX) {
    return axios.put(
      `http://localhost:8080/users/${name}/inventory/${id}`,
      inventoryX
    );
  }

  createInventory(name, inventoryX) {
    return axios.post(
      `http://localhost:8080/users/${name}/inventory/`,
      inventoryX
    );
  }
}


export default new InventoryDataService()