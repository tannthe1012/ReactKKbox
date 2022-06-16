import React from "react";
import Button from "react-bootstrap/Button";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {getAllReport } from "../../services/report.service";

type Props = {
  csvData: Object[];
  exportAll: boolean
  fileName: string;
  labelText: String;
};

export const ExportCSV: React.FC<Props> = ({ csvData, exportAll, fileName, labelText}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (csvData: Object[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const onClickExportAll = async () => {
    await getAllReport().then((res) => {
      exportToCSV(res, fileName);
    }, (error) => {
      console.log(error)
    })
    
  }




  if (exportAll) {
    return (
      <Button variant="warning" onClick={onClickExportAll}>
          {labelText}
      </Button>
    );
  } else {
    return (
      <Button variant="warning" onClick={(e) => exportToCSV(csvData, fileName)}>
          {labelText}
      </Button>
    );
  }




};
