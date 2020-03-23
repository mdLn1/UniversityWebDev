import React, { Component, Fragment } from "react";
import {
  Header,
  Form,
  Select,
  Divider,
  Button,
  Message,
  Checkbox,
  Input
} from "semantic-ui-react";
import axios from "axios";

export default class AdminControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: -1,
      selectedAction: "Create",
      selectedItemValues: null,
      objError: false,
      itemsList: this.props.listItems || [],
      listOptions: this.props.listOptions || [],
      success: false,
      successMessage: "",
      values: {},
      errors: []
    };
  }

  componentDidMount() {
    const values = {};
    this.props.fields.forEach(el => {
      values[el.name] = el.value;
    });
    this.setState({ values: values });
    if (typeof Storage !== "undefined") {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = token;
    }
  }

  onSelect = (e, data) => {
    if (!this.props.listOptions.find(x => x.value === data.value)) {
      this.setState({ selectedValue: -1, objError: true });
    } else {
      this.setState({ selectedValue: data.value, objError: false });
      if (this.state.selectedAction === "Edit") {
        this.setState({
          selectedItemValues: this.state.itemsList.find(x => x.id == data.value)
        });
      }
    }
  };

  onCreateClick = async () => {
    this.setState({ errors: [] });
    try {
      const res = await axios.post(this.props.link, { ...this.state.values });
      let values = this.state.values;
      const { ID } = res.data;
      values.id = ID;

      const newItems = [...this.state.itemsList, values];
      this.setState({
        success: true,
        successMessage: "Successfully created",
        listOptions: newItems.map(el => ({
          key: el.id,
          text: el[this.props.dropDownProp],
          value: el.id
        })),
        itemsList: newItems,
        values: {}
      });
      var inputs = document.querySelectorAll(".form-inputs");
      inputs.forEach(el => {
        el.value = "";
        });
      this.props.updateValues(this.props.title, newItems);
      setTimeout(
        () => this.setState({ success: false, successMessage: "" }),
        5000
      );
    } catch (err) {
      if (err.response) {
        this.setState({ errors: err.response.data.errors });
      }
    }
  };
  onEditClick = async () => {
    this.setState({ errors: [] });

    try {
      const { itemsList, selectedItemValues, selectedValue } = this.state;

      const res = await axios.post(this.props.link + selectedValue, {
        ...selectedItemValues
      });
      const newItems = [
        ...itemsList.filter(x => x.id !== selectedValue),
        selectedItemValues
      ];
      this.setState(prevState => ({
        ...prevState,
        success: true,
        successMessage: "Successfully updated",
        listOptions: [
          ...prevState.listOptions.filter(x => x.key !== selectedValue),
          {
            key: selectedValue,
            text: selectedItemValues[this.props.dropDownProp],
            value: selectedValue
          }
        ],
        itemsList: newItems
      }));
      this.props.updateValues(this.props.title, newItems);
      setTimeout(
        () => this.setState({ success: false, successMessage: "" }),
        5000
      );
    } catch (err) {
      if (err.response) {
        this.setState({ errors: err.response.data.errors });
      }
    }
  };
  onDeleteClick = async () => {
    this.setState({ errors: [] });

    try {
      const { itemsList, selectedValue } = this.state;

      const res = await axios.delete(this.props.link + selectedValue);
      const newItems = itemsList.filter(x => x.id !== selectedValue);
      this.setState(prevState => ({
        ...prevState,
        success: true,
        successMessage: "Successfully deleted",
        listOptions: newItems.map(el => ({
          key: el.id,
          text: el[this.props.dropDownProp],
          value: el.id
        })),
        itemsList: newItems
      }));
      setTimeout(
        () => this.setState({ success: false, successMessage: "" }),
        5000
      );
      this.props.updateValues(this.props.title, newItems);
    } catch (err) {
      if (err.response) {
        this.setState({ errors: err.response.data.errors });
      }
    }
  };
  onValueChangeCreate = (e, data) => {
    const elementName = data.name;
    if (elementName.startsWith("isSelectable")) {
      this.setState(prevState => ({
        ...prevState,
        values: {
          ...prevState.values,
          [elementName]: prevState.values[elementName] == 1 ? 0 : 1
        }
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        values: { ...prevState.values, [elementName]: data.value }
      }));
    }
  };
  onValueChangeEdit = (e, data) => {
    if (data.name === "isSelectable") {
      this.setState(prevState => ({
        ...prevState,
        selectedItemValues: {
          ...prevState.selectedItemValues,
          [data.name]: prevState.selectedItemValues[data.name] == 1 ? 0 : 1
        }
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        selectedItemValues: {
          ...prevState.selectedItemValues,
          [data.name]: data.value
        }
      }));
    }
  };

  onSelectAction = (e, data) => {
    this.setState({ selectedAction: data.value, errors: [] });
    if (data.value !== "Create") {
      this.setState({ selectedValue: -1 });
    }
  };
  render() {
    const { itemName, objName, fields } = this.props;
    let { title } = this.props;
    title = title[0].toUpperCase() + title.slice(1);
    const {
      objError,
      selectedAction,
      selectedValue,
      listOptions,
      selectedItemValues,
      errors,
      success,
      successMessage
    } = this.state;

    const objProps = {
      name: itemName,
      label: {
        children: `Choose ${objName[0].toUpperCase() +
          objName.slice(1)} to edit`,
        htmlFor: `form-select-control-${title}`
      },
      onChange: this.onSelect,
      placeholder: `Please select a ${objName}`,
      required: true
    };

    if (objError) {
      objProps.error = {
        content: `Please choose one of the existing ${title}`,
        pointing: "below"
      };
    }

    const actionOptions = [
      { key: 1, value: "Create", text: "Create" },
      {
        key: 2,
        value: "Edit",
        text: "Edit"
      },
      { key: 3, value: "Delete", text: "Delete" }
    ];

    return (
      <Fragment>
        <Header size="medium" style={{ textAlign: "center" }}>
          {title}
        </Header>
        {errors.length > 0 && (
          <Message negative>
            <Message.Header>
              There were some errors with your submission
            </Message.Header>
            <Message.List items={errors} />
          </Message>
        )}
        {success && <Message success header={successMessage} />}
        <br />
        <Divider horizontal>Select an action</Divider>
        <div style={{ textAlign: "center" }}>
          <Select
            placeholder="Create"
            options={actionOptions}
            onChange={this.onSelectAction}
          />
        </div>
        <br />
        {selectedAction === "Edit" && (
          <Fragment>
            <Divider horizontal>Edit {objName}</Divider>
            <Form>
              <Form.Field
                control={Select}
                options={listOptions}
                {...objProps}
                search
                searchInput={{ id: `form-select-control-${objName}` }}
              />
              {selectedValue !== -1 &&
                fields.map(el => {
                  if (el.type === "bool") {
                    return (
                      <Form.Field
                        key={el.name}
                        name={el.name}
                        label={el.label}
                        control={Checkbox}
                        required={el.required}
                        onChange={this.onValueChangeEdit}
                        toggle
                        defaultChecked={
                          selectedItemValues[el.name] == "1" ? true : false
                        }
                      />
                    );
                  } else {
                    return (
                      <Form.Field
                        control={Input}
                        key={el.name}
                        className={"form-inputs"}
                        type="text"
                        label={el.label}
                        placeholder={el.label}
                        name={el.name}
                        required={el.required}
                        value={`${selectedItemValues[el.name]}`}
                        onChange={this.onValueChangeEdit}
                      />
                    );
                  }
                })}
              {selectedValue !== -1 && (
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    content="Save"
                    color="green"
                    onClick={this.onEditClick}
                  />
                </div>
              )}
            </Form>
          </Fragment>
        )}
        {selectedAction === "Delete" && (
          <Fragment>
            <Divider horizontal>Delete {objName}</Divider>
            <Form>
              <Form.Field
                control={Select}
                options={listOptions}
                {...objProps}
                search
                searchInput={{ id: `form-select-control-${objName}` }}
              />

              <div style={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  content="Delete"
                  color="red"
                  onClick={this.onDeleteClick}
                />
              </div>
            </Form>
          </Fragment>
        )}
        {selectedAction === "Create" && (
          <Fragment>
            <Divider horizontal>New {objName}</Divider>
            <Form>
              {fields.map((el, index) => {
                if (el.type === "bool") {
                  return (
                    <Form.Field
                      key={index}
                      label={el.label}
                      control={Checkbox}
                      name={el.name}
                      required={el.required}
                      toggle
                      checked={el.value === true}
                      onChange={this.onValueChangeCreate}
                    />
                  );
                } else {
                  return (
                    <Form.Field
                      control={Input}
                      required={el.required}
                      key={index}
                      type="text"
                      label={el.label}
                      placeholder={el.label}
                      name={el.name}
                      onChange={this.onValueChangeCreate}
                    />
                  );
                }
              })}
              <div style={{ textAlign: "right" }}>
                <Button content="Create" primary onClick={this.onCreateClick} />
              </div>
            </Form>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
