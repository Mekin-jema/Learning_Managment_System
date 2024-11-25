import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import Layout from "../models/layout.model";
import { v2 as cloudinary } from "cloudinary";

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
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
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
      const { type, banner } = req.body;

      if (type === "Banner") {
        // Check if a Banner layout already exists
        const bannerData: any = await Layout.findOne({ type: "Banner" });

        const { image, title, subtitle } = banner[0]; // Extract details from the first banner item

        if (bannerData?.image?.public_id) {
          // Remove the existing image from Cloudinary
          await cloudinary.uploader.destroy(bannerData.image.public_id);
        }

        // Upload the new image to Cloudinary
        const myCloud = await cloudinary.uploader.upload(image, {
          folder: "layout",
        });

        // Prepare the updated banner data
        const updatedBanner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.url,
          },
          title,
          subtitle,
        };

        if (bannerData) {
          // Update existing Banner layout
          await Layout.findByIdAndUpdate(bannerData._id, {
            banner: updatedBanner,
          });
          res.status(200).json({
            success: true,
            message: "Banner layout updated successfully",
          });
        } else {
          // Create new Banner layout
          await Layout.create({ type: "Banner", banner: updatedBanner });
          res.status(201).json({
            success: true,
            message: "Banner layout created successfully",
          });
        }
      } else {
        return next(new ErrorHandler(400, "Unsupported layout type"));
      }
      if (type === "FAQ") {
        const { faq } = req.body;
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
        const Cat = await Layout.findOne({ type: "Categories" });
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              name: item.name,
              description: item.description,
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
      const type = req.body.type;
      const layout = await Layout.findOne({ type });
      res.status(201).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);
