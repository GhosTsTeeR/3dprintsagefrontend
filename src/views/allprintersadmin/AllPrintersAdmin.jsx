import React from 'react'
import CardPrinter from '../components/card/CardPrinter';
import PropTypes from 'prop-types';
import CustomSnackbar from '../components/CustomSnackbar';
export default function AllPrintersAdmin({printers, printerSelectect, setPrinterSelectect, snackbarOpen, setSnackbarOpen, snackbarMessage, snackbarSeverity,handleSnackbarClose}) {
      const mode = "ModeLight"
  return (
    <div className={"GM__"+mode+"__main"} >
      <div className={"GM__"+mode+"__main-printers"}>
        <CardPrinter datosCard= {printers} count={printers.length} printerSelectect={printerSelectect}  setPrinterSelectect={setPrinterSelectect} />
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
        position={{ vertical: 'bottom', horizontal: 'center' }}
        size={300}
      />
    </div>
  )
}
AllPrintersAdmin.propTypes = {
  printers: PropTypes.array.isRequired,
  printerSelectect: PropTypes.any.isRequired,
  setPrinterSelectect: PropTypes.func.isRequired,
};