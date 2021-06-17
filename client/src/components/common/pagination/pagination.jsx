import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { total, pageSize, currentPage } = this.props;
    const pageCount = total / pageSize;
    let pages = _.range(1, pageCount + 1);
    if (pageCount < 1) pages = [];
    //console.log(this.props);
    return (
      <nav aria-label="...">
        <ul className="pagination pointer">
          {pages.map((page) => (
            <li
              key={page}
              onClick={() => this.props.onPageChange(page)}
              className={
                page === currentPage ? "page-item active" : "page-item "
              }
            >
              <span className="page-link">{page}</span>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,

};

export default Pagination;
