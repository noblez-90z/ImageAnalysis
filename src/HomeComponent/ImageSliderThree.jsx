import React, { useState, useRef } from "react";
import {
  Ruler,
  Grid,
  Share2,
  ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import sickcle from "../assets/wsi.png";


const ImageSliderThree = () => {
  const [marker, setMarker] = useState("None");
  const [grid, setGrid] = useState("None");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [activeVersion, setActiveVersion] = useState(1);
  const [showMarkerMenu, setShowMarkerMenu] = useState(false);
  const [showGridMenu, setShowGridMenu] = useState(false);
  const [showImageSettings, setShowImageSettings] = useState(false);
  const imageRef = useRef(null);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });

    const normalizedX = (x / rect.width) * 100;
    const normalizedY = (y / rect.height) * 100;
    setViewportPosition({ x: normalizedX, y: normalizedY });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const resetImageSettings = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    transform: `scale(${scale})`,
    transition: "transform 0.2s ease-in-out",
  };

  const minimapStyle = {
    filter: imageStyle.filter,
  };

  return (
    <div className="w-full   p-4 bg-white rounded-lg shadow-lg">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4 border-2 border-red-500">
        <div className="flex justify-between space-x-4 border border-green-500">
          {/* Ruler Marker */}
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowMarkerMenu(!showMarkerMenu)}
            >
              <Ruler className="w-6 h-6" />
            </button>
            {showMarkerMenu && (
              <div className="absolute top-full mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                <select
                  value={marker}
                  onChange={(e) => setMarker(e.target.value)}
                  className="w-full p-2 border-none outline-none"
                >
                  <option value="None">None</option>
                  <option value="circle">Circle</option>
                  <option value="line">Line</option>
                  <option value="cross">Cross</option>
                </select>
              </div>
            )}
          </div>

          {/* Grid Scale */}
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowGridMenu(!showGridMenu)}
            >
              <Grid className="w-6 h-6" />
            </button>
            {showGridMenu && (
              <div className="absolute top-full mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                <select
                  value={grid}
                  onChange={(e) => setGrid(e.target.value)}
                  className="w-full p-2 border-none outline-none"
                >
                  <option value="None">None</option>
                  <option value="10x">10x</option>
                  <option value="20x">20x</option>
                  <option value="40x">40x</option>
                  <option value="60x">60x</option>
                  <option value="80x">80x</option>
                </select>
              </div>
            )}
          </div>

          {/* Share Button */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 className="w-6 h-6" />
          </button>

          {/* Image Settings */}
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowImageSettings(!showImageSettings)}
            >
              <ImageIcon className="w-6 h-6" />
            </button>
            {showImageSettings && (
              <div className="absolute top-full mt-2 w-64 bg-white border rounded-lg shadow-lg z-10 p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm block mb-1">Brightness</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">Contrast</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">Saturation</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <button
                    onClick={resetImageSettings}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Zoom Controls */}
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ZoomIn className="w-6 h-6" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ZoomOut className="w-6 h-6" />
          </button>
        </div>

        {/* Cursor Position and Scale */}
        <div className="text-sm text-gray-600">
          X: {cursorPos.x}, Y: {cursorPos.y} | Scale: {(scale * 100).toFixed(0)}
          %
        </div>
      </div>

      <div className="relative">
        {/* Main Image Container */}
        <div className="relative overflow-hidden border rounded-lg">
          <div className="flex items-center justify-center bg-gray-100 h-96">
            <img
              ref={imageRef}
              src={sickcle}
              alt="Sample"
              className="max-w-[60%] h-auto"
              style={imageStyle}
              onMouseMove={handleMouseMove}
            />
          </div>
        </div>

        {/* Minimap */}
        <div className="absolute top-4 right-4 w-32 h-24 border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg">
          <div className="relative w-full h-full">
            <img
              src={sickcle}
              alt="Minimap"
              className="w-full h-full object-cover"
              style={minimapStyle}
            />
            {/* Viewport indicator */}
            <div
              className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-20 pointer-events-none"
              style={{
                left: `${Math.max(
                  0,
                  Math.min(
                    viewportPosition.x - 100 / scale / 2,
                    100 - 100 / scale
                  )
                )}%`,
                top: `${Math.max(
                  0,
                  Math.min(
                    viewportPosition.y - 100 / scale / 2,
                    100 - 100 / scale
                  )
                )}%`,
                width: `${100 / scale}%`,
                height: `${100 / scale}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Version Selector */}
      <div className="flex space-x-4 mt-4">
        {[1, 2, 3].map((version) => (
          <button
            key={version}
            onClick={() => setActiveVersion(version)}
            className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
              activeVersion === version
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            {version}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSliderThree;
