import {useEffect, useState} from "react";
import { Stage, Layer, Rect, Line, Image } from "react-konva";
import './App.css'

const tileAssets = {
  "#ccc": '/33.jpg',
  "#222": "/black.webp",
  "#f4c542": "/yellow.avif",
  "#28a745": "/22.jpg",
  "#dc3545": "/red.avif",
};

const colorPrices = {
  "#ccc": 2,
  "#222": 7,
  "#f4c542": 6,
  "#28a745": 8,
  "#dc3545": 9,
};

export default function App() {
  const [unit, setUnit] = useState("m2");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [tileSize, setTileSize] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#ccc");
  const [tiles, setTiles] = useState(Array(width * height).fill("#fff"));
  const [drawing, setDrawing] = useState(false);
  const [line, setLine] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const imgCache = {};
    Object.keys(tileAssets).forEach((color) => {
      const img = new window.Image();
      img.src = tileAssets[color];
      img.onload = () => {
        setImages((prev) => ({ ...prev, [color]: img }));
      };
    });
  }, []);

  useEffect(() => {
    setTiles(Array(width * height).fill("#fff"));
  }, [width, height]);

  const tilesX = Math.ceil(width / tileSize);
  const tilesY = Math.ceil(height / tileSize);

  const handleTileClick = (index) => {
    setTiles((prev) => {
      const newTiles = [...prev];
      newTiles[index] = selectedColor;
      return newTiles;
    });
  };

  const minTileSize = 32;
  const stageWidth = Math.max(width * minTileSize, 400);
  const stageHeight = Math.max(height * minTileSize, 400);

  const handleMouseDown = () => setDrawing(true);
  const handleMouseUp = () => setDrawing(false);

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { x, y } = e.target.getStage().getPointerPosition();
    const tileX = Math.floor(x / (stageWidth / tilesX));
    const tileY = Math.floor(y / (stageHeight / tilesY));
    const index = tileY * tilesX + tileX;

    setTiles((prev) => {
      const newTiles = [...prev];
      newTiles[index] = selectedColor;
      return newTiles;
    });
  };

  const totalArea = width * height;
  const tileArea = tileSize * tileSize;
  const neededTiles = Math.ceil(totalArea / tileArea);
  const tilesWithReserve = Math.ceil(neededTiles * 1.1);

  const coloredTiles = tiles.filter(color => color !== "#fff");

  const totalPrice = coloredTiles.reduce((sum, color) => sum + (colorPrices[color] || 0), 0);

  const getColorName = (hex) => {
    const colorMap = {
      "#ccc": "Light",
      "#222": "Dark",
      "#f4c542": "Yellow",
      "#28a745": "Green",
      "#dc3545": "Red",
    };
    return colorMap[hex] || "Unknown";
  };

  return (
    <div className="container">
      <div className='info'>
        <h2>Tile Calculator</h2>

        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="m2">м²</option>
          <option value="ft2">ft²</option>
        </select>

        <div className='input_container'>
          <div className='input'>
            <div className='label'>Width</div>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              placeholder="Ширина"
              max={70}
            />
          </div>

          <div className='input'>
            <div className='label'>Height</div>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Висота"
              max={70}
            />
          </div>
        </div>

        <div className='calculation'>
          <h3>Tile Calculation</h3>
          <p style={{margin: 0}} >Area: {totalArea} {unit}</p>
          <p style={{margin: 0}} >Tiles required: {neededTiles} units</p>
          <p style={{margin: 0}} >With a reserve (+10%): {tilesWithReserve} units</p>
        </div>

        <h3>Colors:</h3>

        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className='select'
        >
          <option value="#ccc">Light</option>
          <option value="#222">Dark</option>
          <option value="#f4c542">Yellow</option>
          <option value="#28a745">Gray</option>
          <option value="#dc3545">Red</option>
        </select>

        <div className='summary'>
          <h3>Summary:</h3>

          <div className='details'>
            {Object.keys(colorPrices).map((color) => {
              const count = tiles.filter(t => t === color).length;
              return count > 0 ? (
                <div key={color}>
                  {getColorName(color)}: {count} × {colorPrices[color]}$ = {(count * colorPrices[color]).toFixed(2)}$
                </div>
              ) : null;
            })}
          </div>

          <div>Total tiles: {coloredTiles.length}</div>
          <div>Total price: {totalPrice.toFixed(2)} $</div>
        </div>
      </div>

      <div className="stage-container">
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            {tiles.map((color, index) => {
              const tileWidth = Math.max(stageWidth / tilesX, minTileSize);
              const tileHeight = Math.max(stageHeight / tilesY, minTileSize);

              const x = (index % tilesX) * tileWidth;
              const y = Math.floor(index / tilesX) * tileHeight;

              const scaleX = 1.2;
              const scaleY = 1.2;

              const centeredX = x + (tileWidth - 32 * scaleX) / 4;
              const centeredY = y + (tileHeight - 32 * scaleY) / 4;

              return images[color] ? (
                <Image
                  key={index}
                  image={images[color]}
                  x={centeredX}
                  y={centeredY}
                  width={39}
                  height={39}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onClick={() => handleTileClick(index)}
                />
              ) : (
                <Rect
                  key={index}
                  x={x}
                  y={y}
                  width={tileWidth}
                  height={tileHeight}
                  fill={color}
                  stroke="black"
                  strokeWidth={0.5}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onClick={() => handleTileClick(index)}
                />
              );
            })}
            {line.length === 4 && <Line points={line} stroke="blue" strokeWidth={2} />}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}