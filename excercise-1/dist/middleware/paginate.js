// import { Request, Response, NextFunction } from 'express';
// import { IPaginatedResult } from '../types/index';
// // import Rocket from 'model/Rocket';
// const paginate = (model: []) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const page = parseInt(req.query.page as string);
//     const limit = parseInt(req.query.limit as string);
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     let result: IPaginatedResult;
//     if (endIndex < model.length) {
//       result.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }
//     if (startIndex > 0) {
//       result.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }
//     result.results = model.slice(startIndex, endIndex);
//     res.json = next();
//   };
// };
//# sourceMappingURL=paginate.js.map