import { Poll } from "../models/Poll.models.js";
import { Option } from '../models/Option.models.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from "mongoose";


const createPoll = async (req, res) => {

    try {

        const { title, options } = req.body;

        if (!title?.trim() || !Array.isArray(options) || options.length < 2) {
            throw new ApiError(400, "Poll title and at least 2 options are required");
        }

        const cleanedOptions = [...new Set(options.map(opt => opt.trim()).filter(Boolean))];    // here instead of blloean , can also write value => value !== ""

        if (cleanedOptions.length < 2) {
            throw new ApiError(400, "Atleast 2 unique options are required!");
        }

        const createdOptions = await Option.insertMany(
            cleanedOptions.map(value => ({
                optionValue: value,
                poll: null,
            }))
        );

        const newPoll = await Poll.create({

            title: title.trim(),
            createdBy: req.user._id,
            options: createdOptions.map(opt => opt._id),


        });


        await Option.updateMany(
            {
                _id: { $in: createdOptions.map(opt => opt._id) }
            },

            {
                $set: { poll: newPoll._id }
            }
        )

        const populatedPoll = await Poll
            .findById(newPoll._id)
            .populate('options')                   // replacng the ids with the actual documents
            .populate('createdBy', 'userName');


        return res.status(201).json(
            new ApiResponse(201, populatedPoll, "Poll created successfully")
        );


    } catch (error) {
        throw new ApiError(500, error?.message || "Failed to create poll");
    }

};



const getAllPolls = async (req, res) => {

    try {

        const polls = await Poll.find({})
            .populate('options')
            .populate('createdBy', 'userName')
            .sort({ createdAt: -1 });


        if (polls.length === 0) {
            throw new ApiError(404, "No polls are present at the moment")
        }


        return res.status(200).json(
            new ApiResponse(200, polls, "All polls fetched successfully")
        );

    } catch (error) {
        throw new ApiError(500, error?.message || "Failed to fetch polls");
    }




}


const getActivePolls = async (req, res) => {

    try {

        const activePolls = await Poll.find({ isActive: true })
            .populate('options')
            .populate('createdBy', 'userName')
            .sort({ createdAt: -1 })

        if (activePolls.length === 0) {
            throw new ApiError(404, "No active polla at the present moment");
        }


        res.status(200).json(
            new ApiResponse(200, activePolls, "Active polls fetched successfully!")
        )

    } catch (error) {
        throw new ApiError(500, error?.message || "Error while fetching active polls")
    }

}



export {
    createPoll,
    getActivePolls,
    getAllPolls
}