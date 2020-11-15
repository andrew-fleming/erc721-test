import React, {useState, useEffect} from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import Color from '../abi/Color'

import NavBar from './NavBar'
import Colors from './Colors'

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

//forms
//
//

const FormDiv = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    height: 2.7rem;
`;

const Button = styled.button`
    width: 10.3rem;
    height: 3rem;
    margin-top: .3rem;
`;


const web3 = new Web3(Web3.givenProvider)
const contractAddress = '0x3d6091236dce96BBFDFFF8557CeEaD29D517357C'
const contract = new web3.eth.Contract(Color.abi, contractAddress)

export default function Main() {

    const [account, setAccount] = useState('')
    const [totalSupply, setTotalSupply] = useState(0)
    const [colors, setColors] = useState([])
    const [addColor, setAddColor] = useState(true)
    const [newColor, setNewColor] = useState('')

    
    //
    //init effects
    //
    useEffect(() => {
        const loadAccount = async() => {
            let acct = await web3.eth.getAccounts()
            setAccount(acct.toString())
        }
        
        const loadSupply = async() => {
            let supply = await contract.methods.totalSupply().call()
            setTotalSupply(supply)
            console.log(totalSupply)
        }

        loadAccount()
        loadSupply()
    }, [account, totalSupply])

    
    //
    //load colors
    //
    useEffect(() => {
        const loadColors = async() => {
            for(var i = 1; i <= totalSupply; i++){
                const color = await contract.methods.colors(i - 1).call()
                if(addColor){
                    setColors(colors => [...colors, color])
                    setAddColor(false)
                }
            }
        }
            loadColors()
    }, [totalSupply, addColor])


    //
    //mint function and event handler
    //
    const handleInput = (event) => {
        setNewColor(event.target.value)
    }

    const mintToken1 = async() => {
        let config = {
            from: account
        }
        await contract.methods.mint(newColor).send(config)
            .then(function(receipt) {
                console.log(receipt)
                setAddColor(true)
            })
        }

    return (
        <div>
            <NavBar account={account}/>

            <Row>
                {colors.map((color, key) => {
                    return(
                        <Align key={key}>
                        <Circle style={{ backgroundColor: color }} ></Circle>
                        <Content>{color}</Content>
                        </Align>
                        )
                })} 
            </Row>

            <FormDiv>
                <Form>
                    <h2>Issue Token</h2>
                    <Input 
                        placeholder="E.g. #FFFFFF"
                        onChange={handleInput}
                        />
                    <div>
                        <Button 
                        onClick={mintToken1}
                        >
                            Mint
                        </Button>
                    </div>
                </Form>
            </FormDiv>
        </div>
        
    )
}
