import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: white;
    border: 1px solid black;
    border-radius:15px;
    padding:5px;
`;

export default function Button({ children }: { children: React.ReactNode }) {
    return <StyledButton>{children}</StyledButton>
}