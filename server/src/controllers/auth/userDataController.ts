import { Request, Response } from "express";
import db from "../../models/index";

export const userDataController = async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Get user data'
  // #swagger.security = [{ "bearerAuth": [] }]
  // #swagger.parameters['Authorization'] = {
  //     in: 'header',
  //     name: 'Authorization',
  //     type: 'string',
  //     required: true,
  //     description: 'Bearer token'
  // }
  // #swagger.description = 'Get user data'
  // #swagger.responses[200] = {
  //     description: 'User data fetched successfully.',
  //     schema: { $ref: '#/definitions/Users' }
  // }
  // #swagger.responses[400] = {
  //     description: 'No image file was uploaded.',
  //     schema: { $ref: '#/definitions/Users' }
  // }
  // #swagger.responses[500] = {
  //     description: 'Server error',
  //     schema: { $ref: '#/definitions/Users' }
  // }
  try {
    const userId = (req as any).user;
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      status: "Success",
      user: {
        id: user.getDataValue('id'),
        phone: user.getDataValue('phone'),
        profilePic: user.getDataValue('profilePic'),
        username: user.getDataValue('username'),
      }
    });

  } catch (error: any) {
    console.error("Error in userDataController:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};