import React, { useState, useRef } from "react";
import {
  Ruler,
  Grid,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings,
} from "lucide-react";
import sickcle from "../assets/wsi.png";

const ImageAnalysisSlider = () => {
  const [scale, setScale] = useState(1);
  const [markerType, setMarkerType] = useState("None");
  const [gridSize, setGridSize] = useState("None");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [activeVersion, setActiveVersion] = useState(1);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [markers, setMarkers] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [isMarkerMode, setIsMarkerMode] = useState(false);
  const [showImageSettings, setShowImageSettings] = useState(false);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Define version presets
  const versionPresets = {
    1: {
      // Original
      brightness: 100,
      contrast: 100,
      saturation: 100,
    },
    2: {
      // Brighter
      brightness: 150,
      contrast: 110,
      saturation: 110,
    },
    3: {
      // Darker
      brightness: 70,
      contrast: 90,
      saturation: 90,
    },
  };
  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    transform: `scale(${scale})`,
    transition: "transform 0.2s ease-in-out",
  };
  const minimapStyle = {
    filter: imageStyle.filter,
  };

  const handleVersionChange = (version) => {
    setActiveVersion(version);
    const preset = versionPresets[version];
    setBrightness(preset.brightness);
    setContrast(preset.contrast);
    setSaturation(preset.saturation);
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setCursorPosition({ x, y });
    }
  };

  const handleImageClick = (e) => {
    if (!isMarkerMode) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setMarkers((prev) => [...prev, { type: markerType, x, y }]);
  };

  const toggleMarkerMode = () => {
    setIsMarkerMode(!isMarkerMode);
  };

  const handleGridToggle = () => {
    setShowGrid(!showGrid);
  };

  const getGridColumns = () => {
    const size = parseInt(gridSize);
    return size;
  };

  const renderMarker = (marker, index) => {
    const style = {
      position: "absolute",
      left: `${marker.x}px`,
      top: `${marker.y}px`,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
    };

    switch (marker.type) {
      case "circle":
        return (
          <div
            key={index}
            style={style}
            className="w-4 h-4 border-2 border-blue-500 rounded-full"
          />
        );
      case "line":
        return (
          <div key={index} style={style} className="w-6 h-0.5 bg-blue-500" />
        );
      case "cross":
        return (
          <div key={index} style={style} className="relative">
            <div className="absolute w-4 h-0.5 bg-blue-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-0.5 h-4 bg-blue-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderGrid = () => {
    if (!showGrid) return null;

    const columns = getGridColumns();
    const cellSize = 100 / columns;

    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}% ${cellSize}%`,
        }}
      />
    );
  };

  const handleZoom = (direction) => {
    setScale((prev) => (direction === "in" ? prev * 1.2 : prev / 1.2));
  };

  const resetImageSettings = () => {
    handleVersionChange(1); // Reset to original version
    setScale(1);
    setMarkers([]);
    setShowGrid(false);
    setIsMarkerMode(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gray-100 rounded-lg mb-11 md:mb-0">
      {/* Top toolbar with position and scale info */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap gap-2">
          {/* Ruler dropdown */}
          <div className="relative">
            <button
              className={`p-2 rounded-md shadow flex items-center gap-2 ${
                isMarkerMode ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={toggleMarkerMode}
            >
              <Ruler className="w-5 h-5" />
              <select
                className={`bg-transparent border-none ${
                  isMarkerMode ? "text-white" : "text-black"
                }`}
                value={markerType}
                onChange={(e) => setMarkerType(e.target.value)}
              >
                <option value="None">None</option>

                <option value="circle">Circle</option>
                <option value="line">Line</option>
                <option value="cross">Cross</option>
              </select>
            </button>
          </div>

          {/* Grid size dropdown */}
          <div className="relative">
            <button
              className={`p-2 rounded-md shadow flex items-center gap-2 ${
                showGrid ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={handleGridToggle}
            >
              <Grid className="w-5 h-5" />
              <select
                className={`bg-transparent border-none ${
                  showGrid ? "text-black" : "text-black"
                }`}
                value={gridSize}
                onChange={(e) => setGridSize(e.target.value)}
              >
                <option value="None">None</option>
                <option value="10">10x</option>
                <option value="20">20x</option>
                <option value="40">40x</option>
                <option value="60">60x</option>
                <option value="80">80x</option>
              </select>
            </button>
          </div>

          {/* Share button */}
          <button className="p-2 bg-white rounded-md shadow">
            <Share2 className="w-5 h-5" />
          </button>

          {/* Image Settings */}
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowImageSettings(!showImageSettings)}
            >
              <Settings className="w-6 h-6" />
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

          {/* Zoom controls */}
          <div className="flex gap-2">
            <button
              onClick={() => handleZoom("in")}
              className="p-2 bg-white rounded-md shadow"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleZoom("out")}
              className="p-2 bg-white rounded-md shadow"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cursor position and scale */}
        <div className="bg-white p-2 rounded-md shadow">
          <span className="mr-3">
            X: {cursorPosition.x} Y: {cursorPosition.y}
          </span>
          <span>Scale: {(scale * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Main image container */}
      <div className="relative">
        <div
          ref={containerRef}
          className="relative w-full h-96 bg-white rounded-lg shadow-lg overflow-hidden cursor-crosshair"
          onMouseMove={handleMouseMove}
          onClick={handleImageClick}
        >
          <img
            ref={imageRef}
            src={sickcle}
            alt="Analysis subject"
            className="w-full h-full object-contain"
            style={{
              transform: `scale(${scale})`,
              filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
            }}
          />
          {markers.map((marker, index) => renderMarker(marker, index))}
          {renderGrid()}
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

      {/* Bottom controls */}
      <div className="mt-4 flex justify-between items-start">
        {/* Version selector with labels */}
        <div className="flex gap-4">
          {[
            { version: 1, label: "Original" },
            { version: 2, label: "Brighter" },
            { version: 3, label: "Darker" },
          ].map(({ version, label }) => (
            <button
              key={version}
              className={`px-4 py-2 rounded flex flex-col items-center ${
                activeVersion === version
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => handleVersionChange(version)}
            >
              <span className="text-lg font-bold">{version}</span>
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisSlider;
