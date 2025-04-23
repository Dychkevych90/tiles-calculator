import React from "react";
import {
  InfoContainer,
  InfoBlock,
  SubTitle,
  Text,
  RadioContainer,
  RadioInput,
  RadioLabel,
  BoldText
} from "./styled.js";
import Dropdown from "./dropdown.jsx";
import SizeControl from "./InputContainer.jsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

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

const colorPrices = {
  "#000000": { id: 50528588267793, price: 7.70, edgesId: 51096886182161, cornersId: 51096702910737, edgePrice: 4.50, cornerPrice: 3.49 }, // Black
  "#FF0000": { id: 50449368088849, price: 7.70, edgesId: 51096914526481, cornersId: 51096727617809, edgePrice: 4.50, cornerPrice: 3.49 }, // Red
  "#808080": { id: 50528596361489, price: 7.70, edgesId: null, cornersId: 51096783257873, edgePrice: 4.50, cornerPrice: 3.49 }, // Gray
  "#FFFFFF": { id: 50528603537681, price: 7.70, edgesId: 51097491996945, cornersId: 51096795873553, edgePrice: 4.50, cornerPrice: 3.49 }, // White
  "#0000FF": { id: 50528600654097, price: 7.70, edgesId: null, cornersId: 51096737120529, edgePrice: 4.50, cornerPrice: 3.49 }, // Blue
  "#90EE90": { id: 50528593740049, price: 7.70, edgesId: 51097363742993, cornersId: 51096759042321, edgePrice: 4.50, cornerPrice: 3.49 }, // Light Green
  "#FFFF00": { id: 50528585253137, price: 7.70, edgesId: 51096898437393, cornersId: 51096722768145, edgePrice: 4.50, cornerPrice: 3.49 }, // Yellow
  "#FFD700": { id: 51095285793041, price: 7.70, edgesId: 51096905285905, cornersId: 51096816320785, edgePrice: 4.50, cornerPrice: 3.49 }, // Gold
  "#ADD8E6": { id: 51095287595281, price: 7.70, edgesId: 51097552191761, cornersId: 51096764285201, edgePrice: 4.50, cornerPrice: 3.49 }, // Light Blue
  "#008000": { id: 51095291560209, price: 7.70, edgesId: 51096918393105, cornersId: 51096744853777, edgePrice: 4.50, cornerPrice: 3.49 }, // Green
  "#800080": { id: 51095294116113, price: 7.70, edgesId: 51096909873425, cornersId: 51096733188369, edgePrice: 4.50, cornerPrice: 3.49 }, // Purple
  "#FFC0CB": { id: 51095301456145, price: 7.70, edgesId: 51096900206865, cornersId: 51096718934289, edgePrice: 4.50, cornerPrice: 3.49 }, // Pink
  "#FFA500": { id: 50528610091281, price: 7.70, edgesId: 51097620218129, cornersId: 51096854167825, edgePrice: 4.50, cornerPrice: 3.49}, // Orange
  "#40E0D0": { id: 51096125440273, price: 7.70, edgesId: 51097576800529, cornersId: 51096749146385, edgePrice: 4.50, cornerPrice: 3.49 }, // Turquoise
  "#D3D3D3": { id: 51096299634961, price: 7.70, edgesId: 51097385337105, cornersId: 51096793022737, edgePrice: 4.50, cornerPrice: 3.49 }  // Light Gray
};

