const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
const cors = require("cors");

app.use(cors({
  origin: "*"
}));

const payhereRoutes = require("./routes/payhere.routes");

app.use("/api/payhere", payhereRoutes);

