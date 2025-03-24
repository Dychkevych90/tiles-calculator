import {useEffect, useState} from "react";
import { Stage, Layer, Rect, Line, Image } from "react-konva";
import MainHeader from "./components/header";
import Sidebar from "./components/sidebar";
import './App.css'
import trash from '../public/trash.svg';
import menuItem from '../public/menuItem.svg';

const colorPrices = {
  "#FFC1C1": 2,
  "#DDE2FF": 7,
  "#D7DAE9": 6,
};

export default function App() {
  const [unit, setUnit] = useState("m2");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [tileSize] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#FFC1C1");
  const [tiles, setTiles] = useState(Array(width * height).fill("#fff"));
  const [drawing, setDrawing] = useState(false);
  const [images, setImages] = useState({});
  const [tileAssets, setTileAssets] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    Object.keys(tileAssets).forEach((color) => {
      if (!images[color]) {
        const img = new window.Image();
        img.src = tileAssets[color];
        img.onload = () => {
          setImages((prev) => ({ ...prev, [color]: img }));
          setImagesArray((prev) => [...prev, {[color]: img}]);
        };
        img.onerror = () => {
          console.error(`Failed to load image for color ${color}`);
        };
      }
    });
  }, [tileAssets]);

  useEffect(() => {
    setTiles(Array(width * height).fill("#fff"));
  }, [width, height]);

  const tilesX = Math.ceil(width / tileSize);
  const tilesY = Math.ceil(height / tileSize);

  const handleTileClick = (index) => {
    setTiles((prev) => {
      const newTiles = [...prev];
      if (images[selectedColor]) {
        newTiles[index] = selectedColor;
      } else {
        newTiles[index] = selectedColor;
      }
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

  const clearTiles = () => {
    setTiles(Array(width * height).fill("#fff"));
  };

  return (
    <>
      <MainHeader setIsMobile={setIsMobile} isMobile={isMobile}/>

      <div className="container mobile-container">
        <button onClick={() => setIsMobile(!isMobile)} className='mobile-menu'>
          <img src={menuItem} alt="menu icon"/>
        </button>
        <div className='mobile-title'>Create your tile</div>
      </div>

      <div className="container">
        <div className='btn-container'>
          <button className='clear-btn' onClick={clearTiles}>
            <img className='trash-icon' src={trash} alt="icon"/>
            Clear drawing
          </button>
        </div>
      </div>

      <div className="container">
        <Sidebar
          unit={unit}
          setUnit={setUnit}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          totalArea={totalArea}
          neededTiles={neededTiles}
          tilesWithReserve={tilesWithReserve}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          tiles={tiles}
          totalPrice={totalPrice}
          setTileAssets={setTileAssets}
          tileAssets={tileAssets}
          setImages={setImages}
          isMobile={isMobile}
          setImagesArray={setImagesArray}
          imagesArray={imagesArray}
        />

        <div className="stage-container">
          <Stage width={stageWidth} height={stageHeight}>
            <Layer>
              {tiles.map((color, index) => {
                const tileWidth = Math.max(stageWidth / tilesX, minTileSize);
                const tileHeight = Math.max(stageHeight / tilesY, minTileSize);

                const x = (index % tilesX) * tileWidth;
                const y = Math.floor(index / tilesX) * tileHeight;

                const scaleX = 1;
                const scaleY = 1;

                const centeredX = x + (tileWidth - 32 * scaleX) / 4;
                const centeredY = y + (tileHeight - 32 * scaleY) / 4;
                const image = images[color];

                return image && image.complete ? (
                  <Image
                    key={index}
                    image={image}
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
                    stroke="#666565"
                    strokeWidth={0.5}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onClick={() => handleTileClick(index)}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </>
  );
}