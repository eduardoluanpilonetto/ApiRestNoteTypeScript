import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import { router } from "./routers";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import "../typeorm/database/index";
import "../../container"
import { AppError } from "../../errors/appError";

const app = express();

app.use(express.json());

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({message: error.message})
    }else{
        return res.status(500).json({message: `Internal server Error - ${error.message}`})
    }
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(3000, () => console.log('server is running'));