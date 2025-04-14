import React, {useEffect, useRef, useState} from 'react';
import {StyledSelect, Text} from "./styled.js";
import ArrowIcon from '../../public/arrow.svg';
import crossIcon from '../../public/crossIcon.svg';

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

const Dropdown = (
  {
    options,
    selectedValue,
    onChange,
    handleImageUpload,
    tileAssets,
    customBtn = true,
    fullWidth = false,
    requiered = false
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledSelect isOpen={isOpen} ref={dropdownRef} fullWidth={fullWidth}>
      <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
        {initialTileAssets[selectedValue] ? ( // tileAssets
          <img
            src={initialTileAssets[selectedValue]} //tileAssets
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
              backgroundColor: selectedValue,
              width: '16px',
              height: '16px',
              display: 'inline-block',
              marginRight: '8px',
            }}
          />
        )}
        {
          selectedValue === 'please add edges color' || selectedValue === 'please add corners color'
          ? <Text style={{color: 'gray', marginLeft: '-24px'}}>{selectedValue}</Text>
            : <Text>{options.find(option => option.value === selectedValue)?.label || selectedValue}</Text>
        }
        <img src={ArrowIcon} alt="Arrow Icon" className="arrow-icon" />
      </div>

      {isOpen && (
        <div className="dropdown-options">
          {options.map(option => (
            <div
              key={option.value}
              className={`dropdown-option ${option.label.startsWith('#') ? 'hidden' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.src ? (
                <img
                  src={option.src}
                  alt={option.label}
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
                    backgroundColor: option.color,
                    width: '16px',
                    height: '16px',
                    display: 'inline-block',
                    marginRight: '8px',
                  }}
                />
              )}
              <Text>{option.label}</Text>
            </div>
          ))}

          {
            customBtn && (
              <label className="dropdown-option add-btn">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <span>
              <img src={crossIcon} alt="icon"/>
              <Text>Add custom logo</Text>
            </span>
              </label>
            )
          }
        </div>
      )}
    </StyledSelect>
  );
};

export default Dropdown;