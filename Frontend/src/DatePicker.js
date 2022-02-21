import React, { Component } from "react";
import "./styles/DatePicker.css";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

class DateTimePicker extends Component {
  render() {
    return (
      <div className="inputWrapper">
        <RangePicker
          showTime={{ format: "hh:mm A" }}
          format="MM/DD/YYYY hh:mm A"
          onChange={null}
          bordered={false}
          onOk={(e) => this.props.onChange(e)}
        />
      </div>
    );
  }
}

export default DateTimePicker;
