import {useEffect, useState} from "react";
import {Stage, Layer, Rect, Line, Image, Group} from "react-konva";
import MainHeader from "./components/header";
import Sidebar from "./components/sidebar";
import './App.css'
import trash from '../public/trash.svg';
import menuItem from '../public/menuItem.svg';
import Konva from "konva";

const colorPrices = {
  "#000000": 7.70, // Black //
  "#FF0000": 7.70, // Red //
  "#808080": 7.70, // Gray //
  "#FFFFFF": 7.70, // White //
  "#0000FF": 7.70, // Blue //
  "#90EE90": 7.70, // Light Green
  "#FFFF00": 7.70, // Yellow //
  "#FFD700": 7.70, // Gold //
  "#ADD8E6": 7.70, // Light Blue //
  "#008000": 7.70, // Green //
  "#800080": 7.70, // Purple //
  "#FFC0CB": 7.70, // Pink //
  "#FFA500": 7.70, // Orange //
  "#40E0D0": 7.70, // Turquoise //
  "#D3D3D3": 7.70  // Light Gray //
};

const initialTileAssets = {
  "#000000": '/tiles/black2.png',
  '#FFFF00': '/tiles/yellow.png',
  '#FFC0CB': '/tiles/pink.png',
  '#800080': '/tiles/purple.png',
  '#FFFFFF': '/tiles/white.png',
  '#ADD8E6': '/tiles/lightBlue.png',
  '#008000': '/tiles/green.png',
  '#40E0D0': '/tiles/Turquoise.png',
  '#FFD700': '/tiles/gold.png',
  '#D3D3D3': '/tiles/lightGrey.png',
  '#FFA500': '/tiles/red.png',
  '#0000FF': '/tiles/blue.png',
  '#FF0000': '/tiles/red2.png',
  '#808080': '/tiles/grey.png',
  '#90EE90': '/tiles/lightGreen.png',
};

