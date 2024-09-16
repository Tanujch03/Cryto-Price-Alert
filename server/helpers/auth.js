import bcrypt from 'bcrypt'

const hashedPassword = async (password)=>{
    const salt = bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

const comparePassword = async (password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}



export default { hashedPassword, comparePassword };