const options = [
  { value: "#000000", color: "#000000", label: "Black", src: '/tiles/black2.png' },
  { value: "#808080", color: "#808080", label: "Gray", src: '/tiles/grey.png' },
  { value: "#D3D3D3", color: "#D3D3D3", label: "Light Gray", src: '/tiles/lightGrey.png' },
  { value: "#FF0000", color: "#FF0000", label: "Red", src: '/tiles/red2.png' },
  { value: "#40E0D0", color: "#40E0D0", label: "Turquoise", src: '/tiles/Turquoise.png' },
  { value: "#FFFFFF", color: "#FFFFFF", label: "White", src: '/tiles/white.png' },
  { value: "#0000FF", color: "#0000FF", label: "Blue", src: '/tiles/blue.png' },
  { value: "#90EE90", color: "#90EE90", label: "Light Green", src: '/tiles/lightGreen.png' },
  { value: "#FFFF00", color: "#FFFF00", label: "Yellow", src: '/tiles/yellow.png' },
  { value: "#FFD700", color: "#FFD700", label: "Gold", src: '/tiles/gold.png' },
  { value: "#ADD8E6", color: "#ADD8E6", label: "Light Blue", src: '/tiles/lightBlue.png' },
  { value: "#008000", color: "#008000", label: "Green", src: '/tiles/green.png' },
  { value: "#800080", color: "#800080", label: "Purple", src: '/tiles/purple.png' },
  { value: "#FFC0CB", color: "#FFC0CB", label: "Pink", src: '/tiles/pink.png' },
  { value: "#FFA500", color: "#FFA500", label: "Orange", src: '/tiles/red.png' },
];

