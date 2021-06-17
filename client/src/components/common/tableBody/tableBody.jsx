import _ from "lodash";
import React, { Component} from "react";

class TableBody extends Component {
  createKey = (item, column) => {
    return item._id + (column.name || column.key);
  };
  renderCell = (item, column, user) => {
    if (column.content && column.key === "delete" && (!user || !user.isAdmin))
      return null;
    else if (column.content) return column.content(item);
    else return _.get(item, column.path);
  };
  render() {
    const { data, columns, user } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column, user)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
