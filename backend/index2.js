import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dwxgmwhjo",
    api_key: "189463616475678",
    api_secret: "QESHOepAHboWBNMgX0SO3WmHs0Y",
});

cloudinary.uploader.upload("backend/2.jpg", { timeout: 120000 })
    .then((result) => {
        console.log("Upload successful:", result);
    })
    .catch((error) => {
        console.error("Cloudinary upload error:", error);
    });
