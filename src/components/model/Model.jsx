import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { generateReport } from "./ReportGenerator";
import {
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
} from "react-icons/fa";

const ImageUploader = () => {
  const [oldImage, setOldImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [report, setReport] = useState("");
  const [generateReportBtn,setGenerateReportBtn]=useState("Generate Report")

  const steps = [
    "Reading Images",
    "Resizing Images",
    "Computing Difference Image",
    "Performing PCA",
    "Building Feature Vector Space",
    "Clustering",
    "Performing Closing",
    "Generating Output",
  ];
  /*const handleGenerateReport = () => {
  if (response && response.change_map_url) {
    
    // Path to the local file in your assets folder
    const imagePath = "src/assets/output_image/output.jpg";
    // Your custom prompt
    const prompt = "the image is a output of a change detection model in two different satellite images , the white part shows where changes occured and black shows no change , generate an report to describe it output image, ";
    generateReport(imagePath, prompt); // Pass the file path and prompt to the function
  } else {
    console.error("No image available to generate report.");
  }
};*/

  const handleGenerateReport = async (img_url) => {
    setGenerateReportBtn("Generating...")
    // Path to the local file in your assets folder
    const imagePath = img_url;
    const prompt =
      "the image is a output of a change detection model in two different satellite images , the white part shows where changes occured and black shows no change , generate an report to describe it output image, ";
    try {
      const reportText = await generateReport(imagePath, prompt);
      setReport(reportText); // Set the report text
      setGenerateReportBtn("Generated");
  
    } catch (error) {
      console.error("Error generating report:", error);
      setErrorMessage("An error occurred while generating the report.");
    }
  };
  const handleOldImageDrop = (acceptedFiles) => {
    setOldImage(acceptedFiles[0]);
  };

  const handleNewImageDrop = (acceptedFiles) => {
    setNewImage(acceptedFiles[0]);
  };

  const {
    getRootProps: getOldImageProps,
    getInputProps: getOldImageInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: handleOldImageDrop,
  });

  const {
    getRootProps: getNewImageProps,
    getInputProps: getNewImageInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: handleNewImageDrop,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldImage || !newImage) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setResponse(null);

    const formData = new FormData();
    formData.append("image1", oldImage);
    formData.append("image2", newImage);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

      setCurrentStep(0);
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i + 1);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate step time
      }

      setResponse(res.data);
      setIsProcessing(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsProcessing(false);
      setErrorMessage("An error occurred during processing. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-zinc-950 mt-16">
      <h1 className="text-4xl mb-6 text-center text-white">Try Now!</h1>
      <div className="text-gray-400 mb-6 text-center">
        <p>
          Upload two images of the same area, captured at different times, to
          detect changes between them.
        </p>
        <p>
          Image 1 should represent the earlier timeframe, and Image 2 should
          represent the more recent timeframe.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 shadow-md rounded-lg p-8 w-full max-w-4xl"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Change Detection Tool
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div
            {...getOldImageProps()}
            className="w-full md:w-1/3 p-4 border-dashed border-4 border-gray-400 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer relative"
          >
            <input {...getOldImageInputProps()} />
            {oldImage ? (
              <>
                <img
                  src={URL.createObjectURL(oldImage)}
                  alt="Old Image"
                  className="w-full h-32 object-cover mb-2 rounded-lg"
                />
                <p className="text-sm text-center">{oldImage.name}</p>
              </>
            ) : (
              <p className="text-center text-sm">
                Drag & drop Image 1 here, or click to select file
              </p>
            )}
          </div>

          <div
            {...getNewImageProps()}
            className="w-full md:w-1/3 p-4 border-dashed border-4 border-gray-400 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer relative"
          >
            <input {...getNewImageInputProps()} />
            {newImage ? (
              <>
                <img
                  src={URL.createObjectURL(newImage)}
                  alt="New Image"
                  className="w-full h-32 object-cover mb-2 rounded-lg"
                />
                <p className="text-sm text-center">{newImage.name}</p>
              </>
            ) : (
              <p className="text-center text-sm">
                Drag & drop Image 2 here, or click to select file
              </p>
            )}
          </div>

          <div className="w-full md:w-1/3 p-4 text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <FaSpinner className="animate-spin mr-2 inline-block" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>

      {currentStep > 0 && (
        <div className="mt-8 bg-zinc-900 shadow-md rounded-lg p-6 w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Processing Steps:
          </h2>
          <ul className="list-none text-center">
            {steps.map((step, index) => (
              <li key={index} className="flex items-center justify-center mb-2">
                {index < currentStep ? (
                  <FaCheckCircle className="text-green-500 mr-2" />
                ) : index === currentStep ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <span className="mr-2" />
                )}
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      {response && (
        <div className="mt-8 bg-zinc-900 shadow-md rounded-lg p-6 w-full max-w-4xl">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-wrap justify-center items-start">
              <div className="flex flex-col items-center p-4 md:w-1/3">
                <h1 className="mb-2">Image 1</h1>
                <img
                  src={response.image1_url}
                  alt="Original Image 1"
                  className="m-2 max-w-full rounded-lg"
                />
              </div>
              <div className="flex flex-col items-center p-4 md:w-1/3">
                <h1 className="mb-2">Image 2</h1>
                <img
                  src={response.image2_url}
                  alt="Original Image 2"
                  className="m-2 max-w-full rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col items-center p-4 md:w-1/3">
              <h1 className="mb-2">Output</h1>
              <img
                src={response.change_map_url}
                alt="Change Detection"
                className="m-2 max-w-full rounded-lg"
              />
              <a
                href={response.change_map_url}
                download="change_detection_output.png"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <FaDownload className="mr-2" />
                Download Output Image
              </a>
              {/* Generate Report Button */}
              <button
                onClick={() => handleGenerateReport(response.change_map_url)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                {generateReportBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Report */}
      {report && (
        <div className="mt-8 bg-zinc-900 shadow-md rounded-lg p-6 w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">Generated Report:</h2>
          <p>{report}</p>
        </div>
      )}

      {errorMessage && (
        <div
          className="mt-8 bg-zinc-900 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-4xl text-center"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <span className="sr-only">Close</span>
              <FaTimesCircle />
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
