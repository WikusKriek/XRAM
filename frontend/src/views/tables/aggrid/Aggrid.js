import React from "react"
import {
  Card,
  CardBody,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap"
import { AgGridReact } from "ag-grid-react"
import { ContextLayout } from "../../../utility/context/Layout"
import { ChevronDown } from "react-feather"
import axios from "axios"

import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"

import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"

class AggridTable extends React.Component {
  state = {
    rowData: null,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true
    },
    columnDefs: [
      {
        headerName: "Type",
        field: "type",
        width: 175,
        filter: true
      },
      {
        headerName: "Quiz Type",
        field: "quiz_type",
        filter: true,
        width: 175
      },
      {
        headerName: "Chat Id",
        field: "chat_id",
        filter: true,
        width: 250,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
        pinned: window.innerWidth > 992 ? "left" : false
      },
      {
        headerName: "User ID",
        field: "sender_user_id",
        filter: true,
        width: 250
      },
      {
        headerName: "Outgoing",
        field: "is_outgoing",
        filter: true,
        width: 150
      },
      {
        headerName: "Can Edit",
        field: "can_be_edited",
        filter: true,
        width: 150
      },
      {
        headerName: "Question",
        field: "question",
        filter: true,
        width: 500
      },
      {
        headerName: "Vote Count",
        field: "voter_count",
        filter: true,
        width: 150
      },
      {
        headerName: "Correct Option ID",
        field: "correct_option_id",
        filter: true,
        width: 150
      },
      {
        headerName: "Total views",
        field: "views",
        filter: true,
        width: 150
      }
    ]
  }

  componentDidMount() {
    axios.get("http://localhost:5000/notes/table").then(response => {
      let rowData = response.data
      JSON.stringify(rowData)
      this.setState({ rowData })
    })
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages()
    })
  }

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        currenPageSize: val,
        getPageSize: val
      })
    }
  }

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Aggrid Table"
          breadCrumbParent="Forms & Tables"
          breadCrumbActive="Aggrid Table"
        />
        <Card className="overflow-hidden agGrid-card">
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-2 ag-grid-table">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mb-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown">
                      <DropdownToggle tag="div">
                        {this.gridApi
                          ? this.state.currenPageSize
                          : "" * this.state.getPageSize -
                            (this.state.getPageSize - 1)}{" "}
                        -{" "}
                        {this.state.rowData.length -
                          this.state.currenPageSize * this.state.getPageSize >
                        0
                          ? this.state.currenPageSize * this.state.getPageSize
                          : this.state.rowData.length}{" "}
                        of {this.state.rowData.length}
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(134)}
                        >
                          134
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder="search..."
                        onChange={e => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>
                    <div className="export-btn">
                      <Button.Ripple
                        color="primary"
                        onClick={() => this.gridApi.exportDataAsCsv()}
                      >
                        Export as CSV
                      </Button.Ripple>
                    </div>
                  </div>
                </div>
                <ContextLayout.Consumer>
                  {context => (
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      colResizeDefault={"shift"}
                      animateRows={true}
                      floatingFilter={true}
                      pagination={true}
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                      enableRtl={context.state.direction === "rtl"}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default AggridTable
