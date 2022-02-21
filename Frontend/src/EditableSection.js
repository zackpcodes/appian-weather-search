import React, { Component } from "react";
import "./styles/EditableSection.css";
import DateTimePicker from "./DatePicker.js";
import TextField from "./TextField.js";

class EditableSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      startDate: "",
      endDate: "",
    };
  }

  render() {
    return (
      <div className="editable-section">
        <TextField
          title="Location"
          onChange={(value) => {
            this.setState(
              {
                location: value,
              },
              () => {
                this.props.onChange(this.state);
              }
            );
          }}
        />
        <DateTimePicker
          title="Start Date"
          onChange={(startEndDates) => {
            this.setState(
              {
                startDate: startEndDates[0]?.format("YYYY-MM-DD HH:mm:ss"),
                endDate: startEndDates[1]?.format("YYYY-MM-DD HH:mm:ss"),
              },
              () => {
                this.props.onChange(this.state);
              }
            );
          }}
        />
      </div>
    );
  }
}

export default EditableSection;
