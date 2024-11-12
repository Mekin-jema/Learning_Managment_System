import mongoose, { Schema, Document, Model } from "mongoose";

interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}
interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  category: Category[];
  banner: {
    image: string;
    title: string;
    subtitle: string;
  };
}

const FaqSchema = new Schema<FaqItem>({
  question: { type: String },
  answer: { type: String },
});

const CategorySchema = new Schema<Category>({
  title: { type: String },
});

const BannerImageSchema = new Schema<BannerImage>({
  public_id: { type: String },
  url: { types: String },
});

const LayoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: [FaqSchema],
  category: [CategorySchema],
  banner: {
    image: { type: String },
    title: { type: String },
    subtitle: { type: String },
  },
});

const Layout: Model<Layout> = mongoose.model("Layout", LayoutSchema);
export default Layout;
