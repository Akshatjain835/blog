export const validateImageFile = (req, res, next) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { image } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(image.mimetype)) {
        return res.status(400).json({ message: "Invalid file format. Only JPEG, PNG, and WEBP are allowed." });
    }

    next();
};
