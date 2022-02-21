import React, { Component } from "react";
import "./styles/TextField.css";
import { Input } from "antd";

class TextField extends Component {
  render() {
    return (
      <div className="inputWrapper">
        <Input
          type="text"
          onChange={(e) => this.props.onChange(e.target.value)}
          placeholder={this.props.title}
          bordered={false}
        />
      </div>
    );
  }
}

export default TextField;
