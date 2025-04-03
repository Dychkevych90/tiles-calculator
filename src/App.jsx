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
  const [selectedTile, setSelectedTile] = useState('GridMaxPro');
  const [installationType, setInstallationType] = useState('wallToWall');
  const [surfaceType, setSurfaceType] = useState('parquet');
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
  const [doorwayLength, setDoorwayLength] = useState(0);

  const tileSizes = {
    GridMaxPro: { m2: 0.16, ft2: 1.722 },
    PlayFlex: { m2: 0.1225, ft2: 1.318 }
  };

  // const tileSizes = {
  //   GridMaxPro: { sizeM: 0.4, sizeFt: 1.312 },  // 40cm = 0.4m (approx 1.312 ft)
  //   PlayFlex: { sizeM: 0.35, sizeFt: 1.148 }    // 35cm = 0.35m (approx 1.148 ft)
  // };
  //
  // const calculateNeededTiles = (widthInTiles, heightInTiles, tileType, unit) => {
  //   if (!tileType || !tileSizes[tileType]) {
  //     return { customTotalArea: 0, customNeededTiles: 0 };
  //   }
  //
  //   const tileSize = unit === 'm2' ? tileSizes[tileType].sizeM : tileSizes[tileType].sizeFt;
  //
  //   const totalWidth = widthInTiles * tileSize;
  //   const totalHeight = heightInTiles * tileSize;
  //
  //   const customTotalArea = totalWidth * totalHeight;
  //   const customNeededTiles = widthInTiles * heightInTiles;
  //
  //   return { customTotalArea, customNeededTiles };
  // };

  const calculateNeededTiles = (width, height, tileType, unit) => {
    if (!tileType || !tileSizes[tileType]) {
      return { customTotalArea: 0, customNeededTiles: 0 };
    }

    const customTotalArea = width * height;

    const tileArea = tileSizes[tileType][unit];
    console.log('tileArea', tileArea)
    const customNeededTiles = Math.ceil(customTotalArea / tileArea);

    return { customTotalArea, customNeededTiles };
  };

  const { customTotalArea, customNeededTiles } = calculateNeededTiles(width, height, selectedTile, unit);
  console.log('customTotalArea', customTotalArea)
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
      if (installationType === "wallToWall") {
        return prev.map(() => selectedColor);
      } else {
        const newTiles = [...prev];
        newTiles[index] = selectedColor;
        return newTiles;
      }
    });
  };

  const minTileSize = 32;
  const stageWidth = Math.max(width * minTileSize, 400);
  const stageHeight = Math.max(height * minTileSize, 400);

  const handleMouseDown = () => setDrawing(true);

  const handleMouseUp = () => setDrawing(false);

  const handleMouseMove = (e) => {
    if(installationType === 'wallToWall') return;
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
  const tilesWithReserve = Math.ceil(customNeededTiles * 1.1);

  const coloredTiles = tiles.filter(color => color !== "#fff");
  const totalPrice = coloredTiles.reduce((sum, color) => sum + (colorPrices[color] || 0), 0);

  const clearTiles = () => {
    setTiles(Array(width * height).fill("#fff"));
  };

  useEffect(() => {
    clearTiles()
  }, [installationType]);

  const calculateEdgesAndCorners = () => {
    if (installationType === "wallToWall") {
      const perimeter = 2 * (width + height);
      const edges = perimeter - doorwayLength;
      const corners = 0;
      return { edges, corners };
    } else if (installationType === "pads") {
      let edges = 0;
      let externalCorners = 0;
      let internalCorners = 0;
      const tilesX = Math.ceil(width / tileSize);
      const tilesY = Math.ceil(height / tileSize);

      tiles.forEach((color, index) => {
        if (color !== "#fff") {
          const x = index % tilesX;
          const y = Math.floor(index / tilesX);

          // Check edges
          if (x === 0 || tiles[index - 1] === "#fff") edges++; // Left edge
          if (x === tilesX - 1 || tiles[index + 1] === "#fff") edges++; // Right edge
          if (y === 0 || tiles[index - tilesX] === "#fff") edges++; // Top edge
          if (y === tilesY - 1 || tiles[index + tilesX] === "#fff") edges++; // Bottom edge

          // Check external corners
          if ((x === 0 || tiles[index - 1] === "#fff") && (y === 0 || tiles[index - tilesX] === "#fff")) externalCorners++; // Top-left external corner
          if ((x === tilesX - 1 || tiles[index + 1] === "#fff") && (y === 0 || tiles[index - tilesX] === "#fff")) externalCorners++; // Top-right external corner
          if ((x === 0 || tiles[index - 1] === "#fff") && (y === tilesY - 1 || tiles[index + tilesX] === "#fff")) externalCorners++; // Bottom-left external corner
          if ((x === tilesX - 1 || tiles[index + 1] === "#fff") && (y === tilesY - 1 || tiles[index + tilesX] === "#fff")) externalCorners++; // Bottom-right external corner

          // Check internal corners
          if (x > 0 && y > 0 && tiles[index - 1] !== "#fff" && tiles[index - tilesX] !== "#fff" && tiles[index - tilesX - 1] === "#fff") internalCorners++; // Top-left internal corner
          if (x < tilesX - 1 && y > 0 && tiles[index + 1] !== "#fff" && tiles[index - tilesX] !== "#fff" && tiles[index - tilesX + 1] === "#fff") internalCorners++; // Top-right internal corner
          if (x > 0 && y < tilesY - 1 && tiles[index - 1] !== "#fff" && tiles[index + tilesX] !== "#fff" && tiles[index + tilesX - 1] === "#fff") internalCorners++; // Bottom-left internal corner
          if (x < tilesX - 1 && y < tilesY - 1 && tiles[index + 1] !== "#fff" && tiles[index + tilesX] !== "#fff" && tiles[index + tilesX + 1] === "#fff") internalCorners++; // Bottom-right internal corner
        }
      });

      return { edges, corners: 4 };
    }
    return { edges: 0, corners: 0 };
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
          setSelectedTile={setSelectedTile}
          selectedTile={selectedTile}
          installationType={installationType}
          setInstallationType={setInstallationType}
          surfaceType={surfaceType}
          setSurfaceType={setSurfaceType}
          setDoorwayLength={setDoorwayLength}
          doorwayLength={doorwayLength}
          calculateEdgesAndCorners={calculateEdgesAndCorners}
          customTotalArea={customTotalArea}
          customNeededTiles={customNeededTiles}
        />

        <div className="stage-container">
          <Stage width={stageWidth} height={stageHeight} style={{marginBottom: 15}}>
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
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    onTouchMove={handleMouseMove}
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
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    onTouchMove={handleMouseMove}
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