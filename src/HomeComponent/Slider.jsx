import React, { useState } from "react";
import ImageZoom from "react-image-zoom";
import sickcle from "../assets/wsi.png";

export default function ImageSlider() {
  const [marker, setMarker] = useState("circle");
  const [gridSize, setGridSize] = useState("10x");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [zoomScale, setZoomScale] = useState(1);
  const [currentBox, setCurrentBox] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scaling, setScaling] = useState(1);

  const resetSettings = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const handleImageMouseMove = (e) => {
    const { clientX, clientY } = e;
    setCursorPos({ x: clientX, y: clientY });
  };

  const zoomProps = {
    width: 600,
    height: 400,
    zoomWidth: 600 * zoomScale,
    //img: "../assets/wsi.png", // Replace with your image URL
    img: sickcle,
    scale: zoomScale,
  };

  return (
    <div className="p-5 overflow-x-hidden border-2 border-red-500">
      {/* Image Profile Controls */}
      <div className="flex justify-center border border-red-500">
        <div className="flex space-x-4 border-2 border-green-500">
          {/* Marker Dropdown */}
          <div className="border-2">
            <label className="block text-gray-700">Ruler Marker:</label>
            <select
              value={marker}
              onChange={(e) => setMarker(e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value="circle">Circle</option>
              <option value="line">Line</option>
              <option value="cross">Cross</option>
            </select>
          </div>

          {/* Grid Dropdown */}
          <div>
            <label className="block text-gray-700">Grid Size:</label>
            <select
              value={gridSize}
              onChange={(e) => setGridSize(e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value="10x">10x</option>
              <option value="20x">20x</option>
              <option value="40x">40x</option>
              <option value="60x">60x</option>
              <option value="80x">80x</option>
            </select>
          </div>
        </div>

        {/* Share and Zoom Controls */}
        <div className="flex space-x-4">
          {/* Share Button */}
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Share ROI
          </button>

          {/* Zoom Controls */}
          <div>
            <label className="block text-gray-700">Zoom:</label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoomScale}
              onChange={(e) => setZoomScale(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Image Manipulation Controls */}
      <div className="flex space-x-4 my-4">
        <div>
          <label className="block text-gray-700">Brightness</label>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Contrast</label>
          <input
            type="range"
            min="50"
            max="150"
            value={contrast}
            onChange={(e) => setContrast(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Saturation</label>
          <input
            type="range"
            min="50"
            max="150"
            value={saturation}
            onChange={(e) => setSaturation(e.target.value)}
            className="w-full"
          />
        </div>
        <button
          onClick={resetSettings}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Reset
        </button>
      </div>

      {/* Switch Boxes */}
      <div className="flex space-x-4 my-4 border-2 border-yellow-500">
        {[1, 2, 3].map((box) => (
          <button
            key={box}
            className={`px-4 py-2 ${
              currentBox === box ? "bg-gray-800 text-white" : "bg-gray-300"
            } rounded-md`}
            onClick={() => setCurrentBox(box)}
          >
            {box === 1 ? "Original" : box === 2 ? "Brighter" : "Darker"}
          </button>
        ))}
      </div>

      {/* Image Section */}
      <div
        className="relative"
        onMouseMove={handleImageMouseMove}
        style={{
          filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
        }}
      >
        <ImageZoom {...zoomProps} />

        {/* Cursor Position & Scaling Info */}
        <div className="absolute top-2 right-0 w-[250px] bg-white p-2 shadow rounded">
          <p>
            Cursor: X {cursorPos.x}, Y {cursorPos.y}
          </p>
          <p>Scale: {zoomScale}x</p>
        </div>
      </div>
    </div>
  );
}
