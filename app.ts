import  express  from "express"
import {json , urlencoded} from "body-parser";
import bodyParser from "body-parser";
import sequelize from "sequelize"
import user from "./src/routers/user"

const app = express()







const port = 3000




app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(user)

// sequelize.sync().then(() => {
//     console.log("Connected to the Database");
//   });
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

