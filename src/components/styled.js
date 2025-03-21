import styled from 'styled-components';
import {backgroundColor, secondaryColor, textColor} from "../styles/constants.js";

export const InfoContainer = styled.div`
    flex: 1;
    max-width: 430px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 50px;
    gap: 32px;
`

export const InfoBlock = styled.div`
    background-color: ${backgroundColor};
    padding: 16px;
    gap: 24px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    width: 100%;

    .info-row {
        display: flex;
        align-content: center;
        width: 100%;
        align-items: center;
        flex-direction: row;
    }

    .info {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-right: 0;
    }

    .value {
        padding: 8px 20px;
        background-color: #FFFCFC;
        font-size: 16px;
        font-weight: 500;
        border-radius: 8px;
        margin: 0 8px;
    }

    .details {
        table {
            width: 100%;

            thead tr {
                th, td {
                    text-align: left;
                }
            }

            tbody tr td * {
                text-align: left;
            }

            tbody {
                .item {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    .request-btn {
        color: #E9E9E9;
        background-color: #B52A21;
        padding: 10px 34px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        transition: .3s;
        border: none;
        
        &:hover {
            background-color: #D3342A;
        }
    }
    
    .summary {
        justify-content: space-between;
        padding-right: 30px;
        padding-top: 24px;
        border-top: 1px solid #CDCDCD;
    }
`

export const SubTitle = styled.h3`
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: ${secondaryColor};
    margin: 0;
    text-align: left;
`

export const Text = styled.p`
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: ${textColor};
    margin: 0;
    white-space: nowrap;
`

export const BoldText = styled.p`
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: ${textColor};
    margin: 0;
    white-space: nowrap;
`

export const RadioContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 32px;
`;

export const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
`;

export const RadioInput = styled.input`
    width: 24px;
    height: 24px;
    cursor: pointer;
    appearance: none;
    border: 2px solid ${textColor};
    border-radius: 50%;
    background-color: ${backgroundColor};
    position: relative;

    &:checked::before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${textColor};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-width: 1px;
    }

    &:not(:checked) {
        border-color: #6B6D76;
    }
`;

export const StyledSelect = styled.div`
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 0;
    border: 1px solid #ccc;
    cursor: pointer;
    color: #000;
    margin-left: 20px;
    min-height: 40px;
    min-width: 290px;
    position: relative;

    .dropdown-selected {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: ${({isOpen}) => isOpen ? '8px' : '0'};
        border-bottom: ${({isOpen}) => isOpen ? '1px solid #8C8C8C' : 'none'};
        padding: 0 14px ${({isOpen}) => isOpen ? '10px' : '0'};

        .arrow-icon {
            width: 24px;
            height: 24px;
            position: absolute;
            right: 14px;
            transition: .3s;
            transform: ${({isOpen}) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
        }
    }

    .dropdown-options {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        cursor: pointer;
        color: #000;
    }

    .dropdown-option {
        align-items: center;
        display: flex;
        padding: 12px;
        width: 100%;

        &:hover {
            background-color: #F4F4F4;
        }
    }
    
    .add-btn {
        span {
            display: flex;
            align-items: center;
            cursor: pointer;
            
            img {
                width: 24px;
                height: 24px;
                margin-right: 8px;
            }
        }
    }

    .dropdown-option:last-child {
        margin-bottom: 0;
    }
`;

export const Button = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
    color: #6D6D6D;
    border: none;

    &:focus,
    &:active {
        outline: none;
        border: none;
    }
`;

export const Input = styled.input`
  width: 45px;
  text-align: center;
  font-size: 16px;
  padding: 5px;
    appearance: textfield;
    background-color: transparent;
    font-weight: 500;
    color: #170504;
    border: none;

    &:focus,
    &:active {
        border: none;
        outline: none; /* Remove the default outline */
    }
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    
    .decrease {
        margin-left: 10px;
    }
`