const SideBar = (
  {
    unit,
    setUnit,
    width,
    setWidth,
    height,
    setHeight,
    totalArea,
    neededTiles,
    tilesWithReserve,
    selectedColor,
    setSelectedColor,
    tiles,
    totalPrice,
    setImages,
    setTileAssets,
    tileAssets,
    isMobile,
    setImagesArray,
    imagesArray,
    setSelectedTile,
    selectedTile,
    installationType,
    setInstallationType,
    surfaceType,
    setSurfaceType,
    setDoorwayLength,
    doorwayLength,
    calculateEdgesAndCorners,
    customTotalArea,
    customNeededTiles,
  }) => {
  const [selectedEdgesColor, setSelectedEdgesColor] = React.useState("please add edges color");
  const [selectedCornersColor, setSelectedCornersColor] = React.useState("please add corners color");

  const { edges, corners } = calculateEdgesAndCorners();

  const getColorName = (hex) => {
    const colorMap = {
      "#000000": "Black",
      "#FF0000": "Red",
      "#808080": "Gray",
      "#FFFFFF": "White",
      "#0000FF": "Blue",
      "#90EE90": "Light Green",
      "#FFFF00": "Yellow",
      "#FFD700": "Gold",
      "#ADD8E6": "Light Blue",
      "#008000": "Green",
      "#800080": "Purple",
      "#FFC0CB": "Pink",
      "#FFA500": "Orange",
      "#40E0D0": "Turquoise",
      "#D3D3D3": "Light Gray"
    };
    return colorMap[hex] || hex
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;

      img.onload = () => {
        const newColorKey = file.name;

        if (!tileAssets[newColorKey]) {
          setImages((prev) => ({ ...prev, [newColorKey]: img }));
          setTileAssets((prev) => ({ ...prev, [newColorKey]: img.src }));
          setSelectedColor(newColorKey);
        }

        setImagesArray((prev) => [...prev, {[newColorKey]: img.src}]);
      };
    };
    reader.readAsDataURL(file);
  };

  const imgArr = imagesArray.map(img => {
    const key = Object.keys(img)[0];
    return {
      value: key,
      color: img[key],
      label: key,
      src: img[key],
    };
  });

  const combinedArray = [...options, ...imgArr];
  const allColors = [...new Set([...Object.keys(colorPrices), ...Object.keys(tileAssets)])];

  const generatePDF = () => {
    const doc = new jsPDF();

    const logoImg = 'newLogo.jpg';

    const imgWidth = 25;
    const imgHeight = 5;
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.addImage(logoImg, 'PNG', pageWidth - imgWidth - 10, 10, imgWidth, imgHeight);

    doc.text("Tile Calculation Summary", 14, 15);

    const tileTableColumn = ["Color", "Price", "Quantity", "Total"];
    const tileTableRows = [];
    let tilesTotalPrice = 0;

    allColors.forEach((color) => {
      const count = tiles.filter((t) => t === color).length;
      const price = colorPrices[color]?.price || 30;
      if (count > 0) {
        const total = count * price;
        tilesTotalPrice += total;
        tileTableRows.push([
          getColorName(color),
          `${price}$`,
          count,
          `${total.toFixed(2)}$`,
        ]);
      }
    });

    autoTable(doc, {
      head: [tileTableColumn],
      body: tileTableRows,
      startY: 30,
    });

    const edgeCornerTableColumn = ["Type", "Color", "Price", "Quantity", "Total"];
    const edgeCornerTableRows = [];
    let edgesCornersTotalPrice = 0;

    if (selectedEdgesColor && edges > 0) {
      const edgePrice = colorPrices[selectedEdgesColor]?.edgePrice || 0;
      const edgeTotal = edges * edgePrice;
      edgesCornersTotalPrice += edgeTotal;

      edgeCornerTableRows.push([
        "Edges",
        getColorName(selectedEdgesColor),
        `${edgePrice}$`,
        edges,
        `${edgeTotal.toFixed(2)}$`,
      ]);
    }

    if (selectedCornersColor && corners > 0) {
      const cornerPrice = colorPrices[selectedCornersColor]?.cornerPrice || 0;
      const cornerTotal = corners * cornerPrice;
      edgesCornersTotalPrice += cornerTotal;

      edgeCornerTableRows.push([
        "Corners",
        getColorName(selectedCornersColor),
        `${cornerPrice}$`,
        corners,
        `${cornerTotal.toFixed(2)}$`,
      ]);
    }

    if (edgeCornerTableRows.length > 0) {
      autoTable(doc, {
        head: [edgeCornerTableColumn],
        body: edgeCornerTableRows,
        startY: doc.lastAutoTable.finalY + 10,
      });
    }

    const finalTotalPrice = tilesTotalPrice + edgesCornersTotalPrice;

    const summaryTableColumn = [
      "Total Price",
      "Needed Tiles",
      "With Reserve 5%",
      "Edges",
      "Corners",
      "Total Area",
    ];

    const summaryTableRows = [
      [
        `${finalTotalPrice.toFixed(2)}$ (excl taxes)`,
        customNeededTiles,
        tilesWithReserve,
        edges,
        corners,
        `${totalArea} ft²`,
      ],
    ];

    autoTable(doc, {
      head: [summaryTableColumn],
      body: summaryTableRows,
      startY: doc.lastAutoTable.finalY + 10,
    });

    // Add Company Information at the end
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(11);
    doc.text("Modulux Inc.", 14, finalY);
    doc.text("406-58 Rue Rogel-Lamoureux, Napierville, QC J0J 1L0", 14, finalY + 5);
    doc.text("Email: info@shopmodulux.com", 14, finalY + 10);
    doc.text("Tel: 450-915-2192", 14, finalY + 15);
    doc.text("Customer Service: Monday to Friday between 9.00 am to 5.00 pm.", 14, finalY + 20);

    doc.save("tile_calculation_summary.pdf");
  };

  const getTotalPrice = () => {
    let total = 0;

    allColors.forEach(color => {
      const count = tiles.filter(t => t === color).length;
      const price = colorPrices[color]?.price || 30;
      if (price && count > 0) {
        total += count * price;
      }
    });

    if (selectedEdgesColor && edges > 0) {
      const edgePrice = colorPrices[selectedEdgesColor]?.edgePrice;
      if (edgePrice) {
        total += edges * edgePrice;
      }
    }

    if (selectedCornersColor && corners > 0) {
      const cornerPrice = colorPrices[selectedCornersColor]?.cornerPrice;
      if (cornerPrice) {
        total += corners * cornerPrice;
      }
    }

    return total.toFixed(2);
  };

  const isDisabled =
    getTotalPrice() === 0 ||
    !allColors.some(color => tiles.includes(color)) ||
    (edges > 0 && selectedEdgesColor === 'please add edges color') ||
    (corners > 0 && selectedCornersColor === 'please add corners color')

  const generateDynamicUrl = () => {
    const baseUrl = 'https://shopmodulux.com/cart/';
    const tileParams = allColors
      .map(color => {
        const count = tiles.filter(t => t === color).length;
        if (count === 0) return null;

        const id = colorPrices[color]?.id ?? 51415320396049;
        return `${id}:${count}`;
      })
      .filter(Boolean);

    const edgeParam = (() => {
      if (!selectedEdgesColor || edges <= 0) return null;
      const edgeId = colorPrices[selectedEdgesColor]?.edgesId;
      if (!edgeId) return null;
      return `${edgeId}:${edges}`;
    })();

    const cornerParam = (() => {
      if (!selectedCornersColor || corners <= 0) return null;
      const cornerId = colorPrices[selectedCornersColor]?.cornersId;
      if (!cornerId) return null;
      return `${cornerId}:${corners}`;
    })();

    const allParams = [
      ...tileParams,
      edgeParam,
      cornerParam
    ].filter(Boolean).join(',');

    return `${baseUrl}${allParams}`;
  };

  return(
    <InfoContainer isMobile={isMobile}>
      <InfoBlock type={'custom'}>
        <SubTitle>Tile Calculator</SubTitle>

        {/*<div className='info-row measurement'>*/}
        {/*  <Text style={{minWidth: '105px', textAlign: 'left'}}>Measurement:</Text>*/}

        {/*  <RadioContainer>*/}
        {/*    <RadioLabel>*/}
        {/*      <RadioInput*/}
        {/*        type="radio"*/}
        {/*        value="m2"*/}
        {/*        checked={unit === "m2"}*/}
        {/*        onChange={(e) => setUnit(e.target.value)}*/}
        {/*      />*/}
        {/*      <Text>m²</Text>*/}
        {/*    </RadioLabel>*/}

        {/*    <RadioLabel>*/}
        {/*      <RadioInput*/}
        {/*        type="radio"*/}
        {/*        value="ft2"*/}
        {/*        checked={unit === "ft2"}*/}
        {/*        onChange={(e) => setUnit(e.target.value)}*/}
        {/*      />*/}
        {/*      <Text>ft²</Text>*/}
        {/*    </RadioLabel>*/}
        {/*  </RadioContainer>*/}
        {/*</div>*/}

        <div className='info-row measurement'>
          <Text style={{minWidth: '105px', textAlign: 'left'}}>Installation:</Text>

          <RadioContainer>
            <RadioLabel>
              <RadioInput
                type="radio"
                value="wallToWall"
                checked={installationType === "wallToWall"}
                onChange={(e) => setInstallationType(e.target.value)}
              />
              <Text>Wall-to-wall</Text>
            </RadioLabel>

            <RadioLabel>
              <RadioInput
                type="radio"
                value="pads"
                checked={installationType === "pads"}
                onChange={(e) => setInstallationType(e.target.value)}
              />
              <Text>Pads</Text>
            </RadioLabel>
          </RadioContainer>
        </div>

        {
          installationType === "wallToWall" && (
            <input
              className='customInput'
              type="number"
              placeholder='Enter doorway length ft'
              onChange={(e) => setDoorwayLength(e.target.value)}
              value={doorwayLength > 0 ? doorwayLength : ''}
            />
          )
        }

        <div className='info-row measurement selected-tile'>
          <Text style={{minWidth: '105px', textAlign: 'left'}}>Tile selection:</Text>

          <RadioContainer type={'custom'}>
            <RadioLabel>
              <RadioInput
                type="radio"
                value="GridMaxPro"
                checked={selectedTile === "GridMaxPro"}
                onChange={(e) => setSelectedTile(e.target.value)}
              />
              <Text>GridMax Pro (40 cm² / 1.7213 sqft)</Text>
            </RadioLabel>

            {/*<RadioLabel>*/}
            {/*  <RadioInput*/}
            {/*    type="radio"*/}
            {/*    value="PlayFlex"*/}
            {/*    checked={selectedTile === "PlayFlex"}*/}
            {/*    onChange={(e) => setSelectedTile(e.target.value)}*/}
            {/*  />*/}
            {/*  <Text>PlayFlex (30.5 cm² / 1.0013 sqft)</Text>*/}
            {/*</RadioLabel>*/}
          </RadioContainer>
        </div>

        <div className="info-row">
          <SizeControl label="Width" value={width} onChange={setWidth} />
          <SizeControl label="Height" value={height} onChange={setHeight} />
        </div>
      </InfoBlock>

      <InfoBlock>
        <SubTitle>Tile Calculation</SubTitle>

        <div className="info-row calculation">
          <div className='info' style={{ marginRight: '10px' }}>
            <Text>Area:</Text>

            <div className="info-item">
              <div className='value'>{totalArea.toFixed(1)}</div>
              <Text>{unit}</Text>
            </div>
          </div>

          <div className='info'>
            <Text>Tiles required:</Text>

            <div className="info-item">
              <div className='value'>{customNeededTiles === 0 ? neededTiles : customNeededTiles}</div>
              <Text>units</Text>
            </div>
          </div>
        </div>

        <div className="info-row">
          <div className='info'>
            <Text>Tiles with a reserve (+5%):</Text>

            <div className='info-item'>
              <div className='value'>{tilesWithReserve}</div>
              <Text>units</Text>
            </div>
          </div>
        </div>

        <div className="info-row calculation">
          <div className='info' style={{ marginRight: '10px' }}>
            <Text>Edges:</Text>

            <div className="info-item">
              <div className='value'>{edges}</div>
              <Text>units</Text>
            </div>
          </div>

          <div className='info'>
            <Text>Corners:</Text>

            <div className="info-item">
              <div className='value'>{corners}</div>
              <Text>units</Text>
            </div>
          </div>
        </div>
      </InfoBlock>

      <InfoBlock>
        <div className="info-row">
          <SubTitle style={{minWidth: 72}}>Colors</SubTitle>

          <Dropdown
            options={combinedArray}
            selectedValue={selectedColor}
            onChange={(value) => setSelectedColor(value)}
            handleImageUpload={handleImageUpload}
            tileAssets={tileAssets}
          />
        </div>
      </InfoBlock>

      {
        edges > 0 && (
          <InfoBlock>
            <SubTitle style={{minWidth: 72}}>Select Edges color</SubTitle>

            <div className="info-row">
              <Dropdown
                options={options.filter(option => ["#000000", "#D3D3D3"].includes(option.value))}
                selectedValue={selectedEdgesColor}
                onChange={(value) => setSelectedEdgesColor(value)}
                handleImageUpload={handleImageUpload}
                tileAssets={tileAssets}
                fullWidth={true}
                customBtn={false}
                requiered={true}
              />
            </div>

            {
              selectedEdgesColor === 'please add edges color' && <div className='required'>*required</div>
            }
          </InfoBlock>
        )
      }

      {
        corners > 0 && (
          <InfoBlock>
            <SubTitle style={{minWidth: 72}}>Select Corners color</SubTitle>

            <div className="info-row">
              <Dropdown
                options={options.filter(option =>["#000000", "#808080", "#D3D3D3"].includes(option.value))}
                selectedValue={selectedCornersColor}
                onChange={(value) => setSelectedCornersColor(value)}
                handleImageUpload={handleImageUpload}
                tileAssets={tileAssets}
                fullWidth={true}
                customBtn={false}
                requiered={true}
              />
            </div>

            {
              selectedCornersColor === 'please add corners color' && <div className='required'>*required</div>
            }
          </InfoBlock>
        )
      }

      <InfoBlock>
        <SubTitle>Summary</SubTitle>

        <div className='details'>
          <table>
            <thead>
              <tr>
                <th><Text>Color</Text></th>
                <th><Text>Price</Text></th>
                <th><Text>Quantity</Text></th>
                <th><Text>Total</Text></th>
              </tr>
              <tr style={{visibility: 'hidden'}}>
                <th>details</th>
              </tr>
            </thead>
            <tbody>
              {
                allColors.some(color => tiles.includes(color)) ? (
                  allColors.map((color) => {
                    //if(!colorPrices[color]?.price) return;

                    const count = tiles.filter(t => t === color).length;
                    const price = colorPrices[color]?.price || 30;
                    const id = colorPrices[color]?.id || 30;

                    return count > 0 ? (
                      <tr key={color} id={id}>
                        <td>
                          <div className='item'>
                            {initialTileAssets[color] ? ( // tileAssets
                              <img
                                src={initialTileAssets[color]} //tileAssets
                                alt="Selected"
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  display: 'inline-block',
                                  marginRight: '8px',
                                  objectFit: 'cover',
                                  filter: 'brightness(1.5)'
                                }}
                              />
                            ) : (
                              <span
                                style={{
                                  backgroundColor: color,
                                  width: isMobile ? '24px' : '32px',
                                  height: isMobile ? '24px' : '32px',
                                  display: 'inline-block',
                                  marginRight: '8px',
                                  borderRadius: '8px',
                                }}
                              />
                            )}
                           <p>{getColorName(color)}</p>
                          </div>
                        </td>
                        <td><Text>{price}$</Text></td>
                        <td><Text>{count}</Text></td>
                        <td style={{ textAlign: 'left' }}>
                          <b>{(count * price).toFixed(0)}$</b>
                        </td>
                      </tr>
                    ) : null;
                  })
                ) : (
                  <tr>
                    <td colSpan="4"><Text>No data</Text></td>
                  </tr>
                )
              }

              {
                allColors.some(color => tiles.includes(color)) && (
                  allColors.map((color) => {
                    if(!colorPrices[color]?.edgesId) return;

                    const isEdgeColor = color === selectedEdgesColor;

                    const edgeId = isEdgeColor ? colorPrices[color]?.edgesId : null;
                    const edgePrice = isEdgeColor ? colorPrices[color]?.edgePrice : null;

                    return edges > 0 && isEdgeColor ? (
                      <tr key={color} id={edgeId}>
                        <td>
                          <div className='item'>
                            <span
                              style={{
                                backgroundColor: color,
                                width: isMobile ? '24px' : '32px',
                                height: isMobile ? '24px' : '32px',
                                display: 'inline-block',
                                marginRight: '8px',
                                borderRadius: '8px',
                              }}
                            />
                            <p>{getColorName(color)} Edge</p>
                          </div>
                        </td>
                        <td><Text>{edgePrice}$</Text></td>
                        <td><Text>{edges}</Text></td>
                        <td style={{ textAlign: 'left' }}>
                          <b>{(edges * edgePrice).toFixed(0)}$</b>
                        </td>
                      </tr>
                    ) : null;
                  })
                )
              }

              {
                allColors.some(color => tiles.includes(color)) && (
                  allColors.map((color) => {
                    if(!colorPrices[color]?.cornersId) return;

                    const isEdgeColor = color === selectedCornersColor;

                    const edgeId = isEdgeColor ? colorPrices[color]?.cornersId : null;
                    const edgePrice = isEdgeColor ? colorPrices[color]?.cornerPrice : null;

                    return corners > 0 && isEdgeColor ? (
                      <tr key={color} id={edgeId}>
                        <td>
                          <div className='item'>
                            <span
                              style={{
                                backgroundColor: color,
                                width: isMobile ? '24px' : '32px',
                                height: isMobile ? '24px' : '32px',
                                display: 'inline-block',
                                marginRight: '8px',
                                borderRadius: '8px',
                              }}
                            />
                            <p>{getColorName(color)} Corners</p>
                          </div>
                        </td>
                        <td><Text>{edgePrice}$</Text></td>
                        <td><Text>{corners}</Text></td>
                        <td style={{ textAlign: 'left' }}>
                          <b>{(corners * edgePrice).toFixed(0)}$</b>
                        </td>
                      </tr>
                    ) : null;
                  })
                )
              }
            </tbody>
          </table>
        </div>

        <div className="info-row summary">
          <BoldText>Total price:</BoldText>
          <BoldText>{getTotalPrice()}$</BoldText>
        </div>
      </InfoBlock>

      <InfoBlock>
        <div className="info-row request-section" style={{justifyContent: 'space-between'}}>
          <Text>Your design is ready! Submit your request</Text>

          <button disabled={isDisabled} onClick={generatePDF} className='request-btn'>Request the quote</button>
        </div>

        <a
          href={isDisabled ? undefined : generateDynamicUrl()}
          onClick={(e) => isDisabled && e.preventDefault()}
          className={`request-btn ${isDisabled ? 'disabled' : ''}`}
          target={isDisabled ? undefined : '_blank'}
        >
          Checkout
        </a>
      </InfoBlock>
    </InfoContainer>
  )
}

export default SideBar;