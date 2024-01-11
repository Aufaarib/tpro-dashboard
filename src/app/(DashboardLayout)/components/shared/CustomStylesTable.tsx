const CustomStylesTable = {
  table: {
    style: {
      width: "auto", // set the width of the table wrapper
      backgroundColor: "transparent",
    },
  },
  cells: {
    style: {
      paddingLeft: "22px", // override the cell padding for data cells
      justifyContent: "left",
      fontSize: "14px",
      color: "#333",
      fontWeight: 400,
    },
  },
  rows: {
    style: {
      // backgroundColor: "#D5D5D540",
      // marginTop: "10px",
      // borderRadius: "10px",
      border: "1px solid #EBEBEB",
      minHeight: "72px", // override the row height
      "&:last-of-type": {
        borderRadius: "0px 0px 12px 12px ",
      },
    },
  },
  denseStyle: {
    minHeight: "32px",
  },
  headRow: {
    style: {
      // backgroundColor: "green",
      borderRadius: "12px 12px 0px 0px",
      minHeight: "52px",
      border: "1px solid #EBEBEB",
    },
    denseStyle: {
      minHeight: "32px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "22px", // override the cell padding for head cells
      // paddingRight: "10px",
      justifyContent: "left",
      color: "#000",
      fontSize: "14px",
      fontWeight: 600,
    },
  },
  // pagination: {
  //   style: {
  //     backgroundColor: "transparent",
  //     borderTop: "none",
  //     padding: "10px",
  //   },
  //   pageButtonsStyle: {
  //     borderRadius: "5px",
  //     border: "1px solid #ccc",
  //     margin: "2px",
  //     color: "#007BFF",
  //     backgroundColor: "white",
  //   },
  //   activePageButtonStyle: {
  //     backgroundColor: "#007BFF",
  //     color: "white",
  //   },
  //   disabledPageButtonStyle: {
  //     color: "#ccc",
  //     cursor: "not-allowed",
  //   },
  // },
};

export default CustomStylesTable;
