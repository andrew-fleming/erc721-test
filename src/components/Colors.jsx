import React from 'react'
import styled from 'styled-components'

export default function Colors(props) {

    const Row = styled.div`
    background-color: blue;
    width: 100%;
    height: 20rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const Align = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `;

const Content = styled.div`
    margin-top: 2rem;
   `;

const Circle = styled.div`
        height: 150px;
        width: 150px;
        border-radius: 50%;
        display: inline-block;
`;

    return (
        
        <Row>
            {props.colors.map((color, key) => {
                return(
                    <Align key={key}>
                    <Circle style={{ backgroundColor: color }} ></Circle>
                    <Content>{color}</Content>
                    </Align>
                    )
            })} 
        </Row>

    )
}