export default function App() {
  const [unit, setUnit] = useState("ft2");
  const [selectedTile, setSelectedTile] = useState('GridMaxPro');
  const [installationType, setInstallationType] = useState('wallToWall');
  const [surfaceType, setSurfaceType] = useState('parquet');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [tileSize] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [tiles, setTiles] = useState(Array(Math.max(1, Math.ceil(width * height))).fill("#fff"));
  const [drawing, setDrawing] = useState(false);
  const [images, setImages] = useState({});
  const [tileAssets, setTileAssets] = useState(initialTileAssets);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  const [doorwayLength, setDoorwayLength] = useState(0);
  const [totalSquareFeet, setTotalSquareFeet] = useState(0);
  //const [scale, setScale] = useState(1);
console.log('w', width, 'h', height)
  const tileSizes = {
    GridMaxPro: { m2: 0.16, ft2: 1.722 },
    PlayFlex: { m2: 0.093025, ft2: 1.0013 }
  };

  // const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  // const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const calculateNeededTiles = (width, height, tileType, unit) => {
    if (!tileType || !tileSizes[tileType]) {
      return { customTotalArea: 0, customNeededTiles: 0 };
    }

    const customTotalArea = width * height;

    const tileArea = tileSizes[tileType][unit];

    const customNeededTiles = Math.ceil(customTotalArea / tileArea);

    return { customTotalArea, customNeededTiles };
  };

  const { customTotalArea, customNeededTiles } = calculateNeededTiles(width, height, selectedTile, unit);

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
    setTiles(Array(Math.max(1, Math.ceil(width * height))).fill("#fff"));
  }, [width * height]);

  const handleTileClick = (index) => {
    setTiles((prev) => {
      const newTiles = [...prev];

      newTiles[index] = prev[index] === selectedColor ? "#fff" : selectedColor;

      return newTiles;
    });
  };

  const minTileSize = 32;
  const stageWidth = Math.max(width * minTileSize, 400);
  const stageHeight = Math.max(height * minTileSize, 400);

  const getPointerPosition = (stage) => {
    const pointerPosition = stage.getPointerPosition();
    return pointerPosition || { x: 0, y: 0 };
  };

  const handleInteraction = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = getPointerPosition(stage);

    const { x, y } = pointerPosition;

    const tileWidth = stageWidth / tilesXFull;
    const tileHeight = stageHeight / tilesYFull;

    const tileX = Math.floor(x / tileWidth);
    const tileY = Math.floor(y / tileHeight);

    const index = tileY * tilesXFull + tileX;

    if (tileX < 0 || tileY < 0 || tileX >= tilesXFull || tileY >= tilesYFull) return;

    setTiles((prev) => {
      const newTiles = [...prev];
      newTiles[index] = selectedColor;
      return newTiles;
    });
  };

  const [isScrolling, setIsScrolling] = useState(false);
  const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    setDrawing(true);
    const touch = e.touches[0];
    setStartTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!drawing) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - startTouch.x);
    const deltaY = Math.abs(touch.clientY - startTouch.y);

    // If the movement is primarily vertical or horizontal, treat it as scrolling
    if (deltaX > 10 || deltaY > 10) {
      setIsScrolling(true);
      return;
    }

    setIsScrolling(false);
    handleInteraction(e); // Call your tile coloring logic
  };

  const handleTouchEnd = () => {
    setDrawing(false);
    setIsScrolling(false);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    if (!pointerPosition) return;

    const { x, y } = pointerPosition;
    // const scaledX = x / scale;
    // const scaledY = y / scale;

    const tileWidth = stageWidth / tilesXFull;
    const tileHeight = stageHeight / tilesYFull;

    // const tileX = Math.floor(scaledX / tileWidth);
    // const tileY = Math.floor(scaledY / tileHeight);

    const tileX = Math.floor(x / tileWidth);
    const tileY = Math.floor(y / tileHeight);

    const index = tileY * tilesXFull + tileX;

    if (tileX >= tilesXFull || tileY >= tilesYFull || index >= tiles.length || index < 0) return;

    setTiles((prev) => {
      const newTiles = [...prev];
      newTiles[index] = selectedColor;
      return newTiles;
    });
  };

  const handleMouseDown = (e) => {
    setDrawing(true);
    handleMouseMove(e);  // allow immediate tile coloring
  };

  const handleMouseUp = () => setDrawing(false);

  const totalArea = width * height;
  const tileArea = tileSize * tileSize;
  const neededTiles = Math.ceil(totalArea / tileArea);
  const tilesWithReserve = Math.ceil(totalSquareFeet * 1.05);

  const coloredTiles = tiles.filter(color => color !== "#fff");
  const totalPrice = coloredTiles.reduce((sum, color) => sum + (colorPrices[color] || 0), 0);

  const clearTiles = () => {
    setTiles(Array(width * height).fill("#fff"));
    setDoorwayLength(0)
    setTileAssets({})
  };

  useEffect(() => {
    clearTiles()
  }, [installationType]);

  const calculateEdgesAndCorners = () => {
    const tileSizes = {
      GridMaxPro: {edgeM: 0.4, edgeFt: 1.3119 },
      PlayFlex: { edgeM: 0.305, edgeFt: 1.0013 }
    };

    const tileEdgeLength =
      unit === 'm2'
        ? tileSizes[selectedTile].edgeM
        : tileSizes[selectedTile].edgeFt;

    if (installationType === "wallToWall") {
      //const perimeter = 2 * (width + height);
      //const effectivePerimeter = perimeter - doorwayLength;

      const edges = Math.ceil(doorwayLength / tileEdgeLength);
      //const edges = doorwayLength;

      const corners = 0;

      return { edges, corners };
    } else if (installationType === "pads") {
      // let edges = 0;
      // let externalCorners = 0;
      // let internalCorners = 0;
      // const tilesX = Math.ceil(width / tileSize);
      // const tilesY = Math.ceil(height / tileSize);
      //
      // tiles.forEach((color, index) => {
      //   if (color !== "#fff") {
      //     const x = index % tilesX;
      //     const y = Math.floor(index / tilesX);
      //
      //     // Check edges
      //     if (x === 0 || tiles[index - 1] === "#fff") edges++; // Left edge
      //     if (x === tilesX - 1 || tiles[index + 1] === "#fff") edges++; // Right edge
      //     if (y === 0 || tiles[index - tilesX] === "#fff") edges++; // Top edge
      //     if (y === tilesY - 1 || tiles[index + tilesX] === "#fff") edges++; // Bottom edge
      //
      //     // Check external corners
      //     if ((x === 0 || tiles[index - 1] === "#fff") && (y === 0 || tiles[index - tilesX] === "#fff")) externalCorners++; // Top-left external corner
      //     if ((x === tilesX - 1 || tiles[index + 1] === "#fff") && (y === 0 || tiles[index - tilesX] === "#fff")) externalCorners++; // Top-right external corner
      //     if ((x === 0 || tiles[index - 1] === "#fff") && (y === tilesY - 1 || tiles[index + tilesX] === "#fff")) externalCorners++; // Bottom-left external corner
      //     if ((x === tilesX - 1 || tiles[index + 1] === "#fff") && (y === tilesY - 1 || tiles[index + tilesX] === "#fff")) externalCorners++; // Bottom-right external corner
      //
      //     // Check internal corners
      //     if (x > 0 && y > 0 && tiles[index - 1] !== "#fff" && tiles[index - tilesX] !== "#fff" && tiles[index - tilesX - 1] === "#fff") internalCorners++; // Top-left internal corner
      //     if (x < tilesX - 1 && y > 0 && tiles[index + 1] !== "#fff" && tiles[index - tilesX] !== "#fff" && tiles[index - tilesX + 1] === "#fff") internalCorners++; // Top-right internal corner
      //     if (x > 0 && y < tilesY - 1 && tiles[index - 1] !== "#fff" && tiles[index + tilesX] !== "#fff" && tiles[index + tilesX - 1] === "#fff") internalCorners++; // Bottom-left internal corner
      //     if (x < tilesX - 1 && y < tilesY - 1 && tiles[index + 1] !== "#fff" && tiles[index + tilesX] !== "#fff" && tiles[index + tilesX + 1] === "#fff") internalCorners++; // Bottom-right internal corner
      //   }
      // });

      const perimeter = 2 * (width + height);

      const edges = perimeter / tileEdgeLength

      const corners = 4;

      return { edges: edges.toFixed(0), corners };
    }
    return { edges: 0, corners: 0 };
  };

  const tileSideFt = Math.sqrt(tileSizes[selectedTile].ft2);
  const tilesXExact = width / tileSideFt;
  const tilesYExact = height / tileSideFt;

  const tilesXFull = Math.max(1, Math.ceil(tilesXExact));
  const tilesYFull = Math.max(1, Math.ceil(tilesYExact));
