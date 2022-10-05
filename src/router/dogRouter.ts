import express from 'express';
import { Dog } from "../model/dogModel"
import jwt from 'jsonwebtoken';

let dogRouter = express.Router();

let dogArray: Dog[] = [];


dogRouter.get('/', (req, res, next) => {
    res.send(dogArray);
});

dogRouter.get('/:id', (req, res, next) => {
    let id = parseInt(req.params.id);
    let myDog = dogArray.find(dog => dog.id == id);
    if (myDog) {
        let cloneDog = new Dog(0, '', '', '');
        Object.assign(cloneDog, myDog);
        cloneDog.secretcmd = '';
        delete (<any>cloneDog).secretcmd
        res.send(cloneDog);
    }
    else {
        res.status(404).send({ message: 'Dog not Found' });
    }

});

dogRouter.post('/', (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let verifiedToken = jwt.verify(req.headers['authorization'].replace('Bearer ', ''), 'HelloWord@123');
            if (verifiedToken) {
                let myDog = new Dog(0, '', '', '');

                Object.assign(myDog, req.body);

                dogArray.push(myDog);
                res.send(myDog);
            }
            else {
                res.status(401).send({ message: 'Invalid Token' });
            }
        }
        catch
        {
            res.status(401).send({ message: 'Invalid Token' });
        }
    }
    else {
        res.status(401).send({ message: 'Invalid Token' });
    }
});

export { dogRouter };