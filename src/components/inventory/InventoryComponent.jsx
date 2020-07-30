import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'
import { BrowserRouter as Switch, Link } from 'react-router-dom'
import InventoryDataService from "../../api/inventory/InventoryDataService";
import moment from "moment";


class InventoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      filteredInventory:[],
      message: null,
      search: "",
    };

    this.deleteInventoryClicked = this.deleteInventoryClicked.bind(this);
    this.consumeInventoryClicked = this.consumeInventoryClicked.bind(this);
    this.updateInventoryClicked = this.updateInventoryClicked.bind(this);
    this.addInventoryClicked = this.addInventoryClicked.bind(this);
    this.refreshInventoryList = this.refreshInventoryList.bind(this);
    this.checkClicked = this.checkClicked.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  componentDidMount() {
    this.refreshInventoryList();
  }

  onSearchChange(e) {
    this.setState({ search: e.target.value });
  }
  onSearchClick(){
    const filteredInventory = this.state.inventory.filter(
      (item) =>
        this.state.search.toLowerCase() == item.itemName.toLowerCase() ||
        this.state.search.toLowerCase() == item.modelNumber.toLowerCase() ||
        this.state.search.toLowerCase() == item.serialNumber.toLowerCase() ||
        this.state.search.toLowerCase() == item.storageLocation.toLowerCase()
    );
    this.state.search
      ? this.setState({ filteredInventory })
      : this.setState({ filteredInventory: this.state.inventory });

  }
  // componentDidUpdate() {
  //   this.refreshInventoryList();
  // }
  refreshInventoryList() {
    let username = AuthenticationService.getSignedInUserName();
    InventoryDataService.retrieveAllInventory(username).then((response) => {
      this.setState({ inventory: response.data, filteredInventory:response.data });
    });
  }
  deleteInventoryClicked(id) {
    let username = AuthenticationService.getSignedInUserName();
    console.log(username, id);
    InventoryDataService.deleteInventory(username, id).then((response) => {
      this.setState({ message: `Delete inventory ${id} Successful` });
      this.refreshInventoryList();
    });
  }

  addInventoryClicked() {
    this.props.history.push(`/inventory/-1`);
  }

  updateInventoryClicked(id) {
    console.log("update" + id);
    this.props.history.push(`/inventory/${id}`);
  }

  consumeInventoryClicked(id) {
    this.props.history.push(`/consume/${id}`);
  }

  checkClicked(inventory) {
    let username = AuthenticationService.getSignedInUserName();
    InventoryDataService.updateInventory(username, inventory.id, {
      ...inventory,
      timeStamp: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    }).then(() => this.refreshInventoryList());
  }

  getTotalValue() {
    const { inventory } = this.state;
    const totalValue = inventory.reduce(
      (total, curr) => total + curr.totalValue,
      0
    );
    return totalValue;
  }
  render() {
    let { fName, lName } = AuthenticationService.getUser();
    return (
      <div>
        <HeaderComponent />
        <div className="jumbotron">
          <h3>
            Welcome {`${fName} ${lName}`},The total value of inventory is $
            {this.getTotalValue()}{" "}
          </h3>
          <div className=" d-flex justify-content-center">
            <form className="form-inline">
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearchChange}
                aria-label="Search"
                value={this.state.search}
              />
              <button type="button" onClick={this.onSearchClick}>
                Search
              </button>
            </form>
            <button onClick={this.addInventoryClicked}>Add Inventory</button>
          </div>
          {this.state.message && <div>{this.state.message}</div>}
        </div>
        <div className="d-flex justify-content-center">
          <table>
            <thead>
              <tr>
                <th className="border border-secondary">Id</th>
                <th className="border border-secondary">Item Name</th>
                <th className="border border-secondary">Model Number</th>
                <th className="border border-secondary">Serial Number</th>
                <th className="border border-secondary">Storage Location</th>
                <th className="border border-secondary">On Hand Quantity</th>
                <th className="border border-secondary">Unit</th>
                <th className="border border-secondary">Unit Value</th>
                <th className="border border-secondary">Total Value</th>
                <th className="border border-secondary">Time Stamp</th>
                <th className="border border-secondary">Check</th>
                <th className="border border-secondary">Update</th>
                <th className="border border-secondary">Consume</th>
                <th className="border border-secondary">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredInventory.map((inventory) => (
                <tr key={inventory.id} className="border border-secondary">
                  <td className="border border-secondary">{inventory.id}</td>
                  <td className="border border-secondary">
                    {inventory.itemName}
                  </td>
                  <td className="border border-secondary">
                    {inventory.modelNumber}
                  </td>
                  <td className="border border-secondary">
                    {inventory.serialNumber}
                  </td>
                  <td className="border border-secondary">
                    {inventory.storageLocation}
                  </td>
                  <td className="border border-secondary">
                    {inventory.quantity}
                  </td>
                  <td className="border border-secondary">{inventory.unit}</td>
                  <td className="border border-secondary">
                    {inventory.unitValue}
                  </td>
                  <td className="border border-secondary">
                    {inventory.totalValue}
                  </td>
                  <td className="border border-secondary">
                    {moment(inventory.timeStamp).format(
                      "YYYY-MM-DD hh:mm:ss a"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => this.checkClicked(inventory)}
                    >
                      Check
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateInventoryClicked(inventory.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.consumeInventoryClicked(inventory.id)}
                    >
                      Consume
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteInventoryClicked(inventory.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <FooterComponent />
      </div>
    );
  }
}
class HeaderComponent extends Component {
    render() {
        return (
            <div>
              <nav className="navbar navbar-light" >
                  <div>EZtory</div>
                  <button onClick={this.addInventoryClicked}>Add Inventory</button>
                  <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button type="submit">Search</button>
                  </form>
                    <Link to="signout" onClick={AuthenticationService.signout}>Sign Out</Link>

                </nav>
            </div>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <hr />

                <br />
                <span className="text-muted">All Rights Reserved @Claim Academy Java 2020-4</span>
            </div>
        )
    }
}
export default InventoryComponent