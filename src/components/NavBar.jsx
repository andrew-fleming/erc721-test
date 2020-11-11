import React from 'react'
import styled from 'styled-components'

import Main from './Main'

const Header = styled.header`
    background-color: black;
    width: 100%;
    min-height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Content = styled.div`
    color: white;
`;

const Title = styled(Content)`
    margin-left: 2rem;
`;

const Account = styled(Content)`
    margin-right: 2rem; 
`;

export default function NavBar(props) {

    return(
    <Header>
        <Content>
            <Title>
                ERC-721 Test
            </Title>
        </Content>
        <Content>
            Color Tokens
        </Content>
        <Account>
            {props.account}
        </Account>
    </Header>
    )
}
