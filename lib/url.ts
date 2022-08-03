const url = {
    client:
        process.env.NODE_ENV === "production"
            ? "https://coderecs.vercel.app"
            : "http://localhost:3000",
    server: "",
};
export { url };