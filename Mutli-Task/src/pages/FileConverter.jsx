import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { PDFDocument, rgb } from "pdf-lib";

const FileConverter = () => {
    const [files, setFiles] = useState([]);
    const [outputFormat, setOutputFormat] = useState("pdf");
    const [textInput, setTextInput] = useState("");

    const handleDrop = (acceptedFiles) => {
        setFiles(acceptedFiles);
    };

    const handleConvert = async () => {
        if (files.length === 0 && !textInput.trim()) return;

        let convertedFiles = [];

        for (const file of files) {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            let convertedData;

            if (fileExtension === "docx" && outputFormat === "pdf") {
                convertedData = await convertDocxToPdf(file);
            } else if (fileExtension === "xlsx" && outputFormat === "csv") {
                convertedData = await convertXlsxToCsv(file);
            } else if (fileExtension === "csv" && outputFormat === "xlsx") {
                convertedData = await convertCsvToXlsx(file);
            } else if (outputFormat === "pdf" && textInput) {
                convertedData = await convertTextToPdf(textInput);
            }

            if (convertedData) {
                convertedFiles.push({ name: file.name.replace(fileExtension, outputFormat), data: convertedData });
            }
        }

        if (convertedFiles.length > 0) {
            convertedFiles.forEach(({ name, data }) => saveAs(data, name));
        }
    };

    const convertDocxToPdf = async (file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = async (event) => {
                const docxBuffer = event.target.result;
                mammoth.convertToHtml({ arrayBuffer: docxBuffer }).then(async (result) => {
                    const pdfDoc = await PDFDocument.create();
                    const page = pdfDoc.addPage([600, 800]);
                    page.drawText(result.value, { x: 50, y: 750, size: 12, color: rgb(0, 0, 0) });
                    const pdfBytes = await pdfDoc.save();
                    resolve(new Blob([pdfBytes], { type: "application/pdf" }));
                });
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const convertXlsxToCsv = async (file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = (event) => {
                const workbook = XLSX.read(event.target.result, { type: "binary" });
                const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
                resolve(new Blob([csv], { type: "text/csv" }));
            };
            reader.readAsBinaryString(file);
        });
    };

    const convertCsvToXlsx = async (file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = (event) => {
                const worksheet = XLSX.utils.csv_to_sheet(event.target.result);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                const xlsxBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
                resolve(new Blob([xlsxBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
            };
            reader.readAsText(file);
        });
    };

    const convertTextToPdf = async (text) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        page.drawText(text, { x: 50, y: 750, size: 12, color: rgb(0, 0, 0) });
        const pdfBytes = await pdfDoc.save();
        return new Blob([pdfBytes], { type: "application/pdf" });
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center bg-black text-gray-300 p-6">
            <h1 className="text-3xl font-bold text-blue-400 mb-6">File Converter</h1>

            <div className="w-3/4 bg-gray-800 p-6 rounded-lg shadow-lg">
                <div {...useDropzone({ onDrop: handleDrop })} className="border-2 border-dashed border-blue-400 p-6 text-center cursor-pointer">
                    <p>Drag & Drop files here or click to select</p>
                </div>

                <div className="mt-4">
                    <input type="file" multiple onChange={(e) => handleDrop([...e.target.files])} className="hidden" />
                </div>

                <div className="mt-4">
                    <textarea
                        className="w-full p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700"
                        rows="5"
                        placeholder="Enter text to convert to PDF..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="text-blue-300">Convert to:</label>
                    <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} className="w-full p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700">
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                        <option value="xlsx">XLSX</option>
                    </select>
                </div>

                <button onClick={handleConvert} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition">
                    Convert & Download
                </button>

                <div className="mt-4">
                    <h2 className="text-blue-300 text-lg">Files:</h2>
                    {files.map((file, index) => (
                        <p key={index} className="text-gray-400">{file.name}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileConverter;
