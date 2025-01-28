import styled from 'styled-components'

export const StyledButton = styled.button`
    border: 1px solid #2D323F;
    padding: 5px 5%;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${(props) => 
        props.type === 'outline' ? '#ECF0F3' : 
        props.type === 'addnew' ? '#6C78AF' : '#558496'
    };
    color: ${(props) => props.type === 'outline' ? '#558496' : '#FFFFFF'};
    width: ${(props) => 
        props.type === 'addnew' && '200px'
    };
`;

// export const StyledButton = styled.button`
//     border: 1px solid #2D323F;
//     padding: 5px 2%;
//     border-radius: 8px;
//     cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
//     background-color: ${(props) =>
//         props.disabled
//             ? '#AAB0B7'  // Disabled color
//             : props.variant === 'outline'
//             ? '#ECF0F3'
//             : '#558496'};
//     color: ${(props) => (props.disabled ? '#FFFFFF' : props.variant === 'outline' ? '#558496' : '#FFFFFF')};
//     opacity: ${(props) => (props.disabled ? '0.6' : '1')};

//     &:hover {
//         background-color: ${(props) =>
//             props.disabled
//                 ? '#AAB0B7'  // No hover effect when disabled
//                 : props.variant === 'outline'
//                 ? '#558496'
//                 : '#2D323F'};
//         color: ${(props) => (props.disabled ? '#FFFFFF' : props.variant === 'outline' ? '#FFFFFF' : '#ECF0F3')};
//     }
// `;

export const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2%;
    width: 96%;
    height: auto;
    margin: auto;
    padding: 8px;
`;

export const StyledPara = styled.p`
    font-size: 20px;
    color: #558496;
    font-weight: bold;
`;

export const StyledInput = styled.input`
    padding: 3%;
    font-size: 13px;
    width: 100%;
    border: none;
    outline: none;
`;

export const StyledField = styled.fieldset`
    width: 20%;
    display: flex;
    text-align: left;
    padding: 5px;
    border: 1px solid #C1C1C1;

    @media (max-width: 768px) {
        width: 90%;
    }

    @media (max-width: 1024px) {
        width: 90%;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    text-align: left;
    overflow-x: auto;

    @media (max-width: 768px) {
        font-size: 14px;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

export const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #ddd;
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const TableHeaderCell = styled.th`
    padding: 12px 15px;
    font-weight: bold;
    border: 1px solid #ddd;
`;

export const TableCell = styled.td`
    padding: 12px 15px;
    border: 1px solid #ddd;
    font-size: 13px;
`;
