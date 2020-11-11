import React, {useState, useEffect} from 'react'
import Web3 from 'web3'
import Color from '../abi/Color'
import NavBar from './NavBar' 
import Colors from './Colors'

export default function Main() {

    let contract

    const [usingWeb3, setUsingWeb3] = useState(false)
    const [account, setAccount] = useState('')
    const [totalSupply, setTotalSupply] = useState(0)
    const [colors, setColors] = useState([])


    const loadWeb3 = async function() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBlockchainData = async() => {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts)

        const networkId = await web3.eth.net.getId()
        const networkData = Color.networks[networkId]
        if(networkData) {
            const address = networkData.address
            const abi = Color.abi
            contract = new web3.eth.Contract(abi, address)
        } else {
            alert('Smart contract not deployed to network')
        }
    }

    useEffect(() => {
        if(!usingWeb3){
            loadWeb3()
            .then(loadBlockchainData())
        }
        setUsingWeb3(true)
    }, [usingWeb3])

    return (
        <div>
            <NavBar account={account}>

            </NavBar>
        </div>
    )
}
