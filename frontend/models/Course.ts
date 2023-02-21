export interface Course {
  id: number;
  name: string;
  duration: number;
  review: number;
  rating: number;
  image: string;
  classmate: number;
  videoNum: number;
  price: number;
  category: { catrgory: { name: string } }[];
}
