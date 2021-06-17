import React, { Component } from 'react';

class TableHeader extends Component {

    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.path===path)
        sortColumn.order = sortColumn.order==='asc'?'desc':'asc';
        else{
          sortColumn.order='asc';
          sortColumn.path=path;
        }
        this.props.onSort(sortColumn);
      };
      sortIcon = (column) =>{
       if(column.path !== this.props.sortColumn.path) return null;
       if(this.props.sortColumn.order==='asc') return <i className="fa fa-sort-asc"></i>;
       return <i className="fa fa-sort-desc"></i>
      }
    render() { 
        return ( 
            <thead>
            <tr className="pointer">
                {this.props.columns.map(column=>
                     <th key={column.path||column.key} onClick={()=>this.raiseSort(column.path)}>{column.name}{this.sortIcon(column)}</th>
                    )}
              </tr>
              </thead>
         );
    }
}
 
export default TableHeader;