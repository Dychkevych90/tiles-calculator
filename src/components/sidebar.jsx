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

const colorPrices = {
  "#FFC1C1": 2,
  "#DDE2FF": 7,
  "#D7DAE9": 6,
};

const options = [
  { value: "#FFC1C1", color: "#FFC1C1", label: "Red Tile" },
  { value: "#DDE2FF", color: "#DDE2FF", label: "Corner" },
  { value: "#D7DAE9", color: "#D7DAE9", label: "Edge" }
];

const surfaceTypeOptions = [
  { value: "concrete", color: "concrete", label: "Concrete" },
  { value: "parquet", color: "parquet", label: "Parquet" },
  { value: "asphalt", color: "asphalt", label: "Asphalt" },
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

  const { edges, corners } = calculateEdgesAndCorners();

  const getColorName = (hex) => {
    const colorMap = {
      "#FFC1C1": "Red tile",
      "#DDE2FF": "Corner",
      "#D7DAE9": "Edge",
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

  return(
    <InfoContainer isMobile={isMobile}>
      <InfoBlock type={'custom'}>
        <SubTitle>Tile Calculator</SubTitle>

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
              placeholder='Enter doorway length m'
              onChange={(e) => setDoorwayLength(e.target.value)}
              value={doorwayLength}
            />
          )
        }

        <div className='info-row measurement'>
          <Text style={{minWidth: '105px', textAlign: 'left'}}>Measurement:</Text>

          <RadioContainer>
            <RadioLabel>
              <RadioInput
                type="radio"
                value="m2"
                checked={unit === "m2"}
                onChange={(e) => setUnit(e.target.value)}
              />
              <Text>m²</Text>
            </RadioLabel>

            <RadioLabel>
              <RadioInput
                type="radio"
                value="ft2"
                checked={unit === "ft2"}
                onChange={(e) => setUnit(e.target.value)}
              />
              <Text>ft²</Text>
            </RadioLabel>
          </RadioContainer>
        </div>

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

            <RadioLabel>
              <RadioInput
                type="radio"
                value="PlayFlex"
                checked={selectedTile === "PlayFlex"}
                onChange={(e) => setSelectedTile(e.target.value)}
              />
              <Text>PlayFlex (30.5 cm² / 1.0013 sqft)</Text>
            </RadioLabel>
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
              <div className='value'>{totalArea}</div>
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
            <Text>Tiles with a reserve (+10%):</Text>

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

      <InfoBlock>
        <div className="info-row">
          <SubTitle style={{minWidth: 72}} >Surface</SubTitle>

          <Dropdown
            options={surfaceTypeOptions}
            selectedValue={surfaceType}
            onChange={(value) => setSurfaceType(value)}
            handleImageUpload={() => {}}
            tileAssets={{}}
            customBtn={false}
          />
        </div>
      </InfoBlock>

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
                    const count = tiles.filter(t => t === color).length;
                    const price = colorPrices[color] || 1;

                    return count > 0 ? (
                      <tr key={color}>
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
                           <p>{getColorName(color)}</p>
                          </div>
                        </td>
                        <td><Text>{price}$</Text></td>
                        <td><Text>{count}</Text></td>
                        <td style={{textAlign: 'left'}}><b>{(count * price).toFixed(0)}$</b></td>
                      </tr>
                    ) : null;
                  })
                ) : (
                  <tr>
                    <td colSpan="4"><Text>No data</Text></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>

        <div className="info-row summary">
          <BoldText>Total price:</BoldText>
          <BoldText>{totalPrice}$</BoldText>
        </div>
      </InfoBlock>

      <InfoBlock>
        <div className="info-row request-section" style={{justifyContent: 'space-between'}}>
          <Text>Your design is ready! Submit your request</Text>

          <button className='request-btn'>Request the quote</button>
        </div>
      </InfoBlock>
    </InfoContainer>
  )
}

export default SideBar;