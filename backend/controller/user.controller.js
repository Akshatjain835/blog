import { v2 as cloudinary } from 'cloudinary';
import { user } from '../modals/user.modal.js';
import createTokenAndSaveCookies from '../jwt/authToken.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


// Register Function
export const register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        let uploadedImage = null;

        // Handle image upload
        if (req.files && req.files.image) {
            const { image } = req.files;
            uploadedImage = await cloudinary.uploader.upload(image.tempFilePath, {
                folder: "users",
                use_filename: true,
                unique_filename: false,
                overwrite: true,
            });

            // Delete temp file
            fs.unlinkSync(image.tempFilePath);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            phone,
            photo: uploadedImage
                ? { public_id: uploadedImage.public_id, url: uploadedImage.secure_url }
                : null,
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                photo: newUser.photo,
            },
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};


// Login Function
export const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill the required details" });
        }

        // Check if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Validate role
        if (existingUser.role !== role) {
            return res.status(400).json({ message: `Given role '${role}' not found for this user` });
        }

        // Generate token and save in cookies
        const token = await createTokenAndSaveCookies(existingUser._id, res);

        // Respond with success
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
            },
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Logout Function
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
