import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import Layout from "../models/layout.model";
import { v2 as cloudinary } from "cloudinary";
import { title } from "process";

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await Layout.findOne({ type });
      if (isTypeExist) {
        return next(
          new ErrorHandler(400, `${type} is aleady exist in the database`)
        );
      }

      if (type === "Banner") {
        // Check if a Banner layout already exists
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.uploader.upload(image, {
          folder: "Layout",
        });

        // Prepare the updated banner data

        const banner = {
          type: "Banner",
          banner: {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
        };
        await Layout.create(banner);
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await Layout.create({ type: "FAQ", faq: faqItems });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        console.log(categories);
        const categoriesItems = await Promise.all(
          categories?.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await Layout.create({
          type: "Categories",
          categories: categoriesItems,
        });
      }

      res.status(200).json({
        success: true,
        message: "Layout creted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// edit layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        // Check if a Banner layout already exists
        const bannerData: any = await Layout.findOne({ type: "Banner" });

        const { image, title, subTitle } = req.body; // Extract details from the first banner item

        // Determine whether to upload a new image or use the existing one
        let uploadedImage = {
          public_id: bannerData.banner.image.public_id,
          url: bannerData.banner.image.url,
        };

        if (!image.startsWith("https")) {
          const uploadResult = await cloudinary.uploader.upload(image, {
            folder: "Layout",
          });
          uploadedImage = {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
          };
        }

        // Construct the banner object
        const banner = {
          type: "Banner",
          image: uploadedImage,
          title,
          subTitle,
        };

        // Update the existing Banner layout
        await Layout.findByIdAndUpdate(bannerData._id, { banner });
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        // console.log(faq);
        const FaqItems = await Layout.findOne({ type: "FAQ" });
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await Layout.findByIdAndUpdate(FaqItems?._id, {
          type: "FAQ",
          faq: faqItems,
        });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        console.log(categories);
        const Cat = await Layout.findOne({ type: "Categories" });
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await Layout.findByIdAndUpdate(Cat?._id, {
          type: "Categories",
          categories: categoriesItems,
        });
      }

      res.status(200).json({
        success: true,
        message: `${type} layout is updated successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

//get layout by type
export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const type = req.params.type;
      const layout = await Layout.findOne({ type });
      // console.log(layout);
      res.status(201).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);
