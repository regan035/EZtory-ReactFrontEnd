import React, {Component} from 'react'
import moment from 'moment'
import {Formik,Form,Field} from 'formik'
import InventoryDataService from '../../api/inventory/InventoryDataService'
import AuthenticationService from './AuthenticationService'

class InventoryDetails extends Component {
    constructor(props){
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
          timeStamp: moment(new Date()).format("YYYY/MM/DD HH:MM"),
        };
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){

      if(this.state.id===-1){
        return 
      }

      let username = AuthenticationService.getSignedInUserName();
      InventoryDataService.retrieveInventory(username, this.state.id).then(
        (response) =>{
        if(response.data)
        {
          this.setState({
            itemName: response.data.itemName,
            modelNumber: response.data.modelNumber,
            serialNumber: response.data.serialNumber,
            storageLocation: response.data.storageLocation,
            quantity: response.data.quantity,
            unit: response.data.unit,
            unitValue: response.data.unitValue,
            totalValue: response.data.totalValue,
          })}
        }
      );
    }

    

    onSubmit(values){
      let username = AuthenticationService.getSignedInUserName();

      if(this.state.id==-1){
      InventoryDataService.createInventory(username, {
        id: this.state.id,
        itemName: values.itemName,
        modelNumber: values.modelNumber,
        serialNumber: values.serialNumber,
        storageLocation: values.storageLocation,
        quantity: values.quantity,
        unit: values.unit,
        unitValue: values.unitValue,
        totalValue: values.quantity * values.unitValue,
        timeStamp:values.timeStamp
      }).then(() => this.props.history.push("/inventory"));
     
      }else{
              InventoryDataService.updateInventory(username, this.state.id, {
                id: this.state.id,
                itemName: values.itemName,
                modelNumber: values.modelNumber,
                serialNumber: values.serialNumber,
                storageLocation: values.storageLocation,
                quantity: values.quantity,
                unit: values.unit,
                unitValue: values.unitValue,
                totalValue: values.unitValue*values.quantity,
                timeStamp: values.timeStamp,
              }).then(() => this.props.history.push("/inventory"));
              
      }

    }
    render(){
        let itemName = this.state.itemName
        let modelNumber = this.state.modelNumber;
        let serialNumber = this.state.serialNumber;
        let storageLocation = this.state.storageLocation;
        let quantity = this.state.quantity;
        let unit = this.state.unit;
        let unitValue = this.state.unitValue;
        let totalValue = this.state.quantity * this.state.unitValue;
        let timeStamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
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
                  <label>Item Name</label>
                  <Field className="form-control" type="text" name="itemName" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Model Number</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="modelNumber"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Serial Number</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="serialNumber"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Storage Location</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="storageLocation"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Quantity</label>
                  <Field className="form-control" type="text" name="quantity" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Unit</label>
                  <Field className="form-control" type="text" name="unit" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Unit Value</label>
                  <Field className="form-control" type="text" name="unitValue" />
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

export default InventoryDetails