import { v2 as cloudinary } from 'cloudinary';
import { blog } from '../modals/blog.modal.js';

export const createblog = async (req, res) => {
    try {
        const blogimage = req.files?.blogimage;
        if (!blogimage) {
            return res.status(400).json({ message: "Blog photo is required" });
        }

        const allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedFormats.includes(blogimage.mimetype)) {
            return res.status(400).json({ message: "Only PNG, JPG, and WEBP formats are allowed" });
        }

        const { title, category, about } = req.body;
        if (!title || !category || !about) {
            return res.status(400).json({ message: "Title, category, and about fields are required" });
        }

        if (about.length < 200) {
            return res.status(400).json({ message: "About section must be at least 200 characters" });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(blogimage.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error(cloudinaryResponse.error);
            return res.status(500).json({ message: "Error uploading photo to Cloudinary" });
        }

        const adminname = req.user?.name || "Unknown Admin";
        const adminphoto = req.user?.photo || "";
        const createdBy = req.user?._id || null;

        const blogData = {
            title,
            about,
            category,
            adminname,
            adminphoto,
            createdBy,
            blogimage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        };

        const newBlog = await blog.create(blogData);

        return res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};
