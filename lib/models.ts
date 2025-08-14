import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  image?: string;
  // Add more fields as needed
}

export interface Roadmap {
  _id?: ObjectId;
  userId: ObjectId;
  title: string;
  description?: string;
  steps: string[];
  createdAt: Date;
  updatedAt: Date;
}
