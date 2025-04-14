import React, {useEffect, useRef, useState} from 'react';
import {StyledSelect, Text} from "./styled.js";
import ArrowIcon from '../../public/arrow.svg';
import crossIcon from '../../public/crossIcon.svg';

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
        {tileAssets[selectedValue] ? (
          <img
            src={tileAssets[selectedValue]}
            alt="Selected"
            style={{
              width: '24px',
              height: '24px',
              display: 'inline-block',
              marginRight: '8px',
              objectFit: 'cover',
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