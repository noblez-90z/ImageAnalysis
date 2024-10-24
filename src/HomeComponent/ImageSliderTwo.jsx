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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import sickcle from "../assets/wsi.png";

const ImageSliderTwo = () => {
  const [marker, setMarker] = useState("circle");
  const [grid, setGrid] = useState("10x");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [activeVersion, setActiveVersion] = useState(1);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });
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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {/* Ruler Marker */}
          <Popover>
            <PopoverTrigger>
              <div className="p-2 hover:bg-gray-100 rounded-lg">
                <Ruler className="w-6 h-6" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Select value={marker} onValueChange={setMarker}>
                <SelectTrigger>
                  <SelectValue placeholder="Select marker" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="cross">Cross</SelectItem>
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>

          {/* Grid Scale */}
          <Popover>
            <PopoverTrigger>
              <div className="p-2 hover:bg-gray-100 rounded-lg">
                <Grid className="w-6 h-6" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Select value={grid} onValueChange={setGrid}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10x">10x</SelectItem>
                  <SelectItem value="20x">20x</SelectItem>
                  <SelectItem value="40x">40x</SelectItem>
                  <SelectItem value="60x">60x</SelectItem>
                  <SelectItem value="80x">80x</SelectItem>
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>

          {/* Share Button */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 className="w-6 h-6" />
          </button>

          {/* Image Settings */}
          <Popover>
            <PopoverTrigger>
              <div className="p-2 hover:bg-gray-100 rounded-lg">
                <ImageIcon className="w-6 h-6" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-4">
                <div>
                  <label className="text-sm">Brightness</label>
                  <Slider
                    value={[brightness]}
                    onValueChange={([value]) => setBrightness(value)}
                    min={0}
                    max={200}
                    step={1}
                  />
                </div>
                <div>
                  <label className="text-sm">Contrast</label>
                  <Slider
                    value={[contrast]}
                    onValueChange={([value]) => setContrast(value)}
                    min={0}
                    max={200}
                    step={1}
                  />
                </div>
                <div>
                  <label className="text-sm">Saturation</label>
                  <Slider
                    value={[saturation]}
                    onValueChange={([value]) => setSaturation(value)}
                    min={0}
                    max={200}
                    step={1}
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
            </PopoverContent>
          </Popover>
        </div>

        {/* Cursor Position and Scale */}
        <div className="text-sm text-gray-600">
          X: {cursorPos.x}, Y: {cursorPos.y} | Scale: {(scale * 100).toFixed(0)}
          %
        </div>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden border rounded-lg">
        <div className="flex items-center justify-center bg-gray-100 h-96">
          <img
            ref={imageRef}
            src={sickcle}
            alt="Sample"
            className="max-w-full h-auto"
            style={imageStyle}
            onMouseMove={handleMouseMove}
          />
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
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

export default ImageSliderTwo;
