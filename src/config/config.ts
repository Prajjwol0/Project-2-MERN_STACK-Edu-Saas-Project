import {config} from 'dotenv'
config()

export const envConfig={
    // .env ko PORT tanna ko laagi
    portNumber:process.env.PORT,
    //for eg If .env ma Name tanna paryo vane process.end.Name use hunthyo

}

