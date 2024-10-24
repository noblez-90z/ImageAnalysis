import React, { useState } from "react";
import ImageZoom from "react-image-zoom";
import sickcle from "../assets/wsi.png";

export default function ImageSlider() {
  const [marker, setMarker] = useState("circle");
  const [gridSize, setGridSize] = useState("10x");
  const [zoomScale, setZoomScale] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scaling, setScaling] = useState(1);

  const zoomProps = {
    width: 600,
    height: 400,
    zoomWidth: 600 * zoomScale,
    //img: "https://example.com/your-image.jpg", // Replace with your image URL
    img: sickcle,

    scale: zoomScale,
  };

  const handleZoomIn = () => {
    setZoomScale((prevScale) => Math.min(prevScale + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prevScale) => Math.max(prevScale - 0.2, 1));
  };

  const handleImageMouseMove = (e) => {
    const { clientX, clientY } = e;
    setCursorPos({ x: clientX, y: clientY });
  };

  const renderGrid = () => {
    const gridClass =
      gridSize === "10x"
        ? "grid-10"
        : gridSize === "20x"
        ? "grid-20"
        : gridSize === "40x"
        ? "grid-40"
        : gridSize === "60x"
        ? "grid-60"
        : "grid-80";
    return (
      <div className={`absolute inset-0 ${gridClass} pointer-events-none`} />
    );
  };

  const renderMarker = () => {
    return (
      <div
        className={`absolute ${marker}-marker`}
        style={{ top: cursorPos.y, left: cursorPos.x }}
      />
    );
  };

  return (
    <div className="p-5">
      {/* Image Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          {/* Marker Dropdown */}
          <div>
            <label className="block text-gray-700">Marker:</label>
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

        {/* Zoom Controls */}
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleZoomIn}
          >
            +
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleZoomOut}
          >
            -
          </button>
        </div>
      </div>

      {/* Image Box */}
      <div className="relative" onMouseMove={handleImageMouseMove}>
        <div className="relative" style={{ filter: `scale(${scaling})` }}>
          <ImageZoom {...zoomProps} />

          {/* Grid Overlay */}
          {renderGrid()}

          {/* Marker */}
          {renderMarker()}
        </div>

        {/* Mirror (Top Right Corner) */}
        <div className="absolute top-2 right-2 w-32 h-32 border bg-white p-1">
          <div className="relative" style={{ filter: `scale(${zoomScale})` }}>
            <ImageZoom {...zoomProps} />
            {/* Cursor Position & Scaling Info */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-black">
                X: {cursorPos.x}, Y: {cursorPos.y}
              </p>
              <p className="text-sm text-black">Scale: {zoomScale}x</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
