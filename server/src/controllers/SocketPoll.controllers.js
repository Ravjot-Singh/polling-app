import { Poll } from '../models/Poll.models.js';
import { Option } from '../models/Option.models.js';


const voteOption = async (userId, optionId) => {

    try {
        const option = await Option.findById(optionId).populate('poll');

        if (!option) {
            throw new Error("Option not found");
        }

        if (!option.poll.isActive) {
            throw new Error("Poll is inactive");
        }

        if (option.votedBy.includes(userId)) {
            throw new Error("Already voted")
        }


        option.count += 1;

        option.votedBy.push(userId);
        await option.save();

        return option;

    } catch (error) {

        throw new Error( error.message || "Something went wrong");

    }

};


const togglePollStatus = async (pollId, userId, isActive) => {


    try {


        const poll = await Poll.findById(pollId);

        if (!poll) {
            throw new Error("Poll not found");
        }

        if (!poll.createdBy.equals(userId)) {
            throw new Error("Not authorized");
        }

        poll.isActive = isActive;
        await poll.save();

        return poll;


    } catch (error) {

        throw new Error(error.message || "Something went wrong");

    }
}



export {
    togglePollStatus,
    voteOption
}
