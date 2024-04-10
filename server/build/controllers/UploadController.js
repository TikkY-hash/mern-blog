export const uploadImage = (req, res) => {
    var _a;
    res.json({
        url: `uploads/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
    });
};
//# sourceMappingURL=UploadController.js.map