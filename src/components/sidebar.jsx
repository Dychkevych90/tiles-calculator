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
    tileAssets
  }) => {

  const getColorName = (hex) => {
    const colorMap = {
      "#FFC1C1": "Red tile",
      "#DDE2FF": "Corner",
      "#D7DAE9": "Edge",
    };
    return colorMap[hex] || "Unknown";
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;
      console.log('file', file)
      img.onload = () => {
        const newColorKey = file.name;

        if (!tileAssets[newColorKey]) {
          setImages((prev) => ({ ...prev, [newColorKey]: img }));
          setTileAssets((prev) => ({ ...prev, [newColorKey]: img.src }));

          setSelectedColor(newColorKey);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return(
    <InfoContainer>
      <InfoBlock>
        <SubTitle>Tile Calculator</SubTitle>

        <div className='info-row'>
          <Text>Unit of measurement:</Text>

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

        <div className="info-row">
          <SizeControl label="Width" value={width} onChange={setWidth} />
          <SizeControl label="Height" value={height} onChange={setHeight} />
        </div>
      </InfoBlock>

      <InfoBlock>
        <SubTitle>Tile Calculation</SubTitle>
        <div className="info-row">
          <div className='info' style={{ marginRight: '10px' }}>
            <Text>Area:</Text>
            <div className='value'>{totalArea}</div>
            <Text>{unit}</Text>
          </div>

          <div className='info'>
            <Text>Tiles required:</Text>
            <div className='value'>{neededTiles}</div>
            <Text>units</Text>
          </div>
        </div>

        <div className="info-row">
          <div className='info'>
            <Text>With a reserve (+10%):</Text>
            <div className='value'>{tilesWithReserve}</div>
            <Text>units</Text>
          </div>
        </div>
      </InfoBlock>

      <InfoBlock>
        <div className="info-row">
          <SubTitle>Colors</SubTitle>

          <Dropdown
            options={options}
            selectedValue={selectedColor}
            onChange={(value) => setSelectedColor(value)}
            handleImageUpload={handleImageUpload}
            tileAssets={tileAssets}
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
              {Object.keys(colorPrices).map((color) => {
                const count = tiles.filter(t => t === color).length;
                return count > 0 ? (
                  <tr key={color}>
                    <td>
                      <div className='item'>
                        <span
                          style={{
                            backgroundColor: color,
                            width: '32px',
                            height: '32px',
                            display: 'inline-block',
                            marginRight: '8px',
                            borderRadius: '8px',
                          }}
                        />
                        {getColorName(color)}
                      </div>
                    </td>
                    <td><Text>{colorPrices[color]}$</Text></td>
                    <td><Text>{count}</Text></td>
                    <td style={{textAlign: 'left'}}><b>{(count * colorPrices[color]).toFixed(0)}$</b></td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>

        <div className="info-row summary">
          <BoldText>Tolal price:</BoldText>
          <BoldText>{totalPrice}$</BoldText>
        </div>
      </InfoBlock>

      <InfoBlock>
        <div className="info-row" style={{justifyContent: 'space-between'}}>
          <Text>Your design is ready!<br/>Submit your request</Text>

          <button className='request-btn'>Request the quote</button>
        </div>
      </InfoBlock>
    </InfoContainer>
  )
}

export default SideBar;