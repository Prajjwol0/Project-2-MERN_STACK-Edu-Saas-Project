import {Sequelize} from 'sequelize-typescript';

const sequelize = new Sequelize ({
    database :process.env.DB_NAME,  //database ko name
    username:process.env.DB_USERNAME,  //database ko username,by default root hunxa
    password:process.env.DB_PASSWORD,   //database ko pasword, by default ""
    host:process.env.DB_HOST,  //database ko location, kata xa tyo thau
    dialect:"mysql",
    port:Number(process.env.DB_PORT),
    models:[__dirname + '/model'] //Current location + '/model'
})

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated!!!!!")
})
.catch((error)=>{
    console.error("Error aayo!!!!!!"+" "+error)
})

sequelize.sync({force:true})
.then(()=>{
    console.log("Migration done!!!!!")
})

export default sequelize


