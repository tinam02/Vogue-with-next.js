import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductCard = ({ seller, uri, image, name, price }) => (
  <Card sx={{ cursor: "pointer" }} onClick={() => window.open(uri, "_blank")}>
    <CardMedia component="img" image={image} />
    <CardContent sx={{ pt: 2, pb: 0 }}>
      <Typography sx={{ fontSize: 18 }}>{name}</Typography>
      <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
        <Typography color="text.secondary" sx={{ fontFamily: "BB" }}>
          {seller}
        </Typography>
        <Typography>${price}</Typography>
      </Box>
    </CardContent>

    <CardActions sx={{ justifyContent: "flex-end" }}>
      <Button variant="default" fullWidth>
        Buy
      </Button>
    </CardActions>
  </Card>
);

export default ProductCard;