console.log('tilesXFull', tilesXFull, 'tilesYFull', tilesYFull)
  useEffect(() => {
    setTotalSquareFeet(tilesXFull * tilesYFull)
  }, [tilesXFull, tilesYFull]);


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
          customNeededTiles={totalSquareFeet}
        />

        {/*<div style={{ marginBottom: '10px' }}>*/}
        {/*  <button onClick={handleZoomOut}>- Zoom Out</button>*/}
        {/*  <button onClick={handleZoomIn}>+ Zoom In</button>*/}
        {/*</div>*/}

        <div className="stage-container">
          {/*<Stage width={stageWidth * scale} height={stageHeight * scale} style={{marginBottom: 15}} scale={{ x: scale, y: scale }}>*/}
          <Stage width={stageWidth} height={stageHeight} style={{marginBottom: 15}} >
            <Layer>
              {Array.from({ length: tilesXFull * tilesYFull }).map((_, index) => {
                const tileWidth = stageWidth / tilesXFull;
                const tileHeight = stageHeight / tilesYFull;

                const col = index % tilesXFull;
                const row = Math.floor(index / tilesXFull);

                const x = col * tileWidth;
                const y = row * tileHeight;

                const color = tiles[index] || "#fff";
                const image = images[color];

                const scaleX = 1.6;
                const scaleY = 1.6;

                // Calculate scaled dimensions
                const scaledWidth = tileWidth * scaleX;
                const scaledHeight = tileHeight * scaleY;

                // Adjust position to center the scaled tile
                const adjustedX = x - (scaledWidth - tileWidth) / 2;
                const adjustedY = y - (scaledHeight - tileHeight) / 2;

                return (
                  <Group
                    key={index}
                    x={x}
                    y={y}
                    clipFunc={(ctx) => {
                      ctx.rect(0, 0, tileWidth, tileHeight);
                    }}
                  >
                    {image && image.complete ? (
                      <Image
                        ref={(node) => {
                          if (node) {
                            node.cache();
                            node.filters([Konva.Filters.Brighten]);
                            node.brightness(0.15);
                          }
                        }}
                        image={image}
                        x={adjustedX - x}
                        y={adjustedY - y}
                        width={scaledWidth}
                        height={scaledHeight}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onClick={() => handleTileClick(index)}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                      />
                    ) : (
                      <Rect
                        x={0}
                        y={0}
                        width={tileWidth}
                        height={tileHeight}
                        fill={color}
                        stroke="#666565"
                        strokeWidth={0.5}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onClick={() => handleTileClick(index)}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                      />
                    )}
                  </Group>
                );
              })}


              <Rect
                x={0}
                y={0}
                width={(tilesXExact / tilesXFull) * stageWidth}
                height={(tilesYExact / tilesYFull) * stageHeight}
                stroke="red"
                strokeWidth={3}
                listening={false}
              />

              <Rect
                x={(tilesXExact / tilesXFull) * stageWidth}
                y={0}
                width={stageWidth - (tilesXExact / tilesXFull) * stageWidth}
                height={stageHeight}
                fill="rgba(255,255,255,0.6)"
                listening={false}
              />

              <Rect
                x={0}
                y={(tilesYExact / tilesYFull) * stageHeight}
                width={(tilesXExact / tilesXFull) * stageWidth}
                height={stageHeight - (tilesYExact / tilesYFull) * stageHeight}
                fill="rgba(255,255,255,0.6)"
                listening={false}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    </>
  );
}