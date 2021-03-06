import { Request, Response, NextFunction } from "express";
import DatabaseService from "../Database/db_service";
import { generateId } from "../Helpers/generate_id";
import { validateRequest } from "../Helpers/validate_request";
import Service from "./service"

export default class EndpointsService extends Service {

    dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super();
        this.dbService = dbService;
    }

    async createTodoService(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!validateRequest(req, res, next)) {
            res.status(401).json({
                "error": "invalid data"
            })
            return;
        }
        //generate hash as id
        //TODO: guard double creation on same data that will generate the same hash value
        const hash: string | undefined = generateId(req.body.title, req.body.isChecked, true);

        if (hash === null || hash === undefined) {
            res.status(500).json({
                "error": "unexpected error"
            });
            return;
        }
        const todo = {
            title: req.body.title,
            subTitle: req.body.subTitle,
            hash: (hash === null) ? "" : hash,
            isChecked: req.body.isChecked,
        }

        this.dbService.create({ _title: req.body.title, _subTitle: req.body.subTitle, _hash: (hash === null) ? "" : hash, _isChecked: req.body.isChecked })

        res.status(200).set("content-type", "application/json").json(todo);
    }
    async deleteTodoService(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!validateRequest(req, res, next)) {
            res.status(401).json({
                "error": "invalid data"
            })
            return;
        }
        this.dbService.delete({ _title: req.body.title, _subTitle: req.body.subTitle, _hash: req.body.hash, _isChecked: req.body.isChecked });
        res.status(200).set("content-type", "application/json").json({
            "message": "success"
        });
    }
    async updateTodoService(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!validateRequest(req, res, next)) {
            res.status(401).json({
                "error": "invalid data"
            })
            return;
        }
        const todo = {
            title: req.body.title,
            subTitle: req.body.subTitle,
            hash: req.body.hash,
            isChecked: req.body.isChecked,
        }

        this.dbService.update({ _title: req.body.title, _subTitle: req.body.subTitle, _hash: req.body.hash, _isChecked: req.body.isChecked });
        res.status(200).set("content-type", "application/json").json(todo);
    }
}