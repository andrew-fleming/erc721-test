const { assert } = require('chai')
const { unstable_concurrentAct } = require('react-dom/test-utils')

const Color = artifacts.require('./Color')

require('chai')
    .use(require('chai-as-promised'))
    .should()

before(async() => {
    contract = await Color.deployed()
})

contract('Color', (accounts) => {
    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = contract.address
            console.log(address)
            assert.notEqual(address, '')
            assert.notEqual(address, '0x0')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await contract.name()
            assert.equal(name, 'Color')
        })

        it('has a symbol', async() => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting', async() => {
        it('creates a new token', async() => {
            const result = await contract.mint('#222222')
            const totalSupply = await contract.totalSupply()
            assert.equal(totalSupply, 1)
        })

        it('will not create duplicate color', async() => {
            await contract.mint('#111111')
            await contract.mint('#111111').should.be.rejected
        })
    })

    describe('indexing', async() => {
        it('lists colors', async() => {
            await contract.mint('#ffffff')
            await contract.mint('#000000')
            await contract.mint('#696969')
            const totalSupply = await contract.totalSupply()

            let color
            let result = []

            for(var i = 1; i <= totalSupply; i++){
                color = await contract.colors(i - 1)
                result.push(color)
            }

            let expected = ['#222222', '#111111', '#ffffff', '#000000', '#696969']
            assert.equal(result.join(','), expected.join(','))
        })
    })
})