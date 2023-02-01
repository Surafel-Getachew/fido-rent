"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rocketController_1 = __importDefault(require("../controller/rocketController"));
const router = (0, express_1.Router)();
router.get('/', rocketController_1.default.getAllRockets);
router.post('/', rocketController_1.default.addNewRocket);
router.put('/', rocketController_1.default.updateRocket);
router.delete('/:id', rocketController_1.default.deleteRocket);
router.get('/:id', rocketController_1.default.getRocket);
exports.default = router;
//# sourceMappingURL=rockets.js.map