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

    @media (max-width: 900px) {
        display: flex;
        position: absolute;
        z-index: 1000;
        left: 0;
        width: 100%;
        transform: ${props => props.isMobile ? 'translateX(0%);' : 'translateX(-100%)'};
        transition: .3s;
        margin-right: 0;
        top: 84px;
        padding: 18px;
        background-color: #F8F8F8;
        max-width: 400px;
        gap: 12px;
        overflow-y: auto;
        height: calc(100vh - 130px);
    }
`

export const InfoBlock = styled.div`
    background-color: ${backgroundColor};
    padding: 16px;
    gap: 24px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 900px) {
        padding: 8px 12px;
        gap: 4px;
        background-color: #FFFCFC;
    }

    .info-row {
        display: flex;
        align-content: center;
        width: 100%;
        align-items: ${props => props.type === 'custom' ? 'flex-start' : 'center'};
        flex-direction: row;
    }

    .info {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-right: 0;

        @media (max-width: 900px) {
            flex-direction: column;
            align-items: flex-start;
        }

        .info-item {
            display: flex;
            align-items: center;
            flex-direction: row;

            @media (max-width: 900px) {
                margin-top: 8px;
            }
        }
    }

    .value {
        padding: 8px 20px;
        background-color: #FFFCFC;
        font-size: 16px;
        font-weight: 500;
        border-radius: 8px;
        margin: 0 8px;

        @media (max-width: 900px) {
            margin-left: 0;
            background-color: #F4F4F4;
        }
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

                    p {
                        overflow: hidden;
                        max-width: 109px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    @media (max-width: 900px) {
                        margin-bottom: 16px;
                    }
                }
            }
        }
    }

    .request-btn {
        color: #E9E9E9;
        background-color: #D3342A;
        padding: 10px 34px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        transition: .3s;
        border: none;
        cursor: pointer;
        text-decoration: none;

        &:hover {
            background-color: #B52A21;
        }

        &:disabled {
            background-color: #b29494
        }
        
        &.disabled {
            background-color: #b29494
        }
    }

    .summary {
        justify-content: space-between;
        padding-right: 30px;
        padding-top: 24px;
        border-top: 1px solid #CDCDCD;

        @media (max-width: 900px) {
            padding-top: 12px;
            padding-right: 20px;
        }
    }

    .measurement {
        .unit {
            min-width: 110px;
        }

        @media (max-width: 900px) {
            margin-bottom: 10px;
        }
    }
    
    .required {
        text-align: left;
        font-size: 13px;
        margin-top: -20px;
        color: red;
    }

    .selected-tile {
        @media (max-width: 900px) {
            flex-direction: column;
        }
    }

    .calculation {
        @media (max-width: 900px) {
            margin-bottom: 10px;
        }
    }

    .request-section {
        p {
            max-width: 150px;
            white-space: pre-wrap;
        }

        @media (max-width: 900px) {
            flex-direction: column;

            p {
                max-width: unset;
                white-space: nowrap;
                font-size: 16px;
                font-weight: 500;
            }

            button {
                width: 100%;
                margin-top: 8px;
            }
        }
    }

    .customInput {
        width: 100%;
        text-align: center;
        font-size: 16px;
        padding: 10px 5px;
        appearance: textfield;
        font-weight: 500;
        background-color: #fff;
        border-radius: 4px;
        color: #6D6D6D;
        border: none;

        &:focus,
        &:active {
            border: none;
            outline: none;
        }
    }
`

export const SubTitle = styled.h3`
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: ${secondaryColor};
    margin: 0;
    text-align: left;

    @media (max-width: 900px) {
        font-size: 18px;
        line-height: 22px;
    }
`

export const Text = styled.p`
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: ${textColor};
    margin: 0;
    white-space: nowrap;

    @media (max-width: 900px) {
        font-size: 14px;
        line-height: 18px;
    }
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
    align-items: ${props => props.type === 'custom' ? 'flex-start' : 'center'};
    gap: 10px;
    margin-left: 20px;
    flex-direction: ${props => props.type === 'custom' ? 'column' : 'row'};
    justify-content: ${props => props.type === 'custom' ? 'center' : 'flex-start'};

    @media (max-width: 900px) {
        margin-left: ${props => props.type === 'custom' ? '0' : '16px'};
        margin-top: ${props => props.type === 'custom' ? '10px' : '0'};
    }
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
    border: 1px solid #ccc;
    cursor: pointer;
    color: #000;
    margin-left: ${(fullWidth) => fullWidth ? '0' : '20px'};
    //min-height: 40px;
    min-width: 290px;
    position: relative;
    border-bottom-left-radius: ${({isOpen}) => isOpen ? '0' : '8px'};
    border-bottom-right-radius: ${({isOpen}) => isOpen ? '0' : '8px'};
    border-bottom: ${({isOpen}) => isOpen ? 'none' : '1px solid #ccc'};
    width: ${(fullWidth) => fullWidth ? '100%' : 'unset'};

    @media (max-width: 900px) {
        min-width: 244px;
    }

    .dropdown-selected {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        //margin-bottom: ${({isOpen}) => isOpen ? '8px' : '0'};
        //border-bottom: ${({isOpen}) => isOpen ? '1px solid #8C8C8C' : 'none'};
        padding: 10px 14px;

        .arrow-icon {
            width: 24px;
            height: 24px;
            position: absolute;
            right: 14px;
            transition: .3s;
            transform: ${({isOpen}) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
        }

        p {
            overflow: hidden;
            margin-right: 30px;
            text-overflow: ellipsis;
        }
    }

    .dropdown-options {
        //display: flex;
        //flex-direction: column;
        //align-items: flex-start;
        //justify-content: center;
        cursor: pointer;
        color: #000;
        position: absolute;
        width: 100%;
        background-color: #fff;
        border: 1px solid #ccc;
        top: 41px;
        z-index: 10;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        max-height: 300px;
        overflow-y: auto;
        
        &::-webkit-scrollbar {
            display: none;
        }
    }

    .dropdown-option {
        align-items: center;
        display: flex;
        padding: 12px;
        width: 100%;

        p {
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &:hover {
            background-color: #F4F4F4;
        }
    }
    
    .hidden {
        display: none;
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

    @media (max-width: 900px) {
        background-color: #F4F4F4;
    }
`;

export const Input = styled.input`
    text-align: center;
    font-size: 16px;
    padding: 5px;
    appearance: textfield;
    background-color: transparent;
    font-weight: 500;
    color: #170504;
    border: none;
    width: 50px;

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

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: flex-start;
    }

    .controllers {
        display: flex;
        align-items: center;

        .decrease {
            margin-left: 10px;

            @media (max-width: 900px) {
                margin-left: 0;
            }
        }

        @media (max-width: 900px) {
            margin-top: 10px;
        }
    }
`;


export const MobileMenuWrapper = styled.div`
    width: 100%;
`;

`
`