import "./pages.scss"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

import { Link } from "react-router-dom"
import { CATEGORIES } from "../utils"

const Home = () => {
  const categoryList = [...CATEGORIES]
  for (let i = categoryList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * categoryList.length)
    ;[categoryList[i], categoryList[j]] = [categoryList[j], categoryList[i]]
  }
  const bestSelling = categoryList.slice(0, 3)

  return (
    <>
      <h1>Discover best-selling categories</h1>
      <div className="best-selling-container">
        {bestSelling.map((category) => (
          <Card key={category.id} className="best-selling-card">
            <CardContent>
              <Typography variant="h5" component="div">
                {category.title}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              className="image"
              image={category.pictureUrl}
              alt={category.title}
            />
            <CardActions>
              <Button size="small">
                <Link to={category.id} className="link">
                  Learn More
                </Link>
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  )
}
export default Home
