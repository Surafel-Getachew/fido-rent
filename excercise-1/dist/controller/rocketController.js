"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rocket_1 = __importDefault(require("../model/Rocket"));
const getAllRockets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const page = parseInt((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page);
    const limit = parseInt((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.limit);
    const startIndex = (page - 1) * limit;
    const totalDocument = yield Rocket_1.default.countDocuments();
    const totalPage = Math.ceil(totalDocument / limit);
    let rockets;
    if (page && limit) {
        rockets = yield Rocket_1.default.find().limit(limit).skip(startIndex);
    }
    else {
        rockets = yield Rocket_1.default.find();
    }
    if (!rockets)
        return res.status(204).json({ message: 'No rockets found.' });
    res.json({ rockets, totalPage });
});
const addNewRocket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { name, description, height, diameter, mass } = req === null || req === void 0 ? void 0 : req.body;
    if (!name || !description || !height || !mass || !diameter) {
        return res.status(400).json({
            message: 'name,description,height,diameter and mass are required',
        });
    }
    if (typeof height !== 'number' ||
        typeof diameter !== 'number' ||
        typeof mass !== 'number') {
        res.status(400).send('Invalid request body type');
    }
    try {
        const result = yield Rocket_1.default.create({
            name,
            description,
            height,
            mass,
            diameter,
            photo: (_c = req.body) === null || _c === void 0 ? void 0 : _c.photo,
        });
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});
const updateRocket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { name, description, diameter, mass, height, photo } = req === null || req === void 0 ? void 0 : req.body;
    if (!((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.id)) {
        return res.status(400).json({ message: 'ID parameter is required.' });
    }
    const rocket = yield Rocket_1.default.findOne({ _id: req.body.id }).exec();
    if (!rocket) {
        return res
            .status(204)
            .json({ message: `No rocket matches ID ${req.body.id}.` });
    }
    if (name)
        rocket.name = name;
    if (description)
        rocket.description = description;
    if (photo)
        rocket.mass = photo;
    if (height && typeof height === 'number') {
        rocket.height = height;
    }
    if (mass && typeof mass === 'number') {
        rocket.mass = mass;
    }
    if (diameter && typeof diameter === 'number') {
        rocket.diameter = diameter;
    }
    if ((mass && typeof mass !== 'number') ||
        (height && typeof height !== 'number') ||
        (diameter && typeof diameter !== 'number')) {
        return res.status(400).send("Invalid request body type");
    }
    try {
        const result = yield rocket.save();
        res.json(result);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
});
const deleteRocket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    if (!((_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.id))
        return res.status(400).json({ message: 'Rocket ID required.' });
    const rocket = yield Rocket_1.default.findOne({ _id: req.params.id }).exec();
    if (!rocket) {
        return res
            .status(204)
            .json({ message: `No rocket matches ID ${req.params.id}.` });
    }
    const result = yield rocket.deleteOne(); //{ _id: req.body.id }
    res.json(result);
});
const getRocket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    if (!((_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.id))
        return res.status(400).json({ message: 'rocket ID required.' });
    const rocket = yield Rocket_1.default.findOne({ _id: req.params.id }).exec();
    if (!rocket) {
        return res
            .status(204)
            .json({ message: `No Rocket matches ID ${req.params.id}.` });
    }
    res.json(rocket);
});
const rocketController = {
    getAllRockets,
    addNewRocket,
    updateRocket,
    deleteRocket,
    getRocket,
};
exports.default = rocketController;
//# sourceMappingURL=rocketController.js.map