import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import InventoryDataService from '../../api/inventory/InventoryDataService'
import AuthenticationService from './AuthenticationService'

class ConsumeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            itemName: "",
            modelNumber: "",
            serialNumber: "",
            storageLocation: "",
            quantity: "",
            unit: "",
            unitValue: "",
            totalValue: "",
            timeStamp: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getSignedInUserName();
        InventoryDataService.retrieveInventory(username, this.state.id).then(
            (response) =>
                this.setState({
                    itemName: response.data.itemName,
                    modelNumber: response.data.modelNumber,
                    serialNumber: response.data.serialNumber,
                    storageLocation: response.data.storageLocation,
                    quantity: response.data.quantity,
                    unit: response.data.unit,
                    unitValue: response.data.unitValue,
                    totalValue: response.data.totalValue,
                })
        );
    }
    onSubmit(values) {
        let username = AuthenticationService.getSignedInUserName();

       
            InventoryDataService.updateInventory(username, this.state.id, {
              id: this.state.id,
              itemName: values.itemName,
              modelNumber: values.modelNumber,
              serialNumber: values.serialNumber,
              storageLocation: values.storageLocation,
              quantity: this.state.quantity - values.quantity,
              unit: values.unit,
              unitValue: this.state.unitValue - values.quantity,
              totalValue:
                (this.state.quantity - values.quantity) *
                (this.state.unitValue - values.quantity),
              timeStamp: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            }).then(() => this.props.history.push("/inventory"));

        

    }
    render() {
        let itemName = this.state.itemName
        let modelNumber = this.state.modelNumber;
        let serialNumber = this.state.serialNumber;
        let storageLocation = this.state.storageLocation;
        let quantity = this.state.quantity;
        let unit = this.state.unit;
        let unitValue = this.state.unitValue;
        let totalValue = this.state.quantity * this.state.unitValue;
        let timeStamp = moment(new Date()).format('YYYY/MM/DD HH:MM');
        return (
          <div>
            <h1>Inventory Details</h1>
            <div className="container">
              <Formik
                initialValues={{
                  itemName: itemName,
                  modelNumber: modelNumber,
                  serialNumber: serialNumber,
                  storageLocation: storageLocation,
                  quantity: quantity,
                  unit: unit,
                  unitValue: unitValue,
                  totalValue: totalValue,
                  timeStamp: timeStamp,
                }}
                onSubmit={this.onSubmit}
                enableReinitialize={true}
              >
                {(props) => (
                  <Form>
                    <fieldset className="form-group">
                      <label>Consume Quantity</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="quantity"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Work Order Number</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="woNumber"
                      />
                    </fieldset>

                    <button type="submit">Submit</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        );
    }
}

export default ConsumeComponent