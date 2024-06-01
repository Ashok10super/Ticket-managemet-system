import crypto from 'crypto'
export function generateAgentId(){
    return (crypto.randomInt(1000000,10000000))
}
